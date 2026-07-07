/*
 * [01] The Cost of Delay — Every Hour Has a Price.
 * Three impact statements as large-figure blocks with ghost watermarks and
 * growing rails (the ProblemSection idiom, in ink/blue), closed by the
 * "You are not slow. Your data is." pivot line.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";

const impacts = [
  {
    figure: "2–4 days",
    watermark: "2–4",
    title: "MIS reporting lag",
    desc: "The average time leadership teams wait for consolidated MIS reports after month-end close.",
  },
  {
    figure: "₹2 Cr+",
    watermark: "₹2Cr",
    title: "Quarterly margin loss",
    desc: "Estimated loss in a mid-size enterprise when supply chain delays go undetected for 72 hours.",
  },
  {
    figure: "3 of 5",
    watermark: "3/5",
    title: "Board decisions",
    desc: "Made on data that is at least one week old.",
  },
];

export default function EisCost() {
  return (
    <section id="cost" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[01]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;The cost of delay</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Decisions age fast</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Every hour without the right data has a price.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:mt-16">
          {impacts.map((impact, idx) => (
            <ScrollReveal key={impact.title} delay={100 + idx * 100}>
              <div className="group relative pl-7">
                <span
                  className="absolute bottom-1 left-0 top-1 w-[2.5px] origin-top rounded-full bg-blue/70"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute -left-2 top-1/2 -translate-y-1/2 select-none font-sans text-[5.5rem] font-semibold leading-none tracking-tighter text-ink/[0.04] lg:text-[6.5rem]"
                  aria-hidden
                >
                  {impact.watermark}
                </span>
                <div className="relative">
                  <div className="whitespace-nowrap text-[44px] font-semibold leading-none tracking-tighter text-ink md:text-[48px]">
                    {impact.figure}
                  </div>
                  <div className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
                    {impact.title}
                  </div>
                  <p className="mt-2.5 max-w-[24em] text-[15px] leading-relaxed text-inkSoft">
                    {impact.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200}>
          <p className="mt-14 max-w-[22em] border-t border-dashed border-lineSoft pt-8 text-[26px] font-semibold leading-snug tracking-tight text-ink md:text-[30px] lg:mt-16">
            You are not slow. Your data is.{" "}
            <span className="relative inline-block whitespace-nowrap">
              Akashic EIS fixes that.
              <span className="absolute -bottom-[0.04em] left-0 h-[0.09em] w-full rounded-full bg-blue/35" aria-hidden />
            </span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
