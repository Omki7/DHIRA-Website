/* The three service lines, drawn the way homepage [03] draws its solutions:
   one editorial process drawing each, words inside the picture, blue for
   the result. Not screens. The use cases are examples, unscored; the
   pipeline uses the sample business's systems in their homepage colours;
   the cited answer is lifted from the /akashic [01] renewal story. */

import { SOURCE_COLOUR } from "@/components/demos/delivery/sources";
import type { DeliveryPage } from "@/content/pages/delivery";

type Kind = DeliveryPage["services"]["lines"][number]["drawing"];

function Label({ children }: { children: string }) {
  return <text x="24" y="31" className="fill-secondary-text font-mono text-[11px] uppercase tracking-[1.2px]">{children}</text>;
}

function Caption({ children }: { children: string }) {
  return <text x="24" y="283" className="fill-secondary-text text-[12px]">{children}</text>;
}

/* Strategic Advisory: candidate use cases on value against readiness. */
function AdvisoryDrawing() {
  const others = [
    { cx: 120, cy: 96, label: "Churn model", end: false },
    { cx: 236, cy: 176, label: "Revenue reconciliation", end: false },
    { cx: 330, cy: 214, label: "Contract search", end: true },
    { cx: 100, cy: 206, label: "Supplier scoring", end: false },
  ];
  return (
    <>
      <Label>Use cases, ranked</Label>
      <path d="M56 50V232H376" className="stroke-line" />
      <path d="M216 50V232M56 141H376" className="stroke-lineSoft" strokeDasharray="3 5" />
      <text x="376" y="250" textAnchor="end" className="fill-secondary-text text-[11px]">Readiness of the data →</text>
      <text x="44" y="232" transform="rotate(-90 44 232)" className="fill-secondary-text text-[11px]">Value to the business →</text>
      {others.map((p) => (
        <g key={p.label}>
          <circle cx={p.cx} cy={p.cy} r="4.5" className="fill-background stroke-default-stroke" strokeWidth="1.2" />
          <text x={p.end ? p.cx - 12 : p.cx + 12} y={p.cy + 4} textAnchor={p.end ? "end" : "start"} className="fill-ink text-[12px]">{p.label}</text>
        </g>
      ))}
      <circle cx="322" cy="84" r="11" className="stroke-blue-border" />
      <circle cx="322" cy="84" r="5.5" className="fill-blue" />
      <text x="304" y="81" textAnchor="end" className="fill-blue text-[13px] font-medium">Demand forecast</text>
      <rect x="234" y="90" width="70" height="20" rx="4" className="fill-blue-subtle stroke-blue-border" />
      <text x="269" y="104" textAnchor="middle" className="fill-blue text-[11px]">Start here</text>
      <Caption>Start where value and readiness meet.</Caption>
    </>
  );
}

