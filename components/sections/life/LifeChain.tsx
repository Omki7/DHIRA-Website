/*
 * [04] Village to Policy — One Signal, Three Altitudes.
 * The aggregation chain as a fan-in diagram: village data points converge
 * into district nodes, district nodes into the national dashboard bar.
 * Decorative SVG in the AkashicFlowConnectors idiom.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";

function ChainDiagram() {
  const villages = [24, 72, 120, 168, 216, 264, 312, 360];
  const districts = [96, 288];
  return (
    <svg viewBox="0 0 384 150" fill="none" aria-hidden className="mx-auto block w-full max-w-[560px]">
      {/* village dots */}
      {villages.map((x) => (
        <g key={x}>
          <circle cx={x} cy="12" r="4" fill="#FFFFFF" stroke="#C8D2F5" strokeWidth="1.2" />
          <circle cx={x} cy="12" r="1.6" fill="#3E63DD" />
        </g>
      ))}
      {/* village → district */}
      {villages.map((x, i) => {
        const d = i < 4 ? districts[0] : districts[1];
        return (
          <path key={`v${x}`} d={`M ${x} 18 C ${x} 44, ${d} 40, ${d} 62`} stroke="#C8D2F5" strokeWidth="1.1" fill="none" />
        );
      })}
      <path d="M 120 18 C 120 44, 96 40, 96 62" stroke="#3E63DD" strokeWidth="1.4" strokeDasharray="10 60" fill="none" opacity="0.85">
        <animate attributeName="stroke-dashoffset" values="70;0" dur="2.4s" repeatCount="indefinite" />
      </path>
      {/* district nodes */}
      {districts.map((x) => (
        <g key={`d${x}`}>
          <rect x={x - 34} y="62" width="68" height="22" rx="7" fill="#FFFFFF" stroke="#C8D2F5" strokeWidth="1.2" />
          <circle cx={x - 22} cy="73" r="2" fill="#3E63DD" />
          <text x={x - 14} y="76.5" fontFamily="monospace" fontSize="8.5" fill="#5C5E63">District</text>
        </g>
      ))}
      {/* district → national */}
      {districts.map((x) => (
        <path key={`n${x}`} d={`M ${x} 84 C ${x} 106, 192 102, 192 118`} stroke="#C8D2F5" strokeWidth="1.2" fill="none" />
      ))}
      <path d="M 96 84 C 96 106, 192 102, 192 118" stroke="#3E63DD" strokeWidth="1.4" strokeDasharray="10 58" fill="none" opacity="0.85">
        <animate attributeName="stroke-dashoffset" values="68;0" dur="2.4s" repeatCount="indefinite" begin="0.6s" />
      </path>
      {/* national bar */}
      <rect x="96" y="118" width="192" height="26" rx="8" fill="#1A1C1D" />
      <circle cx="112" cy="131" r="2.4" fill="#30A46C">
        <animate attributeName="opacity" values="1;0.35;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="122" y="134.5" fontFamily="monospace" fontSize="9" fill="#FFFFFF">National health dashboard</text>
    </svg>
  );
}

export default function LifeChain() {
  return (
    <section id="village-to-policy" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[04]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Village vitals to national policy</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ One architecture, three altitudes</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            One life saved today. Policy for millions tomorrow.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:mt-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <ScrollReveal delay={100}>
            <p className="max-w-[34em] text-lg leading-relaxed text-secondary-text">
              Every risk score generated at the edge feeds upward: anonymised,
              aggregated, and actionable. Thousands of villages, to district
              hospital nodes, to a national health ministry dashboard.
            </p>
            <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-secondary-text">
              The same architecture DHIRA used to give the Ministry of Education a
              live national view of 1.89 crore DIKSHA learners now gives health
              administrators a live national view of maternal risk, district by
              district, in real time.
            </p>
            <p className="mt-6 flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-eyebrow text-inkSoft">
              <span className="h-[5px] w-[5px] rounded-full bg-blue/60" aria-hidden />
              Same Akashic MDM and BI architecture as every DHIRA deployment
            </p>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <div className="overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg p-6 md:p-8">
              <div className="flex items-baseline justify-between font-mono text-[9px] uppercase tracking-[0.08em] text-overcast">
                <span>Thousands of villages</span>
                <span>Anonymised &middot; aggregated</span>
              </div>
              <div className="mt-4">
                <ChainDiagram />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
