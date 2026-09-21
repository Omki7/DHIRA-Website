"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

/* [questions] — the integration and platform objections this page used to
 * answer in two full sections.
 *
 * THE COPY IS THE STRONGEST ON THE PAGE and is kept almost verbatim. What
 * changed is the structure around it:
 *
 *   1. GROUPED. Nine questions in one flat list is a pile, and a reader
 *      cannot tell whether the one they care about is in it. They are now
 *      three labelled bands in the order a buyer works through them: what it
 *      is, whether the figures can be trusted, what it does to their systems.
 *   2. THE FIRST ANSWER IS OPEN. Every panel closed meant a reader saw nine
 *      question marks and no answers, with the single most important
 *      paragraph here (the read-only versus write-back reconciliation, which
 *      sounds like a contradiction until it is separated into two planes)
 *      hidden behind a toggle.
 *   3. LEFT ALIGNED at the page's measure, like every other section, rather
 *      than a narrow centred column.
 */

type Faq = { q: string; a: string };

const BANDS: { label: string; note: string; items: Faq[] }[] = [
  {
    label: "What it is",
    note: "Where EIS sits, and what it needs from you.",
    items: [
      {
        q: "Does EIS replace my ERP?",
        a: "No. Akashic EIS sits on top of the systems you already run. It reads them, connects what they each hold about the same account, and surfaces what matters. No rip and replace, no migration, no downtime.",
      },
      {
        q: "What is EIS built on?",
        a: "Akashic. The connectors that read your systems, the master data that resolves them into one record, the metric layer that makes revenue mean one thing in every region, the answer engine that cites its sources, and the governance layer that keeps the record of what was done. If Akashic is already in place, EIS is the layer above it, not a second platform.",
      },
      {
        /* Executives ask this before anything else, and every vendor dodges. */
        q: "What do you need from us?",
        a: "Two things, and it is fair to know them upfront. Someone has to own the metric definitions, because a governed number is a decision your organisation makes, not one we can make for you. And for each write-back action you want, someone with authority over that system has to agree to the scope. Read-only reporting can start well before either is finished. Write-back should not.",
      },
    ],
  },
  {
    label: "Whether you can trust a figure",
    note: "What is under the number when somebody disputes it.",
    items: [
      {
        q: "How do I know a figure is right?",
        a: "Click it. What opens is not a query string, because the query is never what people argue about. It is the metric definition, which entities are consolidated, whether intercompany is eliminated, the FX rate date, the as-at timestamp, which data quality tests passed, and the underlying records. When three teams produce three different revenue numbers, one of those lines is the reason, and this is where you find it.",
      },
      {
        /* The distinction that stops us being the villain from [the-gap]. */
        q: "How is your answer engine different from asking an AI chatbot?",
        a: "It does not write SQL against your raw tables. Questions resolve against the governed metric layer, so a question can only be answered in terms that have already been defined, tested, and permissioned. If a metric does not exist, EIS says so rather than inventing a plausible number. And because every answer is assembled from defined metrics, every answer can show its working. An ungoverned chatbot cannot do that, which is why it is fast and untrustworthy at the same time.",
      },
      {
        q: "Who can see what, and who can approve what?",
        a: "Akashic Governance decides. Access control, lineage, audit trail, and data residency sit under every screen. Approval rights are held separately from composition rights, so the person who composes an action cannot be the person who approves it. That segregation of duties is what makes the audit trail worth having.",
      },
    ],
  },
  {
    label: "What it does to your systems",
    note: "The part your CIO will want in writing.",
    items: [
      {
        /* Opened by default: the page makes both claims and they sound
           contradictory until the two planes are separated. */
        q: "You say read-only, then you say it writes to my ERP. Which is it?",
        a: "Both, on two separate paths. Ingestion is read-only across every connected system and never mutates a source record, which is the part that carries risk at scale. Write-back is a deliberately short list of named actions you define during implementation: a specific field on a specific object, executed by a scoped service principal with least privilege, behind an approval, with an idempotency key so approving twice cannot write twice. A system with no write actions configured stays read-only in every sense. You choose which systems leave that state.",
      },
      {
        q: "What happens when a write-back fails?",
        a: "It is recorded as a failure with the reason and the target system, the decision is held rather than silently retried, and the owner of the blocking system is notified. Nothing disappears. An action that was rejected is a finding about your permissions model, and you want to see it, not have it quietly repeated until it succeeds.",
      },
      {
        q: "Where does my data live, and where does it compute?",
        a: "Your records stay in the systems that own them. Where you already run a warehouse, we push computation down to it rather than copying data out. Deploy on cloud, on premises, or hybrid, wherever your architecture already lives, including data residency boundaries you have to honour by law.",
      },
    ],
  },
];

/* The one that opens on load. Keyed by question rather than index so
   reordering a band cannot silently open a different answer. */
const OPEN_BY_DEFAULT =
  "You say read-only, then you say it writes to my ERP. Which is it?";

export default function EisFaq() {
  const [open, setOpen] = useState<string | null>(OPEN_BY_DEFAULT);

  return (
    <section
      id="questions"
      className="scroll-mt-24 w-full bg-background px-6 pb-20 pt-20 sm:pt-24 lg:pb-28 lg:pt-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <ScrollReveal>
          <h2 className="font-heading text-4xl font-medium leading-[1.05] tracking-tighter text-eis-ink sm:text-5xl md:text-6xl">
            Questions.
          </h2>
          <p className="mt-5 max-w-[620px] text-balance text-base leading-[1.5] tracking-tight text-eis-body sm:mt-6 sm:text-lg">
            {/* Not "in the order they come up" any more: they are grouped, so
                claiming an order was inaccurate the moment the bands landed. */}
            The nine an executive actually asks, grouped the way a buyer works
            through them. Answered in full, including the two things we need
            from you.
          </p>
        </ScrollReveal>

        {BANDS.map((band, bi) => (
          <div key={band.label} className={bi === 0 ? "mt-12 sm:mt-16" : "mt-12 sm:mt-14"}>
            <ScrollReveal>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-eis-line pb-3">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-eis-ink">
                  {band.label}
                </h3>
                <p className="text-sm text-eis-caption">{band.note}</p>
              </div>
            </ScrollReveal>

            <div className="max-w-[860px]">
              {band.items.map((f) => {
                const isOpen = open === f.q;
                return (
                  <div key={f.q} className="border-b border-eis-line">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : f.q)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-4 text-left"
                    >
                      <span className="text-[15px] font-medium text-eis-ink">{f.q}</span>
                      {/* One glyph, rotated. A plus that becomes a cross reads
                          as the same control changing state; two icons read
                          as two controls. */}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                        className={`shrink-0 text-eis-body transition-transform duration-250 ease-settle ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </button>

                    {/* Grid-rows animates to the content's real height without
                        measuring it, and collapses cleanly to zero. */}
                    <div
                      className={`grid transition-all duration-400 ease-settle ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-5 pr-8 text-[15px] leading-relaxed text-eis-body">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
