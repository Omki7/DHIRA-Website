import type { EisPage } from "@/content/pages/solutions-eis";
import { ScrollReveal, ScrollRevealRail, SectionCoda, SectionHeader } from "@/shared/components/ui";
import { GapBoard } from "./GapBoard";
import { GapStat } from "./GapStat";
import styles from "./EisGap.module.scss";

export interface EisGapProps {
  content: EisPage["gap"];
}

/*
 * [the-gap] Section [01]: The decision gap. The page's one soft band.
 * One drawing carries the argument (GapBoard): the pieces of one client's
 * trouble exist on day 0 in three departments' systems, and the question
 * is when leadership sees them together. The real industry figures follow
 * in the site's stat band recipe (DESIGN_SYSTEM §7), deep red for a cost,
 * then a coda. The drawing is a sample scenario beside real figures, so it
 * carries its "Illustrative scenario" label (Rule 4).
 */
export function EisGap({ content }: EisGapProps) {
  const { research } = content;
  return (
    <section id="the-gap" className={styles.section}>
      <ScrollRevealRail>
        <SectionHeader
          num="01"
          label="THE DECISION GAP"
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <ScrollReveal delay={90}>
          <div className={styles.figure}>
            <GapBoard board={content.board} />
          </div>
        </ScrollReveal>

        <div className={styles.research}>
          <ScrollReveal>
            <h3 className={styles.researchTitle}>{research.title}</h3>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <ul className={styles.stats}>
              {research.stats.map((stat) => (
                <li key={stat.value} className={styles.stat}>
                  <div>
                    <GapStat figure={stat.value} />
                    <p className={styles.statLabel}>{stat.label}</p>
                  </div>
                  <cite className={styles.statCitation}>{stat.citation}</cite>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>

        <SectionCoda lead={content.coda.lead} payoff={content.coda.payoff} rule />
      </ScrollRevealRail>
    </section>
  );
}
