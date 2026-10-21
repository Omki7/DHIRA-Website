/*
 * [05] How Akashic Works for Government — The Paper Trail.
 * Not the standard chain rail: a centre-spine timeline that walks one
 * citizen record down to a policy decision. Steps alternate sides of a
 * dashed spine capped by CITIZEN RECORD and POLICY DECISION markers;
 * each step carries the Akashic module that performs it.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { PublicSectorPage } from "@/content/pages/sectors-public-sector";

type Step = PublicSectorPage["chain"]["steps"][number];

function SpineCap({ label, dark }: { label: string; dark?: boolean }) {
  return (
    <span
      className={`relative z-10 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.08em]  ${
        dark ? "border-ink bg-ink text-on-action" : "border-blue-border bg-blue-subtle text-blue"
      }`}
    >
      <span
        className={`h-[5px] w-[5px] rounded-full ${dark ? "bg-positive animate-[ps-pulse_2s_infinite]" : "bg-blue"}`}
        aria-hidden
      />
      {label}
    </span>
  );
}

function StepNode({ num }: { num: string }) {
  return (
    <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-border bg-background font-mono text-[10px] font-bold text-blue ">
      {num}
    </span>
  );
}

function StepBody({ step, alignRight }: { step: Step; alignRight?: boolean }) {
  return (
    <div className={alignRight ? "md:text-right" : ""}>
      <div className={`flex flex-wrap items-center gap-2.5 ${alignRight ? "md:justify-end" : ""}`}>
        <h3 className="font-mono text-[13px] font-bold uppercase tracking-eyebrow text-ink">
          {step.name}
        </h3>
        <span className="inline-flex items-center rounded-[6px] border border-blue-border bg-blue-subtle px-2 py-[2px] font-mono text-[8px] font-bold tracking-[0.05em] text-blue">
          {step.module}
        </span>
      </div>
      <p className="mt-2.5 max-w-[30em] text-[14.5px] leading-relaxed text-inkSoft">{step.desc}</p>
    </div>
  );
}

export default function PublicSectorChain({ content }: { content: PublicSectorPage["chain"] }) {
  const { steps } = content;
  return (
    <section id="how-it-works" className="scroll-mt-24 border-t border-lineSoft bg-background pt-12 pb-24 lg:pt-16 lg:pb-32">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[{content.eyebrow.number}]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;{content.eyebrow.label}</span>
            </p>
            <span className="hidden text-overcast sm:inline">{content.eyebrow.aside}</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            {content.title}
          </h2>
        </ScrollReveal>

        {/* Desktop: centre-spine, steps alternating sides */}
        <div className="relative mt-14 hidden md:block lg:mt-16">
          <span
            className="absolute bottom-5 left-1/2 top-5 w-px -translate-x-1/2 bg-[length:1px_16px] bg-repeat-y bg-[repeating-linear-gradient(180deg,rgb(var(--blue-border))_0_8px,transparent_8px_16px)]"
            aria-hidden
          />
          <div className="flex justify-center">
            <SpineCap label={content.start} />
          </div>
          <div className="mt-4 space-y-2">
            {steps.map((step, idx) => {
              const left = idx % 2 === 0;
              return (
                <ScrollReveal key={step.num} delay={100 + idx * 80}>
                  <div className="grid grid-cols-[1fr_56px_1fr] items-center">
                    <div className={left ? "flex justify-end pr-2" : ""}>
                      {left && <StepBody step={step} alignRight />}
                    </div>
                    <div className="flex justify-center py-4">
                      <StepNode num={step.num} />
                    </div>
                    <div className={left ? "" : "pl-2"}>
                      {!left && <StepBody step={step} />}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
          <div className="mt-4 flex justify-center">
            <SpineCap label={content.end} dark />
          </div>
        </div>

        {/* Mobile: single left rail */}
        <div className="relative mt-10 md:hidden">
          <span
            className="absolute bottom-4 left-4 top-4 w-px bg-[length:1px_16px] bg-repeat-y bg-[repeating-linear-gradient(180deg,rgb(var(--blue-border))_0_8px,transparent_8px_16px)]"
            aria-hidden
          />
          <div className="pl-0">
            <SpineCap label={content.start} />
          </div>
          <div className="mt-6 space-y-8">
            {steps.map((step) => (
              <ScrollReveal key={step.num} delay={100}>
                <div className="flex gap-5">
                  <StepNode num={step.num} />
                  <div className="min-w-0 pt-1">
                    <StepBody step={step} />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-6">
            <SpineCap label={content.end} dark />
          </div>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
