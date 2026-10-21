/*
 * [08] Close — Your requirement. Our responsibility.
 * Dark closure card per Rule 5 with locked supporting copy, dual CTAs,
 * and the closing accountability statement.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { DeliveryPage } from "@/content/pages/delivery";


export default function DeliveryClose({ content }: { content: DeliveryPage["close"] }) {
  const guarantees = content.guarantees;
  return (
    <section
      id="talk-to-our-team"
      className="relative scroll-mt-24 border-t border-lineSoft bg-background pt-16 pb-24 lg:pt-20 lg:pb-32"
    >
      <span id="login" className="absolute -top-24" aria-hidden />
      <ScrollRevealRail>
        <ScrollReveal>
          <div className=" relative mx-auto max-w-[1060px] overflow-hidden rounded-[24px] bg-anchor px-6 py-14 text-center text-ink  md:px-12 md:py-20">
            {/* Top blue accent hairline */}
            <div
              className="absolute inset-x-0 top-0 h-[3px] bg-blue"
              aria-hidden
            />
            {/* Ambient radial glow backdrop */}
            
            

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-line bg-tertiary-bg px-3.5 py-1 ">
                <span className="h-1.5 w-1.5 rounded-full bg-blue animate-[ps-pulse_2s_infinite]" />
                <span className="font-mono text-[10.5px] uppercase tracking-eyebrow text-secondary-text">
                  [{content.eyebrow.number}]&nbsp;&nbsp;{content.eyebrow.label}
                </span>
              </div>

              <h2 className="mx-auto mt-6 max-w-[16em] text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
                {content.title[0]}
                <br />
                {content.title[1]}
              </h2>

              <p className="mx-auto mt-5 max-w-[38em] text-base leading-relaxed text-secondary-text md:text-lg">
                {content.body}
              </p>

              {/* Guarantees row */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {guarantees.map((g) => (
                  <span
                    key={g}
                    className="flex items-center gap-1.5 rounded-full border border-line bg-tertiary-bg px-3 py-1 font-mono text-[11px] text-secondary-text"
                  >
                    <span className="h-1 w-1 rounded-full bg-positive" />
                    {g}
                  </span>
                ))}
              </div>

              {/* Dual CTAs */}
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Link href={content.primary.href} className="btn-primary">
                  {content.primary.label}
                </Link>
                <Link href={content.secondary.href} className="btn-secondary">
                  {content.secondary.label}
                </Link>
              </div>

              {/* Closing Accountability Statement */}
              <div className="mx-auto mt-14 max-w-[34em] border-t border-line pt-7">
                <p className="font-mono text-[10px] uppercase tracking-eyebrow text-inkSoft">
                  {content.standard.label}
                </p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-secondary-text">
                  {content.standard.line}
                </p>
                <p className="mt-1 text-[15.5px] font-semibold text-ink">
                  {content.standard.promise}
                </p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-eyebrow text-blue">
                  {content.standard.signature}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
