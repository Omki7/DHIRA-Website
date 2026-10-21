import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import EisLoopCircuitMockup from "@/components/demos/mockups/eis/EisLoopCircuitMockup";
import type { EisPage } from "@/content/pages/solutions-eis";

/* [the-loop] — Section [04]: The Action Loop
 * Adheres to Section Grammar: FigureEyebrow [04] THE ACTION LOOP,
 * two-tone headline, lede directly below, ScrollRevealRail layout.
 */
export default function EisLoop({ content }: { content: EisPage["loop"] }) {
  return (
    <section
      id="the-loop"
      className="relative w-full scroll-mt-24 overflow-clip bg-background pt-12 pb-16 lg:pt-16 lg:pb-24"
    >
      <ScrollRevealRail>
        <SectionHeader
          num="04"
          label="THE ACTION LOOP"
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <ScrollReveal delay={90}>
          <div className="mt-12 lg:mt-14">
            <EisLoopCircuitMockup />
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
