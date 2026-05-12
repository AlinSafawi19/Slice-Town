import type { ReactNode } from "react";

const menuListItemPrimaryClass = "menu-list-item";

const menuListItemSingleClass = "menu-list-item menu-list-item--single";

const titleClass = "menu-list-title-col";

const priceItemPrimaryClass = "menu-list-price-row menu-list-price-row--dual";

const priceItemSingleClass = "menu-list-price-row menu-list-price-row--single";

const lineClass = "menu-list-line";

const itemNameClass = "menu-list-name type-body";

const itemDescriptionClass = "menu-list-desc type-text-xs";

const priceTextClass = "menu-list-price type-text-small";

export type MenuListItemProps = {
  itemName: ReactNode;
  itemDescription: ReactNode;
  regularPrice: ReactNode;
  largePrice: ReactNode;
  className?: string;
};

export function MenuListItem({
  itemName,
  itemDescription,
  regularPrice,
  largePrice,
  className = "",
}: MenuListItemProps) {
  return (
    <div
      className={[menuListItemPrimaryClass, className].filter(Boolean).join(" ")}
    >
      <div className={titleClass}>
        <p className={itemNameClass}>{itemName}</p>
        <p className={itemDescriptionClass}>{itemDescription}</p>
      </div>

      <div className={priceItemPrimaryClass}>
        <p className={priceTextClass}>{regularPrice}</p>
        <p className={priceTextClass}>{largePrice}</p>
      </div>

      <div className={lineClass} />
    </div>
  );
}

export type MenuListItemSingleProps = {
  itemName: ReactNode;
  itemDescription: ReactNode;
  regularPrice: ReactNode;
  className?: string;
};

export function MenuListItemSingle({
  itemName,
  itemDescription,
  regularPrice,
  className = "",
}: MenuListItemSingleProps) {
  return (
    <div
      className={[menuListItemSingleClass, className].filter(Boolean).join(" ")}
    >
      <div className={titleClass}>
        <p className={itemNameClass}>{itemName}</p>
        <p className={itemDescriptionClass}>{itemDescription}</p>
      </div>

      <div className={priceItemSingleClass}>
        <p className={priceTextClass}>{regularPrice}</p>
      </div>

      <div className={lineClass} />
    </div>
  );
}

export default MenuListItem;
