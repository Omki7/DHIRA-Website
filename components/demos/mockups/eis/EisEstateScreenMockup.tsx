/* ------------------------------------------------------------------------
 * SIMULATED PRODUCT UI — Akashic EIS, the estate view. Not live software.
 *
 * The flagship screen for [one-picture]. Where the hero brief answers "what
 * needs me this morning", this answers "what does the whole organisation look
 * like, and how is it ranked".
 *
 * Two things it has to show that a dashboard screenshot cannot:
 *
 *   1. THE COLUMNS ARE THE INDUSTRY. A plant estate has plants, lines,
 *      supervisors and order book. A retail estate has regions, categories,
 *      rosters and sales. The table header is generated from the selected
 *      domain, so switching industry rebuilds the columns, not just the cells.
 *      Two of the four columns are marked shared, because every organisation
 *      has people and money and only the first two columns are really the
 *      industry.
 *
 *   2. THE LOOP RETURNS. The rail underneath runs signal to record and then
 *      points back at the systems named in the source strip at the top. An
 *      analytics tool stops at the answer; the return leg is the difference,
 *      so it is drawn rather than described.
 *
 * Light tokens, shared with the /akashic module screens.
 * --------------------------------------------------------------------- */

"use client";

import { useState } from "react";
import type { Domain } from "@/content/pages/solutions-eis";
import { SEVERITY } from "./severity";
import { AppTopBar, CARD, CANVAS, FilterChip, LiveChip, ModuleRail } from "./EisAppChrome";

