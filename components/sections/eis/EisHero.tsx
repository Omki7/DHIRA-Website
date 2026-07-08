/*
 * [00] EIS Hero — One Screen. Right Now.
 * Split hero: pitch on the left, the EisBriefMockup morning brief on the
 * right (the page's flagship simulated UI, §8a, recreated from the EIS
 * product prototype). Dot-grid backdrop.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import EisBriefMockup from "@/components/demos/mockups/EisBriefMockup";

export default function EisHero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-white" aria-hidden />

      <div className="rail-container relative border-x-0">
        <div className="grid grid-cols-1 items-center gap-12 pt-20 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-28 lg:pb-24">
          <div>
            <ScrollReveal>
              <figure className="mb-7 inline-flex items-center gap-2 rounded-full border border-subtle-stroke bg-white/95 px-3.5 py-1.5 text-xs shadow-sm backdrop-blur-md sm:text-sm">
                <span className="font-semibold text-primary-text">Akashic EIS</span>
                <span className="h-3.5 w-px bg-default-stroke" aria-hidden />
                <span className="font-medium text-primary-text">Built on Akashic</span>
              </figure>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
                Akashic <span className="text-overcast">&middot;</span> Executive intelligence system
              </p>
            </ScrollReveal>

            <ScrollReveal delay={140}>
              <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tightest text-primary-text md:text-6xl lg:text-[64px]">
                Your entire business.{" "}
                <span className="relative inline-block whitespace-nowrap">
                  One screen.
                  <span className="absolute -bottom-[0.06em] left-0 h-[0.08em] w-full rounded-full bg-blue/35" aria-hidden />
                </span>{" "}
                Right now.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={220}>
              <p className="mt-7 max-w-[36em] text-lg leading-relaxed text-secondary-text">
                Most leadership teams are running on last week&rsquo;s numbers.
                Akashic EIS gives CEOs, CFOs, and business heads a single live
                command centre: finance, operations, sales, and strategy, all
                converging in real time. No waiting for reports. No Monday
                morning surprises.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href="#talk-to-our-team" className="btn-primary">
                  See it live
                </Link>
                <Link href="#the-brief" className="btn-secondary">
                  How it works
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={260} className="min-w-0">
            <div className="flex justify-center lg:justify-end">
              <EisBriefMockup />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
