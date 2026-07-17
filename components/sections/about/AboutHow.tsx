/*
 * [04] How We Work — The Way We Show Up.
 * One continuous line-art story strip (un-boxed, careers idiom): the same
 * two figures — blue for DHIRA, ink for the client — recur along a single
 * unbroken ground line through the four commitments: listening (client's
 * bubble, ours silent), building together (dashed unfinished storey),
 * staying until it runs (live pulse on the finished tower), telling the
 * truth (one straight line in the bubble). Overhead, the sun rises,
 * crosses and sets into a moon: the day changes, the commitments do not —
 * the sub copy, drawn. Scenes butt edge-to-edge (gap-0) so the ground
 * reads as one line. CSS-only column dimming; server component. Copy
 * unchanged.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import Bust from "@/components/demos/LineArtBust";

const commitments = [
  {
    tag: "Day one",
    title: "We start with listening.",
    body: "Every engagement begins with understanding your context. Your systems, your constraints, your politics.",
  },
  {
    tag: "The build",
    title: "We build with you, not for you.",
    body: "Your team learns the system as we build it. By the time we hand over, you are equipped, not dependent.",
  },
  {
    tag: "In production",
    title: "We stay until it works.",
    body: "Not until the contract ends. Until your team is confident running it.",
  },
  {
    tag: "The last day",
    title: "We tell the truth.",
    body: "If Akashic is not the right fit, we say so. We would rather earn your trust than close a deal.",
  },
];

/* Scene 1 — sunrise: the client talks, we listen. */
function ListeningScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 220" fill="none" aria-hidden className={className}>
      <path d="M0 200 H300" className="stroke-ink" strokeWidth={2.3} strokeLinecap="round" />
      <path d="M0 90 C 80 42 220 30 300 26" className="stroke-blue-border animate-[dashmove_2.2s_linear_infinite]" strokeWidth={1.6} strokeDasharray="6 8" strokeLinecap="round" />
      <g style={{ animation: "softpulse 2.6s ease-in-out infinite" }}>
        <circle cx="42" cy="62" r="13" className="stroke-blue" strokeWidth={2.3} fill="none" />
        <path d="M42 40 V33 M42 84 V91 M22 62 H15 M62 62 H69 M27 47 L22 42 M57 47 L62 42 M27 77 L22 82 M57 77 L62 82" className="stroke-blue" strokeWidth={2} strokeLinecap="round" />
      </g>
      <Bust cx={105} cy={147.5} r={15} tone="ink" smile={false} />
      <g className="stroke-ink" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M128 96 H196 A8 8 0 0 1 204 104 V120 A8 8 0 0 1 196 128 H150 L136 140 V128 A8 8 0 0 1 128 120 V104 A8 8 0 0 1 136 96" />
        <path d="M146 108 H186 M146 116 H172" />
      </g>
      <Bust cx={235} cy={147.5} r={15} tone="blue" />
    </svg>
  );
}

/* Scene 2 — midday: one structure, both pairs of hands. */
function BuildScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 220" fill="none" aria-hidden className={className}>
      <path d="M0 200 H300" className="stroke-ink" strokeWidth={2.3} strokeLinecap="round" />
      <path d="M0 26 C 100 16 200 16 300 22" className="stroke-blue-border animate-[dashmove_2.2s_linear_infinite]" strokeWidth={1.6} strokeDasharray="6 8" strokeLinecap="round" />
      <circle cx="150" cy="18" r="5" className="fill-blue animate-[ps-pulse_2.6s_infinite]" />
      <path d="M122 200 V152 H178 V200" className="stroke-ink" strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M122 152 V118 H178 V152" className="stroke-ink" strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 7" />
      <path d="M136 168 H164 M136 184 H164" className="stroke-ink" strokeWidth={1.8} strokeLinecap="round" />
      <Bust cx={82} cy={147.5} r={15} tone="blue" />
      <path d="M98 172 L120 160" className="stroke-blue" strokeWidth={2.3} strokeLinecap="round" />
      <Bust cx={218} cy={147.5} r={15} tone="ink" />
      <path d="M202 172 L180 160" className="stroke-ink" strokeWidth={2.3} strokeLinecap="round" />
    </svg>
  );
}

