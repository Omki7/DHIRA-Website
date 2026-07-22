"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

const CARDS = [
  {
    title: "Zero AI Training",
    text: "We never use your data or queries to train models. Your information stays strictly yours.",
    visual: (
      <div className="mt-8 flex flex-1 items-end justify-center pb-2">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-lineSoft bg-white shadow-sm">
          <svg className="h-6 w-6 text-overcast" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
        </div>
      </div>
    ),
  },
  {
    title: "100% Data Security",
    text: "Row and column-level permissions follow the person. If they can't see it in the database, they can't see it here.",
    visual: (
      <div className="mt-8 flex flex-1 items-end justify-center pb-2">
        <div className="w-full max-w-[200px] overflow-hidden rounded-xl border border-lineSoft bg-white text-[9px] shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <div className="flex bg-primary-bg px-2.5 py-1.5 font-semibold text-inkSoft">
            <div className="w-1/3">Name</div>
            <div className="w-1/3">Revenue</div>
            <div className="w-1/3">Salary</div>
          </div>
          {/* Account names and revenue read from the shared demo world's top
              accounts (AkashicHeroBIWireframe) — "Acme"/"Beta" were off-cast
              and $2.4M collided with a different account's figure. */}
          <div className="flex border-t border-lineSoft px-2.5 py-1.5">
            <div className="w-1/3 truncate text-ink">Whitmore</div>
            <div className="w-1/3 text-positive">$4.2M</div>
            <div className="w-1/3 text-red-500/40 blur-[2px]">••••</div>
          </div>
          <div className="flex border-t border-lineSoft px-2.5 py-1.5">
            <div className="w-1/3 truncate text-ink">Kirkwood</div>
            <div className="w-1/3 text-positive">$3.1M</div>
            <div className="w-1/3 text-red-500/40 blur-[2px]">••••</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Semantic Governance",
    text: "Centralized policy enforcement at the semantic layer ensures perfectly governed and consistent answers.",
    visual: (
      <div className="mt-8 flex flex-1 items-end justify-center gap-2 pb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-lineSoft bg-white shadow-sm">
          <svg className="h-4 w-4 text-inkSoft" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        </div>
        <svg className="h-5 w-5 text-line" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-lineSoft bg-blue text-white shadow-sm">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
        </div>
      </div>
    ),
  },
  {
    title: "Strict Data Residency",
    text: "Stored, processed, and answered inside your perimeter. Nothing crosses your VPC boundary.",
    visual: (
      <div className="mt-8 flex flex-1 items-end justify-center gap-3 pb-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-lineSoft bg-white shadow-sm">
          <svg className="h-5 w-5 text-inkSoft" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
        </div>
        <div className="flex gap-1.5 pb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-border bg-blue-subtle shadow-sm">
          <svg className="h-5 w-5 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        </div>
      </div>
    ),
  }
];

export default function AkashicTrust() {
  return (
    <section id="trust" className="relative overflow-hidden bg-background py-24 lg:py-32">
      {/* Subtle Background Grid */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.15]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="privacy-grid-white" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1A1C1D" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#privacy-grid-white)" />
        </svg>
      </div>

      <ScrollRevealRail dark={false}>
        {/* Eyebrow */}
        <ScrollReveal>
          <p className="mb-14 font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-overcast">[05]</span>
            <span className="text-inkSoft">&nbsp;&nbsp;Data privacy &amp; security</span>
          </p>
        </ScrollReveal>

        {/* Header Block */}
        <ScrollReveal delay={60}>
          <div className="mb-16">
            <h2 className="text-balance text-[40px] font-semibold leading-[1.1] tracking-tighter text-ink md:text-[48px] lg:text-[56px]">
              Security & Privacy by Design.
            </h2>
            <p className="mt-5 max-w-[36em] text-[18px] leading-relaxed text-inkSoft">
              Akashic operates directly on your existing data infrastructure. We provide full warehousing 
              and ingestion without compromising privacy, and we never use your data for AI training.
            </p>
            
            {/* Badges */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2.5 rounded-full border border-lineSoft bg-primary-bg py-1.5 pl-1.5 pr-4 shadow-sm">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink font-mono text-[8px] font-bold text-white">SOC2</span>
                <span className="text-[13px] font-medium text-ink">Type II Certified</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-full border border-lineSoft bg-primary-bg py-1.5 pl-1.5 pr-4 shadow-sm">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue font-mono text-[8px] font-bold text-white">GDPR</span>
                <span className="text-[13px] font-medium text-ink">Compliant</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-full border border-lineSoft bg-primary-bg py-1.5 pl-1.5 pr-4 shadow-sm">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue text-white">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M12 2l3 6.5L22 9l-5 5 1.5 7L12 17.5 5.5 21 7 14 2 9l7-1.5L12 2z"/></svg>
                </span>
                <span className="text-[13px] font-medium text-ink">Enterprise Hosted</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 4-Column Row */}
        <ScrollReveal delay={120}>
          <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {CARDS.map((card, i) => (
              <div 
                key={i}
                className="group flex min-h-[240px] flex-col overflow-hidden rounded-[16px] bg-primary-bg p-6 ring-1 ring-ink/[0.04] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-card hover:ring-ink/[0.08]"
              >
                <h3 className="text-base font-semibold text-ink">{card.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-inkSoft max-w-[96%]">
                  {card.text}
                </p>
                {/* Visual wrapper scales down slightly to fit narrower columns */}
                <div className="mt-8 transform transition-transform duration-500 group-hover:scale-105 origin-bottom">
                  {card.visual}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
