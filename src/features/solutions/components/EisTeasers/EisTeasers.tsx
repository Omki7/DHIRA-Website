import type { EisPage } from "@/content/pages/solutions-eis";
import { ScrollReveal, ScrollRevealRail, SectionHeader } from "@/shared/components/ui";
import { EisTeaserCard } from "./EisTeaserCard";
import styles from "./EisTeasers.module.scss";

export interface EisTeasersProps {
  content: NonNullable<EisPage["teasers"]>;
}

/* The footage's ground is #f7f7f5. Each matrix scales the three channels so
   that ground lands on a target: light, the page's `background` (252 253
   255); dark, a soft cool white (228 235 246). Values are target / 247 for
   red and green and target / 245 for blue (EisTeasers.module.scss). */
const FOOTAGE_MATRICES = {
  "eis-footage-light": "1.0202 0 0 0 0  0 1.0243 0 0 0  0 0 1.0408 0 0  0 0 0 1 0",
  "eis-footage-dark": "0.9231 0 0 0 0  0 0.9514 0 0 0  0 0 1.0041 0 0  0 0 0 1 0",
};

/* [use-cases] Section [03]: four thirty-second stories, two by two. */
export function EisTeasers({ content }: EisTeasersProps) {
  return (
    <section id="use-cases" className={styles.section}>
      <svg className={styles.filters} aria-hidden="true" focusable="false">
        {Object.entries(FOOTAGE_MATRICES).map(([id, values]) => (
          <filter key={id} id={id} colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values={values} />
          </filter>
        ))}
      </svg>
      <ScrollRevealRail>
        <SectionHeader
          num="03"
          label="FOUR STORIES, THIRTY SECONDS EACH"
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <div className={styles.grid}>
          {content.items.map((item, idx) => (
            <ScrollReveal key={item.id} delay={idx * 60}>
              <EisTeaserCard item={item} playLabel={content.playLabel} replayLabel={content.replayLabel} />
            </ScrollReveal>
          ))}
        </div>
      </ScrollRevealRail>
    </section>
  );
}
