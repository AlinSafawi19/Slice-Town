"use client";

import {
  useCallback,
  useEffect,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from "react";

import { homeSectionHrefString } from "@/lib/homeSectionHref";
import { BUTTON_HIDE_SECTION_ID } from "@/lib/scrollSectionIds";

import { CtaButtonDarkVariant, CtaButtonLgVariant, CtaButtonPrimary } from "./CtaButton";

const ICON_WALK_IN =
  "https://framerusercontent.com/images/NURazIas0kaMGbr85huclkb72wQ.svg?width=34&height=37";
const ICON_UBER =
  "https://framerusercontent.com/images/KoBLVNU7AV2sz6c84FW1Kvess9s.svg?width=57&height=46";
const ICON_MENU =
  "https://framerusercontent.com/images/OeDjl94QwhfiKf5GBsIwrUA6Tw.svg?width=38&height=35";

/** Reset design-canvas offsets from CtaButton variants when composing in layout. */
const ctaLayoutResetClass = "cta-layout-reset";

const bookTableButtonClass = "order-now-book-btn";

const rootBaseClass = "order-now-root";

const triggerInteractiveLayout = "order-now-trigger order-now-trigger--interactive";

const triggerStaticBase = "order-now-trigger";

const orderNowLabelClass = "order-now-label type-button";

const panelOuterBase = "order-now-panel";

const panelInnerClass = "order-now-panel-inner";

const contentCardClass = "order-now-card";

const listWrapClass = "order-now-list";

type OrderNowShellProps = {
  rootClassName: string;
  /** `#button-hide` (footer) in view — scroll transform To state via CSS. */
  rootDataFooterHide?: boolean;
  isOpen: boolean;
  onToggle?: () => void;
};

function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <span className="order-now-icon-btn">
      <span
        aria-hidden
        className={[
          "order-now-bar",
          open ? "order-now-bar1--open" : "order-now-bar1--closed",
        ].join(" ")}
      />
      <span
        aria-hidden
        className={[
          "order-now-bar",
          open ? "order-now-bar2--open" : "order-now-bar2--closed",
        ].join(" ")}
      />
    </span>
  );
}

function OrderNowPanel({ panelId, isOpen }: { panelId: string; isOpen: boolean }) {
  const panelRootProps: HTMLAttributes<HTMLDivElement> = {
    id: panelId,
    className: panelOuterBase,
  };
  if (!isOpen) {
    panelRootProps["aria-hidden"] = true;
  }

  return (
    <div {...panelRootProps} data-open={isOpen ? "true" : "false"}>
      <div className={panelInnerClass}>
        <div className={contentCardClass}>
          <div className={listWrapClass}>
            <CtaButtonPrimary
              className={ctaLayoutResetClass}
              title="Walk In"
              iconSrc={ICON_WALK_IN}
              iconAlt=""
              href={homeSectionHrefString("location")}
              openInNewTab={false}
            />
            <CtaButtonLgVariant
              className={ctaLayoutResetClass}
              iconSrc={ICON_UBER}
              iconAlt="Uber Eats"
              href="https://www.ubereats.com/"
              openInNewTab
            />
            <CtaButtonDarkVariant
              className={ctaLayoutResetClass}
              title="Menu"
              iconSrc={ICON_MENU}
              iconAlt=""
              href={homeSectionHrefString("menu")}
              openInNewTab={false}
            />
          </div>
          <a
            className={bookTableButtonClass}
            href={homeSectionHrefString("reservation")}
          >
            <span className="order-now-book-inner">
              <span className="order-now-book-title type-button">Book a table</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

function OrderNowShell({
  rootClassName,
  rootDataFooterHide = false,
  isOpen,
  onToggle,
}: OrderNowShellProps) {
  const panelId = useId();
  const interactive = Boolean(onToggle);

  const handleToggle = useCallback(() => {
    onToggle?.();
  }, [onToggle]);

  useEffect(() => {
    if (!isOpen || !onToggle) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onToggle();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onToggle]);

  const triggerMerged = interactive ? triggerInteractiveLayout : triggerStaticBase;

  const triggerBody = (
    <>
      <p className={orderNowLabelClass}>Order Now</p>
      <PlusMinusIcon open={isOpen} />
    </>
  );

  const triggerButtonProps: ButtonHTMLAttributes<HTMLButtonElement> = {
    type: "button",
    className: triggerMerged,
    onClick: handleToggle,
    "aria-controls": panelId,
    "aria-expanded": isOpen ? "true" : "false",
  };

  return (
    <div
      className={rootClassName}
      data-footer-hide={rootDataFooterHide ? "true" : "false"}
      inert={rootDataFooterHide ? true : undefined}
    >
      <div className="order-now-shell">
        {interactive ? (
          <button {...triggerButtonProps} data-open={isOpen ? "true" : "false"}>
            {triggerBody}
          </button>
        ) : (
          <div
            className={triggerMerged}
            aria-hidden
            data-open={isOpen ? "true" : "false"}
            data-static-variant="true"
          >
            {triggerBody}
          </div>
        )}

        <OrderNowPanel panelId={panelId} isOpen={isOpen} />
      </div>
    </div>
  );
}

/** Interactive Order Now control with expandable CTA panel (responsive layout via CSS). */
export function OrderNowPrimary() {
  const [open, setOpen] = useState(false);
  const [hideForFooter, setHideForFooter] = useState(false);

  useEffect(() => {
    const target = document.getElementById(BUTTON_HIDE_SECTION_ID);
    if (!target) return;

    /* Viewport “bottom” (Framer): shrink root from bottom so the section reads as in-view when it enters the main band. */
    const io = new IntersectionObserver(
      ([entry]) => {
        const intersecting = entry.isIntersecting;
        setHideForFooter(intersecting);
        if (intersecting) setOpen(false);
      },
      { root: null, threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <OrderNowShell
      rootClassName={rootBaseClass}
      rootDataFooterHide={hideForFooter}
      isOpen={open}
      onToggle={() => setOpen((v) => !v)}
    />
  );
}
