import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";

const buttonPrimaryClass = [
  "btn-base btn-shadow btn-pad-std btn-primary",
].join(" ");

const buttonTextWrapperClass = "btn-text-wrap";

const titleClass = "btn-title type-button";
const buttonLgTitleClass = "btn-title btn-title-lg-hover type-button";

const imageClass = "btn-img";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonClassName: string;
  children: ReactNode;
};

export function Button({
  buttonClassName,
  children,
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      className={[buttonClassName, className].filter(Boolean).join(" ")}
    >
      {children}
    </button>
  );
}

type ButtonContentProps = {
  title: string;
  imageSrc?: string;
  imageAlt?: string;
  titleClassName?: string;
  gapClassName?: string;
};

function ButtonContent({
  title,
  imageSrc,
  imageAlt = "",
  titleClassName = titleClass,
  gapClassName,
}: ButtonContentProps) {
  return (
    <span
      className={[buttonTextWrapperClass, gapClassName].filter(Boolean).join(" ")}
    >
      <span className={titleClassName}>{title}</span>
      {imageSrc ? (
        <img
          alt={imageAlt}
          className={imageClass}
          draggable={false}
          src={imageSrc}
        />
      ) : null}
    </span>
  );
}

const buttonPrimaryVariantClass = [
  "btn-base btn-shadow btn-pad-std bg-primary-1 btn-primary-variant",
].join(" ");

const buttonLgVariantClass = [
  "btn-base btn-pad-lg btn-lg btn-lg-variant",
].join(" ");

export type ButtonPrimaryProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function ButtonPrimary({
  title,
  imageSrc,
  imageAlt,
  ...props
}: ButtonPrimaryProps) {
  return (
    <Button buttonClassName={buttonPrimaryClass} {...props}>
      <ButtonContent title={title} imageSrc={imageSrc} imageAlt={imageAlt} />
    </Button>
  );
}

export type ButtonPrimaryVariantProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
};

export function ButtonPrimaryVariant({
  title,
  ...props
}: ButtonPrimaryVariantProps) {
  return (
    <Button buttonClassName={buttonPrimaryVariantClass} {...props}>
      <ButtonContent title={title} />
    </Button>
  );
}

export type ButtonLgVariantProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
};

export function ButtonLgVariant({ title, ...props }: ButtonLgVariantProps) {
  return (
    <Button buttonClassName={buttonLgVariantClass} {...props}>
      <ButtonContent title={title} titleClassName={buttonLgTitleClass} />
    </Button>
  );
}

export type ButtonPrimaryLinkProps = Omit<
  ComponentProps<typeof Link>,
  "className" | "children"
> & {
  title: string;
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
};

const UBER_EATS_HREF = "https://www.ubereats.com/";

const UBER_EATS_WORDMARK_SRC =
  "https://framerusercontent.com/images/NgumlGHd9nxRyfI93Vo28WoP6o.svg?width=121&height=20";

/** White filled button as an internal link (matches `ButtonPrimary`). */
export function ButtonPrimaryLink({
  title,
  className = "",
  imageSrc,
  imageAlt,
  ...props
}: ButtonPrimaryLinkProps) {
  return (
    <Link
      {...props}
      className={[buttonPrimaryClass, className].filter(Boolean).join(" ")}
    >
      <ButtonContent title={title} imageSrc={imageSrc} imageAlt={imageAlt} />
    </Link>
  );
}

export type ButtonUberEatsLinkProps = Omit<
  ButtonPrimaryLinkProps,
  "href" | "title" | "imageSrc" | "imageAlt"
>;

/** White filled button linking to Uber Eats with wordmark (opens in a new tab). */
export function ButtonUberEatsLink({
  className = "",
  ...props
}: ButtonUberEatsLinkProps) {
  return (
    <ButtonPrimaryLink
      {...props}
      href={UBER_EATS_HREF}
      title="Order on - "
      imageSrc={UBER_EATS_WORDMARK_SRC}
      imageAlt="Uber Eats"
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    />
  );
}

export type ButtonPrimaryVariantLinkProps = Omit<
  ComponentProps<typeof Link>,
  "className" | "children"
> & {
  title: string;
  className?: string;
};

/** Primary (orange) filled button as an internal link (matches `ButtonPrimaryVariant`). */
export function ButtonPrimaryVariantLink({
  title,
  className = "",
  ...props
}: ButtonPrimaryVariantLinkProps) {
  return (
    <Link
      {...props}
      className={[buttonPrimaryVariantClass, className].filter(Boolean).join(" ")}
    >
      <ButtonContent title={title} />
    </Link>
  );
}

export default Button;
