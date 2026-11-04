import type { HomeVoices } from "@/content/pages/home";
import { ScrollReveal, ScrollRevealRail, SectionHeader } from "@/shared/components/ui";
import { VoicesDispatches } from "../VoicesDispatches";
import styles from "./Voices.module.scss";

export interface VoicesProps {
  content: HomeVoices;
}

/* Homepage [08] Partner voices, on the flat band (Rule 5a, approved second).
   The shared header, then the dispatches. */
export function Voices({ content }: VoicesProps) {
  return (
    <section id="voices" className={styles.section}>
      <ScrollRevealRail>
        <SectionHeader num={content.eyebrow.number} label={content.eyebrow.label} setup={content.title.setup} payoff={content.title.payoff} />
        <ScrollReveal delay={120} className={styles.dispatches}>
          <VoicesDispatches content={content} />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
