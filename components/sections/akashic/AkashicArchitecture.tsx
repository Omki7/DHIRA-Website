/*
 * [03] Your Architecture — Deploy It Your Way.
 * Sits directly after the [02] teardown (moved above the module stack,
 * July 2026) and is deliberately compact: header, three environment
 * plates, and the consistency close bar all fit one desktop viewport.
 * Each plate is drawn as the ground it represents: an open sky for
 * cloud (real AWS / Azure / Google marks, icons/CloudProviderLogos),
 * a server cabinet for on-premises, a bridged split estate for hybrid.
 * The same AkashicMark sits in all three (SIMULATED PRODUCT UI, see
 * AGENTS.md §8a). Cloud region names are real provider regions, not
 * deployment claims.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import { FlowPath, Node, MergeDown, MobileConn } from "@/components/demos/AkashicFlowConnectors";
import { BlueChip, AkashicMark } from "@/components/sections/akashic/AkashicCardChrome";
import { AwsLogo, AzureLogo, GoogleGLogo } from "@/components/icons/CloudProviderLogos";

const PLATE =
  "flex h-full flex-col overflow-hidden rounded-frame border transition-all duration-250 ease-settle hover:-translate-y-1 hover:shadow-frame";

function PlateHeader({
  name,
  desc,
  chip,
}: {
  name: string;
  desc: string;
  chip: React.ReactNode;
}) {
  return (
    <div className="p-5 pb-0">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[16px] font-semibold tracking-tight text-ink">{name}</h3>
        {chip}
      </div>
      <p className="mt-1.5 min-h-[38px] text-[12.5px] leading-relaxed text-inkSoft">{desc}</p>
    </div>
  );
}

/* Animated drop lines fanning from the stack to its ground. */
function Fan({ targets }: { targets: number[] }) {
  return (
    <svg
      viewBox="0 0 300 34"
      className="h-[34px] w-full"
      preserveAspectRatio="none"
      fill="none"
      style={{ overflow: "visible" }}
      aria-hidden
    >
      {targets.map((x) => (
        <FlowPath key={x} d={`M 150 0 C 150 18, ${x} 14, ${x} 34`} />
      ))}
      <Node x={150} y={0} />
      {targets.map((x) => (
        <Node key={`t${x}`} x={x} y={34} />
      ))}
    </svg>
  );
}

