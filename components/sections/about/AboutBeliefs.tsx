/*
 * [03] What We Believe — The Things That Do Not Change.
 * A constitution ledger: sticky section header on the left, five indexed
 * principles (B-01…B-05) as full rows on the right. Hovering a row dims
 * the others (CSS group hover only — stays a server component).
 */

import ScrollReveal from "@/components/ui/ScrollReveal";

const beliefs = [
  {
    num: "B-01",
    title: "Build for the long term.",
    body: "If it cannot be maintained by someone who was not in the room when it was designed, we did it wrong.",
  },
  {
    num: "B-02",
    title: "Trust is architectural.",
    body: "Governance is the floor everything stands on. Not a feature added later.",
  },
  {
    num: "B-03",
    title: "Open is better than locked.",
    body: "We build on technologies your team already knows. Inspectable. Swappable. No permission required.",
  },
  {
    num: "B-04",
    title: "Your data is yours.",
    body: "We do not hold your keys. We do not mine your patterns. When we leave, you own everything.",
  },
  {
    num: "B-05",
    title: "Accountability over activity.",
    body: "We measure by outcomes, not hours. By whether your team trusts the answer.",
  },
];

export default function AboutBeliefs() {
  return (
    <section id="what-we-believe" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.8fr] lg:gap-16">
          <div>
            <div className="lg:sticky lg:top-32">
              <ScrollReveal>
                <p className="font-mono text-[11px] uppercase tracking-eyebrow">
                  <span className="text-overcast">[03]</span>
                  <span className="text-inkSoft">&nbsp;&nbsp;What we believe</span>
                </p>
                <h2 className="mt-5 max-w-[10em] text-heading-sm font-semibold text-ink md:text-heading-md">
                  The things that do not change.
                </h2>
                <p className="mt-5 max-w-[24em] text-lg leading-relaxed text-secondary-text">
                  Five principles. Every engagement is held against them.
                </p>
              </ScrollReveal>
            </div>
          </div>

          <div className="group/beliefs">
            {beliefs.map((belief, idx) => (
              <ScrollReveal key={belief.num} delay={100 + idx * 80}>
                <div className="relative border-t border-subtle-stroke py-7 transition-opacity duration-300 ease-settle hover:!opacity-100 group-hover/beliefs:opacity-50 lg:py-8">
                  <span
                    className="pointer-events-none absolute right-0 top-6 select-none text-[64px] font-semibold leading-none tracking-tighter text-ink/[0.04]"
                    aria-hidden
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
                    <span className="whitespace-nowrap pt-[6px] font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-blue sm:w-14">
                      {belief.num}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[24px] font-semibold leading-snug tracking-tight text-ink md:text-[27px]">
                        {belief.title}
                      </h3>
                      <p className="mt-2.5 max-w-[36em] text-[15.5px] leading-relaxed text-inkSoft">
                        {belief.body}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
            <div className="border-t border-subtle-stroke" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
