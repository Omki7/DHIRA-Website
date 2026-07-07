/*
 * [02] How We Work — The Principles Are Written Down.
 * Careers-lens digest of the About page's five beliefs: sticky narrative
 * left, compact indexed ledger right, closing with a cross-link to the full
 * constitution at /about#what-we-believe.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

const principles = [
  {
    num: "B-01",
    title: "Build for the long term.",
    line: "If it cannot be maintained by someone who was not in the room, we did it wrong.",
  },
  {
    num: "B-02",
    title: "Trust is architectural.",
    line: "Governance is the floor everything stands on. Not a feature added later.",
  },
  {
    num: "B-03",
    title: "Open is better than locked.",
    line: "Technologies your team already knows. Inspectable. Swappable.",
  },
  {
    num: "B-04",
    title: "Your data is yours.",
    line: "We do not hold keys. We do not mine patterns. Clients own everything.",
  },
  {
    num: "B-05",
    title: "Accountability over activity.",
    line: "We measure by outcomes, not hours. By whether the answer is trusted.",
  },
];

export default function CareersPrinciples() {
  return (
    <section id="how-we-work" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div className="self-start lg:sticky lg:top-32">
            <ScrollReveal>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow">
                <span className="text-overcast">[02]</span>
                <span className="text-inkSoft">&nbsp;&nbsp;How we work</span>
              </p>
              <h2 className="mt-5 text-heading-sm font-semibold leading-[1.05] tracking-tighter text-ink md:text-heading-md">
                The principles are written down.
              </h2>
              <p className="mt-6 max-w-[26em] text-lg leading-relaxed text-inkSoft">
                Every engagement, and every hire, is held against five principles.
                You will know exactly what you are signing up for, because we
                published it.
              </p>
              <div className="mt-8">
                <Link href="/about#what-we-believe" className="btn-secondary">
                  Read the full principles
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="group/principles">
            {principles.map((principle, idx) => (
              <ScrollReveal key={principle.num} delay={100 + idx * 70}>
                <div className="flex flex-col gap-1.5 border-t border-subtle-stroke py-5 transition-opacity duration-300 ease-settle last:border-b hover:!opacity-100 group-hover/principles:opacity-50 sm:flex-row sm:items-baseline sm:gap-8 lg:py-6">
                  <span className="w-12 shrink-0 whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-blue">
                    {principle.num}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[19px] font-semibold leading-snug tracking-tight text-ink md:text-[21px]">
                      {principle.title}
                    </h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-inkSoft">{principle.line}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