function RackUnit() {
  return (
    <div className="flex h-[18px] items-center justify-between rounded-[4px] border border-line/70 bg-white px-2">
      <span className="flex gap-1" aria-hidden>
        <span className="h-[2px] w-3 rounded-full bg-ink/15" />
        <span className="h-[2px] w-3 rounded-full bg-ink/15" />
        <span className="h-[2px] w-3 rounded-full bg-ink/15" />
      </span>
      <span className="h-1 w-1 rounded-full bg-blue animate-[ps-pulse_2.4s_infinite]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  The three grounds                                                  */
/* ------------------------------------------------------------------ */

function CloudPlate() {
  const providers = [
    { name: "AWS", region: "ap-south-1", logo: <AwsLogo className="h-6 w-auto" /> },
    { name: "Azure", region: "Central India", logo: <AzureLogo className="h-6 w-6" /> },
    { name: "Google Cloud", region: "asia-south1", logo: <GoogleGLogo className="h-6 w-6" /> },
  ];
  return (
    <div className={`${PLATE} border-blue-border/70 bg-gradient-to-b from-[#EDF3FF] via-white to-white`}>
      <div className="h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent" aria-hidden />
      <PlateHeader name="Cloud" desc="Run in the region your regulator names. All three providers, if you need them." chip={<BlueChip label="LIVE" />} />
      <div className="flex flex-1 flex-col p-5 pt-3">
        <AkashicMark className="mx-auto" />
        <Fan targets={[52, 150, 248]} />
        <div className="grid grid-cols-3 gap-2">
          {providers.map((p) => (
            <div key={p.name} className="flex flex-col items-center gap-1.5 rounded-[10px] border border-subtle-stroke bg-white px-1 py-3 shadow-card">
              <span className="flex h-7 items-center justify-center">{p.logo}</span>
              <span className="whitespace-nowrap text-[10px] font-semibold text-ink">{p.name}</span>
              <span className="font-mono text-[8px] text-tertiary-text">{p.region}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-2 pt-4">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
          <span className="text-[11.5px] font-semibold text-blue">Your provider, your region</span>
        </div>
      </div>
    </div>
  );
}

function OnPremPlate() {
  return (
    <div className={`${PLATE} border-line bg-[#F6F6F7]`}>
      <div className="h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent" aria-hidden />
      <PlateHeader
        name="On-Premises"
        desc="Full data sovereignty, for governments and regulated enterprises."
        chip={<BlueChip label="SOVEREIGN" />}
      />
      <div className="flex flex-1 flex-col p-5 pt-3">
        <div className="mx-auto w-full max-w-[220px] rounded-[12px] border border-line bg-tertiary-bg p-2 shadow-card">
          <div className="flex items-center justify-between px-1 pb-1.5">
            <span className="font-mono text-[7.5px] font-bold tracking-[0.08em] text-overcast">RACK 01 · YOUR PERIMETER</span>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="4" y="10" width="16" height="11" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <RackUnit />
            <div className="flex justify-center rounded-[8px] border border-blue-border/60 bg-blue-subtle/70 py-2">
              <AkashicMark className="border-0 bg-transparent px-0 py-0 shadow-none" />
            </div>
            <RackUnit />
            <RackUnit />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
          {["Your hardware", "Your network", "Your keys"].map((item) => (
            <span key={item} className="rounded-[7px] border border-[#E5E5E8] bg-white px-2 py-1 text-[10px] font-medium text-inkSoft">
              {item}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-2 pt-4">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
          <span className="text-[11.5px] font-semibold text-blue">Your perimeter, unchanged</span>
        </div>
      </div>
    </div>
  );
}

function HybridPlate() {
  return (
    <div className={`${PLATE} border-subtle-stroke bg-white`}>
      <div className="h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent" aria-hidden />
      <PlateHeader
        name="Hybrid"
        desc="Keep regulated data in your racks and run everything else in your cloud. One estate, not two."
        chip={<BlueChip label="CONNECTED" />}
      />
      <div className="flex flex-1 flex-col p-5 pt-3">
        <AkashicMark className="mx-auto" />
        <Fan targets={[75, 225]} />
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-[10px] border border-line bg-tertiary-bg p-1.5">
            <div className="flex flex-col gap-1">
              <RackUnit />
              <RackUnit />
            </div>
            <div className="pt-1.5 text-center font-mono text-[7.5px] font-bold tracking-[0.08em] text-tertiary-text">
              YOUR RACKS
            </div>
          </div>
          <div className="rounded-[10px] border border-blue-border/60 bg-gradient-to-b from-[#EDF3FF] to-white p-1.5">
            <div className="flex h-[41px] items-center justify-center gap-2.5">
              <AwsLogo className="h-4 w-auto" />
              <AzureLogo className="h-4 w-4" />
              <GoogleGLogo className="h-4 w-4" />
            </div>
            <div className="pt-1.5 text-center font-mono text-[7.5px] font-bold tracking-[0.08em] text-tertiary-text">
              YOUR CLOUD
            </div>
          </div>
        </div>
        <div className="mt-auto flex items-center gap-2.5 pt-4">
          <span className="flex -space-x-1.5 shrink-0">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white bg-blue text-[7.5px] font-bold text-white">DH</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white bg-blue-border text-[7.5px] font-bold text-blue">You</span>
          </span>
          <span className="text-[11.5px] font-semibold text-blue">One governed foundation across both</span>
        </div>
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
      <div className="rail-container pt-10 pb-14 lg:pt-12 lg:pb-16">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-overcast">[03]</span>
            <span className="text-inkSoft">&nbsp;&nbsp;Your architecture</span>
          </p>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md">
            Deploy where your data has to live.
          </h2>
          <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-secondary-text">
            Data residency rules decide your architecture before anything else does.
            Akashic runs the same way in all three: same modules, same governance, same
            answers, whether you deploy on your cloud, in your own racks, or across both.
          </p>
        </ScrollReveal>

        <div className="mx-auto mt-8 max-w-[1100px] lg:mt-10">
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            <ScrollReveal>
              <CloudPlate />
            </ScrollReveal>
            <ScrollReveal delay={90}>
              <OnPremPlate />
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <HybridPlate />
            </ScrollReveal>
          </div>

          <MergeDown />
          <MobileConn />

          <ScrollReveal delay={120}>
            <div className="mx-auto flex max-w-[980px] flex-col items-center justify-center gap-2.5 rounded-frame border border-blue-border bg-blue-subtle/40 px-6 py-4 text-center md:flex-row md:gap-4 md:py-3.5">
              <AkashicMark className="shrink-0" />
              <p className="text-[14.5px] leading-relaxed md:text-[15px]">
                <span className="font-semibold tracking-tight text-ink">
                  Your data stays where you need it to.
                </span>{" "}
                <span className="text-inkSoft">
                  The governance and the answers stay consistent either way.
                </span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
