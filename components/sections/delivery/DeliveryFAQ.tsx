"use client";

/*
 * [08] FAQ — Before We Start.
 * Master-detail Q&A (desktop): question ledger on the left, the active
 * answer staged large on the right under a ghost "?" watermark, so the
 * former right whitespace carries the answer instead of duplicate text.
 * Falls back to the dossier accordion below lg. One shared open state.
 */

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

const faqs = [
  {
    q: "Can we start with advisory and switch to a product build?",
    a: "Yes. The Sovereign Blueprint becomes the strict specification for the build. No rework. No re-discovery.",
  },
  {
    q: "How is co-engineering different from standard staff augmentation?",
    a: "Staff augmentation just fills empty seats. We deploy a dedicated squad led by a DHIRA architect who is accountable for the actual output. We bring our own methodology. When we leave, you keep the knowledge and the governance framework.",
  },
  {
    q: "What happens if we pause or exit?",
    a: "You own everything. The code, documentation, lineage graphs, and infrastructure-as-code are yours. We build on open technologies so you are never locked in. No hostage data.",
  },
  {
    q: "Do you work on-premises?",
    a: "Yes. Akashic deploys on AWS, Azure, GCP, or your own bare-metal racks. Product engineering and advisory work securely inside your perimeter.",
  },
];

export default function DeliveryFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const activeIdx = openIdx ?? 0;
  const active = faqs[activeIdx];

  return (
    <section id="faq" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[08]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;FAQ</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Before we start</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            The questions we get before we start.
          </h2>
        </ScrollReveal>

        {/* Desktop: question ledger left, staged answer right */}
        <div className="mt-12 hidden lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <ScrollReveal delay={100}>
            <ul className="border-t border-lineSoft">
              {faqs.map((faq, idx) => {
                const activeRow = activeIdx === idx;
                return (
                  <li key={faq.q}>
                    <button
                      type="button"
                      onClick={() => setOpenIdx(idx)}
                      aria-pressed={activeRow}
                      className={`relative flex w-full items-baseline gap-5 border-b border-dashed border-lineSoft py-6 pl-5 pr-3 text-left transition-colors duration-200 ease-settle ${
                        activeRow ? "bg-primary-bg/50" : "hover:bg-primary-bg/60"
                      }`}
                    >
                      <span
                        className={`absolute bottom-3 left-0 top-3 w-[2px] bg-blue transition-opacity duration-250 ease-settle ${
                          activeRow ? "opacity-100" : "opacity-0"
                        }`}
                        aria-hidden
                      />
                      <span
                        className={`font-mono text-[11px] uppercase tracking-eyebrow ${
                          activeRow ? "text-blue" : "text-overcast"
                        }`}
                      >
                        Q{idx + 1}
                      </span>
                      <span
                        className={`text-[16px] leading-snug tracking-tight md:text-[17px] ${
                          activeRow ? "font-semibold text-ink" : "font-medium text-inkSoft"
                        }`}
                      >
                        {faq.q}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={180} className="h-full">
            <div className="relative flex h-full flex-col border-t border-lineSoft pt-6">
              <span
                className="pointer-events-none absolute -top-2 right-0 select-none font-heading text-[140px] font-semibold leading-none tracking-tighter text-ink/[0.035]"
                aria-hidden
              >
                ?
              </span>
              <div key={activeIdx} aria-live="polite" className="relative animate-fade-in">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
                  Q{activeIdx + 1}&nbsp;&middot;&nbsp;Straight answer
                </p>
                <p className="mt-5 max-w-[28em] text-[18px] leading-relaxed text-ink md:text-[20px]">
                  {active.a}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Mobile: dossier accordion */}
        <div className="mt-10 lg:hidden">
          {faqs.map((faq, idx) => {
            const open = openIdx === idx;
            return (
              <ScrollReveal key={faq.q} delay={100 + idx * 80}>
                <div
                  className={`relative border-t border-subtle-stroke transition-colors duration-250 ease-settle last:border-b ${
                    open ? "bg-primary-bg/50" : ""
                  }`}
                >
                  <span
                    className={`absolute left-0 top-0 h-full w-[2px] bg-blue transition-opacity duration-250 ease-settle ${
                      open ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden
                  />
                  <button
                    type="button"
                    onClick={() => setOpenIdx(open ? null : idx)}
                    aria-expanded={open}
                    className="flex w-full items-center gap-4 px-4 py-6 text-left transition-colors duration-200 ease-settle hover:bg-primary-bg/60"
                  >
                    <span
                      className={`font-mono text-[11px] uppercase tracking-eyebrow transition-colors duration-200 ${
                        open ? "text-blue" : "text-overcast"
                      }`}
                    >
                      Q{idx + 1}
                    </span>
                    <span className="flex-1 text-[17px] font-semibold leading-snug tracking-tight text-ink">
                      {faq.q}
                    </span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-250 ease-settle ${
                        open
                          ? "rotate-45 border-blue-border bg-blue-subtle text-blue"
                          : "border-subtle-stroke text-inkSoft"
                      }`}
                      aria-hidden
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-400 ease-settle ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-7 pl-[52px] pr-4 text-[15.5px] leading-relaxed text-inkSoft">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={200}>
          <div className="mt-10 flex flex-wrap items-baseline justify-between gap-3 border-t border-lineSoft pt-6 lg:mt-14">
            <p className="text-[16px] font-semibold tracking-tight text-ink md:text-[17px]">
              Something else on your mind? Bring it to the 30-minute discovery. No pitch deck.
            </p>
            <Link
              href="#talk-to-our-team"
              className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue transition-colors duration-200 ease-settle hover:text-blue-hover"
            >
              Talk to our team &darr;
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
