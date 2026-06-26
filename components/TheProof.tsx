/**
 * DESIGN INTENT:
 * Section 08: The Proof.
 * A verdict ledger — not a comparison table. Each row eliminates the old state
 * (struck, small, ghost-gray) and replaces it with a large, confident declaration.
 * The asymmetry IS the design: diminished "before" on the left, commanding "after"
 * taking over the right. The column header "PRIOR STATE" is itself struck through —
 * even the concept is being deleted.
 *
 * Shape discipline (AGENTS.md Rule 1):
 * - Ledger shell: rounded-frame, two-zone rows, hairline rules. No cards.
 * - The ✓ check appears ONLY on the top-bar badge (Rule 2).
 * - No KPI stat boxes — removed; the shifts themselves are the evidence.
 */

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import ProofComparison from "./ProofComparison";

export default function TheProof() {
  return (
    <section
      id="proof"
      className="overflow-hidden border-t border-lineSoft bg-white py-32 lg:py-40 font-sans"
    >
      <div className="rail-container">

        {/* Header */}
        <ScrollReveal>
          <div className="mb-10 flex items-center gap-2 border-b border-dashed border-lineSoft pb-4 font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span className="text-overcast">[06]</span>
            <span>/</span>
            <span>THE PROOF</span>
          </div>

          <h2 className="max-w-[16em] text-[48px] font-semibold leading-[1.1] tracking-tighter text-ink md:text-[56px] lg:text-[64px]">
            See the difference.
          </h2>
          <p className="mt-5 max-w-[38em] text-lg leading-relaxed text-inkSoft">
            The same organisation, two realities. Drag across and watch scattered, conflicting data resolve into one governed source of truth.
          </p>
        </ScrollReveal>

        {/* Interactive Comparison Component */}
        <ScrollReveal delay={90}>
          <ProofComparison />
        </ScrollReveal>

        {/* Footer note */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mt-6 md:mt-8 max-w-[1100px] mx-auto">
          <ScrollReveal delay={220}>
            <p className="text-sm leading-relaxed text-inkSoft max-w-[54ch]">
              <span className="font-medium text-ink">Left,</span> every team, tool and report stands alone: duplicated, conflicting, slow to trust. <span className="font-medium text-ink">Right,</span> one governed core every system draws from.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={280}>
            <Link href="#platform" className="btn-primary whitespace-nowrap">
              See how the foundation works
            </Link>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
