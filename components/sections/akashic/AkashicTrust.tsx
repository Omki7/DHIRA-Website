/*
 * [05] Enterprise Trust — The Trust Stack.
 * Represented in layer form (design direction, Jul 2026): the answer sits on
 * four widening trust layers — access control, lineage, audit trails, data
 * residency — each carrying its micro-proof inline (SIMULATED PRODUCT UI,
 * §8a: canned roles, traces, and log lines). All accents blue. Sits on the
 * page's one soft blue band (site-wide consistency pass, 17 Jul) — Akashic
 * had zero background variation across all ten sections.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";

type TrustLayer = {
  depth: string;
  icon: string;
  name: string;
  claim: string;
  proof: React.ReactNode;
  maxW: string;
  dashed?: boolean;
};

function ProofChip({ children, mono = true }: { children: React.ReactNode; mono?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-[7px] border border-subtle-stroke bg-primary-bg px-2 py-1 ${
        mono ? "font-mono text-[9.5px]" : "text-[10.5px] font-medium"
      } text-inkSoft`}
    >
      {children}
    </span>
  );
}

const layers: TrustLayer[] = [
  {
    depth: "L1",
    icon: "Access Control",
    name: "Access control",
    claim: "Role-based permissions, enforced at every layer, not just the login screen.",
    proof: (
      <>
        <ProofChip>Analyst · read</ProofChip>
        <ProofChip>District lead · read/write</ProofChip>
        <ProofChip>Auditor · read-only</ProofChip>
      </>
    ),
    maxW: "lg:max-w-[640px]",
  },
  {
    depth: "L2",
    icon: "Lineage",
    name: "Lineage",
    claim: "Every number traces back to its sources and every transformation in between.",
    proof: (
      <ProofChip>
        erp.orders&nbsp;<span className="text-blue">&rarr;</span>&nbsp;normalise&nbsp;
        <span className="text-blue">&rarr;</span>&nbsp;dedupe&nbsp;
        <span className="text-blue">&rarr;</span>&nbsp;answer
      </ProofChip>
    ),
    maxW: "lg:max-w-[780px]",
  },
  {
    depth: "L3",
    icon: "Audit Trails",
    name: "Audit trails",
    claim: "A complete, timestamped record of who accessed what, and when. Always on.",
    proof: (
      <>
        <ProofChip>09:41:07 · asha.r viewed District 7 brief</ProofChip>
        <ProofChip>09:21:45 · auditor granted read-only</ProofChip>
      </>
    ),
    maxW: "lg:max-w-[920px]",
  },
  {
    depth: "L4",
    icon: "Data Residency",
    name: "Data residency",
    claim: "The perimeter: deploy so data never leaves the jurisdiction it must stay in.",
    proof: (
      <>
        <ProofChip mono={false}>Stored in-region</ProofChip>
        <ProofChip mono={false}>Processed in-region</ProofChip>
        <ProofChip mono={false}>Answered in-region</ProofChip>
      </>
    ),
    maxW: "lg:max-w-[1060px]",
    dashed: true,
  },
];

function LayerJoint() {
  return <span className="mx-auto block h-3 w-px bg-blue-border" aria-hidden />;
}

export default function AkashicTrust() {
  return (
    <section
      id="trust"
      className="scroll-mt-24 border-t border-lineSoft bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F5FE_16%,#F1F5FE_84%,#FFFFFF_100%)]"
    >
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-overcast">[05]</span>
            <span className="text-inkSoft">&nbsp;&nbsp;Enterprise trust</span>
          </p>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            An answer you can&rsquo;t trace is just an opinion.
          </h2>
          <p className="mt-5 max-w-[32em] text-lg leading-relaxed text-secondary-text">
            Every answer stands on four layers of trust, each one built to be
            checked, not just believed.
          </p>
        </ScrollReveal>

        <div className="mt-14 lg:mt-16">
          {/* What the layers hold up */}
          <ScrollReveal>
            <div className="mx-auto w-fit rounded-[12px] border border-blue-border bg-blue-subtle px-5 py-3 shadow-card">
              <span className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
                <span className="text-[13.5px] font-semibold tracking-tight text-ink">
                  The answer someone acts on
                </span>
              </span>
            </div>
            <LayerJoint />
          </ScrollReveal>

          {/* The four trust layers, widening downward */}
          {layers.map((layer, idx) => (
            <ScrollReveal key={layer.depth} delay={80 + idx * 90}>
              <div className={`mx-auto w-full ${layer.maxW}`}>
                <div
                  className={`rounded-frame border bg-white px-5 py-4 shadow-card transition-all duration-250 ease-settle hover:-translate-y-0.5 hover:shadow-frame md:px-6 ${
                    layer.dashed ? "border-dashed border-line bg-primary-bg" : "border-subtle-stroke"
                  }`}
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                    <div className="flex min-w-0 items-start gap-3.5">
                      <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] border border-blue/20 bg-gradient-to-br from-[#E4EAFF] to-[#D4DEFF] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                        <DynamicSketchIcon text={layer.icon} className="h-[16px] w-[16px] text-blue" />
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-baseline gap-2.5">
                          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-blue">
                            {layer.depth}
                          </span>
                          <h3 className="text-[16px] font-semibold tracking-tight text-ink">
                            {layer.name}
                          </h3>
                        </div>
                        <p className="mt-1 max-w-[34em] text-[13px] leading-relaxed text-inkSoft">
                          {layer.claim}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-1.5 lg:max-w-[380px] lg:justify-end">
                      {layer.proof}
                    </div>
                  </div>
                </div>
                {idx < layers.length - 1 && <LayerJoint />}
              </div>
            </ScrollReveal>
          ))}

          {/* The floor label */}
          <ScrollReveal delay={200}>
            <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
              Surface to floor &middot; the deeper the layer, the wider it holds
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="mt-16 flex flex-col items-center text-center lg:mt-20">
            <p className="max-w-[22em] text-2xl font-semibold leading-snug tracking-tight text-ink md:text-[28px]">
              This is what makes an answer defensible, not just delivered.
            </p>
            <Link href="#talk-to-our-team" className="btn-primary mt-8">
              Talk to our team
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
