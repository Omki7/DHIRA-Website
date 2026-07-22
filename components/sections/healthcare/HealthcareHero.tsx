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
import type { SectorContent } from "@/components/sections/sectors/sectorContent";

const systems = ["HIS", "LIS", "PACS", "Pharmacy", "Claims", "Consent"];

const recordSources = [
  { system: "HIS", record: "Sharma, Rahul · IP-2041", sub: "Ward" },
  { system: "LIS", record: "R. Sharma · LAB-0088", sub: "Labs" },
  { system: "CLM", record: "RAHUL S · CLM-3391", sub: "Insurer" },
];

const recordTags = ["Full history", "Allergies surfaced", "Sources attached"];

function PatientBoard() {
  return (
    <div className="w-full max-w-[520px] overflow-hidden rounded-frame border border-white/[0.14] bg-[rgba(14,16,20,0.55)] text-left shadow-[0_30px_90px_-30px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
      <div className="h-[3px] bg-gradient-to-r from-blue/70 via-blue/30 to-transparent" aria-hidden />
      <div className="flex items-center justify-between border-b border-white/[0.1] px-4 py-3">
        <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-white/70">
          <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
          Patient record · resolving
        </span>
        <LiveChip />
      </div>

      <div className="divide-y divide-white/[0.08]">
        {recordSources.map((row) => (
          <div key={row.system} className="flex items-center gap-3 px-4 py-2.5">
            <span className="w-[52px] shrink-0 rounded-[4px] border border-white/[0.16] bg-white/[0.06] px-1.5 py-0.5 text-center font-mono text-[8.5px] font-semibold uppercase tracking-[0.06em] text-white/70">
              {row.system}
            </span>
            <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium tracking-tight text-white/90">
              {row.record}
            </span>
            <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.06em] text-white/45">
              {row.sub}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center border-y border-white/[0.1] bg-white/[0.03] py-1.5">
        <span className="flex items-center gap-1.5 font-mono text-[8.5px] font-semibold uppercase tracking-[0.1em] text-blue-subtle">
          <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
          Resolved · one patient
        </span>
      </div>

      <div className="mx-4 my-3.5 rounded-card border border-blue/40 bg-blue/[0.16] px-3.5 py-3">
        <p className="text-[13px] font-semibold tracking-tight text-white">
          Rahul Sharma · one record
        </p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.08em] text-white/55">
          Golden record · 3 registrations merged
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {recordTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-blue/40 bg-white/[0.06] px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.06em] text-blue-subtle"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.03] px-4 py-2.5 font-mono text-[8.5px] uppercase tracking-[0.06em]">
        <span className="text-white/50">Consent-aware · PII masked</span>
        <span className="text-white/35">Every access stamped</span>
      </div>
    </div>
  );
}

const patientSignals = [
  { label: "Admission", value: "Emergency encounter linked" },
  { label: "Clinical", value: "Allergy conflict surfaced" },
  { label: "Governance", value: "Consent checked at access" },
];

export default function HealthcareHero({ content }: { content: SectorContent }) {
  return (
    <>
      <div className="lg:hidden">
        <SectorHero content={content} />
      </div>

      <section className="relative hidden overflow-hidden bg-ink text-white lg:block">
        <Image
          src="/sectors/healthcare-hq.jpg"
          alt="Modern clinical procedure room with surgical lights, monitors, and medical equipment"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,12,0.92)_0%,rgba(10,10,12,0.76)_43%,rgba(10,10,12,0.34)_100%)]" aria-hidden />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,12,0.08)_0%,rgba(10,10,12,0.22)_58%,rgba(10,10,12,0.82)_100%)]" aria-hidden />
        <div className="dot-grid absolute inset-0 opacity-[0.07] invert" aria-hidden />

        <ScrollRevealRail dark>
          <div className="grid min-h-[calc(100vh-72px)] grid-cols-[minmax(0,0.96fr)_minmax(420px,0.9fr)] items-center gap-16 py-16">
            <div>
              <ScrollReveal>
                <figure className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.12] px-3.5 py-1.5 text-sm text-white shadow-sm backdrop-blur-md">
                  <span className="font-semibold">Healthcare</span>
                  <span className="h-3.5 w-px bg-white/[0.24]" aria-hidden />
                  <span className="font-medium text-white/[0.72]">Akashic by sector</span>
                </figure>
              </ScrollReveal>

              <ScrollReveal delay={80}>
                <p className="font-mono text-[11px] uppercase tracking-eyebrow text-white/[0.62]">
                  Akashic for healthcare <span className="text-white/[0.35]">·</span> Hospitals &amp; health systems
                </p>
              </ScrollReveal>

              <ScrollReveal delay={140}>
                <h1 className="mt-6 max-w-[9.8em] text-[66px] font-semibold leading-[1.02] tracking-tightest text-white">
                  Every patient deserves one record.{" "}
                  <span className="relative inline-block">
                    Not seven.
                    <span className="absolute -bottom-[0.08em] left-0 h-[0.08em] w-full rounded-full bg-blue/80" aria-hidden />
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={220}>
                <p className="mt-7 max-w-[38em] text-lg leading-relaxed text-white/[0.72]">
                  Admissions, labs, imaging, claims, and paper registers each
                  hold a fragment of the patient. Akashic resolves them into one
                  governed longitudinal record, with consent and audit built
                  into the platform.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Link
                    href="#solution"
                    className="btn-primary-invert"
                  >
                    See how Akashic tackles it
                  </Link>
                  <Link
                    href="#talk-to-our-team"
                    className="btn-secondary-invert backdrop-blur-md"
                  >
                    Talk to our team
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={260}>
              <div className="flex justify-end">
                <div className="w-full max-w-[520px]">
                  <PatientBoard />
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {patientSignals.map((signal) => (
                      <div key={signal.label} className="rounded-card border border-white/[0.16] bg-black/[0.28] px-3 py-2.5 backdrop-blur-md">
                        <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-white/[0.52]">
                          {signal.label}
                        </p>
                        <p className="mt-1 text-[11.5px] font-semibold leading-snug tracking-tight text-white">
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
            <div className="grid gap-3 border-t border-white/[0.15] py-5 md:grid-cols-[auto_1fr] md:items-center">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-white/[0.55]">
                Clinical systems joined
              </p>
              <div className="flex flex-wrap justify-end gap-2">
                {systems.map((system) => (
                  <span
                    key={system}
                    className="rounded-full border border-white/[0.18] bg-white/10 px-3 py-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.08em] text-white/80 backdrop-blur-md"
                  >
                    {system}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </ScrollRevealRail>
      </section>
    </>
  );
}
