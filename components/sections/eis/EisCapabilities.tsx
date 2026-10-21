import type { ReactNode } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { EisEvidence, EisPage } from "@/content/pages/solutions-eis";
import {
  EvAction,
  EvDefinition,
  EvEntity,
  EvPermissions,
  EvPlanes,
  EvRecord,
} from "@/components/demos/mockups/eis/EisCapabilityEvidence";

/* [capabilities] — what the executive layer actually does.
 *
 * The previous build was a six-card horizontal carousel headed "Built for
 * the executive level." Four problems, all fixed here:
 *
 *   1. THE HEADLINE ASSERTED A CATEGORY AND TAUGHT NOTHING. It could have
 *      sat above any section on any B2B site.
 *   2. NO TAXONOMY. Six features in a flat rail is a feature list, and an
 *      executive reads a feature list as "they have not decided what matters".
 *      They are now two labelled bands in the order the reader meets them:
 *      what has to hold before you believe a figure, and what has to hold
 *      after you act on one.
 *   3. HALF THE CONTENT WAS UNPUBLISHED. Only about 2.7 of 6 cards were ever
 *      on screen, the fourth was clipped mid-word, and executives do not
 *      scroll horizontal rails. It is a grid now, nothing hidden.
 *   4. A REAL CONTENT GAP. [the-gap] indicts ungoverned assistants for
 *      having "no access check" and then no capability answered that.
 *      "Your permissions come with the answer" is new, and it demonstrates
 *      entitlements the only way that lands: the same question, two seats,
 *      two different figures.
 *
 * The old first card ("The brief writes itself") is gone. It restated the
 * hero screen, so it spent the section's strongest position on a repeat.
 */

/* Each capability's evidence panel, keyed by content's `evidence`. */
const EVIDENCE: Record<EisEvidence, ReactNode> = {
  definition: <EvDefinition />,
  entity: <EvEntity />,
  permissions: <EvPermissions />,
  action: <EvAction />,
  planes: <EvPlanes />,
  record: <EvRecord />,
};

export default function EisCapabilities({ content }: { content: EisPage["capabilities"] }) {
  const BANDS = content.bands;
  return (
    <section
      id="capabilities"
      className="scroll-mt-24 bg-background px-6 pb-20 pt-20 sm:pt-24 lg:pb-28 lg:pt-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <ScrollReveal>
          <h2 className="max-w-[24ch] font-heading text-4xl font-medium leading-[1.05] tracking-tighter sm:text-5xl md:text-6xl">
            <span className="text-eis-body">{content.setup}</span>
            <br />
            <span className="text-eis-ink">{content.payoff}</span>
          </h2>
          <p className="mt-5 max-w-[620px] text-balance text-base leading-[1.5] tracking-tight text-eis-body sm:mt-6 sm:text-lg">
            {content.lede}
          </p>
        </ScrollReveal>

        {BANDS.map((band, bi) => (
          <div key={band.label} className={bi === 0 ? "mt-12 sm:mt-16" : "mt-14 sm:mt-20"}>
            <ScrollReveal>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-eis-line pb-3">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-eis-ink">
                  {band.label}
                </h3>
                <p className="text-sm text-eis-caption">{band.note}</p>
              </div>
            </ScrollReveal>

            <div className="grid gap-x-8 gap-y-10 pt-8 sm:grid-cols-2 lg:grid-cols-3">
              {band.items.map((c, i) => (
                <ScrollReveal key={c.lead} delay={i * 80}>
                  {/* No cell border. The band rule above and the evidence
                      panel's own edge give enough structure; boxing each
                      cell as well is the card grid this page keeps
                      deliberately avoiding. */}
                  <div className="flex h-full flex-col">
                    <p className="text-[17px] font-medium leading-snug tracking-tight text-eis-ink">
                      {c.lead}
                    </p>
                    <p className="mt-2 text-sm leading-[1.5] text-eis-caption">
                      {c.body}
                    </p>
                    <div className="mt-5">{EVIDENCE[c.evidence]}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
