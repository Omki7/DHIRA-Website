"use client";

import { useMemo, useState, useEffect } from "react";
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
    system: "National Learning Intelligence Platform",
    figure: "5.75B+",
    unit: "learning interactions connected",
    scope: "Akashic serves as the core intelligence layer inside India's national education portal. By unifying transaction logs across 135 languages and all 36 states and union territories, it provides federal and state ministries with real-time insight into curriculum efficacy, resource distribution, and learner retention.",
    year: "2026",
    quote: "Translating population-scale learning patterns into immediate regional policy.",
  },
  {
    code: "02/A",
    sector: "Workforce & Migration",
    system: "Global Labour Mobility Analytics",
    figure: "4M+",
    unit: "worker clearances on record",
    scope: "Embedded within the national cross-border employment registry, Akashic unifies visa clearances, immigration logs, and overseas employer profiles. It provides the Ministry of External Affairs with a single, traceable dashboard to monitor labour corridors, audit recruitment compliance, and safeguard millions of Indian citizens working across 18 countries.",
    year: "2024",
    quote: "Securing the livelihoods of four million emigrant workers through unified, traceable data.",
  },
];

type Metric = { figure: string; count: number; label: string; accent?: boolean };

const METRICS: Record<string, Metric[]> = {
  "Education Infrastructure": [
    { figure: "187M+", count: 187, label: "Learner profiles", accent: true },
    { figure: "135",  count: 135, label: "Languages connected" },
    { figure: "148M+", count: 148, label: "Courses completed" },
  ],
  "Workforce & Migration": [
    { figure: "18",   count: 18,  label: "Destination corridors", accent: true },
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

/* ---------- sub-components ---------- */

function EducationTelemetry({ reduced }: { reduced: boolean }) {
  const [points, setPoints] = useState([45, 52, 49, 63, 58, 42, 60, 55, 68, 50]);
  const [logs, setLogs] = useState<string[]>([
    "Ingestion: transaction_log_state_MH.resolved",
    "Correlation: enrolment index matched (ID: 942B)",
    "Analysis: anomaly detection checked (36/36 states)",
  ]);

  useEffect(() => {
    if (reduced) return;
    const pointsTimer = setInterval(() => {
      setPoints((prev) => {
        const next = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        const change = Math.floor(Math.random() * 30) - 15;
        const val = Math.max(15, Math.min(85, last + change));
        next.push(val);
        return next;
      });
    }, 1200);

    const logPool = [
      "Ingestion: transaction_log_state_DL.resolved",
      "Correlation: course completion parsed (ID: 018C)",
      "Analysis: state curriculum efficacy parsed",
      "Audit: data lineage trace recorded",
      "Ingestion: transaction_log_state_KA.resolved",
      "Correlation: user enrollment matched (ID: 884A)",
      "Analysis: regional anomaly check complete",
      "Audit: cryptographic signature verified",
    ];

    const logsTimer = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev.slice(1)];
        const nextMsg = logPool[Math.floor(Math.random() * logPool.length)];
        next.push(nextMsg);
        return next;
      });
    }, 2200);

    return () => {
      clearInterval(pointsTimer);
      clearInterval(logsTimer);
    };
  }, [reduced]);

  const width = 360;
  const height = 110;
  const step = width / (points.length - 1);
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${height - (p / 100) * height}`).join(' ');
  const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`;

  return (
    <div className="relative w-full h-[260px] bg-primary-bg border border-lineSoft rounded-card overflow-hidden p-5 flex flex-col justify-between font-mono select-none">
      <div>
        <div className="flex items-center justify-between border-b border-lineSoft pb-2">
          <span className="flex items-center gap-1.5 text-[9px] font-bold tracking-wider text-inkSoft uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-blue animate-[ps-pulse_2s_infinite]" />
            Telemetry &middot; Streaming Activity
          </span>
          <span className="text-[9px] text-overcast font-bold">LATENCY: 12MS</span>
        </div>

        <div className="relative mt-4">
          <svg className="w-full h-24 overflow-visible" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="eduGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3E63DD" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#3E63DD" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path d={areaD} fill="url(#eduGrad)" className="transition-all duration-700 ease-in-out" />
            <path d={pathD} fill="none" stroke="#3E63DD" strokeWidth="1.75" className="transition-all duration-700 ease-in-out" />
            
            {/* Draw tiny helper grid lines */}
            <line x1="0" y1="27" x2={width} y2="27" stroke="#3E63DD" strokeOpacity="0.08" strokeDasharray="2 2" />
            <line x1="0" y1="55" x2={width} y2="55" stroke="#3E63DD" strokeOpacity="0.08" strokeDasharray="2 2" />
            <line x1="0" y1="82" x2={width} y2="82" stroke="#3E63DD" strokeOpacity="0.08" strokeDasharray="2 2" />

            <circle
              cx={width}
              cy={height - (points[points.length - 1] / 100) * height}
              r="4"
              fill="#3E63DD"
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>

      <div className="mt-4 border-t border-lineSoft pt-3">
        <div className="text-[8px] font-bold text-overcast uppercase tracking-wider mb-2">active event stream</div>
        <div className="flex flex-col gap-1.5 h-[56px] overflow-hidden">
          {logs.map((log, idx) => (
            <div key={idx} className="text-[10px] leading-tight text-inkSoft truncate flex items-center gap-1.5 font-mono">
              <span className="text-blue font-bold">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkforceTelemetry({ reduced }: { reduced: boolean }) {
  const [logs, setLogs] = useState<string[]>([
    "Corridor: IND-DLH -> DXB | Active",
    "Audit: Employer profile 282,109 | Compliant",
    "Routing: worker clearance issue (IND-0912)",
  ]);

  useEffect(() => {
    if (reduced) return;
    const logPool = [
      "Corridor: IND-MUM -> RUH | Active",
      "Corridor: IND-BLR -> SGP | Active",
      "Audit: Employer profile 281,992 | Compliant",
      "Audit: Employer profile 283,040 | Compliant",
      "Routing: visa clearance issue (IND-0422)",
      "Routing: border registry check (IND-0814)",
      "Verification: Ministry clearance complete",
      "Verification: MEA registry log recorded",
    ];

    const timer = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev.slice(1)];
        const nextMsg = logPool[Math.floor(Math.random() * logPool.length)];
        next.push(nextMsg);
        return next;
      });
    }, 2500);

    return () => clearInterval(timer);
  }, [reduced]);

  // SVG network map dimensions
  const width = 360;
  const height = 110;

  // Nodes locations
  const centralNode = { x: 180, y: 55 }; // India center
  const destinations = [
    { name: "DXB", x: 60, y: 35 },
    { name: "RUH", x: 45, y: 75 },
    { name: "SGP", x: 300, y: 75 },
    { name: "LHR", x: 120, y: 25 },
    { name: "NYC", x: 80, y: 95 },
  ];

  return (
    <div className="relative w-full h-[260px] bg-primary-bg border border-lineSoft rounded-card overflow-hidden p-5 flex flex-col justify-between font-mono select-none">
      <div>
        <div className="flex items-center justify-between border-b border-lineSoft pb-2">
          <span className="flex items-center gap-1.5 text-[9px] font-bold tracking-wider text-inkSoft uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-[ps-pulse_2s_infinite]" />
            Sovereign Routing &middot; Corridors
          </span>
          <span className="text-[9px] text-overcast font-bold">STATUS: OPERATIONAL</span>
        </div>

        <div className="relative mt-4">
          <svg className="w-full h-24 overflow-visible" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden>
            {/* Draw corridor links */}
            {destinations.map((d) => (
              <g key={d.name}>
                <line
                  x1={centralNode.x}
                  y1={centralNode.y}
                  x2={d.x}
                  y2={d.y}
                  stroke="#10B981"
                  strokeOpacity="0.25"
                  strokeWidth="1.5"
                />
                {!reduced && (
                  <line
                    x1={centralNode.x}
                    y1={centralNode.y}
                    x2={d.x}
                    y2={d.y}
                    stroke="#10B981"
                    strokeWidth="1.5"
                    strokeDasharray="4 8"
                    className="animate-[vconn-flow_6s_linear_infinite]"
                  />
                )}
              </g>
            ))}

            {/* Central Node: India */}
            <circle cx={centralNode.x} cy={centralNode.y} r="6" fill="#10B981" />
            <circle cx={centralNode.x} cy={centralNode.y} r="10" fill="none" stroke="#10B981" strokeOpacity="0.2" className="animate-ping" />
            <text x={centralNode.x} y={centralNode.y - 10} fill="#1A1C1D" fontSize="8" fontWeight="bold" textAnchor="middle">IND</text>

            {/* Destination Nodes */}
            {destinations.map((d) => (
              <g key={d.name}>
                <circle cx={d.x} cy={d.y} r="4" fill="#3E63DD" />
                <text x={d.x} y={d.y - 8} fill="#8E8F91" fontSize="7" fontWeight="bold" textAnchor="middle">{d.name}</text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      <div className="mt-4 border-t border-lineSoft pt-3">
        <div className="text-[8px] font-bold text-overcast uppercase tracking-wider mb-2">active routing feed</div>
        <div className="flex flex-col gap-1.5 h-[56px] overflow-hidden">
          {logs.map((log, idx) => (
            <div key={idx} className="text-[10px] leading-tight text-inkSoft truncate flex items-center gap-1.5 font-mono">
              <span className="text-[#10B981] font-bold">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
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
    <div className="flex flex-col overflow-hidden rounded-frame border border-line bg-white shadow-card">
      {/* Decorative capillary top line matching StatBand/AboutProof */}
      <div className="h-[3px] w-full bg-gradient-to-r from-blue/50 via-blue/25 to-transparent" />
      
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
        
        {/* Left Side: Content */}
        <div className="flex flex-col p-6 sm:p-8">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-dashed border-lineSoft pb-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-btn ${iconBg}`}>
                <DynamicSketchIcon text={isEducation ? "Education" : "Workforce"} className="h-4.5 w-4.5" />
              </div>
              <div>
                <div className="font-mono text-[9px] uppercase tracking-eyebrow text-overcast">
                  {d.code} · {d.year}
                </div>
                <div className="text-[12px] font-bold uppercase tracking-wide text-inkSoft">
                  {d.sector}
                </div>
              </div>
            </div>
            
            <span className="flex items-center gap-1.5 flex-shrink-0">
              <span
                className="h-1.5 w-1.5 rounded-full animate-[ps-pulse_2s_infinite]"
                style={{ backgroundColor: isEducation ? "#3E63DD" : GREEN }}
              />
              <span 
                className="text-[10px] font-bold uppercase tracking-eyebrow" 
                style={{ color: isEducation ? "#3E63DD" : GREEN }}
              >
                {isEducation ? "Live" : "Operational"}
              </span>
            </span>
          </div>

          {/* System name & main figure */}
          <div className="mt-5">
            <h3 className="text-lg font-bold leading-snug text-ink">{d.system}</h3>
            
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-[44px] font-semibold tabular-nums tracking-tighter text-ink leading-none sm:text-[50px]">
                {liveFig}
              </span>
            </div>
            <div className="mt-1 text-xs uppercase tracking-wider text-overcast font-mono">{d.unit}</div>
          </div>

          {/* Description Scope */}
          <p className="mt-4 text-[14px] leading-relaxed text-inkSoft">
            {d.scope}
          </p>

          {/* Editorial quote */}
          <p className="mt-5 border-l-2 border-blue/30 pl-4 font-display text-[15px] italic leading-snug text-ink">
            {d.quote}
          </p>

          {/* Metrics bar */}
          <div className="mt-auto pt-6">
            <div className="grid grid-cols-3 divide-x divide-dashed divide-lineSoft border-t border-dashed border-lineSoft">
              {metrics.map((m) => (
                <MetricCell key={m.label} m={m} kick={d.code} reduced={reduced} />
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Visual Telemetry Dashboard */}
        <div className="flex items-center justify-center p-6 bg-slate-50/50 border-t border-line lg:border-t-0 lg:border-l lg:p-8">
          {isEducation ? (
            <EducationTelemetry reduced={reduced} />
          ) : (
            <WorkforceTelemetry reduced={reduced} />
          )}
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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-btn border border-lineSoft bg-white px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
          2 national platforms &middot; population-scale production
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

      {/* Two full-width panels stacked vertically */}
      <div className="flex flex-col gap-6">
        {DEPLOYMENTS.map((d) => (
          <DeploymentPanel key={d.code} d={d} reduced={reduced} />
        ))}
      </div>
    </div>
  );
}
