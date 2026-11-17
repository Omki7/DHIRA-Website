import type { EisPage } from "@/content/pages/solutions-eis";
import { ScrollReveal, ScrollRevealRail, SectionHeader, Tag } from "@/shared/components/ui";
import { OnePictureField } from "./OnePictureField";
import styles from "./EisOnePicture.module.scss";

export interface EisOnePictureProps {
  content: EisPage["onePicture"];
}

/*
 * [one-picture] What Enterprise Intelligence is (5 Nov 2026,
 * docs/EIS_PAGE_SCRIPT.md). [01] leaves the reader with one client's
 * trouble scattered across three departments; this section answers with
 * the same client whole: one question, eight linked records, four
 * departments. The five views follow as a set of tags, then the promise
 * that holds it together: read-only, traced to the record.
 */
export function EisOnePicture({ content }: EisOnePictureProps) {
  return (
    <section id="one-picture" className={styles.section}>
      <ScrollRevealRail>
        <SectionHeader num={content.eyebrow.number} label={content.eyebrow.label} setup={content.setup} payoff={content.payoff} lede={content.lede} />

        <ScrollReveal delay={90}>
          <OnePictureField figure={content.figure} />
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className={styles.foot}>
            <div className={styles.views}>
              <p className={styles.viewsLabel}>{content.views.label}</p>
              <ul className={styles.tags}>
                {content.views.items.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </div>
            <p className={styles.note}>{content.note}</p>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
