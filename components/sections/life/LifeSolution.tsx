"use client";

/*
 * [02] The solution — three moves, pinned.
 *
 * The section holds still for three viewport-heights while the reader scrolls
 * through it: three outline circles sit centred and only one is ever lit, and
 * the paragraph underneath swaps with it. Scroll is the only control; there
 * is nothing to click and nothing to miss.
 *
 * The circles are tangent rather than overlapping on purpose. Overlap would
 * claim the three moves happen together; they are strictly sequential, and
 * the whole product argument is that the chain never breaks between them.
 *
 * Under `prefers-reduced-motion` the track collapses and all three moves are
 * laid out at once, so no content is only reachable by scroll animation.
 */

import { useEffect, useRef, useState } from "react";
import { LifeEyebrow, LifeGlyph, LifeCornerArc } from "@/components/ui/life/LifeChrome";

const moves = [
  {
    label: ["Read the risk", "at the edge"],
    body: "Akashic Life runs the model on the phone itself. A full antenatal screen, read on the spot by a frontline worker with no network, no lab and no specialist within reach.",
  },
  {
    label: ["Carry the signal", "upward"],
    body: "The moment a bar appears the reading is compressed and burst-sent over SMS or GPRS. It lands as one governed record, and that same record is what the district and the ministry read.",
  },
  {
    label: ["Close the loop", "back to her"],
    body: "The response returns down the same path. The emergency response network is triggered, the district hospital is alerted, and the village knows help is already moving.",
  },
];

function Circle({ move, active }: { move: (typeof moves)[number]; active: boolean }) {
  return (
    <div
      className={`relative flex aspect-square w-[230px] shrink-0 flex-col items-center justify-center rounded-full border text-center transition-all duration-650 ease-settle sm:w-[252px] lg:w-[286px] ${
        active ? "border-white/85" : "border-white/[0.13]"
      }`}
    >
      {/* Two markers riding the rim: the only motion in the section, and the
          only thing that says which circle is live. */}
      {active && (
        <>
          <span className="alife-orbit pointer-events-none absolute inset-0" aria-hidden>
            <span className="absolute left-1/2 top-0 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
          </span>
          <span className="alife-orbit-rev pointer-events-none absolute inset-0" aria-hidden>
            <span className="absolute left-1/2 top-0 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-life-mist" />
          </span>
        </>
      )}

      <LifeGlyph
        size={16}
        className={`transition-colors duration-650 ease-settle ${
          active ? "border-life-cyan" : "border-white/20"
        }`}
      />
      <p
        className={`mt-6 px-8 text-[17px] font-medium leading-[1.35] transition-colors duration-650 ease-settle sm:text-[19px] lg:text-[20px] ${
          active ? "text-white" : "text-white/25"
        }`}
      >
        {move.label[0]}
        <br />
        {move.label[1]}
      </p>
    </div>
  );
}

function Body({ move }: { move: (typeof moves)[number] }) {
  return (
    <>
      <LifeGlyph size={16} />
      <p className="mt-6 text-[17px] leading-[1.62] text-white/85 lg:text-[18px]">{move.body}</p>
    </>
  );
}

export default function LifeSolution() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }

    let raf = 0;
    const read = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      /* Progress across the pinned run: 0 the moment the track's top reaches
         the viewport top, 1 when its bottom does. */
      const travel = rect.height - window.innerHeight;
      const p = travel > 0 ? Math.min(Math.max(-rect.top / travel, 0), 1) : 0;
      setActive(Math.min(Math.floor(p * moves.length), moves.length - 1));
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="the-solution" className="relative scroll-mt-20 bg-life-abyss">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(112deg,#0A0E24_0%,#0A0E24_42%,#0B1E4E_74%,#12356F_100%)]"
      />
      <LifeCornerArc />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-14">
        {/* Opening statement */}
        <div className="max-w-[46rem] pb-24 pt-28 lg:pb-32 lg:pt-40">
          <LifeEyebrow num="02">The solution</LifeEyebrow>
          <p className="mt-9 text-[24px] font-normal leading-[1.34] text-white sm:text-[28px] lg:text-[32px]">
            Akashic Life is an edge intelligence layer for frontline healthcare.
            A health worker enters what they can see and measure at the visit.
            The model on the phone reads it and answers one question: how likely
            is this pregnancy to turn dangerous, and how soon. That reading
            travels up to the district and the ministry, and the response comes
            back down the same path.
          </p>
        </div>

        {/* Narrow screens and reduced motion get every move at once. Three
            286px circles cannot sit in a row on a phone, and a three-screen
            scroll hijack is the wrong thing to do to one anyway. */}
        <div className={`grid grid-cols-1 gap-16 pb-28 md:grid-cols-3 md:gap-8 ${reduced ? "" : "lg:hidden"}`}>
          {moves.map((move) => (
            <div key={move.label[0]} className="flex flex-col items-center">
              <Circle move={move} active />
              <div className="mt-9 w-full max-w-[26em] text-left">
                <Body move={move} />
              </div>
            </div>
          ))}
        </div>

        {!reduced && (
          <div ref={trackRef} className="relative hidden h-[300vh] lg:block">
            <div className="sticky top-0 flex h-screen flex-col justify-center pb-10">
              <div className="flex items-center justify-center gap-[34px]">
                {moves.map((move, i) => (
                  <Circle key={move.label[0]} move={move} active={i === active} />
                ))}
              </div>

              <div className="mt-20 flex justify-end">
                <div key={active} className="sa-info-in w-[42%]">
                  <Body move={moves[active]} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
