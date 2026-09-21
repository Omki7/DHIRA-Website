/* ------------------------------------------------------------------------
 * SIMULATED PRODUCT UI — not live software, not real customer data.
 *
 * The six evidence panels in [capabilities]. Each one is the proof for the
 * claim printed above it: if the claim says lineage, the panel shows the
 * definition and the upstream chain; if it says write-back, it shows the
 * named field, the target system and the idempotency key.
 *
 * WHY THESE ARE SMALL. The previous version floated a full product panel
 * inside a 4:5 atmosphere tile in a horizontal carousel. Three consequences,
 * all bad: roughly half of every tile was empty gradient, panels were
 * clipped mid-sentence by the tile edge, and half the capabilities sat off
 * the right of the rail where nobody scrolled. These are sized to be read
 * whole, in a grid, with no scrolling.
 *
 * Each panel is set in a DIFFERENT industry, which is retained from the
 * previous build because it is the right call: the capability is the
 * constant, the world it runs in is not.
 *
 * Light tokens shared with the /akashic module screens.
 * --------------------------------------------------------------------- */

import type { ReactNode } from "react";

const PANEL = "rounded-inner border border-[#E9EAEE] bg-primary-bg px-3.5 py-3";

/* A key/value line. The workhorse: most of what makes a figure defensible
   is a list of definitions somebody can dispute. */
function Row({ k, v, mono = true }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="flex-shrink-0 text-[9px] font-bold uppercase tracking-[0.06em] text-[#8E8F91]">
        {k}
      </span>
      <span
        className={`truncate text-[10.5px] text-ink ${mono ? "font-mono" : "font-medium"}`}
      >
        {v}
      </span>
    </div>
  );
}

function Cap({ children }: { children: ReactNode }) {
  return (
    <span className="block text-[8.5px] font-bold uppercase tracking-[0.09em] text-[#B4BAC2]">
      {children}
    </span>
  );
}

