/*
 * [06] Open architecture — modular, open, and yours to leave.
 * The chapter that answers the lock-in fear: use only the modules you
 * need, build on top of the platform, and walk away with everything if
 * the day comes. The right-hand `akashic.export` panel is SIMULATED
 * PRODUCT UI (AGENTS.md §8a). Deliberately no vendor / technology names
 * here (user direction, Jul 2026): the promise is portability in plain
 * business language, not a stack tour.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";

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
    desc: "Every table, transform, and metric definition is readable by tools you already own. The standards are named in full in [08].",
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

/* What you carry out when you leave. Plain-language asset lines with a
   generic portability descriptor. No product / vendor names by design. */
const assets = [
  { name: "Your raw and unified data", tag: "open tables" },
  { name: "Your models and pipelines", tag: "portable definitions" },
  { name: "Your trained ML models", tag: "standard formats" },
  { name: "Your dashboards and reports", tag: "exportable specs" },
  { name: "Your knowledge graph", tag: "standard export" },
];

export default function AkashicOpenFoundations() {
  return (
    <section id="open" className="scroll-mt-24 border-t border-lineSoft bg-primary-bg">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-overcast">[06]</span>
            <span className="text-inkSoft">&nbsp;&nbsp;Open architecture</span>
          </p>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Open by design. Yours to leave.
          </h2>
          <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-secondary-text">
            Most platforms are easy to enter and expensive to leave. Akashic is built
            the other way round: open formats at every layer, so the work you do here
            stays yours, and the day you move on, it moves with you.
          </p>
        </ScrollReveal>

        <div className="mx-auto mt-12 grid max-w-[1100px] items-start gap-12 lg:mt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          {/* Left: the four commitments */}
          <ScrollReveal>
            <div className="flex flex-col gap-5">
              {commitments.map((c) => (
                <div key={c.title} className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] border border-subtle-stroke bg-primary-bg">
                    <svg
                      width="16"
                      height="16"
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
                  <div>
                    <div className="text-[15px] font-semibold tracking-tight text-ink">{c.title}</div>
                    <div className="mt-0.5 text-[13px] leading-relaxed text-inkSoft">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-[26em] text-xl font-semibold leading-snug tracking-tight text-ink">
              The real test of a platform is how freely you can walk away from it.
            </p>
          </ScrollReveal>

          {/* Right: the portability manifest (replaces the old tech list) */}
          <ScrollReveal delay={120}>
            <div className="overflow-hidden rounded-[14px] border border-subtle-stroke bg-white shadow-frame">
              <div className="flex items-center gap-2 border-b border-subtle-stroke bg-primary-bg px-4 py-2.5">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                </span>
                <span className="font-mono text-[10.5px] text-inkSoft">akashic.export</span>
                <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.07em] text-overcast">
                  no lock-in
                </span>
              </div>

              <div className="px-4 pt-4 pb-1">
                <p className="text-[14.5px] font-semibold tracking-tight text-ink">
                  Everything here is yours to take.
                </p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-inkSoft">
                  No proprietary formats. No re-platforming project. Export the
                  whole estate and keep working elsewhere.
                </p>
              </div>

              <div className="mt-2 divide-y divide-subtle-stroke border-y border-subtle-stroke">
                {assets.map((a) => (
                  <div key={a.name} className="flex items-center gap-3 px-4 py-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue/50" aria-hidden />
                    <span className="flex-1 text-[13px] font-medium text-ink">{a.name}</span>
                    <span className="inline-flex items-center gap-1 rounded-[7px] border border-[#EEEEF3] bg-[#FBFBFE] px-2 py-1 font-mono text-[10px] text-inkSoft">
                      {a.tag}
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path
                          d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-overcast"
                        />
                      </svg>
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 bg-blue-subtle/50 px-4 py-3">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue animate-[ps-pulse_2.4s_infinite]" />
                <span className="text-[11.5px] font-semibold text-blue">
                  Take it to any platform. No exit fee, no data held hostage.
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
