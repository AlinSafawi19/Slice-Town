"use client";

import GalleryTicker from "@/components/project/code/GalleryTicker";
import { homeSectionHref } from "@/lib/homeSectionHref";
import { BUTTON_HIDE_SECTION_ID } from "@/lib/scrollSectionIds";
import {
  ButtonPrimaryLink,
  ButtonPrimaryVariantLink,
} from "@/components/project/interactions/Button";
import { FooterMarqueeTitlePrimary } from "@/components/project/interactions/FooterMarqueeTitle";
import { SocialItemPrimary } from "@/components/project/interactions/SocialItem";
import Link from "next/link";
import { InViewReveal } from "./InViewReveal";

const LOGO_SRC =
  "https://framerusercontent.com/images/YuRHdEkWRtjYkQnF4dSImfFAE.svg?width=100&height=100";

const FOOTER_MARQUEE_IMAGE_SRC =
  "https://framerusercontent.com/images/i2MCOMAO0kqqBBi2Qh4DwwB2o4.svg?scale-down-to=512&width=522&height=85";

const FOOTER_BG_PATTERN_SRC =
  "https://framerusercontent.com/images/VhpzSOcEhk5848n02q7xXFqm9K8.svg?scale-down-to=1024&width=2003&height=1396";

const SOCIAL_ITEMS = [
  {
    title: "Facebook",
    href: "https://www.facebook.com/",
    iconSrc:
      "https://framerusercontent.com/images/G0Jvt8hTKeSN6kczWVeeBC5eMks.png",
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/",
    iconSrc:
      "https://framerusercontent.com/images/a1dUReg5SzZwEp6PU0Jx24Ct2SU.png?width=76&height=76",
  },
  {
    title: "Tiktok",
    href: "https://www.tiktok.com/",
    iconSrc:
      "https://framerusercontent.com/images/Kov9Unqoh73QiNs9n3vvDWjVYQ.png?width=76&height=76",
  },
  {
    title: "Twitter/X",
    href: "https://x.com/",
    iconSrc:
      "https://framerusercontent.com/images/QKqddz0vxjbPewOy0zicWJqMVrA.png?width=76&height=76",
  },
] as const;

export type FooterProps = {
  /** Heading next to the marquee graphic (default `Order -`, sentence case). */
  marqueeTitle?: string;
  marqueeImageSrc?: string;
  className?: string;
};

export function Footer({
  marqueeTitle = "Order -",
  marqueeImageSrc = FOOTER_MARQUEE_IMAGE_SRC,
  className = "",
}: FooterProps) {
  const marqueeCell = (
    <FooterMarqueeTitlePrimary
      imageSrc={marqueeImageSrc}
      title={marqueeTitle}
    />
  );

  return (
    <footer
      id={BUTTON_HIDE_SECTION_ID}
      className={["footer-root bg-footer-dark-gradient", className].filter(Boolean).join(" ")}
    >
      {/* BG Pattern: full-bleed under content (z-0); sections use z-[2] */}
      <div className="footer-bg-pattern" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FOOTER_BG_PATTERN_SRC}
          alt=""
          width={2003}
          height={1396}
          draggable={false}
        />
      </div>

      {/* Footer ticker + divider */}
      <InViewReveal className="footer-ticker-block">
        <div className="footer-ticker-clip">
          <div className="footer-ticker-inner">
            <GalleryTicker
              speedSeconds={40}
              playbackRate={1}
              hoverPlaybackRate={0.4}
              containerClassName="gallery-ticker-footer"
              rowClassName="gallery-ticker-footer-row"
            >
              {marqueeCell}
              {marqueeCell}
              {marqueeCell}
            </GalleryTicker>
            <div className="footer-ticker-line" aria-hidden />
          </div>
        </div>
      </InViewReveal>

      {/* Main content */}
      <div className="footer-content">
        <div className="footer-content-inner">
          {/* Logo, CTA, then socials — vertical stack at all breakpoints */}
          <div className="footer-logo-stack">
            <div className="footer-logo-col">
              <InViewReveal className="footer-in-view-z">
                <Link
                  href={homeSectionHref("home")}
                  aria-label="Logo link to Home"
                  className="footer-logo-link"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={LOGO_SRC}
                    alt=""
                    width={200}
                    height={200}
                    draggable={false}
                    className="footer-logo-img"
                  />
                </Link>
              </InViewReveal>

              <InViewReveal className="u-w-full">
                <h2 className="type-h4 type-case-none footer-heading">
                  Ready to Grab a Slice of Happiness?
                </h2>
              </InViewReveal>

              <InViewReveal className="u-w-full">
                <div className="footer-cta-row-wrap">
                  <div className="footer-cta-row">
                    <ButtonPrimaryVariantLink
                      href={homeSectionHref("reservation")}
                      title="Reserve a Table"
                    />
                    <ButtonPrimaryLink href={homeSectionHref("menu")} title="View Menu" />
                  </div>
                </div>
              </InViewReveal>
            </div>

            <InViewReveal className="footer-social-block">
              <div className="footer-social-inner">
                <div className="footer-social-grid">
                  {SOCIAL_ITEMS.map((s) => (
                    <SocialItemPrimary
                      key={s.href}
                      href={s.href}
                      title={s.title}
                      iconSrc={s.iconSrc}
                      iconAlt="Social Icon"
                    />
                  ))}
                </div>
              </div>
            </InViewReveal>
          </div>

          {/* Footer bottom */}
          <InViewReveal className="footer-bottom">
            <div className="footer-rule" />

            <div className="footer-legal-row">
              <p className="type-body type-case-none footer-legal-link-wrap">
                <Link
                  href="/legal-pages/privacy-policy"
                  className="link-footer"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </InViewReveal>
        </div>
      </div>

      {/* Shape Bottom: full width, tiled SVG fill, 100% scale, top-left */}
      <div className="footer-shape-bottom footer-bottom-strip" aria-hidden />
    </footer>
  );
}

export default Footer;
