/*
 * [05] Methodology — One Process, No Hand-offs.
 * Four numbered stations on one unbroken, flowing dashed line (the visual
 * argument for "no hand-offs"): horizontal rail on desktop, vertical left
 * rail on mobile. Dash motion reuses the global ps-dash keyframe.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";

const steps = [
  {
    num: "01",
    name: "Discover",
    desc: "Map your current state, blockers, and the gap between investment and outcome. Zero\u00a0assumptions.",
  },
  {
    num: "02",
    name: "Design",
    desc: "Architect the Sovereign Blueprint, timeline, and exact team configuration required.",
  },
  {
    num: "03",
    name: "Deliver",
    desc: "Execute engineering sprints or platform deployments. Governed, documented, and\u00a0traceable.",
  },
  {
    num: "04",
    name: "Transfer",
    desc: "You own the outcome. We\u00a0document lineage, train your team, and step back, or stay on as an accountable partner.",
  },
];

function RailNode({ num, last }: { num: string; last?: boolean }) {
  return (
    <span
      className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-white font-mono text-[10px] font-bold shadow-card ${
        last ? "border-blue bg-blue-subtle text-blue" : "border-blue-border text-blue"
      }`}
    >
      {num}
      {last && (
        <span className="absolute inset-0 rounded-full border border-blue/40 animate-[ps-ring_2.4s_ease-out_infinite]" aria-hidden />
      )}
    </span>
  );
}

function FlowSegment() {
  return (
    <span
      className="h-px flex-1 bg-[length:16px_1px] bg-repeat-x bg-[repeating-linear-gradient(90deg,#C8D2F5_0_8px,transparent_8px_16px)] animate-[ps-dash_1.4s_linear_infinite]"
      aria-hidden
    />
  );
}

export default function DeliveryMethodology() {
  return (
    <section id="methodology" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[05]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Methodology</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ One unbroken line</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            One process. Three models. No hand-offs.
          </h2>
        </ScrollReveal>

        {/* Desktop: one continuous horizontal rail */}
        <div className="mt-12 hidden md:grid md:grid-cols-4 lg:mt-16">
          {steps.map((step, idx) => (
            <ScrollReveal key={step.num} delay={100 + idx * 90}>
              <div className="relative">
                <span
                  className="pointer-events-none absolute -top-2 right-6 select-none text-[72px] font-semibold leading-none tracking-tighter text-ink/[0.04]"
                  aria-hidden
                >
                  {step.num}
                </span>
                <div className="flex items-center">
                  <RailNode num={step.num} last={idx === steps.length - 1} />
                  {idx < steps.length - 1 && <FlowSegment />}
                </div>
                <div className={idx < steps.length - 1 ? "pr-10" : ""}>
                  <h3 className="mt-5 text-[22px] font-semibold tracking-tight text-ink">
                    {step.name}
                  </h3>
                  <div className="mt-2.5 mb-3 w-8 border-t border-blue/40" aria-hidden />
                  <p className="text-[15px] leading-relaxed text-inkSoft">{step.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile: one continuous vertical rail */}
        <div className="relative mt-10 md:hidden">
          <span
            className="absolute bottom-4 left-4 top-4 w-px bg-[length:1px_16px] bg-repeat-y bg-[repeating-linear-gradient(180deg,#C8D2F5_0_8px,transparent_8px_16px)]"
            aria-hidden
          />
          <div className="space-y-9">
            {steps.map((step, idx) => (
              <ScrollReveal key={step.num} delay={100 + idx * 90}>
                <div className="flex gap-5">
                  <RailNode num={step.num} last={idx === steps.length - 1} />
                  <div className="min-w-0 pt-1">
                    <h3 className="text-[20px] font-semibold tracking-tight text-ink">{step.name}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-inkSoft">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={200}>
          <p className="mt-12 border-t border-dashed border-lineSoft pt-5 font-mono text-[10px] uppercase tracking-eyebrow text-overcast lg:mt-14">
            The same four moves govern every model &middot; platform, product, or advisory
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
