"use client";

import React, {
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  useMemo,
  startTransition,
  type CSSProperties,
  type ReactNode,
} from "react";

export type GalleryTickerProps = {
  /** Ticker cells (images, cards, etc.) */
  children?: ReactNode;
  /** Time for one full loop in seconds (lower = faster) */
  speedSeconds?: number;
  transitionDuration?: number;
  hoverScale?: number;
  style?: CSSProperties;
};

/**
 * Horizontal Pizza Party Ticker with slot-style children.
 *
 * Responsive, full-width, infinite left-to-right scrolling ticker. Children are
 * repeated to fill width; height is fit-content. No overflow hidden, no visible
 * label or alt text, no extra space at bottom, no shadow.
 */
export default function GalleryTicker(props: GalleryTickerProps) {
  const { children, speedSeconds = 32, style } = props;

  const isStatic = false;

  const [offset, setOffset] = useState(0);

  const items = useMemo(() => {
    if (children == null) return [];
    return React.Children.toArray(children).filter(Boolean);
  }, [children]);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    itemRefs.current = items.map(() => null);
  }, [items]);

  const [itemWidths, setItemWidths] = useState<number[]>([]);

  useLayoutEffect(() => {
    if (!itemRefs.current.length) return;
    const widths = itemRefs.current.map((ref) =>
      ref && ref.offsetWidth ? ref.offsetWidth : 140,
    );
    setItemWidths(widths);
  }, [items]);

  const tickerLength = useMemo(
    () => itemWidths.reduce((a, b) => a + b, 0),
    [itemWidths],
  );

  useEffect(() => {
    if (isStatic || !tickerLength) return;
    let running = true;
    let last = performance.now();
    const pxPerSecond =
      speedSeconds > 0 ? tickerLength / speedSeconds : 40;
    function animate(now: number) {
      if (!running) return;
      const dt = now - last;
      last = now;
      startTransition(() => {
        setOffset((prev) => {
          let next = prev + (dt * pxPerSecond) / 1000;
          if (next > tickerLength) next -= tickerLength;
          return next;
        });
      });
      requestAnimationFrame(animate);
    }
    const raf = requestAnimationFrame(animate);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
    };
  }, [speedSeconds, tickerLength, isStatic]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.offsetWidth || 0);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items.length]);

  const repeatCount =
    tickerLength > 0 && containerWidth > 0
      ? Math.ceil((containerWidth * 2) / tickerLength)
      : 2;
  const totalRepeat = Math.max(2, repeatCount);

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

  if (items.length === 0) return null;

  return (
    <div
      ref={containerRef}
      style={{
        ...style,
        width: "100%",
        height: "fit-content",
        minHeight: 0,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "fit-content",
          minHeight: 0,
          position: "relative",
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "flex-end",
          willChange: "transform",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            transform: `translateX(${-offset}px)`,
            transition: isStatic ? "none" : undefined,
            height: "fit-content",
            pointerEvents: "none",
          }}
        >
          {tickerItems.map((child, i) => {
            const childKey = getChildKey(child, i);
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
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 0,
                  padding: 0,
                  border: "none",
                  borderRadius: 0,
                  minWidth: 0,
                  minHeight: 0,
                  userSelect: "none",
                  zIndex: 1,
                  position: "relative",
                  transform: "scale(1)",
                  pointerEvents: "auto",
                }}
              >
                {child}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
