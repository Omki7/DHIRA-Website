/* ------------------------------------------------------------------------
 * SIMULATED PRODUCT UI — not live software, not real customer data.
 *
 * [the-loop]'s five stations, and the return leg that makes them a loop.
 *
 * WHY THIS IS STATIC. The previous build was a tabbed simulator: five
 * stations, one visible, four behind tabs an executive was never going to
 * click. A section whose entire claim is "the loop closes" cannot hide four
 * fifths of the loop. Everything is on screen at once.
 *
 * WHY THE RETURN LEG IS DRAWN. Signal to record is a line, not a loop. What
 * makes it a loop is that the write lands back in the source system, so the
 * NEXT morning's brief reads the changed world. That leg is the product's
 * actual claim and every competitor's diagram stops one station short of
 * it, so here it is the only dashed, accented element in the picture.
 *
 * The scenario station is content the page had nowhere else: options,
 * costed, before the decision. Without it the loop reads as "alert, then
 * obey", which is not how a chief executive decides anything.
 *
 * Same plant, same morning as the hero, so the page tells one story.
 * --------------------------------------------------------------------- */

import type { ReactNode } from "react";
import { SEVERITY } from "@/lib/eisDomains";

const FEED = [SEVERITY.high.dot, SEVERITY.watch.dot, "#7C5CFC"];

/* Stacks on a phone. Side by side, this truncated
   "MaintenanceOrder.PlannedStart" and the action names, and unlike the
   simulated app screens (where truncation is honest, because a real app
   truncates) this is a diagram, where losing the value loses the point. */
function Field({ k, v, mono = true }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-x-3 gap-y-0.5 sm:flex-row sm:items-baseline sm:justify-between">
      <span className="flex-shrink-0 text-[9px] font-bold uppercase tracking-[0.06em] text-[#8E8F91]">
        {k}
      </span>
      <span
        className={`break-words text-[10.5px] text-ink sm:truncate ${mono ? "font-mono" : "font-medium"}`}
      >
        {v}
      </span>
    </div>
  );
}

