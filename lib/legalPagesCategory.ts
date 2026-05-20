const DEFAULT_LEGAL_PAGES_URL =
  "http://localhost:5173/api/public/v1/projects/p-mp4ielp1-2/categories/cat-mp91ii8d-1";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function pickString(obj: Record<string, unknown>, keys: string[]): string | null {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return null;
}

function collectEntriesFromPayload(payload: unknown): Record<string, unknown>[] {
  if (Array.isArray(payload)) {
    return payload.filter(isRecord);
  }
  if (!isRecord(payload)) return [];

  const direct = payload["entries"];
  if (Array.isArray(direct)) return direct.filter(isRecord);

  const data = payload["data"];
  if (Array.isArray(data)) return data.filter(isRecord);
  if (isRecord(data)) {
    const inner = data["entries"];
    if (Array.isArray(inner)) return inner.filter(isRecord);
    const items = data["items"];
    if (Array.isArray(items)) return items.filter(isRecord);
    const category = data["category"];
    if (isRecord(category)) {
      const ce = category["entries"];
      if (Array.isArray(ce)) return ce.filter(isRecord);
    }
  }

  const category = payload["category"];
  if (isRecord(category)) {
    const ce = category["entries"];
    if (Array.isArray(ce)) return ce.filter(isRecord);
  }

  const results = payload["results"];
  if (Array.isArray(results)) return results.filter(isRecord);

  for (const key of ["documents", "records", "pages"]) {
    const arr = payload[key];
    if (Array.isArray(arr)) return arr.filter(isRecord);
  }

  return [];
}

/** CMS entries expose field data under `values` (see category.entries[].values). */
function normalizeCmsEntry(entry: Record<string, unknown>): Record<string, unknown> {
  const values = entry["values"];
  if (isRecord(values)) {
    return { ...entry, ...values };
  }
  return entry;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function rawContentToHtml(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  if (/<[a-z][\s\S]*>/i.test(t)) return t;
  return t
    .split(/\n{2,}/)
    .map((block) => `<p>${escapeHtml(block.trim()).replace(/\n/g, "<br />")}</p>`)
    .join("");
}

export type LegalPageEntryResolved = {
  title: string;
  /** ISO or raw string from the API */
  updatedAtRaw: string | null;
  /** User-facing date in en-US medium style when parseable */
  updatedDateLabel: string | null;
  html: string;
};

function resolveEntry(record: Record<string, unknown>): LegalPageEntryResolved | null {
  const title =
    pickString(record, ["title", "entry_title", "entryTitle", "name", "label"]) ?? "Legal page";
  const updatedAtRaw =
    pickString(record, [
      "updated_date",
      "updatedDate",
      "updated_at",
      "updatedAt",
      "modified_at",
      "modifiedAt",
    ]) ?? null;

  let updatedDateLabel: string | null = null;
  if (updatedAtRaw) {
    const d = parseCmsDate(updatedAtRaw);
    if (d) {
      updatedDateLabel = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(d);
    } else {
      updatedDateLabel = updatedAtRaw;
    }
  }

  const rawBody =
    pickString(record, [
      "content",
      "body",
      "html",
      "rich_text",
      "richText",
      "description",
      "text",
    ]) ?? "";

  const html = rawContentToHtml(rawBody);
  if (!html) return null;

  return { title, updatedAtRaw, updatedDateLabel, html };
}

function parseCmsDate(raw: string): Date | null {
  const t = raw.trim();
  const ymd = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t);
  if (ymd) {
    const y = Number(ymd[1]);
    const mo = Number(ymd[2]) - 1;
    const d = Number(ymd[3]);
    return new Date(y, mo, d);
  }
  const d = new Date(t);
  return Number.isNaN(d.getTime()) ? null : d;
}

function entrySlug(record: Record<string, unknown>): string | null {
  return pickString(record, ["slug", "path", "permalink", "handle"]);
}

function isPrivacyPolicyEntry(record: Record<string, unknown>): boolean {
  const slug = entrySlug(record);
  if (slug && /privacy-policy/i.test(slug)) return true;
  const title = pickString(record, ["title", "entry_title", "entryTitle", "name", "label"]);
  if (title && /privacy\s*policy/i.test(title)) return true;
  return false;
}

export function selectPrivacyPolicyEntry(
  entries: Record<string, unknown>[],
): Record<string, unknown> | null {
  const bySlug = entries.find((e) => {
    const s = entrySlug(e);
    return s?.toLowerCase() === "privacy-policy";
  });
  if (bySlug) return bySlug;
  const byHeuristic = entries.find(isPrivacyPolicyEntry);
  if (byHeuristic) return byHeuristic;
  if (entries.length === 1) return entries[0] ?? null;
  return null;
}

export type FetchLegalCategoryResult =
  | { ok: true; entry: LegalPageEntryResolved }
  | { ok: false; reason: "fetch" | "json" | "empty" | "no_privacy_entry" };

export async function fetchPrivacyPolicyFromLegalCategory(
  requestUrl?: string,
): Promise<FetchLegalCategoryResult> {
  const url =
    requestUrl ??
    process.env.CMS_LEGAL_PAGES_URL?.trim() ??
    DEFAULT_LEGAL_PAGES_URL;

  if (!url) {
    return { ok: false, reason: "fetch" };
  }

  try {
    const res = await fetch(url, {
      next: { revalidate: 120 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      console.warn(`Legal pages API failed (${res.status}).`);
      return { ok: false, reason: "fetch" };
    }

    let payload: unknown;
    try {
      payload = await res.json();
    } catch {
      return { ok: false, reason: "json" };
    }

    const entries = collectEntriesFromPayload(payload).map(normalizeCmsEntry);
    if (!entries.length) return { ok: false, reason: "empty" };

    const chosen = selectPrivacyPolicyEntry(entries);
    if (!chosen) return { ok: false, reason: "no_privacy_entry" };

    const entry = resolveEntry(chosen);
    if (!entry) return { ok: false, reason: "no_privacy_entry" };

    return { ok: true, entry };
  } catch (error) {
    console.warn("Legal pages API unreachable.", error);
    return { ok: false, reason: "fetch" };
  }
}