"use client";

import ScrollReveal from "@/components/ScrollReveal";

// ── Static chart data (Stanford HAI AI Index Report 2026) ────────────────────
// Window: 2020–2025  |  YMAX=500  |  scale = 240/500 = 0.48 px per $B
// Layout: CW=540 CH=320 LP=56 RP=16 TP=44 BP=36 → PW=468 PH=240 BL=284
// BW=42 GAP=31 → bar x = 56 + 31*(i+1) + 42*i
const BARS = [
  { year: "2020", v: 38,  label: "$38B",  x: 87,  y: 266, h: 18,  hi: false },
  { year: "2021", v: 68,  label: "$68B",  x: 160, y: 251, h: 33,  hi: false },
  { year: "2022", v: 92,  label: "$92B",  x: 233, y: 240, h: 44,  hi: false },
  { year: "2023", v: 95,  label: "$95B",  x: 306, y: 238, h: 46,  hi: false },
  { year: "2024", v: 252, label: "$252B", x: 379, y: 163, h: 121, hi: false },
  { year: "2025", v: 420, label: "$420B", x: 452, y: 82,  h: 202, hi: true  },
] as const;

// Y-axis grid ticks (y = 284 − round(v × 0.48))
const Y_TICKS = [
  { y: 284, label: "$0"    },
  { y: 188, label: "$200B" },
  { y: 92,  label: "$400B" },
] as const;

const BW   = 42;
const BL_Y = 284;

// ── Finding cards ────────────────────────────────────────────────────────────
const FINDINGS = [
  {
    id: "01",
    quote: "Every team swears their number is the right one.",
    label: "No Shared Foundation",
  },
  {
    id: "02",
    quote: "We rebuilt the same report three times this quarter.",
    label: "Wasted Effort",
  },
  {
    id: "03",
    quote: "By the time the report lands, the moment's gone.",
    label: "Stale by Design",
  },
] as const;

