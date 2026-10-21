import ScrollReveal from "@/components/ui/ScrollReveal";
import VoicesDispatches from "@/components/demos/VoicesDispatches";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import type { HomeVoices } from "@/content/pages/home";

/* Homepage [08] Partner voices, on the flat band (Rule 5a, approved second).
   The shared header, then the dispatches. */
export default function Voices({ content }: { content: HomeVoices }) {
  return (
    <section id="voices" className="relative overflow-hidden bg-band pt-12 pb-16 lg:pt-16 lg:pb-24">
      <ScrollRevealRail>
        <SectionHeader num={content.eyebrow.number} label={content.eyebrow.label} setup={content.title.setup} payoff={content.title.payoff} />
        <ScrollReveal delay={120} className="mt-4 lg:mt-6">
          <VoicesDispatches content={content} />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
