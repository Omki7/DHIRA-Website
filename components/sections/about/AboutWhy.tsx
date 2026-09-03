"use client";

/*
 * [01] Philosophy — The Work Starts After Launch.
 * Concise, high-impact engineering philosophy.
 * "A product is only the beginning. The real test is how it performs, evolves, and scales once people depend on it."
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

const PRINCIPLES = [
  {
    num: "01",
    title: "Production ownership",
    desc: "We stay accountable for what happens when the system meets real users and real conditions.",
  },
  {
    num: "02",
    title: "Built to evolve",
    desc: "We design for change, so products can improve without becoming harder to maintain.",
  },
  {
    num: "03",
    title: "Full client ownership",
    desc: "You retain control of your product, data, and technology without unnecessary dependency on us.",
  },
];

export default function AboutWhy() {
  return (
    <section
      id="why-we-exist"
      className="scroll-mt-24 border-t border-lineSoft bg-background pt-16 pb-20 lg:pt-20 lg:pb-28"
    >
      <ScrollRevealRail>
        {/* --- SECTION HEADER --- */}
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[01]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Philosophy</span>
            </p>
          </div>

          <div className="mt-5 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
              The work starts after launch.
            </h2>
            <p className="mt-4 text-xl font-medium leading-relaxed text-blue sm:text-2xl">
              A product is only the beginning. The real test is how it performs, evolves, and scales once people depend on it.
            </p>
          </div>
        </ScrollReveal>

        {/* --- 3 CLEAN, MINIMALIST PILLARS --- */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8">
          {PRINCIPLES.map((p, idx) => (
            <ScrollReveal key={p.num} delay={80 + idx * 40}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-subtle-stroke bg-primary-bg p-6 sm:p-7 shadow-xs transition-all duration-200 hover:border-blue-border hover:shadow-card">
                <div>
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-subtle font-mono text-xs font-bold text-blue border border-blue-border/40">
                    {p.num}
                  </span>

                  <h3 className="mt-4 text-lg font-bold tracking-tight text-ink sm:text-xl">
                    {p.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-secondary-text sm:text-[14.5px]">
                    {p.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollRevealRail>
    </section>
  );
}
