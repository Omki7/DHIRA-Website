/*
 * SIMULATED PRODUCT UI (§8a applies): bespoke hero boards for the sector
 * pages — fake Akashic screens with hardcoded demo figures, one per sector,
 * so each hero shows the product moment that matters in that industry
 * instead of a stock photograph. Shared chrome, bespoke content.
 */

import { LiveChip } from "@/components/sections/akashic/AkashicCardChrome";

function BoardShell({
  title,
  footerLeft,
  footerRight,
  children,
}: {
  title: string;
  footerLeft: string;
  footerRight: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-[480px] overflow-hidden rounded-frame border border-subtle-stroke bg-white text-left shadow-frame">
      <div className="h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent" aria-hidden />
      <div className="flex items-center justify-between border-b border-dashed border-lineSoft px-4 py-3">
        <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-inkSoft">
          <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
          {title}
        </span>
        <LiveChip />
      </div>
      {children}
      <div className="flex items-center justify-between border-t border-dashed border-lineSoft bg-primary-bg px-4 py-2.5 font-mono text-[8.5px] uppercase tracking-[0.06em]">
        <span className="text-inkSoft">{footerLeft}</span>
        <span className="text-overcast">{footerRight}</span>
      </div>
    </div>
  );
}

function SourceRow({
  system,
  record,
  sub,
}: {
  system: string;
  record: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5">
      <span className="w-[52px] shrink-0 rounded-[4px] border border-subtle-stroke bg-primary-bg px-1.5 py-0.5 text-center font-mono text-[8.5px] font-semibold uppercase tracking-[0.06em] text-inkSoft">
        {system}
      </span>
      <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium tracking-tight text-ink">
        {record}
      </span>
      <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.06em] text-overcast">
        {sub}
      </span>
    </div>
  );
}

function ResolveBar({ label }: { label: string }) {
  return (
    <div className="relative flex items-center justify-center border-y border-dashed border-lineSoft bg-primary-bg py-1.5">
      <span className="flex items-center gap-1.5 font-mono text-[8.5px] font-semibold uppercase tracking-[0.1em] text-blue">
        <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
        {label}
      </span>
    </div>
  );
}

