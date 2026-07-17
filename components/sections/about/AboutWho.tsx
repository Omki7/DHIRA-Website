/*
 * [02] Who We Are — Shipped at Scale, as a Journey.
 * Deliberately un-boxed (the careers line-art idiom): one small crew of
 * line-art engineers walks a single dashed route through the three worlds
 * they have shipped in — a pillared ministry with transaction streams
 * flowing in, a regulated tower under a near-full uptime gauge, a growth
 * curve breaking out of its own infrastructure box — and the route lands
 * on the "every engagement" punchline. The old advise-vs-build contrast
 * card is now an open editorial split on a dashed rule. Sits on a soft
 * blue band to break the page's white run. Copy unchanged; the scale
 * watermarks (10⁹ / 99.9 / 10×) are the section's original figures.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import Bust from "@/components/demos/LineArtBust";

const contexts = [
  {
    watermark: "10⁹",
    name: "Government ministries",
    note: "Systems that process billions of transactions, at national reach.",
  },
  {
    watermark: "99.9",
    name: "Regulated enterprises",
    note: "Environments where downtime is not an option and audits are constant.",
  },
  {
    watermark: "10×",
    name: "High-growth startups",
    note: "Teams that grew faster than the infrastructure underneath them.",
  },
];

/* The crew: three engineers walking the route together. */
function CrewScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 170 120" fill="none" aria-hidden className={className}>
      <Bust cx={40} cy={52} r={12} tone="soft" smile={false} />
      <Bust cx={130} cy={52} r={12} tone="ink" />
      <Bust cx={85} cy={46} r={15} tone="blue" />
    </svg>
  );
}

/* World 1 — the ministry: streams of transactions converging on a dome. */
function MinistryScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 150" fill="none" aria-hidden className={className}>
      <g className="stroke-ink" strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 122 H170" />
        <path d="M45 122 V114 H155 V122" />
        <path d="M62 110 V80 M88 110 V80 M112 110 V80 M138 110 V80" />
        <path d="M52 80 H148" />
        <path d="M64 80 A 36 36 0 0 1 136 80" />
        <path d="M100 44 V36" />
      </g>
      <circle cx="100" cy="32" r="3" className="fill-blue animate-[ps-pulse_2s_infinite]" />
      <path
        d="M6 96 C 28 96 38 100 52 106"
        className="stroke-blue animate-[dashmove_1.6s_linear_infinite]"
        strokeWidth={2}
        strokeDasharray="8 8"
        strokeLinecap="round"
      />
      <path
        d="M194 96 C 172 96 162 100 148 106"
        className="stroke-blue animate-[dashmove_1.6s_linear_infinite]"
        strokeWidth={2}
        strokeDasharray="8 8"
        strokeLinecap="round"
      />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={[18, 100, 182][i]}
          cy={[92, 26, 92][i]}
          r={2.6}
          className="fill-blue"
          style={{ animation: `softpulse 1.4s ease-in-out ${i * 0.3}s infinite` }}
        />
      ))}
    </svg>
  );
}

/* World 2 — the regulated tower: windows lit, uptime gauge nearly full. */
function EnterpriseScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 150" fill="none" aria-hidden className={className}>
      <g className="stroke-ink" strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 122 H150" />
        <path d="M70 122 V36 H122 V122" />
        <path d="M82 54 H94 M104 54 H116" />
        <path d="M82 72 H94 M104 72 H116" />
        <path d="M82 90 H94 M104 90 H116" />
        <path d="M82 108 H94 M104 108 H116" />
      </g>
      <circle cx="146" cy="52" r="20" className="stroke-blue-border" strokeWidth={2.2} fill="none" />
      <path
        d="M146 32 A 20 20 0 1 1 128.7 42"
        className="stroke-blue"
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="128.7" cy="42" r="3.2" className="fill-blue animate-[ps-pulse_2s_infinite]" />
      <path
        d="M58 44 V116"
        className="stroke-blue-border animate-[dashmove_1.8s_linear_infinite]"
        strokeWidth={1.6}
        strokeDasharray="6 10"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* World 3 — the startup: a growth curve outrunning its own box. */
function StartupScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 150" fill="none" aria-hidden className={className}>
      <path
        d="M88 76 H52 V120 H108 V96"
        className="stroke-ink"
        strokeWidth={2.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 116 C 60 112 76 102 96 84 S 138 48 164 38"
        className="stroke-blue"
        strokeWidth={2.6}
        strokeLinecap="round"
      />
      <path d="M154 34 L166 37 L158 46" className="stroke-blue" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="165" cy="38" r="3.2" className="fill-blue animate-[ps-pulse_2s_infinite]" />
      <path d="M120 120 H148" className="stroke-lineSoft" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

const worldScenes = [MinistryScene, EnterpriseScene, StartupScene];

function FlowSegment() {
  return (
    <span
      className="h-px flex-1 bg-[length:16px_1px] bg-repeat-x bg-[repeating-linear-gradient(90deg,#C8D2F5_0_8px,transparent_8px_16px)] animate-[ps-dash_1.4s_linear_infinite]"
      aria-hidden
    />
  );
}

function VerticalSegment() {
  return (
    <span
      className="mx-auto block h-12 w-px bg-[length:1px_12px] bg-repeat-y bg-[repeating-linear-gradient(180deg,#C8D2F5_0_6px,transparent_6px_12px)]"
      aria-hidden
    />
  );
}

export default function AboutWho() {
  return (
    <section
      id="who-we-are"
      className="relative scroll-mt-24 overflow-hidden border-t border-lineSoft bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F5FE_16%,#F1F5FE_84%,#FFFFFF_100%)]"
    >
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-overcast">[02]</span>
            <span className="text-inkSoft">&nbsp;&nbsp;Who we are</span>
          </p>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Engineers who have shipped at scale.
          </h2>
          <p className="mt-5 max-w-[36em] text-lg leading-relaxed text-inkSoft">
            We have built systems that process billions of transactions, serve
            millions of users, and operate where downtime is not an option.
          </p>
        </ScrollReveal>

        {/* Desktop route: crew → ministry → enterprise → startup */}
        <div className="mt-14 hidden lg:grid lg:grid-cols-[200px_1fr_1fr_1fr] lg:mt-16">
          <ScrollReveal>
            <div className="flex items-center">
              <div className="w-[150px] shrink-0">
                <CrewScene className="w-full" />
                <p className="mt-2 text-center font-mono text-[9px] font-semibold uppercase tracking-eyebrow text-blue">
                  The same engineers
                </p>
              </div>
              <FlowSegment />
            </div>
          </ScrollReveal>
          {contexts.map((context, idx) => {
            const Scene = worldScenes[idx];
            return (
              <ScrollReveal key={context.name} delay={120 + idx * 110}>
                <div className="flex items-center">
                  <div className="relative w-[180px] shrink-0">
                    <span
                      className="pointer-events-none absolute -top-4 right-0 select-none text-[56px] font-semibold leading-none tracking-tighter text-blue/[0.08]"
                      aria-hidden
                    >
                      {context.watermark}
                    </span>
                    <Scene className="w-full" />
                  </div>
                  {idx < contexts.length - 1 && <FlowSegment />}
                </div>
                <div className="mt-4 pr-8">
                  <h3 className="text-[20px] font-semibold tracking-tight text-ink">{context.name}</h3>
                  <p className="mt-2 max-w-[24em] text-[14.5px] leading-relaxed text-inkSoft">{context.note}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Mobile route: vertical journey */}
        <div className="mt-12 lg:hidden">
          <ScrollReveal>
            <div className="mx-auto w-[140px]">
              <CrewScene className="w-full" />
            </div>
            <p className="mt-1 text-center font-mono text-[9px] font-semibold uppercase tracking-eyebrow text-blue">
              The same engineers
            </p>
            <VerticalSegment />
          </ScrollReveal>
          {contexts.map((context, idx) => {
            const Scene = worldScenes[idx];
            return (
              <ScrollReveal key={context.name} delay={100 + idx * 90}>
                <div className="text-center">
                  <div className="relative mx-auto w-[170px]">
                    <span
                      className="pointer-events-none absolute -top-3 right-0 select-none text-[48px] font-semibold leading-none tracking-tighter text-blue/[0.08]"
                      aria-hidden
                    >
                      {context.watermark}
                    </span>
                    <Scene className="w-full" />
                  </div>
                  <h3 className="mt-3 text-[20px] font-semibold tracking-tight text-ink">{context.name}</h3>
                  <p className="mx-auto mt-2 max-w-[26em] text-[15px] leading-relaxed text-inkSoft">{context.note}</p>
                  {idx < contexts.length - 1 && <div className="mt-5 mb-5"><VerticalSegment /></div>}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* The route lands here */}
        <ScrollReveal delay={200}>
          <p className="mt-12 text-[22px] font-semibold tracking-tight text-ink md:text-[26px] lg:mt-14">
            We bring that experience to{" "}
            <span className="relative inline-block whitespace-nowrap">
              every engagement.
              <span className="absolute -bottom-[0.08em] left-0 h-[0.09em] w-full rounded-full bg-blue/35" aria-hidden />
            </span>
          </p>
        </ScrollReveal>

        {/* Advise-and-leave vs build-and-stay, unboxed */}
        <ScrollReveal delay={240}>
          <div className="mt-12 grid grid-cols-1 items-center gap-6 border-t border-dashed border-line pt-8 md:grid-cols-[1fr_auto_1fr] md:gap-10 lg:mt-14">
            <div className="opacity-55">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
                <span className="h-2 w-2 rounded-[2px] border border-line" aria-hidden />
                The usual model
              </p>
              <p className="mt-3 text-[19px] font-medium leading-snug tracking-tight text-inkSoft md:text-[22px]">
                Consultants who advise and leave.
              </p>
            </div>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden className="hidden md:block">
              <path d="M5 12h13M13 7l5 5-5 5" stroke="#3E63DD" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
                <span className="h-2 w-2 rounded-[2px] bg-blue" aria-hidden />
                How we engage
              </p>
              <p className="mt-3 text-[19px] font-semibold leading-snug tracking-tight text-ink md:text-[22px]">
                Partners who build and stay accountable.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
