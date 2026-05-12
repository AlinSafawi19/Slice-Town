import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";

const rootPrimaryClass = "menu-card";

const menuImageOuterClass = "menu-img-outer";

const imageWrapClass = "menu-img-wrap";

const imageClass = "menu-img";

const overlayInteractiveClass = "menu-overlay";

const orderLabelClass = "menu-order-label type-button";

const contentClass = "menu-body";

const nameClass = "menu-name type-text-lead-bold";

const sizeRowClass = "menu-size-row";

const sizeItemClass = "menu-size-item";

const dividerClass = "menu-size-divider";

const bodyCenterClass = "menu-body-text type-body";

const priceWrapClass = "menu-price-wrap";

/** Red star (34×34 viewBox) for optional menu card badge; scales with badge wrap. */
const MENU_ITEM_BADGE_STAR_SRC =
  `data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34" overflow="visible"><path fill="#FF0000" d="M 15.883 1.448 C 16.448 0.716 17.552 0.716 18.117 1.448 L 18.117 1.448 C 18.744 2.261 19.896 2.443 20.744 1.864 L 20.744 1.864 C 21.507 1.342 22.557 1.684 22.868 2.554 L 22.868 2.554 C 23.213 3.521 24.253 4.051 25.238 3.762 L 25.238 3.762 C 26.125 3.501 27.018 4.15 27.045 5.075 L 27.045 5.075 C 27.074 6.101 27.899 6.926 28.925 6.955 L 28.925 6.955 C 29.85 6.982 30.499 7.875 30.238 8.762 L 30.238 8.762 C 29.949 9.747 30.479 10.787 31.446 11.132 L 31.446 11.132 C 32.316 11.443 32.658 12.493 32.136 13.256 L 32.136 13.256 C 31.557 14.104 31.739 15.256 32.552 15.883 L 32.552 15.883 C 33.284 16.448 33.284 17.552 32.552 18.117 L 32.552 18.117 C 31.739 18.744 31.557 19.896 32.136 20.744 L 32.136 20.744 C 32.658 21.507 32.316 22.557 31.446 22.868 L 31.446 22.868 C 30.479 23.213 29.949 24.253 30.238 25.238 L 30.238 25.238 C 30.499 26.125 29.85 27.018 28.925 27.045 L 28.925 27.045 C 27.899 27.074 27.074 27.899 27.045 28.925 L 27.045 28.925 C 27.018 29.85 26.125 30.499 25.238 30.238 L 25.238 30.238 C 24.253 29.949 23.213 30.479 22.868 31.446 L 22.868 31.446 C 22.557 32.316 21.507 32.658 20.744 32.136 L 20.744 32.136 C 19.896 31.557 18.744 31.739 18.117 32.552 L 18.117 32.552 C 17.552 33.284 16.448 33.284 15.883 32.552 L 15.883 32.552 C 15.256 31.739 14.104 31.557 13.256 32.136 L 13.256 32.136 C 12.493 32.658 11.443 32.316 11.132 31.446 L 11.132 31.446 C 10.787 30.479 9.747 29.949 8.762 30.238 L 8.762 30.238 C 7.875 30.499 6.982 29.85 6.955 28.925 L 6.955 28.925 C 6.926 27.899 6.101 27.074 5.075 27.045 L 5.075 27.045 C 4.15 27.018 3.501 26.125 3.762 25.238 L 3.762 25.238 C 4.051 24.253 3.521 23.213 2.554 22.868 L 2.554 22.868 C 1.684 22.557 1.342 21.507 1.864 20.744 L 1.864 20.744 C 2.443 19.896 2.261 18.744 1.448 18.117 L 1.448 18.117 C 0.716 17.552 0.716 16.448 1.448 15.883 L 1.448 15.883 C 2.261 15.256 2.443 14.104 1.864 13.256 L 1.864 13.256 C 1.342 12.493 1.684 11.443 2.554 11.132 L 2.554 11.132 C 3.521 10.787 4.051 9.747 3.762 8.762 L 3.762 8.762 C 3.501 7.875 4.15 6.982 5.075 6.955 L 5.075 6.955 C 6.101 6.926 6.926 6.101 6.955 5.075 L 6.955 5.075 C 6.982 4.15 7.875 3.501 8.762 3.762 L 8.762 3.762 C 9.747 4.051 10.787 3.521 11.132 2.554 L 11.132 2.554 C 11.443 1.684 12.493 1.342 13.256 1.864 L 13.256 1.864 C 14.104 2.443 15.256 2.261 15.883 1.448 Z"/></svg>',
  )}`;

export type MenuItemProps = {
  imageSrc: string;
  imageAlt?: string;
  /** Dish name (Heading / text lead bold). */
  name: string;
  /** First line in the price block (e.g. currency or amount). */
  regularPriceLine1?: string;
  regularPriceLine2: string;
  largePriceLine1?: string;
  largePriceLine2: string;
  orderHref?: string;
  orderLabel?: string;
  /** When set, shows a corner badge (e.g. “Hot”) on the dish image. */
  badgeText?: string;
  className?: string;
  imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;
  orderLinkProps?: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;
};

