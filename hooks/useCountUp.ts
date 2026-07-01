"use client";

import { useEffect, useRef, useState } from "react";

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

const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);

/* Scroll-triggered count-up. Parses a single string figure (e.g. "$581B"),
   animates once when its ref enters the viewport. */
export default function useCountUp(
  figure: string,
  options: { duration?: number; delay?: number } = {}
) {
  const { duration = 1200, delay = 0 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(figure);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setDisplay(figure);
      return;
    }

    const { prefix, numeric, suffix, decimals } = parseFigure(figure);

    if (numeric === 0) {
      setDisplay(figure);
      return;
    }

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
              requestAnimationFrame(step);
              return;
            }

            const progress = Math.min(elapsed / duration, 1);
            const current = numeric * easeOutCubic(progress);

            setDisplay(
              `${prefix}${current.toFixed(decimals).replace(/\.0+$/, "")}${suffix}`
            );

            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [figure, duration, delay]);

  return { ref, display };
}

/* Re-triggerable count-up for content that is already visible (e.g. inside
   a parent ScrollReveal). Animates from 4% of target to target whenever
   `kick` changes, with no IntersectionObserver of its own. */
export function useCountUpValue(
  target: number,
  kick: unknown,
  reduced: boolean,
  duration = 1000
) {
  const [val, setVal] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    if (reduced) {
      setVal(target);
      return;
    }
    const start = performance.now();
    setVal(target * 0.04);
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setVal(target * easeOutCubic(p));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, reduced, kick, duration]);

  return val;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}
