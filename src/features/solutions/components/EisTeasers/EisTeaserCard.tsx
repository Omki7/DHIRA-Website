"use client";

import { useEffect, useRef, useState } from "react";
import type { EisTeaserItem } from "@/content/pages/solutions-eis";
import styles from "./EisTeasers.module.scss";

/* Only one story plays at a time: a card that starts playing announces
   itself, and the others pause. */
const PLAY_EVENT = "aei:play-video";
// Preview starts at 0.8s where the typography and UI are fully visible,
// and loops for 5s (until 5.8s) so it never flashes the blank 0.0s frame.
const PREVIEW_START_SEC = 0.8;
const PREVIEW_DURATION_SEC = 5.0;
const PREVIEW_END_SEC = PREVIEW_START_SEC + PREVIEW_DURATION_SEC;

export interface EisTeaserCardProps {
  item: EisTeaserItem;
  playLabel: string;
  replayLabel: string;
}

export function EisTeaserCard({ item, playLabel, replayLabel }: EisTeaserCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const isPlayingRef = useRef(false);
  const isPreviewingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleGlobalPlay = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      if (customEvent.detail?.id !== item.id) {
        isPreviewingRef.current = false;
        if (!video.paused) {
          video.pause();
          setIsPlaying(false);
          isPlayingRef.current = false;
        }
      }
    };
    window.addEventListener(PLAY_EVENT, handleGlobalPlay);

    // When the card enters view, play a continuous 5-second muted preview loop (Rule 6 respects reduced-motion).
    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (isPlayingRef.current) return;
              const prefersReducedMotion =
                typeof window !== "undefined" &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              if (prefersReducedMotion) return;

              isPreviewingRef.current = true;
              video.muted = true;
              video.preload = "auto";
              if (video.currentTime < PREVIEW_START_SEC || video.currentTime >= PREVIEW_END_SEC) {
                video.currentTime = PREVIEW_START_SEC;
              }
              video.play().catch(() => {
                isPreviewingRef.current = false;
              });
            } else {
              // Scrolled out of view: pause video and stop preview loop.
              if (isPreviewingRef.current) {
                video.pause();
                video.currentTime = PREVIEW_START_SEC;
                isPreviewingRef.current = false;
              } else if (!video.paused) {
                video.pause();
                setIsPlaying(false);
                isPlayingRef.current = false;
              }
            }
          });
        },
        { threshold: 0.25 },
      );
      observer.observe(video);
    }

    // Loops the 5-second preview again and again while previewing
    const onTimeUpdate = () => {
      if (isPreviewingRef.current && !isPlayingRef.current) {
        if (video.currentTime >= PREVIEW_END_SEC) {
          video.currentTime = PREVIEW_START_SEC;
          if (video.paused) {
            video.play().catch(() => {});
          }
        }
      }
    };

    const onPlay = () => {
      if (isPreviewingRef.current) return;
      setIsPlaying(true);
      isPlayingRef.current = true;
      setHasEnded(false);
      window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: { id: item.id } }));
    };

    const onPause = () => {
      if (isPreviewingRef.current) return;
      setIsPlaying(false);
      isPlayingRef.current = false;
    };

    const onEnded = () => {
      if (isPreviewingRef.current) {
        video.currentTime = PREVIEW_START_SEC;
        video.play().catch(() => {});
        return;
      }
      setIsPlaying(false);
      isPlayingRef.current = false;
      setHasEnded(true);
      video.controls = false;
      isPreviewingRef.current = false;
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);

    return () => {
      window.removeEventListener(PLAY_EVENT, handleGlobalPlay);
      observer?.disconnect();
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
    };
  }, [item.id]);

  const handlePlayClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    isPreviewingRef.current = false;
    isPlayingRef.current = true;

    video.muted = false;
    video.currentTime = 0;
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
      <div
        className={styles.frame}
        onClick={!isPlaying ? handlePlayClick : undefined}
        style={{ cursor: !isPlaying ? "pointer" : "default" }}
      >
        <video
          ref={videoRef}
          src={item.videoSrc}
          poster={item.posterSrc}
          playsInline
          muted
          preload="none"
          aria-label={item.label}
          className={styles.video}
        />

        {!isPlaying && (
          <button
            type="button"
            onClick={handlePlayClick}
            aria-label={`${playLabel} ${item.title}`}
            className={styles.play}
          >
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
