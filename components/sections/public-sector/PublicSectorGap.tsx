/*
 * [01] The Governance Gap — Three Plain Statements.
 * One problem per row, read left to right: the big figure and one sentence,
 * then the picture that proves it (a fragmented dot-matrix India feeding a
 * delayed centre view; one citizen duplicated across five schemes; a report
 * crawling from field to ministry). Sample record data is canned (§8a).
 */

import ScrollReveal from "@/components/ui/ScrollReveal";

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

const TINTS = ["#C8D2F5", "#A9B9EF", "#8FA5EA", "#DCE3FA"];
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

function IndiaVisual() {
  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-3">
      <FragmentedIndia />
      <span
        className="hidden h-px min-w-[36px] flex-1 bg-[length:16px_1px] bg-repeat-x bg-[repeating-linear-gradient(90deg,#C8D2F5_0_8px,transparent_8px_16px)] animate-[ps-dash_1.8s_linear_infinite] sm:block"
        aria-hidden
      />
      <div className="w-full max-w-[210px] shrink-0 rounded-[10px] border border-subtle-stroke bg-white px-3.5 py-3 shadow-card">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[8.5px] font-bold uppercase tracking-[0.08em] text-ink">
            The centre&rsquo;s view
          </span>
          <span className="inline-flex items-center gap-1 rounded-[5px] border border-[#E3D5BC] bg-[#FDF9F1] px-1.5 py-[2px] font-mono text-[7.5px] font-bold text-[#8A6A33]">
            <span className="h-[4px] w-[4px] rounded-full bg-[#C0883A] animate-[ps-pulse_2s_infinite]" aria-hidden />
            DELAYED
          </span>
        </div>
        <p className="mt-1.5 text-[10.5px] leading-snug text-inkSoft">
          Arrives quarterly. Incomplete. Reconciled by hand.
        </p>
      </div>
    </div>
  );
}

const duplicates = [
  { name: "Rekha Devi", scheme: "Health", rotate: "-rotate-1" },
  { name: "R. Devi", scheme: "Food", rotate: "rotate-[0.5deg]" },
  { name: "REKHA D", scheme: "Housing", rotate: "-rotate-[0.5deg]" },
  { name: "Rekha Devi (W/O)", scheme: "Pension", rotate: "rotate-1" },
  { name: "R Devi", scheme: "Education", rotate: "-rotate-[0.75deg]" },
];

function DuplicatesVisual() {
  return (
    <div className="w-full max-w-[380px]">
      <div className="space-y-1.5">
        {duplicates.map((record) => (
          <div
            key={record.scheme}
            className={`flex items-center gap-2.5 rounded-[8px] border border-subtle-stroke bg-white px-3 py-1.5 shadow-card ${record.rotate}`}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" strokeWidth="2" aria-hidden className="shrink-0">
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
        One person &middot; five schemes &middot; five different records
      </p>
    </div>
  );
}

function LagVisual() {
  const stops = ["Field", "District", "State", "Ministry"];
  return (
    <div className="w-full max-w-[420px]">
      <div className="relative">
        <div className="absolute inset-x-1 top-[5px] h-px bg-[length:12px_1px] bg-repeat-x bg-[repeating-linear-gradient(90deg,#D3D8DF_0_6px,transparent_6px_12px)]" aria-hidden />
        <span
          className="absolute top-[1px] h-[9px] w-[9px] rounded-full bg-blue shadow-[0_0_0_3px_rgba(62,99,221,0.15)] animate-[ps-zip_8s_linear_infinite]"
          aria-hidden
        />
        <div className="relative flex justify-between">
          {stops.map((stop, idx) => (
            <div key={stop} className="flex flex-col items-center gap-1.5">
              <span
                className={`h-[11px] w-[11px] rounded-full border bg-white ${
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
        One report&rsquo;s journey &middot; month 1 to month 3
      </p>
    </div>
  );
}

const gaps = [
  {
    figure: "28 states",
    title: "One fragmented view",
    desc: "Most national schemes run on state-wise systems that don't talk to each other, so the centre sees a delayed, incomplete picture.",
    visual: <IndiaVisual />,
  },
  {
    figure: "Crores",
    title: "Manual reconciliation",
    desc: "Beneficiary and citizen data duplicated across departments: the same person counted differently in five different schemes.",
    visual: <DuplicatesVisual />,
  },
  {
    figure: "Months",
    title: "Reporting lag",
    desc: "Field-level data takes months to reach ministry dashboards. By the time a gap is visible, the budget cycle has already moved on.",
    visual: <LagVisual />,
  },
];

export default function PublicSectorGap() {
  return (
    <section id="the-gap" className="scroll-mt-24 border-t border-lineSoft bg-background">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[01]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;The governance gap</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Three problems, one pattern</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Public programmes move at population scale.
          </h2>
          <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-secondary-text">
            Most data systems don&rsquo;t. The gap shows up the same way in every
            ministry review.
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
                  {gap.visual}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={260}>
          <p className="mt-12 max-w-[24em] text-[26px] font-semibold leading-snug tracking-tight text-ink md:text-[30px] lg:mt-14">
            Not a hypothetical problem for DHIRA. We have solved it{" "}
            <span className="relative inline-block whitespace-nowrap">
              more than once.
              <span className="absolute -bottom-[0.04em] left-0 h-[0.09em] w-full rounded-full bg-blue/35" aria-hidden />
            </span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
