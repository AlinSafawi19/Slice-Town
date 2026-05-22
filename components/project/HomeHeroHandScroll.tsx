"use client";

import type Lenis from "lenis";
import { useLenis } from "lenis/react";
import {
  useCallback,
  useEffect,
  useRef,
  type MutableRefObject,
} from "react";

/** Design canvas reference width (px). */
const DESIGN_W = 1920;
const OFFSET_X = 1000;
const OFFSET_Y = 500;
/** Primary hero title: From offset 0 → To offset X -350. */
const TITLE_OFFSET_X = -350;
/** Secondary hero title: From offset 0 → To offset X +350. */
const TITLE_SECONDARY_OFFSET_X = 350;
/**
 * Pepper shape (`.home-hero-shape-one`) and about `#about-shape-01`:
 * From scale 1.5, offset (-250, 250) → To scale 1, offset (0, 0).
 */
const SHAPE_ONE_FROM_SCALE = 1.5;
const SHAPE_ONE_FROM_OFFSET_X = -250;
const SHAPE_ONE_FROM_OFFSET_Y = 250;
/** About `#about-shape-02`: same scroll as shape 01; From scale 1.5, offset (350, 350) → To (0, 0). */
const ABOUT_SHAPE_02_FROM_SCALE = 1.5;
const ABOUT_SHAPE_02_FROM_OFFSET_X = 350;
const ABOUT_SHAPE_02_FROM_OFFSET_Y = 350;
/** Basil shape (`.home-hero-shape-two`): From scale 1.5, offset (250, 250) → To scale 1, offset (0, 0). */
const SHAPE_TWO_FROM_SCALE = 1.5;
const SHAPE_TWO_FROM_OFFSET_X = 250;
const SHAPE_TWO_FROM_OFFSET_Y = 250;
/**
 * Extra scroll span (in viewport heights) folded into raw 0→1 beyond the `vh` term.
 * Tall `#image` / `.home-hero` would otherwise use `(vh + fullSectionHeight)` and take many
 * screens to finish; capping with `min(sectionHeight, vh * this)` keeps ~one viewport of scroll
 * for the full transform on desktop heroes.
 */
const HERO_TRANSFORM_SCROLL_EXTRA_VH = 1.25;
/** Lenis `animatedScroll` / `window.scrollY` at or below this counts as “hero at document top”. */
const DOC_REST_SCROLL_MAX = 72;
/** Reservation section: From offsetY 0 -> To offsetY -1400. */
const RESERVATION_TO_OFFSET_Y = -1400;

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function getWindowScrollY(): number {
  if (typeof window === "undefined") return 0;
  return window.scrollY ?? document.documentElement.scrollTop ?? 0;
}

/** Raw progress 0→1 from `#image` geometry vs viewport (Section in View). */
function rawProgressForImageSection(): number | null {
  const el = document.getElementById("image");
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  const h = rect.height;
  const vh = window.innerHeight;
  if (h <= 0) return null;
  const span = vh + Math.min(h, vh * HERO_TRANSFORM_SCROLL_EXTRA_VH);
  return clamp01((vh - rect.top) / span);
}

/** Raw 0→1 from `#about-shape-01` geometry vs viewport (Section in View). */
function rawProgressForAboutScrollSection(): number {
  const el = document.getElementById("about-shape-01");
  if (!el) return 0;
  const rect = el.getBoundingClientRect();
  const h = rect.height;
  const vh = window.innerHeight;
  if (h <= 0) return 0;
  const span = vh + Math.min(h, vh * HERO_TRANSFORM_SCROLL_EXTRA_VH);
  return clamp01((vh - rect.top) / span);
}

/**
 * #menu-shape-01: Section in View (viewport middle).
 * p=0 when the shape’s top reaches the bottom of the viewport (just entering from below).
 * p=1 when its vertical center hits the viewport midline — full From→To without having
 * to scroll the element off-screen (unlike hero `vh + min(h, …)` span).
 */
