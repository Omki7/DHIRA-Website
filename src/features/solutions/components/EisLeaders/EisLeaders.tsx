import type { CSSProperties } from "react";
import type { EisPage } from "@/content/pages/solutions-eis";
import { DrawnFigure, ScrollRevealRail, SectionHeader } from "@/shared/components/ui";
import { SeatDrawing } from "./SeatDrawing";
import styles from "./EisLeaders.module.scss";

export interface EisLeadersProps {
  content: EisPage["leaders"];
  /** The section's place in the page's order. */
  num: string;
}

/* Where each seat's stem leaves (the centre of its column, in a 1000-wide
   box) on its way down to the one root at the centre. */
const STEMS = [100, 300, 500, 700, 900];

/*
 * [every-leader] Section [05] (5 Nov 2026, docs/EIS_PAGE_SCRIPT.md).
 * Replaces the role cockpit with the homepage's outcome-card grammar: a
 * role, the plain question it brings, one legible answer, a hairline
 * drawing, a mono source line. The claim is drawn under the cards: five
 * stems flow into one root, the same records. Cards rise in turn once in
 * view; final state under reduced motion and without JS. The old
 * `#your-lens` anchor stays as an alias.
 */
export function EisLeaders({ content, num }: EisLeadersProps) {
  return (
    <section id="every-leader" className={styles.section}>
      <span id="your-lens" aria-hidden="true" className={styles.alias} />
      <ScrollRevealRail>
        <SectionHeader num={num} label="EVERY LEADER" setup={content.setup} payoff={content.payoff} lede={content.lede} />

        <DrawnFigure className={styles.board} threshold={0.25}>
          <ul className={styles.seats}>
            {content.seats.map((seat, i) => (
              <li key={seat.role} className={styles.seat} style={{ ["--d" as string]: `${i * 0.09}s` } as CSSProperties}>
                <p className={styles.role}>{seat.role}</p>
                <p className={styles.question}>{seat.question}</p>
                <p className={styles.answer}>{seat.answer}</p>
                <p className={styles.outcome}>{seat.outcome}</p>
                <SeatDrawing kind={seat.drawing} />
                <p className={styles.source}>{seat.source}</p>
              </li>
            ))}
          </ul>

          <svg className={styles.stems} viewBox="0 0 1000 96" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            {STEMS.map((x) => (
              <path key={x} d={`M${x} 0 C${x} 48, 500 40, 500 92`} className={styles.stem} />
            ))}
          </svg>
          <p className={styles.root}>
            <span className={styles.rootNode} aria-hidden="true" />
            {content.spine}
          </p>
        </DrawnFigure>
      </ScrollRevealRail>
    </section>
  );
}
