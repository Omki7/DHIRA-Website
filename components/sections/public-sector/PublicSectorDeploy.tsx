/*
 * [06] Deployment, Your Way — Cloud, On-Premises, Hybrid.
 * One guarantee panel: narrative, three environment tiles with sketch icons
 * (on-prem marked as the sovereign default), and a read-only footer strip.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";

const environments = [
  {
    icon: "Cloud Deployment",
    name: "Cloud",
    desc: "AWS, Azure, or GCP: deploy on infrastructure your department already has clearance for.",
    chip: null,
  },
  {
    icon: "On-Premises",
    name: "On-premises",
    desc: "Full data sovereignty. The standard choice for citizen registries and sensitive beneficiary data.",
    chip: "SOVEREIGN DEFAULT",
  },
  {
    icon: "Hybrid Deployment",
    name: "Hybrid",
    desc: "Sensitive data stays on-premises. Less sensitive workloads scale on the cloud. Best of both.",
    chip: null,
  },
];

export default function PublicSectorDeploy() {
  return (
    <section id="deployment" className="scroll-mt-24 border-t border-lineSoft bg-background pt-12 pb-24 lg:pt-16 lg:pb-32">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[06]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Deployment, your way</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Your infrastructure, our engineering</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Cloud. On-premises. Hybrid.
          </h2>
          <p className="mt-5 max-w-[40em] text-lg leading-relaxed text-secondary-text">
            Akashic does not require you to abandon your existing systems. It
            connects to them, in read-only mode, and builds the intelligence layer
            on top: deployed exactly where your data governance policy requires.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="mt-12 overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg lg:mt-14">
            <div className="h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent" aria-hidden />
            <div className="grid grid-cols-1 md:grid-cols-3">
              {environments.map((env, idx) => (
                <div
                  key={env.name}
                  className={`flex flex-col p-6 md:p-7 ${
                    idx > 0 ? "border-t border-dashed border-lineSoft md:border-l md:border-t-0" : ""
                  } ${env.chip ? "bg-white" : ""}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] border border-blue/20 bg-gradient-to-br from-[#E4EAFF] to-[#D4DEFF] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                      <DynamicSketchIcon text={env.icon} className="h-[16px] w-[16px] text-blue" />
                    </span>
                    {env.chip && (
                      <span className="inline-flex items-center rounded-[7px] border border-blue-border bg-blue-subtle px-2 py-1 font-mono text-[8.5px] font-bold tracking-[0.04em] text-blue">
                        {env.chip}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-[20px] font-semibold tracking-tight text-ink">{env.name}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-inkSoft">{env.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-lineSoft px-6 py-3.5 font-mono text-[9px] uppercase tracking-[0.08em]">
              <span className="flex items-center gap-1.5 text-inkSoft">
                <span className="h-[5px] w-[5px] rounded-full bg-positive animate-[ps-pulse_2s_infinite]" aria-hidden />
                Read-only connection &middot; no migration &middot; no downtime
              </span>
              <span className="text-overcast">Where your governance policy requires</span>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
