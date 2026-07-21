/*
 * [03] What We Believe — The Things That Do Not Change.
 * The principles as literal architecture (un-boxed, careers line-art
 * idiom): a skyline of everything we ship — ministry dome, regulated
 * tower, growth curve, the crew themselves — stands on one ink beam,
 * and the beam rests on five carved line-art pillars, one per principle
 * (B-01…B-05). "Trust is architectural" is the section's own structure.
 * Hovering a pillar column lifts it while the rest dim (CSS only —
 * stays a server component). Copy unchanged.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import Bust from "@/components/demos/LineArtBust";

const beliefs = [
  {
    num: "B-01",
    title: "Build for the long term.",
    body: "If it cannot be maintained by someone who was not in the room when it was designed, we did it wrong.",
  },
  {
    num: "B-02",
    title: "Trust is architectural.",
    body: "Governance is the floor everything stands on. Not a feature added later.",
  },
  {
    num: "B-03",
    title: "Open is better than locked.",
    body: "We build on technologies your team already knows. Inspectable. Swappable. No permission required.",
  },
  {
    num: "B-04",
    title: "Your data is yours.",
    body: "We do not hold your keys. We do not mine your patterns. When we leave, you own everything.",
  },
  {
    num: "B-05",
    title: "Accountability over activity.",
    body: "We measure by outcomes, not hours. By whether your team trusts the answer.",
  },
];

/* Everything we ship, standing on the beam: dome, tower, curve, crew. */
function SkylineScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1000 150" fill="none" aria-hidden className={className}>
      {/* birds */}
      <path d="M42 38 q6 -6 12 0 M60 30 q6 -6 12 0" className="stroke-overcast" strokeWidth={1.6} strokeLinecap="round" />
      {/* ministry */}
      <g className="stroke-ink" strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round">
        <path d="M60 150 V142 H220 V150" />
        <path d="M92 142 V100 M124 142 V100 M156 142 V100 M188 142 V100" />
        <path d="M80 100 H200" />
        <path d="M96 100 A 44 44 0 0 1 184 100" />
        <path d="M140 56 V48" />
      </g>
      <circle cx="140" cy="44" r="3" className="fill-blue animate-[ps-pulse_2s_infinite]" />
      {/* regulated tower */}
      <g className="stroke-ink" strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round">
        <path d="M300 150 V50 H380 V150" />
        <path d="M316 66 H336 M348 66 H368" />
        <path d="M316 88 H336 M348 88 H368" />
        <path d="M316 110 H336 M348 110 H368" />
        <path d="M316 132 H336 M348 132 H368" />
      </g>
      <circle cx="396" cy="60" r="16" className="stroke-blue-border" strokeWidth={2.2} fill="none" />
      <path d="M396 44 A 16 16 0 1 1 382.1 52" className="stroke-blue" strokeWidth={2.8} strokeLinecap="round" fill="none" />
      <circle cx="382.1" cy="52" r="2.8" className="fill-blue animate-[ps-pulse_2s_infinite]" />
      {/* growth curve outrunning its box */}
      <path d="M560 92 H492 V150 H612 V118" className="stroke-ink" strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M470 144 C 510 138 530 124 556 102 S 610 62 648 50" className="stroke-blue" strokeWidth={2.6} strokeLinecap="round" />
      <path d="M638 46 L652 49 L643 58" className="stroke-blue" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="650" cy="50" r="3" className="fill-blue animate-[ps-pulse_2s_infinite]" />
      {/* the crew, standing on what they stand for */}
      <Bust cx={780} cy={108} r={12} tone="soft" smile={false} />
      <Bust cx={836} cy={97.5} r={15} tone="blue" />
      <Bust cx={892} cy={104.5} r={13} tone="ink" />
    </svg>
  );
}

/* One carved pillar: capital, fluted shaft, tapered plinth. */
function Pillar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 118" fill="none" aria-hidden className={className}>
      <g className="stroke-current" strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2 H54" />
        <path d="M14 2 V12 M50 2 V12" />
        <path d="M12 12 H52" />
        <path d="M21 12 V96 M43 12 V96" />
        <path d="M32 20 V88" opacity={0.35} strokeDasharray="2 6" />
        <path d="M16 96 H48" />
        <path d="M16 96 L11 108 M48 96 L53 108" />
        <path d="M8 108 H56" />
      </g>
    </svg>
  );
}

export default function AboutBeliefs() {
  return (
    <section
      id="what-we-believe"
      className="scroll-mt-24 border-t border-lineSoft bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F5FE_16%,#F1F5FE_84%,#FFFFFF_100%)] pt-12 pb-24 lg:pt-16 lg:pb-32"
    >
      <ScrollRevealRail>
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-overcast">[03]</span>
            <span className="text-inkSoft">&nbsp;&nbsp;What we believe</span>
          </p>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            The things that do not change.
          </h2>
          <p className="mt-5 max-w-[30em] text-lg leading-relaxed text-secondary-text">
            Five principles. Every engagement is held against them.
          </p>
        </ScrollReveal>

        {/* Desktop: skyline on the beam, beam on the five pillars */}
        <div className="mt-14 hidden lg:block">
          <ScrollReveal delay={120}>
            <p className="mb-3 text-right font-mono text-[9px] font-semibold uppercase tracking-eyebrow text-blue">
              Every engagement
            </p>
            <SkylineScene className="block w-full" />
            <div className="h-[3px] rounded-full bg-ink" aria-hidden />
          </ScrollReveal>
          <div className="group/beliefs grid grid-cols-5 gap-8">
            {beliefs.map((belief, idx) => (
              <ScrollReveal key={belief.num} delay={150 + idx * 60}>
                <div className="group/col flex flex-col items-center text-center transition-opacity duration-300 ease-settle hover:!opacity-100 group-hover/beliefs:opacity-40">
                  <Pillar className="block h-[104px] w-auto text-ink transition-colors duration-300 ease-settle group-hover/col:text-blue" />
                  <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-blue">
                    {belief.num}
                  </p>
                  <h3 className="mt-2 text-[19px] font-semibold leading-snug tracking-tight text-ink">
                    {belief.title}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-inkSoft">{belief.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Mobile: skyline + beam, then pillars stacked beside their text */}
        <div className="mt-10 lg:hidden">
          <ScrollReveal delay={100}>
            <p className="mb-2 text-right font-mono text-[9px] font-semibold uppercase tracking-eyebrow text-blue">
              Every engagement
            </p>
            <SkylineScene className="block w-full" />
            <div className="h-[3px] rounded-full bg-ink" aria-hidden />
          </ScrollReveal>
          <div className="mt-8 space-y-9">
            {beliefs.map((belief, idx) => (
              <ScrollReveal key={belief.num} delay={100 + idx * 60}>
                <div className="flex gap-5">
                  <Pillar className="block h-[72px] w-auto shrink-0 text-ink" />
                  <div className="min-w-0 pt-1">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-blue">
                      {belief.num}
                    </p>
                    <h3 className="mt-1.5 text-[20px] font-semibold leading-snug tracking-tight text-ink">
                      {belief.title}
                    </h3>
                    <p className="mt-2 max-w-[32em] text-[15px] leading-relaxed text-inkSoft">{belief.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
