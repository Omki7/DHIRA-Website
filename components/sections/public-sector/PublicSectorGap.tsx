/*
 * [01] The Governance Gap — Three Plain Statements.
 * One problem per row, read left to right: the big figure and one sentence,
 * then the picture that proves it (a fragmented dot-matrix India feeding a
 * delayed centre view; one citizen duplicated across five schemes; a report
 * crawling from field to ministry). Sample record data is canned (§8a).
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { PublicSectorPage } from "@/content/pages/sectors-public-sector";

type Visuals = PublicSectorPage["gap"]["visuals"];

/* Dot-matrix India: rows of [start, end] column segments. Deliberately an
   abstract patchwork of disconnected state-system tints, not a boundary map. */
const INDIA_ROWS: [number, number][][] = [
  [[7, 9]],
  [[6, 9]],
  [[6, 10]],
  [[5, 10]],
  [[4, 11]],
  [[3, 12]],
  [[3, 13]],
  [[2, 13], [15, 19]],
  [[1, 13], [14, 19]],
  [[0, 13], [15, 18]],
  [[0, 12]],
  [[1, 11]],
  [[2, 11]],
  [[3, 10]],
  [[3, 10]],
  [[4, 9]],
  [[4, 9]],
  [[4, 8]],
  [[5, 8]],
  [[5, 8]],
  [[5, 7]],
  [[6, 7]],
  [[6, 7]],
  [[6, 6]],
];

const TINTS = ["rgb(var(--blue-border))", "rgb(var(--blue-border))", "rgb(var(--blue-400))", "rgb(var(--blue-subtle))"];
const PITCH = 11;
const CELL = 8.5;

function FragmentedIndia() {
  const cells: { x: number; y: number; tint: string; pulse: boolean }[] = [];
  INDIA_ROWS.forEach((segments, y) => {
    segments.forEach(([start, end]) => {
      for (let x = start; x <= end; x++) {
        cells.push({
          x,
          y,
          tint: TINTS[(x * 7 + y * 13) % 4],
          pulse: (x * 3 + y * 5) % 31 === 0,
        });
      }
    });
  });
  return (
    <svg
      viewBox={`0 0 ${20 * PITCH} ${INDIA_ROWS.length * PITCH}`}
      fill="none"
      aria-hidden
      className="w-full max-w-[250px]"
    >
      {cells.map((cell) => (
        <rect
          key={`${cell.x}-${cell.y}`}
          x={cell.x * PITCH}
          y={cell.y * PITCH}
          width={CELL}
          height={CELL}
          rx="2"
          fill={cell.tint}
        >
          {cell.pulse && (
            <animate
              attributeName="opacity"
              values="1;0.25;1"
              dur="2.6s"
              begin={`${((cell.x + cell.y) % 5) * 0.4}s`}
              repeatCount="indefinite"
            />
          )}
        </rect>
      ))}
    </svg>
  );
}

function IndiaVisual({ copy }: { copy: Visuals["india"] }) {
  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-3">
      <FragmentedIndia />
      {/* The dashes travel by transform on an inner strip (Rule 6a), not by
          background-position, which repainted the line every frame. */}
      <span className="relative hidden h-px min-w-[36px] flex-1 overflow-hidden sm:block" aria-hidden>
        <span className="absolute inset-y-0 -left-8 right-0 bg-[length:16px_1px] bg-repeat-x bg-[repeating-linear-gradient(90deg,rgb(var(--blue-border))_0_8px,transparent_8px_16px)] animate-[ps-dash_1.8s_linear_infinite]" />
      </span>
      <div className="w-full max-w-[210px] shrink-0 rounded-[10px] border border-subtle-stroke bg-background px-3.5 py-3 ">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.08em] text-ink">
            {copy.title}
          </span>
          <span className="inline-flex items-center gap-1 rounded-[5px] border border-[rgb(var(--diagram-gold-line))] bg-[rgb(var(--diagram-gold-bg))] px-1.5 py-[2px] font-mono text-[7.5px] font-bold text-[rgb(var(--diagram-gold))]">
            <span className="h-[4px] w-[4px] rounded-full bg-[rgb(var(--diagram-gold))] animate-[ps-pulse_2s_infinite]" aria-hidden />
            {copy.status}
          </span>
        </div>
        <p className="mt-1.5 text-[10.5px] leading-snug text-inkSoft">
          {copy.body}
        </p>
      </div>
    </div>
  );
}

