/*
 * [04] How We Work — The Way We Show Up.
 * Four field-manual cards in a 2×2, each with a corner index and a one-line
 * commitment; deliberately quieter chrome than [03]'s constitution ledger.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";

const commitments = [
  {
    num: "01",
    icon: "Customer Stories",
    title: "We start with listening.",
    body: "Every engagement begins with understanding your context. Your systems, your constraints, your politics.",
  },
  {
    num: "02",
    icon: "Akashic Workflow",
    title: "We build with you, not for you.",
    body: "Your team learns the system as we build it. By the time we hand over, you are equipped, not dependent.",
  },
  {
    num: "03",
    icon: "Akashic Insights",
    title: "We stay until it works.",
    body: "Not until the contract ends. Until your team is confident running it.",
  },
  {
    num: "04",
    icon: "About Us",
    title: "We tell the truth.",
    body: "If Akashic is not the right fit, we say so. We would rather earn your trust than close a deal.",
  },
];

export default function AboutHow() {
  return (
    <section id="how-we-work" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[04]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;How we work</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ The way we show up</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md">
            The way we show up.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-14">
          {commitments.map((item, idx) => (
            <ScrollReveal key={item.num} delay={100 + idx * 90}>
              <div className="group relative h-full overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg p-6 transition-all duration-250 ease-settle hover:-translate-y-1 hover:border-blue/25 hover:shadow-frame md:p-7">
                <span className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.1em] text-overcast">
                  {item.num} / 04
                </span>
                <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border border-blue/20 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition-colors duration-250 ease-settle group-hover:border-blue/35">
                  <DynamicSketchIcon text={item.icon} className="h-[16px] w-[16px] text-blue" />
                </span>
                <h3 className="mt-5 text-[21px] font-semibold leading-snug tracking-tight text-ink">
                  {item.title}
                </h3>
                <div className="mt-2.5 mb-3 w-8 border-t border-blue/40 transition-[width] duration-250 ease-settle group-hover:w-12" aria-hidden />
                <p className="max-w-[34em] text-[15px] leading-relaxed text-inkSoft">{item.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
