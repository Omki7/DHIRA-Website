"use client";

/*
 * [03] What We Build — Technology Should Become Part of the System
 * Pure editorial layout:
 * - Direct, authoritative narrative
 * - 3 simple pillars: Products · Platforms · Intelligence
 * - Zero service cards, zero tech-stack logos
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

const PILLARS = [
  {
    title: "Products",
    summary: "Technology people use.",
  },
  {
    title: "Platforms",
    summary: "Systems organisations build on.",
  },
  {
    title: "Intelligence",
    summary: "Data and AI that make those systems smarter.",
  },
];

export default function AboutWhatWeBuild() {
  return (
    <section
      id="what-we-build"
      className="scroll-mt-24 border-t border-lineSoft bg-background pt-20 pb-24 lg:pt-28 lg:pb-32"
    >
      <ScrollRevealRail>
        {/* --- SECTION HEADER --- */}
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[03]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Our Work</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ What We Build</span>
          </div>

          <div className="mt-8 max-w-4xl">
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
              Technology should become part of the system, not sit beside it.
            </h2>
            <p className="mt-6 max-w-3xl text-lg text-secondary-text leading-relaxed sm:text-xl">
              We build the products, platforms, and technology systems that turn complex problems into something organisations can actually use. That means working across engineering, data, and AI — connecting the pieces so technology can move from an idea into something reliable, useful, and built to last.
            </p>
          </div>
        </ScrollReveal>

        {/* --- 3 SIMPLE EDITORIAL PILLARS (NOT SERVICE CARDS) --- */}
        <div className="mt-16 pt-12 border-t border-lineSoft">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12 items-start">
            {PILLARS.map((pillar, idx) => (
              <ScrollReveal key={pillar.title} delay={80 + idx * 50}>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-base text-secondary-text leading-relaxed">
                    {pillar.summary}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* --- CLOSING STATEMENT --- */}
        <ScrollReveal delay={200}>
          <div className="mt-14 pt-8 border-t border-lineSoft/60">
            <p className="font-mono text-xs sm:text-sm font-semibold text-inkSoft">
              From data foundations to intelligent products, we build for what happens after the first release.
            </p>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
