/**
 * DESIGN INTENT:
 * Section 03: Proven At Scale.
 * Light section on bg-white. India identity is a single quiet signal:
 * the shared brand-blue Ashoka Chakra ornament (demos/AshokaChakra, the
 * same slow-turning 24-spoke wheel used in CareersImpact) — sized and
 * placed identically to CareersImpact (190/210/230px, inline beside the
 * headline, full opacity), per user direction 17 Jul: the earlier 540px
 * background-watermark treatment read as far too big.
 * Indians read it immediately; international clients see an elegant
 * geometric mandala. The copy ("India's national platforms") handles the
 * explicit India reference.
 *
 * Layout follows the same left-aligned pattern as all other sections.
 * Shape discipline (Rule 1): stats band uses the site-wide StatBand recipe
 * (see components/ui/StatBand.tsx) — bordered light frame, dashed dividers,
 * pulsing-dot eyebrows, dashed footer caption. Same chrome as CareersImpact,
 * AkashicScale, and the Delivery/About/EIS/Life/Knowledge proof sections.
 * Rule 2 (✓ check): emitted only inside <FieldLedger />.
 */
import ScrollReveal from "@/components/ui/ScrollReveal";
import FieldLedger from "@/components/demos/FieldLedger";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import AshokaChakra from "@/components/demos/AshokaChakra";
import StatBand from "@/components/ui/StatBand";

const STATS = [
  { label: "National education platform", figure: "5.75B+", sublabel: "Learning sessions analysed" },
  { label: "National education platform", figure: "187M+", sublabel: "Course enrolments" },
  { label: "Workforce platform", figure: "4M+", sublabel: "Cross-border clearances" },
  { label: "Workforce platform", figure: "135", sublabel: "Languages served" },
];

export default function ProvenAtScale() {
  return (
    <section
      id="scale"
      aria-labelledby="scale-h"
      className="relative overflow-hidden bg-white pt-12 pb-24 lg:pt-16 lg:pb-32"
    >
      <ScrollRevealRail className="z-10">
        {/* Eyebrow + headline — left-aligned */}
        <div className="mb-14">
          <ScrollReveal>
            <div className="mb-10 flex items-center justify-between border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
              <span>
                <span className="text-overcast">[03]</span>
                &nbsp;&nbsp;PROVEN AT SCALE
              </span>
              <span className="text-overcast">/ PRODUCTION DEPLOYMENT</span>
            </div>

            {/* Headline beside the chakra — same grid, sizes, and full
                opacity as CareersImpact's [01] The Work */}
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
              <div>
                <h2
                  id="scale-h"
                  className="max-w-[14em] text-[48px] font-semibold leading-[1.1] tracking-tighter text-ink md:text-[56px] lg:text-[64px]"
                >
                  Deployed at national scale.
                </h2>
                <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-inkSoft">
                  The intelligence layer inside two of India&apos;s national platforms.
                  <br className="hidden sm:block" />
                  In production, at population scale.
                </p>
              </div>
              <div className="mx-auto w-[190px] sm:w-[210px] lg:mr-4 lg:w-[230px]">
                <AshokaChakra className="w-full" />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* STATS BAND — site-wide StatBand recipe */}
        <ScrollReveal delay={120}>
          <StatBand items={STATS} caption="Where Akashic already runs · public-record numbers" />
        </ScrollReveal>

        {/* FIELD LEDGER — interactive centerpiece */}
        <div className="mt-12">
          <ScrollReveal delay={200}>
            <FieldLedger />
          </ScrollReveal>
        </div>

        {/* Footer note */}
        <ScrollReveal delay={300}>
          <p className="mt-10 text-sm leading-relaxed text-overcast">
            <span className="font-medium text-inkSoft">
              The intelligence layer. Not the application.
            </span>{" "}
            Embedded inside existing systems without disrupting core infrastructure, turning raw operational data into decision-ready insight.
          </p>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
