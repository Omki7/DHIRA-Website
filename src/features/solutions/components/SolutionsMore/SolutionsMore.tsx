import type { SolutionsPage } from "@/content/pages/solutions";
import { PreviewTag, ScrollReveal, ScrollRevealRail, SectionHeader } from "@/shared/components/ui";
import styles from "./SolutionsMore.module.scss";

export interface SolutionsMoreProps {
  content: SolutionsPage["more"];
}

/*
 * [more-solutions] (kept, user's pick, 5 Nov 2026; moved into
 * features/solutions as an SCSS Module without visual change). The
 * founder's gallery as a hairline register, one row per solution: area,
 * name, one line. Rows are anchors so the industry and function lists
 * below can point at them.
 */
export function SolutionsMore({ content }: SolutionsMoreProps) {
  return (
    <section id="more-solutions" className={styles.section}>
      <ScrollRevealRail>
        <SectionHeader
          num={content.num}
          label={content.label}
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <ul className={styles.register}>
          {content.items.map((solution, i) => (
            <li key={solution.id} id={solution.id} className={styles.row}>
              <ScrollReveal delay={Math.min(i * 40, 240)} className={styles.rowInner}>
                <p className={styles.area}>{solution.area}</p>
                <h3 className={styles.name}>
                  {solution.name}
                  {solution.preview && <PreviewTag className={styles.preview} />}
                </h3>
                <p className={styles.text}>{solution.text}</p>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </ScrollRevealRail>
    </section>
  );
}
