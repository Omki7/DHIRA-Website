/*
 * [01] The problem — the distance between a health signal and a response.
 *
 * Pinned left, scrolling right. The headline holds still for the whole
 * section while the reader travels down four blocks of evidence, each one
 * sitting inside a giant ghost figure. That pairing is the whole device: the
 * number is scenery until the sentence tells you what it costs.
 *
 * Every figure here is already argued elsewhere on the page or on the site:
 * the four-day referral pathway and its seven steps, and the offline reality
 * the product is built for. Nothing is invented (Design Rule 4).
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import { LifeEyebrow, LifeCornerArc } from "@/components/ui/life/LifeChrome";
import type { LifePage } from "@/content/pages/solutions-life";


function Ghost({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute -top-[0.42em] left-[-0.06em] select-none whitespace-nowrap text-[92px] font-normal leading-[0.78] tracking-[-0.02em] text-life-ghost sm:text-[128px] lg:text-[150px] xl:text-[172px] ${className}`}
    >
      {children}
    </span>
  );
}

/* The tick where a block meets the column rule. */
function Tick() {
  return (
    <span
      aria-hidden
      className="absolute -left-8 top-[0.7em] hidden h-px w-8 bg-life-line lg:block"
    />
  );
}

export default function LifeGap({ content }: { content: LifePage["gap"] }) {
  const { blocks, closer } = content;
  return (
    // No `overflow-hidden` on this section: it would turn the pinned column
    // back into a static one. See the note on LifeCornerArc.
    <section id="the-gap" className="relative scroll-mt-20 bg-background">
      <LifeCornerArc tone="light" />

      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Pinned side */}
          <div className="pt-24 lg:sticky lg:top-[120px] lg:self-start lg:pb-24 lg:pt-40">
            <ScrollReveal>
              <LifeEyebrow num={content.eyebrow.num} tone="light">{content.eyebrow.label}</LifeEyebrow>
              <h2 className="mt-7 max-w-[10em] text-[34px] font-medium leading-[1.24] tracking-[-0.005em] text-life-navy sm:text-[40px] lg:text-[46px]">
                {content.title}
              </h2>
            </ScrollReveal>
          </div>

          {/* Scrolling side */}
          <div className="relative pb-24 pt-16 lg:border-l lg:border-life-line lg:pb-40 lg:pl-16 lg:pt-40 xl:pl-24">
            {blocks.map((block) => (
              <div
                key={block.ghost}
                className="relative flex min-h-[300px] flex-col justify-center py-16 first:pt-0 lg:min-h-[420px] lg:py-24"
              >
                <ScrollReveal>
                  <div className="relative">
                    <Ghost>{block.ghost}</Ghost>
                    <Tick />
                    <h3 className="relative max-w-[22em] text-[15px] font-bold uppercase leading-[1.5] tracking-[0.04em] text-life-blue sm:text-[16px]">
                      {block.head}
                    </h3>
                    <p className="relative mt-5 max-w-[26em] text-[17px] leading-[1.45] text-life-body sm:text-[19px]">
                      {block.body}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            ))}

            {/* Closer: no sub-heading, the statement itself carries it. */}
            <div className="relative flex min-h-[300px] flex-col justify-center py-16 lg:min-h-[440px] lg:py-24">
              <ScrollReveal>
                <div className="relative">
                  <Ghost className="text-life-ice">{closer.ghost}</Ghost>
                  <Tick />
                  <p className="relative max-w-[15em] text-[26px] font-medium leading-[1.3] tracking-[-0.005em] sm:text-[31px] lg:text-[34px]">
                    <span className="text-life-navy">{closer.lead} </span>
                    <span className="text-life-blue">{closer.tail}</span>
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
