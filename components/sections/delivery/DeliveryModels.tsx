/*
 * [01] Engagement Models — Start With the Problem.
 * The page's one dark immersive break (a vault container floating in a white
 * section, the homepage HowWeDeliver idiom): ambient indigo/amber glows,
 * dot-grid-dark, and three "door" tiles. Each door leads with the client's
 * first-call problem (serif-italic pull-quote, Rule 3) and routes to its
 * model section. The facts that used to hide behind a hover-to-white flip
 * are now always on the tile — the doors are the page's routing decision,
 * and a routing decision the reader cannot read is decoration (touch has no
 * hover). Hover is polish only: lift, border glow, arrow slide. Figures
 * match the model sections (Rule 4); Product Engineering shows the derived
 * 10–20 WKS union so the two build paths never read as a race.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

type Model = {
  num: string;
  model: string;
  quote: string;
  line: string;
  href: string;
  factsLabel: string;
  facts: { k: string; v: string }[];
};

const models: Model[] = [
  {
    num: "01",
    model: "Akashic Deployment",
    quote: "Our data is fragmented and nobody trusts the final numbers.",
    line: "We bring the platform to you. Live in six weeks.",
    href: "#akashic-deployment",
    factsLabel: "Six-week rollout",
    facts: [
      { k: "Readiness audit", v: "WK 1–2" },
      { k: "Platform build", v: "WK 2–6" },
      { k: "Operational handover", v: "WK 6+" },
    ],
  },
  {
    num: "02",
    model: "Product Engineering",
    quote: "We need to ship a custom product, and a team to build it.",
    line: "We build it, on Akashic or on your own stack.",
    href: "#product-engineering",
    factsLabel: "What you get",
    facts: [
      { k: "Time to MVP", v: "10–20 WKS" },
      { k: "Akashic", v: "OPTIONAL" },
      { k: "Codebase", v: "YOURS" },
    ],
  },
  {
    num: "03",
    model: "Advisory & Co-Engineering",
    quote: "We need senior engineering bandwidth to move faster.",
    line: "Strategic audits, or our squad inside your sprints.",
    href: "#advisory-co-engineering",
    factsLabel: "How it runs",
    facts: [
      { k: "Strategic advisory", v: "2–4 WKS" },
      { k: "Architect-led squad", v: "1 + 4" },
      { k: "Deliverables, yours", v: "3" },
    ],
  },
];

export default function DeliveryModels() {
  return (
    <section id="engagement-models" className="scroll-mt-24 border-t border-lineSoft bg-background pt-12 pb-24 lg:pt-16 lg:pb-32">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[01]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Engagement models</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ One blueprint, three models</span>
          </div>
        </ScrollReveal>

        {/* Dark immersive container — the page's one dark break */}
        <ScrollReveal delay={100}>
          <div className="relative mt-10 overflow-hidden rounded-[20px] border border-white/10 bg-vault px-6 py-12 text-white shadow-2xl md:p-12 lg:mt-12 lg:p-16">
            <div className="dot-grid-dark pointer-events-none absolute inset-0 opacity-20" aria-hidden />
            <div
              className="pointer-events-none absolute left-1/4 top-0 h-[360px] w-[360px] animate-[softpulse_10s_infinite_alternate] rounded-full opacity-[0.12] blur-[90px]"
              style={{ background: "radial-gradient(circle, #3E63DD, transparent 75%)" }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-0 right-1/4 h-[360px] w-[360px] animate-[softpulse_13s_infinite_alternate] rounded-full opacity-[0.06] blur-[90px]"
              style={{ background: "radial-gradient(circle, #D9A034, transparent 75%)" }}
              aria-hidden
            />

            {/* Header inside the dark ground */}
            <div className="relative z-10 max-w-[38em]">
              <h2 className="font-heading text-[30px] font-semibold leading-[1.05] tracking-tighter text-white sm:text-[40px] md:text-[46px] lg:text-[50px]">
                Start with the problem. <span className="text-white/40">Not the product.</span>
              </h2>
              <p className="mt-6 max-w-[34em] text-[15px] leading-relaxed text-white/60 sm:text-base">
                <span className="text-white/85">Tell us the problem on the first call.</span> We map it
                to the right model and open with the Sovereign Blueprint. You never pick the wrong door.
              </p>
            </div>

            {/* The three doors */}
            <div className="relative z-10 mt-14 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3">
              {models.map((m) => (
                <Link
                  key={m.num}
                  href={m.href}
                  className="group/tile relative flex flex-col rounded-[14px] border border-white/10 bg-white/[0.03] p-6 text-white transition-all duration-300 ease-settle hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] hover:shadow-frame md:p-7"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue-300">
                      Model {m.num}
                    </span>
                    <span className="font-heading text-[52px] font-semibold leading-none text-white/15 md:text-[64px]">
                      {m.num}
                    </span>
                  </div>

                  <p className="mt-1 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-eyebrow text-white/40">
                    <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
                    You, on the first call
                  </p>
                  <p className="mt-2.5 font-display text-[17px] italic leading-snug text-white/85 md:text-[18px]">
                    {m.quote}
                  </p>

                  <div className="my-5 border-t border-white/10" />

                  <h3 className="font-heading text-[22px] font-semibold leading-snug tracking-tight md:text-[24px]">
                    {m.model}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/60">
                    {m.line}
                  </p>

                  {/* The facts, always on the door — a routing decision the
                      reader cannot read is decoration. */}
                  <div className="mt-auto pt-6">
                    <div className="border-t border-white/10 pt-4">
                      <p className="font-mono text-[10px] uppercase tracking-eyebrow text-white/40">
                        {m.factsLabel}
                      </p>
                      <ul className="mt-2.5 space-y-1.5">
                        {m.facts.map((row) => (
                          <li key={row.k} className="flex items-baseline justify-between gap-3 text-[12.5px]">
                            <span className="text-white/60">{row.k}</span>
                            <span className="whitespace-nowrap font-mono text-[11px] font-semibold text-white">
                              {row.v}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue-300">
                    View model
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform duration-300 group-hover/tile:translate-x-0.5" aria-hidden>
                      <path d="M1 5h11M8.5 1.5 12 5l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>

            {/* Closing thread — ties back to the hero */}
            <p className="relative z-10 mt-12 border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-eyebrow text-white/45">
              All three begin with the Sovereign Blueprint &middot; no wrong door
            </p>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
