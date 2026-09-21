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

type Block = {
  ghost: string;
  /** Narrow figures ("0") need to be pushed off the text or they read as a stray mark. */
  ghostClass?: string;
  head: string;
  body: string;
};

const blocks: Block[] = [
  {
    ghost: "4 DAYS",
    head: "Time, not pathology, is what takes her",
    body: "A mother in a remote village can wait four days between the first sign of danger and a diagnosis. Travel to a clinic. Manual checks. A sample sent away. A lab queue. The journey back.",
  },
  {
    ghost: "0 BARS",
    head: "The need is worst exactly where the network is not",
    body: "Cloud diagnostics assume a connection. The places that most need specialist judgement are the ones with no broadband, no specialist, and often no signal at all.",
  },
  {
    ghost: "7 STEPS",
    head: "Every handoff is somewhere to lose her",
    body: "Symptom, clinic, checks, sample, lab, return, diagnosis. Seven places for a record to be re-keyed, misfiled or quietly dropped, and nobody holding the whole thread.",
  },
];

const closer = {
  ghost: "ZERO",
  lead: "Not one of those four days is clinical.",
  tail: "They are travel, transcription and waiting. Every one of them is a systems problem, and systems problems can be rebuilt.",
};

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

export default function LifeGap() {
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
              <LifeEyebrow num="01" tone="light">The problem</LifeEyebrow>
              <h2 className="mt-7 max-w-[10em] text-[34px] font-medium leading-[1.24] tracking-[-0.005em] text-life-navy sm:text-[40px] lg:text-[46px]">
                The signal arrives. The response does not.
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
                    <Ghost className={block.ghostClass}>{block.ghost}</Ghost>
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
                    <span className="text-[#7FB4D8]">{closer.tail}</span>
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
