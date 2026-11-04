"use client";

import { useEffect, useRef, useState } from "react";
import type { EisTeaserItem } from "@/content/pages/solutions-eis";
import styles from "./EisTeasers.module.scss";

/* Only one story plays at a time: a card that starts playing announces
   itself, and the others pause. */
const PLAY_EVENT = "aei:play-video";

export interface EisTeaserCardProps {
  item: EisTeaserItem;
  playLabel: string;
  replayLabel: string;
}

export function EisTeaserCard({ item, playLabel, replayLabel }: EisTeaserCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleGlobalPlay = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      if (customEvent.detail?.id !== item.id && !video.paused) {
        video.pause();
        setIsPlaying(false);
      }
    };
    window.addEventListener(PLAY_EVENT, handleGlobalPlay);

    // A story scrolled out of view pauses.
    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting && !video.paused) {
              video.pause();
              setIsPlaying(false);
            }
          });
        },
        { threshold: 0.25 },
      );
      observer.observe(video);
    }

    const onPlay = () => {
      setIsPlaying(true);
      setHasEnded(false);
      window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: { id: item.id } }));
    };
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setHasEnded(true);
      video.controls = false;
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);

    return () => {
      window.removeEventListener(PLAY_EVENT, handleGlobalPlay);
      observer?.disconnect();
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
    };
  }, [item.id]);

  const handlePlayClick = () => {
    const video = videoRef.current;
    if (!video) return;

    video.controls = true;
    video.preload = "auto";
    video.play().catch(() => {
      // The browser's autoplay policy refused; the native controls remain.
    });
    setIsPlaying(true);
    setHasEnded(false);
  };

  return (
    <article id={`story-${item.id}`} className={styles.card}>
      {/* The footage's own ground fills the frame, so a letterboxed video
          never shows a second colour. */}
      <div className={styles.frame}>
        <video
          ref={videoRef}
          src={item.videoSrc}
          poster={item.posterSrc}
          playsInline
          preload="none"
          aria-label={item.label}
          className={styles.video}
        />

        {!isPlaying && (
          <button type="button" onClick={handlePlayClick} aria-label={`${playLabel} ${item.title}`} className={styles.play}>
            <svg className={styles.playIcon} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
            <span>{hasEnded ? replayLabel : playLabel}</span>
          </button>
        )}
      </div>

      <div className={styles.meta}>
        <div className={styles.metaTopic}>{item.meta}</div>
        <span className={styles.metaDuration}>{item.duration}</span>
      </div>

      <div>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
      </div>
    </article>
  );
}
