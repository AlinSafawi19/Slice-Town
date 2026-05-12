import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type CommonProps = {
  className?: string;
  title?: string;
  iconSrc: string;
  iconAlt?: string;
  href?: string;
  openInNewTab?: boolean;
};

type CtaButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

type CtaLinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href" | "target">;

type CtaRootProps = {
  buttonClassName: string;
  children: ReactNode;
} & (
  | Omit<CtaButtonProps, "iconSrc" | "iconAlt" | "title">
  | Omit<CtaLinkProps, "iconSrc" | "iconAlt" | "title">
);

function CtaIcon({
  alt = "",
  className,
  src,
}: {
  alt?: string;
  className: string;
  src: string;
}) {
  return (
    <img
      alt={alt}
      className={className}
      draggable={false}
      src={src}
      loading="lazy"
    />
  );
}

function CtaContent({
  iconAlt,
  iconClassName,
  iconSrc,
  title,
  titleClassName = "cta-title type-text-xs-bold",
}: {
  iconSrc: string;
  iconAlt?: string;
  iconClassName: string;
  title?: string;
  titleClassName?: string;
}) {
  return (
    <>
      <CtaIcon alt={iconAlt} className={iconClassName} src={iconSrc} />
      {title ? <span className={titleClassName}>{title}</span> : null}
    </>
  );
}

function CtaRoot({
  buttonClassName,
  className,
  href,
  openInNewTab = true,
  children,
  ...rest
}: CtaRootProps) {
  const mergedClassName = [buttonClassName, className].filter(Boolean).join(" ");

  if (href) {
    const linkProps = rest as CtaLinkProps;
    return (
      <a
        {...linkProps}
        href={href}
        className={mergedClassName}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noreferrer noopener" : undefined}
      >
        {children}
      </a>
    );
  }

  const buttonProps = rest as CtaButtonProps;
  const { type = "button", ...buttonRest } = buttonProps;
  return (
    <button {...buttonRest} type={type} className={mergedClassName}>
      {children}
    </button>
  );
}

const ctaPrimaryClass = "cta-base cta-primary";
const ctaDarkVariantClass = "cta-base cta-dark";
const ctaLgVariantClass = "cta-base cta-lg";

const iconStd = "cta-icon-std";
const iconLg = "cta-icon-lg";

export function CtaButtonPrimary(props: CtaButtonProps | CtaLinkProps) {
  const { iconSrc, iconAlt, title, ...rest } = props;
  return (
    <CtaRoot buttonClassName={ctaPrimaryClass} {...rest}>
      <CtaContent
        iconAlt={iconAlt}
        iconClassName={iconStd}
        iconSrc={iconSrc}
        title={title}
      />
    </CtaRoot>
  );
}

export function CtaButtonDarkVariant(props: CtaButtonProps | CtaLinkProps) {
  const { iconSrc, iconAlt, title, ...rest } = props;
  return (
    <CtaRoot buttonClassName={ctaDarkVariantClass} {...rest}>
      <CtaContent
        iconAlt={iconAlt}
        iconClassName={iconStd}
        iconSrc={iconSrc}
        title={title}
        titleClassName="cta-title cta-title-dark type-text-xs-bold"
      />
    </CtaRoot>
  );
}

export function CtaButtonLgVariant(props: CtaButtonProps | CtaLinkProps) {
  const { iconSrc, iconAlt, ...rest } = props;
  return (
    <CtaRoot buttonClassName={ctaLgVariantClass} {...rest}>
      <CtaContent iconAlt={iconAlt} iconClassName={iconLg} iconSrc={iconSrc} />
    </CtaRoot>
  );
}

export default CtaRoot;
