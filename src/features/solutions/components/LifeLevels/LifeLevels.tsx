import type { CSSProperties } from "react";
import type { LifePage } from "@/content/pages/solutions-life";
import { DrawnFigure, ScrollRevealRail, SectionCoda, SectionHeader } from "@/shared/components/ui";
import { Watershed } from "./Watershed";
import styles from "./LifeLevels.module.scss";

export interface LifeLevelsProps {
  content: LifePage["levels"];
  /** The section's place in the page's order. */
  num: string;
}

/*
 * [every-level] One reading, every level that acts on it (5 Nov 2026,
 * docs/LIFE_PAGE_SCRIPT.md; reworked after the section's critique). The
 * watershed carries the claim, and where names stop; under it, four seats
 * in the homepage outcome-card grammar, one per level, each over its column
 * of the drawing: its tier, a role, the plain question it asks, one legible
 * answer, its outcome in blue, a mono source line. No counts or rankings:
 * answers are names and states (the page's claims rules). Each seat names
 * its tier in text (shown below xl, read by screen readers everywhere), so
 * the aria-hidden drawing is never the only place the tier lives. The old
 * `#altitude` anchor stays as an alias.
 */
export function LifeLevels({ content, num }: LifeLevelsProps) {
  return (
    <section id="every-level" className={styles.section}>
      <span id="altitude" aria-hidden="true" className={styles.alias} />
      <ScrollRevealRail>
        <SectionHeader
          num={num}
          label={content.label}
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <DrawnFigure className={styles.board} threshold={0.25}>
          <Watershed tiers={content.tiers} boundary={content.boundary} />
          <ul className={styles.seats}>
            {content.seats.map((seat, i) => (
              <li key={seat.key} className={styles.seat} style={{ "--i": i } as CSSProperties}>
                <p className={styles.role}>
                  <span className={styles.seatTier}>{seat.tier} · </span>
                  {seat.role}
                </p>
                <p className={styles.question}>{seat.question}</p>
                <p className={styles.answer}>{seat.answer}</p>
                <p className={styles.outcome}>{seat.outcome}</p>
                <p className={styles.source}>{seat.source}</p>
              </li>
            ))}
          </ul>
        </DrawnFigure>

        <SectionCoda lead={content.coda.lead} payoff={content.coda.payoff} rule />
      </ScrollRevealRail>
    </section>
  );
}
