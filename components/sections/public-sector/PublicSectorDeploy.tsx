/*
 * [06] Deployment, Your Way — Cloud, On-Premises, Hybrid.
 * One guarantee panel: narrative, three environment tiles with sketch icons
 * (on-prem marked as the sovereign default), and a read-only footer strip.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";
import type { PublicSectorPage } from "@/content/pages/sectors-public-sector";


export default function PublicSectorDeploy({ content }: { content: PublicSectorPage["deploy"] }) {
  const { environments } = content;
  return (
    <section id="deployment" className="scroll-mt-24 border-t border-lineSoft bg-background pt-12 pb-24 lg:pt-16 lg:pb-32">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[{content.eyebrow.number}]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;{content.eyebrow.label}</span>
            </p>
            <span className="hidden text-overcast sm:inline">{content.eyebrow.aside}</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            {content.title}
          </h2>
          <p className="mt-5 max-w-[40em] text-lg leading-relaxed text-secondary-text">
            {content.lede}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="mt-12 overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg lg:mt-14">
            <div className="h-[3px] bg-blue" aria-hidden />
            <div className="grid grid-cols-1 md:grid-cols-3">
              {environments.map((env, idx) => (
                <div
                  key={env.name}
                  className={`flex flex-col p-6 md:p-7 ${
                    idx > 0 ? "border-t border-dashed border-lineSoft md:border-l md:border-t-0" : ""
                  } ${env.chip ? "bg-background" : ""}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] border border-blue/20 bg-blue-subtle ">
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
                {content.footerLeft}
              </span>
              <span className="text-overcast">{content.footerRight}</span>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
