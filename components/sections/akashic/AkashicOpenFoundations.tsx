/*
 * [06] Open architecture — modular, open, and yours to leave.
 * The chapter that answers the lock-in fear: use only the modules you
 * need, build on top of the platform, and walk away with everything if
 * the day comes. Redesigned Jul 2026 (twice): the simulated `akashic.export`
 * window restated the commitments in UI costume; a bare typographic pass
 * then floated with no designed object. Final shape is the house card —
 * capillary, hairline-divided 2×2 of the four commitments, and the
 * portability manifest as the card's footer strip, exactly the anatomy
 * every other card on this page uses. Deliberately no vendor / technology
 * names here (user direction, Jul 2026): the promise is portability in
 * plain business language, not a stack tour.
 */

import { Fragment } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Capillary } from "@/components/sections/akashic/AkashicCardChrome";

const commitments = [
  {
    title: "Modular by design",
    desc: "Use one module or all seven. What you don’t deploy, you don’t pay for, and don’t have to work around.",
    glyph: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <path d="M17.5 14v7M14 17.5h7" />
      </>
    ),
  },
  {
    title: "Open, not a black box",
    desc: "Every table, transform, and metric definition is readable by tools you already own — no proprietary engine in the middle.",
    glyph: (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    title: "Yours to extend",
    desc: "Open interfaces at every layer. Build on top of Akashic without asking us for an API.",
    glyph: (
      <>
        <path d="M15 4h5v5M9 20H4v-5" />
        <path d="M20 4l-6 6M4 20l6-6" />
      </>
    ),
  },
  {
    title: "Yours to leave",
    desc: "Your data and your work stay in open formats. Take all of it to another platform, any time.",
    glyph: (
      <>
        <path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5" />
        <path d="M3 12h11M11 8l4 4-4 4" />
      </>
    ),
  },
];

/* Hairline placement for the 2×2: top borders on mobile stacking, the
   cross of dividers on sm+. Index-driven so the grid stays one card. */
const cellBorders = [
  "",
  "border-t border-card-divide sm:border-t-0 sm:border-l",
  "border-t border-card-divide",
  "border-t border-card-divide sm:border-l",
];

/* What you carry out when you leave — stated as one plain line of type
   in the card's footer strip. No mock export screen, no tags: the
   confidence is in saying it simply. */
const assets = [
  "Your raw and unified data",
  "Your models and pipelines",
  "Your trained ML models",
  "Your dashboards and reports",
  "Your knowledge graph",
];

export default function AkashicOpenFoundations() {
  return (
    <section id="open" className="scroll-mt-24 bg-primary-bg">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-overcast">[06]</span>
            <span className="text-inkSoft">&nbsp;&nbsp;Open architecture</span>
          </p>
          <h2 className="mt-5 text-balance text-heading-sm font-semibold text-ink md:text-heading-md">
            Open by design. Yours to leave.
          </h2>
          <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-secondary-text">
            Most platforms are easy to enter and expensive to leave. Akashic is built
            the other way round: open formats at every layer, so the work you do here
            stays yours, and the day you move on, it moves with you.
          </p>
        </ScrollReveal>

        {/* One house card: four commitments in a hairline 2×2, manifest as footer */}
        <ScrollReveal delay={80}>
          <div className="mx-auto mt-12 max-w-[1000px] lg:mt-14">
            <div className="overflow-hidden rounded-outer border border-card-line bg-white shadow-card">
              <Capillary />

              <div className="grid sm:grid-cols-2">
                {commitments.map((c, i) => (
                  <div key={c.title} className={`px-6 py-6 lg:px-8 lg:py-7 ${cellBorders[i]}`}>
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-tile border border-blue/20 bg-gradient-to-br from-[#E4EAFF] to-[#D4DEFF] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue"
                          aria-hidden
                        >
                          {c.glyph}
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[15px] font-semibold tracking-tight text-ink">{c.title}</h3>
                        <p className="mt-1 text-[13px] leading-relaxed text-inkSoft">{c.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* The manifest: what leaves with you, said in one line of type */}
              <div className="border-t border-card-divide bg-panel/70 px-6 py-5 lg:px-8">
                <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-inkSoft">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue/60" aria-hidden />
                  If you ever leave, you take
                </p>
                <p className="mt-2.5 text-[15px] font-medium leading-relaxed tracking-tight text-ink">
                  {assets.map((a, i) => (
                    <Fragment key={a}>
                      <span className="whitespace-nowrap">{a}</span>
                      {i < assets.length - 1 && (
                        <span className="px-1.5 text-overcast" aria-hidden>
                          &middot;
                        </span>
                      )}
                    </Fragment>
                  ))}
                </p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-secondary-text">
                  Take it to any platform. No exit fee, no data held hostage.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Closer */}
        <ScrollReveal>
          <p className="mx-auto mt-12 max-w-[22em] text-center text-2xl font-semibold leading-snug tracking-tight text-ink md:text-[28px] lg:mt-14">
            A platform you can&rsquo;t leave was never really yours.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
