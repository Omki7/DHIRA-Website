/*
 * [05] Enterprise Trust — Built to Be Audited.
 * The card bodies are SIMULATED PRODUCT UI (AGENTS.md §8a): canned role
 * tables, lineage traces, audit log lines, and residency chrome.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { CARD, CardHeader, CardDesc, LiveChip, BlueChip } from "@/components/sections/akashic/AkashicCardChrome";

function AccessBody() {
  const roles = [
    { role: "Analyst", scope: "read" },
    { role: "District lead", scope: "read · write" },
    { role: "Auditor", scope: "read-only" },
  ];
  return (
    <div className="flex flex-1 flex-col gap-1.5 p-3.5">
      {roles.map((r) => (
        <div key={r.role} className="flex items-center justify-between gap-2 rounded-[10px] border border-[#EEEEF3] bg-[#FBFBFE] px-3 py-2">
          <span className="text-[11.5px] font-semibold text-ink">{r.role}</span>
          <span className="font-mono text-[9.5px] text-[#7C828C]">{r.scope}</span>
        </div>
      ))}
      <div className="mt-auto flex items-center gap-2 rounded-[9px] border border-blue-border bg-blue-subtle px-3 py-2">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
        <span className="text-[11px] font-semibold text-blue">Checked at every layer, not once</span>
      </div>
    </div>
  );
}

function LineageBody() {
  return (
    <div className="flex flex-1 flex-col gap-2 p-3.5">
      <div className="rounded-[10px] border border-subtle-stroke bg-primary-bg px-3.5 py-2.5 font-mono text-[10.5px] leading-relaxed text-inkSoft">
        <span className="text-overcast">metric:</span>&nbsp;Q3 revenue · &#8377;38Cr
        <br />
        <span className="text-overcast">from:</span>&nbsp;erp.orders · crm.pipeline
        <br />
        <span className="text-overcast">via:</span>&nbsp;normalise &rarr; dedupe &rarr; aggregate
        <span className="ml-0.5 font-bold text-blue animate-[ps-caret-blink_1s_step-end_infinite]">|</span>
      </div>
      <div className="mt-auto flex items-center gap-2 rounded-[9px] border border-blue-border bg-blue-subtle px-3 py-2">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
        <span className="text-[11px] font-semibold text-blue">Every number, back to its source</span>
      </div>
    </div>
  );
}

function AuditBody() {
  const lines = [
    { t: "09:41:07", e: "asha.r viewed District 7 brief" },
    { t: "09:38:12", e: "forecast model refreshed" },
    { t: "09:21:45", e: "auditor granted read-only" },
  ];
  return (
    <div className="flex flex-1 flex-col gap-2 p-3.5">
      <div className="flex flex-col gap-1.5 rounded-[10px] border border-subtle-stroke bg-primary-bg px-3.5 py-2.5">
        {lines.map((l) => (
          <div key={l.t} className="flex items-baseline gap-2.5 font-mono text-[10px]">
            <span className="shrink-0 text-overcast">{l.t}</span>
            <span className="truncate text-inkSoft">{l.e}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-2 rounded-[9px] border border-[#CBEFDF] bg-[#EBF8F3] px-3 py-2">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#30A46C] animate-[ps-pulse_2s_infinite]" />
        <span className="text-[11px] font-bold text-[#1B7A47]">Who, what, and when. Always on</span>
      </div>
    </div>
  );
}

function ResidencyBody() {
  return (
    <div className="flex flex-1 flex-col gap-2 p-3.5">
      <div className="rounded-[12px] border-[1.5px] border-dashed border-line bg-primary-bg px-3 py-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8.5px] font-bold tracking-[0.07em] text-[#7C828C]">JURISDICTION: YOURS</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {["Stored in-region", "Processed in-region", "Answered in-region"].map((item) => (
            <span key={item} className="rounded-[7px] border border-[#EEEEF3] bg-white px-2 py-1 text-[10px] font-medium text-inkSoft">
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-auto flex items-center gap-2 rounded-[9px] border border-[#CBEFDF] bg-[#EBF8F3] px-3 py-2">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#30A46C]" />
        <span className="text-[11px] font-bold text-[#1B7A47]">Nothing crosses the border</span>
      </div>
    </div>
  );
}

export default function AkashicTrust() {
  return (
    <section id="trust" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-overcast">[05]</span>
            <span className="text-inkSoft">&nbsp;&nbsp;Enterprise trust</span>
          </p>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            An answer you can&rsquo;t trace is just an opinion.
          </h2>
          <p className="mt-5 max-w-[32em] text-lg leading-relaxed text-secondary-text">
            Every layer of Akashic is built to be checked, not just believed.
          </p>
        </ScrollReveal>

        <div className="mx-auto mt-14 grid max-w-[900px] gap-4 md:grid-cols-2 md:gap-5 lg:mt-16">
          <ScrollReveal>
            <div className={`${CARD} h-full`}>
              <CardHeader icon="Access Control" name="Access control" sub="Role-based, layer by layer" chip={<BlueChip label="ENFORCED" />} />
              <CardDesc text="Role-based permissions, enforced at every layer, not just at the login screen." />
              <AccessBody />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={90}>
            <div className={`${CARD} h-full`}>
              <CardHeader icon="Lineage" name="Lineage" sub="Source to answer" chip={<BlueChip label="TRACED" />} />
              <CardDesc text="Every number traces back to its source: the systems it came from, the transformations it passed through." />
              <LineageBody />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={90}>
            <div className={`${CARD} h-full`}>
              <CardHeader icon="Audit Trails" name="Audit trails" sub="Complete and timestamped" chip={<LiveChip label="RECORDING" />} />
              <CardDesc text="A complete, timestamped record of who accessed what, and when." />
              <AuditBody />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={180}>
            <div className={`${CARD} h-full`}>
              <CardHeader icon="Data Residency" name="Data residency" sub="Your jurisdiction" chip={<BlueChip label="IN-REGION" />} />
              <CardDesc text="Deploy so your data never leaves the jurisdiction it needs to stay in." />
              <ResidencyBody />
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="mt-16 flex flex-col items-center text-center lg:mt-20">
            <p className="max-w-[22em] text-2xl font-semibold leading-snug tracking-tight text-ink md:text-[28px]">
              This is what makes an answer defensible, not just delivered.
            </p>
            <Link href="#talk-to-our-team" className="btn-primary mt-8">
              Talk to our team
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
