"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * Scroll-triggered fade-in (enter opacity 0 → 1, spring). Once shown, stays visible (replay off).
 */
export function InViewReveal({
  children,
  className = "",
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.12,
}: {
  children?: ReactNode;
  className?: string;
  /** Passed to `IntersectionObserver` (Framer-style “layer in view” tuning). */
  rootMargin?: string;
  threshold?: number | number[];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { root: null, rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div
      ref={ref}
      className={[
        "in-view-reveal",
        visible ? "in-view-reveal--visible" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