/* Each duplicate card's tilt, by position (art direction). */
const TILTS = ["-rotate-1", "rotate-[0.5deg]", "-rotate-[0.5deg]", "rotate-1", "-rotate-[0.75deg]"];

function DuplicatesVisual({ copy }: { copy: Visuals["duplicates"] }) {
  return (
    <div className="w-full max-w-[380px]">
      <div className="space-y-1.5">
        {copy.records.map((record, k) => (
          <div
            key={record.scheme}
            className={`flex items-center gap-2.5 rounded-[8px] border border-subtle-stroke bg-background px-3 py-1.5  ${TILTS[k % TILTS.length]}`}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" strokeWidth="2" aria-hidden className="shrink-0">
              <circle cx="12" cy="8" r="4" />
              <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
            </svg>
            <span className="min-w-0 flex-1 truncate text-[11.5px] font-medium text-ink">
              {record.name}
            </span>
            <span className="shrink-0 rounded-[4px] bg-tertiary-bg px-1.5 py-0.5 font-mono text-[7.5px] font-bold uppercase tracking-[0.04em] text-secondary-text">
              {record.scheme}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.08em] text-overcast">
        {copy.caption}
      </p>
    </div>
  );
}

function LagVisual({ copy }: { copy: Visuals["lag"] }) {
  const stops = copy.stops;
  return (
    <div className="w-full max-w-[420px]">
      <div className="relative">
        <div className="absolute inset-x-1 top-[5px] h-px bg-[length:12px_1px] bg-repeat-x bg-[repeating-linear-gradient(90deg,rgb(var(--line))_0_6px,transparent_6px_12px)]" aria-hidden />
        {/* A full-width carrier slides the dot by transform (Rule 6a);
            animating left relaid the page out every frame. */}
        <span className="pointer-events-none absolute inset-x-0 top-[1px] animate-[ps-zip_8s_linear_infinite]" aria-hidden>
          <span className="block h-[9px] w-[9px] rounded-full bg-blue " />
        </span>
        <div className="relative flex justify-between">
          {stops.map((stop, idx) => (
            <div key={stop} className="flex flex-col items-center gap-1.5">
              <span
                className={`h-[11px] w-[11px] rounded-full border bg-background ${
                  idx === stops.length - 1 ? "border-ink" : "border-default-stroke"
                }`}
                aria-hidden
              />
              <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-overcast">
                {stop}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.08em] text-overcast">
        {copy.caption}
      </p>
    </div>
  );
}


export default function PublicSectorGap({ content }: { content: PublicSectorPage["gap"] }) {
  const visuals = {
    india: <IndiaVisual copy={content.visuals.india} />,
    duplicates: <DuplicatesVisual copy={content.visuals.duplicates} />,
    lag: <LagVisual copy={content.visuals.lag} />,
  };
  const gaps = content.items;
  return (
    <section id="the-gap" className="scroll-mt-24 border-t border-lineSoft bg-background pt-12 pb-24 lg:pt-16 lg:pb-32">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[{content.eyebrow.number}]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;{content.eyebrow.label}</span>
            </p>
            <span className="hidden text-overcast sm:inline">{content.eyebrow.aside}</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            {content.title}
          </h2>
          <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-secondary-text">
            {content.lede}
          </p>
        </ScrollReveal>

        <div className="mt-12 lg:mt-14">
          {gaps.map((gap, idx) => (
            <ScrollReveal key={gap.title} delay={100 + idx * 100}>
              <div className="grid grid-cols-1 items-center gap-8 border-t border-subtle-stroke py-10 last:border-b lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14 lg:py-12">
                <div>
                  <div className="whitespace-nowrap text-[44px] font-semibold leading-none tracking-tighter text-ink md:text-[52px]">
                    {gap.figure}
                  </div>
                  <div className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
                    {gap.title}
                  </div>
                  <p className="mt-3 max-w-[28em] text-[16px] leading-relaxed text-inkSoft">
                    {gap.desc}
                  </p>
                </div>
                <div className="flex justify-center rounded-frame border border-subtle-stroke bg-primary-bg px-6 py-8 lg:justify-center">
                  {visuals[gap.visual]}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={260}>
          <p className="mt-12 max-w-[24em] text-[26px] font-semibold leading-snug tracking-tight text-ink md:text-[30px] lg:mt-14">
            {content.closing.lead}{" "}
            <span className="relative inline-block whitespace-nowrap">
              {content.closing.marked}
              <span className="absolute -bottom-[0.04em] left-0 h-[0.09em] w-full rounded-full bg-blue" aria-hidden />
            </span>
          </p>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
