/**
 * DESIGN INTENT:
 * Section 05: Proven At Scale.
 * The singular dark-content inversion. bg-ink, border-white/10,
 * eyebrow text-white/45 — and the ONE auroral glow behind the field.
 *
 * Shape discipline (AGENTS.md Rule 1):
 * - STATS BAND keeps the gap-as-divider grid (gap-px + bg-white/10), NOT boxed
 *   cards. Numbers are oversized, count-up on reveal.
 * - The interactive centerpiece is <FieldLedger/>: a "national field ledger" —
 *   a thin live telemetry tape (running txns/sec + sparkline + Operational
 *   pill), a left "Standing Ledger" (deployment rows that lift + expand inline
 *   via grid-rows 0fr→1fr, with dim-on-hover siblings, blue left-edge accent),
 *   and a right "Ration Ladder" (vertical stack of 3 oversized ratio counters).
 *   NOT cards, NOT a bento grid. Each zone owns its own organic shape.
 * - The &#10003; check appears ONLY on the FieldLedger telemetry-tape badge
 *   (Rule 2's sanctioned location). The section itself emits no checks.
 * - Sector coverage badges stay as restrained chips below.
 */
import ScrollReveal from "./ScrollReveal";
import FieldLedger from "./FieldLedger";

const STATS = [
  { figure: "1.4B+", label: "Citizens Covered" },
  { figure: "National", label: "DPI Implementations" },
  { figure: "10B+", label: "Monthly Transactions" },
  { figure: "99.999%", label: "Platform Uptime" },
];

const SECTORS = [
  "Digital Identity",
  "Payments & Commerce",
  "Health & Welfare",
  "Data Empowerment",
];

export default function ProvenAtScale() {
  return (
    <section
      id="scale"
      aria-labelledby="scale-h"
      className="relative overflow-hidden bg-ink py-32 lg:py-40"
    >
      {/* Auroral glow — blurred, opacity-25 per design rules */}
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-96 w-full max-w-4xl -translate-x-1/2 opacity-25 blur-[120px]"
        style={{
          background:
            "linear-gradient(131.88deg, #dca3a5 7.36%, #70a1f0 81.74%)",
        }}
      />

      <div className="rail-container-dark relative z-10">
        {/* Eyebrow + headline */}
        <div className="mb-16 flex flex-col items-center text-center">
          <ScrollReveal>
            <div className="mb-10 flex items-center justify-center gap-2 border-b border-dashed border-white/10 pb-4 font-mono text-[11px] uppercase tracking-eyebrow text-white/45">
              <span className="text-white/60">[03]</span>
              <span>/</span>
              <span>PROVEN AT SCALE</span>
            </div>

            <h2
              id="scale-h"
              className="mx-auto max-w-[14em] text-[48px] font-semibold leading-[1.1] tracking-tighter text-white md:text-[56px] lg:text-[64px]"
            >
              Building the next generation of DPI.
            </h2>
            <p className="mt-6 max-w-[28em] text-lg leading-relaxed text-white/70">
              National-scale Digital Public Infrastructure, running in production. Open, interoperable, and built for billion-population scale.
            </p>
          </ScrollReveal>
        </div>

        {/* STATS BAND — gap-as-divider grid with oversized numbers */}
        <ScrollReveal delay={120}>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-white/10 bg-white/10 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-ink p-8 lg:p-10">
                <div className="text-4xl font-semibold tracking-tight tabular-nums text-white lg:text-5xl xl:text-6xl">
                  {s.figure}
                </div>
                <div className="mt-2 text-sm text-white/55">{s.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* FIELD LEDGER — interactive centerpiece, client child */}
        <div className="mt-12">
          <ScrollReveal delay={200}>
            <FieldLedger />
          </ScrollReveal>
        </div>

        {/* Sector coverage badges */}
        <ScrollReveal delay={300}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {SECTORS.map((sector) => (
              <span
                key={sector}
                className="rounded-btn border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/60"
              >
                {sector}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* Footer note */}
        <ScrollReveal delay={380}>
          <p className="mt-10 text-center text-sm leading-relaxed text-white/45">
            <span className="font-medium text-white/70">
              Open and interoperable.
            </span>{" "}
            Not a walled garden. Standard-driven infrastructure that empowers ecosystems.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}