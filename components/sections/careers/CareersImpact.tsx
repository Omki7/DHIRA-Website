"use client";

/*
 * [01] The work: "Ship to production. Production is a country."
 *
 * Intent: the reason to join. `ReachArcs` draws the distance between one
 * person's branch and a country as five arcs, and lands on the three
 * national programmes DHIRA's work runs inside, each with one public record
 * figure.
 *
 * It replaces a chakra ornament beside a one-project-at-a-time carousel: the
 * carousel published one of three projects, and the ornament argued nothing.
 * Figures stay the defensible ones (Rule 4) and the programmes stay
 * generically named, as everywhere else on the site.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionCoda from "@/components/ui/SectionCoda";
import ReachArcs from "@/components/demos/careers/ReachArcs";

export default function CareersImpact() {
  return (
    <section id="the-work" className="scroll-mt-24 bg-background pt-12 pb-20 lg:pt-16 lg:pb-24">
      <ScrollRevealRail>
        <SectionHeader
          num="01"
          label="The work"
          setup="Ship to production."
          payoff="Production is a country."
          lede="Most engineering ships to a dashboard nobody opens. Here, code runs inside national platforms, and every number is public record."
        />

        <ScrollReveal delay={180}>
          <div className="mt-10 lg:mt-12">
            <ReachArcs />
          </div>
          <SectionCoda rule lead="No sandbox. No staging theatre." payoff="Real systems from week one." />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
