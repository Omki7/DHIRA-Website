/*
 * /trust, the Trust Center, [01] to [07]. Controls are grouped into four
 * named domains (a taxonomy, not a list); privacy commitments and the AI
 * principles are numbered registers; documents and subprocessors are
 * tables a reviewer can scan. The page's one soft blue band (Rule 5a) is
 * [03] Responsible AI, the part of the page that is DHIRA's argument.
 * Copy: content/pages/trust.ts (parts DRAFT), passed in by app/trust/page.tsx.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import type { TrustPage, TrustPoint } from "@/content/pages/trust";

const pad = (n: number) => String(n).padStart(2, "0");
const label = "font-mono text-[11px] uppercase tracking-eyebrow text-overcast";
const section = "scroll-mt-24 border-t border-lineSoft bg-background pb-20 pt-16 lg:pb-28 lg:pt-20";

export function TrustSecurity({ content: c }: { content: TrustPage["security"] }) {
  return (
    <section id="security" className="scroll-mt-24 bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
      <ScrollRevealRail>
        <SectionHeader num={c.num} label={c.label} setup={c.setup} payoff={c.payoff} lede={c.lede} />
        <div className="mt-12 grid border-t border-ink/80 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {c.domains.map((domain, index) => (
            <ScrollReveal
              key={domain.name}
              delay={index * 60}
              className={`border-b border-lineSoft py-8 sm:pr-6 lg:border-b-0 ${["", "sm:border-l sm:pl-6", "lg:border-l lg:pl-6", "sm:border-l sm:pl-6"][index]}`}
            >
              <p className={label}>[{pad(index + 1)}]</p>
              <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.02em] text-ink">{domain.name}</h3>
              <ul className="mt-5 space-y-3 border-t border-dashed border-lineSoft pt-5">
                {domain.items.map((item) => (
                  <li key={item} className="grid grid-cols-[16px_1fr] gap-2 text-[14.5px] leading-snug text-ink">
                    <span aria-hidden className="mt-[0.5em] h-[5px] w-[5px] rounded-[1px] bg-blue" />
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </ScrollRevealRail>
    </section>
  );
}

function NumberedRegister({ items, columns = 2 }: { items: TrustPoint[]; columns?: 2 | 3 }) {
  return (
    <ol className={`mt-12 grid border-t border-lineSoft lg:mt-16 lg:gap-x-16 ${columns === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "lg:grid-cols-2"}`}>
      {items.map((item, index) => (
        <li key={item.title} className="grid grid-cols-[44px_1fr] gap-4 border-b border-lineSoft py-6">
          <span className="pt-[5px] font-mono text-[11px] tracking-eyebrow text-overcast">{pad(index + 1)}</span>
          <span>
            <span className="block text-[18px] font-semibold leading-snug tracking-[-0.01em] text-ink">{item.title}</span>
            <span className="mt-1.5 block text-pretty text-[15px] leading-relaxed text-secondary-text">{item.text}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

export function TrustPrivacy({ content: c }: { content: TrustPage["privacy"] }) {
  return (
    <section id="privacy" className={section}>
      <ScrollRevealRail>
        <SectionHeader num={c.num} label={c.label} setup={c.setup} payoff={c.payoff}>
          <Link
            href={c.policy.href}
            className="group mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-blue transition-colors duration-150 hover:text-blue-hover"
          >
            {c.policy.label}
            <span aria-hidden className="transition-transform duration-250 ease-settle group-hover:translate-x-0.5">
              &rarr;
            </span>
          </Link>
        </SectionHeader>
        <ScrollReveal delay={80}>
          <NumberedRegister items={c.commitments} />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}

export function TrustResponsibleAi({ content: c }: { content: TrustPage["responsibleAi"] }) {
  return (
    <section
      id="responsible-ai"
      className="scroll-mt-24 bg-band pb-20 pt-16 lg:pb-28 lg:pt-20"
    >
      <ScrollRevealRail>
        <SectionHeader num={c.num} label={c.label} setup={c.setup} payoff={c.payoff} lede={c.lede} />
        <ScrollReveal delay={80}>
          <NumberedRegister items={c.principles} columns={3} />
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <div className="mt-10 border-t border-dashed border-lineSoft pt-5">
            <p className={label}>{c.frameworksLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
              {c.frameworks.map((framework) => (
                <li key={framework} className="text-[15px] text-ink">
                  {framework}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}

export function TrustCompliance({ content: c }: { content: TrustPage["compliance"] }) {
  return (
    <section id="compliance" className={section}>
      <ScrollRevealRail>
        <SectionHeader num={c.num} label={c.label} setup={c.setup} payoff={c.payoff} />
        <ScrollReveal delay={80}>
          <ul className="mt-12 grid border-t border-ink/80 sm:grid-cols-3 lg:mt-16 lg:grid-cols-5">
            {c.frameworks.map((framework, index) => (
              <li key={framework.name} className={`border-b border-lineSoft py-7 pr-6 lg:border-b-0 ${index > 0 ? "lg:border-l lg:pl-6" : ""}`}>
                <p className="text-[20px] font-semibold tracking-[-0.01em] text-ink">{framework.name}</p>
                <p className="mt-1.5 text-[14px] text-secondary-text">{framework.scope}</p>
                <a href={c.evidence.href} className="mt-4 inline-block font-mono text-[11px] uppercase tracking-eyebrow text-blue hover:text-blue-hover">
                  {c.evidence.label}
                </a>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}

export function TrustDocuments({ content: c }: { content: TrustPage["documents"] }) {
  return (
    <section id="documents" className={section}>
      <ScrollRevealRail>
        <SectionHeader num={c.num} label={c.label} setup={c.setup} payoff={c.payoff} lede={c.lede} />
        <ScrollReveal delay={80}>
          <ul className="mt-12 grid border-t border-lineSoft lg:mt-16 lg:grid-cols-2 lg:gap-x-16">
            {c.items.map((item) => (
              <li key={item.name} className="flex items-baseline justify-between gap-6 border-b border-lineSoft py-5">
                <span>
                  <span className="block text-[17px] font-semibold tracking-[-0.01em] text-ink">
                    {item.name}
                    {item.nda && (
                      <span className="ml-2 align-[2px] font-mono text-[10px] uppercase tracking-eyebrow text-overcast">{c.ndaLabel}</span>
                    )}
                  </span>
                  <span className="mt-1 block text-[14px] text-secondary-text">{item.note}</span>
                </span>
                <a
                  href={item.href}
                  className="shrink-0 text-[14px] font-medium text-blue transition-colors duration-150 hover:text-blue-hover"
                >
                  {c.requestLabel}
                </a>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}

export function TrustSubprocessors({ content: c }: { content: TrustPage["subprocessors"] }) {
  return (
    <section id="subprocessors" className={section}>
      <ScrollRevealRail>
        <SectionHeader num={c.num} label={c.label} setup={c.setup} payoff={c.payoff} lede={c.lede} />
        <ScrollReveal delay={80}>
          <div className="mt-12 overflow-x-auto lg:mt-16">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-ink/80">
                  {[c.columns.name, c.columns.purpose, c.columns.scope].map((heading) => (
                    <th key={heading} scope="col" className={`py-3 pr-6 font-normal ${label}`}>
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.rows.map((row) => (
                  <tr key={row.name} className="border-b border-lineSoft align-top">
                    <th scope="row" className="py-4 pr-6 text-[16px] font-semibold text-ink">
                      {row.name}
                    </th>
                    <td className="py-4 pr-6 text-[15px] leading-relaxed text-secondary-text">{row.purpose}</td>
                    <td className="py-4 text-[15px] text-ink">{row.scope}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}

export function TrustDisclosure({ content: c }: { content: TrustPage["disclosure"] }) {
  return (
    <section id="disclosure" className={section}>
      <ScrollRevealRail>
        <SectionHeader num={c.num} label={c.label} setup={c.setup} payoff={c.payoff}>
          <a href={c.cta.href} className="btn-primary btn-lg mt-8">
            {c.cta.label}
          </a>
        </SectionHeader>
        <ScrollReveal delay={80}>
          <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12">
            <ol className="border-y border-dashed border-lineSoft lg:col-span-7">
              {c.steps.map((step, index) => (
                <li key={step} className="grid grid-cols-[36px_1fr] gap-4 border-b border-dashed border-lineSoft py-4 last:border-b-0">
                  <span className="pt-[3px] font-mono text-[11px] tracking-eyebrow text-overcast">{pad(index + 1)}</span>
                  <span className="text-pretty text-[15px] leading-relaxed text-ink">{step}</span>
                </li>
              ))}
            </ol>
            <div className="lg:col-span-5">
              <p className={label}>{c.harbourLabel}</p>
              <p className="mt-3 text-pretty text-[15px] leading-relaxed text-secondary-text">{c.harbour}</p>
              <p className="mt-5 text-[14px] text-secondary-text">
                {c.machineReadable.lead}{" "}
                <a href={c.machineReadable.link.href} className="text-blue underline decoration-blue/30 underline-offset-[3px] hover:decoration-blue">
                  {c.machineReadable.link.label}
                </a>
              </p>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
