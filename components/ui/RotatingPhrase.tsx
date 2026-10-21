"use client";

import { useEffect, useRef, useState } from "react";
import useOnScreen from "@/hooks/useOnScreen";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

/** Shared hero cadence, with reserved width and a stable accessible headline. */
export default function RotatingPhrase({ phrases, suffix = "" }: { phrases: readonly string[]; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const onScreen = useOnScreen(ref);
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || !onScreen || phrases.length < 2) return;
    const timer = window.setInterval(() => setIndex(i => (i + 1) % phrases.length), 2600);
    return () => window.clearInterval(timer);
  }, [reduced, onScreen, phrases.length]);

  const active = reduced ? 0 : index;
  return (
    <span ref={ref} className="relative inline-grid text-left align-baseline" data-rotating-phrase>
      <span className="sr-only">{phrases[0]}{suffix}</span>
      {phrases.map((phrase, i) => (
        <span key={phrase} aria-hidden="true" data-active={i === active}
          className="whitespace-nowrap [grid-area:1/1] transition-[opacity,transform] duration-[380ms] ease-settle motion-reduce:transition-none"
          style={{ opacity: i === active ? 1 : 0, transform: i === active ? "translateY(0)" : "translateY(0.08em)" }}>
          <span className="relative inline-block">
            {phrase}
            <span aria-hidden="true" className="absolute -bottom-[0.06em] left-0 h-[0.06em] w-full rounded-full bg-blue" />
          </span>{suffix}
        </span>
      ))}
    </span>
  );
}
