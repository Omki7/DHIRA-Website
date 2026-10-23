/*
 * [00] Healthcare Hero: desktop-only clinical environment treatment.
 * Mobile intentionally falls back to the shared SectorHero because the current
 * request is desktop-only.
 */

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectorHero from "@/components/sections/sectors/SectorHero";
import { LiveChip } from "@/components/sections/akashic/AkashicCardChrome";
import type { SectorContent, SectorTemplate } from "@/content/pages/sectors";

const systems = ["HIS", "LIS", "PACS", "Pharmacy", "Claims", "Consent"];

const recordSources = [
  { system: "HIS", record: "Sharma, Rahul · IP-2041", sub: "Ward" },
  { system: "LIS", record: "R. Sharma · LAB-0088", sub: "Labs" },
  { system: "CLM", record: "RAHUL S · CLM-3391", sub: "Insurer" },
];

const recordTags = ["Full history", "Allergies surfaced", "Sources attached"];

function PatientBoard() {
  return (
    <div className="w-full max-w-[520px] overflow-hidden rounded-frame border border-card-line bg-background text-left ">
      <div className="h-[3px] bg-blue" aria-hidden />
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-secondary-text">
          <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
          Patient record · resolving
        </span>
        <LiveChip />
      </div>

      <div className="divide-y divide-line">
        {recordSources.map((row) => (
          <div key={row.system} className="flex items-center gap-3 px-4 py-2.5">
            <span className="w-[52px] shrink-0 rounded-[4px] border border-line bg-tertiary-bg px-1.5 py-0.5 text-center font-mono text-[8.5px] font-semibold uppercase tracking-[0.06em] text-secondary-text">
              {row.system}
            </span>
            <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium tracking-tight text-ink">
              {row.record}
            </span>
            <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.06em] text-inkSoft">
              {row.sub}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center border-y border-line bg-tertiary-bg py-1.5">
        <span className="flex items-center gap-1.5 font-mono text-[8.5px] font-semibold uppercase tracking-[0.1em] text-blue">
          <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
          Resolved · one patient
        </span>
      </div>

      <div className="mx-4 my-3.5 rounded-card border border-blue-border bg-blue-subtle px-3.5 py-3">
        <p className="text-[13px] font-semibold tracking-tight text-ink">
          Rahul Sharma · one record
        </p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.08em] text-inkSoft">
          Golden record · 3 registrations merged
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {recordTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-blue-border bg-background px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.06em] text-blue"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line bg-tertiary-bg px-4 py-2.5 font-mono text-[8.5px] uppercase tracking-[0.06em]">
        <span className="text-inkSoft">Consent-aware · PII masked</span>
        <span className="text-inkSoft">Every access stamped</span>
      </div>
    </div>
  );
}

const patientSignals = [
  { label: "Admission", value: "Emergency encounter linked" },
  { label: "Clinical", value: "Allergy conflict surfaced" },
  { label: "Governance", value: "Consent checked at access" },
];

export default function HealthcareHero({ content, template }: { content: SectorContent; template: SectorTemplate }) {
  const [eyebrowLead, eyebrowTail] = content.eyebrow.split(" · ");
  return (
    <div id="hero">
      <div className="lg:hidden">
        <SectorHero content={content} template={template} />
      </div>

      <section className="relative hidden overflow-hidden bg-anchor text-ink lg:block">
        
        
        
        

        <ScrollRevealRail>
          <div className="grid min-h-[calc(100vh-72px)] grid-cols-[minmax(0,0.96fr)_minmax(420px,0.9fr)] items-center gap-16 py-16">
            <div>
              <ScrollReveal>
                <figure className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-tertiary-bg px-3.5 py-1.5 text-sm text-ink  ">
                  <span className="font-semibold">{content.name}</span>
                  <span className="h-3.5 w-px bg-tertiary-bg" aria-hidden />
                  <span className="font-medium text-secondary-text">{template.badge}</span>
                </figure>
              </ScrollReveal>

              <ScrollReveal delay={80}>
                <p className="font-mono text-[11px] uppercase tracking-eyebrow text-secondary-text">
                  {eyebrowLead} <span className="text-inkSoft">·</span> {eyebrowTail}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={140}>
                <h1 className="mt-6 max-w-[9.8em] text-[66px] font-medium leading-[1.02] tracking-tightest text-ink">
                  {content.headlinePlain}{" "}
                  <span className="relative inline-block">
                    {content.headlineMarked}
                    <span className="absolute -bottom-[0.08em] left-0 h-[0.08em] w-full rounded-full bg-blue" aria-hidden />
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={220}>
                <p className="mt-7 max-w-[38em] text-lg leading-relaxed text-secondary-text">
                  {content.intro}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Link
                    href={template.primary.href}
                    className="btn-primary"
                  >
                    {template.primary.label}
                  </Link>
                  <Link
                    href={template.secondary.href}
                    className="btn-secondary "
                  >
                    {template.secondary.label}
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={260}>
              <div className="flex justify-end">
                <div className="w-full max-w-[520px]">
<div className="relative mb-4 aspect-[16/5] w-full overflow-hidden rounded-frame border border-card-line">
                    <Image src={content.image.src} alt={content.image.alt} fill priority sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
                  </div>
                  <PatientBoard />
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {patientSignals.map((signal) => (
                      <div key={signal.label} className="rounded-card border border-line bg-background px-3 py-2.5 ">
                        <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-inkSoft">
                          {signal.label}
                        </p>
                        <p className="mt-1 text-[11.5px] font-semibold leading-snug tracking-tight text-ink">
                          {signal.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={340}>
            <div className="grid gap-3 border-t border-line py-5 md:grid-cols-[auto_1fr] md:items-center">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-inkSoft">
                Clinical systems joined
              </p>
              <div className="flex flex-wrap justify-end gap-2">
                {systems.map((system) => (
                  <span
                    key={system}
                    className="rounded-full border border-line bg-background px-3 py-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.08em] text-secondary-text "
                  >
                    {system}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </ScrollRevealRail>
      </section>
    </div>
  );
}
