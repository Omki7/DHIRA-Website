"use client";

/*
 * [04] How we hire: "No puzzles. No ghosting. No theatre."
 *
 * Intent: show the process instead of promising it. `HiringLoop` draws the
 * four stations with arrows running both ways, and forks at the end into a
 * yes AND a no. The no branch is drawn on purpose: a section that claims no
 * ghosting has to show the branch where the answer is no.
 *
 * It replaces four line art scenes that played one at a time, which meant
 * the "both ways" claim was never visible as a whole. The four step
 * descriptions are the approved copy, now a legend under the drawing.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionCoda from "@/components/ui/SectionCoda";
import HiringLoop from "@/components/demos/careers/HiringLoop";

export default function CareersHiring() {
  return (
    <section
      id="how-we-hire"
      className="scroll-mt-24 bg-background pt-12 pb-20 lg:pt-16 lg:pb-24"
    >
      <ScrollRevealRail>
        <SectionHeader
          num="04"
          label="How we hire"
          setup="No puzzles. No theatre."
          payoff="No ghosting."
          lede="Four steps. Real problems, real colleagues, a straight answer. Both sides interview."
        />

        <ScrollReveal delay={180}>
          <div className="mt-8 lg:mt-10">
            <HiringLoop />
          </div>
          <SectionCoda
            rule
            lead="Every candidate gets an answer."
            payoff={
              <Link href="#talk-to-our-team" className="underline-offset-4 hover:underline">
                Start with the intro call.
              </Link>
            }
          />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
