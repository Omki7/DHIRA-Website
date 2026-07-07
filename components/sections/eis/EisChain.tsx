/*
 * [03] The Intelligence Chain — Raw Data In, Decisions Out.
 * Six numbered stations on a flowing dashed rail, 3×2 on desktop (the
 * delivery-methodology idiom extended): CONNECT → UNIFY → STRUCTURE →
 * ANALYSE → PREDICT → ASK. Dash motion reuses the global ps-dash keyframe.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";

const steps = [
  {
    num: "01",
    name: "Connect",
    desc: "Plug into your existing systems. SAP, Salesforce, Oracle, SQL databases, flat files, APIs. No migration. Read-only access. Your data stays exactly where it is.",
  },
  {
    num: "02",
    name: "Unify",
    desc: "Akashic MDM creates one Golden Record per entity: one version of every customer, branch, product, and supplier. No duplicates. No conflicts.",
  },
  {
    num: "03",
    name: "Structure",
    desc: "The Akashic Data Warehouse organises unified data into fast-query models, ready for real-time analysis at any scale.",
  },
  {
    num: "04",
    name: "Analyse",
    desc: "Akashic BI dashboards surface live KPIs, trends, and exceptions. Role-based views: what the CEO sees is different from what the branch manager sees.",
  },
  {
    num: "05",
    name: "Predict",
    desc: "Akashic ML models score risk, forecast revenue, and flag early signals. Confidence intervals included. Not just what happened: what is likely to happen next.",
  },
  {
    num: "06",
    name: "Ask",
    desc: "Ask Akashic anything in plain language. “What drove the revenue drop in APAC last quarter?” It answers. In English. With a chart. No SQL needed.",
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

export default function EisChain() {
  return (
    <section id="how-eis-works" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[03]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;The intelligence chain</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Six moves, one platform</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Raw data in. Decisions out.
          </h2>
          <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-secondary-text">
            Here is what happens in between, on the same governed Akashic modules
            that run every DHIRA deployment.
          </p>
        </ScrollReveal>

        {/* Desktop: two flowing rows of three */}
        <div className="mt-12 hidden gap-y-14 md:grid md:grid-cols-3 lg:mt-16">
          {steps.map((step, idx) => (
            <ScrollReveal key={step.num} delay={100 + idx * 80}>
              <div className="relative">
                <span
                  className="pointer-events-none absolute -top-3 right-6 select-none text-[64px] font-semibold leading-none tracking-tighter text-ink/[0.04]"
                  aria-hidden
                >
                  {step.num}
                </span>
                <div className="flex items-center">
                  <RailNode num={step.num} last={idx === steps.length - 1} />
                  {idx !== 2 && idx !== steps.length - 1 && <FlowSegment />}
                </div>
                <div className={idx !== 2 && idx !== steps.length - 1 ? "pr-10" : "pr-2"}>
                  <h3 className="mt-4 font-mono text-[13px] font-bold uppercase tracking-eyebrow text-ink">
                    {step.name}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-inkSoft">{step.desc}</p>
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
              <ScrollReveal key={step.num} delay={100 + idx * 80}>
                <div className="flex gap-5">
                  <RailNode num={step.num} last={idx === steps.length - 1} />
                  <div className="min-w-0 pt-1">
                    <h3 className="font-mono text-[13px] font-bold uppercase tracking-eyebrow text-ink">
                      {step.name}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-inkSoft">{step.desc}</p>
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
