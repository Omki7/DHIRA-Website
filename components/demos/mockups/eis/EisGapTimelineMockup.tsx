/* ------------------------------------------------------------------------
 * ILLUSTRATIVE DIAGRAM — not product UI, not a customer benchmark.
 *
 * [the-gap]'s whole argument is a duration: the distance between a figure
 * moving and somebody deciding about it. The section used to make that
 * argument with three side-by-side cards, which is to say it argued about
 * latency without ever showing time passing. This draws the time.
 *
 * ONE incident, three lanes, one axis of days. The reading an executive
 * gets in about two seconds, before any copy:
 *
 *   - a vertical rule at day 9 is the moment the press line stops
 *   - the monthly pack's decision dot sits well to the RIGHT of that rule
 *   - the ungrounded assistant's lane stops dead almost immediately and
 *     never produces a decision dot at all, because speed with nothing
 *     underneath it is not a decision
 *   - EIS's dot is hard against the left edge, the same morning
 *
 * The second lane is the one that has to be honest rather than smug: it is
 * genuinely fast, and it fails for a specific reason (nothing to sign), not
 * because it is stupid.
 *
 * The scenario is the demonstration plant from the hero, so the page tells
 * one story rather than switching to an abstract margin figure. It is
 * labelled as an illustration on screen.
 * --------------------------------------------------------------------- */

import { SEVERITY } from "@/lib/eisDomains";

/* The axis. 30 days, because that is the horizon the hero's decision
   runway already established, so the two diagrams share a scale. */
const HORIZON = 30;
/* The consequence everything is measured against. */
const FAILURE_DAY = 9;

type Lane = {
  name: string;
  detail: string;
  /* Where this route actually arrives at a decision, in days. */
  atDay: number;
  /* Reads under the end point. */
  when: string;
  verdict: string;
  tone: "late" | "none" | "now";
  /* A lane that never reaches a decision stops at a wall instead of a dot. */
  decides: boolean;
};

const LANES: Lane[] = [
  {
    name: "The monthly pack",
    detail: "Compiled by hand, reviewed at the monthly operations meeting.",
    atDay: 26,
    when: "Day 26",
    verdict: "Seventeen days after the line stopped",
    tone: "late",
    decides: true,
  },
  {
    name: "An assistant with no grounding",
    detail: "Answers the question in four seconds, from no definition, no lineage, no access check.",
    atDay: 0.4,
    when: "Four seconds",
    verdict: "Nothing anyone can sign, so nothing is decided",
    tone: "none",
    decides: false,
  },
  {
    name: "Akashic EIS",
    detail: "Three systems converge overnight and the action is composed against SAP PM.",
    atDay: 0.2,
    when: "06:02",
    verdict: "Approved and written the same morning",
    tone: "now",
    decides: true,
  },
];

const TONE = {
  late: SEVERITY.high.text,
  none: "#8E8F91",
  now: SEVERITY.clear.text,
} as const;

const pct = (d: number) => `${(d / HORIZON) * 100}%`;

