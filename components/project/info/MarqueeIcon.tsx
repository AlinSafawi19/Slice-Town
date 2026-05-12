import type { ReactNode } from "react";

const marqueeIconClass = "marquee-icon";

export type MarqueeIconProps = {
  children?: ReactNode;
  className?: string;
};

export function MarqueeIcon({
  children,
  className = "",
}: MarqueeIconProps) {
  return (
    <div className={[marqueeIconClass, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

export default MarqueeIcon;
