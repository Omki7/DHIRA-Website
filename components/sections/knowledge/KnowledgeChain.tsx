/*
 * [06] How It's Built — Raw Content to a Living Curriculum.
 * Six numbered stations on the flowing dashed rail (the EIS-chain sibling):
 * INGEST → UNIFY → PERSONALISE → TRANSLATE → VISUALISE → ACT.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";

const steps = [
  {
    num: "01",
    name: "Ingest",
    desc: "Akashic Data Pipeline connects to LMS, SIS, content repositories, and IoT classroom devices: ingesting structured and unstructured content alike, including PDFs, video, and slides.",
  },
  {
    num: "02",
    name: "Unify",
    desc: "Akashic MDM creates one Golden Record per learner, following them from enrolment through course completion, across every school, grade, and subject.",
  },
  {
    num: "03",
    name: "Personalise",
    desc: "Akashic ML scores engagement and risk per learner, in real time, and adapts content pace and difficulty: the engine behind the Adaptive Grid.",
  },
  {
    num: "04",
    name: "Translate",
    desc: "Akashic AI's multilingual NLP layer converts content across regional languages instantly, removing language as a barrier to access.",
  },
  {
    num: "05",
    name: "Visualise",
    desc: "Akashic BI gives administrators, principals, and teachers role-based live dashboards: national, state, district, and classroom level.",
  },
  {
    num: "06",
    name: "Act",
    desc: "Akashic Workflow automates alerts, remedial content assignment, and escalations, so a struggling student is flagged and supported the same day, not the same term.",
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

export default function KnowledgeChain() {
  return (
    <section id="how-its-built" className="scroll-mt-24 border-t border-lineSoft bg-background">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[06]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;How Akashic Knowledge is built</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Six moves, one platform</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            From raw content to a living curriculum.
          </h2>
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
