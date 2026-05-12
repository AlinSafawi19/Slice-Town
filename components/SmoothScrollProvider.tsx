"use client";

import { ReactLenis } from "lenis/react";

/** Design panel: intensity 10 → Lenis lerp 0.1 (linear interpolation strength). */
const SCROLL_LERP_INTENSITY = 10;

const lenisLerp = SCROLL_LERP_INTENSITY / 100;

const lenisOptions = {
  lerp: lenisLerp,
  smoothWheel: true,
  autoRaf: true,
  /** Same-path `#` links (nav, footer CTAs): smooth scroll via Lenis instead of an instant jump. */
  anchors: { lerp: lenisLerp },
} as const;

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
