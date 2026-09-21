/* ------------------------------------------------------------------------
 * SIMULATED PRODUCT UI — not real Akashic app code.
 *
 * Shared light-theme chrome for every /solutions/eis wireframe, so the six
 * screens on that page read as one product rather than six illustrations.
 * Deliberately on the same token system as the /akashic module screens:
 *
 *   ground    #FAFAFB app · #F6F7F8 canvas · #FFFFFF cards
 *   borders   #E9EAEE cards and chrome · #EEEFF1 soft dividers
 *   text      #1A1C1D · #5C5E63 · #8E8F91
 *   accents   blue #3E63DD · green #1F9D6B · amber #E0A93B · rose #C13059
 *   shadow    0 1px 2px rgba(18,20,26,0.05) — flat and crisp, never glowy
 *
 * These are React components rather than the HTML strings used by
 * HeroProductScreensMockup, because EIS screens are industry-switchable and
 * need props.
 * --------------------------------------------------------------------- */

import type { ReactNode } from "react";

export const CARD = "rounded-[10px] border border-[#E9EAEE] bg-white";
export const CANVAS = "bg-[#F6F7F8]";

/* ---------------------------------------------------------------- top bar */

export function AppTopBar({
  org,
  view,
  right,
}: {
  org: string;
  view: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex h-11 flex-shrink-0 items-center gap-2.5 border-b border-[#E9EAEE] bg-white px-3.5">
      <span className="flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-[6px] bg-ink text-[10px] font-bold text-white">
        A
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[12px] font-bold leading-tight text-ink">
          Akashic EIS
        </span>
        <span className="block truncate text-[9px] leading-tight text-[#8E8F91]">
          {org}
        </span>
      </span>
      <span className="mx-1 h-[18px] w-px bg-[#E9EAEE]" />
      <span className="truncate text-[11px] font-medium text-[#5C5E63]">{view}</span>
      <span className="flex-1" />
      {right}
    </div>
  );
}

/* Green "Live" pill, matching the /akashic screens exactly. */
export function LiveChip({ label = "Live" }: { label?: string }) {
  return (
    <span className="inline-flex h-[24px] flex-shrink-0 items-center gap-1.5 rounded-full border border-[#CBE8D9] bg-[#EAF7F0] px-2.5">
      <span className="h-[6px] w-[6px] rounded-full bg-[#1F9D6B]" />
      <span className="text-[10.5px] font-semibold text-[#1B8A5F]">{label}</span>
    </span>
  );
}

export function FilterChip({ label }: { label: string }) {
  return (
    <span className="flex h-[26px] flex-shrink-0 items-center gap-1.5 rounded-[7px] border border-[#E9EAEE] bg-white px-2">
      <span className="text-[11px] font-medium text-ink">{label}</span>
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" strokeWidth="3" strokeLinecap="round" aria-hidden>
        <path d="m6 9 6 6 6-6" />
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------- module rail */

const RAIL_ICONS: Record<string, string> = {
  brief: "M4 5h16M4 12h16M4 19h10",
  ask: "M12 3a9 9 0 1 0 4.5 16.8L21 21l-1.2-4.5A9 9 0 0 0 12 3Z",
  decide: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Zm-3 9 2.2 2.2L15 10",
  record: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5",
};

export function ModuleRail({ active }: { active: keyof typeof RAIL_ICONS }) {
  const items: { key: keyof typeof RAIL_ICONS; label: string }[] = [
    { key: "brief", label: "Brief" },
    { key: "ask", label: "Ask" },
    { key: "decide", label: "Decide" },
    { key: "record", label: "Record" },
  ];
  return (
    <div className="hidden w-[58px] flex-shrink-0 flex-col items-center gap-1 border-r border-[#E9EAEE] bg-white py-2.5 sm:flex">
      {items.map((i) => {
        const on = i.key === active;
        return (
          <span
            key={i.key}
            className={`flex w-[46px] flex-col items-center gap-1 rounded-[8px] py-1.5 ${
              on ? "bg-blue-subtle text-blue" : "text-[#8E8F91]"
            }`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d={RAIL_ICONS[i.key]} />
            </svg>
            <span className={`text-[8.5px] ${on ? "font-semibold" : ""}`}>{i.label}</span>
          </span>
        );
      })}
    </div>
  );
}

/* KpiTile, Sparkline, CardTitle and BarRow lived here to serve the morning
   brief's first build, which was a KPI row over two chart cards. That build
   was replaced (see the banner in EisBriefScreenMockup) and the Estate
   screen never used them, so they are gone rather than left as a tempting
   shortcut back to the dashboard shape. */
