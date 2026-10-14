"use client";

/*
 * Akashic Hero + Showcase Wireframes with Sticky Quote Backdrop.
 * Lifted and shifted from the homepage hero: the Hero and wireframe showcase
 * ride on top as a curtain; scrolling down slides the curtain away to reveal
 * the sticky quote on the flat #F1F5FE band, with word-by-word ink animation
 * responding to scroll progress.
 */

import { useEffect, useRef, useState } from "react";
import AkashicHero from "@/components/sections/akashic/AkashicHero";
import AkashicShowcase from "@/components/sections/akashic/AkashicShowcase";

/* Sticky quote track, in viewport heights.
   The quote panel is `sticky top-16` inside a section `QUOTE_TRACK_VH + curtainHeight`
   tall, so it UNSTICKS and starts scrolling away once scrollY passes
   `curtainHeight + (QUOTE_TRACK_VH - 100)vh`. The word-by-word ink has to finish
   inside that window.

   QUOTE_REVEAL_VH must stay below `QUOTE_TRACK_VH - 100`; the gap is the beat
   the finished quote holds still. */
const QUOTE_TRACK_VH = 200;
const QUOTE_REVEAL_VH = 75;

const quoteWords = [
  "“I",
  "didn’t",
  "realise",
  "how",
  "much",
  "I’d",
  "stopped",
  "trusting",
  "our",
  "own",
  "numbers",
  "until",
  "the",
  "day",
  "I",
  "finally",
  "could",
  "again.”",
];

export default function AkashicHeroQuote() {
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
    const handleScroll = () => {
      const scrollPos = window.scrollY;

      // Progress starts once the hero + wireframes curtain has fully risen and finishes
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
  }, [curtainHeight]);

  const totalWords = quoteWords.length;

  return (
    <div className="relative">
      {/* Quote section — tall sticky backdrop. Same flat #F1F5FE band as
          [06] Open architecture (22 Sep 2026, user direction), so the page's
          two blue moments are one colour. It was `blue-subtle` #EEF1FC under
          a grey dot grid, which read lavender and dusty beside [06]; the
          grid went with it. The last 60vh fades to white so the band melts
          into [01] with no hard edge (23 Sep 2026, user direction). */}
      <section
        className="relative w-full bg-band"
        style={{
          height: `calc(${QUOTE_TRACK_VH}vh + ${curtainHeight}px)`,
          backgroundImage:
            "linear-gradient(to bottom, rgb(var(--band)) calc(100% - 60vh), rgb(var(--background)) 100%)",
        }}
      >
        <div className="sticky top-16 flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center text-center px-4">
          <div className="w-full flex justify-center">
            <p className="max-w-[18em] text-[35px] font-medium leading-[1.1] tracking-tight text-ink lg:text-[56px]">
              {quoteWords.map((word, i) => {
                const isActive = quoteProgress * totalWords >= i + 0.3;
                return (
                  <span key={i} className="inline">
                    <span
                      className="transition-colors duration-[250ms] ease-settle"
                      style={{
                        color: isActive ? "rgb(var(--ink))" : "rgb(var(--ink) / 0.35)",
                      }}
                    >
                      {word}
                    </span>
                    {i < totalWords - 1 && <span className="inline"> </span>}
                    {word === "trusting" && (
                      <br className="hidden md:block" />
                    )}
                  </span>
                );
              })}
            </p>
          </div>
          {/* Author attribution — statically visible immediately as part of the quote */}
          <div className="mt-8 flex flex-col items-center text-sm text-inkSoft">
            <span className="font-semibold text-ink">Ananya Rao</span>
            <span>Chief Operating Officer · Nexora</span>
          </div>
        </div>
      </section>

      {/* Hero + wireframes showcase content layer — absolute positioned to act as a rising curtain */}
      <div
        ref={curtainRef}
        className="absolute inset-x-0 top-0 z-10 flex w-full flex-col bg-background"
      >
        <AkashicHero />
        <AkashicShowcase />
      </div>
    </div>
  );
}
