"use client";

import GalleryTicker from "@/components/project/code/GalleryTicker";
import { MarqueeIcon, MarqueeText } from "@/components/project/info";

const MARQUEE_ICON_SRC =
  "https://framerusercontent.com/images/3Duln0UiIbl7VIsuTuXQd5zkiA0.svg?width=23&height=27";

const PROMO_ITEMS = [
  { type: "text", value: "Free Garlic Bread with Large Pizza!" },
  { type: "icon" },
  { type: "text", value: "Buy 1 Get 1 Free Every Wednesday!" },
  { type: "icon" },
  { type: "text", value: "Weekend Combo - 2 Large Pizzas @ $25!" },
  { type: "icon" },
  { type: "text", value: "Flat 20% Off on First Online Order!" },
  { type: "icon" },
] as const;

export function HomePromoMarquee() {
  return (
    <section className="home-marquee" aria-label="Promotions">
      <GalleryTicker
        playbackRate={0.2}
        containerClassName="home-marquee-ticker"
        rowClassName="home-marquee-row"
      >
        {PROMO_ITEMS.map((item, index) =>
          item.type === "text" ? (
            <MarqueeText
              key={`promo-text-${index}`}
              title={item.value}
              titleClassName="home-marquee-text"
            />
          ) : (
            <MarqueeIcon key={`promo-icon-${index}`} className="home-marquee-icon">
              <img
                src={MARQUEE_ICON_SRC}
                alt=""
                aria-hidden
                className="home-marquee-icon-image"
                loading="lazy"
              />
            </MarqueeIcon>
          ),
        )}
      </GalleryTicker>
    </section>
  );
}

export default HomePromoMarquee;
