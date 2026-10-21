import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import EisCommandCentreMockup from "@/components/demos/mockups/eis/EisCommandCentreMockup";
import type { EisPage } from "@/content/pages/solutions-eis";

/* [your-lens] — Section [01]: The Role-Based Command Centre
 * Adheres to Section Grammar: FigureEyebrow [01] ROLE-BASED COCKPIT,
 * two-tone headline, lede directly below, ScrollRevealRail layout.
 */
export default function EisLenses({ content }: { content: EisPage["lenses"] }) {
  return (
    <section
      id="your-lens"
      className="relative w-full scroll-mt-24 overflow-clip bg-background pt-12 pb-16 lg:pt-16 lg:pb-24"
    >
      <ScrollRevealRail>
        <SectionHeader
          num="01"
          label="ROLE-BASED COCKPIT"
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <ScrollReveal delay={90}>
          <div className="mt-12 lg:mt-14">
            <EisCommandCentreMockup />
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
