"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

function parseFigure(figure: string): {
  prefix: string;
  numeric: number;
  suffix: string;
  decimals: number;
} {
  const match = figure.match(/^([^0-9.-]*)([0-9.]+)([^0-9.]*)$/);
  if (!match) {
    return { prefix: figure, numeric: 0, suffix: "", decimals: 0 };
  }

  const numeric = parseFloat(match[2]);
  const decimals = match[2].includes(".") ? match[2].split(".")[1].length : 0;

  return {
    prefix: match[1],
    numeric: Number.isNaN(numeric) ? 0 : numeric,
    suffix: match[3],
    decimals,
  };
}

const noSubscribe = () => () => {};

const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);

/* Scroll-triggered count-up. Parses a single string figure (e.g. "$581B"),
   animates once when its ref enters the viewport. Under reduced motion, or
   for a figure with no number in it, it shows the figure as written. */
export default function useCountUp(
  figure: string,
  options: { duration?: number; delay?: number; startAtZero?: boolean } = {}
) {
  const { duration = 1200, delay = 0, startAtZero = false } = options;
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { prefix, numeric, suffix, decimals } = parseFigure(figure);
  const still = reduced || numeric === 0;
  /* The running value; null until the count starts. */
  const [counted, setCounted] = useState<string | null>(null);
  /* False in the server render and during hydration, so the HTML carries the
     real figure; a startAtZero count drops to zero only once hydrated. */
  const hydrated = useSyncExternalStore(noSubscribe, () => true, () => false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || still) return;
    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          const startTime = performance.now();
          const startDelay = delay;

          const step = (now: number) => {
            const elapsed = now - startTime - startDelay;
            if (elapsed < 0) {
              frame = requestAnimationFrame(step);
              return;
            }

            const progress = Math.min(elapsed / duration, 1);
            const current = numeric * easeOutCubic(progress);

            setCounted(`${prefix}${current.toFixed(decimals).replace(/\.0+$/, "")}${suffix}`);

            if (progress < 1) {
              frame = requestAnimationFrame(step);
            }
          };

          frame = requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [still, numeric, prefix, suffix, decimals, duration, delay]);

  const display = still ? figure : (counted ?? (startAtZero && hydrated ? `${prefix}${(0).toFixed(decimals)}${suffix}` : figure));
  return { ref, display };
}
