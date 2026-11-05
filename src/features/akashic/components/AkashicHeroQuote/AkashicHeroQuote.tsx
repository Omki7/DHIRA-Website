"use client";

/*
 * Akashic Hero with Sticky Quote Backdrop. The hero rides on top as a
 * curtain; scrolling down slides it away to reveal the sticky quote on the
 * flat rgb(var(--band)) band, with word-by-word ink animation responding to
 * scroll progress. The hero lands straight on the quote (23 Oct 2026, user:
 * the dome and module drawings under it went).
 */

import { useEffect, useRef, useState } from "react";
import type { AkashicPage } from "@/content/pages/akashic";
import usePrefersReducedMotion from "@/shared/hooks/usePrefersReducedMotion";
import { AkashicHero } from "../AkashicHero";
import styles from "./AkashicHeroQuote.module.scss";

/* Sticky quote track, in viewport heights.
   The quote panel is `sticky top-16` inside a section `QUOTE_TRACK_VH + curtainHeight`
   tall, so it UNSTICKS and starts scrolling away once scrollY passes
   `curtainHeight + (QUOTE_TRACK_VH - 100)vh`. The word-by-word ink has to finish
   inside that window.

   QUOTE_REVEAL_VH must stay below `QUOTE_TRACK_VH - 100`; the gap is the beat
   the finished quote holds still. */
const QUOTE_TRACK_VH = 200;
const QUOTE_REVEAL_VH = 75;

export interface AkashicHeroQuoteProps {
  quote: NonNullable<AkashicPage["quote"]>;
  hero: AkashicPage["hero"];
}

export function AkashicHeroQuote({ quote, hero }: AkashicHeroQuoteProps) {
  const reducedMotion = usePrefersReducedMotion();
  const quoteWords = quote.text.split(" ");
  const [quoteProgress, setQuoteProgress] = useState(0);
  const curtainRef = useRef<HTMLDivElement>(null);
  /* Null until measured. The first render sizes the track from the hero's
     own CSS height (one screen under the 110px header), so nothing below
     moves when the measurement lands (a fixed 1400px guess shifted the page
     about 600px after hydration and broke deep links). */
  const [curtainHeight, setCurtainHeight] = useState<number | null>(null);

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
      const curtain = curtainHeight ?? window.innerHeight - 110;
      const scrolledPastCurtain = Math.max(0, scrollPos - curtain);
      const revealDistance = (window.innerHeight * QUOTE_REVEAL_VH) / 100;
      const progress =
        revealDistance > 0
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
    <div className={styles.wrapper}>
      {/* A solid blue quote band sits beneath the rising hero curtain. */}
      <section
        className={styles.quoteSection}
        style={{
          height:
            curtainHeight === null
              ? `calc(${QUOTE_TRACK_VH}vh + 100svh - 110px)`
              : `calc(${QUOTE_TRACK_VH}vh + ${curtainHeight}px)`,
        }}
      >
        <div className={styles.stickyContainer}>
          <div className={styles.quoteWrap}>
            <p className={styles.quoteText}>
              {quoteWords.map((word, i) => {
                const isActive =
                  reducedMotion || quoteProgress * totalWords >= i + 0.3;
                return (
                  <span key={i} className={styles.wordWrapper}>
                    <span
                      className={styles.wordSpan}
                      style={{
                        color: isActive
                          ? "rgb(var(--ink))"
                          : "rgb(var(--inkSoft))",
                      }}
                    >
                      {word}
                    </span>
                    {i < totalWords - 1 && (
                      <span className={styles.spaceSpan}> </span>
                    )}
                    {word === quote.breakAfter && (
                      <br className={styles.breakLine} />
                    )}
                  </span>
                );
              })}
            </p>
          </div>
          {/* Author attribution — statically visible immediately as part of the quote */}
          <div className={styles.author}>
            <span className={styles.authorName}>{quote.name}</span>
            <span>{quote.role}</span>
          </div>
        </div>
      </section>

      {/* Keep the rising curtain; a fine border defines its lower edge. */}
      <div
        ref={curtainRef}
        className={styles.curtain}
      >
        <AkashicHero content={hero} />
      </div>
    </div>
  );
}
