/* ------------------------------------------------------------------------
 * SIMULATED PRODUCT UI — Akashic EIS, the morning brief. Not live software.
 *
 * WHY IT IS NOT A DASHBOARD. The first build was a KPI row over two chart
 * cards over an action strip, which is the shape of every enterprise
 * dashboard since about 2010 and answers questions an executive does not
 * have. They already know how many plants they run. Three moves replace it,
 * and each is a claim about what is actually needed at 06:00:
 *
 *   1. THE ORG'S SHAPE IS CONTEXT, NOT A METRIC. The four pillars are one
 *      line under INDUSTRY and SHARED headers. That states the product's
 *      argument (one governed spine, industry-shaped surfaces on top)
 *      better than four badged tiles did, in 30px instead of 90.
 *
 *   2. CONVERGENCE IS DRAWN. Three named systems, three lines, one node.
 *      "Three independent systems agree" is the whole product, so it is a
 *      diagram rather than three rows sitting near each other. Rows
 *      attribute to the software (Maximo, SAP, Workday), because that is an
 *      argument where a category ("maintenance") is only a taxonomy.
 *
 *   3. THE RUNWAY IS THE SIGNATURE. Not exposure ranked by size: a time
 *      axis out to 30 days where each unit sits on the day its window
 *      shuts. Executives decide on cost of delay, and the axis says the
 *      thing no ranked bar chart can — in financial and professional
 *      services the soonest item is NOT the biggest one.
 *
 * WHY THE GROUND IS WHITE AND NOT THE CANVAS GREY THE OTHER SCREENS USE.
 * A dark variant of this screen was built and reverted on user direction
 * (22 Jul 2026): the EIS wireframes stay light. Light does not mean going
 * back to the card grid though, so the content area is white with hairline
 * dividers rather than white cards floating on `CANVAS` grey. Nesting a
 * white card inside a grey canvas is what made the first build read as a
 * dashboard, and it is the one thing this screen deliberately does not do.
 * Chrome (top bar, rail, live chip) is shared with the other EIS screens so
 * the page still reads as one product.
 *
 * The loop closes on screen: approve runs written then verified, and the
 * write counter on the named system in the provenance rail ticks up.
 *
 * Everything is driven from lib/eisDomains.ts so the industry switcher
 * changes the whole world, not just the labels.
 * --------------------------------------------------------------------- */

"use client";

import { useEffect, useRef, useState } from "react";
import type { Domain, Pillar } from "@/content/pages/solutions-eis";
import { SEVERITY } from "./severity";
import { AppTopBar, LiveChip, ModuleRail } from "./EisAppChrome";

/* The runway's horizon, and the point past which a window counts as
   closing. Both in days. */
const HORIZON = 30;

/* Feed colours for the convergence diagram: three feeds must be visibly
   three. Rose and amber are the severity ramp; violet is the third voice,
   and carries no severity meaning. */
const FEED = [SEVERITY.high.dot, SEVERITY.watch.dot, "#7C5CFC"];

type LoopStage = "idle" | "writing" | "verifying" | "closed";

/* ------------------------------------------------------- convergence lines */

/* Three sources at fixed row centres curving into one node. Geometry is
   pinned to a 36px row + 8px gap stack so the paths cannot drift from the
   text they connect. */
const ROW_H = 36;
const ROW_GAP = 8;
const Y = [ROW_H / 2, ROW_H + ROW_GAP + ROW_H / 2, (ROW_H + ROW_GAP) * 2 + ROW_H / 2];
const MID = Y[1];
const SVG_H = (ROW_H + ROW_GAP) * 2 + ROW_H;

function Converge() {
  return (
    <svg
      width="44"
      height={SVG_H}
      viewBox={`0 0 44 ${SVG_H}`}
      className="hidden flex-shrink-0 sm:block"
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={i === 1 ? `M0 ${MID} L34 ${MID}` : `M0 ${Y[i]} C18 ${Y[i]} 16 ${MID} 34 ${MID}`}
          stroke={FEED[i]}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.9"
        />
      ))}
      <circle cx="37" cy={MID} r="3.5" fill="rgb(var(--blue))" />
    </svg>
  );
}

/* ------------------------------------------------------------ the signature */