function HighlightCard({
  title,
  sub,
  action,
  tags,
}: {
  title: string;
  sub: string;
  action?: string;
  tags?: string[];
}) {
  return (
    <div className="mx-4 my-3.5 rounded-card border border-blue-border bg-blue-subtle px-3.5 py-3">
      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 truncate text-[13px] font-semibold tracking-tight text-ink">
          {title}
        </p>
        {action ? (
          <span className="shrink-0 rounded-full bg-blue px-2.5 py-1 font-mono text-[8.5px] font-semibold uppercase tracking-[0.08em] text-white">
            {action}
          </span>
        ) : null}
      </div>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.08em] text-inkSoft">
        {sub}
      </p>
      {tags ? (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-blue-border bg-white px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.06em] text-blue"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function HealthcareBoard() {
  return (
    <BoardShell
      title="Patient record · resolving"
      footerLeft="Consent-aware · PII masked"
      footerRight="Every access stamped"
    >
      <div className="divide-y divide-dashed divide-lineSoft">
        <SourceRow system="HIS" record="Sharma, Rahul · IP-2041" sub="Ward" />
        <SourceRow system="LIS" record="R. Sharma · LAB-0088" sub="Labs" />
        <SourceRow system="CLM" record="RAHUL S · CLM-3391" sub="Insurer" />
      </div>
      <ResolveBar label="Resolved · one patient" />
      <HighlightCard
        title="Rahul Sharma · one record"
        sub="Golden record · 3 registrations merged"
        tags={["Full history", "Allergies surfaced", "Sources attached"]}
      />
    </BoardShell>
  );
}

export function FinanceBoard() {
  return (
    <BoardShell
      title="Pattern watch · all products"
      footerLeft="One graph · every channel"
      footerRight="Evidence attached"
    >
      <div className="divide-y divide-dashed divide-lineSoft">
        <SourceRow system="CARD" record="₹49,200 → A. K. Enterprises" sub="14:02" />
        <SourceRow system="UPI" record="₹48,700 → AK Enterprise" sub="14:07" />
        <SourceRow system="SAV" record="₹47,900 → A.K. Entprs" sub="14:08" />
      </div>
      <ResolveBar label="Same entity · chain detected" />
      <HighlightCard
        title="Structuring pattern flagged"
        sub="3 hops · flagged as it forms, not weeks later"
        action="Review"
        tags={["Entities resolved", "Lineage ready"]}
      />
    </BoardShell>
  );
}

export function RetailBoard() {
  return (
    <BoardShell
      title="Demand vs stock · live"
      footerLeft="POS · ERP · WMS unified"
      footerRight="Per store, per SKU"
    >
      <div className="divide-y divide-dashed divide-lineSoft">
        {[
          { store: "Store 083 · Pune", days: "6 days cover", pct: 72 },
          { store: "Store 114 · Nagpur", days: "2 days cover", pct: 24, low: true },
          { store: "DC-2 · Bhiwandi", days: "Surplus · 340 units", pct: 92 },
        ].map((row) => (
          <div key={row.store} className="flex items-center gap-3 px-4 py-2.5">
            <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium tracking-tight text-ink">
              {row.store}
            </span>
            <span className="h-[5px] w-[64px] shrink-0 overflow-hidden rounded-full bg-tertiary-bg">
              <span
                className={`block h-full rounded-full ${row.low ? "bg-blue" : "bg-line"}`}
                style={{ width: `${row.pct}%` }}
              />
            </span>
            <span
              className={`w-[104px] shrink-0 text-right font-mono text-[9px] uppercase tracking-[0.04em] ${
                row.low ? "font-semibold text-blue" : "text-overcast"
              }`}
            >
              {row.days}
            </span>
          </div>
        ))}
      </div>
      <ResolveBar label="Stockout projected · Friday" />
      <HighlightCard
        title="Move 240 units · DC-2 → Store 114"
        sub="Ahead of the weekend peak · trend attached"
        action="Approve"
      />
    </BoardShell>
  );
}

export function EducationBoard() {
  return (
    <BoardShell
      title="Learner journey · term 3"
      footerLeft="SIS · LMS · assessment unified"
      footerRight="Role-based access"
    >
      <div className="divide-y divide-dashed divide-lineSoft">
        <SourceRow system="ATT" record="Attendance below own pattern" sub="Wk 2" />
        <SourceRow system="LMS" record="Assessment scores sliding" sub="Wk 3" />
        <SourceRow system="FEE" record="Fee payment stalled" sub="Wk 3" />
      </div>
      <ResolveBar label="Pattern matched · at-risk" />
      <HighlightCard
        title="Flagged a term early"
        sub="Counsellor assigned · week 4, not week 14"
        action="Reach out"
        tags={["One learner record", "Signals combined"]}
      />
    </BoardShell>
  );
}

export function EnergyBoard() {
  return (
    <BoardShell
      title="Feeder health · zone 7"
      footerLeft="SCADA · AMI · historian unified"
      footerRight="Maintained on condition"
    >
      <div className="divide-y divide-dashed divide-lineSoft">
        {[
          { asset: "TX-118 · Substation A", state: "Stable", ok: true },
          { asset: "TX-042 · Feeder 7", state: "Thermal drift · 11d", ok: false },
          { asset: "TX-205 · Substation C", state: "Stable", ok: true },
        ].map((row) => (
          <div key={row.asset} className="flex items-center gap-3 px-4 py-2.5">
            <span
              className={`h-[6px] w-[6px] shrink-0 rounded-full ${
                row.ok ? "bg-line" : "bg-blue animate-[ps-pulse_2s_infinite]"
              }`}
              aria-hidden
            />
            <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium tracking-tight text-ink">
              {row.asset}
            </span>
            <span
              className={`shrink-0 font-mono text-[9px] uppercase tracking-[0.04em] ${
                row.ok ? "text-overcast" : "font-semibold text-blue"
              }`}
            >
              {row.state}
            </span>
          </div>
        ))}
      </div>
      <ResolveBar label="Condition score falling · TX-042" />
      <HighlightCard
        title="Inspect before the trip"
        sub="Telemetry + asset lineage attached to the work order"
        action="Dispatch"
      />
    </BoardShell>
  );
}

export const SECTOR_BOARDS: Record<string, () => React.ReactNode> = {
  healthcare: HealthcareBoard,
  finance: FinanceBoard,
  retail: RetailBoard,
  education: EducationBoard,
  energy: EnergyBoard,
};
