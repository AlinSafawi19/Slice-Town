"use client";

import { PauseButton, PlayButtonPrimary } from "@/components/project/interactions";
import { useRef, useState } from "react";

export type InstagramVideoCardProps = {
  src: string;
};

export function InstagramVideoCard({ src }: InstagramVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Tracks whether we have already auto-paused the initial muted autoplay.
  // After that first pause every subsequent onPlay event (user-initiated or loop)
  // must be left alone.
  const didInitialPauseRef = useRef(false);

  const handlePlay = () => {
    if (!didInitialPauseRef.current) {
      didInitialPauseRef.current = true;
      videoRef.current?.pause();
    }
  };

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
    <article className="instagram-item instagram-video-card">
      <div className="instagram-video-shell">
        <video
          ref={videoRef}
          className="instagram-video"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          onPlay={handlePlay}
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
