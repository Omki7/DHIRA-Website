"use client";

/**
 * DESIGN INTENT:
 * Field Ledger — the centrepiece of "Proven At Scale".
 *
 * Two always-visible deployment panels in a 2-column grid. No accordion,
 * no clicking required. Both national platforms are immediately readable:
 *
 *   - Sector icon (blue / green) on a tinted pill background
 *   - System name + dossier code
 *   - Count-up scale figure (fires on mount via rAF)
 *   - Scope text
 *   - Editorial pull-quote (font-display, the sanctioned serif voice)
 *   - Three key metrics in a bottom bar with dividers
 *
 * Status strip sits above the panels: "2 national platforms · production"
 * plus the Verified Record badge and Operational pill.
 *
 * Rule 2 (✓ discipline): the check glyph appears ONLY in the status strip
 * "Verified Record" badge.
 */

import { useMemo } from "react";
import { useCountUpValue, usePrefersReducedMotion } from "@/hooks/useCountUp";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";

const GREEN = "#30A46C";

type Deployment = {
  code: string;
  sector: string;
  system: string;
  figure: string;
  unit: string;
  scope: string;
  year: string;
  quote: string;
};

const DEPLOYMENTS: Deployment[] = [
  {
    code: "01/A",
    sector: "Education Infrastructure",
    system: "National Learning Intelligence",
    figure: "5.75B+",
    unit: "learning interactions connected",
    scope: "Built into India's national learning platform as the intelligence layer. Activity across 135 languages and every state is turned into decision-ready insight, helping policymakers understand what is working and where to act next.",
    year: "2026",
    quote: "Turning five billion learning interactions into policy-actionable intelligence for a nation.",
  },
  {
    code: "02/A",
    sector: "Workforce & Migration",
    system: "Global Labour Mobility Analytics",
    figure: "4M+",
    unit: "worker clearances on record",
    scope: "Built into India's national cross-border workforce platform as the intelligence layer. Migration signals from 18 countries and 282K+ employer profiles are unified into a single actionable picture for the Ministry of External Affairs.",
    year: "2024",
    quote: "From scattered border records to a unified intelligence layer protecting India's global workforce.",
  },
];

type Metric = { figure: string; count: number; label: string; accent?: boolean };

const METRICS: Record<string, Metric[]> = {
  "Education Infrastructure": [
    { figure: "187M", count: 187, label: "Learner profiles", accent: true },
    { figure: "135",  count: 135, label: "Languages connected" },
    { figure: "148M", count: 148, label: "Courses completed" },
  ],
  "Workforce & Migration": [
    { figure: "18",   count: 18,  label: "Destination markets", accent: true },
    { figure: "282K+",count: 0,   label: "Employer profiles" },
    { figure: "400K+",count: 0,   label: "Workers served annually" },
  ],
};

/* ---------- helpers ---------- */

function parseFigure(fig: string): { num: number; suffix: string } {
  const m = fig.match(/^([\d.]+)\s*(.*)$/);
  if (!m) return { num: 0, suffix: fig };
  return { num: parseFloat(m[1]), suffix: m[2] };
}

