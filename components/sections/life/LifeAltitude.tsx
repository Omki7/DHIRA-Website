/*
 * [05] Altitude — one statement, one screen, nothing else.
 *
 * The page's first full stop. Two-tone: the claim in navy, the mechanism in
 * soft blue behind it. Sitting alone on a viewport it does the job a section
 * of cards would take 900px to do badly.
 *
 * Runs on the same light ground as [04] so the two read as one light
 * movement between the navy of [03] and the navy of [06].
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import type { LifePage } from "@/content/pages/solutions-life";

export default function LifeAltitude({ content }: { content: LifePage["altitude"] }) {
  return (
    <section
      id="altitude"
      className="relative flex min-h-[78vh] scroll-mt-20 items-center bg-life-cream"
    >
      <div
        aria-hidden
        className="absolute inset-0 life-paper"
      />
      {/* Faint rays from the top: the aggregation the sentence is describing. */}
      

      <div className="relative mx-auto w-full max-w-[1440px] px-6 py-28 text-center sm:px-10 lg:px-14 lg:py-40">
        <ScrollReveal>
          <p className="mx-auto max-w-[15em] text-[30px] font-medium leading-[1.32] tracking-[-0.005em] sm:text-[40px] lg:text-[52px]">
            <span className="text-life-navy">{content.lead} </span>
            <span className="text-life-blue">{content.tail}</span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
