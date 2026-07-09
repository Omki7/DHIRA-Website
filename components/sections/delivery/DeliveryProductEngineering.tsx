/*
 * [03] Model 2 — Product Engineering.
 * Two build tracks as dossier spec sheets sharing a 0–20 week MVP gauge
 * (tick marks + endpoint dots) so the ranges read comparably, split by a
 * floating OR node. Track A runs on Akashic, Track B on the client's stack.
 * Gauge geometry is computed inline (Rule 8 exception).
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";

const GAUGE_MAX = 20;

function WeekGauge({ from, to, dark }: { from: number; to: number; dark?: boolean }) {
  const left = (from / GAUGE_MAX) * 100;
  const width = ((to - from) / GAUGE_MAX) * 100;
  return (
    <div>
      <div className="relative h-[8px] rounded-full bg-tertiary-bg shadow-[inset_0_1px_2px_rgba(26,28,29,0.06)]">
        {[25, 50, 75].map((tick) => (
          <span
            key={tick}
            className="absolute inset-y-0 w-px bg-white"
            style={{ left: `${tick}%` }}
            aria-hidden
          />
        ))}
        <div
          className={`absolute inset-y-0 rounded-full ${
            dark
              ? "bg-gradient-to-r from-[#2A2D2F] to-ink"
              : "bg-gradient-to-r from-[#5B7BE8] to-blue"
          }`}
          style={{ left: `${left}%`, width: `${width}%` }}
        />
        <span
          className={`absolute top-1/2 h-[13px] w-[13px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-card ${
            dark ? "bg-ink" : "bg-blue"
          }`}
          style={{ left: `${left}%` }}
          aria-hidden
        />
        <span
          className={`absolute top-1/2 h-[13px] w-[13px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-card ${
            dark ? "bg-ink" : "bg-blue"
          } animate-[ps-pulse_2.4s_infinite]`}
          style={{ left: `${left + width}%` }}
          aria-hidden
        />
      </div>
      <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-[0.1em] text-overcast">
        <span>0</span>
        <span>WK 5</span>
        <span>WK 10</span>
        <span>WK 15</span>
        <span>WK 20</span>
      </div>
    </div>
  );
}

const tracks = [
  {
    tag: "SPEC / A",
    name: "Akashic-Native Build",
    icon: "Platform Deployment",
    mvp: "12–20 WKS TO MVP",
    from: 12,
    to: 20,
    dark: false,
    when: "Your product requires a data layer that is sovereign, traceable, and AI-ready from day one. Ideal for healthcare, finance, or public sector deployments.",
    advantage: "Launch months faster by not rebuilding complex data infrastructure from scratch.",
    engine: "Akashic as the engine",
    stack: ["Data layer", "Knowledge graph", "AI runtime"],
  },
  {
    tag: "SPEC / B",
    name: "Standalone Build",
    icon: "Custom Accelerators",
    mvp: "10–16 WKS TO MVP",
    from: 10,
    to: 16,
    dark: true,
    when: "Your core stack is locked in (SAP, mainframe, custom), or the product is a brand-specific, customer-facing application.",
    advantage: "High-velocity engineering on your existing architecture. Governed by our standards, built on your stack.",
    engine: "Your existing stack",
    stack: ["SAP", "Mainframe", "Custom"],
  },
];

export default function DeliveryProductEngineering() {
  return (
    <section id="product-engineering" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[03]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Model 2 &middot; Product Engineering</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Akashic optional</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            We build what you need. Akashic is optional.
          </h2>
          <p className="mt-5 max-w-[42em] text-lg leading-relaxed text-secondary-text">
            Sometimes you need a bespoke application, not a platform. We&nbsp;engineer it.
            If&nbsp;Akashic accelerates the outcome, we use it as the engine. If&nbsp;your
            environment demands a native build, we engineer it to your exact
            specifications.
          </p>
        </ScrollReveal>

        <div className="relative mt-12 grid grid-cols-1 gap-5 lg:mt-14 lg:grid-cols-2 lg:gap-10">
          <span
            className="absolute left-1/2 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-subtle-stroke bg-white font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-inkSoft shadow-frame lg:flex"
            aria-hidden
          >
            or
          </span>
          {tracks.map((track, idx) => (
            <ScrollReveal key={track.tag} delay={100 + idx * 100}>
              <div className="flex h-full flex-col overflow-hidden rounded-[14px] border border-subtle-stroke bg-white shadow-card transition-all duration-250 ease-settle hover:-translate-y-1 hover:shadow-frame">
                <div
                  className={`h-[3px] ${
                    track.dark
                      ? "bg-gradient-to-r from-ink/70 via-ink/30 to-transparent"
                      : "bg-gradient-to-r from-blue/70 via-blue/30 to-transparent"
                  }`}
                  aria-hidden
                />
                <div
                  className={`flex items-center gap-2.5 border-b px-4 py-3 ${
                    track.dark
                      ? "border-ink/10 bg-gradient-to-b from-tertiary-bg/80 to-transparent"
                      : "border-blue/10 bg-gradient-to-b from-blue-subtle/70 to-transparent"
                  }`}
                >
                  <div
                    className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[8px] border shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] ${
                      track.dark
                        ? "border-ink/15 bg-gradient-to-br from-[#EDEEEF] to-[#E0E1E3]"
                        : "border-blue/20 bg-gradient-to-br from-[#E4EAFF] to-[#D4DEFF]"
                    }`}
                  >
                    <DynamicSketchIcon
                      text={track.icon}
                      className={`h-[15px] w-[15px] ${track.dark ? "text-ink" : "text-blue"}`}
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-[15px] font-bold tracking-tight text-ink">
                      {track.name}
                    </span>
                    <span className="truncate font-mono text-[9px] uppercase tracking-[0.08em] text-tertiary-text">
                      {track.tag}
                    </span>
                  </div>
                  <span
                    className={`inline-flex shrink-0 items-center rounded-[7px] border px-2 py-1 font-mono text-[9px] font-bold tracking-[0.03em] ${
                      track.dark
                        ? "border-default-stroke bg-tertiary-bg text-secondary-text"
                        : "border-blue-border bg-blue-subtle text-blue"
                    }`}
                  >
                    {track.mvp}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                  <div>
                    <p className="font-mono text-[9.5px] uppercase tracking-eyebrow text-overcast">
                      Time to MVP
                    </p>
                    <div className="mt-3">
                      <WeekGauge from={track.from} to={track.to} dark={track.dark} />
                    </div>
                  </div>

                  <div className="mt-6 border-t border-dashed border-lineSoft pt-5">
                    <p className="font-mono text-[9.5px] uppercase tracking-eyebrow text-overcast">
                      When to use
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-inkSoft">{track.when}</p>
                  </div>

                  <div className="mt-5 border-t border-dashed border-lineSoft pt-5">
                    <p className="font-mono text-[9.5px] uppercase tracking-eyebrow text-overcast">
                      The advantage
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-inkSoft">{track.advantage}</p>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-subtle-stroke pt-5">
                    <span className="text-[13px] font-semibold tracking-tight text-ink">
                      <span className="font-mono text-[9.5px] font-normal uppercase tracking-eyebrow text-overcast">
                        Engine&nbsp;&nbsp;
                      </span>
                      {track.engine}
                    </span>
                    <span className="flex flex-wrap gap-1.5">
                      {track.stack.map((item) => (
                        <span
                          key={item}
                          className={`inline-flex items-center rounded-[7px] border px-2 py-1 font-mono text-[9px] font-bold tracking-[0.03em] ${
                            track.dark
                              ? "border-default-stroke bg-tertiary-bg text-secondary-text"
                              : "border-blue-border bg-blue-subtle text-blue"
                          }`}
                        >
                          {item}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200}>
          <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
            Both tracks &middot; governed by DHIRA standards &middot; you own the code
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
