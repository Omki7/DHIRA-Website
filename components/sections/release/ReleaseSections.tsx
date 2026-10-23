/*
 * /akashic/1-0: what ships, what stays in preview, where it runs. Text-led
 * like the other hubs; the page's one soft blue band (Rule 5a) is [03].
 * Copy: content/pages/akashic-release.ts.
 */

import Link from "next/link";
import AkashicModuleMomentsMockup from "@/components/demos/mockups/AkashicModuleMomentsMockup";
import PreviewTag from "@/components/ui/PreviewTag";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import type { AkashicReleasePage } from "@/content/pages/akashic-release";

const pad = (n: number) => String(n).padStart(2, "0");
const label = "font-mono text-[11px] uppercase tracking-eyebrow text-overcast";

export function ReleaseAvailable({ content: c }: { content: AkashicReleasePage["available"] }) {
  return (
    <section id="generally-available" className="scroll-mt-24 bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
      <ScrollRevealRail>
        <SectionHeader num={c.num} label={c.label} setup={c.setup} payoff={c.payoff} lede={c.lede} />
        {/* The seven generally available modules, each shown at work, above
            the register that lists them (moved here 20 Oct 2026). */}
        <ScrollReveal delay={80} className="mt-12 lg:mt-14">
          <AkashicModuleMomentsMockup />
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <ol className="mt-12 border-t border-lineSoft lg:mt-16">
            {c.modules.map((module, index) => (
              <li key={module.name} className="grid gap-3 border-b border-lineSoft py-7 lg:grid-cols-12 lg:items-baseline lg:gap-10">
                <span className={`${label} lg:col-span-1`}>{pad(index + 1)}</span>
                <span className="lg:col-span-4">
                  <Link href={module.href} className="text-[20px] font-semibold tracking-[-0.01em] text-ink transition-colors duration-150 hover:text-blue">
                    {module.name}
                  </Link>
                  <span className="mt-1 block text-[15px] text-secondary-text">{module.sub}</span>
                </span>
                <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:col-span-7">
                  {module.caps.map((cap) => (
                    <li key={cap} className="grid grid-cols-[14px_1fr] gap-1.5 text-[14.5px] text-ink">
                      <span aria-hidden className="mt-[0.5em] h-[5px] w-[5px] rounded-[1px] bg-blue" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}

export function ReleasePreview({ content: c }: { content: AkashicReleasePage["preview"] }) {
  return (
    <section id="in-preview" className="scroll-mt-24 border-t border-lineSoft bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
      <ScrollRevealRail>
        <SectionHeader num={c.num} label={c.label} setup={c.setup} payoff={c.payoff} lede={c.lede} />
        <ScrollReveal delay={80}>
          <ul className="mt-12 grid border-t border-ink/80 sm:grid-cols-2 lg:mt-16">
            {c.agents.map((agent, index) => (
              <li key={agent.name} className={`border-b border-lineSoft py-8 sm:pr-6 ${index > 0 ? "sm:border-l sm:pl-6" : ""}`}>
                <p className="flex items-center gap-2 text-[22px] font-semibold tracking-[-0.02em] text-ink">
                  {agent.name}
                  <PreviewTag />
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-secondary-text">{agent.line}</p>
              </li>
            ))}
          </ul>
          <Link
            href={c.link.href}
            className="group mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-blue transition-colors duration-150 hover:text-blue-hover"
          >
            {c.link.label}
            <span aria-hidden className="transition-transform duration-200 ease-settle group-hover:translate-x-0.5">
              &rarr;
            </span>
          </Link>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}

export function ReleaseDeployments({ content: c }: { content: AkashicReleasePage["deployments"] }) {
  return (
    <section
      id="where-it-runs"
      className="scroll-mt-24 bg-band pb-20 pt-16 lg:pb-28 lg:pt-20"
    >
      <ScrollRevealRail>
        <SectionHeader num={c.num} label={c.label} setup={c.setup} payoff={c.payoff} lede={c.lede} />
        <ScrollReveal delay={80}>
          <ul className="mt-12 grid border-t border-ink/80 lg:mt-16 lg:grid-cols-3">
            {c.options.map((option, index) => (
              <li key={option.name} className={`border-b border-lineSoft py-8 lg:border-b-0 lg:pr-8 ${index > 0 ? "lg:border-l lg:pl-8" : ""}`}>
                <p className={label}>[{pad(index + 1)}]</p>
                <p className="mt-3 text-[22px] font-semibold tracking-[-0.02em] text-ink">{option.name}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-secondary-text">{option.line}</p>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