export default function EisEstateScreenMockup({ domain }: { domain: Domain }) {
  const [activeUnit, setActiveUnit] = useState(domain.rows[0].unit);
  const active = domain.rows.find((r) => r.unit === activeUnit) ?? domain.rows[0];

  const flagged = domain.rows.filter((r) => r.severity !== "clear").length;

  return (
    <div className="flex w-full flex-col overflow-hidden bg-primary-bg text-left">
      <AppTopBar
        org={domain.org}
        view="Estate"
        right={
          <span className="flex items-center gap-2">
            <span className="hidden sm:block">
              <FilterChip label="All units" />
            </span>
            <LiveChip />
          </span>
        }
      />

      <div className="flex min-h-0 flex-1">
        <ModuleRail active="brief" />

        <div className={`flex min-w-0 flex-1 flex-col gap-2.5 p-3 ${CANVAS}`}>
          {/* Source strip. Named here so the return leg at the bottom has
              somewhere identifiable to point back to. */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 flex items-center gap-1.5 text-[8.5px] font-bold uppercase tracking-[0.09em] text-tertiary-text">
              <span className="h-[6px] w-[6px] rounded-full bg-positive" />
              Reading
            </span>
            {domain.sources.map((s) => (
              <span
                key={s.name}
                className="inline-flex items-center gap-1.5 rounded-full border border-card-line bg-background px-2 py-[3px]"
              >
                <span className="text-[10px] font-semibold text-ink">{s.name}</span>
                <span className="text-[8.5px] uppercase tracking-[0.06em] text-overcast">
                  {s.kind}
                </span>
                <span className="text-[8.5px] text-positive-text">{s.age}</span>
              </span>
            ))}
            <span className="ml-auto hidden text-[8.5px] font-bold uppercase tracking-[0.09em] text-tertiary-text sm:block">
              Read-only ingest
              <span className="mx-1 text-lineSoft">·</span>
              <span className="text-blue">
                {domain.sources.reduce((n, s) => n + s.writes, 0)} write actions
              </span>
            </span>
          </div>

          {/* Pillar summary. Compact, because the table below is the subject.
              Grid on small screens for the same reason as the brief: flexed
              tiles shrink until only the badge is left. */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-nowrap">
            {domain.pillars.map((p) => (
              <div key={p.key} className={`min-w-0 flex-1 px-3 py-2 ${CARD}`}>
                {/* No Shared/Industry badge here any more: the schema matrix
                    directly above this screen states that distinction across
                    all four industries at once, which is stronger than a
                    badge and stops the screen carrying the argument twice. */}
                <span className="flex items-center gap-1.5">
                  <span className="truncate text-[8.5px] font-bold tracking-[0.06em] text-tertiary-text">
                    {p.label.toUpperCase()}
                  </span>
                </span>
                <span className="mt-px block truncate text-[15px] font-bold tracking-tight text-ink">
                  {p.value}
                </span>
                <span className="block truncate text-[8.5px] text-overcast">
                  via {p.source}
                </span>
              </div>
            ))}
          </div>

          {/* The estate, ranked. The header cells come from the domain, so a
              different industry is a different table, not a relabelled one. */}
          <div className={`min-w-0 overflow-hidden ${CARD}`}>
            <div className="flex items-center gap-2 border-b border-subtle-stroke px-3 py-2">
              <span className="text-[11px] font-semibold text-ink">
                Ranked by converged risk
              </span>
              <span className="rounded-[5px] border border-red/20 bg-[rgb(var(--diagram-pink-bg))] px-1.5 py-[1px] text-[9px] font-bold text-[rgb(var(--diagram-pink))]">
                {flagged} need you
              </span>
              <span className="ml-auto text-[9.5px] text-tertiary-text">
                {domain.rows.length} of {domain.pillars[0].value}
              </span>
            </div>

            <div className="grid grid-cols-[1fr_auto] gap-x-2 border-b border-subtle-stroke bg-primary-bg px-3 py-1.5 md:grid-cols-12">
              {domain.pillars.map((p, i) => (
                <span
                  key={p.key}
                  className={`truncate text-[8.5px] font-bold uppercase tracking-[0.06em] text-tertiary-text ${
                    i === 0 ? "md:col-span-4" : i === 1 ? "hidden md:col-span-3 md:block" : i === 2 ? "hidden md:col-span-2 md:block" : "hidden md:col-span-2 md:block md:text-right"
                  }`}
                >
                  {p.label}
                </span>
              ))}
              <span className="text-right text-[8.5px] font-bold uppercase tracking-[0.06em] text-tertiary-text md:col-span-1">
                Signals
              </span>
            </div>

            <div className="divide-y divide-card-divide">
              {domain.rows.map((r) => {
                const on = r.unit === activeUnit;
                const sev = SEVERITY[r.severity];
                return (
                  <button
                    key={r.unit}
                    type="button"
                    onClick={() => setActiveUnit(r.unit)}
                    aria-pressed={on}
                    className={`grid w-full grid-cols-[1fr_auto] items-center gap-x-2 px-3 py-[7px] text-left transition-colors md:grid-cols-12 ${
                      on ? "bg-blue-subtle" : "hover:bg-primary-bg"
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2 md:col-span-4">
                      <span
                        className="h-[7px] w-[7px] flex-shrink-0 rounded-full"
                        style={{ background: sev.dot }}
                      />
                      <span className="truncate text-[11px] font-medium text-ink">
                        {r.unit}
                      </span>
                    </span>
                    <span className="hidden truncate text-[11px] text-secondary-text md:col-span-3 md:block">
                      {r.output}
                    </span>
                    <span className="hidden truncate text-[11px] text-secondary-text md:col-span-2 md:block">
                      {r.people}
                    </span>
                    <span className="hidden truncate text-right text-[11px] font-semibold text-ink md:col-span-2 md:block">
                      {r.money}
                    </span>
                    <span className="text-right md:col-span-1">
                      {r.signals > 0 ? (
                        <span
                          className="inline-block rounded-[4px] px-1.5 py-[1px] text-[9px] font-bold"
                          style={{ background: sev.bg, color: sev.text }}
                        >
                          {r.signals}
                        </span>
                      ) : (
                        <span className="text-[9px] text-overcast">&mdash;</span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* The selected row, expanded. One record read four ways. */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-subtle-stroke bg-primary-bg px-3 py-2.5">
              <span className="min-w-0 flex-1">
                <span className="block text-[8.5px] font-bold uppercase tracking-[0.07em] text-tertiary-text">
                  One record
                </span>
                <span className="mt-px flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                  {[active.unit, active.output, active.people, active.money].map((v, i) => (
                    <span key={v + i} className="flex items-center gap-1.5">
                      {i > 0 && <span className="text-[9px] text-lineSoft">&rarr;</span>}
                      <span className="truncate text-[11px] font-medium text-ink">{v}</span>
                    </span>
                  ))}
                </span>
              </span>
              <span className="flex-shrink-0 text-right text-[9.5px] text-tertiary-text">
                {active.note}
              </span>
            </div>
          </div>

          {/* The signal-to-record rail used to be drawn here. It has moved to
              [the-loop], which is the section whose entire job it is; showing
              it early spent that section's punchline two screens ahead. What
              stays is the one line this screen owes the reader: where the
              decision on the selected row would land. */}
          <div className={`flex items-center gap-2 px-3 py-2.5 ${CARD}`}>
            <span className="h-3 w-3 flex-shrink-0 rounded-bl-[4px] border-b border-l border-blue/50" />
            <span className="truncate text-[9.5px] text-secondary-text">
              Writes back to{" "}
              <span className="font-mono text-ink">{domain.actionField}</span> in{" "}
              <span className="font-semibold text-ink">{domain.actionTarget}</span>,
              approved by the {domain.approver.toLowerCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