function rawProgressForMenuShapeScrollSection(): number {
  const el = document.getElementById("menu-shape-01");
  if (!el) return 0;
  const rect = el.getBoundingClientRect();
  const h = rect.height;
  const vh = window.innerHeight;
  if (h <= 0) return 0;
  const denom = (vh + h) / 2;
  if (denom <= 1e-6) return 0;
  return clamp01((vh - rect.top) / denom);
}

/** Reservation section (#reservation): Section in View style progress. */
function rawProgressForReservationScrollSection(): number {
  const el = document.getElementById("reservation");
  if (!el) return 0;
  const rect = el.getBoundingClientRect();
  const h = rect.height;
  const vh = window.innerHeight;
  if (h <= 0) return 0;
  const denom = vh + h;
  if (denom <= 1e-6) return 0;
  return clamp01((vh - rect.top) / denom);
}

/**
 * Map raw 0→1 to animation progress 0→1, where progress 0 means “at document rest”.
 * While `atDocumentRest`, the stored rest value is overwritten with the current `raw`
 * every frame so scroll-down → scroll-up always re-syncs (unlike a one-shot baseline).
 */
function normalizedFromRestRaw(
  raw: number,
  restRef: MutableRefObject<number | null>,
  atDocumentRest: boolean,
): number {
  if (atDocumentRest) {
    restRef.current = raw;
  } else if (restRef.current === null) {
    restRef.current = raw;
  }
  const r = restRef.current ?? raw;
  const denom = 1 - r;
  if (denom <= 1e-5) {
    return raw >= 1 ? 1 : clamp01(raw);
  }
  return clamp01((raw - r) / denom);
}

function setHandTransform(p: number) {
  const hand = document.querySelector(
    ".home-hero-image-hand",
  ) as HTMLElement | null;
  if (!hand) return;
  const vw = window.innerWidth;
  const scale = vw / DESIGN_W;
  const tx = p * OFFSET_X * scale;
  const ty = p * OFFSET_Y * scale;
  hand.style.setProperty("--hand-tx", `${tx}px`);
  hand.style.setProperty("--hand-ty", `${ty}px`);
}

function setTitleScrollTransform(p: number) {
  const title = document.querySelector(
    ".home-hero-title-text--scroll-x",
  ) as HTMLElement | null;
  if (!title) return;
  const vw = window.innerWidth;
  const scale = vw / DESIGN_W;
  const tx = p * TITLE_OFFSET_X * scale;
  title.style.setProperty("--hero-title-tx", `${tx}px`);
}

function setSecondaryTitleScrollTransform(p: number) {
  const title = document.querySelector(
    ".home-hero-title-text--scroll-x-secondary",
  ) as HTMLElement | null;
  if (!title) return;
  const vw = window.innerWidth;
  const scale = vw / DESIGN_W;
  const tx = p * TITLE_SECONDARY_OFFSET_X * scale;
  title.style.setProperty("--hero-secondary-title-tx", `${tx}px`);
}

function setShapeOneScrollTransform(p: number, reducedMotion: boolean) {
  const root = document.querySelector(
    ".home-hero-shape-one",
  ) as HTMLElement | null;
  if (!root) return;
  if (reducedMotion) {
    root.style.setProperty("--shape-one-scale", "1");
    root.style.setProperty("--shape-one-tx", "0px");
    root.style.setProperty("--shape-one-ty", "0px");
    return;
  }
  const vw = window.innerWidth;
  const s = vw / DESIGN_W;
  const tx = (1 - p) * SHAPE_ONE_FROM_OFFSET_X * s;
  const ty = (1 - p) * SHAPE_ONE_FROM_OFFSET_Y * s;
  const sc =
    SHAPE_ONE_FROM_SCALE + (1 - SHAPE_ONE_FROM_SCALE) * p;
  root.style.setProperty("--shape-one-scale", String(sc));
  root.style.setProperty("--shape-one-tx", `${tx}px`);
  root.style.setProperty("--shape-one-ty", `${ty}px`);
}

