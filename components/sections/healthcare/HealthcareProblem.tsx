/*
 * [01] Healthcare Problem: desktop-only clinical record fracture treatment.
 * Below lg it shows the scenario and fractures without the panel.
 */

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { HealthcarePanel, SectorContent, SectorTemplate } from "@/content/pages/sectors";



function PatientFracturePanel({ panel }: { panel: HealthcarePanel }) {
  const { fragments: recordFragments, checks: careChecks } = panel;
  return (
    <div className="mt-10 grid overflow-hidden rounded-frame border border-subtle-stroke bg-background  lg:grid-cols-[0.95fr_1.05fr]">
      <div className="relative min-h-[430px] overflow-hidden bg-anchor">
        <Image
          src={panel.image.src}
          alt={panel.image.alt}
          fill
          sizes="48vw"
          className="object-cover"
        />
        
        <div className="absolute left-6 top-6 rounded-full border border-line bg-tertiary-bg px-3 py-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.08em] text-secondary-text ">
          {panel.chip}
        </div>
        <div className="absolute bottom-6 left-6 right-6 rounded-frame border border-line bg-background p-4 ">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-blue">
            {panel.kicker}
          </p>
          <p className="mt-2 text-[20px] font-semibold leading-snug tracking-tight text-ink">
            {panel.title}
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-secondary-text">
            {panel.body}
          </p>
        </div>
      </div>

      <div className="bg-primary-bg p-7">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-overcast">
          {panel.label}
        </p>
        <div className="mt-5 overflow-hidden rounded-frame border border-subtle-stroke bg-background">
          {recordFragments.map((fragment, idx) => (
            <div
              key={fragment.system}
              className={`grid grid-cols-[58px_1fr_auto] items-center gap-3 px-4 py-3 ${
                idx > 0 ? "border-t border-dashed border-lineSoft" : ""
              }`}
            >
              <span className="rounded-[4px] border border-subtle-stroke bg-primary-bg px-1.5 py-0.5 text-center font-mono text-[8.5px] font-semibold uppercase tracking-[0.06em] text-inkSoft">
                {fragment.system}
              </span>
              <span className="min-w-0 truncate text-[13px] font-semibold tracking-tight text-ink">
                {fragment.record}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-overcast">
                {fragment.detail}
              </span>
            </div>
          ))}
          <div className="border-y border-dashed border-lineSoft bg-blue-subtle px-4 py-2">
            <p className="flex items-center gap-1.5 font-mono text-[8.5px] font-semibold uppercase tracking-[0.1em] text-blue">
              <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
              {panel.resolved}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 p-4">
            {careChecks.map((check) => (
              <div key={check} className="rounded-card border border-blue-border bg-blue-subtle px-3 py-2">
                <p className="text-[12px] font-semibold leading-snug tracking-tight text-ink">
                  {check}
                </p>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.08em] text-overcast">
          {panel.footer}
        </p>
      </div>
    </div>
  );
}

export default function HealthcareProblem({ content, template }: { content: SectorContent; template: SectorTemplate["problem"] }) {
  const { problem } = content;

  return (
    <section id="problem" className="scroll-mt-24 overflow-hidden bg-background">
      <div className="pt-10 pb-16 lg:hidden">
        <ScrollRevealRail>
          <ScrollReveal>
            <div className="mb-10 flex items-center justify-between border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
              <span>
                <span className="text-overcast">[{template.eyebrow.number}]</span>
                &nbsp;&nbsp;{template.eyebrow.label}
              </span>
              <span className="text-overcast">/ {problem.label.toUpperCase()}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h2 className="text-heading-sm font-medium text-ink md:text-heading-md lg:text-heading-lg">
              {problem.title}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <div className="relative mt-10 overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg px-6 py-7 md:px-10 md:py-8">
              <div className="absolute inset-y-0 left-0 w-[3px] bg-red/60" aria-hidden />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-overcast">
                {template.scenarioLabel}
              </p>
              <p className="mt-3.5 max-w-[52em] text-[17px] leading-relaxed text-inkSoft md:text-lg">
                {problem.scenario}
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 gap-y-10 border-t border-lineSoft pt-10 md:grid-cols-3 md:gap-x-10 md:gap-y-0">
            {problem.fractures.map((fracture, idx) => (
              <ScrollReveal key={fracture.title} delay={idx * 90}>
                <div className={idx > 0 ? "md:border-l md:border-dashed md:border-lineSoft md:pl-10" : ""}>
                  <p className="text-[44px] font-semibold leading-none tabular-nums tracking-tighter text-overcast">
                    {idx + 1}
                  </p>
                  <h3 className="mt-4 text-[19px] font-semibold leading-snug tracking-tight text-ink md:text-[20px]">
                    {fracture.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-inkSoft">
                    {fracture.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={120}>
            <p className="mt-12 border-t border-dashed border-lineSoft pt-6 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
              {template.footer}
            </p>
          </ScrollReveal>
        </ScrollRevealRail>
      </div>

      <div className="hidden pt-14 pb-20 lg:block">
        <ScrollRevealRail>
          <ScrollReveal>
            <div className="mb-10 flex items-center justify-between border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
              <span>
                <span className="text-overcast">[{template.eyebrow.number}]</span>
                &nbsp;&nbsp;{template.eyebrow.label}
              </span>
              <span className="text-overcast">/ {problem.label.toUpperCase()}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h2 className="max-w-[13em] text-heading-lg font-medium text-ink">
              {problem.title}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <p className="mt-6 max-w-[46em] text-lg leading-relaxed text-inkSoft">
              {problem.scenario}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={220}>
            {problem.panel && <PatientFracturePanel panel={problem.panel} />}
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-3 gap-x-10 border-t border-lineSoft pt-10">
            {problem.fractures.map((fracture, idx) => (
              <ScrollReveal key={fracture.title} delay={idx * 90}>
                <div className={idx > 0 ? "border-l border-dashed border-lineSoft pl-10" : ""}>
                  <p className="text-[44px] font-semibold leading-none tabular-nums tracking-tighter text-overcast">
                    {idx + 1}
                  </p>
                  <h3 className="mt-4 text-[20px] font-semibold leading-snug tracking-tight text-ink">
                    {fracture.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-inkSoft">
                    {fracture.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={120}>
            <p className="mt-12 border-t border-dashed border-lineSoft pt-6 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
              {template.footer}
            </p>
          </ScrollReveal>
        </ScrollRevealRail>
      </div>
    </section>
  );
}