const STATIONS: { n: string; name: string; claim: string; art: ReactNode }[] = [
  {
    n: "01",
    name: "Signal",
    claim: "Three systems land on one asset, before anyone asks.",
    art: (
      <div className="space-y-1.5">
        {[
          ["Maximo", "Bearing wear past threshold"],
          ["SAP S/4HANA", "Spare shipment slipped 6 days"],
          ["Workday", "Sole certified operator on leave"],
        ].map(([sys, note], i) => (
          /* Wraps under the system name on a phone: side by side, the
             86px label left too little for "Sole certified operator on
             leave" and the finding was the half that mattered. */
          <div key={sys} className="flex items-baseline gap-2">
            <span
              className="mt-[6px] h-[6px] w-[6px] flex-shrink-0 self-start rounded-full"
              style={{ background: FEED[i] }}
            />
            <span className="min-w-0 flex-1 sm:flex sm:items-baseline sm:gap-2">
              <span className="block text-[9.5px] font-semibold text-[#5C5E63] sm:w-[86px] sm:flex-shrink-0 sm:truncate">
                {sys}
              </span>
              <span className="block text-[10.5px] text-ink sm:min-w-0 sm:flex-1 sm:truncate">
                {note}
              </span>
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    n: "02",
    name: "Question",
    claim: "The executive asks in their own words. The answer carries its definition.",
    art: (
      <div>
        <p className="rounded-[8px] bg-white px-2.5 py-2 text-[11.5px] text-ink">
          &ldquo;What does it cost me to wait until the planned window?&rdquo;
        </p>
        <div className="mt-2 space-y-[5px]">
          <Field k="Scope" v="Pune Plant 4, press line 2" />
          <Field k="Defined as" v="Order book at risk, FY26" />
        </div>
      </div>
    ),
  },
  {
    n: "03",
    name: "Scenario",
    claim: "Both options costed, so the decision is a choice and not an instruction.",
    art: (
      <div className="space-y-1.5">
        {[
          { opt: "Wait for the planned window", cost: "₹38 Cr", note: "Line stops day 9", bad: true },
          { opt: "Pull the window forward", cost: "₹2.1 Cr", note: "6 shifts lost, no stoppage", bad: false },
        ].map((o) => (
          <div
            key={o.opt}
            className="flex items-center gap-2 rounded-[7px] border bg-white px-2.5 py-2"
            style={{ borderColor: o.bad ? SEVERITY.high.border : SEVERITY.clear.border }}
          >
            <span className="min-w-0 flex-1">
              {/* Wraps rather than truncates: "Pull forward the maintenance
                  window" is the option, and half of it is not an option. */}
              <span className="block text-[11px] font-medium leading-tight text-ink">
                {o.opt}
              </span>
              <span className="mt-0.5 block text-[9px] leading-tight text-[#8E8F91]">
                {o.note}
              </span>
            </span>
            <span
              className="flex-shrink-0 text-[13px] font-bold leading-none"
              style={{ color: o.bad ? SEVERITY.high.text : SEVERITY.clear.text }}
            >
              {o.cost}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    n: "04",
    name: "Decision",
    claim: "A typed action against a named field, with a named approver.",
    art: (
      <div className="space-y-[5px]">
        <Field k="Action" v="Pull forward the maintenance window" mono={false} />
        <Field k="Writes" v="MaintenanceOrder.PlannedStart" />
        <Field k="Target" v="SAP PM, prod" />
        <Field k="Approver" v="Plant director" mono={false} />
      </div>
    ),
  },
  {
    n: "05",
    name: "Record",
    claim: "Written, verified on the next read, and kept whether it worked or not.",
    art: (
      <div className="space-y-1.5">
        {[
          ["06:02", "Approved by the plant director", true],
          ["06:02", "Written to SAP PM", true],
          ["06:03", "Verified on re-read", true],
        ].map(([t, what]) => (
          <div key={String(t) + String(what)} className="flex items-baseline gap-2.5">
            <span className="w-[30px] flex-shrink-0 font-mono text-[9.5px] text-[#8E8F91]">
              {t}
            </span>
            <span className="min-w-0 flex-1 truncate text-[10.5px] text-ink">{what}</span>
            <span
              className="h-[6px] w-[6px] flex-shrink-0 rounded-full"
              style={{ background: SEVERITY.clear.dot }}
            />
          </div>
        ))}
      </div>
    ),
  },
];

export default function EisLoopCircuitMockup() {
  return (
    <div className="rounded-outer border border-eis-line bg-white px-5 py-6 sm:px-8 sm:py-8">
      {/* pl leaves the gutter the return leg is drawn in. */}
      <div className="relative pl-8 sm:pl-11">
        {/* THE RETURN LEG. A bracket up the left-hand gutter, from the record
            back into the signal. Dashed and accented because it is the one
            element here that a reporting tool does not have. */}
        <div
          className="pointer-events-none absolute bottom-[52px] left-0 top-[13px] w-[18px] rounded-l-[10px] border-b border-l border-t border-dashed border-blue/45 sm:w-[26px]"
          aria-hidden
        />
        <svg
          className="pointer-events-none absolute left-[14px] top-[8px] sm:left-[22px]"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          aria-hidden
        >
          <path d="M1 1l4 4-4 4" fill="none" stroke="#3E63DD" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {STATIONS.map((s, i) => (
          <div key={s.n} className="relative">
            {/* The forward rail between stations. */}
            {i < STATIONS.length - 1 && (
              <span
                className="absolute bottom-0 left-[11px] top-[26px] w-px bg-eis-line"
                aria-hidden
              />
            )}

            <div className={`flex gap-4 ${i === STATIONS.length - 1 ? "" : "pb-7"}`}>
              <span className="relative z-10 flex h-[23px] w-[23px] flex-shrink-0 items-center justify-center rounded-full bg-ink text-[9.5px] font-bold text-white">
                {s.n}
              </span>

              <div className="grid min-w-0 flex-1 gap-x-8 gap-y-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
                <div className="min-w-0">
                  <h4 className="text-[15px] font-medium leading-tight text-eis-ink">
                    {s.name}
                  </h4>
                  <p className="mt-1 text-[13px] leading-[1.45] text-eis-caption">
                    {s.claim}
                  </p>
                </div>
                <div className="min-w-0 rounded-inner border border-[#E9EAEE] bg-primary-bg px-3 py-2.5">
                  {s.art}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Where the leg lands, said in words. */}
        <div className="mt-6 flex gap-4">
          <span className="w-[23px] flex-shrink-0" />
          <p className="text-[13px] leading-[1.5] text-eis-body">
            <span className="font-medium text-blue">The leg that closes it.</span>{" "}
            SAP PM now holds the new window, so tomorrow&rsquo;s 06:00 brief opens
            on a plant that is no longer stopping. Nothing was rekeyed, and the
            whole thing is in the record.
          </p>
        </div>
      </div>
    </div>
  );
}