function setShapeTwoScrollTransform(p: number, reducedMotion: boolean) {
  const root = document.querySelector(
    ".home-hero-shape-two",
  ) as HTMLElement | null;
  if (!root) return;
  if (reducedMotion) {
    root.style.setProperty("--shape-two-scale", "1");
    root.style.setProperty("--shape-two-tx", "0px");
    root.style.setProperty("--shape-two-ty", "0px");
    return;
  }
  const vw = window.innerWidth;
  const s = vw / DESIGN_W;
  const tx = (1 - p) * SHAPE_TWO_FROM_OFFSET_X * s;
  const ty = (1 - p) * SHAPE_TWO_FROM_OFFSET_Y * s;
  const sc =
    SHAPE_TWO_FROM_SCALE + (1 - SHAPE_TWO_FROM_SCALE) * p;
  root.style.setProperty("--shape-two-scale", String(sc));
  root.style.setProperty("--shape-two-tx", `${tx}px`);
  root.style.setProperty("--shape-two-ty", `${ty}px`);
}

function setAboutShapeScrollTransform(p: number, reducedMotion: boolean) {
  const root = document.getElementById("about-shape-01");
  if (!root) return;
  if (reducedMotion) {
    root.style.setProperty("--about-shape-one-scale", "1");
    root.style.setProperty("--about-shape-one-tx", "0px");
    root.style.setProperty("--about-shape-one-ty", "0px");
    return;
  }
  const vw = window.innerWidth;
  const s = vw / DESIGN_W;
  const tx = (1 - p) * SHAPE_ONE_FROM_OFFSET_X * s;
  const ty = (1 - p) * SHAPE_ONE_FROM_OFFSET_Y * s;
  const sc =
    SHAPE_ONE_FROM_SCALE + (1 - SHAPE_ONE_FROM_SCALE) * p;
  root.style.setProperty("--about-shape-one-scale", String(sc));
  root.style.setProperty("--about-shape-one-tx", `${tx}px`);
  root.style.setProperty("--about-shape-one-ty", `${ty}px`);
}

/** `#about-shape-02`: same scroll `p` as shape 01 (Section #01). */
function setAboutShape02ScrollTransform(p: number, reducedMotion: boolean) {
  const root = document.getElementById("about-shape-02");
  if (!root) return;
  if (reducedMotion) {
    root.style.setProperty("--about-shape-two-scale", "1");
    root.style.setProperty("--about-shape-two-tx", "0px");
    root.style.setProperty("--about-shape-two-ty", "0px");
    return;
  }
  const vw = window.innerWidth;
  const s = vw / DESIGN_W;
  const tx = (1 - p) * ABOUT_SHAPE_02_FROM_OFFSET_X * s;
  const ty = (1 - p) * ABOUT_SHAPE_02_FROM_OFFSET_Y * s;
  const sc =
    ABOUT_SHAPE_02_FROM_SCALE + (1 - ABOUT_SHAPE_02_FROM_SCALE) * p;
  root.style.setProperty("--about-shape-two-scale", String(sc));
  root.style.setProperty("--about-shape-two-tx", `${tx}px`);
  root.style.setProperty("--about-shape-two-ty", `${ty}px`);
}

/** `.home-menu-shape-one` / `#menu-shape-01`: same From→To as hero shape one. */
function setMenuShapeOneScrollTransform(p: number, reducedMotion: boolean) {
  const root = document.getElementById("menu-shape-01");
  if (!root) return;
  if (reducedMotion) {
    root.style.setProperty("--menu-shape-one-scale", "1");
    root.style.setProperty("--menu-shape-one-tx", "0px");
    root.style.setProperty("--menu-shape-one-ty", "0px");
    return;
  }
  const vw = window.innerWidth;
  const s = vw / DESIGN_W;
  const tx = (1 - p) * SHAPE_ONE_FROM_OFFSET_X * s;
  const ty = (1 - p) * SHAPE_ONE_FROM_OFFSET_Y * s;
  const sc =
    SHAPE_ONE_FROM_SCALE + (1 - SHAPE_ONE_FROM_SCALE) * p;
  root.style.setProperty("--menu-shape-one-scale", String(sc));
  root.style.setProperty("--menu-shape-one-tx", `${tx}px`);
  root.style.setProperty("--menu-shape-one-ty", `${ty}px`);
}

