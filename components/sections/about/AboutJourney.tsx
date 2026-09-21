"use client";

/*
 * [06] Company Journey — The Journey So Far
 * Editorial timeline:
 * - Minimal, high-clarity historical progression
 * - Verified milestones with one-sentence explanations
 * - No fake financial growth curves or complex decoration
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

interface Milestone {
  year: string;
  title: string;
  description: string;
  isLatest?: boolean;
}

const MILESTONES: Milestone[] = [
  {
    year: "2018",
    title: "Dhira Founded",
    description: "Engineering origins in NY and Hyderabad, solving complex systems problems.",
  },
  {
    year: "2020",
    title: "Akashic R&D",
    description: "Solving complex data unification and building foundational knowledge layers.",
  },
  {
    year: "2021",
    title: "18M+ Citizens",
    description: "National DPI rollout at country scale, proven in high-stakes production.",
  },
  {
    year: "2023",
    title: "Platform Launch",
    description: "Scaling full-stack data and AI engineering across enterprise systems.",
  },
  {
    year: "2025",
    title: "National AI Winner",
    description: "Statewide intelligence deployments delivering verifiable operational value.",
  },
  {
    year: "TODAY",
    title: "Building for what comes next",
    description: "Dhira brings engineering, data, AI, and product capabilities together to build technology for the real world.",
    isLatest: true,
  },
];

export default function AboutJourney() {
  return (
    <section
      id="journey"
      className="scroll-mt-24 border-t border-lineSoft bg-background pt-20 pb-24 lg:pt-28 lg:pb-32"
    >
      <ScrollRevealRail>
        {/* --- SECTION HEADER --- */}
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[06]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;The Journey</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Milestones</span>
          </div>

          <div className="mt-8 max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl leading-[1.12]">
              The journey so far.
            </h2>
            <p className="mt-5 text-lg text-secondary-text leading-relaxed sm:text-xl">
              Dhira has evolved with the problems we chose to solve. What started with engineering grew into a broader journey across data, AI, products, and platforms.
            </p>
          </div>
        </ScrollReveal>

        {/* --- EDITORIAL HORIZONTAL TIMELINE STAGE --- */}
        <div className="mt-16 pt-12 border-t border-lineSoft">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6 items-start">
            {MILESTONES.map((m, idx) => (
              <ScrollReveal key={m.year} delay={60 + idx * 40}>
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <span
                      className={`font-mono text-xs font-bold tracking-tight inline-block ${
                        m.isLatest ? "text-blue" : "text-ink"
                      }`}
                    >
                      {m.year}
                    </span>
                    <h3 className="mt-3 text-lg font-bold tracking-tight text-ink leading-snug">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-sm text-secondary-text leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