function Runway({ domain }: { domain: Domain }) {
  const dated = domain.rows
    .filter((r) => r.dueDays > 0)
    .sort((a, b) => a.dueDays - b.dueDays);

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <span className="text-[9px] font-bold uppercase tracking-[0.13em] text-secondary-text">
          Decision runway
        </span>
        <span className="text-[9px] text-tertiary-text">
          {dated.length}
          {" windows closing · next 30 days"}
        </span>
      </div>

      {/* 78px: value above the axis, name and clock below, and the marker
          stem needs the room between them. */}
      <div className="relative h-[78px]">
        {/* The fortnight. Faded on both axes so it reads as heat around the
            axis: a hard-edged block here would reinstate the very card the
            redesign removed. */}
        

        <div className="absolute left-0 right-0 top-[44px] h-px bg-card-line" />

        <span className="absolute left-0 top-[52px] text-[8px] font-bold uppercase tracking-[0.1em] text-secondary-text">
          Today
        </span>
        <span className="absolute right-0 top-[52px] text-[8px] font-bold uppercase tracking-[0.1em] text-tertiary-text">
          +30d
        </span>
        {/* The wash names itself at its own corner. This used to be a "14d"
            tick on the axis, which collided with any marker landing on day
            14 — and in financial services the covenant test is exactly day
            14, so the two labels printed on top of each other.
            Hidden on a phone, where the axis is short enough that it runs
            under the first marker's label. The wash still reads. */}
        <span
          className="absolute left-0 top-[22px] hidden text-[8px] font-bold uppercase tracking-[0.11em] sm:block"
          style={{ color: SEVERITY.high.text, opacity: 0.75 }}
        >
          Inside a fortnight
        </span>

        {dated.map((r) => {
          const sev = SEVERITY[r.severity];
          const critical = r.severity === "high";
          return (
            <span
              key={r.unit}
              className="absolute top-0 flex w-[116px] flex-col items-center"
              style={{ left: `${(r.dueDays / HORIZON) * 100}%`, transform: "translateX(-50%)" }}
            >
              <span
                className={`truncate text-[11px] font-bold leading-none tracking-tight ${
                  critical ? "text-ink" : "text-secondary-text"
                }`}
              >
                {r.money}
              </span>
              <span
                className={`mt-1 w-full truncate text-center text-[9px] leading-none ${
                  critical ? "text-secondary-text" : "text-tertiary-text"
                }`}
              >
                {r.unit}
              </span>
              {/* #C3C9D4, not the softer card greys: a 1px stem at #DDE1E9
                  on a white ground effectively disappears, and the stem is
                  what ties the label to its point on the axis. */}
              <span
                className={`mt-1.5 h-3 w-px ${critical ? "" : "bg-line"}`}
                style={critical ? { background: sev.dot } : undefined}
              />
              <span
                className="-mt-px rounded-full"
                style={{
                  width: critical ? 9 : 7,
                  height: critical ? 9 : 7,
                  background: sev.dot,
                  boxShadow: "none",
                }}
              />
              <span
                className="mt-1.5 text-[9px] font-bold leading-none"
                style={{ color: sev.text }}
              >
                {r.dueDays}d
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ screen */

function StepDot({ state }: { state: "done" | "active" | "todo" }) {
  if (state === "todo")
    return <span className="h-[6px] w-[6px] flex-shrink-0 rounded-full border border-lineSoft" />;
  return (
    <span
      className={`h-[6px] w-[6px] flex-shrink-0 rounded-full ${state === "active" ? "animate-pulse" : ""}`}
      style={{ background: state === "active" ? SEVERITY.watch.dot : SEVERITY.clear.dot }}
    />
  );
}

/* One labelled group of headline figures in the taxonomy line. */
function Group({
  label,
  items,
  accent,
}: {
  label: string;
  items: Pillar[];
  accent: boolean;
}) {
  return (
  <span className="flex min-w-0 items-baseline gap-2.5">
    <span
      className={`flex-shrink-0 text-[8px] font-bold uppercase tracking-[0.12em] ${
        accent ? "text-blue" : "text-tertiary-text"
      }`}
    >
      {label}
    </span>
    {items.map((p) => (
      <span key={p.key} className="flex min-w-0 items-baseline gap-1.5">
        <span className="text-[12px] font-bold tracking-tight text-ink">{p.value}</span>
        {/* Label as authored, not lowercased: "SKUs" became "skus". */}
        <span className="truncate text-[10px] text-tertiary-text">{p.label}</span>
      </span>
    ))}
  </span>
);
}

export default function EisBriefScreenMockup({ domain }: { domain: Domain }) {
  const [stage, setStage] = useState<LoopStage>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const approve = () => {
    if (stage !== "idle") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage("closed");
      return;
    }
    setStage("writing");
    timers.current.push(setTimeout(() => setStage("verifying"), 1100));
    timers.current.push(setTimeout(() => setStage("closed"), 2300));
  };

  const industry = domain.pillars.filter((p) => !p.shared);
  const shared = domain.pillars.filter((p) => p.shared);

  const writesTotal =
    domain.sources.reduce((n, s) => n + s.writes, 0) + (stage === "closed" ? 1 : 0);

  const steps: { label: string; note: string; state: "done" | "active" | "todo" }[] = [
    { label: "Approved", note: "06:02", state: "done" },
    {
      label: stage === "writing" ? "Writing" : "Written",
      note: domain.actionTarget,
      state: stage === "writing" ? "active" : "done",
    },
    {
      label: stage === "closed" ? "Verified" : stage === "verifying" ? "Verifying" : "Verify",
      note: stage === "closed" ? "re-read 06:03" : "next read",
      state: stage === "closed" ? "done" : stage === "verifying" ? "active" : "todo",
    },
  ];

  return (
    /* No window bar: the section wraps this in EisBrowserChromeMockup, which
       already draws the traffic lights and the URL. */
    <div className="flex w-full flex-col overflow-hidden bg-background text-left">
      <AppTopBar org={domain.org} view="Morning brief" right={<LiveChip />} />

      <div className="flex min-h-0 flex-1">
        <ModuleRail active="brief" />

        <div className="flex min-w-0 flex-1 flex-col">
          {/* THE SHAPE OF THE BUSINESS. One line, two labelled groups. The
              taxonomy is the point, so the taxonomy is the structure. */}
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-subtle-stroke bg-primary-bg px-4 py-2">
            <Group label="Industry" items={industry} accent />
            <span className="hidden h-[11px] w-px bg-card-line sm:block" />
            <Group label="Shared" items={shared} accent={false} />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-4 px-4 py-3.5">
            {/* THE VERDICT. The one sentence, and the money it costs. */}
            <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
              <div className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-x-2">
                  <span className="text-[9px] font-bold uppercase tracking-[0.13em] text-blue">
                    Monday 04 June &middot; 06:00
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.13em] text-tertiary-text">
                    {domain.role}
                  </span>
                </span>
                <p className="mt-1.5 max-w-[30ch] text-[19px] font-bold leading-[1.2] tracking-[-0.02em] text-ink sm:text-[22px]">
                  {domain.headline}
                </p>
              </div>

              <div className="flex-shrink-0 text-right">
                <span className="block text-[8.5px] font-bold uppercase tracking-[0.12em] text-tertiary-text">
                  Exposed
                </span>
                <span className="mt-0.5 block text-[30px] font-bold leading-none tracking-[-0.03em] text-ink">
                  {domain.exposure}
                </span>
                <span className="mt-1 block text-[9.5px] text-secondary-text">
                  {domain.exposureNote}
                </span>
              </div>
            </div>

            {/* CONVERGENCE, DRAWN. */}
            <div>
              <span className="mb-2.5 block text-[9px] font-bold uppercase tracking-[0.13em] text-secondary-text">
                Three systems, one conclusion
              </span>

              <div className="flex items-stretch">
                <div className="flex min-w-0 flex-1 flex-col" style={{ gap: ROW_GAP }}>
                  {/* Wire-service row: the finding leads, the system that
                      raised it is the attribution. Reading Maximo · SAP ·
                      Workday down the right edge is the argument. */}
                  {domain.signals.map((s, i) => (
                    <div
                      key={s.system}
                      className="flex min-w-0 items-center gap-3 rounded-[7px] border border-card-line bg-primary-bg px-3"
                      style={{ height: ROW_H }}
                    >
                      <span
                        className="h-[6px] w-[6px] flex-shrink-0 rounded-full"
                        style={{ background: FEED[i % FEED.length] }}
                      />
                      <span className="min-w-0 flex-1 truncate text-[12px] text-ink">
                        {s.finding}
                      </span>
                      {/* Attribution is dropped on a phone: it cost the
                          finding ~90px and truncated it to "Press 2 bearing
                          wear past thr…". The provenance rail at the foot of
                          the screen still names all four systems. */}
                      <span className="hidden flex-shrink-0 items-baseline gap-1.5 sm:flex">
                        <span className="text-[10px] font-semibold text-secondary-text">
                          {s.source}
                        </span>
                        <span className="text-[9px] text-tertiary-text">{s.age}</span>
                      </span>
                    </div>
                  ))}
                </div>

                <Converge />

                {/* The node the three lines land on. */}
                <div className="hidden w-[190px] min-w-0 flex-shrink-0 flex-col justify-center rounded-[8px] border border-card-line bg-background px-3  sm:flex">
                  <span className="truncate text-[13px] font-bold tracking-tight text-ink">
                    {domain.subject}
                  </span>
                  <span className="mt-0.5 truncate text-[10px] text-tertiary-text">
                    {domain.subjectKind}
                  </span>
                  <span
                    className="mt-2 inline-flex w-fit items-center rounded-[5px] border px-1.5 py-[2px] text-[9.5px] font-bold"
                    style={{
                      background: SEVERITY.high.bg,
                      color: SEVERITY.high.text,
                      borderColor: SEVERITY.high.border,
                    }}
                  >
                    {domain.clock}
                  </span>
                </div>
              </div>
            </div>

            <Runway domain={domain} />

            {/* THE DECISION, and the loop closing on it. */}
            <div
              aria-live="polite"
              className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 rounded-[9px] border px-3.5 py-3"
              style={{
                background: stage === "closed" ? SEVERITY.clear.bg : "rgb(var(--primary-bg))",
                borderColor: stage === "closed" ? SEVERITY.clear.border : "rgb(var(--card-line))",
              }}
            >
              <span className="min-w-0 flex-1">
                <span
                  className={`block text-[8.5px] font-bold uppercase tracking-[0.12em] ${
                    stage === "idle"
                      ? "text-tertiary-text"
                      : stage === "closed"
                        ? ""
                        : "text-blue"
                  }`}
                  style={stage === "closed" ? { color: SEVERITY.clear.text } : undefined}
                >
                  {stage === "idle"
                    ? "Decision, ready to send"
                    : stage === "closed"
                      ? "Loop closed · in the record"
                      : "Closing the loop"}
                </span>
                <span className="mt-1 block text-[14px] font-bold leading-snug tracking-tight text-ink">
                  {domain.action}
                </span>
                <span className="mt-1 block truncate font-mono text-[9.5px] text-tertiary-text">
                  {stage === "closed" ? (
                    <>
                      {domain.actionField} updated in {domain.actionTarget}
                      {" · logged in the Record"}
                    </>
                  ) : (
                    <>
                      {domain.actionField} &rarr; {domain.actionTarget} &middot;{" "}
                      {domain.approver} approves
                    </>
                  )}
                </span>
              </span>

              {stage === "idle" ? (
                <button
                  type="button"
                  onClick={approve}
                  className="flex-shrink-0 rounded-[7px] bg-ink px-4 py-2 text-[10.5px] font-bold uppercase tracking-[0.06em] text-on-action transition-colors hover:bg-action-hover"
                >
                  Approve
                </button>
              ) : (
                <span className="flex min-h-[34px] flex-shrink-0 flex-wrap items-center gap-x-2.5 gap-y-1">
                  {steps.map((st, i) => (
                    <span key={st.label + i} className="flex items-center gap-x-2.5">
                      {i > 0 && <span className="h-px w-4 bg-card-line" />}
                      <span className="flex items-center gap-1.5">
                        <StepDot state={st.state} />
                        <span
                          className={`text-[9.5px] font-bold ${
                            st.state === "todo" ? "text-tertiary-text" : "text-ink"
                          }`}
                        >
                          {st.label}
                        </span>
                        <span className="text-[9px] text-tertiary-text">{st.note}</span>
                      </span>
                    </span>
                  ))}
                </span>
              )}
            </div>
          </div>

          {/* PROVENANCE. Every figure above came from one of these reads, and
              the write counter is the loop's ledger. A rail, not a card: it
              is a footnote to the screen, not a fifth panel on it. */}
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 border-t border-subtle-stroke bg-primary-bg px-4 py-2">
            <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-tertiary-text">
              Reading
            </span>
            {domain.sources.map((s) => (
              <span key={s.name} className="flex items-center gap-1.5">
                <span
                  className="h-[5px] w-[5px] rounded-full"
                  style={{ background: SEVERITY.clear.dot }}
                />
                <span className="text-[10px] font-semibold text-secondary-text">{s.name}</span>
                <span className="text-[9px] text-tertiary-text">{s.age}</span>
              </span>
            ))}
            <span
              className={`ml-auto flex items-center gap-1.5 rounded-full border px-2 py-[2px] transition-colors duration-250 ${
                stage === "closed" ? "border-blue-border bg-blue-subtle" : "border-card-line"
              }`}
            >
              <span className="text-[9px] font-bold text-blue">{writesTotal} writes today</span>
              <span className="hidden text-[9px] text-tertiary-text sm:block">
                into {domain.actionTarget}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
