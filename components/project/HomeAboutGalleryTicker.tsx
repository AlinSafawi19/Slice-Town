"use client";

import GalleryTicker from "@/components/project/code/GalleryTicker";
import { InViewReveal } from "@/components/project/interactions";

type AboutTickerItem = {
  x: number;
  y: number;
  w: number;
  h: number;
  rotate: number;
  src: string;
};

const ABOUT_GALLERY_TICKER_ITEMS: AboutTickerItem[] = [
  {
    x: -1526,
    y: 2070,
    w: 310,
    h: 350,
    rotate: 15,
    src: "https://framerusercontent.com/images/QNy9roZ3fNkJI9xBfhrAqCKX3pw.jpg?width=800&height=900",
  },
  {
    x: -1084,
    y: 2095,
    w: 380,
    h: 430,
    rotate: -7.5,
    src: "https://framerusercontent.com/images/qFvPYUKsh3Oy1M8m3N2w9BtzdA.jpg?width=800&height=900",
  },
  {
    x: -600,
    y: 2125,
    w: 460,
    h: 310,
    rotate: -2,
    src: "https://framerusercontent.com/images/vMeTPGVJqvf2WM9CaWZnIquJk0Q.jpg?width=800&height=550",
  },
  {
    x: -1586,
    y: 2567,
    w: 340,
    h: 410,
    rotate: 6,
    src: "https://framerusercontent.com/images/ElmrFn4YVo4WYoAEsfo6Cst6TCs.jpg?width=800&height=970",
  },
  {
    x: -1058,
    y: 2617,
    w: 380,
    h: 380,
    rotate: -6,
    src: "https://framerusercontent.com/images/e9s73Uf7bC0EokFDBxuJ4Qq2I.jpg?scale-down-to=512&width=800&height=800",
  },
  {
    x: -624,
    y: 2666,
    w: 380,
    h: 510,
    rotate: 0,
    src: "https://framerusercontent.com/images/fiQyHJ21jb2X6f7JhTK7WdA0vTM.jpg?width=800&height=1000",
  },
];

/** Single horizontal row: Framer y-values were two bands on the artboard; we only use x for order and w/h/rotate for each frame. */
const ABOUT_GALLERY_TICKER_ROW = [...ABOUT_GALLERY_TICKER_ITEMS].sort(
  (a, b) => a.x - b.x,
);

const TICKER_FRAME_CLASS = [
  "home-about-ticker-img-wrap--f0",
  "home-about-ticker-img-wrap--f1",
  "home-about-ticker-img-wrap--f2",
  "home-about-ticker-img-wrap--f3",
  "home-about-ticker-img-wrap--f4",
  "home-about-ticker-img-wrap--f5",
] as const;

function AboutTickerImage({
  item,
  frameIndex,
}: {
  item: AboutTickerItem;
  frameIndex: number;
}) {
  const frameClass = TICKER_FRAME_CLASS[frameIndex];
  return (
    <div
      className={["home-about-ticker-img-wrap", frameClass].join(" ")}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.src} alt="" width={item.w} height={item.h} draggable={false} />
    </div>
  );
}

/** One loop segment: six frames in one horizontal line (left → right by Framer x). */
function AboutGalleryTickerSegment() {
  return (
    <div className="home-about-ticker-segment" aria-hidden>
      {ABOUT_GALLERY_TICKER_ROW.map((item, frameIndex) => (
        <AboutTickerImage
          key={item.src}
          item={item}
          frameIndex={frameIndex}
        />
      ))}
    </div>
  );
}

/** Full-bleed horizontal gallery under About copy. */
export function HomeAboutGalleryTicker() {
  return (
    <InViewReveal
      className="home-about-gallery-reveal"
      rootMargin="0px"
      threshold={0}
    >
      <div className="home-about-gallery-outer">
        <GalleryTicker
          pixelsPerSecond={90}
          containerClassName="home-about-gallery-ticker"
          rowClassName="home-about-gallery-ticker-row"
        >
          <AboutGalleryTickerSegment />
        </GalleryTicker>
      </div>
    </InViewReveal>
  );
}
