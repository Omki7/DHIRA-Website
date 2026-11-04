/* Homepage [03]: three illustrated solutions on the complete Akashic platform. */

import type { HomeSolutions } from "@/content/pages/home";
import { ScrollReveal, ScrollRevealRail, SectionHeader, SectionLink } from "@/shared/components/ui";
import { SolutionsOnFoundation } from "../SolutionsOnFoundation";
import styles from "./BuiltOnAkashic.module.scss";

export interface BuiltOnAkashicProps {
  content: HomeSolutions;
}

export function BuiltOnAkashic({ content }: BuiltOnAkashicProps) {
  return (
    <section id="solutions" className={styles.root}>
      <ScrollRevealRail>
        <SectionHeader num={content.eyebrow.number} label={content.eyebrow.label} setup={content.title.setup} payoff={content.title.payoff} lede={content.description}>
          <SectionLink href={content.cta.href}>{content.cta.label}</SectionLink>
        </SectionHeader>

        <ScrollReveal delay={140} className={styles.solutions}>
          <SolutionsOnFoundation
            blocks={content.items}
            modules={content.modules}
            foundation={content.foundation}
          />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
