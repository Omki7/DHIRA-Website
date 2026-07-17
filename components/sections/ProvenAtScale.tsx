/**
 * DESIGN INTENT:
 * Section 03: Proven At Scale.
 * Light section on bg-white. India identity is a single quiet signal:
 * the shared brand-blue Ashoka Chakra ornament (demos/AshokaChakra, the
 * same slow-turning 24-spoke wheel used in CareersImpact), sat top-right.
 * Indians read it immediately; international clients see an elegant
 * geometric mandala. The copy ("India's national platforms") handles the
 * explicit India reference. A faint warm glow adds depth without anchoring
 * the section to any flag palette.
 *
 * Layout follows the same left-aligned pattern as all other sections.
 * Shape discipline (Rule 1): stats band uses gap-as-divider, not cards.
 * Rule 2 (✓ check): emitted only inside <FieldLedger />.
 * Rule 5 (dark section) is deliberately overridden here by user direction.
 */
import ScrollReveal from "@/components/ui/ScrollReveal";
import FieldLedger from "@/components/demos/FieldLedger";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import AshokaChakra from "@/components/demos/AshokaChakra";

const STATS = [
  { figure: "5.75B+", label: "Learning Sessions Analysed" },
  { figure: "187M+", label: "Course Enrolments" },
  { figure: "4M+", label: "Cross-border Clearances" },
  { figure: "135", label: "Languages Served" },
];

export default function ProvenAtScale() {
  return (
    <section
      id="scale"
      aria-labelledby="scale-h"
      className="relative overflow-hidden bg-white pt-12 pb-24 lg:pt-16 lg:pb-32"
    >
      {/* Single warm-amber glow — top-right. Not saffron-coded; reads as
          golden light. Creates depth without anchoring to any flag palette. */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(215,155,60,0.09), transparent 70%)" }}
      />

      {/* Ashoka Chakra — shared brand-blue rotating ornament (matches CareersImpact) */}
      <AshokaChakra className="pointer-events-none absolute -right-24 -top-16 h-[540px] w-[540px] opacity-50 lg:-right-12" />

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
          </ScrollReveal>
        </div>

        {/* STATS BAND — dark ink band for high-contrast anchor */}
        <ScrollReveal delay={120}>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-ink/10 bg-ink/10 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-ink p-8 lg:p-10">
                <div className="text-4xl font-semibold tracking-tight tabular-nums text-white lg:text-5xl xl:text-6xl">
                  {s.figure}
                </div>
                <div className="mt-2 text-sm font-medium text-white/55">{s.label}</div>
              </div>
            ))}
          </div>
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
