import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import EisGapTimelineMockup from "@/components/demos/mockups/eis/EisGapTimelineMockup";
import type { EisPage } from "@/content/pages/solutions-eis";

/* [the-gap] — Section [02]: The Decision Gap
 * Adheres to Section Grammar: FigureEyebrow [02] THE DECISION GAP,
 * two-tone headline, lede directly below, ScrollRevealRail layout.
 */
export default function EisGap({ content }: { content: EisPage["gap"] }) {
  return (
    <section
      id="the-gap"
      className="relative w-full scroll-mt-24 overflow-clip bg-eis-band pt-12 pb-16 lg:pt-16 lg:pb-24"
    >
      <ScrollRevealRail>
        <SectionHeader
          num="02"
          label="THE DECISION GAP"
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <ScrollReveal delay={90}>
          <div className="mt-12 lg:mt-14">
            <EisGapTimelineMockup />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <div className="mt-8 flex flex-col gap-4 border-t border-lineSoft pt-6 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="max-w-[620px] text-balance text-base leading-relaxed text-secondary-text sm:text-lg">
              {content.conclusion}
            </p>
            <p className="flex-shrink-0 font-mono text-[11px] uppercase tracking-wider text-tertiary-text">
              {content.note}
            </p>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
