/*
 * [10] Close — See It With Your Own Numbers.
 * Restaged in Keytail-inspired dark sky glass aesthetics.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

export default function EisClose() {
  return (
    <section id="talk-to-our-team" className="relative scroll-mt-24 border-t border-white/10 bg-transparent pt-12 pb-24 lg:pt-16 lg:pb-32">
      <span id="login" className="absolute -top-24" aria-hidden />
      <ScrollRevealRail dark isLast>
        <ScrollReveal>
          <div className="fl-sheen relative mx-auto max-w-[1100px] overflow-hidden rounded-frame border border-[#242D5A] bg-[#0D122B]/95 px-6 py-14 text-center text-white shadow-2xl backdrop-blur-md md:px-12 md:py-20">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-400 via-blue/40 to-transparent" aria-hidden />
            <div className="dot-grid-dark absolute inset-0 opacity-20" aria-hidden />
            <div className="relative z-10">
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-white/50">
                <span className="text-white/30">[10]</span>&nbsp;&nbsp;Ready when you are
              </p>
              <h2 className="mx-auto mt-6 max-w-[16em] text-heading-sm font-semibold text-white md:text-heading-md">
                See it with your own numbers.
              </h2>
              <p className="mx-auto mt-6 max-w-[36em] text-lg leading-relaxed text-white/70">
                A thirty-minute working session on a dataset shaped like yours. You
                will see your kind of figures, your kind of exposure, and the trace
                under each one.
              </p>
              <p className="mx-auto mt-7 max-w-[26em] text-xl font-semibold tracking-tight text-white md:text-2xl">
                Bring the question you currently cannot get answered by Friday.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link href="/#get-started" className="btn-primary-invert">
                  Talk to our team
                </Link>
                <Link
                  href="/akashic"
                  className="btn-secondary-invert"
                >
                  See the Akashic platform
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
