/*
 * [04] How We Work — The Way We Show Up.
 * A signed manifesto: four full-width commitment rows, each with an oversized
 * outline numeral bleeding into the left gutter, the statement as a large
 * heading, and a one-line commitment. Deliberately editorial, not a card grid.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";

const commitments = [
  {
    num: "01",
    title: "We start with listening.",
    body: "Every engagement begins with understanding your context. Your systems, your constraints, your politics.",
  },
  {
    num: "02",
    title: "We build with you, not for you.",
    body: "Your team learns the system as we build it. By the time we hand over, you are equipped, not dependent.",
  },
  {
    num: "03",
    title: "We stay until it works.",
    body: "Not until the contract ends. Until your team is confident running it.",
  },
  {
    num: "04",
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
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2 className="mt-5 text-heading-sm font-semibold leading-[1.05] tracking-tighter text-ink md:text-heading-md lg:text-heading-lg">
            The way we show up.
          </h2>
          <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-inkSoft">
            Four commitments. The same on the first day of an engagement as the last.
          </p>
        </ScrollReveal>

        <div className="mt-12 lg:mt-16">
          {commitments.map((item, idx) => (
            <ScrollReveal key={item.num} delay={100 + idx * 90}>
              <div className="group grid grid-cols-1 gap-3 border-t border-subtle-stroke py-8 last:border-b sm:grid-cols-[auto_1fr] sm:gap-10 lg:py-10">
                <div className="relative flex items-start sm:w-[128px]">
                  <span
                    className="select-none font-semibold leading-[0.8] tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgba(62,99,221,0.28)] text-[72px] transition-all duration-400 ease-settle group-hover:[-webkit-text-stroke:1.5px_rgba(62,99,221,0.55)] lg:text-[88px]"
                    aria-hidden
                  >
                    {item.num}
                  </span>
                </div>
                <div className="min-w-0 sm:pt-3">
                  <h3 className="max-w-[16em] text-[26px] font-semibold leading-[1.15] tracking-tight text-ink md:text-[32px]">
                    <span className="text-blue">{item.title.split(" ")[0]} </span>
                    {item.title.split(" ").slice(1).join(" ")}
                  </h3>
                  <p className="mt-3 max-w-[40em] text-[16px] leading-relaxed text-inkSoft">
                    {item.body}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
