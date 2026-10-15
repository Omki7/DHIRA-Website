/*
 * [04] Close: the shared sub-page closure card on `bg-ink` (Rule 5b), the
 * recipe SectorClose and LifeClose use, with the -invert CTA pair. Carries
 * #talk-to-our-team; its CTA opens the global ContactModal.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import TwoToneTitle from "@/components/ui/TwoToneTitle";
import { SOLUTIONS_CLOSE } from "@/lib/solutionsSections";

export default function SolutionsClose() {
  return (
    <section id="talk-to-our-team" className="relative scroll-mt-24 border-t border-lineSoft bg-background pb-20 pt-10 lg:pb-24 lg:pt-14">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="relative mx-auto max-w-[1100px] overflow-hidden rounded-frame bg-ink px-6 py-14 text-center text-white md:px-12 md:py-20">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue/70 via-blue/30 to-transparent" aria-hidden />
            <div className="dot-grid absolute inset-0 opacity-10 invert" aria-hidden />
            <div className="relative">
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-white/55">{SOLUTIONS_CLOSE.label}</p>
              <TwoToneTitle tone="ink" setup={SOLUTIONS_CLOSE.setup} payoff={SOLUTIONS_CLOSE.payoff} className="mx-auto mt-5 max-w-[18em]" />
              <p className="mx-auto mt-6 max-w-[36em] text-pretty text-lg leading-relaxed text-white/65">{SOLUTIONS_CLOSE.body}</p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href="#talk-to-our-team" className="btn-primary-invert btn-lg">
                  Talk to our team
                </Link>
                <Link href="/akashic" className="btn-secondary-invert btn-lg">
                  Explore Akashic
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
