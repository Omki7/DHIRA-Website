import { ScrollReveal } from "@/shared/components/ui";
import { ScrollRevealRail } from "@/shared/components/ui";
import { SectionHeader } from "@/shared/components/ui";
import EisLoopCircuitMockup from "@/components/demos/mockups/eis/EisLoopCircuitMockup";
import type { EisPage } from "@/content/pages/solutions-eis";

/* [the-loop] — Section [05]: The Action Loop
 * Adheres to Section Grammar: FigureEyebrow [05] THE ACTION LOOP,
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
          num="05"
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
