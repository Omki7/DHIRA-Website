/*
 * [03] Your Architecture — Deploy It Your Way.
 * The card bodies are SIMULATED PRODUCT UI (see AGENTS.md §8a): the same
 * miniature Akashic stack rendered on three different grounds, with canned
 * region names and status chrome. Cloud region names are real provider
 * regions, not deployment claims.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import { FlowPath, MergeDown, MobileConn } from "@/components/demos/AkashicFlowConnectors";
import { CARD, CardHeader, CardDesc, LiveChip, BlueChip, MiniStack } from "@/components/sections/akashic/AkashicCardChrome";

function DropLine() {
  return (
    <svg width="2" height="16" viewBox="0 0 2 16" className="mx-auto shrink-0" aria-hidden>
      <line x1="1" y1="0" x2="1" y2="16" stroke="#C8D2F5" strokeWidth="1.5" />
      <line
        x1="1"
        y1="0"
        x2="1"
        y2="16"
        stroke="#3E63DD"
        strokeWidth="1.5"
        strokeDasharray="4 18"
        className="animate-[ps-flow_1.8s_linear_infinite]"
        opacity="0.85"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Card bodies                                                        */
/* ------------------------------------------------------------------ */

function CloudBody() {
  const providers = [
    { code: "AWS", bg: "#232F3E", name: "Amazon Web Services", region: "ap-south-1" },
    { code: "Az", bg: "#0078D4", name: "Microsoft Azure", region: "Central India" },
    { code: "G", bg: "#4285F4", name: "Google Cloud", region: "asia-south1" },
  ];
  return (
    <div className="flex flex-1 flex-col gap-2 p-3.5">
      <MiniStack className="mx-auto" />
      <DropLine />
      <div className="flex flex-col gap-1.5">
        {providers.map((p) => (
          <div key={p.code} className="flex items-center gap-2.5 rounded-[10px] border border-[#EEEEF3] bg-[#FBFBFE] px-3 py-2">
            <div
              className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[5px] text-[8px] font-bold text-white"
              style={{ background: p.bg }}
            >
              {p.code}
            </div>
            <span className="min-w-0 flex-1 truncate text-[11.5px] font-semibold text-ink">{p.name}</span>
            <span className="shrink-0 font-mono text-[9px] text-[#7C828C]">{p.region}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-2 rounded-[9px] border border-blue-border bg-blue-subtle px-3 py-2">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
        <span className="text-[11px] font-semibold text-blue">Your provider, your region</span>
      </div>
    </div>
  );
}

function OnPremBody() {
  return (
    <div className="flex flex-1 flex-col gap-2 p-3.5">
      <div className="rounded-[12px] border-[1.5px] border-dashed border-line bg-primary-bg px-3 pt-2.5 pb-4">
        <div className="flex items-center justify-between pb-3">
          <span className="font-mono text-[8.5px] font-bold tracking-[0.07em] text-[#7C828C]">YOUR PERIMETER</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
        </div>
        <MiniStack className="mx-auto" />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {["Your hardware", "Your network", "Your keys"].map((item) => (
          <span key={item} className="rounded-[7px] border border-[#EEEEF3] bg-[#FBFBFE] px-2 py-1 text-[10px] font-medium text-inkSoft">
            {item}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-2 rounded-[9px] border border-[#CBEFDF] bg-[#EBF8F3] px-3 py-2">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#30A46C]" />
        <span className="text-[11px] font-bold text-[#1B7A47]">Nothing leaves your perimeter</span>
      </div>
    </div>
  );
}

function HybridBody() {
  return (
    <div className="flex flex-1 flex-col gap-2 p-3.5">
      <MiniStack className="mx-auto" />
      <svg viewBox="0 0 200 20" className="h-5 w-full" fill="none" aria-hidden>
        <FlowPath d="M 100 0 C 100 12, 52 8, 52 20" />
        <FlowPath d="M 100 0 C 100 12, 148 8, 148 20" />
      </svg>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-[10px] border-[1.5px] border-dashed border-line bg-primary-bg px-2.5 py-2 text-center">
          <span className="font-mono text-[8.5px] font-bold tracking-[0.07em] text-[#7C828C]">YOUR RACKS</span>
        </div>
        <div className="rounded-[10px] border border-[#EEEEF3] bg-[#FBFBFE] px-2.5 py-2 text-center">
          <span className="font-mono text-[8.5px] font-bold tracking-[0.07em] text-[#7C828C]">YOUR CLOUD</span>
        </div>
      </div>
      <div className="mt-auto flex items-center gap-2.5 rounded-[9px] border border-blue-border bg-blue-subtle px-3 py-2">
        <span className="flex -space-x-1.5 shrink-0">
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white bg-blue text-[7.5px] font-bold text-white">DH</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white bg-blue-border text-[7.5px] font-bold text-blue">You</span>
        </span>
        <span className="text-[11px] font-semibold text-blue">One governed model across both</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export default function AkashicArchitecture() {
  return (
    <section id="architecture" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-overcast">[03]</span>
            <span className="text-inkSoft">&nbsp;&nbsp;Your architecture</span>
          </p>
          <h2 className="mt-5 max-w-[13em] text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Deploy where your data has to live.
          </h2>
          <p className="mt-5 max-w-[32em] text-lg leading-relaxed text-secondary-text">
            Akashic runs on your terms, not the vendor&rsquo;s.
          </p>
        </ScrollReveal>

        <div className="mx-auto mt-14 max-w-[1100px] lg:mt-16">
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            <ScrollReveal>
              <div className={`${CARD} h-full`}>
                <CardHeader icon="Cloud Deployment" name="Cloud" sub="AWS · Azure · GCP" chip={<LiveChip />} />
                <CardDesc text="Deploy on AWS, Azure, or GCP." />
                <CloudBody />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={90}>
              <div className={`${CARD} h-full`}>
                <CardHeader icon="On-Premises" name="On-Premises" sub="Inside your perimeter" chip={<BlueChip label="SOVEREIGN" />} />
                <CardDesc text="Full data sovereignty, for governments and regulated enterprises." />
                <OnPremBody />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <div className={`${CARD} h-full`}>
                <CardHeader icon="Hybrid Deployment" name="Hybrid" sub="On-prem and cloud, together" chip={<LiveChip label="CONNECTED" />} />
                <CardDesc text="Run across your existing architecture, with DHIRA's engineering team alongside you." />
                <HybridBody />
              </div>
            </ScrollReveal>
          </div>

          <MergeDown />
          <MobileConn />

          <ScrollReveal delay={120}>
            <div className="mx-auto max-w-[640px] rounded-frame border border-blue-border bg-blue-subtle/40 px-6 py-8 text-center md:py-9">
              <p className="text-xl font-semibold tracking-tight text-ink md:text-2xl">
                Your data stays where you need it to.
              </p>
              <p className="mt-2.5 text-base leading-relaxed text-inkSoft">
                The governance and the answers stay consistent either way.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
