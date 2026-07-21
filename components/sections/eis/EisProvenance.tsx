/*
 * [02] Provenance — Click Any Number.
 * The prototype's signature trust mechanic recreated: a KPI figure with the
 * Data Provenance popover it opens — source, query, refresh, confidence bar,
 * and the underlying records. Demo data from the EIS prototype (§8a).
 */

import ScrollReveal from "@/components/ui/ScrollReveal";

function ProvenancePopover() {
  return (
    <div className="w-full max-w-[420px]">
      {/* the figure being questioned */}
      <div className="flex items-center justify-between rounded-[10px] border border-subtle-stroke bg-white px-4 py-3 shadow-card">
        <div>
          <div className="font-mono text-[8px] font-bold uppercase tracking-[0.08em] text-[#7C828C]">
            Meridian Retail &middot; ARR
          </div>
          <div className="mt-0.5 inline-block cursor-pointer border-b border-dashed border-blue/50 text-[22px] font-bold tracking-tight text-ink">
            ₹14.2 Cr
          </div>
        </div>
        <span className="rounded-[6px] border border-blue-border bg-blue-subtle px-2 py-1 font-mono text-[8px] font-bold text-blue">
          CLICKED
        </span>
      </div>

      {/* connector */}
      <div className="ml-10 h-3 w-px bg-[length:1px_8px] bg-repeat-y bg-[repeating-linear-gradient(180deg,#C8D2F5_0_4px,transparent_4px_8px)]" aria-hidden />

      {/* the popover */}
      <div className="overflow-hidden rounded-[12px] border border-subtle-stroke bg-white shadow-frame">
        <div className="flex items-center gap-2 border-b border-lineSoft bg-primary-bg px-3.5 py-2.5">
          <span className="text-[13px] text-blue" aria-hidden>&#8982;</span>
          <span className="flex-1 text-[11.5px] font-bold text-ink">Data provenance</span>
          <span className="text-[11px] text-overcast" aria-hidden>&#10005;</span>
        </div>
        <div className="divide-y divide-lineSoft text-[11px]">
          <div className="flex gap-3 px-3.5 py-2">
            <span className="w-[72px] shrink-0 pt-[1px] font-mono text-[8.5px] font-bold uppercase tracking-[0.05em] text-overcast">Source</span>
            <span className="font-medium text-ink">Financial ledger &middot; read-only</span>
          </div>
          <div className="flex gap-3 px-3.5 py-2">
            <span className="w-[72px] shrink-0 pt-[1px] font-mono text-[8.5px] font-bold uppercase tracking-[0.05em] text-overcast">Query</span>
            <code className="rounded-[4px] bg-blue-subtle px-1.5 py-0.5 font-mono text-[9.5px] text-blue">
              SUM(revenue) WHERE client = &lsquo;C01&rsquo;
            </code>
          </div>
          <div className="flex gap-3 px-3.5 py-2">
            <span className="w-[72px] shrink-0 pt-[1px] font-mono text-[8.5px] font-bold uppercase tracking-[0.05em] text-overcast">Refresh</span>
            <span className="font-medium text-ink">2 minutes ago</span>
          </div>
          <div className="flex items-center gap-3 px-3.5 py-2">
            <span className="w-[72px] shrink-0 font-mono text-[8.5px] font-bold uppercase tracking-[0.05em] text-overcast">Confidence</span>
            <span className="flex items-center gap-2">
              <span className="font-bold text-[#1B7A47]">High &middot; 94%</span>
              <span className="relative h-[5px] w-14 overflow-hidden rounded-full bg-tertiary-bg">
                <span className="absolute inset-y-0 left-0 w-[94%] rounded-full bg-[#30A46C]" />
              </span>
            </span>
          </div>
          <div className="flex gap-3 px-3.5 py-2">
            <span className="w-[72px] shrink-0 pt-[1px] font-mono text-[8.5px] font-bold uppercase tracking-[0.05em] text-overcast">Records</span>
            <span className="flex flex-wrap gap-1">
              {["INV-2026-0412", "INV-2026-0388", "SOW-04"].map((rec) => (
                <span key={rec} className="rounded-[5px] border border-subtle-stroke bg-primary-bg px-1.5 py-[1px] font-mono text-[9px] text-blue">
                  {rec}
                </span>
              ))}
            </span>
          </div>
        </div>
        <div className="border-t border-lineSoft bg-primary-bg px-3.5 py-2 text-[9.5px] text-inkSoft">
          Click the figure to open the source record.
        </div>
      </div>
    </div>
  );
}

export default function EisProvenance() {
  return (
    <section id="provenance" className="scroll-mt-24 border-t border-lineSoft bg-background">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[02]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Provenance</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ The board test</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Click any number. It shows its working.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:mt-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <ScrollReveal delay={100}>
            <p className="max-w-[32em] text-lg leading-relaxed text-secondary-text">
              Every figure in EIS is underlined for a reason. Click it, and it
              answers the question your board will ask: where did this come from?
              The source system, the exact query, when it was last refreshed, how
              confident the extraction is, and the underlying records themselves.
            </p>
            <p className="mt-6 max-w-[30em] text-lg leading-relaxed text-secondary-text">
              Numbers your team cannot defend do not make it to the screen.
              Low-confidence sources are flagged, not hidden.
            </p>
            <p className="mt-8 flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-eyebrow text-inkSoft">
              <span className="h-[5px] w-[5px] rounded-full bg-blue/60" aria-hidden />
              The trust layer that runs every Akashic deployment
            </p>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <div className="flex justify-center lg:justify-end">
              <ProvenancePopover />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
