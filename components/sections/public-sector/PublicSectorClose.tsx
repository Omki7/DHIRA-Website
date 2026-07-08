/*
 * [07] Close — Let's Talk About Your Mission.
 * Dark closure card per the Closure precedent (Rule 5). Carries the
 * #talk-to-our-team id the nav CTA targets.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function PublicSectorClose() {
  return (
    <section id="talk-to-our-team" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="fl-sheen relative mx-auto max-w-[1100px] overflow-hidden rounded-frame bg-ink px-6 py-14 text-center text-white md:px-12 md:py-20">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue/70 via-blue/30 to-transparent" aria-hidden />
            <div className="dot-grid absolute inset-0 opacity-10 invert" aria-hidden />
            <div className="relative">
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-white/50">
                <span className="text-white/30">[07]</span>&nbsp;&nbsp;Ready when you are
              </p>
              <h2 className="mx-auto mt-6 max-w-[16em] text-heading-sm font-semibold text-white md:text-heading-md">
                Let&rsquo;s talk about your mission.
              </h2>
              <p className="mx-auto mt-6 max-w-[36em] text-lg leading-relaxed text-white/65">
                Whether it&rsquo;s a ministry briefing, an RFP, or an early
                conversation about a new scheme&rsquo;s data architecture: we are
                already doing this work at national scale. We&rsquo;d like to show
                you what that looks like for your department.
              </p>
              <div className="mx-auto mt-8 flex w-fit flex-wrap items-center justify-center gap-x-3 gap-y-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-white/50">
                <span>CoWIN</span>
                <span className="h-[3px] w-[3px] rounded-full bg-white/30" aria-hidden />
                <span>DIKSHA</span>
                <span className="h-[3px] w-[3px] rounded-full bg-white/30" aria-hidden />
                <span>eMigrate</span>
                <span className="h-[3px] w-[3px] rounded-full bg-white/30" aria-hidden />
                <span>Poshan Tracker</span>
                <span className="h-[3px] w-[3px] rounded-full bg-white/30" aria-hidden />
                <span className="flex items-center gap-1.5 text-white/80">
                  <span className="h-[5px] w-[5px] rounded-full bg-[#30A46C] animate-[ps-pulse_2s_infinite]" aria-hidden />
                  Your mission
                </span>
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href="/#get-started" className="btn-secondary">
                  Talk to our team
                </Link>
                <Link
                  href="/#get-started"
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-[10px] border border-white/25 px-4 text-sm font-medium text-white transition-colors duration-250 ease-settle hover:bg-white/10"
                >
                  Share your requirements
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
