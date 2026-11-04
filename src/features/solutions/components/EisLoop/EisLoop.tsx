import type { EisPage } from "@/content/pages/solutions-eis";
import { ScrollReveal, ScrollRevealRail, SectionHeader } from "@/shared/components/ui";
import { EisLoopCircuitMockup } from "../../mockups/EisLoopCircuitMockup";
import styles from "./EisLoop.module.scss";

export interface EisLoopProps {
  content: EisPage["loop"];
}

/* [the-loop] Section [05]: the action loop, all five stations at once. */
export function EisLoop({ content }: EisLoopProps) {
  return (
    <section id="the-loop" className={styles.section}>
      <ScrollRevealRail>
        <SectionHeader
          num="05"
          label="THE ACTION LOOP"
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <ScrollReveal delay={90} className={styles.figure}>
          <EisLoopCircuitMockup />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
