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

import { ScrollReveal } from "@/shared/components/ui";
import { ScrollRevealRail } from "@/shared/components/ui";
import { SectionHeader } from "@/shared/components/ui";
import { SectionCoda } from "@/shared/components/ui";
import ReachArcs from "@/components/demos/careers/ReachArcs";
import type { CareersPage } from "@/content/pages/careers";

export default function CareersImpact({ content }: { content: CareersPage["work"] }) {
  return (
    <section id="the-work" className="scroll-mt-24 bg-background pt-12 pb-20 lg:pt-16 lg:pb-24">
      <ScrollRevealRail>
        <SectionHeader
          num={content.num}
          label={content.label}
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <ScrollReveal delay={180}>
          <div className="mt-10 lg:mt-12">
            <ReachArcs content={content} />
          </div>
          <SectionCoda rule lead={content.coda.lead} payoff={content.coda.payoff} />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
