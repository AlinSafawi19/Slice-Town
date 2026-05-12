"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { flushSync } from "react-dom";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ButtonHTMLAttributes,
  type MouseEventHandler,
} from "react";

import { homeSectionHref } from "@/lib/homeSectionHref";

import { NavLinkPrimary } from "./NavLink";

const LOGO_SRC =
  "https://framerusercontent.com/images/YuRHdEkWRtjYkQnF4dSImfFAE.svg?width=100&height=100";

const navOuterClass = "nav-outer";

const mobileBackdropClass = "nav-mobile-backdrop";

const containerClass = "nav-container";

const navDesktopClass = "nav-desktop";

const navListClass = "nav-list";

const brandCellClass = "nav-brand-cell";

const navMobileClass = "nav-mobile-row";

const menuButtonClass = "nav-menu-btn";

const menuBarClass = "nav-menu-bar";

const mobilePanelClass = "nav-mobile-panel";

const logoClassDesktop = "nav-logo-desktop";

const logoClassMobile = "nav-logo-mobile";

const HASH_SYNC_EVENT = "slicetown-hash-sync";

/** Document order for home scroll-spy (matches section `id`s on `/`). */
const HOME_SECTION_SCROLL_ORDER = [
  "home",
  "about-us",
  "menu",
  "reservation",
] as const;

let historyPatched = false;

/** Native `replaceState`, captured before we patch `history` (used to collapse bad hashes without re-entering the patch). */
let historyNativeReplaceState: typeof history.replaceState | null = null;

/**
 * Next/App Router can leave `location.hash` as `#a#a` when merging hash links; `liveHash` still
 * normalizes to `#a`, so React effects keyed on `liveHash` never clean the bar. Collapse whenever
 * the raw fragment has more than one segment.
 */
function collapseDocumentHashIfStacked() {
  if (typeof window === "undefined" || historyNativeReplaceState == null) return;
  const raw = window.location.hash;
  if (!raw || raw === "#") return;
  const normalized = normalizeLocationHash();
  if (normalized === raw) return;
  historyNativeReplaceState.call(
    history,
    history.state,
    "",
    `${window.location.pathname}${window.location.search}${normalized}`,
  );
}

function patchHistoryForHashSync() {
  if (typeof window === "undefined" || historyPatched) return;
  historyPatched = true;
  historyNativeReplaceState = history.replaceState.bind(history);
  const nativePush = history.pushState.bind(history);
  const nativeReplace = historyNativeReplaceState;
  history.pushState = (...args: Parameters<History["pushState"]>) => {
    const r = nativePush(...args);
    collapseDocumentHashIfStacked();
    window.dispatchEvent(new Event(HASH_SYNC_EVENT));
    return r;
  };
  history.replaceState = (...args: Parameters<History["replaceState"]>) => {
    const r = nativeReplace(...args);
    collapseDocumentHashIfStacked();
    window.dispatchEvent(new Event(HASH_SYNC_EVENT));
    return r;
  };
}

function normalizeLocationHash(): string {
  if (typeof window === "undefined") return "";
  const raw = window.location.hash;
  if (!raw || raw === "#") return "";
  const inner = raw.startsWith("#") ? raw.slice(1) : raw;
  const segment = inner.split("#")[0] ?? "";
  return segment ? `#${segment}` : "";
}

function parseHashFromAnchorHref(href: string): string {
  try {
    const u = new URL(href, typeof window !== "undefined" ? window.location.origin : "http://localhost");
    const raw = u.hash;
    if (!raw || raw === "#") return "";
    const inner = raw.slice(1);
    const segment = inner.split("#")[0] ?? "";
    return segment ? `#${segment}` : "";
  } catch {
    return "";
  }
}

function subscribeLocationHash(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  patchHistoryForHashSync();
  // Defer: patched pushState fires synchronously; `useSyncExternalStore` subscribes in useInsertionEffect, which must not trigger updates.
  const run = () => {
    queueMicrotask(() => {
      collapseDocumentHashIfStacked();
      onStoreChange();
    });
  };
  window.addEventListener("hashchange", run);
  window.addEventListener("popstate", run);
  window.addEventListener(HASH_SYNC_EVENT, run);
  return () => {
    window.removeEventListener("hashchange", run);
    window.removeEventListener("popstate", run);
    window.removeEventListener(HASH_SYNC_EVENT, run);
  };
}

/**
 * Client hash for `aria-current`. Next.js updates the hash via `history.pushState`, which does
 * not fire `hashchange`; we patch history once and drive state with `useSyncExternalStore`.
 * Optional optimistic override + `flushSync` makes the active pill update before paint.
 */
