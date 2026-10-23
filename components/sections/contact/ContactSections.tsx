/*
 * /contact: the sales form inline (the same form the modal opens), every
 * other enquiry as a register row with its own route, and the offices.
 * The page's one soft blue band (Rule 5a) is the form. Copy:
 * content/pages/contact.ts; offices and inbox: site settings.
 */

import Link from "next/link";
import ContactForm from "@/components/layout/ContactForm";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import type { ContactPage } from "@/content/pages/contact";
import type { Office } from "@/content/site";

const pad = (n: number) => String(n).padStart(2, "0");
const label = "font-mono text-[11px] uppercase tracking-eyebrow text-overcast";

export function ContactWriteToUs({ content: c }: { content: ContactPage["writeToUs"] }) {
  return (
    <section
      id="write-to-us"
      className="scroll-mt-24 bg-band pb-20 pt-16 lg:pb-28 lg:pt-20"
    >
      <ScrollRevealRail>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader num={c.num} label={c.label} setup={c.setup} payoff={c.payoff} lede={c.lede} />
            <ScrollReveal delay={160}>
              <ol className="mt-10 border-y border-dashed border-lineSoft">
                {c.steps.map((step, index) => (
                  <li key={step} className="grid grid-cols-[36px_1fr] gap-4 border-b border-dashed border-lineSoft py-4 last:border-b-0">
                    <span className="pt-[3px] font-mono text-[11px] tracking-eyebrow text-overcast">{pad(index + 1)}</span>
                    <span className="text-pretty text-[15px] leading-relaxed text-ink">{step}</span>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={120} className="lg:col-span-7">
            <div className="rounded-frame border border-subtle-stroke bg-background p-6  sm:p-8">
              <ContactForm idPrefix="contact" />
            </div>
          </ScrollReveal>
        </div>
      </ScrollRevealRail>
    </section>
  );
}

export function ContactRoutes({ content: c }: { content: ContactPage["routes"] }) {
  return (
    <section id="routes" className="scroll-mt-24 bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
      <ScrollRevealRail>
        <SectionHeader num={c.num} label={c.label} setup={c.setup} payoff={c.payoff} />
        <ScrollReveal delay={80}>
          <ul className="mt-12 border-t border-lineSoft lg:mt-16">
            {c.items.map((route, index) => (
              <li key={route.name} className="grid gap-2 border-b border-lineSoft py-6 lg:grid-cols-[56px_minmax(0,14rem)_1fr_auto] lg:items-baseline lg:gap-8">
                <span className="font-mono text-[11px] tracking-eyebrow text-overcast">{pad(index + 1)}</span>
                <span className="text-[18px] font-semibold tracking-[-0.01em] text-ink">{route.name}</span>
                <span className="text-pretty text-[15px] leading-relaxed text-secondary-text">{route.line}</span>
                <Link
                  href={route.cta.href}
                  className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-blue transition-colors duration-150 hover:text-blue-hover"
                >
                  {route.cta.label}
                  <span aria-hidden className="transition-transform duration-200 ease-settle group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}

export function ContactOffices({ content: c, offices, email }: { content: ContactPage["offices"]; offices: Office[]; email: string }) {
  return (
    <section id="offices" className="scroll-mt-24 border-t border-lineSoft bg-background pb-24 pt-16 lg:pb-32 lg:pt-20">
      <ScrollRevealRail>
        <SectionHeader num={c.num} label={c.label} setup={c.setup} payoff={c.payoff} />
        <ScrollReveal delay={80}>
          <ul className="mt-12 grid border-t border-ink/80 sm:grid-cols-3 lg:mt-16">
            {offices.map((office, index) => (
              <li key={office.city} className={`border-b border-lineSoft py-8 sm:border-b-0 sm:pr-6 ${index > 0 ? "sm:border-l sm:pl-6" : ""}`}>
                <p className={label}>
                  [{pad(index + 1)}]&nbsp;&nbsp;{office.region}
                </p>
                <p className="mt-4 text-[30px] font-semibold leading-none tracking-[-0.03em] text-ink">{office.city}</p>
                <p className="mt-3 text-[15px] text-secondary-text">
                  {office.country}&nbsp;&nbsp;·&nbsp;&nbsp;{office.zone}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-10 border-t border-dashed border-lineSoft pt-5 text-[15px] text-secondary-text">
            {c.general.label}{" "}
            <a href={c.general.href} className="font-medium text-blue underline decoration-blue/30 underline-offset-[3px] hover:decoration-blue">
              {email}
            </a>
          </p>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
