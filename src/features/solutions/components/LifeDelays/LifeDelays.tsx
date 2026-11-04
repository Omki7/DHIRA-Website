import type { LifePage } from "@/content/pages/solutions-life";
import { ScrollReveal, ScrollRevealRail, SectionCoda, SectionHeader } from "@/shared/components/ui";
import { LifeStat } from "./LifeStat";
import { LongRoad } from "./LongRoad";
import styles from "./LifeDelays.module.scss";

export interface LifeDelaysProps {
  content: LifePage["delays"];
  /** The section's place in the page's order. */
  num: string;
}

/*
 * [the-gap] The three delays (5 Nov 2026, docs/LIFE_PAGE_SCRIPT.md). The
 * problem in the reader's own framework: every public health reader knows
 * deciding, reaching and receiving. One drawing carries it (LongRoad), the
 * real figures follow in the site's stat band recipe (deep red for a cost,
 * each with its source), then a coda that hands over to [02]. The drawing
 * carries no figures, so it needs no sample label (Rule 4).
 */
export function LifeDelays({ content, num }: LifeDelaysProps) {
  const { research } = content;
  return (
    <section id="the-gap" className={styles.section}>
      <ScrollRevealRail>
        <SectionHeader
          num={num}
          label={content.label}
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <LongRoad road={content.road} />

        <div className={styles.research}>
          <ScrollReveal>
            <h3 className={styles.researchTitle}>{research.title}</h3>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <ul className={styles.stats}>
              {research.stats.map((stat) => (
                <li key={stat.value} className={styles.stat}>
                  <div>
                    <LifeStat figure={stat.value} />
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
