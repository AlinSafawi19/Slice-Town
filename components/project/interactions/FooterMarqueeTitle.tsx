import type { ImgHTMLAttributes } from "react";

const rowBaseClass = "footer-marquee-row";

const titleClass = "footer-marquee-title type-h2 type-case-none";

const imgBaseClass = "footer-marquee-img";

export type FooterMarqueeTitleProps = {
  /** Decorative strip / graphic next to the title (e.g. marquee artwork). */
  imageSrc: string;
  imageAlt?: string;
  /** Defaults to `Order -`. */
  title?: string;
  className?: string;
  imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;
};

function FooterMarqueeTitleImage({
  className,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      {...rest}
      alt={rest.alt ?? ""}
      draggable={false}
      loading="lazy"
      className={[imgBaseClass, className].filter(Boolean).join(" ")}
    />
  );
}

/**
 * Footer marquee heading row: “Order -” (Heading 2, gray-1, sentence case) + image.
 * Row height follows type-h2 line-height so nothing is clipped; image uses contain (no crop).
 */
export function FooterMarqueeTitlePrimary({
  imageSrc,
  imageAlt = "",
  title = "Order -",
  className = "",
  imgProps,
}: FooterMarqueeTitleProps) {
  const { className: imgClassName, ...restImgProps } = imgProps ?? {};

  return (
    <div
      className={[rowBaseClass, className].filter(Boolean).join(" ")}
    >
      <span className={titleClass}>{title}</span>
      <FooterMarqueeTitleImage
        {...restImgProps}
        src={imageSrc}
        alt={imageAlt}
        className={[imgBaseClass, imgClassName].filter(Boolean).join(" ")}
      />
    </div>
  );
}

export default FooterMarqueeTitlePrimary;