function useLocationHash(pathname: string) {
  const liveHash = useSyncExternalStore(
    subscribeLocationHash,
    normalizeLocationHash,
    () => "",
  );

  const [overrideHash, setOverrideHash] = useState<string | null>(null);
  const hash = overrideHash !== null ? overrideHash : liveHash;

  useLayoutEffect(() => {
    if (overrideHash !== null && overrideHash === liveHash) {
      setOverrideHash(null);
    }
  }, [liveHash, overrideHash]);

  /** Collapse stacked fragments on load or if the bar was changed without going through `history`. */
  useEffect(() => {
    if (typeof window === "undefined") return;
    patchHistoryForHashSync();
    collapseDocumentHashIfStacked();
  }, [liveHash, pathname]);

  useEffect(() => {
    window.dispatchEvent(new Event(HASH_SYNC_EVENT));
  }, [pathname]);

  const scheduleHashSync = useCallback(() => {
    window.dispatchEvent(new Event(HASH_SYNC_EVENT));
  }, []);

  const syncHashFromHref = useCallback((anchor: HTMLAnchorElement | null) => {
    if (typeof window === "undefined" || anchor == null) return;
    const next = parseHashFromAnchorHref(anchor.href);
    flushSync(() => {
      setOverrideHash(next);
    });
  }, []);

  return { hash, scheduleHashSync, syncHashFromHref };
}

/**
 * Nav pill hash when the header-bottom reference line (viewport Y) lies inside a **nav-linked**
 * section (`HOME_SECTION_SCROLL_ORDER`). Regions without nav targets (e.g. offer, testimonials,
 * location) return `null` so no item looks active.
 */
function computeNavScrollSpyHash(headerBottomViewport: number): string | null {
  const line = headerBottomViewport + 2;
  for (const id of HOME_SECTION_SCROLL_ORDER) {
    const el = document.getElementById(id);
    if (!el) continue;
    const r = el.getBoundingClientRect();
    if (r.top <= line && r.bottom > line) {
      return id === "home" ? "" : `#${id}`;
    }
  }
  return null;
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="nav-menu-icon-wrap">
      <span
        aria-hidden
        className={[
          menuBarClass,
          open ? "nav-menu-bar--a-open" : "nav-menu-bar--a-closed",
        ].join(" ")}
      />
      <span
        aria-hidden
        className={[
          menuBarClass,
          open ? "nav-menu-bar--b-open" : "nav-menu-bar--b-closed",
        ].join(" ")}
      />
    </span>
  );
}

export type NavigationProps = {
  className?: string;
};

/**
 * Site header: desktop/tablet shows [nav links | logo | nav links]; mobile shows logo + hamburger
 * and a full-width link panel. Framer canvas “position” z values map to `1300` (tablet+) and
 * `2210` (mobile).
 */
