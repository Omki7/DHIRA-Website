"use client";

/*
 * Akashic Hero with Sticky Quote Backdrop. The hero rides on top as a
 * curtain; scrolling down slides it away to reveal the sticky quote on the
 * flat rgb(var(--band)) band, with word-by-word ink animation responding to
 * scroll progress. The hero lands straight on the quote (23 Oct 2026, user:
 * the dome and module drawings under it went).
 */

import { useEffect, useRef, useState } from "react";
import AkashicHero from "@/components/sections/akashic/AkashicHero";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import type { AkashicPage } from "@/content/pages/akashic";

/* Sticky quote track, in viewport heights.
   The quote panel is `sticky top-16` inside a section `QUOTE_TRACK_VH + curtainHeight`
   tall, so it UNSTICKS and starts scrolling away once scrollY passes
   `curtainHeight + (QUOTE_TRACK_VH - 100)vh`. The word-by-word ink has to finish
   inside that window.

   QUOTE_REVEAL_VH must stay below `QUOTE_TRACK_VH - 100`; the gap is the beat
   the finished quote holds still. */
const QUOTE_TRACK_VH = 200;
const QUOTE_REVEAL_VH = 75;


export default function AkashicHeroQuote({ quote, hero }: { quote: AkashicPage["quote"]; hero: AkashicPage["hero"] }) {
  const reducedMotion = usePrefersReducedMotion();
  const quoteWords = quote.text.split(" ");
  const [quoteProgress, setQuoteProgress] = useState(0);
  const curtainRef = useRef<HTMLDivElement>(null);
  const [curtainHeight, setCurtainHeight] = useState(1400);

  useEffect(() => {
    if (!curtainRef.current) return;
    
    // Set initial
    setCurtainHeight(curtainRef.current.offsetHeight);
    
    // Watch for resizes
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setCurtainHeight(entry.contentRect.height);
      }
    });
    
    observer.observe(curtainRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const handleScroll = () => {
      const scrollPos = window.scrollY;

      // Progress starts once the hero curtain has fully risen and finishes
      // while the quote is still stuck to the viewport — see QUOTE_REVEAL_VH.
      const scrolledPastCurtain = Math.max(0, scrollPos - curtainHeight);
      const revealDistance = (window.innerHeight * QUOTE_REVEAL_VH) / 100;
      const progress = revealDistance > 0
        ? Math.max(0, Math.min(scrolledPastCurtain / revealDistance, 1))
        : 1;

      setQuoteProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [curtainHeight, reducedMotion]);

  const totalWords = quoteWords.length;

  return (
    <div className="relative">
      {/* A solid blue quote band sits beneath the rising hero curtain. */}
      <section
        className="relative w-full bg-band"
        style={{
          height: `calc(${QUOTE_TRACK_VH}vh + ${curtainHeight}px)`,
        }}
      >
        <div className="sticky top-16 flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center text-center px-4">
          <div className="w-full flex justify-center">
            <p className="max-w-[18em] text-[35px] font-medium leading-[1.1] tracking-tight text-ink lg:text-[56px]">
              {quoteWords.map((word, i) => {
                const isActive = reducedMotion || quoteProgress * totalWords >= i + 0.3;
                return (
                  <span key={i} className="inline">
                    <span
                      className="transition-colors duration-[250ms] ease-settle"
                      style={{
                        color: isActive ? "rgb(var(--ink))" : "rgb(var(--inkSoft))",
                      }}
                    >
                      {word}
                    </span>
                    {i < totalWords - 1 && <span className="inline"> </span>}
                    {word === quote.breakAfter && (
                      <br className="hidden md:block" />
                    )}
                  </span>
                );
              })}
            </p>
          </div>
          {/* Author attribution — statically visible immediately as part of the quote */}
          <div className="mt-8 flex flex-col items-center text-sm text-inkSoft">
            <span className="font-semibold text-ink">{quote.name}</span>
            <span>{quote.role}</span>
          </div>
        </div>
      </section>

      {/* Keep the rising curtain; a fine border defines its lower edge. */}
      <div
        ref={curtainRef}
        className="absolute inset-x-0 top-0 z-10 flex w-full flex-col border-b border-card-line bg-background"
      >
        <AkashicHero content={hero} />
      </div>
    </div>
  );
}