export default function ProblemSection() {
  return (
    <section className="relative w-full bg-white py-32 lg:py-40" id="problem">
      <div className="rail-container">

        {/* ── Eyebrow ── */}
        <ScrollReveal>
          <div className="mb-10 flex items-center gap-2 border-b border-dashed border-lineSoft pb-4 font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span className="text-overcast">[01]</span>
            <span>/</span>
            <span>THE PROBLEM</span>
          </div>
        </ScrollReveal>

        {/* ── Two-tone headline ── */}
        <ScrollReveal delay={80}>
          <h2 className="mb-5 text-[48px] font-semibold leading-[1.1] tracking-tighter md:text-[56px] lg:text-[64px]">
            <span className="text-ink">Every team has an answer.</span>
            <br />
            <span className="text-overcast">No two of them match.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <p className="mb-16 max-w-[44em] text-lg leading-[1.65] text-inkSoft">
            Corporate AI investment crossed{" "}
            <span className="font-semibold text-ink">$420 billion in 2025</span>,
            yet the answers AI produces still can&rsquo;t be trusted,
            because the AI never had the full picture.
          </p>
        </ScrollReveal>

        {/* ── Main content: chart + findings ── */}
        <div className="grid gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">

          {/* ── Chart panel ── */}
          <ScrollReveal delay={160}>
            <div className="rounded-frame border border-lineSoft bg-white p-6 shadow-frame">

              {/* Chart header */}
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[15px] font-semibold tracking-tight text-ink">
                    Global Corporate AI Investment
                  </p>
                  <p className="mt-0.5 text-[12px] leading-snug text-overcast">
                    Total disclosed investment, 2020&ndash;2025 &middot; USD billions
                  </p>
                </div>
                <span className="mt-0.5 flex shrink-0 items-center gap-1.5 rounded-tag border border-[#C8D2F5] bg-[#EEF1FC] px-2 py-0.5 font-mono text-[10px] uppercase tracking-eyebrow text-blue">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue" style={{ animation: "softpulse 2.4s ease-in-out infinite" }} />
                  Stanford HAI 2026
                </span>
              </div>

              {/* SVG bar chart */}
              <div className="w-full overflow-hidden">
                <svg
                  viewBox="0 0 540 320"
                  className="w-full"
                  aria-label="Bar chart: global corporate AI investment grew from $38B in 2020 to $420B in 2025"
                >
                  {/* Horizontal grid lines */}
                  {Y_TICKS.map((t) => (
                    <line
                      key={t.label}
                      x1={56} y1={t.y}
                      x2={524} y2={t.y}
                      stroke="#EEEFF1"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Y-axis labels */}
                  {Y_TICKS.map((t) => (
                    <text
                      key={`y-${t.label}`}
                      x={48} y={t.y + 4}
                      textAnchor="end"
                      fontSize="10"
                      fill="#8E8F91"
                      fontFamily="Inter, sans-serif"
                    >
                      {t.label}
                    </text>
                  ))}

                  {/* Bars */}
                  {BARS.map((b) => (
                    <g key={b.year}>
                      <rect
                        x={b.x} y={b.y}
                        width={BW} height={b.h}
                        rx="3"
                        fill={b.hi ? "#3E63DD" : "#E8E8E9"}
                        opacity={b.hi ? 1 : 0.9}
                      />
                      {/* Value label above bar */}
                      <text
                        x={b.x + BW / 2} y={b.y - 6}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight={b.hi ? "600" : "400"}
                        fill={b.hi ? "#3E63DD" : "#8E8F91"}
                        fontFamily="Inter, sans-serif"
                      >
                        {b.label}
                      </text>
                      {/* Year label below baseline */}
                      <text
                        x={b.x + BW / 2} y={BL_Y + 16}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight={b.hi ? "500" : "400"}
                        fill={b.hi ? "#1A1C1D" : "#8E8F91"}
                        fontFamily="Inter, sans-serif"
                      >
                        {b.year}
                      </text>
                    </g>
                  ))}

                  {/* +67% YoY annotation above 2025 bar */}
                  <line
                    x1={BARS[5].x + BW / 2 - 26} y1={62}
                    x2={BARS[5].x + BW / 2 + 26} y2={62}
                    stroke="#3E63DD"
                    strokeWidth="0.75"
                    opacity="0.4"
                  />
                  <text
                    x={BARS[5].x + BW / 2} y={57}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="600"
                    fill="#3E63DD"
                    fontFamily="Inter, sans-serif"
                  >
                    &#x2191; +67% YoY
                  </text>

                  {/* X-axis baseline */}
                  <line
                    x1={56} y1={BL_Y}
                    x2={524} y2={BL_Y}
                    stroke="#D9DADB"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              {/* Source line */}
              <p className="mt-2 text-[11px] text-overcast">
                Source: Stanford HAI AI Index Report 2026 &middot; Total disclosed corporate AI investment globally
              </p>
            </div>
          </ScrollReveal>

          {/* ── Findings ── */}
          <div className="flex flex-col gap-3">
            {FINDINGS.map((f, i) => (
              <ScrollReveal key={f.id} delay={200 + i * 70}>
                <div className="group flex flex-col gap-3 rounded-card border border-lineSoft bg-white p-5 shadow-card transition-all duration-[250ms] ease-settle hover:border-[#D9DADB] hover:shadow-[0px_2px_8px_rgba(28,40,64,0.07),0px_6px_18px_rgba(28,40,64,0.05)]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
                      Finding {f.id}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-lineSoft transition-colors duration-[250ms] group-hover:bg-blue" />
                  </div>
                  <blockquote className="text-[14px] italic leading-[1.55] text-inkSoft">
                    &ldquo;{f.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center justify-between border-t border-lineSoft pt-3">
                    <p className="text-[12px] font-semibold text-ink">{f.label}</p>
                    <span className="text-[11px] text-overcast">&#8594;</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            {/* ── Insight callout ── */}
            <ScrollReveal delay={420}>
              <div className="rounded-card border border-[#C8D2F5] bg-[#EEF1FC] p-4">
                <p className="text-[12px] font-semibold text-blue">
                  The pattern is consistent
                </p>
                <p className="mt-1 text-[12px] leading-[1.5] text-[#5C5E63]">
                  More AI spend amplifies the conflict. Without a shared data foundation,
                  every new model adds another competing answer.
                </p>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
