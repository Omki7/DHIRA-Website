"use client";

/*
 * [04] How a delivery runs: one rail, left to right, in the /akashic agents
 * grammar (lane brackets, numbered nodes, a legend foot, one coda).
 *
 *   lanes     brackets over the run: the joint team (blue), then yours (ink)
 *   rail      four stages on a blue line; each stage closes on an ink
 *             diamond, the reader's sign-off, before the next node
 *   handover  after the last gate the line turns ink and runs into your
 *             team's column, as the hero's line does
 *
 * Every stage, output and sign-off is visible at once. The rail runs
 * across from xl; below it the same rail runs down the left. Draws in once
 * (useDrawn + .ad-* kit); reduced motion lands on the final state.
 */

import type { CSSProperties } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import useDrawn from "@/hooks/useDrawn";
import type { DeliveryPage } from "@/content/pages/delivery";

const delay = (s: number) => ({ "--ad-delay": `${s}s` }) as CSSProperties;
const COLS = "xl:grid-cols-[repeat(4,minmax(0,1fr))_minmax(0,0.72fr)]";
const STAGE = "relative grid grid-cols-[30px_minmax(0,1fr)] gap-x-4 xl:row-span-7 xl:grid-cols-1 xl:grid-rows-subgrid xl:gap-x-0";

function PersonGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[15px] w-[15px]" aria-hidden>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c1.2-3.6 3.8-5.4 7-5.4s5.8 1.8 7 5.4" />
    </svg>
  );
}

function Gate() {
  return <span aria-hidden className="block h-2 w-2 shrink-0 rotate-45 bg-ink" />;
}

export default function DeliveryMethodology({ content: c }: { content: DeliveryPage["methodology"] }) {
  const [ref, drawn] = useDrawn<HTMLDivElement>(0.3);
  const last = c.stages.length - 1;

  return (
    <section id="methodology" className="scroll-mt-28 bg-background pb-16 pt-12 lg:pb-24 lg:pt-16">
      <ScrollRevealRail>
        <SectionHeader num={c.eyebrow.number} label={c.eyebrow.label} setup={c.title.setup} payoff={c.title.payoff} lede={c.lede} />

        <ScrollReveal className="mt-12 lg:mt-14">
          <div ref={ref} data-drawn={drawn} className="overflow-hidden rounded-frame border border-line bg-background">
            {/* Lanes (lg): who owns each stretch of the rail. */}
            <div className={`hidden px-8 pt-6 xl:grid ${COLS}`} aria-hidden="true">
              <span className="ad-fade relative col-span-4 mr-8 border-b border-blue pb-2 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-blue before:absolute before:left-0 before:top-full before:h-[5px] before:border-l before:border-blue after:absolute after:right-0 after:top-full after:h-[5px] after:border-l after:border-blue" style={delay(0.05)}>
                {c.lanes.stages}
              </span>
              <span className="ad-fade relative border-b border-ink pb-2 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-ink before:absolute before:left-0 before:top-full before:h-[5px] before:border-l before:border-ink after:absolute after:right-0 after:top-full after:h-[5px] after:border-l after:border-ink" style={delay(0.9)}>
                {c.lanes.run}
              </span>
            </div>

            {/* From xl every stage is a subgrid of the same seven rows, so
                outputs and sign-offs line up across stages whatever wraps. */}
            <ol className={`grid px-5 pt-6 lg:px-8 ${COLS}`}>
              {c.stages.map((stage, i) => {
                const fade = { className: "ad-fade col-start-2 xl:col-start-1 xl:pr-8", style: delay(0.25 + i * 0.16) };
                return (
                  <li key={stage.id} className={STAGE}>
                    {/* Rail: node, line, the sign-off gate. Vertical below xl. */}
                    <div className="row-span-6 flex flex-col items-center xl:row-span-1 xl:flex-row" aria-hidden="true">
                      <span className="ad-fade relative z-[1] flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border border-blue bg-background font-mono text-[10px] font-medium text-blue" style={delay(0.15 + i * 0.16)}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="ad-strike block w-px flex-1 bg-blue xl:h-px xl:w-auto" style={delay(0.2 + i * 0.16)} />
                      <span className="ad-fade my-1 xl:mx-1 xl:my-0" style={delay(0.35 + i * 0.16)}><Gate /></span>
                      <span className={`ad-strike block h-3 w-px xl:h-px xl:w-3 ${i === last ? "bg-ink" : "bg-blue"}`} style={delay(0.4 + i * 0.16)} />
                    </div>
                    <h3 {...fade} className={`${fade.className} pt-1 text-[16px] font-semibold tracking-tight text-ink xl:pt-4`}>{stage.name}</h3>
                    <p {...fade} className={`${fade.className} mt-1.5 text-pretty text-[13.5px] leading-snug text-secondary-text`}>{stage.description}</p>
                    <p {...fade} className={`${fade.className} mt-5 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-blue`}>{c.outputLabel}</p>
                    <p {...fade} className={`${fade.className} mt-1 text-pretty text-[14px] font-medium leading-snug text-ink`}>{stage.deliverable}</p>
                    <p {...fade} className={`${fade.className} mt-4 flex items-center gap-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-ink`}><Gate />{c.reviewLabel}</p>
                    <p {...fade} className={`${fade.className} mt-1 pb-8 text-pretty text-[13.5px] leading-snug text-ink`}>{stage.review}</p>
                  </li>
                );
              })}
              <li className={STAGE}>
                <div className="row-span-2 flex flex-col items-center xl:row-span-1 xl:flex-row" aria-hidden="true">
                  <span className="ad-fade relative z-[1] flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-ink text-on-action" style={delay(0.95)}>
                    <PersonGlyph />
                  </span>
                  <span className="ad-strike hidden h-px flex-1 bg-ink xl:block" style={delay(1.05)} />
                </div>
                <h3 className="ad-fade col-start-2 pt-1 text-[16px] font-semibold tracking-tight text-ink xl:col-start-1 xl:pt-4" style={delay(1)}>{c.legend.team}</h3>
                <p className="ad-fade col-start-2 mt-1.5 pb-8 text-pretty text-[13.5px] leading-snug text-secondary-text xl:col-start-1 xl:pb-0" style={delay(1)}>{c.run}</p>
              </li>
            </ol>

            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-lineSoft bg-panel px-5 py-3 text-xs text-secondary-text lg:px-8" aria-hidden="true">
              <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-full border border-blue" />{c.legend.stage}</li>
              <li className="flex items-center gap-2"><Gate />{c.legend.signoff}</li>
              <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-ink" />{c.legend.team}</li>
            </ul>
          </div>
        </ScrollReveal>

        <p className="mt-6 text-base font-medium tracking-tight text-ink">{c.coda}</p>
      </ScrollRevealRail>
    </section>
  );
}
