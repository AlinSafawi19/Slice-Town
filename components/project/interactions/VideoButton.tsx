import type { ButtonHTMLAttributes } from "react";

const PLAY_ICON_SRC =
  "https://framerusercontent.com/images/5HCLyOriOaUA4bzLp4uOJp4xA8.svg?width=17&height=19";
const PAUSE_ICON_SRC =
  "https://framerusercontent.com/images/OE7mOZjTAqBxkOaQkZ65ZSmsnTE.svg?width=24&height=32";

const videoButtonBaseClass = "video-btn";

const playIconClass = "video-btn-icon";
const pauseIconClass = "video-btn-icon";

export type VideoButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonClassName: string;
};

type VideoButtonIconProps = {
  alt: string;
  className: string;
  src: string;
};

function VideoButtonIcon({ alt, className, src }: VideoButtonIconProps) {
  return <img alt={alt} className={className} draggable={false} src={src} />;
}

export function VideoButton({
  buttonClassName,
  children,
  className = "",
  type = "button",
  ...rest
}: VideoButtonProps) {
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

export type PlayButtonPrimaryProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function PlayButtonPrimary(props: PlayButtonPrimaryProps) {
  return (
    <VideoButton
      aria-label="Play video"
      buttonClassName={videoButtonBaseClass}
      {...props}
    >
      <VideoButtonIcon alt="" className={playIconClass} src={PLAY_ICON_SRC} />
    </VideoButton>
  );
}

export type PauseButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function PauseButton(props: PauseButtonProps) {
  return (
    <VideoButton
      aria-label="Pause video"
      buttonClassName={videoButtonBaseClass}
      {...props}
    >
      <VideoButtonIcon alt="" className={pauseIconClass} src={PAUSE_ICON_SRC} />
    </VideoButton>
  );
}

export default VideoButton;
