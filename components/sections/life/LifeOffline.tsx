/*
 * [02] Clinical Intelligence, Offline — The Specialist in an Algorithm.
 * Three connectivity states as a connected sequence: no-signal local scoring,
 * the sync pulse, and the triggered response. Signal-bar glyphs are inline
 * SVG; the connectors reuse the flowing-dash idiom.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";

function SignalBars({ level }: { level: 0 | 1 | 3 }) {
  const bars = [4, 8, 12, 16];
  return (
    <svg width="24" height="20" viewBox="0 0 24 20" fill="none" aria-hidden>
      {bars.map((h, i) => (
        <rect
          key={h}
          x={i * 6}
          y={20 - h}
          width="4"
          height={h}
          rx="1"
          fill={i < level ? "#3E63DD" : "#E4E7EC"}
        >
          {level === 1 && i === 0 && (
            <animate attributeName="fill" values="#3E63DD;#E4E7EC;#3E63DD" dur="1.6s" repeatCount="indefinite" />
          )}
        </rect>
      ))}
    </svg>
  );
}

const states: { num: string; level: 0 | 1 | 3; title: string; desc: string; tag: string }[] = [
  {
    num: "01",
    level: 0,
    title: "No signal. No problem.",
    desc: "In the shadow of connectivity, Akashic Life runs 100% locally. Risk scoring happens on the device, instantly: no waiting for a network bar.",
    tag: "On-device scoring",
  },
  {
    num: "02",
    level: 1,
    title: "The sync pulse.",
    desc: "The moment a flicker of signal appears (SMS or GPRS), critical data is compressed and burst-transmitted to the cloud. No broadband required.",
    tag: "Burst transmission",
  },
  {
    num: "03",
    level: 3,
    title: "Response triggered.",
    desc: "District hospitals are alerted before the ambulance even starts its engine. A signal of hope travels back to the village in seconds.",
    tag: "Hospital alerted",
  },
];

export default function LifeOffline() {
  return (
    <section id="offline" className="scroll-mt-24 border-t border-lineSoft bg-background">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[02]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Clinical intelligence, offline</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ 45+ parameters on-device</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            We shrank the specialist into an algorithm.
          </h2>
          <p className="mt-5 max-w-[38em] text-lg leading-relaxed text-secondary-text">
            Using machine learning models optimised to run directly on low-cost
            edge devices, Akashic Life processes 45+ clinical parameters on the
            phone itself. No cloud connection required at the point of care.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 lg:mt-14">
          {states.map((state, idx) => (
            <ScrollReveal key={state.num} delay={100 + idx * 110}>
              <div className="relative h-full">
                {idx < states.length - 1 && (
                  <span
                    className="absolute -right-5 top-12 hidden h-px w-5 bg-[length:16px_1px] bg-repeat-x bg-[repeating-linear-gradient(90deg,#C8D2F5_0_8px,transparent_8px_16px)] animate-[ps-dash_1.4s_linear_infinite] md:block"
                    aria-hidden
                  />
                )}
                <div className="flex h-full flex-col overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg p-6 transition-all duration-250 ease-settle hover:-translate-y-1 hover:border-blue/25 hover:shadow-frame">
                  <div className="flex items-center justify-between">
                    <SignalBars level={state.level} />
                    <span className="font-mono text-[10px] text-overcast">{state.num} / 03</span>
                  </div>
                  <h3 className="mt-5 text-[21px] font-semibold leading-snug tracking-tight text-ink">
                    {state.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-inkSoft">{state.desc}</p>
                  <p className="mt-5 flex items-center gap-1.5 border-t border-dashed border-lineSoft pt-4 font-mono text-[9px] uppercase tracking-eyebrow text-blue">
                    <span className="h-[5px] w-[5px] rounded-full bg-blue/60" aria-hidden />
                    {state.tag}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