/**
 * `.home-menu-shape-two`: same scroll `p` as `#menu-shape-01` (Section in View, viewport middle).
 * From: scale 1.5, offset (250, 250) → To: (0, 0), scale 1 (matches hero basil constants).
 */
function setMenuShapeTwoScrollTransform(p: number, reducedMotion: boolean) {
  const root = document.querySelector(".home-menu-shape-two");
  if (!root || !(root instanceof HTMLElement)) return;
  if (reducedMotion) {
    root.style.setProperty("--menu-shape-two-scale", "1");
    root.style.setProperty("--menu-shape-two-tx", "0px");
    root.style.setProperty("--menu-shape-two-ty", "0px");
    return;
  }
  const vw = window.innerWidth;
  const s = vw / DESIGN_W;
  const tx = (1 - p) * SHAPE_TWO_FROM_OFFSET_X * s;
  const ty = (1 - p) * SHAPE_TWO_FROM_OFFSET_Y * s;
  const sc =
    SHAPE_TWO_FROM_SCALE + (1 - SHAPE_TWO_FROM_SCALE) * p;
  root.style.setProperty("--menu-shape-two-scale", String(sc));
  root.style.setProperty("--menu-shape-two-tx", `${tx}px`);
  root.style.setProperty("--menu-shape-two-ty", `${ty}px`);
}

function setReservationScrollTransform(p: number, reducedMotion: boolean) {
  const root = document.querySelector(".home-reservation-bg");
  if (!root || !(root instanceof HTMLElement)) return;
  if (reducedMotion) {
    root.style.setProperty("--reservation-scroll-y", "0px");
    root.style.setProperty("--reservation-scroll-alt-y", "0px");
    return;
  }
  const vw = window.innerWidth;
  const scale = vw / DESIGN_W;
  const ty = p * RESERVATION_TO_OFFSET_Y * scale;
  const maxReservationOffset = Math.abs(RESERVATION_TO_OFFSET_Y) * scale;
  const altTy = -ty - maxReservationOffset;
  root.style.setProperty("--reservation-scroll-y", `${ty}px`);
  root.style.setProperty("--reservation-scroll-alt-y", `${altTy}px`);
}

/**
 * Scroll-linked transforms (Lenis / rAF spring ~0.28):
 * - `.home-hero-image-hand` + titles + hero shapes: section `#image`
 * - `#about-shape-01` / `#about-shape-02`: shared progress from `#about-shape-01` box
 * - `#menu-shape-01`: menu decorative shapes (raw 0→1 from this node; `.home-menu-shape-two` shares same `p`)
 */