function formatNum(num: number, original: string): string {
  const ref = original.match(/^[\d.]+/)?.[0] ?? "";
  const decimals = ref.includes(".") ? ref.split(".")[1].length : 0;
  return num.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/* ---------- sub-components ---------- */

function MetricCell({ m, kick, reduced }: { m: Metric; kick: string; reduced: boolean }) {
  const v = useCountUpValue(m.count, kick, reduced, 1100);
  const suffixPart = m.figure.replace(/^[\d.]+/, "");
  const display = m.count === 0 ? m.figure : `${Math.round(v)}${suffixPart}`;
  return (
    <div className="flex flex-col gap-1 px-5 py-4 sm:px-6">
      <span className={`text-2xl font-semibold tabular-nums tracking-tight leading-none ${m.accent ? "text-blue" : "text-ink"}`}>
        {display}
      </span>
      <span className="text-[11px] leading-snug text-overcast">{m.label}</span>
    </div>
  );
}

function DeploymentPanel({ d, reduced }: { d: Deployment; reduced: boolean }) {
  const metrics = METRICS[d.sector];
  const { num, suffix } = useMemo(() => parseFigure(d.figure), [d.figure]);
  const liveVal = useCountUpValue(num, d.code, reduced, 1200);
  const liveFig = `${formatNum(liveVal, d.figure)}${suffix}`;

  const isEducation = d.sector === "Education Infrastructure";
  const iconBg = isEducation ? "bg-blue-subtle text-blue" : "bg-[#ECFDF5] text-[#059669]";

  return (
    <div className="flex flex-col rounded-frame border border-line bg-white">
      {/* ── Panel header ── */}
      <div className="flex items-start justify-between px-6 pt-6 sm:px-8 sm:pt-8">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-btn ${iconBg}`}>
            <DynamicSketchIcon text={isEducation ? "Education" : "Workforce"} className="h-5 w-5" />
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
              {d.code} · {d.year}
            </div>
            <div className="mt-0.5 text-[13px] font-semibold uppercase tracking-wide text-inkSoft">
              {d.sector}
            </div>
          </div>
        </div>
        <span className="flex items-center gap-1.5 flex-shrink-0 pt-0.5">
          <span
            className="h-1.5 w-1.5 rounded-full animate-[ps-pulse_2s_infinite]"
            style={{ backgroundColor: GREEN }}
          />
          <span className="text-[11px] font-semibold uppercase tracking-eyebrow" style={{ color: GREEN }}>
            Live
          </span>
        </span>
      </div>

      {/* ── System name ── */}
      <div className="mt-4 px-6 sm:px-8">
        <h3 className="text-base font-semibold text-ink">{d.system}</h3>
      </div>

      {/* ── Scale figure ── */}
      <div className="mt-4 border-t border-lineSoft px-6 pt-5 sm:px-8">
        <div className="flex items-baseline gap-2">
          <span className="text-[48px] font-semibold tabular-nums tracking-tighter text-ink leading-none sm:text-[56px]">
            {liveFig}
          </span>
        </div>
        <div className="mt-1 text-sm text-inkSoft">{d.unit}</div>
      </div>

      {/* ── Scope text ── */}
      <p className="mt-4 px-6 text-sm leading-relaxed text-inkSoft sm:px-8">
        {d.scope}
      </p>

      {/* ── Editorial pull-quote ── */}
      <p className="mx-6 mt-5 border-l-2 border-blue/35 pl-4 font-display text-[15px] italic leading-snug text-ink sm:mx-8">
        {d.quote}
      </p>

      {/* ── Metrics bar — always visible, no clicking ── */}
      <div className="mt-auto">
        <div className="mt-6 grid grid-cols-3 divide-x divide-dashed divide-lineSoft border-t border-dashed border-lineSoft">
          {metrics.map((m) => (
            <MetricCell key={m.label} m={m} kick={d.code} reduced={reduced} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- main export ---------- */

export default function FieldLedger() {
  const reduced = usePrefersReducedMotion();

  return (
    <div>
      {/* Status strip */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-btn border border-lineSoft bg-white px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
          2 national platforms · in production
        </span>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 rounded-btn border border-blue/30 bg-blue/[0.07] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
            <span>&#10003;</span>
            <span>Verified Record</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full animate-[ps-pulse_2s_infinite]"
              style={{ backgroundColor: GREEN }}
            />
            <span className="text-[11px] font-semibold uppercase tracking-eyebrow" style={{ color: GREEN }}>
              Operational
            </span>
          </span>
        </div>
      </div>

      {/* Two always-visible deployment panels */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {DEPLOYMENTS.map((d) => (
          <DeploymentPanel key={d.code} d={d} reduced={reduced} />
        ))}
      </div>
    </div>
  );
}
