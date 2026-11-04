import type { LifePage } from "@/content/pages/solutions-life";
import { DrawnFigure, ScrollRevealRail, SectionCoda, SectionHeader } from "@/shared/components/ui";
import { LifeVisitMockup } from "../../mockups/LifeVisitMockup";
import { VisitRoad } from "./VisitRoad";
import styles from "./LifeVisit.module.scss";

export interface LifeVisitProps {
  content: LifePage["visit"];
  /** The section's place in the page's order. */
  num: string;
}

/*
 * [at-the-visit] One antenatal check-up, end to end (5 Nov 2026,
 * docs/LIFE_PAGE_SCRIPT.md). Replaces the record anatomy. The handset at
 * native size (the page's one product view) shows the result and its
 * reason; beside it the road from [01] runs on to the health centre, dashed
 * until a bar appears. From xl the two sit side by side; below xl the
 * handset, then the beats in order, then the arrival. The coda puts the
 * clinician in charge.
 */
export function LifeVisit({ content, num }: LifeVisitProps) {
  return (
    <section id="at-the-visit" className={styles.section}>
      <span id="the-record" aria-hidden="true" className={styles.alias} />
      <ScrollRevealRail>
        <SectionHeader
          num={num}
          label={content.label}
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <DrawnFigure className={styles.stage} threshold={0.3}>
          <div className={styles.handset}>
            <LifeVisitMockup handset={content.handset} />
          </div>
          <VisitRoad visit={content} />

          {/* Below xl: the beats in order, then the arrival. */}
          <div className={styles.sequence}>
            <ol className={styles.beatList}>
              {content.beats.map((beat, i) => (
                <li key={beat.title} className={styles.beatItem}>
                  <p className={styles.beatTitle}>
                    <span className={styles.step}>{i + 1}</span>
                    {beat.title}
                  </p>
                  <p className={styles.beatDetail}>{beat.detail}</p>
                </li>
              ))}
            </ol>
            <div className={styles.arrivalInline}>
              <p className={styles.arrivalLabel}>{content.arrival.label}</p>
              <p className={styles.arrivalName}>{content.arrival.name}</p>
              <p className={styles.arrivalDetail}>{content.arrival.detail}</p>
            </div>
          </div>
        </DrawnFigure>

        <SectionCoda lead={content.coda.lead} payoff={content.coda.payoff} rule />
      </ScrollRevealRail>
    </section>
  );
}
