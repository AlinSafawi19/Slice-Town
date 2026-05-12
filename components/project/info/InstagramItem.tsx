import Image, { type ImageProps } from "next/image";
import type { ReactNode, VideoHTMLAttributes } from "react";
import { PauseButton, PlayButtonPrimary } from "../interactions";

const instagramItemPrimaryClass = "instagram-item instagram-item--primary";

const instagramItemVideoPlayClass = "instagram-item instagram-item--video-play";

const instagramItemVideoPauseClass = "instagram-item instagram-item--video-pause";

const instagramItemMobileClass = "instagram-item instagram-item--mobile";

const instagramItemVideoPlayMobileClass =
  "instagram-item instagram-item--video-play-m";

const instagramItemVideoPauseMobileClass =
  "instagram-item instagram-item--video-pause-m";

const instagramItemMediaShellClass = "instagram-media-shell";

const instagramItemVideoClass = "instagram-video";

const instagramItemDesktopButtonPositionClass = "instagram-btn-pos-desktop";

const instagramItemMobileButtonPositionClass = "instagram-btn-pos-mobile";

type InstagramItemFrameProps = {
  children?: ReactNode;
  className: string;
};

export type InstagramItemProps = {
  children?: ReactNode;
};

export type InstagramItemMobileProps = {
  children?: ReactNode;
};

export type InstagramItemVideoPlayProps = {
  children?: ReactNode;
};

export type InstagramItemVideoPauseProps = {
  children?: ReactNode;
};

export type InstagramItemVideoPlayMobileProps = {
  children?: ReactNode;
};

export type InstagramItemVideoPauseMobileProps = {
  children?: ReactNode;
};

export type InstagramItemMediaProps = Omit<
  ImageProps,
  "fill" | "width" | "height"
> & {
  alt?: string;
};

export type InstagramItemVideoProps = VideoHTMLAttributes<HTMLVideoElement>;

function InstagramItemFrame({
  children,
  className,
}: InstagramItemFrameProps) {
  return <div className={className}>{children}</div>;
}

export function InstagramItem({ children }: InstagramItemProps) {
  return (
    <InstagramItemFrame className={instagramItemPrimaryClass}>
      {children}
    </InstagramItemFrame>
  );
}

export function InstagramItemMobile({ children }: InstagramItemMobileProps) {
  return (
    <InstagramItemFrame className={instagramItemMobileClass}>
      {children}
    </InstagramItemFrame>
  );
}

export function InstagramItemMedia({
  alt = "",
  className = "",
  priority,
  sizes = "(max-width: 809px) 326px, 326px",
  ...rest
}: InstagramItemMediaProps) {
  return (
    <div
      className={[instagramItemMediaShellClass, className]
        .filter(Boolean)
        .join(" ")}
    >
      <Image
        {...rest}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="media-img-fill"
      />
    </div>
  );
}

export function InstagramItemVideo({
  autoPlay = true,
  className = "",
  controls = false,
  loop = true,
  muted = true,
  playsInline = true,
  ...rest
}: InstagramItemVideoProps) {
  return (
    <video
      {...rest}
      autoPlay={autoPlay}
      controls={controls}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      className={[instagramItemVideoClass, className].filter(Boolean).join(" ")}
    />
  );
}

export function InstagramItemVideoPlay({
  children,
}: InstagramItemVideoPlayProps) {
  return (
    <InstagramItemFrame className={instagramItemVideoPlayClass}>
      <PlayButtonPrimary className={instagramItemDesktopButtonPositionClass} />
      {children ?? <InstagramItemVideo />}
    </InstagramItemFrame>
  );
}

export function InstagramItemVideoPause({
  children,
}: InstagramItemVideoPauseProps) {
  return (
    <InstagramItemFrame className={instagramItemVideoPauseClass}>
      <PauseButton className={instagramItemDesktopButtonPositionClass} />
      {children ?? <InstagramItemVideo autoPlay={false} />}
    </InstagramItemFrame>
  );
}

export function InstagramItemVideoPlayMobile({
  children,
}: InstagramItemVideoPlayMobileProps) {
  return (
    <InstagramItemFrame className={instagramItemVideoPlayMobileClass}>
      <PlayButtonPrimary className={instagramItemMobileButtonPositionClass} />
      {children ?? <InstagramItemVideo />}
    </InstagramItemFrame>
  );
}

export function InstagramItemVideoPauseMobile({
  children,
}: InstagramItemVideoPauseMobileProps) {
  return (
    <InstagramItemFrame className={instagramItemVideoPauseMobileClass}>
      <PauseButton className={instagramItemMobileButtonPositionClass} />
      {children ?? <InstagramItemVideo autoPlay={false} />}
    </InstagramItemFrame>
  );
}

export default InstagramItem;
