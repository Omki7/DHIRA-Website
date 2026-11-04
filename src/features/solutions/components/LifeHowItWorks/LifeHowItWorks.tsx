"use client";

import { useEffect, useRef, useState } from "react";
import type { LifePage } from "@/content/pages/solutions-life";
import { ScrollRevealRail, SectionHeader } from "@/shared/components/ui";
import usePrefersReducedMotion from "@/shared/hooks/usePrefersReducedMotion";
import { cx } from "@/shared/utils/cx";
import styles from "./LifeHowItWorks.module.scss";

export interface LifeHowItWorksProps {
  content: LifePage["howItWorks"];
  /** The section's place in the page's order. */
  num: string;
}

type Move = LifePage["howItWorks"]["moves"][number];

/*
 * [the-solution] How it works: three moves, pinned. Kept from the 23 Jul
 * 2026 page (user's pick, 5 Nov 2026); it now opens with the shared
 * SectionHeader and its accents are the site's blue.
 *
 * From lg the section holds still for three screens while the reader
 * scrolls: three outline circles sit in a row and only one is lit, and its
 * paragraph sits under it. Scroll is the only control, so nothing advances
 * by itself. The circles are tangent rather than overlapping on purpose:
 * the moves are strictly sequential, and the argument is that the chain
 * never breaks between them.
 *
 * Below lg and under reduced motion the track collapses and all three
 * moves are laid out at once, so no content is reachable only by scroll.
 * In the pinned track all three paragraphs stay in the document (only the
 * live one is visible), so a screen reader hears every move.
 *
 * Never put `overflow: hidden` on an ancestor of the track: it silently
 * turns `position: sticky` back into static.
 */
function Circle({ move, active }: { move: Move; active: boolean }) {
  return (
    <div className={cx(styles.circle, active && styles.circleActive)}>
      {active && (
        <>
          <span aria-hidden className={styles.orbit}>
            <span className={styles.orbitDot} />
          </span>
          <span aria-hidden className={cx(styles.orbit, styles.orbitReverse)}>
            <span className={styles.orbitDotSmall} />
          </span>
        </>
      )}
      <span aria-hidden className={styles.glyph} />
      <p className={styles.label}>
        {move.label[0]}
        <br />
        {move.label[1]}
      </p>
    </div>
  );
}

export function LifeHowItWorks({ content, num }: LifeHowItWorksProps) {
  const { moves } = content;
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    let raf = 0;
    const read = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      /* Progress across the pinned run: 0 the moment the track's top
         reaches the viewport top, 1 when its bottom does. */
      const travel = rect.height - window.innerHeight;
      const p = travel > 0 ? Math.min(Math.max(-rect.top / travel, 0), 1) : 0;
      setActive(Math.min(Math.floor(p * moves.length), moves.length - 1));
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, [moves.length, reduced]);

  return (
    <section id="the-solution" className={styles.section}>
      <ScrollRevealRail>
        <SectionHeader
          num={num}
          label={content.label}
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        {/* Below lg, and under reduced motion: every move at once. */}
        <ol className={cx(styles.stack, !reduced && styles.stackNarrowOnly)}>
          {moves.map((move) => (
            <li key={move.label[0]} className={styles.stackItem}>
              <Circle move={move} active />
              <p className={styles.body}>{move.body}</p>
            </li>
          ))}
        </ol>

        {!reduced && (
          <div ref={trackRef} className={styles.track}>
            <div className={styles.pin}>
              <div className={styles.row}>
                {moves.map((move, i) => (
                  <Circle key={move.label[0]} move={move} active={i === active} />
                ))}
              </div>
              <div className={styles.bodies}>
                {moves.map((move, i) => (
                  <p
                    key={move.label[0]}
                    className={cx(styles.body, styles.bodyPinned, i === active && styles.bodyLive)}
                    style={{ gridColumn: i + 1 }}
                  >
                    {move.body}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </ScrollRevealRail>
    </section>
  );
}
