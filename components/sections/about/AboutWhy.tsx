/*
 * [01] Why We Exist — The Problem We Could Not Unsee.
 * Narrative column beside a micro-mockup panel (§8a applies: hardcoded file
 * names and figures, hand-placed "trace not found" state) showing the two
 * failures the copy names: three conflicting spreadsheets and an untraceable
 * AI answer. Closes on the trust-problem pivot line.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";

const sheets = [
  { name: "Q3_report_v1.xlsx", total: "4.2M", rotate: "-rotate-2", z: "z-10" },
  { name: "Q3_report_v2.xlsx", total: "3.9M", rotate: "rotate-1", z: "z-20" },
  { name: "Q3_report_final.xlsx", total: "4.6M", rotate: "-rotate-1", z: "z-30" },
];

function SheetIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 10h16M10 4v16" />
    </svg>
  );
}

function ProblemPanel() {
  return (
    <div className="rounded-frame border border-subtle-stroke bg-primary-bg p-5 md:p-6">
      <p className="font-mono text-[9px] uppercase tracking-eyebrow text-overcast">
        Exhibit A &middot; three versions of the truth
      </p>
      <div className="mt-4 space-y-2.5">
        {sheets.map((sheet) => (
          <div
            key={sheet.name}
            className={`relative flex items-center gap-2.5 rounded-[8px] border border-subtle-stroke bg-white px-3 py-2.5 shadow-card ${sheet.rotate} ${sheet.z}`}
          >
            <span className="text-[#1E7145]">
              <SheetIcon />
            </span>
            <span className="min-w-0 flex-1 truncate font-mono text-[10.5px] text-ink">
              {sheet.name}
            </span>
            <span className="font-mono text-[10.5px] font-semibold text-ink">
              TOTAL&nbsp;{sheet.total}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-6 font-mono text-[9px] uppercase tracking-eyebrow text-overcast">
        Exhibit B &middot; the demo that could not explain itself
      </p>
      <div className="mt-3 rounded-[8px] border border-subtle-stroke bg-white p-3.5 shadow-card">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-overcast">
            AI pilot &middot; answer
          </span>
          <span className="inline-flex items-center rounded-[6px] border border-dashed border-default-stroke px-1.5 py-[2px] font-mono text-[8px] font-bold tracking-[0.06em] text-overcast">
            SOURCE: NOT FOUND
          </span>
        </div>
        <p className="mt-2 text-[13px] font-medium text-ink">
          &ldquo;Approve the expansion.&rdquo;
        </p>
        <div className="mt-2.5 flex items-center gap-3 border-t border-dashed border-lineSoft pt-2.5 font-mono text-[8.5px] uppercase tracking-[0.06em]">
          <span className="text-inkSoft">Demo: impressive</span>
          <span className="text-overcast">&middot;</span>
          <span className="text-overcast line-through decoration-overcast/60">Production</span>
        </div>
      </div>
    </div>
  );
}

export default function AboutWhy() {
  return (
    <section id="why-we-exist" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[01]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Why we exist</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Not a technology problem</span>
          </div>
          <h2 className="mt-5 max-w-[16em] text-heading-sm font-semibold text-ink md:text-heading-md">
            The problem we could not unsee.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <ScrollReveal delay={100}>
              <p className="max-w-[36em] text-lg leading-relaxed text-secondary-text">
                Teams working from three different spreadsheets. AI pilots that
                looked impressive in demos and fell apart in production because no
                one could trace the answer.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <p className="mt-10 max-w-[15em] text-[28px] font-semibold leading-snug tracking-tight text-ink md:text-[34px]">
                It was not a technology problem. It was a{" "}
                <span className="relative inline-block whitespace-nowrap">
                  trust problem.
                  <span
                    className="absolute -bottom-[0.04em] left-0 h-[0.09em] w-full rounded-full bg-blue/35"
                    aria-hidden
                  />
                </span>
              </p>
            </ScrollReveal>
            <ScrollReveal delay={220}>
              <p className="mt-10 max-w-[36em] border-t border-dashed border-lineSoft pt-8 text-lg leading-relaxed text-secondary-text">
                We left those roles to build something we would actually want to
                use. Something still running, and still trusted, ten years from now.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={180}>
            <ProblemPanel />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
