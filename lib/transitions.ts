/** Transition "Ease In Out" — matches design (cubic-bezier, 0.45s, delay 0). */

export const easeInOut = {
  bezier: [0.44, 0, 0.56, 1] as const,
  css: "cubic-bezier(0.44, 0, 0.56, 1)",
  durationMs: 450,
  delayMs: 0,
} as const;

/**
 * Transition "Spring" — Time 0.4s, Bounce 0.2, Delay 0 (design panel).
 * Use `spring.motion` with Motion / Framer Motion for physics-accurate spring.
 */
export const spring = {
  name: "spring" as const,
  durationMs: 400,
  delayMs: 0,
  bounce: 0.2,
  /** Cubic-bezier stand-in for CSS `transition` / Tailwind `ease-spring`. */
  bezier: [0.26, 0.92, 0.32, 1.03] as const,
  css: "cubic-bezier(0.26, 0.92, 0.32, 1.03)",
  /** Pass to motion components when you want real spring physics. */
  motion: {
    type: "spring" as const,
    bounce: 0.2,
    duration: 0.4,
  },
} as const;
