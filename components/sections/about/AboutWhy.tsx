/*
 * [01] Why We Exist — The Problem We Could Not Unsee.
 * Narrative column beside two open line-art exhibits (un-boxed, careers
 * idiom; §8a applies to the hardcoded file names and totals): Exhibit A,
 * a client figure under three tilted spreadsheets that disagree; Exhibit
 * B, a flat-mouthed AI box whose impressive answer floats above a dashed
 * trace that breaks mid-air before it ever reaches a source. Closes on
 * the trust-problem pivot line. Copy unchanged.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import Bust from "@/components/demos/LineArtBust";

const sheets = [
  { name: "Q3_report_v1.xlsx", total: "4.2M", tilt: "-rotate-3", pos: "right-0 top-0" },
  { name: "Q3_report_v2.xlsx", total: "3.9M", tilt: "rotate-2", pos: "right-10 top-[64px]" },
  { name: "Q3_report_final.xlsx", total: "4.6M", tilt: "-rotate-1", pos: "right-2 top-[128px]" },
];

function SheetIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 10h16M10 4v16" />
    </svg>
  );
}

/* Exhibit A — three versions of the truth, hanging over one person. */
function SheetsExhibit() {
  return (
    <div className="relative mx-auto w-full max-w-[430px]">
      <svg viewBox="0 0 320 210" fill="none" aria-hidden className="w-full">
        <path
          d="M104 122 L150 44 M108 128 L188 84 M106 134 L166 130"
          className="stroke-blue-border animate-[dashmove_2.4s_linear_infinite]"
          strokeWidth={1.6}
          strokeDasharray="5 7"
          strokeLinecap="round"
        />
        <Bust cx={78} cy={146} r={16} tone="ink" smile={false} />
        <path d="M20 202 H300" className="stroke-lineSoft" strokeWidth={2} strokeLinecap="round" />
      </svg>
      {sheets.map((sheet) => (
        <div
          key={sheet.name}
          className={`absolute flex items-center gap-2 rounded-card border border-subtle-stroke bg-white/95 px-3 py-2 shadow-frame backdrop-blur-sm ${sheet.tilt} ${sheet.pos}`}
        >
          <span className="text-[#1E7145]">
            <SheetIcon />
          </span>
          <span className="font-mono text-[10px] text-ink">{sheet.name}</span>
          <span className="font-mono text-[10px] font-semibold text-ink">{sheet.total}</span>
        </div>
      ))}
    </div>
  );
}

/* Exhibit B — the answer arrives; the trace never does. */
function TraceExhibit() {
  return (
    <div className="relative mx-auto w-full max-w-[430px]">
      <svg viewBox="0 0 320 200" fill="none" aria-hidden className="w-full">
        {/* the AI box, flat-mouthed */}
        <g className="stroke-ink" strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round">
          <rect x="42" y="74" width="62" height="56" rx="8" />
          <path d="M73 74 V58" />
          <path d="M61 108 H85" />
        </g>
        <circle cx="61" cy="92" r="2" className="fill-ink" />
        <circle cx="85" cy="92" r="2" className="fill-ink" />
        <circle cx="73" cy="53" r="3.5" className="fill-blue animate-[ps-pulse_2s_infinite]" />
        {/* the trace, breaking before it reaches ground truth */}
        <path
          d="M172 66 C 158 92 150 108 147 124"
          className="stroke-blue animate-[dashmove_2s_linear_infinite]"
          strokeWidth={2}
          strokeDasharray="6 7"
          strokeLinecap="round"
        />
        <path d="M145 138 L144 146" className="stroke-overcast" strokeWidth={2} strokeLinecap="round" strokeDasharray="3 6" />
        <circle cx="144" cy="156" r="4.5" className="stroke-overcast" strokeWidth={1.8} fill="none" />
        {/* the person still waiting for the why */}
        <Bust cx={258} cy={140} r={15} tone="ink" smile={false} />
        <path d="M20 196 H300" className="stroke-lineSoft" strokeWidth={2} strokeLinecap="round" />
      </svg>
      <div className="absolute left-[34%] top-0 rotate-2 rounded-card border border-subtle-stroke bg-white/95 px-3.5 py-2 shadow-frame backdrop-blur-sm">
        <p className="text-[13px] font-medium text-ink">&ldquo;Approve the expansion.&rdquo;</p>
      </div>
      <div className="absolute bottom-[8%] left-[36%] -rotate-2 rounded-card border border-dashed border-default-stroke bg-white/95 px-2.5 py-1.5 shadow-card">
        <p className="font-mono text-[8.5px] font-bold uppercase tracking-[0.06em] text-overcast">Source: not found</p>
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
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            The problem we could not unsee.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
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

          <div className="space-y-12">
            <ScrollReveal delay={180}>
              <p className="mb-4 font-mono text-[9px] uppercase tracking-eyebrow text-overcast">
                Exhibit A &middot; three versions of the truth
              </p>
              <SheetsExhibit />
            </ScrollReveal>
            <ScrollReveal delay={240}>
              <p className="mb-4 font-mono text-[9px] uppercase tracking-eyebrow text-overcast">
                Exhibit B &middot; the demo that could not explain itself
              </p>
              <TraceExhibit />
              <p className="mt-4 flex items-center gap-3 font-mono text-[8.5px] uppercase tracking-[0.06em]">
                <span className="text-inkSoft">Demo: impressive</span>
                <span className="text-overcast">&middot;</span>
                <span className="text-overcast line-through decoration-overcast/60">Production</span>
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
