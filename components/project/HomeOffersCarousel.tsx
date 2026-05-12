"use client";

import type { PointerEvent as ReactPointerEvent, TransitionEvent } from "react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

/** Framer “items ~1.75”: center card dominant, neighbors peek on both sides. */
const VISIBLE_ITEMS = 1.75;

const OFFER_IMAGES = [
  {
    src: "https://framerusercontent.com/images/w2seyWECLekUnH8V5MgKGSKrik.png?width=1374&height=840",
    w: 1374,
    h: 840,
  },
  {
    src: "https://framerusercontent.com/images/CNoWYVM5BcOLOMLjyQvRJYdeE4.png?width=1344&height=840",
    w: 1344,
    h: 840,
  },
  {
    src: "https://framerusercontent.com/images/OXKBWb8wV5jnA4ROkax6X9sfYD0.jpg?width=1374&height=840",
    w: 1374,
    h: 840,
  },
] as const;

const ARROW_PREV_SRC =
  "https://framerusercontent.com/images/aofwLDMUiF2eDItgJn8GrQVTQ0.svg?width=50&height=51";
const ARROW_NEXT_SRC =
  "https://framerusercontent.com/images/abc3xQQghI70qduYLM0eImTtV4.svg?width=50&height=51";

const AUTOPLAY_MS = 5200;
/** Pixels before we treat the gesture as a drag (not a tap). */
const DRAG_ACTIVATE_PX = 8;

type SlideEntry = (typeof OFFER_IMAGES)[number] & { reactKey: string };

function buildExtendedSlides(): SlideEntry[] {
  const last = OFFER_IMAGES[OFFER_IMAGES.length - 1];
  const first = OFFER_IMAGES[0];
  return [
    { ...last, reactKey: `clone-after-${last.src}` },
    ...OFFER_IMAGES.map((img, i) => ({ ...img, reactKey: `main-${i}` })),
    { ...first, reactKey: `clone-before-${first.src}` },
  ];
}

const EXTENDED_SLIDES = buildExtendedSlides();

function useMediaGap(): number {
  const [gap, setGap] = useState(50);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 808px)");
    const desktop = window.matchMedia("(min-width: 1200px)");

    function read(): void {
      if (mobile.matches) setGap(16);
      else if (desktop.matches) setGap(50);
      else setGap(30);
    }

    read();
    mobile.addEventListener("change", read);
    desktop.addEventListener("change", read);
    return () => {
      mobile.removeEventListener("change", read);
      desktop.removeEventListener("change", read);
    };
  }, []);

  return gap;
}

function logicalIndexFromTrack(trackIndex: number): number {
  return ((trackIndex - 1 + OFFER_IMAGES.length) % OFFER_IMAGES.length + OFFER_IMAGES.length) % OFFER_IMAGES.length;
}

