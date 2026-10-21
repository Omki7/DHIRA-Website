"use client";

import { useState } from "react";
import JsonLd from "@/components/ui/JsonLd";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { EisPage } from "@/content/pages/solutions-eis";

/* [questions] — the integration and platform objections this page used to
 * answer in two full sections.
 *
 * THE COPY IS THE STRONGEST ON THE PAGE and is kept almost verbatim. What
 * changed is the structure around it:
 *
 *   1. GROUPED. Nine questions in one flat list is a pile, and a reader
 *      cannot tell whether the one they care about is in it. They are now
 *      three labelled bands in the order a buyer works through them: what it
 *      is, whether the figures can be trusted, what it does to their systems.
 *   2. THE FIRST ANSWER IS OPEN. Every panel closed meant a reader saw nine
 *      question marks and no answers, with the single most important
 *      paragraph here (the read-only versus write-back reconciliation, which
 *      sounds like a contradiction until it is separated into two planes)
 *      hidden behind a toggle.
 *   3. LEFT ALIGNED at the page's measure, like every other section, rather
 *      than a narrow centred column.
 */



/* The one that opens on load. Keyed by question rather than index so
   reordering a band cannot silently open a different answer. */

export default function EisFaq({ content }: { content: EisPage["faq"] }) {
  const BANDS = content.bands;
  const [open, setOpen] = useState<string | null>(content.openByDefault);

  return (
    <section
      id="questions"
      className="scroll-mt-24 w-full bg-background px-6 pb-20 pt-20 sm:pt-24 lg:pb-28 lg:pt-32"
    >
      <JsonLd
        data={{
          "@type": "FAQPage",
          mainEntity: BANDS.flatMap((band) =>
            band.items.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
          ),
        }}
      />
      <div className="mx-auto max-w-[1180px]">
        <ScrollReveal>
          <h2 className="font-heading text-4xl font-medium leading-[1.05] tracking-tighter text-eis-ink sm:text-5xl md:text-6xl">
            {content.title}
          </h2>
          <p className="mt-5 max-w-[620px] text-balance text-base leading-[1.5] tracking-tight text-eis-body sm:mt-6 sm:text-lg">
            {/* Not "in the order they come up" any more: they are grouped, so
                claiming an order was inaccurate the moment the bands landed. */}
            {content.lede}
          </p>
        </ScrollReveal>

        {BANDS.map((band, bi) => (
          <div key={band.label} className={bi === 0 ? "mt-12 sm:mt-16" : "mt-12 sm:mt-14"}>
            <ScrollReveal>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-eis-line pb-3">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-eis-ink">
                  {band.label}
                </h3>
                <p className="text-sm text-eis-caption">{band.note}</p>
              </div>
            </ScrollReveal>

            <div className="max-w-[860px]">
              {band.items.map((f) => {
                const isOpen = open === f.question;
                return (
                  <div key={f.question} className="border-b border-eis-line">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : f.question)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-4 text-left"
                    >
                      <span className="text-[15px] font-medium text-eis-ink">{f.question}</span>
                      {/* One glyph, rotated. A plus that becomes a cross reads
                          as the same control changing state; two icons read
                          as two controls. */}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                        className={`shrink-0 text-eis-body transition-transform duration-250 ease-settle ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </button>

                    {/* Grid-rows animates to the content's real height without
                        measuring it, and collapses cleanly to zero. */}
                    <div
                      className={`grid transition-all duration-400 ease-settle ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-5 pr-8 text-[15px] leading-relaxed text-eis-body">
                          {f.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
