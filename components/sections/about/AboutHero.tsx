/*
 * [00] About Hero — We Build Things That Last.
 * Centred hero on the dot-grid backdrop.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

export default function AboutHero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-background">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-white" aria-hidden />

      <ScrollRevealRail>
        <div className="flex min-h-[52vh] flex-col items-center justify-center pt-24 pb-20 text-center lg:pt-32 lg:pb-24">
          <ScrollReveal>
            <figure className="mb-8 inline-flex items-center gap-2 rounded-full border border-subtle-stroke bg-white/95 px-3.5 py-1.5 text-xs shadow-sm backdrop-blur-md sm:text-sm">
              <span className="font-semibold text-primary-text">About</span>
              <span className="h-3.5 w-px bg-default-stroke" aria-hidden />
              <span className="font-medium text-primary-text">The team behind Akashic</span>
            </figure>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
              Small team <span className="text-overcast">&middot;</span> National scale{" "}
              <span className="text-overcast">&middot;</span> Built to last
            </p>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <h1 className="mt-6 max-w-[13em] text-5xl font-semibold leading-[1.05] tracking-tightest text-primary-text md:text-6xl lg:text-7xl">
              We build things that{" "}
              <span className="relative inline-block whitespace-nowrap">
                last.
                <span
                  className="absolute -bottom-[0.06em] left-0 h-[0.08em] w-full rounded-full bg-blue/35"
                  aria-hidden
                />
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <p className="mt-8 max-w-[34em] text-lg font-normal leading-relaxed text-secondary-text md:text-xl">
              A small team of engineers and product builders who believe technology
              should outlast the budget cycle that funded it.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="#talk-to-our-team" className="btn-primary">
                Talk to our team
              </Link>
              <Link href="#what-we-believe" className="btn-secondary">
                What we believe
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={380}>
            <p className="mt-10 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
              New York &middot; Hyderabad &middot; Bangalore
            </p>
          </ScrollReveal>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