export function Navigation({ className = "" }: NavigationProps) {
  const pathname = usePathname();
  const { hash, scheduleHashSync, syncHashFromHref } = useLocationHash(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  /** `undefined` until first client run; then `""` / `#fragment` for a nav section, or `null` when none. */
  const [scrollSpyHash, setScrollSpyHash] = useState<string | null | undefined>(undefined);
  /** After in-page nav clicks, follow URL hash for the active pill until scroll settles. */
  const [preferHashForActive, setPreferHashForActive] = useState(false);
  const menuId = useId();
  const btnId = `${menuId}-btn`;

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const beginPreferHashForActive = useCallback(() => {
    setPreferHashForActive(true);
    window.setTimeout(() => setPreferHashForActive(false), 650);
  }, []);

  const onDesktopNavClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    (e) => {
      beginPreferHashForActive();
      syncHashFromHref(e.currentTarget);
      scheduleHashSync();
    },
    [beginPreferHashForActive, scheduleHashSync, syncHashFromHref],
  );

  const onMobileNavClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    (e) => {
      closeMobile();
      beginPreferHashForActive();
      syncHashFromHref(e.currentTarget);
      scheduleHashSync();
    },
    [beginPreferHashForActive, closeMobile, scheduleHashSync, syncHashFromHref],
  );

  const onLogoClick = useCallback<MouseEventHandler<HTMLAnchorElement>>((e) => {
    beginPreferHashForActive();
    syncHashFromHref(e.currentTarget);
    scheduleHashSync();
  }, [beginPreferHashForActive, scheduleHashSync, syncHashFromHref]);

  const mobileMenuToggleA11y: Pick<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "aria-expanded" | "aria-controls"
  > = {
    "aria-expanded": mobileOpen ? "true" : "false",
    "aria-controls": menuId,
  };

  const onHomePath = pathname === "/";
  /** `#home` and bare `/` both mean hero; keeps pills/hash state aligned when using `homeSectionHref("home")`. */
  const hashNorm =
    hash === "" || hash === "#" || hash === "#home" ? "" : hash;

  useEffect(() => {
    if (pathname !== "/") {
      const clearId = window.requestAnimationFrame(() => {
        setScrollSpyHash(undefined);
      });
      return () => window.cancelAnimationFrame(clearId);
    }
    if (typeof window === "undefined") return;

    let raf = 0;
    let last: string | null | undefined;

    const run = () => {
      const header = headerRef.current;
      const line = header ? header.getBoundingClientRect().bottom : 96;
      const next = computeNavScrollSpyHash(line);
      if (next === last) return;
      last = next;
      setScrollSpyHash(next);
    };

    const onScrollOrResize = () => {
      if (raf !== 0) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        run();
      });
    };

    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    const ro = new ResizeObserver(onScrollOrResize);
    const header = headerRef.current;
    if (header) ro.observe(header);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      ro.disconnect();
      if (raf !== 0) window.cancelAnimationFrame(raf);
    };
  }, [pathname]);

  const hashTargetMissing =
    typeof document !== "undefined" &&
    Boolean(hashNorm && !document.getElementById(hashNorm.slice(1)));

  const activeHashNorm: string | null =
    onHomePath && !hashTargetMissing && preferHashForActive
      ? hashNorm
      : onHomePath && !hashTargetMissing && scrollSpyHash !== undefined
        ? scrollSpyHash
        : hashNorm;

  const homeAriaCurrent =
    onHomePath && activeHashNorm === "" ? ("page" as const) : undefined;
  const aboutAriaCurrent =
    onHomePath && activeHashNorm === "#about-us" ? ("page" as const) : undefined;
  const menuAriaCurrent =
    onHomePath && activeHashNorm === "#menu" ? ("page" as const) : undefined;
  const reservationAriaCurrent =
    onHomePath && activeHashNorm === "#reservation"
      ? ("page" as const)
      : undefined;

  return (
    <header
      ref={headerRef}
      className={[navOuterClass, className].filter(Boolean).join(" ")}
    >
      {mobileOpen ? (
        <div
          className={mobileBackdropClass}
          aria-hidden
          onClick={closeMobile}
        />
      ) : null}
      <div className={containerClass}>
        {/* Desktop + tablet */}
        <nav className={navDesktopClass} aria-label="Main">
          <div className={navListClass}>
            <NavLinkPrimary
              href={homeSectionHref("home")}
              label="Home"
              aria-current={homeAriaCurrent}
              onClick={onDesktopNavClick}
            />
            <NavLinkPrimary
              href={homeSectionHref("about-us")}
              label="About Us"
              aria-current={aboutAriaCurrent}
              onClick={onDesktopNavClick}
            />
          </div>

          <div className={brandCellClass}>
            <Link
              href={homeSectionHref("home")}
              aria-label="Logo"
              className="nav-logo-link"
              onClick={onLogoClick}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={LOGO_SRC}
                alt=""
                width={100}
                height={100}
                draggable={false}
                className={logoClassDesktop}
              />
            </Link>
          </div>

          <div className={navListClass}>
            <NavLinkPrimary
              href={homeSectionHref("menu")}
              label="Menu"
              aria-current={menuAriaCurrent}
              onClick={onDesktopNavClick}
            />
            <NavLinkPrimary
              href={homeSectionHref("reservation")}
              label="Reservation"
              aria-current={reservationAriaCurrent}
              onClick={onDesktopNavClick}
            />
          </div>
        </nav>

        {/* Mobile */}
        <div className={navMobileClass}>
          <Link
            href={homeSectionHref("home")}
            aria-label="Logo"
            className="nav-logo-link nav-logo-link--mobile"
            onClick={(e) => {
              closeMobile();
              onLogoClick(e);
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO_SRC}
              alt=""
              width={70}
              height={70}
              draggable={false}
              className={logoClassMobile}
            />
          </Link>

          <button
            id={btnId}
            type="button"
            className={menuButtonClass}
            {...mobileMenuToggleA11y}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <MenuIcon open={mobileOpen} />
            <span className="u-sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>

        {mobileOpen ? (
          <div
            id={menuId}
            className={mobilePanelClass}
            role="region"
            aria-labelledby={btnId}
          >
            <NavLinkPrimary
              href={homeSectionHref("home")}
              label="Home"
              onClick={onMobileNavClick}
              aria-current={homeAriaCurrent}
            />
            <NavLinkPrimary
              href={homeSectionHref("about-us")}
              label="About Us"
              onClick={onMobileNavClick}
              aria-current={aboutAriaCurrent}
            />
            <NavLinkPrimary
              href={homeSectionHref("menu")}
              label="Menu"
              onClick={onMobileNavClick}
              aria-current={menuAriaCurrent}
            />
            <NavLinkPrimary
              href={homeSectionHref("reservation")}
              label="Reservation"
              onClick={onMobileNavClick}
              aria-current={reservationAriaCurrent}
            />
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default Navigation;
