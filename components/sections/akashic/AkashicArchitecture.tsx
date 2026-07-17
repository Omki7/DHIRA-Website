/*
 * [03] Where It Runs — deploy it your way. (Eyebrow renamed from "Your
 * architecture", Jul 2026: [04] owns the word "architecture" now.)
 * Sits directly after the [02] teardown (moved above the module stack,
 * July 2026) and is deliberately compact: header, three environment
 * plates, and the consistency close bar all fit one desktop viewport.
 * Each plate is drawn as the ground it represents: an open sky for
 * cloud (real AWS / Azure / Google marks, icons/CloudProviderLogos),
 * a server cabinet for on-premises, a bridged split estate for hybrid.
 * The same AkashicMark sits in all three (SIMULATED PRODUCT UI, see
 * AGENTS.md §8a). The cloud plate shows the three providers only, no
 * named regions (user direction, Jul 2026): the point is any-cloud /
 * any-region, and specific regions read as an India-only signal.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import { FlowPath, Node, MergeDown, MobileConn } from "@/components/demos/AkashicFlowConnectors";
import { BlueChip, AkashicMark, Capillary } from "@/components/sections/akashic/AkashicCardChrome";
import { AwsLogo, AzureLogo, GoogleGLogo } from "@/components/icons/CloudProviderLogos";

const PLATE =
  "flex h-full flex-col overflow-hidden rounded-outer border transition-all duration-250 ease-settle hover:-translate-y-1 hover:shadow-frame";

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
    <div className="flex h-[18px] items-center justify-between rounded-micro border border-line bg-gradient-to-b from-white to-[#F1F2F4] px-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
      <span className="flex gap-1" aria-hidden>
        <span className="h-[2.5px] w-3 rounded-full bg-ink/35" />
        <span className="h-[2.5px] w-3 rounded-full bg-ink/35" />
        <span className="h-[2.5px] w-3 rounded-full bg-ink/35" />
      </span>
      <span className="h-1.5 w-1.5 rounded-full bg-blue shadow-[0_0_5px_rgba(62,99,221,0.7)]" aria-hidden />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  The three grounds                                                  */
/* ------------------------------------------------------------------ */

function CloudPlate() {
  const providers = [
    { name: "AWS", logo: <AwsLogo className="h-6 w-auto" /> },
    { name: "Azure", logo: <AzureLogo className="h-6 w-6" /> },
    { name: "Google Cloud", logo: <GoogleGLogo className="h-6 w-6" /> },
  ];
  return (
    <div className={`${PLATE} border-blue-border/70 bg-gradient-to-b from-[#EDF3FF] via-white to-white`}>
      <Capillary />
      <PlateHeader name="Cloud" desc="Run in the region your regulator names. All three providers, if you need them." chip={<BlueChip label="LIVE" />} />
      <div className="flex flex-1 flex-col p-5 pt-3">
        <AkashicMark className="mx-auto" />
        <Fan targets={[52, 150, 248]} />
        <div className="grid grid-cols-3 gap-2">
          {providers.map((p) => (
            <div key={p.name} className="flex flex-col items-center gap-2 rounded-inner border border-card-line bg-white px-1 py-4 shadow-card">
              <span className="flex h-7 items-center justify-center">{p.logo}</span>
              <span className="whitespace-nowrap text-[10px] font-semibold text-ink">{p.name}</span>
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
      <Capillary />
      <PlateHeader
        name="On-Premises"
        desc="Full data sovereignty, for governments and regulated enterprises."
        chip={<BlueChip label="SOVEREIGN" />}
      />
      <div className="flex flex-1 flex-col p-5 pt-3">
        <div className="mx-auto w-full max-w-[220px] rounded-inner border border-line bg-gradient-to-b from-[#F3F4F6] to-[#E8EAED] p-2 shadow-frame">
          <div className="flex items-center justify-between px-1 pb-1.5">
            <span className="font-mono text-[7.5px] font-bold tracking-[0.08em] text-secondary-text">RACK 01 · YOUR PERIMETER</span>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="4" y="10" width="16" height="11" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <RackUnit />
            <div className="flex justify-center rounded-tile border border-blue-border bg-blue-subtle py-2 shadow-[0_0_0_1px_rgba(62,99,221,0.12),0_2px_10px_rgba(62,99,221,0.18)]">
              <AkashicMark className="border-0 bg-transparent px-0 py-0 shadow-none" />
            </div>
            <RackUnit />
            <RackUnit />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
          {["Your hardware", "Your network", "Your keys"].map((item) => (
            <span key={item} className="rounded-chip border border-card-line bg-white px-2 py-1 text-[10px] font-medium text-inkSoft">
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
      <Capillary />
      <PlateHeader
        name="Hybrid"
        desc="Keep regulated data in your racks and run everything else in your cloud. One estate, not two."
        chip={<BlueChip label="CONNECTED" />}
      />
      <div className="flex flex-1 flex-col p-5 pt-3">
        <AkashicMark className="mx-auto" />
        <Fan targets={[75, 225]} />
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-inner border border-line bg-gradient-to-b from-[#F3F4F6] to-[#E8EAED] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
            <div className="flex flex-col gap-1">
              <RackUnit />
              <RackUnit />
            </div>
            <div className="pt-1.5 text-center font-mono text-[7.5px] font-bold tracking-[0.08em] text-secondary-text">
              YOUR RACKS
            </div>
          </div>
          <div className="rounded-inner border border-blue-border bg-gradient-to-b from-[#EDF3FF] to-white p-1.5">
            <div className="flex h-[41px] items-center justify-center gap-2.5">
              <AwsLogo className="h-4 w-auto" />
              <AzureLogo className="h-4 w-4" />
              <GoogleGLogo className="h-4 w-4" />
            </div>
            <div className="pt-1.5 text-center font-mono text-[7.5px] font-bold tracking-[0.08em] text-secondary-text">
              YOUR CLOUD
            </div>
          </div>
        </div>
        <div className="mt-auto flex items-center gap-2.5 pt-4">
          <span className="flex -space-x-1.5 shrink-0">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white bg-blue text-[7.5px] font-bold text-white">DH</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white bg-blue-border text-[7.5px] font-bold text-blue">You</span>
          </span>
          <span className="text-[11.5px] font-semibold text-blue">One governed foundation, racks and cloud</span>
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
    <section id="architecture" className="relative scroll-mt-24 border-t border-lineSoft bg-white">
      {/* Act bridge: eases the cinematic teardown [02] into the document act */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-24 bg-gradient-to-b from-primary-bg to-white" aria-hidden />
      <div className="relative rail-container pt-12 pb-14 lg:pt-16 lg:pb-16">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-overcast">[03]</span>
            <span className="text-inkSoft">&nbsp;&nbsp;Where it runs</span>
          </p>
          <h2 className="mt-5 text-balance text-heading-sm font-semibold text-ink md:text-heading-md">
            Deploy where your data has to live.
          </h2>
          <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-secondary-text">
            Cloud, on-premises, or hybrid: Akashic is identical in all three. Same
            modules, same governance, same answers.
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
            <div className="mx-auto flex max-w-[980px] flex-col items-center justify-center gap-2.5 rounded-outer border border-blue-border bg-blue-subtle/40 px-6 py-4 text-center md:flex-row md:gap-4 md:py-3.5">
              <AkashicMark className="shrink-0" />
              <p className="text-[14.5px] leading-relaxed md:text-[15px]">
                <span className="font-semibold tracking-tight text-ink">
                  Your data stays where you need it.
                </span>{" "}
                <span className="text-inkSoft">
                  The platform on top of it never changes.
                </span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
