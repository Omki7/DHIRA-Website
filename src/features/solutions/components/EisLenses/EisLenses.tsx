import type { EisPage } from "@/content/pages/solutions-eis";
import { ScrollReveal, ScrollRevealRail, SectionHeader } from "@/shared/components/ui";
import { EisCommandCentreMockup } from "../../mockups/EisCommandCentreMockup";
import styles from "./EisLenses.module.scss";

export interface EisLensesProps {
  content: EisPage["lenses"];
}

/* [your-lens] Section [01]: the role cockpits. One drawing, the five
   executive roles reading the same governed numbers. */
export function EisLenses({ content }: EisLensesProps) {
  return (
    <section id="your-lens" className={styles.section}>
      <ScrollRevealRail>
        <SectionHeader
          num="01"
          label="ROLE-BASED COCKPIT"
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <ScrollReveal delay={90} className={styles.figure}>
          <EisCommandCentreMockup ctaHref={content.cta.href} />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
