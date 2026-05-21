"use client";

import { PauseButton, PlayButtonPrimary } from "@/components/project/interactions";
import { useRef, useState } from "react";

export type InstagramVideoCardProps = {
  src: string;
};

export function InstagramVideoCard({ src }: InstagramVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    // Seeking to a tiny offset forces the browser to decode and paint the first
    // frame, so users see a preview instead of a black box before they tap play.
    video.currentTime = 0.001;
  };

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.currentTime = 0;
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
    <article className="instagram-item instagram-video-card">
      <div className="instagram-video-shell">
        <video
          ref={videoRef}
          className="instagram-video"
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
        />
      </div>
      {isPlaying ? (
        <PauseButton className="instagram-video-card-btn" onClick={togglePlayback} />
      ) : (
        <PlayButtonPrimary className="instagram-video-card-btn" onClick={togglePlayback} />
      )}
    </article>
  );
}

export default InstagramVideoCard;
