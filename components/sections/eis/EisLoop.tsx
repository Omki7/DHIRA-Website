import EisPill from "@/components/ui/eis/EisPill";
import ScrollReveal from "@/components/ui/ScrollReveal";
import EisLoopCircuitMockup from "@/components/demos/mockups/eis/EisLoopCircuitMockup";
import type { EisPage } from "@/content/pages/solutions-eis";

/* [the-loop] — the half a reporting tool cannot do.
 *
 * The previous build carried two headlines ~600px apart ("Reading the
 * business is half the job", then "Signal to record, on one surface") with a
 * dusk band between them doing no work, and its centrepiece was a TABBED
 * simulator: five stations, one visible. A section whose whole claim is
 * "the loop closes" cannot leave four fifths of the loop behind a tab an
 * executive will not click. It also ran on a dark navy panel, which no
 * longer matches the page, and told the story in a different industry from
 * every section around it.
 *
 * The 1980s framing is kept because it is the strongest content here: to
 * anyone who was a CIO then, "executive information system" names a
 * category that already failed once, and not addressing that reads as
 * either ignorance or nerve.
 */

export default function EisLoop({ content }: { content: EisPage["loop"] }) {
  return (
    <section
      id="the-loop"
      className="scroll-mt-24 bg-background px-6 pb-20 pt-20 sm:pt-24 lg:pb-28 lg:pt-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <ScrollReveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="max-w-[20ch] font-heading text-4xl font-medium leading-[1.05] tracking-tighter sm:text-5xl md:text-6xl">
                <span className="text-eis-body">{content.setup}</span>
                <br />
                <span className="text-eis-ink">{content.payoff}</span>
              </h2>
              <p className="mt-5 max-w-[620px] text-balance text-base leading-[1.5] tracking-tight text-eis-body sm:mt-6 sm:text-lg">
                {content.lede}
              </p>
            </div>

            {/* `outline`, not the default `solid`: solid is a white fill for
                photographic grounds, and this section is on white, so the
                default rendered as unstyled black text. */}
            <EisPill
              href={content.cta.href}
              tone="outline"
              className="flex-shrink-0 self-start lg:self-auto"
            >
              {content.cta.label}
            </EisPill>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={90}>
          <div className="mt-10 sm:mt-14">
            <EisLoopCircuitMockup />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
