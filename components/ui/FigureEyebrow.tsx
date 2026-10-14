"use client";

/*
 * The section eyebrow for /about and /careers, on the homepage rail: a
 * dashed hairline above and below, `[NN]  LABEL` on the left, left only
 * (DESIGN_SYSTEM, eyebrow pattern). The right hand `/ FIGURE` descriptor was
 * dropped on 23 Sep 2026 when these pages moved to the homepage and /akashic
 * header grammar.
 *
 * `live` puts the site's pulsing NOW HIRING marker in the right slot, the one
 * eyebrow accent the design system allows (as on the homepage JoinTheTeam).
 *
 * `bare` drops the rail for placements that sit inside a card (the closing
 * `DrawingSetClose`) or open the page (the hero), where a ruled band would
 * read as a second frame.
 */

export default function FigureEyebrow({
  num,
  label,
  live,
  dark = false,
  bare = false,
}: {
  num?: string;
  label: string;
  live?: string;
  dark?: boolean;
  bare?: boolean;
}) {
  const rail = bare
    ? ""
    : `border-y border-dashed px-[2px] py-[17px] ${dark ? "border-white/15" : "border-lineSoft"}`;
  return (
    <div className={`flex items-center justify-between gap-6 font-mono text-[11px] uppercase tracking-eyebrow ${rail}`}>
      <p>
        {num && <span className={dark ? "text-uc-dim" : "text-overcast"}>[{num}]&nbsp;&nbsp;</span>}
        <span className={dark ? "text-uc-mute" : "text-inkSoft"}>{label}</span>
      </p>
      {live && (
        <span className="flex items-center gap-2 text-blue">
          <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite] motion-reduce:animate-none" aria-hidden />
          {live}
        </span>
      )}
    </div>
  );
}
