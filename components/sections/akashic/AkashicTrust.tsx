/*
 * [05] Enterprise Trust — one answer, four checks.
 * The payoff of [01]: the same South-region answer sits at the top as an
 * artifact, and four live product screens show it being verified. Each
 * check leads with a plain-language question anyone can follow; the screen
 * below it is a full app window (AkashicTrustScreensMockup, §8a) in the
 * same chrome and demo world as the hero screens, so the checks read as
 * the product, not as marketing boxes.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  ROLES_SCREEN_HTML,
  LINEAGE_SCREEN_HTML,
  AUDIT_SCREEN_HTML,
  RESIDENCY_SCREEN_HTML,
} from "@/components/demos/mockups/AkashicTrustScreensMockup";

const checks = [
  {
    term: "Access control",
    question: "Who can see it?",
    line: "Permissions follow the person at every layer, not just the login screen.",
    html: ROLES_SCREEN_HTML,
  },
  {
    term: "Lineage",
    question: "Where did each number come from?",
    line: "Pull on any figure and the full trail comes with it, down to the document.",
    html: LINEAGE_SCREEN_HTML,
  },
  {
    term: "Audit trail",
    question: "Who has touched it?",
    line: "A timestamped record of every view, change, and export. Always on.",
    html: AUDIT_SCREEN_HTML,
  },
  {
    term: "Data residency",
    question: "Where did the data stay?",
    line: "Deploy in-country, on your cloud or on your premises. Nothing leaves.",
    html: RESIDENCY_SCREEN_HTML,
  },
];

export default function AkashicTrust() {
  return (
    <section id="trust" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-overcast">[05]</span>
            <span className="text-inkSoft">&nbsp;&nbsp;Enterprise trust</span>
          </p>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            An answer you can&rsquo;t trace is just an opinion.
          </h2>
          <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-secondary-text">
            Every answer Akashic produces has already passed four checks before anyone
            can act on it. Not because someone remembered to run them: because Akashic
            can&rsquo;t produce an answer that hasn&rsquo;t.
          </p>
        </ScrollReveal>

        <div className="mt-12 lg:mt-14">
          {/* The artifact under inspection */}
          <ScrollReveal>
            <div className="mx-auto max-w-[640px] overflow-hidden rounded-[12px] bg-white ring-1 ring-[#0B1440]/10 shadow-frame">
              <div className="flex items-center gap-1.5 border-b border-[#EBEEF4] bg-[#FAFBFC] px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#30A46C] animate-[ps-pulse_2s_infinite]" aria-hidden />
                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-overcast">
                  The answer someone acts on
                </span>
                <span className="ml-auto font-mono text-[9px] text-overcast">09:41</span>
              </div>
              <p className="px-4 py-3.5 text-[14.5px] font-semibold leading-snug text-ink sm:text-[15px]">
                South is 8% behind target because two distributor renewals stalled in July.
              </p>
            </div>
            <span className="mx-auto block h-4 w-px bg-blue-border" aria-hidden />
            <p className="text-center font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
              Four checks, built in
            </p>
            <span className="mx-auto block h-4 w-px bg-blue-border" aria-hidden />
          </ScrollReveal>

          {/* The four checks, each shown as a live screen of the product */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-2">
            {checks.map((check, i) => (
              <ScrollReveal key={check.term} delay={80 + i * 80}>
                <div className="flex h-full flex-col">
                  <p className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em] text-overcast">
                    {check.term}
                  </p>
                  <h3 className="mt-1.5 text-[17px] font-semibold tracking-tight text-ink">
                    {check.question}
                  </h3>
                  <p className="mt-1 text-[13px] leading-snug text-inkSoft">{check.line}</p>
                  <div className="mt-3.5 overflow-hidden rounded-[12px] border border-[#E9EAEE] bg-white shadow-frame">
                    <div className="overflow-x-auto">
                      <div
                        className="h-[340px] min-w-[460px]"
                        dangerouslySetInnerHTML={{ __html: check.html }}
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal>
          <div className="mt-16 flex flex-col items-center text-center lg:mt-20">
            <p className="max-w-[22em] text-2xl font-semibold leading-snug tracking-tight text-ink md:text-[28px]">
              This is what makes an answer defensible, not just delivered.
            </p>
            <Link href="#open" className="btn-primary mt-8">
              See what you&rsquo;d take with you
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