/* Engineering at Scale: three systems through one tested pipeline. */
function EngineeringDrawing() {
  const sources = [
    { y: 78, name: "Salesforce", colour: SOURCE_COLOUR.salesforce },
    { y: 126, name: "NetSuite", colour: SOURCE_COLOUR.netsuite },
    { y: 174, name: "Sales plan", colour: SOURCE_COLOUR.plan },
  ];
  const checks = ["Schema tests", "Quality rules", "Lineage"];
  const docs = [
    { x: 112, w: 54, label: "Tests" },
    { x: 176, w: 78, label: "Runbooks" },
    { x: 264, w: 110, label: "Decision record" },
  ];
  return (
    <>
      <Label>Three systems, one pipeline</Label>
      {sources.map((s) => (
        <g key={s.name}>
          <circle cx="30" cy={s.y - 14} r="3.5" fill={s.colour} />
          <text x="40" y={s.y - 10} className="fill-ink text-[13px]">{s.name}</text>
          <path d={s.y === 126 ? "M-6 126H176" : `M-6 ${s.y}H104C144 ${s.y} 144 126 176 126`} stroke={s.colour} strokeWidth="1.5" />
        </g>
      ))}
      <rect x="176" y="70" width="108" height="112" rx="8" className="fill-background stroke-default-stroke" />
      <text x="190" y="94" className="fill-ink text-[13px] font-medium">Data pipeline</text>
      {checks.map((c, i) => (
        <g key={c}>
          <rect x="190" y={113 + i * 20} width="6" height="6" rx="1" className="fill-blue-subtle stroke-blue" />
          <text x="204" y={120 + i * 20} className="fill-secondary-text text-[11.5px]">{c}</text>
        </g>
      ))}
      <path d="M284 126H410" className="stroke-blue" strokeWidth="1.8" />
      <circle cx="340" cy="126" r="5" className="fill-blue" />
      <text x="376" y="110" textAnchor="end" className="fill-ink text-[12px] font-medium">In production</text>
      <path d="M230 182V200M139 200H319" className="stroke-default-stroke" strokeDasharray="3 4" />
      {docs.map((d) => (
        <g key={d.label}>
          <path d={`M${d.x + d.w / 2} 200V210`} className="stroke-default-stroke" strokeDasharray="3 4" />
          <rect x={d.x} y="210" width={d.w} height="24" rx="6" className="fill-background stroke-card-line" />
          <text x={d.x + d.w / 2} y="226" textAnchor="middle" className="fill-secondary-text text-[11.5px]">{d.label}</text>
        </g>
      ))}
      <Caption>Built, tested and documented on your stack.</Caption>
    </>
  );
}

/* AI Solutions and Accelerators: a plain question, a cited answer, a person. */
function AiDrawing() {
  return (
    <>
      <Label>A question, answered with sources</Label>
      <rect x="24" y="48" width="352" height="34" rx="17" className="fill-background stroke-default-stroke" />
      <circle cx="44" cy="64" r="5.5" className="stroke-secondary-text" strokeWidth="1.3" />
      <path d="M48 68l4 4" className="stroke-secondary-text" strokeWidth="1.3" />
      <text x="62" y="70" className="fill-ink text-[13px]">Which renewals are still unsigned?</text>
      <path d="M200 82V98" className="stroke-line" />
      <rect x="24" y="98" width="352" height="106" rx="8" className="fill-background stroke-card-line" />
      <text x="40" y="120" className="fill-blue font-mono text-[10px] uppercase tracking-[1px]">Answer · cited</text>
      <text x="40" y="144" className="fill-ink text-[14px] font-medium">Two distributor renewals are</text>
      <text x="40" y="164" className="fill-ink text-[14px] font-medium">
        still unsigned.<tspan className="fill-blue text-[11px] font-normal" dx="4" dy="-5">[1] [2]</tspan>
      </text>
      <path d="M40 178H360" className="stroke-lineSoft" />
      <text x="40" y="194" className="fill-secondary-text text-[11px]">[1] Renewal email, 2 July · [2] Renewal contract</text>
      <path d="M46 204V230" className="stroke-ink" strokeWidth="1.2" />
      <circle cx="46" cy="242" r="12" className="fill-ink" />
      <circle cx="46" cy="238" r="3.2" className="stroke-on-action" strokeWidth="1.4" />
      <path d="M40.5 248.5c1.1-3.2 3.1-4.8 5.5-4.8s4.4 1.6 5.5 4.8" className="stroke-on-action" strokeWidth="1.4" />
      <text x="68" y="246" className="fill-ink text-[13px] font-medium">Reviewed by your team</text>
      <Caption>Every answer cites its source.</Caption>
    </>
  );
}

export default function ServiceDrawing({ kind, label }: { kind: Kind; label: string }) {
  return (
    <svg viewBox="0 0 400 304" fill="none" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={label} focusable="false" className="h-full w-full max-w-[440px]">
      {kind === "advisory" ? <AdvisoryDrawing /> : kind === "engineering" ? <EngineeringDrawing /> : <AiDrawing />}
    </svg>
  );
}
