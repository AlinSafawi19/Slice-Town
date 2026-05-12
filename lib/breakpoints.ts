/** Pixel widths — must match `app/globals.css` @theme / @custom-variant. */

export const BREAKPOINT_PX = {
  /** min-width for tablet and up */
  tablet: 809,
  /** min-width for desktop */
  desktop: 1200,
} as const;

/** max-width for mobile-only */
export const MOBILE_MAX_PX = BREAKPOINT_PX.tablet - 1;

/** max-width for tablet-only (809–1199) */
export const TABLET_MAX_PX = BREAKPOINT_PX.desktop - 1;

export const media = {
  mobile: `(max-width: ${MOBILE_MAX_PX}px)`,
  tabletUp: `(min-width: ${BREAKPOINT_PX.tablet}px)`,
  tabletOnly: `(min-width: ${BREAKPOINT_PX.tablet}px) and (max-width: ${TABLET_MAX_PX}px)`,
  desktopUp: `(min-width: ${BREAKPOINT_PX.desktop}px)`,
} as const;