/* Scene 3 — afternoon: it runs, and we are still there. */
function StayScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 220" fill="none" aria-hidden className={className}>
      <path d="M0 200 H300" className="stroke-ink" strokeWidth={2.3} strokeLinecap="round" />
      <path d="M0 22 C 100 18 200 26 300 42" className="stroke-blue-border animate-[dashmove_2.2s_linear_infinite]" strokeWidth={1.6} strokeDasharray="6 8" strokeLinecap="round" />
      <circle cx="190" cy="27" r="5" className="fill-blue animate-[ps-pulse_2.6s_infinite]" />
      <g className="stroke-ink" strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round">
        <path d="M122 200 V118 H178 V200" />
        <path d="M136 136 H164 M136 152 H164 M136 168 H164 M136 184 H164" strokeWidth={1.8} />
        <path d="M150 118 V102" />
      </g>
      <circle cx="150" cy="97" r="4" className="fill-blue animate-[ps-pulse_2s_infinite]" />
      <circle cx="150" cy="97" r="9" className="stroke-blue/40 animate-[ps-ring_2.6s_ease-out_infinite]" strokeWidth={1.5} fill="none" />
      <Bust cx={82} cy={147.5} r={15} tone="blue" />
      <Bust cx={218} cy={147.5} r={15} tone="ink" />
    </svg>
  );
}

/* Scene 4 — dusk: one straight line in the bubble. */
function TruthScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 220" fill="none" aria-hidden className={className}>
      <path d="M0 200 H300" className="stroke-ink" strokeWidth={2.3} strokeLinecap="round" />
      <path d="M0 42 C 90 54 200 78 300 96" className="stroke-blue-border animate-[dashmove_2.2s_linear_infinite]" strokeWidth={1.6} strokeDasharray="6 8" strokeLinecap="round" />
      <path d="M251 36 A 15 15 0 1 1 238 61 A 12 12 0 0 0 251 36" className="stroke-ink" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M282 28 V38 M277 33 H287 M206 22 V28 M203 25 H209" className="stroke-overcast" strokeWidth={1.6} strokeLinecap="round" />
      <Bust cx={112} cy={147.5} r={15} tone="blue" />
      <g className="stroke-blue" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M132 94 H196 A8 8 0 0 1 204 102 V116 A8 8 0 0 1 196 124 H158 L144 136 V124 A8 8 0 0 1 136 124 A8 8 0 0 1 128 116 V102 A8 8 0 0 1 136 94" />
        <path d="M148 109 H188" strokeWidth={2.4} />
      </g>
      <Bust cx={215} cy={147.5} r={15} tone="ink" />
    </svg>
  );
}

const scenes = [ListeningScene, BuildScene, StayScene, TruthScene];

export default function AboutHow() {
  return (
    <section id="how-we-work" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[04]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;How we work</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Four commitments</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            The way we show up.
          </h2>
          <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-inkSoft">
            Four commitments. The same on the first day of an engagement as the last.
          </p>
        </ScrollReveal>

        {/* Desktop: one continuous strip — the ground line joins across all four scenes */}
        <div className="mt-12 hidden lg:block lg:mt-14">
          <div className="grid grid-cols-4 gap-0">
            {scenes.map((Scene, idx) => (
              <ScrollReveal key={idx} delay={120 + idx * 70}>
                <Scene className="block w-full" />
              </ScrollReveal>
            ))}
          </div>
          <div className="group/comm mt-6 grid grid-cols-4 gap-10">
            {commitments.map((item, idx) => (
              <ScrollReveal key={item.title} delay={150 + idx * 70}>
                <div className="transition-opacity duration-300 ease-settle hover:!opacity-100 group-hover/comm:opacity-45">
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-eyebrow text-blue">
                    {item.tag}
                  </p>
                  <h3 className="mt-2.5 text-[21px] font-semibold leading-[1.2] tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <div className="mt-3 mb-3 w-8 border-t border-blue/40" aria-hidden />
                  <p className="text-[14px] leading-relaxed text-inkSoft">{item.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Mobile: the day unfolds top to bottom */}
        <div className="mt-10 space-y-12 lg:hidden">
          {commitments.map((item, idx) => {
            const Scene = scenes[idx];
            return (
              <ScrollReveal key={item.title} delay={100 + idx * 70}>
                <div>
                  <Scene className="mx-auto block w-full max-w-[300px]" />
                  <div className="mx-auto mt-4 max-w-[32em] text-center">
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-eyebrow text-blue">
                      {item.tag}
                    </p>
                    <h3 className="mt-2 text-[22px] font-semibold leading-snug tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-inkSoft">{item.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
