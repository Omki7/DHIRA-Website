"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

type Deliverable = {
  num: string;
  title: string;
  description: string;
  href: string;
  /* Revealed on hover, once the tile turns white. Every row is lifted from
     the matching /delivery model section (Rule 4: no invented figures) — the
     white state used to repeat the description, which wasted the space it
     had just opened up. */
  revealLabel: string;
  reveal: { k: string; v: string }[];
};

const deliverables: Deliverable[] = [
  {
    num: "1",
    title: "Platform Deployment",
    description:
      "We deploy Akashic in your environment, connect raw sources, and stand up your governed knowledge layer.",
    href: "/delivery#akashic-deployment",
    revealLabel: "Six-week rollout",
    reveal: [
      { k: "System readiness audit", v: "WK 1–2" },
      { k: "Platform build", v: "WK 2–6" },
      { k: "Operational handover", v: "WK 6+" },
    ],
  },
  {
    num: "2",
    title: "Product Engineering",
    description:
      "We build production-grade applications to your specification. Akashic optional.",
    href: "/delivery#product-engineering",
    revealLabel: "What you get",
    /* No head-to-head here, by decision.

       These rows used to carry both build paths as separate weeks figures —
       "Built on Akashic 12–20 WKS" against "Built on your stack 10–16 WKS" —
       which made our own platform look like the slower option. The two are not
       the same job: the Akashic path's weeks include standing up the data
       layer, knowledge layer and AI runtime, where the your-stack path builds
       an application on a foundation that already exists. Relabelling the rows
       to carry that scope did not save it. Two numbers stacked in a column read
       as a race whatever the labels say, and a three-row hover on a homepage
       teaser has no room to explain a scope difference.

       So the comparison stays on /delivery, where it has the space, and this
       tile states the one thing the section is actually about instead.

       `10–20 WKS` is DERIVED — the union of /delivery's two published ranges
       (10–16 and 12–20), not a figure lifted verbatim. True for either path.
       If a literally-sourced figure is ever required here, use "FROM 10 WKS". */
    reveal: [
      { k: "Time to MVP", v: "10–20 WKS" },
      { k: "Akashic", v: "OPTIONAL" },
      { k: "Codebase ownership", v: "YOURS" },
    ],
  },
  {
    num: "3",
    title: "Advisory & Co-Engineering",
    description:
      "We audit the architecture, or embed senior squads inside your sprints to build internal capability.",
    href: "/delivery#advisory-co-engineering",
    revealLabel: "How it runs",
    /* "D-01…03" was an internal reference nobody outside /delivery can decode —
       it is three named deliverables there (readiness audit, vendor evaluation,
       sovereign blueprint), so the homepage just says how many. "Co-engineering
       squad 1 + 4" was equally opaque; /delivery calls it an architect-led
       squad, which is what makes the 1 read as the architect. */
    reveal: [
      { k: "Strategic advisory", v: "2–4 WKS" },
      { k: "Architect-led squad", v: "1 + 4" },
      { k: "Advisory deliverables", v: "3" },
    ],
  },
];

