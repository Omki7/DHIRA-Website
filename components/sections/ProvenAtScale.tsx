/**
 * DESIGN INTENT:
 * Section 03: Proven At Scale.
 * Light section on bg-white. India identity is a single quiet signal:
 * an Ashoka Chakra SVG watermark in neutral ink at opacity-[0.035].
 * Indians read it immediately; international clients see an elegant
 * geometric mandala. The copy ("India's national... Ministry of External
 * Affairs") handles the explicit India reference.
 * A faint warm glow (golden-amber, not saffron-coded) adds depth without
 * anchoring the section to any flag palette.
 *
 * Layout follows the same left-aligned pattern as all other sections.
 * Shape discipline (Rule 1): stats band uses gap-as-divider, not cards.
 * Rule 2 (✓ check): emitted only inside <FieldLedger />.
 * Rule 5 (dark section) is deliberately overridden here by user direction.
 */
import ScrollReveal from "@/components/ui/ScrollReveal";
import FieldLedger from "@/components/demos/FieldLedger";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

const STATS = [
  { figure: "5.75B+", label: "Learning Sessions Analysed" },
  { figure: "187M+", label: "Course Enrolments" },
  { figure: "4M+", label: "Cross-border Clearances" },
  { figure: "135", label: "Languages Served" },
];

/* Ashoka Chakra — 24 equally-spaced spokes, simplified for watermark use.
   Rendered in neutral ink at opacity-[0.035]: Indians recognise it
   immediately; international audiences see an elegant geometric mandala. */
function AshokaChakriWatermark() {
  const spokes = Array.from({ length: 24 }, (_, i) => {
    const rad = (i * 15 * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    return {
      x1: +(50 + 7 * cos).toFixed(3),
      y1: +(50 + 7 * sin).toFixed(3),
      x2: +(50 + 46 * cos).toFixed(3),
      y2: +(50 + 46 * sin).toFixed(3),
    };
  });

  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className="pointer-events-none absolute -right-20 top-0 h-[540px] w-[540px] opacity-[0.12] lg:-right-10"
      style={{ color: "#FF9933" }}
    >
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="50" cy="50" r="7" fill="currentColor" />
      <circle cx="50" cy="50" r="3.5" fill="none" stroke="white" strokeWidth="1.2" />
      {spokes.map((s, i) => (
        <line
          key={i}
          x1={s.x1} y1={s.y1}
          x2={s.x2} y2={s.y2}
          stroke="currentColor"
          strokeWidth="0.9"
        />
      ))}
    </svg>
  );
}

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

      {/* Ashoka Chakra watermark */}
      <AshokaChakriWatermark />

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
