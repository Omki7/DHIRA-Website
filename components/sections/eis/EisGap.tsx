import ScrollReveal from "@/components/ui/ScrollReveal";
import EisGapTimelineMockup from "@/components/demos/mockups/eis/EisGapTimelineMockup";

/* [the-gap] — why an executive layer has to exist at all.
 *
 * The section used to be three atmosphere tiles (Traditional BI / Ungoverned
 * AI / Akashic EIS) each floating a clipped white panel, all three answering
 * "what is our operating margin?". Three problems with that, in order of
 * severity:
 *
 *   1. It argued about latency without ever showing time passing.
 *   2. Operating margin is a reporting question, not a decision. The hero
 *      ends on a press line stopping in nine days with ₹38 Cr against it;
 *      dropping to a static margin percentage de-escalates exactly where
 *      the story should tighten.
 *   3. Two named strawmen beside our own product is the shape of a vendor
 *      slide, and an executive discounts it on sight.
 *
 * Now it is one incident on one axis of days. The comparison is still
 * three-way, but it is settled on a measurable axis rather than by
 * assertion, and the middle lane is allowed to be genuinely fast so that
 * the reason it fails (nothing signable) is the thing that lands.
 */

export default function EisGap() {
  return (
    <section
      id="the-gap"
      className="scroll-mt-24 bg-eis-band px-6 pb-20 pt-20 sm:pt-24 lg:pb-28 lg:pt-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-10 sm:mb-14">
          <ScrollReveal>
            {/* Soft setup, ink payoff — the sitewide two-tone rule. A
                declarative pair, not the old question ("Have your decisions
                caught up?"), which an executive answers "yes, mine have"
                and scrolls past. */}
            {/* 6xl, not 7xl: at 7xl with a 16ch measure each sentence broke
                across two lines, so the pair read as four lines of headline
                and pushed the diagram (the actual argument) below the fold. */}
            <h2 className="max-w-[26ch] font-heading text-4xl font-medium leading-[1.05] tracking-tighter sm:text-5xl md:text-6xl">
              <span className="text-eis-body">The number was ready at 06:00.</span>
              <br />
              <span className="text-eis-ink">The decision took twenty-six days.</span>
            </h2>
            <p className="mt-5 max-w-[620px] text-balance text-base leading-[1.5] tracking-tight text-eis-body sm:mt-6 sm:text-lg">
              Nobody is short of reporting. What is short is the distance
              between a figure moving and someone acting on it. Here is one
              morning at one plant, run three ways.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={90}>
          <EisGapTimelineMockup />
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="max-w-[620px] text-balance text-base leading-tight text-eis-body sm:text-lg">
              The gap is not a reporting problem. It is the distance from the
              figure to the decision, and it is measured in days.
            </p>
            <p className="flex-shrink-0 text-[11px] leading-tight text-eis-muted">
              An illustration, using the demonstration plant shown above.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
