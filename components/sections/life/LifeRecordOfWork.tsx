/*
 * [07] Record of work — the vertical chain.
 *
 * The reference stacks large outline circles down the centre with copy
 * alternating either side, and lets them overlap so the chain reads as one
 * continuous run rather than three separate badges. Same device here.
 * The national nutrition programme was the first link and was removed on
 * 23 Jul 2026 (user direction); do not add it back.
 *
 * TWO CLAIMS RULES ARE LOAD-BEARING HERE.
 *
 * 1. The programmes are NEVER named. Homepage and /akashic refer to national
 *    deliveries generically ("National Immunisation Registry", "National
 *    Learning Platform") and carry the figures underneath; only
 *    /sectors/public-sector names them. Match the homepage, not that page.
 * 2. Akashic Life carries NO figures of its own. It is not sold, so any
 *    usage or performance number would be a claim we cannot stand behind.
 *    Its circle earns its place by what it is built on, not by a metric.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import { LifeEyebrow, LifeGlyph, LifeCornerArc } from "@/components/ui/life/LifeChrome";
import type { LifePage } from "@/content/pages/solutions-life";


export default function LifeRecordOfWork({ content }: { content: LifePage["recordOfWork"] }) {
  const { chain } = content;
  return (
    <section id="record-of-work" className="relative scroll-mt-20 overflow-hidden bg-life-abyss">
      <div
        aria-hidden
        className="absolute inset-0 life-ground"
      />
      <LifeCornerArc />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 pt-28 sm:px-10 lg:px-14 lg:pt-40">
        <ScrollReveal className="flex flex-col items-center text-center">
          <LifeEyebrow num={content.eyebrow.num}>{content.eyebrow.label}</LifeEyebrow>
          <p className="mt-9 max-w-[19em] text-[24px] font-normal leading-[1.34] text-ink sm:text-[28px] lg:text-[32px]">
            {content.lede}
          </p>
        </ScrollReveal>

        <div className="relative mt-24 pb-28 lg:mt-32 lg:pb-40">
          {chain.map((item, i) => (
            <div
              key={item.name}
              /* Negative margin is the overlap: the circles share an edge so
                 the three read as one chain, not three badges. */
              className={`relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-12 ${
                i > 0 ? "mt-14 lg:-mt-[38px]" : ""
              }`}
            >
              {/* Copy, alternating sides. Both cells declare their row: with
                  only a column set, sparse auto-placement pushes the second
                  cell onto row 2 whenever the first one claimed column 3. */}
              <div
                className={`order-2 lg:order-none lg:row-start-1 ${
                  i % 2 === 0
                    ? "lg:col-start-3 lg:justify-self-start lg:pl-4"
                    : "lg:col-start-1 lg:justify-self-end lg:pr-4 lg:text-left"
                }`}
              >
                <ScrollReveal className="max-w-[24em] lg:max-w-[21em]">
                  <LifeGlyph size={14} />
                  <p className="mt-5 text-[15px] leading-[1.6] text-secondary-text sm:text-[16px]">
                    {item.body}
                  </p>
                </ScrollReveal>
              </div>

              {/* The circle. */}
              <div className="order-1 flex justify-center lg:order-none lg:col-start-2 lg:row-start-1">
                <div className="relative flex aspect-square w-[268px] shrink-0 flex-col items-center justify-center rounded-full border border-line text-center sm:w-[300px] lg:w-[352px]">
                  {item.live && (
                    <span
                      className="alife-sonar pointer-events-none absolute inset-0 rounded-full border border-life-cyan/45"
                      aria-hidden
                    />
                  )}
                  <p className="text-[13px] font-bold uppercase tracking-[0.1em] text-life-sky">
                    {item.figure}
                  </p>
                  <p className="mt-2.5 text-[14px] font-bold uppercase tracking-[0.08em] text-ink">
                    {item.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
