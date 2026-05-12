"use client";

import { PauseButton, PlayButtonPrimary } from "@/components/project/interactions";
import { useRef, useState } from "react";

export type InstagramVideoCardProps = {
  src: string;
};

export function InstagramVideoCard({ src }: InstagramVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    video.pause();
    setIsPlaying(false);
  };

  return (
    <article className="instagram-item">
      {isPlaying ? (
        <PauseButton className="instagram-btn-pos-desktop" onClick={togglePlayback} />
      ) : (
        <PlayButtonPrimary className="instagram-btn-pos-desktop" onClick={togglePlayback} />
      )}
      <div className="instagram-media-shell">
        <video
          ref={videoRef}
          className="instagram-video"
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
    </article>
  );
}

export default InstagramVideoCard;
