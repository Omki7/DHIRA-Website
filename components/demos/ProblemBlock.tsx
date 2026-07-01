"use client";

import { useEffect, useRef, useState } from "react";
import useCountUp from "@/hooks/useCountUp";

interface ProblemBlockProps {
  index: number;
  eyebrow: string;
  finding: string;
  detail: string;
  watermark: string;
  source?: string;
  sourceUrl?: string;
}

function useGentleReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, revealed };
}

export default function ProblemBlock({
  index,
  eyebrow,
  finding,
  detail,
  watermark,
  source,
  sourceUrl,
}: ProblemBlockProps) {
  const { ref, revealed } = useGentleReveal<HTMLDivElement>();
  const { ref: numberRef, display: displayNumber } = useCountUp(watermark, {
    duration: 1600,
    delay: index * 100,
  });

  const [numPart, textPart] = eyebrow.split(" / ");

  return (
    <div
      ref={ref}
      className={`group relative pl-8 lg:pl-14 ${index > 0 ? "mt-20 lg:mt-32" : ""}`}
    >
      {/* Vertical red indicator bar */}
      <div
        className={`absolute left-0 top-1 bottom-1 w-[2.5px] rounded-full bg-red origin-top transition-transform duration-700 ease-settle ${
          revealed ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
        style={{ transitionDelay: `${index * 80}ms` }}
      />

      {/* Watermark number */}
      <span
        ref={numberRef}
        aria-hidden="true"
        className={`pointer-events-none absolute -left-4 top-1/2 -translate-y-1/2 select-none font-sans text-[6rem] font-semibold leading-none tracking-tighter text-red/[0.05] transition-all duration-700 ease-settle sm:text-[7.5rem] lg:-left-8 lg:text-[10rem] ${
          revealed ? "opacity-100" : "opacity-0"
        }`}
      >
        {displayNumber}
      </span>

      {/* Content */}
      <div
        className={`relative z-10 transition-all duration-700 ease-settle ${
          revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
        style={{ transitionDelay: `${index * 80}ms` }}
      >
        <span className="mb-3 block font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
          <span className="text-red font-semibold">{numPart}</span>
          {textPart ? ` / ${textPart}` : ""}
        </span>
        <h3 className="max-w-md text-[24px] font-semibold leading-snug tracking-tight text-ink sm:text-[28px] lg:text-[32px]">
          {finding}
        </h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-inkSoft">
          {detail}
        </p>
        {source && (
          <p className="mt-3 text-[11px] leading-relaxed text-overcast">
            Source:{" "}
            {sourceUrl ? (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-overcast/40 transition-colors hover:text-inkSoft"
              >
                {source}
              </a>
            ) : source}
          </p>
        )}
      </div>
    </div>
  );
}
