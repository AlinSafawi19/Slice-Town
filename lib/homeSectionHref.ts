function cleanFragment(fragment: string): string {
  return fragment.replace(/^#/, "").split("#")[0] ?? "";
}

/**
 * Build home hash links for `next/link` without string `"/#…"`.
 * The object form sets one fragment; string hrefs can stack into `#menu#reservation` with client nav.
 */
export function homeSectionHref(fragment: string): { pathname: "/"; hash: string } {
  return { pathname: "/", hash: cleanFragment(fragment) };
}

/** Plain `<a href>` with a single fragment (for components that are not `next/link`). */
export function homeSectionHrefString(fragment: string): string {
  const clean = cleanFragment(fragment);
  return clean ? `/#${clean}` : "/";
}
