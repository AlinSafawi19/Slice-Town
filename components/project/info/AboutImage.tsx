import Image, { type ImageProps } from "next/image";
import type { ReactNode } from "react";

const aboutImageOuterPrimary = "about-img-outer about-img-outer--primary";

const aboutImageOuterMobile = "about-img-outer about-img-outer--mobile";

const imageWrapperClass = "about-img-wrap";

const aboutImageMediaShellClass = "about-img-shell";

export type AboutImageProps = {
  children: ReactNode;
  className?: string;
};

export type AboutImageMobileProps = {
  children: ReactNode;
  className?: string;
};

export type ImageWrapperProps = {
  children?: ReactNode;
  className?: string;
};

export type AboutImageMediaProps = Omit<
  ImageProps,
  "fill" | "width" | "height"
> & {
  alt?: string;
};

export function AboutImage({ children, className = "" }: AboutImageProps) {
  return (
    <div
      className={[aboutImageOuterPrimary, className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}

export function AboutImageMobile({
  children,
  className = "",
}: AboutImageMobileProps) {
  return (
    <div
      className={[aboutImageOuterMobile, className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}

export function ImageWrapper({ children, className = "" }: ImageWrapperProps) {
  return (
    <div
      className={[imageWrapperClass, className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}

export function AboutImageMedia({
  className = "",
  alt = "",
  sizes = "(max-width: 809px) 360px, 360px",
  priority,
  ...rest
}: AboutImageMediaProps) {
  return (
    <div
      className={[aboutImageMediaShellClass, className].filter(Boolean).join(
        " ",
      )}
    >
      <Image
        {...rest}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="media-img-fill"
      />
    </div>
  );
}

export default AboutImage;
