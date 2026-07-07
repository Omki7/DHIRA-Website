/*
 * [07] Close — Ready to Deploy Life-Saving AI?
 * Dark closure card per the Closure precedent (Rule 5). Carries the
 * #talk-to-our-team id the nav CTA targets.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function LifeClose() {
  return (
    <section id="talk-to-our-team" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="fl-sheen relative mx-auto max-w-[1100px] overflow-hidden rounded-frame bg-ink px-6 py-14 text-center text-white md:px-12 md:py-20">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue/70 via-blue/30 to-transparent" aria-hidden />
            <div className="dot-grid absolute inset-0 opacity-10 invert" aria-hidden />
            <div className="relative">
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-white/50">
                <span className="text-white/30">[07]</span>&nbsp;&nbsp;Where it matters most
              </p>
              <h2 className="mx-auto mt-6 max-w-[16em] text-heading-sm font-semibold text-white md:text-heading-md">
                Ready to deploy life-saving AI?
              </h2>
              <p className="mx-auto mt-6 max-w-[34em] text-lg leading-relaxed text-white/65">
                Join the network of health systems, NGOs, and government bodies
                already using Akashic Life to close the gap between risk and
                rescue: at the edge, where it matters most.
              </p>
              <div className="mx-auto mt-8 flex w-fit items-center gap-3 font-mono text-[9px] uppercase tracking-[0.1em] text-white/50">
                <span>4 days</span>
                <svg width="26" height="8" viewBox="0 0 26 8" fill="none" aria-hidden>
                  <path d="M1 4h22M20 1.5L23.5 4 20 6.5" stroke="#C8D2F5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="flex items-center gap-1.5 text-white/80">
                  <span className="h-[5px] w-[5px] rounded-full bg-[#30A46C] animate-[ps-pulse_2s_infinite]" aria-hidden />
                  2 minutes
                </span>
              </div>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href="/#get-started" className="btn-secondary">
                  Partner with us
                </Link>
                <Link
                  href="#proof"
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-[10px] border border-white/25 px-4 text-sm font-medium text-white transition-colors duration-250 ease-settle hover:bg-white/10"
                >
                  See the impact
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