export default function HowWeDeliver() {
  return (
    <section
      id="delivery"
      className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F5FE_16%,#F1F5FE_84%,#FFFFFF_100%)] pt-10 pb-12 lg:pt-14 lg:pb-16 overflow-hidden"
    >
      <ScrollRevealRail>
        {/* ── Outer Section Header Block ── */}
        <ScrollReveal>
          <div className="flex items-center border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span>
              {/* "HOW", not "WHAT": the minimap rail, the nav and this file
                  all said some version of "how we deliver" while the eyebrow
                  said "what", and the rail is on screen at the same time. */}
              <span className="text-overcast font-mono">[04]</span>
              &nbsp;&nbsp;HOW WE DELIVER
            </span>
          </div>
        </ScrollReveal>

        {/* ── Immersive Dark Container ── */}
        <ScrollReveal delay={100}>
          <div className="group/container relative mt-8 lg:mt-10 overflow-hidden rounded-[20px] border border-white/10 bg-vault px-6 py-12 md:p-12 lg:p-16 text-white shadow-2xl transition-all duration-500 ease-settle">
            {/* Custom dot-grid background */}
            <div className="dot-grid-dark absolute inset-0 opacity-20 pointer-events-none" />

            {/* Ambient glows (indigo/amber) */}
            <div
              className="absolute left-1/4 top-1/4 h-[350px] w-[350px] rounded-full blur-[80px] opacity-[0.1] pointer-events-none animate-[softpulse_10s_infinite_alternate]"
              style={{
                background: "radial-gradient(circle, #3E63DD, transparent 75%)",
              }}
            />
            <div
              className="absolute right-1/4 bottom-1/4 h-[350px] w-[350px] rounded-full blur-[80px] opacity-[0.06] pointer-events-none animate-[softpulse_12s_infinite_alternate]"
              style={{
                background: "radial-gradient(circle, #D9A034, transparent 75%)",
              }}
            />

            {/* Split layout: text left, empty right */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-9 flex flex-col items-start">
                {/* One line by direction: the headline sizes down a step at each
                    breakpoint so "We own the delivery. End-to-end." never wraps. */}
                <h3 className="text-[30px] sm:text-[40px] md:text-[46px] lg:text-[52px] font-semibold leading-[1.05] tracking-tighter text-white font-heading">
                  We own the delivery. <span className="text-white/40">End-to-end.</span>
                </h3>

                {/* The first sentence used to live in tile 2's body copy
                    ("...or on the stack you have already chosen"), which is the
                    smallest type in the section — while being the fact that
                    reframes the whole company: the platform is not a
                    precondition for working with us. Two of the three models
                    below do not involve Akashic at all, so if the reader is
                    still reading "delivery" as "delivery of Akashic", the grid
                    contradicts its own headline. It leads now. */}
                {/* "Three engagement models" was cut: there are three numbered
                    cards directly below saying so, and the sentence was
                    spending its opening on a fact the layout already gives
                    away. What is left is the only line here the reader cannot
                    get from the grid. */}
                <p className="mt-6 max-w-[34em] text-[15px] sm:text-base leading-relaxed text-white/60 font-sans">
                  <span className="text-white/85">
                    Deploy Akashic, or build on the stack you already run.
                  </span>{" "}
                  One accountable team, either way.
                </p>

                <div className="mt-8">
                  <Link
                    href="/delivery"
                    className="inline-flex items-center gap-2.5 px-6 h-11 bg-white text-vault hover:bg-white/90 active:scale-[0.98] font-semibold text-sm rounded-full transition-all duration-200 shadow-[0_4px_12px_rgba(255,255,255,0.1)] group"
                  >
                    <span>Explore delivery</span>
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-vault text-white text-[10px] transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </div>
              </div>
              <div className="hidden lg:col-span-3 lg:block" aria-hidden="true" />
            </div>

            {/* 3-Column Cards Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 md:mt-24">
              {deliverables.map((item) => (
                <Link
                  key={item.num}
                  href={item.href}
                  className="group/tile relative flex flex-col p-6 md:p-8 rounded-[12px] border border-white/5 bg-white/[0.02] hover:bg-white text-white hover:text-ink transition-all duration-300 ease-settle cursor-pointer shadow-card hover:shadow-frame"
                >
                  <span className="font-heading text-[64px] md:text-[80px] font-semibold leading-none text-white/20 group-hover/tile:text-ink/20 transition-colors duration-300">
                    {item.num}
                  </span>
                  
                  {/* Thin Divider Line */}
                  <div className="my-5 border-t border-white/10 group-hover/tile:border-lineSoft transition-colors duration-300" />
                  
                  <h4 className="text-[22px] md:text-[26px] font-semibold tracking-tight leading-snug font-heading transition-colors duration-300">
                    {item.title}
                  </h4>

                  <p className="mt-3 text-[15px] leading-relaxed text-white/70 group-hover/tile:text-secondary-text transition-colors duration-300 font-sans">
                    {item.description}
                  </p>

                  {/* WAS HOVER-ONLY, NOW ALWAYS ON (23 Jul 2026). These three
                      rows are the only place the homepage says what you
                      actually buy — weeks to MVP, who owns the codebase, how
                      the squad is shaped — and they were behind
                      `opacity-0 group-hover/tile:opacity-100`. On touch there
                      is no hover, so on every phone and tablet this content
                      did not exist at all, on the section that answers the
                      reader's most concrete question.

                      The slot keeps its fixed height and `mt-auto` so the
                      three tiles stay the same height regardless of row count.
                      Every colour now has a dark resting state and flips to
                      its light counterpart when the tile turns white — that
                      pairing is what the old markup got for free by only ever
                      being visible in the white state. */}
                  <div className="mt-auto h-[132px] pt-6">
                    <div className="h-full">
                      <div className="border-t border-white/10 pt-4 transition-colors duration-300 ease-settle group-hover/tile:border-lineSoft">
                        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-white/40 transition-colors duration-300 ease-settle group-hover/tile:text-overcast">
                          {item.revealLabel}
                        </p>
                        <ul className="mt-2.5 space-y-1.5">
                          {item.reveal.map((row) => (
                            <li
                              key={row.k}
                              className="flex items-baseline justify-between gap-3 text-[12.5px]"
                            >
                              <span className="text-white/55 transition-colors duration-300 ease-settle group-hover/tile:text-secondary-text">
                                {row.k}
                              </span>
                              <span className="whitespace-nowrap font-mono text-[11px] font-semibold text-white transition-colors duration-300 ease-settle group-hover/tile:text-ink">
                                {row.v}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
