/*
 * ============================ SIMULATED UI ============================
 * Not a screenshot and not a live product surface. A drawn stand-in for the
 * Akashic Life screen a frontline worker sees: no signal, a completed
 * antenatal screen, a severity, and the one action that follows from it.
 *
 * IT CARRIES NO FIGURES, deliberately. Akashic Life is not sold, so a
 * parameter count, a risk score or an elapsed time would each be a claim we
 * cannot stand behind (user direction, 23 Jul 2026). Everything quantitative
 * is a skeleton row instead — which is also the truthful picture, since what
 * this page argues is the chain of custody, not any one measurement.
 * Do not put numbers back on this screen.
 *
 * Rendered by [05]'s record anatomy, with leader lines hung off it. It was
 * briefly the hero subject too, at a larger size; the hero now shows the
 * visit rather than the tool, so that size variant is gone.
 * ======================================================================
 */

export function SkeletonRow({ w }: { w: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-life-ice" aria-hidden />
      <span className="h-[5px] rounded-full bg-life-ice" style={{ width: w }} aria-hidden />
    </span>
  );
}

export default function LifeHandsetMockup({ className = "" }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden bg-background w-[196px] rounded-[22px] border border-line  lg:w-[214px] ${className}`}
    >
      {/* Status strip: the whole premise in one line. */}
      <div
        className={`flex items-center justify-between border-b border-life-ice bg-panel px-3.5 py-2.5`}
      >
        <span
          className={`flex items-center gap-1.5 font-bold uppercase tracking-[0.12em] text-life-blue text-[9px]`}
        >
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none" aria-hidden>
            <rect x="0" y="6" width="2" height="3" rx="0.5" fill="rgb(var(--life-ice))" />
            <rect x="3" y="4" width="2" height="5" rx="0.5" fill="rgb(var(--life-ice))" />
            <rect x="6" y="2" width="2" height="7" rx="0.5" fill="rgb(var(--life-ice))" />
            <rect x="9" y="0" width="2" height="9" rx="0.5" fill="rgb(var(--life-ice))" />
          </svg>
          No signal
        </span>
        <span className="h-[9px] w-[16px] rounded-[2px] border border-life-ice" aria-hidden />
      </div>

      <div className="px-3.5 py-4">
        <p
          className={`font-bold uppercase tracking-[0.12em] text-life-body text-[9px]`}
        >
          Antenatal screening
        </p>
        <p
          className={`mt-2.5 font-medium leading-[1.3] text-life-navy text-[15px]`}
        >
          Screen complete
        </p>

        <span className={`flex flex-col mt-3.5 gap-[7px]`}>
          <SkeletonRow w="82%" />
          <SkeletonRow w="58%" />
          <SkeletonRow w="70%" />
          <SkeletonRow w="40%" />
        </span>

        {/* The one thing the worker is meant to read. */}
        <div
          className={`relative overflow-hidden rounded-[8px] border border-life-line bg-life-abyss mt-4 px-3 py-3`}
        >
          <span
            className="alife-sonar absolute -right-3 -top-3 h-12 w-12 rounded-full border border-life-cyan/60"
            aria-hidden
          />
          <p
            className={`relative font-bold uppercase tracking-[0.12em] text-life-mist text-[9px]`}
          >
            Risk
          </p>
          <p
            className={`relative mt-1.5 font-medium leading-none text-ink text-[19px]`}
          >
            Severe
          </p>
          <p
            className={`relative mt-2 font-bold uppercase tracking-[0.12em] text-life-sky text-[9px]`}
          >
            Refer now
          </p>
        </div>

        <p
          className={`rounded-full bg-life-cyan text-center font-bold uppercase tracking-[0.12em] text-on-action mt-3 py-2 text-[9.5px]`}
        >
          Alert district
        </p>
      </div>
    </div>
  );
}
