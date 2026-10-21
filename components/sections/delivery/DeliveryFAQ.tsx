"use client";

/*
 * [07] FAQ — The questions we get before we start.
 * Master-detail Q&A (desktop): question ledger on the left, active answer staged on the right.
 * Accordion below lg breakpoint. Exact 7 questions per specification.
 */

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import JsonLd from "@/components/ui/JsonLd";
import type { DeliveryPage } from "@/content/pages/delivery";


export default function DeliveryFAQ({ content }: { content: DeliveryPage["faq"] }) {
  const faqs = content.items;
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const activeIdx = openIdx ?? 0;
  const active = faqs[activeIdx];

  return (
    <section id="faq" className="scroll-mt-24 border-t border-lineSoft bg-background pt-16 pb-24 lg:pt-20 lg:pb-32">
      <JsonLd
        data={{
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
      <ScrollRevealRail>
        {/* Section Header */}
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
          <p className="mt-5 max-w-[44em] text-lg leading-relaxed text-secondary-text">
            {content.lede}
          </p>
        </ScrollReveal>

        {/* Desktop: question ledger left, staged answer right */}
        <div className="mt-12 hidden lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
          <ScrollReveal delay={100}>
            <ul className="border-t border-lineSoft">
              {faqs.map((faq, idx) => {
                const activeRow = activeIdx === idx;
                return (
                  <li key={faq.question}>
                    <button
                      type="button"
                      onClick={() => setOpenIdx(idx)}
                      aria-pressed={activeRow}
                      className={`relative flex w-full items-baseline gap-4 border-b border-dashed border-lineSoft py-4 pl-4 pr-3 text-left transition-colors duration-200 ease-settle ${
                        activeRow ? "bg-primary-bg" : "hover:bg-primary-bg"
                      }`}
                    >
                      <span
                        className={`absolute bottom-2.5 left-0 top-2.5 w-[2.5px] bg-blue transition-opacity duration-200 ${
                          activeRow ? "opacity-100" : "opacity-0"
                        }`}
                        aria-hidden
                      />
                      <span
                        className={`font-mono text-[11px] uppercase tracking-eyebrow ${
                          activeRow ? "text-blue font-bold" : "text-overcast"
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <div className="flex-1">
                        <span
                          className={`text-[15px] leading-snug tracking-tight ${
                            activeRow ? "font-semibold text-ink" : "font-medium text-inkSoft"
                          }`}
                        >
                          {faq.question}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </ScrollReveal>

          {/* Staged Answer Pane */}
          <ScrollReveal delay={180} className="h-full">
            <div className="relative flex h-full flex-col justify-between rounded-tile border border-subtle-stroke bg-primary-bg p-8 ">
              <span
                className="pointer-events-none absolute -top-4 right-4 select-none font-heading text-[120px] font-semibold leading-none tracking-tighter text-ink/[0.03]"
                aria-hidden
              >
                ?
              </span>
              <div key={activeIdx} aria-live="polite" className="relative animate-fade-in">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-blue px-2 py-0.5 font-mono text-[10px] font-bold text-on-action">
                    0{activeIdx + 1}
                  </span>
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-eyebrow text-blue">
                    {content.answerLabel}
                  </span>
                </div>

                <h3 className="mt-5 text-[19px] font-semibold tracking-tight text-ink md:text-[21px]">
                  {active.question}
                </h3>

                <p className="mt-4 max-w-[32em] text-[16px] leading-relaxed text-secondary-text md:text-[17px]">
                  {active.answer}
                </p>
              </div>

              <div className="mt-8 border-t border-dashed border-lineSoft pt-4">
                <p className="font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
                  {content.moreLabel}
                </p>
                <Link
                  href={content.moreCta.href}
                  className="mt-1.5 inline-block font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-blue hover:text-blue-hover"
                >
                  {content.moreCta.label}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Mobile: dossier accordion */}
        <div className="mt-10 lg:hidden">
          {faqs.map((faq, idx) => {
            const open = openIdx === idx;
            return (
              <ScrollReveal key={faq.question} delay={80 + idx * 50}>
                <div
                  className={`relative border-t border-subtle-stroke transition-colors duration-250 ease-settle last:border-b ${
                    open ? "bg-primary-bg" : ""
                  }`}
                >
                  <span
                    className={`absolute left-0 top-0 h-full w-[2px] bg-blue transition-opacity duration-250 ${
                      open ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden
                  />
                  <button
                    type="button"
                    onClick={() => setOpenIdx(open ? null : idx)}
                    aria-expanded={open}
                    className="flex w-full items-center gap-3.5 px-4 py-4 text-left transition-colors duration-200 hover:bg-primary-bg"
                  >
                    <span
                      className={`font-mono text-[10.5px] uppercase tracking-eyebrow ${
                        open ? "text-blue font-bold" : "text-overcast"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span className="flex-1 text-[15.5px] font-semibold leading-snug tracking-tight text-ink">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                        open
                          ? "rotate-45 border-blue-border bg-blue-subtle text-blue"
                          : "border-subtle-stroke text-inkSoft"
                      }`}
                      aria-hidden
                    >
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-settle ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 pl-[46px] pr-4 text-[14.5px] leading-relaxed text-secondary-text">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </ScrollRevealRail>
    </section>
  );
}
