"use client";

import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  dark?: boolean;
  isLast?: boolean;
  className?: string;
}

export default function ScrollRevealRail({
  children,
  dark = false,
  isLast = false,
  className = "",
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leftFillRef = useRef<HTMLDivElement>(null);
  const rightFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const lf = leftFillRef.current;
    const rf = rightFillRef.current;
    if (!wrapper || !lf || !rf) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const goldRgb = "217,160,52";

    if (reduced) {
      const mid = `rgba(${goldRgb},0.24)`;
      lf.style.background = mid;
      rf.style.background = mid;
      return;
    }

    let raf = 0;

    const paint = () => {
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      // p=0 when element enters viewport bottom, p=1 when it exits from top
      const p = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));

      const pPct = p * 100;

      // Narrative payoff: if this is the last rail and we reach the end, flash full gold
      if (isLast && p > 0.85) {
        lf.style.backgroundImage = `linear-gradient(to bottom, rgba(${goldRgb},0.8) 0%, rgba(${goldRgb},0.8) 100%)`;
        rf.style.backgroundImage = `linear-gradient(to bottom, rgba(${goldRgb},0.8) 0%, rgba(${goldRgb},0.8) 100%)`;
        lf.style.transition = "background-image 0.6s cubic-bezier(0.2,0.8,0.2,1)";
        rf.style.transition = "background-image 0.6s cubic-bezier(0.2,0.8,0.2,1)";
        return;
      } else {
        lf.style.transition = "none";
        rf.style.transition = "none";
      }

      // last 10% of the filled zone brightens into a glowing tip
      const glowStart = Math.max(0, pPct - 10);

      const grad = [
        `rgba(${goldRgb},0.24) 0%`,
        `rgba(${goldRgb},0.24) ${glowStart.toFixed(2)}%`,
        `rgba(${goldRgb},0.68) ${pPct.toFixed(2)}%`,
        `transparent ${Math.min(100, pPct + 0.5).toFixed(2)}%`,
      ].join(", ");

      const bg = `linear-gradient(to bottom, ${grad})`;
      lf.style.backgroundImage = bg;
      rf.style.backgroundImage = bg;
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", paint, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", paint);
      cancelAnimationFrame(raf);
    };
  }, [dark]);

  const baseColor = dark ? "rgba(255,255,255,0.09)" : "rgba(26,28,29,0.07)";

  return (
    <div
      ref={wrapperRef}
      className={`relative mx-auto w-full max-w-[1440px] ${className}`}
    >
      {/* Base faint rails — always visible at low opacity */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-0 w-px"
        style={{ background: baseColor }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-px"
        style={{ background: baseColor }}
      />
      {/* Animated fill rails — gradient trail follows scroll */}
      <div
        ref={leftFillRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-0 w-px"
      />
      <div
        ref={rightFillRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-px"
      />
      <div className="px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