/* 01 — RETAIL. The definition is what people actually argue about. */
export function EvDefinition() {
  return (
    <div className={PANEL}>
      <Cap>Retail</Cap>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="text-[10.5px] text-[#8E8F91]">Like-for-like sales</span>
        <span className="ml-auto border-b-2 border-blue/50 text-[17px] font-bold leading-none tracking-tight text-ink">
          +4.2%
        </span>
      </div>
      <div className="mt-2.5 space-y-[5px]">
        <Row k="Defined as" v="Stores open 13+ months" />
        <Row k="Excludes" v="Closures, refits, new formats" />
        <Row k="As at" v="Today 05:58" />
      </div>
      <div className="mt-2.5 flex items-center gap-1 border-t border-[#EEEFF1] pt-2.5">
        {["POS estate", "sales_daily", "lfl_sales"].map((n, i) => (
          <span key={n} className="flex min-w-0 items-center gap-1">
            {i > 0 && <span className="flex-shrink-0 text-[9px] text-[#B4BAC2]">&rarr;</span>}
            <span className="truncate rounded-[5px] border border-[#E9EAEE] bg-white px-1.5 py-[2px] font-mono text-[9px] text-[#5C5E63]">
              {n}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* 02 — FINANCIAL SERVICES. Three spellings resolving to one obligor. */
export function EvEntity() {
  return (
    <div className={PANEL}>
      <Cap>Financial services</Cap>
      <div className="mt-2 space-y-[5px]">
        {[
          ["Core banking", "SUNDARAM AUTO PARTS P LTD"],
          ["Lending", "Sundaram Auto Parts Pvt. Ltd."],
          ["Ledger", "Sundaram AutoParts"],
        ].map(([sys, name]) => (
          <div key={sys} className="flex items-center gap-2">
            {/* 74px: "Core banking" truncated to "CORE BANK…" at 62. */}
            <span className="w-[74px] flex-shrink-0 truncate text-[8.5px] font-bold uppercase tracking-[0.06em] text-[#8E8F91]">
              {sys}
            </span>
            <span className="min-w-0 flex-1 truncate rounded-[6px] bg-white px-2 py-[3px] font-mono text-[9.5px] text-[#5C5E63]">
              {name}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2.5 flex items-center gap-2 rounded-[8px] border border-blue-border bg-blue-subtle px-2.5 py-2">
        <span className="min-w-0 flex-1">
          <span className="block text-[8.5px] font-bold uppercase tracking-[0.06em] text-blue">
            One borrower, 98% match
          </span>
          <span className="block truncate text-[11.5px] font-bold text-ink">
            Sundaram Auto Parts
          </span>
        </span>
        <span className="flex-shrink-0 text-right">
          <span className="block text-[13px] font-bold leading-none text-ink">₹86 Cr</span>
          <span className="block text-[8.5px] text-[#8E8F91]">total exposure</span>
        </span>
      </div>
    </div>
  );
}

/* 03 — MANUFACTURING. Entitlements, shown as the same question answered
   two different ways for two different people. Added because the page
   criticises ungoverned assistants for having no access check and then
   never showed what having one looks like. */
export function EvPermissions() {
  const seats = [
    { who: "Group CFO", scope: "12 plants, all regions", figure: "₹4,180 Cr", wide: true },
    { who: "Plant director, Pune", scope: "1 plant", figure: "₹38 Cr", wide: false },
  ];
  return (
    <div className={PANEL}>
      <div className="flex items-baseline gap-2">
        <Cap>Manufacturing</Cap>
        <span className="ml-auto text-[9px] text-[#8E8F91]">
          &ldquo;What is exposed?&rdquo;
        </span>
      </div>
      <div className="mt-2 space-y-1.5">
        {seats.map((s) => (
          <div
            key={s.who}
            className="flex items-center gap-2 rounded-[7px] bg-white px-2.5 py-2"
          >
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[11px] font-medium text-ink">{s.who}</span>
              <span className="block truncate text-[9px] text-[#8E8F91]">{s.scope}</span>
            </span>
            <span className="flex-shrink-0 text-[13px] font-bold leading-none text-ink">
              {s.figure}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-2.5 border-t border-[#EEEFF1] pt-2.5 text-[10px] leading-snug text-[#8E8F91]">
        One question, one definition, two answers. Rows outside your
        entitlement never enter the answer.
      </p>
    </div>
  );
}

/* 04 — LOGISTICS. A decision as a typed object against a named field. */
export function EvAction() {
  return (
    <div className={PANEL}>
      <div className="flex items-baseline gap-2">
        <Cap>Logistics</Cap>
        <span className="ml-auto rounded-[5px] border border-blue-border bg-blue-subtle px-1.5 py-[1px] text-[9px] font-bold text-blue">
          Reversible
        </span>
      </div>
      <p className="mt-1.5 text-[12.5px] font-bold leading-snug text-ink">
        Hold dispatch on lane BLR&ndash;PNQ
      </p>
      <div className="mt-2 space-y-[5px]">
        <Row k="Writes" v="Shipment.DispatchHold" />
        <Row k="New value" v="true, until 14 Jun" />
        <Row k="Target" v="Oracle TMS, prod" />
        <Row k="Key" v="ACT-5120, single write" />
      </div>
      <p className="mt-2.5 border-t border-[#EEEFF1] pt-2.5 text-[10px] leading-snug text-[#8E8F91]">
        Composed by A. Mehta, approved by R. Nambiar. Never the same person.
      </p>
    </div>
  );
}

/* 05 — ACROSS THE ESTATE. The two planes, per system. */
export function EvPlanes() {
  const rows = [
    { name: "SAP S/4HANA", kind: "ERP", writes: 2 },
    { name: "Blue Yonder", kind: "Supply", writes: 1 },
    { name: "Workday", kind: "HR", writes: 0 },
    { name: "Snowflake", kind: "Warehouse", writes: 0 },
  ];
  return (
    <div className={PANEL}>
      <div className="flex items-baseline gap-2">
        <Cap>Across the estate</Cap>
        <span className="ml-auto text-[9px] text-[#8E8F91]">23 connectors</span>
      </div>
      <div className="mt-2 divide-y divide-[#EEEFF1]">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center gap-2 py-[6px] first:pt-0">
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[11px] font-medium text-ink">{r.name}</span>
              <span className="block text-[8.5px] text-[#B4BAC2]">{r.kind}</span>
            </span>
            <span className="flex flex-shrink-0 items-center gap-1.5">
              <span className="h-[6px] w-[6px] rounded-full bg-[#1F9D6B]" />
              <span className="text-[9px] text-[#8E8F91]">read</span>
            </span>
            <span className="w-[62px] flex-shrink-0 text-right">
              {r.writes > 0 ? (
                <span className="rounded-[4px] bg-blue-subtle px-1.5 py-[1px] text-[9px] font-bold text-blue">
                  {r.writes} {r.writes === 1 ? "write" : "writes"}
                </span>
              ) : (
                <span className="text-[9px] text-[#B4BAC2]">no writes</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 06 — ACROSS THE ESTATE. The record, including the write that failed. */
export function EvRecord() {
  const rows = [
    { t: "09:14", what: "Pull forward maintenance", where: "SAP PM", ok: true },
    { t: "09:02", what: "Release buffer allocation", where: "Blue Yonder", ok: true },
    { t: "08:47", what: "Freeze sector sanctions", where: "LOS, 403", ok: false },
  ];
  return (
    <div className={PANEL}>
      <div className="flex items-baseline gap-2">
        <Cap>Across the estate</Cap>
        <span className="ml-auto text-[9px] text-[#8E8F91]">Append only</span>
      </div>
      <div className="mt-2 space-y-1.5">
        {rows.map((r) => (
          <div key={r.t} className="flex items-baseline gap-2.5">
            <span className="w-[30px] flex-shrink-0 font-mono text-[9.5px] text-[#8E8F91]">
              {r.t}
            </span>
            <span className="min-w-0 flex-1 truncate text-[11px] text-ink">{r.what}</span>
            <span
              className="flex flex-shrink-0 items-center gap-1.5 text-[9.5px] font-semibold"
              style={{ color: r.ok ? "#1B8A5F" : "#C13059" }}
            >
              <span
                className="h-[6px] w-[6px] rounded-full"
                style={{ background: r.ok ? "#1F9D6B" : "#C13059" }}
              />
              {r.ok ? "written" : "rejected"}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-2.5 border-t border-[#EEEFF1] pt-2.5 text-[10px] leading-snug text-[#C13059]">
        Held, not retried. The permission gap was raised to the lending system
        owner.
      </p>
    </div>
  );
}