export default function EisGapTimelineMockup() {
  return (
    <div className="overflow-hidden rounded-outer border border-eis-line bg-white">
      {/* What happened, and when. Stated once, above the axis. */}
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-eis-line px-5 py-3.5 sm:px-7">
        <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-eis-ink">
          Monday 04 June, 06:00
        </span>
        <span className="text-[13px] text-eis-body">
          A bearing at Pune Plant 4 crosses its wear threshold.
        </span>
        <span className="ml-auto text-[11px] font-semibold" style={{ color: SEVERITY.high.text }}>
          ₹38 Cr of order book runs on that line
        </span>
      </div>

      <div className="px-5 pb-5 pt-4 sm:px-7 sm:pb-7">
        {/* The axis legend. The failure marker is named here so the dashed
            rule below can stay silent and just be a rule. */}
        <div className="relative mb-3 h-4">
          <span className="absolute left-0 top-0 text-[9px] font-bold uppercase tracking-[0.1em] text-eis-caption">
            06:00 today
          </span>
          <span
            className="absolute top-0 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.1em]"
            style={{ left: pct(FAILURE_DAY), transform: "translateX(-50%)", color: SEVERITY.high.text }}
          >
            Day 9 · the line stops
          </span>
          <span className="absolute right-0 top-0 text-[9px] font-bold uppercase tracking-[0.1em] text-eis-caption">
            Day 30
          </span>
        </div>

        {/* The lanes, and the one rule that runs through all of them. */}
        <div className="relative">
          {/* The pivot of the whole diagram, so it is drawn at strength.
              SEVERITY.high.border is a card edge tint and disappeared here. */}
          <div
            className="pointer-events-none absolute bottom-0 top-0 border-l border-dashed"
            style={{ left: pct(FAILURE_DAY), borderColor: "rgba(193,48,89,0.45)" }}
            aria-hidden
          />

          {LANES.map((l) => (
            <div key={l.name} className="border-t border-eis-line py-4 first:border-t-0 first:pt-0">
              <div className="mb-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                <span className="text-[15px] font-medium leading-tight text-eis-ink">
                  {l.name}
                </span>
                <span className="text-[13px] leading-tight text-eis-caption">{l.detail}</span>
              </div>

              {/* The track. 40px: the line, then two lines of reading under
                  whichever point the route actually reaches. */}
              <div className="relative h-[40px]">
                {/* Faint full span, so every lane shares one visible axis. */}
                <div className="absolute left-0 right-0 top-[5px] h-px bg-[#EDEDEA]" aria-hidden />

                {/* How far this route got. Dashed where time is simply
                    elapsing, solid where something is actually happening. */}
                <div
                  className={`absolute left-0 top-[5px] ${l.tone === "late" ? "border-t border-dashed" : "h-px"}`}
                  style={{
                    width: pct(l.atDay),
                    ...(l.tone === "late"
                      ? { borderColor: "#A9ACA5" }
                      : { background: l.tone === "now" ? SEVERITY.clear.dot : "#7E8180" }),
                  }}
                  aria-hidden
                />

                {/* The end point: a decision, or a wall where one never came. */}
                {l.decides ? (
                  <span
                    className="absolute top-[5px] rounded-full"
                    style={{
                      left: pct(l.atDay),
                      width: 11,
                      height: 11,
                      marginTop: -5,
                      marginLeft: -5.5,
                      background: l.tone === "now" ? SEVERITY.clear.dot : SEVERITY.high.dot,
                      boxShadow: `0 0 0 4px ${l.tone === "now" ? SEVERITY.clear.bg : SEVERITY.high.bg}`,
                    }}
                    aria-hidden
                  />
                ) : (
                  /* A wall, not a dot. On a 30-day axis this lane and the
                     EIS lane both sit on the origin, so the marker shape is
                     the only thing that can carry "arrived at a decision"
                     versus "stopped without one". It has to be unmistakable. */
                  <span
                    className="absolute w-[2px] rounded-full"
                    style={{
                      left: pct(l.atDay),
                      top: -4,
                      height: 19,
                      background: "#6E7170",
                    }}
                    aria-hidden
                  />
                )}

                {/* Read-out. Anchored to whichever edge keeps it inside the
                    track: hard right once the marker is far down the axis,
                    left otherwise. It used to be CENTRED on the far marker,
                    which pushed "Seventeen days after the line stopped" past
                    the right edge of a 390px screen. */}
                <span
                  className={`absolute top-[18px] flex flex-col gap-[3px] ${
                    l.atDay / HORIZON > 0.65 ? "items-end text-right" : ""
                  }`}
                  style={
                    l.atDay / HORIZON > 0.65
                      ? { right: 0 }
                      : { left: pct(l.atDay), marginLeft: -6 }
                  }
                >
                  <span
                    className="text-[12px] font-bold leading-none"
                    style={{ color: TONE[l.tone] }}
                  >
                    {l.when}
                  </span>
                  {/* Wraps on a phone, single line from sm up. */}
                  <span className="text-[11px] leading-tight text-eis-caption sm:whitespace-nowrap">
                    {l.verdict}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
