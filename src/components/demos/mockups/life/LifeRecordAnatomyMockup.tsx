/*
 * ============================ SIMULATED UI ============================
 * Not a screenshot and not a live product surface. A drawn stand-in for
 * the Akashic Life handset screen and the record it produces, used to show
 * what one reading turns into.
 *
 * IT CARRIES NO FIGURES AT ALL, deliberately. Akashic Life is not sold, so a
 * parameter count, a risk score or a case volume would each be a claim we
 * cannot stand behind (user direction, 23 Jul 2026). Everything quantitative
 * is drawn as a skeleton row instead — which is also the truthful picture,
 * since what this section is arguing is the chain of custody, not any one
 * measurement. Do not put numbers back on this screen.
 * ======================================================================
 */

import { LifeGlyph } from "@/components/ui/life/LifeChrome";
import LifeHandsetMockup, { SkeletonRow } from "@/components/demos/mockups/life/LifeHandsetMockup";

/* Stage is authored at a fixed size and the container holds that aspect, so
   the leader lines in the SVG overlay stay locked to the cards at every
   width without any measurement at runtime. */
const W = 1180;
const H = 660;

type Card = {
  label: string;
  value: string;
  /** Percentage box within the stage. */
  x: number;
  y: number;
  /** Where the leader meets the card, and the marker it runs back to. */
  side: "left" | "right";
  markerX: number;
  markerY: number;
};

const cards: Card[] = [
  {
    label: "Vitals captured",
    value: "On the handset she already carries",
    x: 2,
    y: 8,
    side: "left",
    markerX: 42.4,
    markerY: 30,
  },
  {
    label: "Read on the device",
    value: "Every parameter read on the handset, no cloud",
    x: 0,
    y: 41,
    side: "left",
    markerX: 42.4,
    markerY: 50,
  },
  {
    label: "No network needed",
    value: "Held locally, queued for burst sync",
    x: 3,
    y: 74,
    side: "left",
    markerX: 42.4,
    markerY: 70,
  },
  {
    label: "Risk surfaced",
    value: "Severe. Refer now",
    x: 71,
    y: 6,
    side: "right",
    markerX: 57.6,
    markerY: 33,
  },
  {
    label: "One golden record",
    value: "The PHC and the district read the same mother",
    x: 73,
    y: 39,
    side: "right",
    markerX: 57.6,
    markerY: 52,
  },
  {
    label: "Response triggered",
    value: "Emergency network and hospital alerted",
    x: 70,
    y: 72,
    side: "right",
    markerX: 57.6,
    markerY: 68,
  },
];

/* Leader geometry: out of the marker, across to the card's inner edge. */
function leaderPath(card: Card) {
  const mx = (card.markerX / 100) * W;
  const my = (card.markerY / 100) * H;
  const cx = card.side === "left" ? ((card.x + 21) / 100) * W : (card.x / 100) * W;
  const cy = ((card.y + 11) / 100) * H;
  return `M${mx} ${my} H${(mx + cx) / 2} V${cy} H${cx}`;
}

function InsightCard({ card }: { card: Card }) {
  return (
    <div className="w-full rounded-[10px] border border-line bg-background px-4 py-3.5  ">
      <p className="text-[10.5px] font-bold uppercase tracking-[0.1em] text-life-blue">
        {card.label}
      </p>
      <p className="mt-2 border-t border-life-ice pt-2.5 text-[12px] leading-[1.45] text-life-body">
        {card.value}
      </p>
      <span className="mt-2.5 flex flex-col gap-[5px]">
        <SkeletonRow w="72%" />
        <SkeletonRow w="46%" />
      </span>
    </div>
  );
}

export default function LifeRecordAnatomyMockup() {
  return (
    <>
      {/* Wide: the full stage, cards floating off a centred handset. */}
      <div
        className="relative mx-auto hidden w-full max-w-[1180px] lg:block"
        style={{ aspectRatio: `${W} / ${H}` }}
      >
        {/* Leaders. preserveAspectRatio="none" is safe here and only here:
            the wrapper holds the same aspect the viewBox declares. */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          fill="none"
          aria-hidden
          className="absolute inset-0 h-full w-full"
        >
          {cards.map((card) => (
            <path
              key={card.label}
              d={leaderPath(card)}
              stroke="rgb(var(--life-cyan))"
              strokeOpacity="0.45"
              strokeWidth="1"
              className="alife-leader"
            />
          ))}
        </svg>

        {/* Markers on the handset. */}
        {cards.map((card) => (
          <span
            key={`m-${card.label}`}
            aria-hidden
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${card.markerX}%`, top: `${card.markerY}%` }}
          >
            <LifeGlyph size={11} />
          </span>
        ))}

        {cards.map((card) => (
          <div
            key={`c-${card.label}`}
            className="absolute w-[21%]"
            style={{ left: `${card.x}%`, top: `${card.y}%` }}
          >
            <InsightCard card={card} />
          </div>
        ))}

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <LifeHandsetMockup />
        </div>
      </div>

      {/* Narrow: the same six facts, stacked, no leaders to mis-draw. */}
      <div className="lg:hidden">
        <div className="flex justify-center">
          <LifeHandsetMockup />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {cards.map((card) => (
            <InsightCard key={`s-${card.label}`} card={card} />
          ))}
        </div>
      </div>
    </>
  );
}