export function HomeOffersCarousel() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragStartXRef = useRef<number | null>(null);
  const dragOffsetRef = useRef(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  /** 0 = clone last, 1..n = real, n+1 = clone first */
  const [trackIndex, setTrackIndex] = useState(1);
  const [realIndex, setRealIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  /** Skip CSS transition when jumping clone → real (same visual). */
  const [instantMove, setInstantMove] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  /** True from pointer down until release handling finishes (disables CSS transition while finger follows). */
  const [dragPointerDown, setDragPointerDown] = useState(false);
  const gapPx = useMediaGap();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    function read(): void {
      setReduceMotion(mq.matches);
    }
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    function measure(): void {
      const node = viewportRef.current;
      if (node) setViewportWidth(node.clientWidth);
    }

    measure();
    const ro = new ResizeObserver(() => {
      measure();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
      },
      { threshold: 0.12, rootMargin: "0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const V = viewportWidth;
  const slideW = V > 0 ? V / VISIBLE_ITEMS : 0;
  const n = OFFER_IMAGES.length;

  const centerTranslate = useCallback(
    (ti: number, width: number, gap: number, vw: number) => {
      if (vw <= 0 || width <= 0) return 0;
      return (vw - width) / 2 - ti * (width + gap);
    },
    [],
  );

  const translateExtended = centerTranslate(trackIndex, slideW, gapPx, V);
  const translateSimple = centerTranslate(realIndex, slideW, gapPx, V);
  const baseTranslateX = reduceMotion ? translateSimple : translateExtended;
  const translateXWithDrag = baseTranslateX + dragOffset;

  const goNext = useCallback(() => {
    if (reduceMotion) {
      setRealIndex((i) => (i + 1) % n);
      return;
    }
    setTrackIndex((ti) => {
      if (ti >= EXTENDED_SLIDES.length - 1) return ti;
      return ti + 1;
    });
  }, [n, reduceMotion]);

  const goPrev = useCallback(() => {
    if (reduceMotion) {
      setRealIndex((i) => (i - 1 + n) % n);
      return;
    }
    setTrackIndex((ti) => {
      if (ti <= 0) return ti;
      return ti - 1;
    });
  }, [n, reduceMotion]);

  const stepReady = slideW > 0 && V > 0;
  const autoplayActive =
    !reduceMotion &&
    !paused &&
    inView &&
    stepReady &&
    !instantMove &&
    !dragPointerDown;

  useEffect(() => {
    if (!autoplayActive) return;
    const t = window.setInterval(goNext, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [autoplayActive, goNext]);

  const handleTransitionEnd = useCallback(
    (e: TransitionEvent<HTMLDivElement>) => {
      if (e.propertyName !== "transform") return;
      if (reduceMotion) return;
      if (e.target !== e.currentTarget) return;

      if (trackIndex === EXTENDED_SLIDES.length - 1) {
        setInstantMove(true);
        setTrackIndex(1);
      } else if (trackIndex === 0) {
        setInstantMove(true);
        setTrackIndex(n);
      }
    },
    [n, reduceMotion, trackIndex],
  );

  useEffect(() => {
    if (!instantMove) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setInstantMove(false));
    });
    return () => cancelAnimationFrame(id);
  }, [instantMove]);

  const trackTransition =
    dragPointerDown || instantMove || reduceMotion
      ? "none"
      : "transform 0.62s cubic-bezier(0.22, 1, 0.32, 1)";

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.style.setProperty("--home-offer-carousel-tx", `${translateXWithDrag}px`);
    el.style.setProperty("--home-offer-carousel-transition", trackTransition);
    el.style.setProperty("--home-offer-carousel-gap", `${gapPx}px`);
    if (slideW > 0) {
      el.style.setProperty("--home-offer-carousel-slide-w", `${slideW}px`);
    } else {
      el.style.removeProperty("--home-offer-carousel-slide-w");
    }
  }, [gapPx, slideW, trackTransition, translateXWithDrag]);

  const commitDragEnd = useCallback(() => {
    if (dragStartXRef.current == null) return;
    const dx = dragOffsetRef.current;
    setDragPointerDown(false);
    dragStartXRef.current = null;
    dragOffsetRef.current = 0;
    setDragOffset(0);
    if (slideW <= 0) return;
    const threshold = Math.max(48, Math.min(100, slideW * 0.12));
    if (dx <= -threshold) goNext();
    else if (dx >= threshold) goPrev();
  }, [goNext, goPrev, slideW]);

  const onViewportPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (e.button !== 0) return;
      const el = viewportRef.current;
      if (!el || slideW <= 0) return;
      dragStartXRef.current = e.clientX;
      dragOffsetRef.current = 0;
      setDragOffset(0);
      setDragPointerDown(true);
      el.setPointerCapture(e.pointerId);
    },
    [slideW],
  );

  const onViewportPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (dragStartXRef.current == null) return;
      const dx = e.clientX - dragStartXRef.current;
      if (Math.abs(dx) >= DRAG_ACTIVATE_PX) {
        e.preventDefault();
      }
      dragOffsetRef.current = dx;
      setDragOffset(dx);
    },
    [],
  );

  const onViewportPointerUp = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const el = viewportRef.current;
      if (el?.hasPointerCapture(e.pointerId)) {
        el.releasePointerCapture(e.pointerId);
      }
      commitDragEnd();
    },
    [commitDragEnd],
  );

  const onViewportLostPointerCapture = useCallback(() => {
    commitDragEnd();
  }, [commitDragEnd]);

  const slides = reduceMotion
    ? OFFER_IMAGES.map((img, i) => ({ ...img, reactKey: `rm-${i}` }))
    : EXTENDED_SLIDES;

  const activeLogical = reduceMotion
    ? realIndex
    : logicalIndexFromTrack(trackIndex);

  return (
    <div
      className="home-offer-carousel"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="home-offer-carousel__arrows-rail">
        <div className="home-offer-carousel__arrows">
          <button
            type="button"
            className="home-offer-carousel__arrow"
            onClick={goPrev}
            aria-label="Previous offer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ARROW_PREV_SRC} alt="" width={50} height={51} draggable={false} />
          </button>
          <button
            type="button"
            className="home-offer-carousel__arrow"
            onClick={goNext}
            aria-label="Next offer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ARROW_NEXT_SRC} alt="" width={50} height={51} draggable={false} />
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className={[
          "home-offer-carousel__viewport",
          dragPointerDown ? "home-offer-carousel__viewport--dragging" : "",
        ].join(" ")}
        role="region"
        aria-roledescription="carousel"
        aria-label="Promotional offers"
        onPointerDown={onViewportPointerDown}
        onPointerMove={onViewportPointerMove}
        onPointerUp={onViewportPointerUp}
        onPointerCancel={onViewportPointerUp}
        onLostPointerCapture={onViewportLostPointerCapture}
      >
        <div
          ref={trackRef}
          className="home-offer-carousel__track"
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((item, i) => {
            const logical = reduceMotion ? i : (i - 1 + n) % n;
            const isActive = logical === activeLogical;
            return (
              <div
                key={item.reactKey}
                className={[
                  "home-offer-carousel__slide",
                  isActive ? "home-offer-carousel__slide--active" : "",
                ].join(" ")}
                {...(isActive ? {} : { "aria-hidden": "true" })}
              >
                <div className="home-offer-carousel__slide-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt=""
                    width={item.w}
                    height={item.h}
                    className="home-offer-carousel__img"
                    draggable={false}
                    loading={isActive ? "eager" : "lazy"}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
