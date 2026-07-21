/*
 * [01] The Morning Brief — One Sentence, Three Systems.
 * The brief's anatomy: the AI-written warning with its three clauses fanning
 * down to the systems each came from (contracts, delivery, people), closing
 * on the 18-days-of-warning verdict. Demo data from the EIS prototype (§8a).
 */

import ScrollReveal from "@/components/ui/ScrollReveal";

const clauses = [
  { text: "renewal", system: "Contracts", detail: "MSA expires 22 Jun" },
  { text: "delivery", system: "Projects", detail: "Rollout 11 days over" },
  { text: "a key-person exit", system: "People", detail: "Lead architect, high risk" },
];

function BriefFan() {
  return (
    <svg viewBox="0 0 460 34" fill="none" aria-hidden className="block h-8 w-full">
      {[78, 230, 382].map((x, i) => (
        <g key={x}>
          <path d={`M ${78 + i * 152} 0 C ${78 + i * 152} 18, ${x} 16, ${x} 34`} stroke="#C8D2F5" strokeWidth="1.2" fill="none" />
        </g>
      ))}
      <path d="M 78 0 C 78 18, 78 16, 78 34" stroke="#3E63DD" strokeWidth="1.5" strokeDasharray="8 40" fill="none" opacity="0.85">
        <animate attributeName="stroke-dashoffset" values="48;0" dur="2.2s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

export default function EisBrief() {
  return (
    <section id="the-brief" className="scroll-mt-24 border-t border-lineSoft bg-background">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[01]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;The morning brief</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Written before you walk in</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            The brief is already written when you walk in.
          </h2>
          <p className="mt-5 max-w-[38em] text-lg leading-relaxed text-secondary-text">
            EIS does not hand you four dashboards and wish you luck. Every morning
            it writes the brief itself: what moved, what converged, and what needs
            you today. In plain language, with every claim traceable.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:mt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <ScrollReveal delay={100}>
            <p className="max-w-[30em] text-lg leading-relaxed text-secondary-text">
              The sentence on the right looks simple. It isn&rsquo;t. The renewal
              lives in your contract system. The delivery slip lives in your
              project tracker. The resignation risk lives in HR. No single system
              could have written it.
            </p>
            <p className="mt-6 max-w-[26em] text-[24px] font-semibold leading-snug tracking-tight text-ink md:text-[28px]">
              One sentence. Three systems.{" "}
              <span className="relative inline-block whitespace-nowrap">
                Eighteen days of warning.
                <span className="absolute -bottom-[0.04em] left-0 h-[0.09em] w-full rounded-full bg-blue/35" aria-hidden />
              </span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <div className="overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg p-6 md:p-7">
              <p className="font-mono text-[9px] uppercase tracking-eyebrow text-overcast">
                From this morning&rsquo;s brief
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-ink md:text-[17px]">
                &ldquo;Meridian Retail is now your single largest exposure:{" "}
                <span className="border-b-2 border-blue/50 font-semibold">renewal</span>,{" "}
                <span className="border-b-2 border-blue/50 font-semibold">delivery</span>, and{" "}
                <span className="border-b-2 border-blue/50 font-semibold">a key-person exit</span>{" "}
                converge on the same account in the next 18 days.&rdquo;
              </p>
              <BriefFan />
              <div className="grid grid-cols-3 gap-2">
                {clauses.map((clause) => (
                  <div key={clause.system} className="rounded-[9px] border border-subtle-stroke bg-white px-2.5 py-2 text-center shadow-card">
                    <div className="font-mono text-[8.5px] font-bold uppercase tracking-[0.08em] text-blue">
                      {clause.system}
                    </div>
                    <div className="mt-1 text-[10px] leading-snug text-inkSoft">{clause.detail}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 flex items-center gap-1.5 border-t border-dashed border-lineSoft pt-3 font-mono text-[8.5px] uppercase tracking-[0.08em] text-inkSoft">
                <span className="h-[5px] w-[5px] rounded-full bg-[#C0883A] animate-[ps-pulse_2s_infinite]" aria-hidden />
                Three separate systems &middot; one converged warning
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
