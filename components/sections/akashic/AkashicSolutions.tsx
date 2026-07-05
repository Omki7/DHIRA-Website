/*
 * [07] Built on Akashic — Purpose-Built for What You Run.
 * The card bodies are SIMULATED PRODUCT UI (AGENTS.md §8a): canned KPI
 * tiles, stream merges, and document rows.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AkashicLogo from "@/components/icons/AkashicLogo";
import { CARD, CardHeader, CardDesc, BlueChip } from "@/components/sections/akashic/AkashicCardChrome";

function EISBody() {
  const tiles = [
    { label: "ON TARGET", value: "7 of 9", tone: "#1B7A47" },
    { label: "AT RISK", value: "2 regions", tone: "#C0883A" },
    { label: "REVENUE", value: "84% plan", tone: "#1A1C1D" },
    { label: "DECISIONS DUE", value: "3 today", tone: "#3E63DD" },
  ];
  return (
    <div className="flex flex-1 flex-col p-3.5">
      <div className="grid grid-cols-2 gap-1.5">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-[10px] border border-[#EEEEF3] bg-[#FBFBFE] px-2.5 py-2">
            <div className="font-mono text-[8px] font-bold tracking-[0.07em] text-[#7C828C]">{t.label}</div>
            <div className="mt-0.5 text-[13px] font-bold" style={{ color: t.tone }}>{t.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LifeBody() {
  return (
    <div className="flex flex-1 flex-col p-3.5">
      <div className="flex flex-wrap justify-center gap-1.5">
        {["Clinical", "Regulatory", "Commercial"].map((s) => (
          <span key={s} className="rounded-[7px] border border-[#EEEEF3] bg-[#FBFBFE] px-2 py-1 text-[10px] font-medium text-inkSoft">
            {s}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 py-1.5" aria-hidden>
        <div className="h-px flex-1 bg-[#EAEAEF]" />
        <span className="text-[10px] font-semibold text-[#6E7178]">unified</span>
        <div className="h-px flex-1 bg-[#EAEAEF]" />
      </div>
      <div className="rounded-[10px] border-[1.5px] border-blue bg-gradient-to-b from-[#F6F8FF] to-white px-3 py-2 text-center shadow-[0_6px_18px_rgba(62,99,221,0.08)]">
        <span className="text-[11px] font-bold text-blue">One record per study, site, and product</span>
      </div>
    </div>
  );
}

function KnowledgeBody() {
  const docs = [
    { name: "Procurement_policy.pdf", tag: "policy" },
    { name: "Vendor_MSA_2025.docx", tag: "contract" },
  ];
  return (
    <div className="flex flex-1 flex-col gap-1.5 p-3.5">
      {docs.map((d) => (
        <div key={d.name} className="flex items-center justify-between gap-2 rounded-[10px] border border-[#EEEEF3] bg-[#FBFBFE] px-3 py-2">
          <span className="truncate font-mono text-[9.5px] text-ink">{d.name}</span>
          <span className="shrink-0 rounded-[4px] bg-[#F1F2F4] px-1.5 py-0.5 font-mono text-[8.5px] text-[#7C828C]">{d.tag}</span>
        </div>
      ))}
      <div className="rounded-[10px] border border-blue-border bg-blue-subtle/60 px-3 py-2">
        <span className="text-[11px] leading-relaxed text-ink">
          &ldquo;What does the exit clause say?&rdquo;
          <span className="ml-0.5 font-bold text-blue animate-[ps-caret-blink_1s_step-end_infinite]">|</span>
        </span>
      </div>
    </div>
  );
}

const solutions = [
  {
    id: "akashic-eis",
    name: "Akashic EIS",
    icon: "Akashic EIS",
    sub: "Executive intelligence",
    desc: "An executive intelligence system for leadership teams: performance and decision metrics in one live view.",
    body: <EISBody />,
  },
  {
    id: "akashic-life",
    name: "Akashic Life",
    icon: "Akashic Life",
    sub: "Life sciences",
    desc: "A data and analytics platform for life sciences: clinical, regulatory, and commercial data, unified.",
    body: <LifeBody />,
  },
  {
    id: "akashic-knowledge",
    name: "Akashic Knowledge",
    icon: "Akashic Knowledge",
    sub: "Document intelligence",
    desc: "A document intelligence layer for policies, contracts, and institutional knowledge.",
    body: <KnowledgeBody />,
  },
];

export default function AkashicSolutions() {
  return (
    <section id="solutions" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-overcast">[07]</span>
            <span className="text-inkSoft">&nbsp;&nbsp;Built on Akashic</span>
          </p>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Same foundation. Built for what you actually do.
          </h2>
          <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-secondary-text">
            Akashic powers focused solutions for specific domains, each
            pre-configured, running on the same governed platform underneath.
          </p>
        </ScrollReveal>

        <div className="mx-auto mt-14 max-w-[1100px] lg:mt-16">
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {solutions.map((s, i) => (
              <ScrollReveal key={s.id} delay={i * 90}>
                <div id={s.id} className={`${CARD} h-full scroll-mt-28`}>
                  <CardHeader icon={s.icon} name={s.name} sub={s.sub} chip={<BlueChip label="PRE-CONFIGURED" />} />
                  <CardDesc text={s.desc} />
                  {s.body}
                  <div className="px-4 pb-4">
                    <Link href={`#${s.id}`} className="inline-flex items-center gap-1 text-[13px] font-medium text-blue transition-colors duration-250 ease-settle hover:text-blue-hover">
                      Learn more
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path d="M2.5 6H9.5M9.5 6L6 2.5M9.5 6L6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={120}>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-frame border border-blue-border bg-blue-subtle/40 px-6 py-4 text-center">
              <span className="inline-flex items-center font-semibold text-ink">
                <AkashicLogo className="h-5 w-5" />
                <span className="-ml-1 text-[14px]">kashic</span>
              </span>
              <span className="text-[14px] font-medium text-inkSoft">
                &middot; Different problems. Same governed model underneath.
              </span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
