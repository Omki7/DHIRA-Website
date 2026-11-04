"use client";

import { useEffect, useRef, useState } from "react";
import type { EisTeaserItem } from "@/content/pages/solutions-eis";

interface EisTeaserCardProps {
  item: EisTeaserItem;
}

export default function EisTeaserCard({ item }: EisTeaserCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Listen to global play events so only one teaser plays at a time
    const handleGlobalPlay = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string }>;
      if (customEvent.detail?.id !== item.id && !video.paused) {
        video.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener("aei:play-video", handleGlobalPlay);

    // Auto-pause when scrolled out of viewport
    let observer: IntersectionObserver | null = null;
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting && !video.paused) {
              video.pause();
              setIsPlaying(false);
            }
          });
        },
        { threshold: 0.25 }
      );
      observer.observe(video);
    }

    const onPlay = () => {
      setIsPlaying(true);
      setHasEnded(false);
      window.dispatchEvent(
        new CustomEvent("aei:play-video", { detail: { id: item.id } })
      );
    };

    const onPause = () => {
      setIsPlaying(false);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setHasEnded(true);
      if (video) video.controls = false;
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);

    return () => {
      window.removeEventListener("aei:play-video", handleGlobalPlay);
      if (observer) observer.disconnect();
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
      // Browser autoplay policy catch
    });
    setIsPlaying(true);
    setHasEnded(false);
  };

  return (
    <article className="group flex flex-col gap-4">
      {/* Video Container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#07062A] shadow-md border border-lineSoft">
        <video
          ref={videoRef}
          src={item.videoSrc}
          poster={item.posterSrc}
          playsInline
          preload="none"
          aria-label={item.label}
          className="h-full w-full object-contain bg-[#07062A]"
        />

        {/* Custom Play Button Overlay */}
        {!isPlaying && (
          <button
            type="button"
            onClick={handlePlayClick}
            aria-label={`Play ${item.title}`}
            className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 font-body text-sm font-semibold text-[#1100CC] shadow-lg backdrop-blur-sm transition-transform duration-150 hover:scale-105 hover:bg-white"
          >
            <svg
              className="h-3.5 w-3.5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
            <span>{hasEnded ? "Watch again" : "Play"}</span>
          </button>
        )}

        {/* Illustrative data watermark tag */}
        <span className="pointer-events-none absolute right-3 top-3 font-mono text-[10px] uppercase tracking-wider text-white/50 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
          Illustrative data
        </span>
      </div>

      {/* Meta Row */}
      <div className="flex items-baseline justify-between gap-4">
        <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[#A65A0B] dark:text-[#F7B26A]">
          {item.meta}
        </div>
        <span className="font-mono text-xs text-tertiary-text">
          {item.duration}
        </span>
      </div>

      {/* Heading & Description */}
      <div>
        <h3 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-[26px]">
          {item.title}
        </h3>
        <p className="mt-2 text-base leading-relaxed text-secondary-text">
          {item.description}
        </p>
      </div>
    </article>
  );
}

