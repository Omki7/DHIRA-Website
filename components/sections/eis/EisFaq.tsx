"use client";

import { useState } from "react";
import JsonLd from "@/components/ui/JsonLd";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import type { EisPage } from "@/content/pages/solutions-eis";

/* [questions] — Section [06]: Frequent Questions
 * Adheres to Section Grammar: FigureEyebrow [06] FREQUENT QUESTIONS,
 * two-tone headline, lede directly below, ScrollRevealRail layout.
 * Streamlined to the 5 core questions an executive actually asks.
 */
export default function EisFaq({ content }: { content: EisPage["faq"] }) {
  const items = content.items ?? content.bands.flatMap((b) => b.items);
  const [open, setOpen] = useState<string | null>(content.openByDefault ?? items[0]?.question ?? null);

  return (
    <section
      id="questions"
      className="relative w-full scroll-mt-24 overflow-clip bg-background pt-12 pb-16 lg:pt-16 lg:pb-24"
    >
      <JsonLd
        data={{
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
      <ScrollRevealRail>
        <SectionHeader
          num="06"
          label="FREQUENT QUESTIONS"
          payoff="Questions executives ask."
          lede={content.lede}
        />

        <div className="mt-12 max-w-[860px] lg:mt-14">
          {items.map((f, i) => {
            const isOpen = open === f.question;
            return (
              <ScrollReveal key={f.question} delay={i * 50}>
                <div className="border-b border-lineSoft first:border-t">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : f.question)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-200 hover:text-blue"
                  >
                    <span className="text-[16px] font-semibold text-ink sm:text-[17px]">
                      {f.question}
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                      className={`shrink-0 text-inkSoft transition-transform duration-250 ease-settle ${
                        isOpen ? "rotate-45 text-blue" : ""
                      }`}
                    >
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>

                  <div
                    className={`grid transition-all duration-400 ease-settle ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-8 text-[15px] leading-relaxed text-secondary-text">
                        {f.answer}
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
