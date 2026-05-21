"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type GalleryTickerProps = {
  /** Ticker cells (images, cards, etc.) */
  children?: ReactNode;
  /** Time for one full loop in seconds (lower = faster). Ignored when `pixelsPerSecond` is set. */
  speedSeconds?: number;
  /** Constant scroll speed in CSS pixels per second (overrides `speedSeconds`). */
  pixelsPerSecond?: number;
  transitionDuration?: number;
  hoverScale?: number;
  /** Multiplier on scroll speed (e.g. `0.2` for 20% playback). Default `1`. */
  playbackRate?: number;
  /** On hover, multiply speed by this factor (e.g. `0.4` = slower). Default `1` (no hover change). */
  hoverPlaybackRate?: number;
  /** Classes on the outer measurement/clip container */
  containerClassName?: string;
  /** Classes on the inner scrolling row (`flex` — use for gap, alignment) */
  rowClassName?: string;
};

/**
 * Horizontal Pizza Party Ticker with Slot support.
 *
 * Responsive, full-width, infinite scrolling ticker. Ticker items are provided
 * as children (slot-style). Height is fit-content. No overflow hidden, no visible
 * label or alt text, no extra space at bottom, no shadow.
 */
export default function GalleryTicker(props: GalleryTickerProps) {
  const {
    children,
    speedSeconds = 32,
    pixelsPerSecond,
    playbackRate = 1,
    hoverPlaybackRate = 1,
    containerClassName = "",
    rowClassName = "",
  } = props;

  const [offset, setOffset] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Flatten children array
  const items = useMemo(() => {
    if (children == null) return [];
    return React.Children.toArray(children).filter(Boolean);
  }, [children]);

  // Refs for the first set of items only (do not clear after commit — that broke measurements)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rowRef = useRef<HTMLDivElement | null>(null);
  /** Pixel width of one repeated segment: all cells + flex gaps (must match scroll wrap). */
  const [loopSpanPx, setLoopSpanPx] = useState(0);
  const itemCount = items.length;

  useLayoutEffect(() => {
    itemRefs.current.length = itemCount;

    function measure(): void {
      const first = itemRefs.current[0];
      const second = itemRefs.current[1];
      const last = itemRefs.current[itemCount - 1];
      if (!first || !last || itemCount < 1) return;
      let span = last.offsetLeft + last.offsetWidth - first.offsetLeft;
      // Include the trailing gap so the seam between the last item of one copy
      // and the first item of the next is identical to the gap between other items.
      if (second && itemCount > 1) {
        const gap = second.offsetLeft - (first.offsetLeft + first.offsetWidth);
        if (gap > 0) span += gap;
      }
      if (span > 0) {
        setLoopSpanPx(span);
      } else {
        requestAnimationFrame(() => measure());
      }
    }

    measure();

    const ro = new ResizeObserver(() => {
      measure();
    });
    for (let i = 0; i < itemCount; i++) {
      const el = itemRefs.current[i];
      if (el) ro.observe(el);
    }
    if (rowRef.current) ro.observe(rowRef.current);

    return () => {
      ro.disconnect();
    };
  }, [itemCount]);

  const hoverFactor =
    hoverPlaybackRate !== 1 && hovered ? hoverPlaybackRate : 1;
  const speedMultiplier = playbackRate * hoverFactor;

  // Animation loop (do not use startTransition — it deprioritizes updates and stalls the marquee)
  useEffect(() => {
    if (!loopSpanPx) return;
    let running = true;
    let last = performance.now();
    const pxPerSecond =
      pixelsPerSecond != null && pixelsPerSecond > 0
        ? pixelsPerSecond * speedMultiplier
        : speedSeconds > 0
          ? (loopSpanPx / speedSeconds) * speedMultiplier
          : 40 * speedMultiplier;

    function animate(now: number) {
      if (!running) return;
      const dt = now - last;
      last = now;
      setOffset((prev) => {
        let next = prev + (dt * pxPerSecond) / 1000;
        if (next > loopSpanPx) next -= loopSpanPx;
        return next;
      });
      requestAnimationFrame(animate);
    }

    const raf = requestAnimationFrame(animate);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
    };
  }, [speedSeconds, pixelsPerSecond, speedMultiplier, loopSpanPx]);

  // Get container width — useLayoutEffect so the value is ready before the first
  // animated frame, avoiding a brief window where only 2 copies exist on screen.
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.offsetWidth || 0);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items.length]);

  // How many times to repeat to fill at least 2x container width.
  // Start with at least 5 copies so the ticker is fully populated before
  // loopSpanPx / containerWidth are both measured.
  const repeatCount =
    loopSpanPx > 0 && containerWidth > 0
      ? Math.ceil((containerWidth * 2) / loopSpanPx)
      : 5;
  const totalRepeat = Math.max(5, repeatCount);

  const tickerItems = useMemo(() => {
    if (items.length === 0) return [];
    let arr: React.ReactNode[] = [];
    for (let i = 0; i < totalRepeat; i++) arr = arr.concat(items);
    return arr;
  }, [items, totalRepeat]);

  function getChildKey(child: React.ReactNode, i: number): string {
    if (React.isValidElement(child) && child.key != null) {
      return String(child.key);
    }
    return `item-${i % items.length}`;
  }

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    el.style.transform = `translateX(${-offset}px)`;
  }, [offset]);

  if (items.length === 0) return null;

  return (
    <div
      ref={containerRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className={["gallery-ticker", containerClassName].filter(Boolean).join(" ")}
    >
      <div className="gallery-ticker-track-wrap">
        <div
          ref={rowRef}
          className={["gallery-ticker-row", rowClassName].filter(Boolean).join(" ")}
        >
          {tickerItems.map((child, i) => {
            const childKey = getChildKey(child, i);
            // Only assign refs for the first set
            const ref =
              i < items.length
                ? (el: HTMLDivElement | null) => {
                    itemRefs.current[i] = el;
                  }
                : undefined;

            return (
              <div
                key={`${childKey}-${i}`}
                ref={ref}
                className="gallery-ticker-cell"
              >
                <div className="gallery-ticker-cell-inner">
                  {child}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