function MenuImageBlock({
  imageSrc,
  imageAlt = "",
  imgProps,
  orderHref,
  orderLabel = "Order Now",
  orderLinkProps,
  disableOrderLink,
  menuImageOuterClassName,
  imageWrapClassName,
  badgeText,
}: {
  imageSrc: string;
  imageAlt?: string;
  imgProps?: MenuItemProps["imgProps"];
  orderHref?: string;
  orderLabel?: string;
  orderLinkProps?: MenuItemProps["orderLinkProps"];
  disableOrderLink?: boolean;
  imageWrapClassName: string;
  menuImageOuterClassName: string;
  badgeText?: string;
}) {
  const { className: imgClassName, ...restImgProps } = imgProps ?? {};

  const orderControl = orderHref && !disableOrderLink ? (
    <a
      {...orderLinkProps}
      href={orderHref}
      className="menu-order-btn"
    >
      <p className={orderLabelClass}>{orderLabel}</p>
    </a>
  ) : (
    <span className="menu-order-btn">
      <p className={orderLabelClass}>{orderLabel}</p>
    </span>
  );

  return (
    <div className={menuImageOuterClassName}>
      <div className={imageWrapClassName}>
        <img
          {...restImgProps}
          alt={imageAlt}
          className={[imageClass, imgClassName].filter(Boolean).join(" ")}
          draggable={false}
          loading="lazy"
          src={imageSrc}
        />
        {badgeText ? (
          <div className="menu-item-badge">
            <span className="menu-item-badge__star" aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={MENU_ITEM_BADGE_STAR_SRC}
                alt=""
                width={34}
                height={34}
                className="menu-item-badge__star-img"
                draggable={false}
              />
            </span>
            <p className="menu-item-badge__text type-heading-small">{badgeText}</p>
          </div>
        ) : null}
        <div className={overlayInteractiveClass} />
        {orderControl}
      </div>
    </div>
  );
}

function SizeItem({
  letter,
  priceLine1,
  priceLine2,
}: {
  letter: string;
  priceLine1?: string;
  priceLine2: string;
}) {
  return (
    <div className={sizeItemClass}>
      <p className={bodyCenterClass}>{letter}</p>
      <p className={bodyCenterClass}>-</p>
      <div className={priceWrapClass}>
        {priceLine1 ? <p className={bodyCenterClass}>{priceLine1}</p> : null}
        <p className={bodyCenterClass}>{priceLine2}</p>
      </div>
    </div>
  );
}

function MenuItemBody({
  name,
  regularPriceLine1,
  regularPriceLine2,
  largePriceLine1,
  largePriceLine2,
}: Pick<
  MenuItemProps,
  | "name"
  | "regularPriceLine1"
  | "regularPriceLine2"
  | "largePriceLine1"
  | "largePriceLine2"
>) {
  return (
    <div className={contentClass}>
      <p className={nameClass}>{name}</p>
      <div className={sizeRowClass}>
        <SizeItem
          letter="R"
          priceLine1={regularPriceLine1}
          priceLine2={regularPriceLine2}
        />
        <div className={dividerClass} aria-hidden />
        <SizeItem
          letter="L"
          priceLine1={largePriceLine1}
          priceLine2={largePriceLine2}
        />
      </div>
    </div>
  );
}

/**
 * Menu card with image, “Order Now” affordance, dish name, and R/L size + price rows.
 * Hover (desktop) and phone breakpoint match spec overlay and button positions.
 */
export function MenuItemPrimary({
  imageSrc,
  imageAlt,
  name,
  regularPriceLine1,
  regularPriceLine2,
  largePriceLine1,
  largePriceLine2,
  orderHref,
  orderLabel,
  badgeText,
  className = "",
  imgProps,
  orderLinkProps,
}: MenuItemProps) {
  const rootClassName = [
    rootPrimaryClass,
    badgeText ? "menu-card--has-badge" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const orderAriaLabel = orderHref
    ? `Order ${name} on Uber Eats${badgeText ? `, ${badgeText}` : ""}`
    : undefined;

  if (orderHref) {
    return (
      <a
        className={rootClassName}
        href={orderHref}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={orderAriaLabel}
      >
        <MenuImageBlock
          imageSrc={imageSrc}
          imageAlt={imageAlt}
          imgProps={imgProps}
          orderHref={orderHref}
          orderLabel={orderLabel}
          orderLinkProps={orderLinkProps}
          disableOrderLink
          menuImageOuterClassName={menuImageOuterClass}
          imageWrapClassName={imageWrapClass}
          badgeText={badgeText}
        />
        <MenuItemBody
          name={name}
          regularPriceLine1={regularPriceLine1}
          regularPriceLine2={regularPriceLine2}
          largePriceLine1={largePriceLine1}
          largePriceLine2={largePriceLine2}
        />
      </a>
    );
  }

  return (
    <div className={rootClassName}>
      <MenuImageBlock
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        imgProps={imgProps}
        orderHref={orderHref}
        orderLabel={orderLabel}
        orderLinkProps={orderLinkProps}
        menuImageOuterClassName={menuImageOuterClass}
        imageWrapClassName={imageWrapClass}
        badgeText={badgeText}
      />
      <MenuItemBody
        name={name}
        regularPriceLine1={regularPriceLine1}
        regularPriceLine2={regularPriceLine2}
        largePriceLine1={largePriceLine1}
        largePriceLine2={largePriceLine2}
      />
    </div>
  );
}
