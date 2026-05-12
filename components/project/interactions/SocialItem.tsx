import type { AnchorHTMLAttributes, ReactNode } from "react";

export type SocialItemProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "href" | "target" | "children"
> & {
  className?: string;
  href: string;
  iconAlt?: string;
  iconSrc: string;
  openInNewTab?: boolean;
  title: string;
};

const socialItemBaseClass = "social-item";

const iconBaseClass = "social-item-icon";

const titleClass = "social-item-title type-body";

function SocialItemRoot({
  className,
  children,
  href,
  openInNewTab = true,
  ...rest
}: Omit<SocialItemProps, "iconAlt" | "iconSrc" | "title"> & {
  children: ReactNode;
}) {
  return (
    <a
      {...rest}
      href={href}
      className={className}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noreferrer noopener" : undefined}
    >
      {children}
    </a>
  );
}

export function SocialItemPrimary({
  className = "",
  href,
  iconAlt = "",
  iconSrc,
  openInNewTab,
  title,
  ...rest
}: SocialItemProps) {
  const rootClassName = [socialItemBaseClass, className].filter(Boolean).join(" ");

  return (
    <SocialItemRoot
      {...rest}
      href={href}
      openInNewTab={openInNewTab}
      className={rootClassName}
    >
      <img
        alt={iconAlt}
        className={iconBaseClass}
        draggable={false}
        src={iconSrc}
      />
      <p className={titleClass}>{title}</p>
    </SocialItemRoot>
  );
}

export default SocialItemPrimary;
