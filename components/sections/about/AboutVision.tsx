"use client";

/*
 * [05] Vision — What Comes Next
 * High-impact editorial layout:
 * - Dominant ambition statement
 * - Clean supporting narrative
 * - 3 secondary pillars structured with minimal design
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

const VISION_PILLARS = [
  {
    title: "Sovereign by design",
    description: "Building technology with control, security, and long-term independence in mind.",
  },
  {
    title: "Intelligence in the system",
    description: "Moving AI beyond isolated experiments and into products, platforms, and workflows where it can create lasting value.",
  },
  {
    title: "Engineering that compounds",
    description: "Building foundations that become stronger, more capable, and more useful over time.",
  },
];

export default function AboutVision() {
  return (
    <section
      id="vision"
      className="scroll-mt-24 border-t border-lineSoft bg-background pt-20 pb-24 lg:pt-28 lg:pb-32"
    >
      <ScrollRevealRail>
        {/* --- SECTION HEADER --- */}
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[05]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;What Comes Next</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Vision</span>
          </div>

          <div className="mt-8 max-w-4xl">
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08]">
              Building what comes next.
            </h2>
            <p className="mt-6 text-2xl font-medium tracking-tight text-blue sm:text-3xl md:text-4xl leading-snug">
              Our ambition is to build India&rsquo;s intelligence layer.
            </p>
          </div>
        </ScrollReveal>

        {/* --- NARRATIVE BODY --- */}
        <ScrollReveal delay={100}>
          <div className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-secondary-text sm:text-lg">
            <p>
              India is entering a new phase of technology — one where data, AI, infrastructure, and software increasingly become part of the systems people and organisations depend on.
            </p>
            <p>
              We want to help build that foundation. That means creating technology that is intelligent enough to adapt, reliable enough to operate at scale, and grounded enough to solve real problems.
            </p>
          </div>
        </ScrollReveal>

        {/* --- 3 SUPPORTING IDEAS --- */}
        <div className="mt-16 pt-12 border-t border-lineSoft">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12 items-start">
            {VISION_PILLARS.map((pillar, idx) => (
              <ScrollReveal key={pillar.title} delay={140 + idx * 50}>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-base text-secondary-text leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