export function HomeHeroHandScroll() {
  const reduceRef = useRef(false);
  const smoothRef = useRef(0);
  const aboutSmoothRef = useRef(0);
  const menuShapeSmoothRef = useRef(0);
  const reservationSmoothRef = useRef(0);
  const rafRef = useRef(0);
  /** `#image` raw progress that corresponds to “at document rest” (updated while at top). */
  const heroRestRawRef = useRef<number | null>(null);
  /** `#about-shape-01` raw at rest (updated while at document top). */
  const aboutRestRawRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const runScrollTransform = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const spring = 0.28;

    const step = () => {
      const scrollY =
        lenisRef.current?.animatedScroll ?? getWindowScrollY();
      const atDocumentRest = scrollY <= DOC_REST_SCROLL_MAX;

      const raw = rawProgressForImageSection();
      if (raw === null) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      const rawAbout = rawProgressForAboutScrollSection();
      const rawMenuShape = rawProgressForMenuShapeScrollSection();
      const rawReservation = rawProgressForReservationScrollSection();
      const target = reduceRef.current
        ? 0
        : normalizedFromRestRaw(raw, heroRestRawRef, atDocumentRest);
      const targetAbout = reduceRef.current
        ? 0
        : normalizedFromRestRaw(rawAbout, aboutRestRawRef, atDocumentRest);
      const targetMenuShape = reduceRef.current ? 0 : rawMenuShape;
      const targetReservation = reduceRef.current ? 0 : rawReservation;
      if (reduceRef.current) {
        smoothRef.current = target;
        aboutSmoothRef.current = targetAbout;
        menuShapeSmoothRef.current = targetMenuShape;
        reservationSmoothRef.current = targetReservation;
        setHandTransform(smoothRef.current);
        setTitleScrollTransform(smoothRef.current);
        setSecondaryTitleScrollTransform(smoothRef.current);
        setShapeOneScrollTransform(smoothRef.current, true);
        setShapeTwoScrollTransform(smoothRef.current, true);
        setAboutShapeScrollTransform(1, true);
        setAboutShape02ScrollTransform(1, true);
        setMenuShapeOneScrollTransform(1, true);
        setMenuShapeTwoScrollTransform(1, true);
        setReservationScrollTransform(0, true);
        return;
      }
      smoothRef.current += (target - smoothRef.current) * spring;
      if (Math.abs(target - smoothRef.current) < 0.0004) {
        smoothRef.current = target;
      }
      aboutSmoothRef.current +=
        (targetAbout - aboutSmoothRef.current) * spring;
      if (Math.abs(targetAbout - aboutSmoothRef.current) < 0.0004) {
        aboutSmoothRef.current = targetAbout;
      }
      menuShapeSmoothRef.current +=
        (targetMenuShape - menuShapeSmoothRef.current) * spring;
      if (Math.abs(targetMenuShape - menuShapeSmoothRef.current) < 0.0004) {
        menuShapeSmoothRef.current = targetMenuShape;
      }
      reservationSmoothRef.current +=
        (targetReservation - reservationSmoothRef.current) * spring;
      if (Math.abs(targetReservation - reservationSmoothRef.current) < 0.0004) {
        reservationSmoothRef.current = targetReservation;
      }
      setHandTransform(smoothRef.current);
      setTitleScrollTransform(smoothRef.current);
      setSecondaryTitleScrollTransform(smoothRef.current);
      setShapeOneScrollTransform(smoothRef.current, false);
      setShapeTwoScrollTransform(smoothRef.current, false);
      setAboutShapeScrollTransform(aboutSmoothRef.current, false);
      setAboutShape02ScrollTransform(aboutSmoothRef.current, false);
      setMenuShapeOneScrollTransform(menuShapeSmoothRef.current, false);
      setMenuShapeTwoScrollTransform(menuShapeSmoothRef.current, false);
      setReservationScrollTransform(reservationSmoothRef.current, false);
      if (
        Math.abs(target - smoothRef.current) > 0.002 ||
        Math.abs(targetAbout - aboutSmoothRef.current) > 0.002 ||
        Math.abs(targetMenuShape - menuShapeSmoothRef.current) > 0.002 ||
        Math.abs(targetReservation - reservationSmoothRef.current) > 0.002
      ) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
  }, []);

  const onLenis = useCallback(
    (lenis: Lenis) => {
      lenisRef.current = lenis;
      runScrollTransform();
    },
    [runScrollTransform],
  );

  useLenis(onLenis, [runScrollTransform]);

  useEffect(() => {
    const onResize = () => {
      heroRestRawRef.current = null;
      aboutRestRawRef.current = null;
      smoothRef.current = 0;
      aboutSmoothRef.current = 0;
      menuShapeSmoothRef.current = 0;
      reservationSmoothRef.current = 0;
      runScrollTransform();
    };
    window.addEventListener("resize", onResize, { passive: true });
    runScrollTransform();
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [runScrollTransform]);

  return null;
}
