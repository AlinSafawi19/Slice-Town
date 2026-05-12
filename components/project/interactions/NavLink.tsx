import Link from "next/link";
import type { ComponentProps } from "react";

const navLinkBaseClass = "nav-link";

const labelClass = "nav-link-label type-nav";

export type NavLinkProps = Omit<ComponentProps<typeof Link>, "className" | "children"> & {
  label: string;
  className?: string;
};

/**
 * Section nav link: hover + current (`aria-current="page"`).
 * Current fill uses palette utilities from globals — not `aria-*` selectors, which lose to `bg-white`
 * in the stylesheet when specificity is equal.
 */
export function NavLinkPrimary({
  className = "",
  label,
  "aria-current": ariaCurrent,
  ...linkProps
}: NavLinkProps) {
  const isCurrent = ariaCurrent === "page";

  return (
    <Link
      {...linkProps}
      aria-current={ariaCurrent}
      className={[
        navLinkBaseClass,
        isCurrent ? "nav-link-surface-current" : "nav-link-surface-inactive",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p className={labelClass}>{label}</p>
    </Link>
  );
}

export default NavLinkPrimary;
