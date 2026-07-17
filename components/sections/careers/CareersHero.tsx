/*
 * [00] Careers Hero — India's Intelligence Layer.
 * Centred hero on the dot-grid backdrop: NOW HIRING pill, the brand careers
 * line as H1, the approved "small team that ships" copy, and the locations
 * strip. CTAs anchor to the roles board and hiring process.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CareersHero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-background">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-white" aria-hidden />

      <div className="rail-container relative border-x-0">
        <div className="flex min-h-[50vh] flex-col items-center justify-center pt-24 pb-20 text-center lg:pt-32 lg:pb-24">
          <ScrollReveal>
            <figure className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-subtle-stroke bg-white/95 px-3.5 py-1.5 text-xs shadow-sm backdrop-blur-md sm:text-sm">
              <span className="font-semibold text-primary-text">Careers</span>
              <span className="h-3.5 w-px bg-default-stroke" aria-hidden />
              <span className="flex items-center gap-1.5 font-medium text-blue">
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-50"
                    style={{ animationDuration: "2.4s" }}
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
                </span>
                Now hiring
              </span>
            </figure>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
              Small team <span className="text-overcast">&middot;</span> National scale{" "}
              <span className="text-overcast">&middot;</span> Built to last
            </p>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <h1 className="mt-6 max-w-[15em] text-5xl font-semibold leading-[1.05] tracking-tightest text-primary-text md:text-6xl lg:text-7xl">
              Join us in building India&rsquo;s{" "}
              <span className="relative inline-block whitespace-nowrap">
                intelligence layer.
                <span
                  className="absolute -bottom-[0.06em] left-0 h-[0.08em] w-full rounded-full bg-blue/35"
                  aria-hidden
                />
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <p className="mt-8 max-w-[34em] text-lg font-normal leading-relaxed text-secondary-text md:text-xl">
              We are a small team that ships. Our work runs inside national
              platforms, touches millions of people, and lasts beyond any single
              budget cycle. If that matters to you, we should talk.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="#open-roles" className="btn-primary">
                See open roles
              </Link>
              <Link href="#how-we-hire" className="btn-secondary">
                How we hire
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={360}>
            <p className="mt-14 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
              New York &middot; Hyderabad &middot; Bangalore &middot; Remote
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
