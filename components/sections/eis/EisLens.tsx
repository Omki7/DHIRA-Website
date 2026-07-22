/*
 * [03] Your Lens — The Same Company, Three Different Mornings.
 * Restaged in Keytail-inspired dark sky glass aesthetics.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import EisLensInteractiveMockup from "@/components/demos/mockups/EisLensInteractiveMockup";

type Lens = {
  role: string;
  monogram: string;
  accent: string;
  tint: string;
  question: string;
  seesFirst: string[];
  decides: string[];
};

const lenses: Lens[] = [
  {
    role: "Chief executive",
    monogram: "CE",
    accent: "#3E63DD",
    tint: "rgba(62,99,221,0.2)",
    question: "What could take the firm down, and is the model shifting fast enough?",
    seesFirst: [
      "Cross-pillar exposure",
      "Renewals at risk",
      "Concentration against board policy",
      "Revenue per employee",
    ],
    decides: ["Escalate", "Approve a renewal", "Hold a key person"],
  },
  {
    role: "Chief financial officer",
    monogram: "CF",
    accent: "#8A78FF",
    tint: "rgba(138,120,255,0.2)",
    question: "What is stuck, and what is compressing?",
    seesFirst: [
      "Cash position",
      "Days sales outstanding",
      "Unbilled work",
      "Overdue receivables",
    ],
    decides: ["Raise the invoice", "Start collection", "Re-forecast"],
  },
  {
    role: "Head of delivery",
    monogram: "HD",
    accent: "#30A46C",
    tint: "rgba(48,164,108,0.2)",
    question: "Are projects healthy, and are the right people on them?",
    seesFirst: [
      "Projects gone red",
      "Single points of failure",
      "Bench ageing",
      "Service-level compliance",
    ],
    decides: ["Approve the change request", "Redeploy", "Name a successor"],
  },
];

function RowLabel({ text }: { text: string }) {
  return (
    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-white/40">
      {text}
    </p>
  );
}

function LensColumn({ lens }: { lens: Lens }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-frame border border-[#242D5A] bg-[#0D122B]/90 shadow-2xl backdrop-blur-md">
      <div className="h-[3px]" style={{ background: lens.accent }} aria-hidden />

      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <span
          className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[9px] font-mono text-[10px] font-bold border border-white/10"
          style={{ background: lens.tint, color: lens.accent }}
          aria-hidden
        >
          {lens.monogram}
        </span>
        <h3 className="text-[15px] font-semibold tracking-tight text-white">{lens.role}</h3>
      </div>

      <div className="px-5 py-3.5">
        <RowLabel text="The morning question" />
        <p className="mt-2 min-h-[42px] text-[13.5px] leading-relaxed text-white/70">
          &ldquo;{lens.question}&rdquo;
        </p>
      </div>

      <div className="border-t border-dashed border-white/10 px-5 py-3.5">
        <RowLabel text="Sees first" />
        <ul className="mt-2.5 space-y-1.5">
          {lens.seesFirst.map((item) => (
            <li key={item} className="flex items-start gap-2 text-[13px] leading-snug text-white">
              <span
                className="mt-[6px] h-[4px] w-[4px] shrink-0 rounded-full"
                style={{ background: lens.accent }}
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto border-t border-dashed border-white/10 px-5 py-3.5">
        <RowLabel text="Decides" />
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {lens.decides.map((verb) => (
            <span
              key={verb}
              className="rounded-[6px] border px-2 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.05em]"
              style={{ borderColor: `${lens.accent}66`, background: lens.tint, color: lens.accent }}
            >
              {verb}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function HandoffRail() {
  return (
    <div className="mt-6 overflow-hidden rounded-frame border border-[#242D5A] bg-[#0D122B]/90 shadow-2xl backdrop-blur-md">
      <div className="hidden px-5 pt-4 lg:block" aria-hidden>
        <svg viewBox="0 0 900 26" fill="none" className="h-[26px] w-full" preserveAspectRatio="none">
          {[150, 450, 750].map((x) => (
            <path key={x} d={`M ${x} 0 C ${x} 14, 450 12, 450 26`} stroke="#3E63DD" strokeWidth="1.2" opacity="0.6" />
          ))}
          {[150, 450, 750].map((x) => (
            <circle key={`n${x}`} cx={x} cy={0} r={2.5} fill="#0D122B" stroke="#60A5FA" strokeWidth="1.2" />
          ))}
        </svg>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-5 pb-4 pt-4 text-center lg:pt-1">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/40 bg-blue/20 px-3 py-1.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-blue-400 shadow-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" className="h-3 w-3" aria-hidden>
            <path d="M5 9V5h4M5 5l6 6M19 15v4h-4M19 19l-6-6" />
          </svg>
          Route to
        </span>
        <span className="text-[13px] leading-relaxed text-white/70">
          Any signal hands off to whichever loop should own it, with the context
          and the evidence intact.
        </span>
      </div>
    </div>
  );
}

export default function EisLens() {
  return (
    <section
      id="your-lens"
      className="scroll-mt-24 border-t border-white/10 bg-transparent pt-12 pb-24 lg:pt-16 lg:pb-32"
    >
      <ScrollRevealRail dark>
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-white/40">[03]</span>
              <span className="text-white/70">&nbsp;&nbsp;Your lens</span>
            </p>
            <span className="hidden text-white/40 sm:inline">/ One system, three loops</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-white md:text-heading-md lg:text-heading-lg">
            The same company. Three different mornings.
          </h2>
          <p className="mt-5 max-w-[40em] text-lg leading-relaxed text-white/70">
            A chief executive, a finance chief, and a delivery head answer for
            different outcomes and are interrupted by different things. EIS is one
            system running three operating loops, not one dashboard that everybody
            has to filter down to the fifth of it that concerns them.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 lg:mt-14">
            {lenses.map((lens) => (
              <LensColumn key={lens.role} lens={lens} />
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={180}>
          <HandoffRail />
        </ScrollReveal>

        <ScrollReveal delay={240}>
          <div className="mt-10">
            <EisLensInteractiveMockup />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={280}>
          <p className="mt-8 max-w-[34em] text-[17px] leading-relaxed text-white/70 md:text-[18px]">
            Same record. Same governance. Three different first screens.
          </p>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
