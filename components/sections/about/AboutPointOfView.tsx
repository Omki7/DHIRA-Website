"use client";

/*
 * [04] Point of View — What Experience Has Taught Us
 * Editorial typography & whitespace:
 * - Direct, conversational statements written by engineers
 * - Thin line rules, clear hierarchy, no corporate card grids
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

const OPINIONS = [
  {
    num: "01",
    title: "Technology follows the problem.",
    body: "The right architecture is the one that serves the problem — not the one that happens to be fashionable.",
  },
  {
    num: "02",
    title: "Production is the real test.",
    body: "A system is not proven because it works in a demo. It is proven when people depend on it.",
  },
  {
    num: "03",
    title: "Ownership matters.",
    body: "Good engineering creates capability and confidence, not unnecessary dependency.",
  },
];

export default function AboutPointOfView() {
  return (
    <section
      id="point-of-view"
      className="scroll-mt-24 border-t border-lineSoft bg-background pt-20 pb-24 lg:pt-28 lg:pb-32"
    >
      <ScrollRevealRail>
        {/* --- SECTION HEADER --- */}
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[04]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;What Experience Has Taught Us</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Point of View</span>
          </div>

          <div className="mt-8 max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl leading-[1.12]">
              We have a few strong opinions about building technology.
            </h2>
            <p className="mt-5 text-lg text-secondary-text leading-relaxed sm:text-xl">
              Years of building systems in the real world have changed the way we think about technology. A few things have stayed constant.
            </p>
          </div>
        </ScrollReveal>

        {/* --- 3 EDITORIAL STATEMENTS (THIN DIVIDERS & TYPOGRAPHY) --- */}
        <div className="mt-16 divide-y divide-lineSoft border-y border-lineSoft">
          {OPINIONS.map((opinion, idx) => (
            <ScrollReveal key={opinion.num} delay={80 + idx * 50}>
              <div className="py-10 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8 items-baseline">
                <div className="md:col-span-1">
                  <span className="font-mono text-sm font-semibold text-blue">
                    {opinion.num}
                  </span>
                </div>
                <div className="md:col-span-5">
                  <h3 className="text-2xl font-bold tracking-tight text-ink">
                    {opinion.title}
                  </h3>
                </div>
                <div className="md:col-span-6">
                  <p className="text-base sm:text-lg text-secondary-text leading-relaxed">
                    {opinion.body}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* --- CLOSING STATEMENT --- */}
        <ScrollReveal delay={220}>
          <div className="mt-12">
            <p className="font-mono text-xs sm:text-sm font-semibold text-inkSoft">
              These aren&apos;t principles we put on a wall. They&apos;re lessons we keep carrying into the next system we build.
            </p>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
