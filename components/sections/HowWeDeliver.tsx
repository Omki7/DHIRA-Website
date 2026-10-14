import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { HOME_DELIVERY } from "@/lib/homeSections";

export default function HowWeDeliver() {
  return (
    <section
      id="delivery"
      aria-labelledby="delivery-heading"
      className="overflow-hidden delivery-band pt-10 pb-12 lg:pt-14 lg:pb-16"
    >
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="flex items-center border-y border-dashed border-lineSoft px-[2px] py-[17px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span>
              <span className="text-overcast">[04]</span>
              &nbsp;&nbsp;{HOME_DELIVERY.eyebrow}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="relative mt-8 overflow-hidden rounded-outer border border-white/10 bg-vault px-6 py-10 text-white shadow-deep sm:p-10 lg:mt-10 lg:p-16">
            <div aria-hidden="true" className="dot-grid-dark pointer-events-none absolute inset-0 opacity-20" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/4 top-0 h-[350px] w-[350px] rounded-full opacity-10 blur-[80px]"
              style={{ background: "radial-gradient(circle, #3E63DD, transparent 75%)" }}
            />

            <div className="relative z-10 flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-end lg:gap-10">
              <div>
                <h2 id="delivery-heading" className="font-heading text-[34px] font-semibold leading-[1.08] tracking-tighter sm:text-[44px] lg:text-[54px]">
                  <span className="block text-white/60">{HOME_DELIVERY.title[0]}</span>
                  <span className="block text-white">{HOME_DELIVERY.title[1]}</span>
                </h2>
                <p className="mt-5 max-w-[36em] text-[15px] leading-relaxed text-white/75 sm:text-[17px]">
                  {HOME_DELIVERY.description.map((line) => <span key={line} className="block">{line}</span>)}
                </p>
              </div>
              <Link href="/delivery" className="btn-primary-invert btn-lg shrink-0 gap-2.5">
                {HOME_DELIVERY.cta}
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="relative z-10 mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 lg:mt-12 lg:gap-6">
              {HOME_DELIVERY.services.map((service) => (
                <Link
                  key={service.number}
                  href={service.href}
                  className="group flex flex-col rounded-inner border border-white/15 bg-white/[0.025] p-6 text-white transition-colors duration-300 ease-settle hover:bg-background hover:text-ink focus-visible:bg-background focus-visible:text-ink lg:p-7"
                >
                  <div className="flex items-center justify-between font-mono text-[11px] tracking-eyebrow text-white/60 group-hover:text-inkSoft group-focus-visible:text-inkSoft">
                    <span>{service.number}</span>
                    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                      <path d="M4 10h12m-5-5 5 5-5 5" />
                    </svg>
                  </div>
                  <h3 className="mt-7 font-heading text-[24px] font-semibold leading-tight tracking-tight lg:text-[27px]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/75 group-hover:text-secondary-text group-focus-visible:text-secondary-text">
                    {service.description}
                  </p>
                  <div className="mt-auto pt-7">
                    <p className="border-t border-white/15 pt-4 text-[12px] leading-relaxed text-white/65 group-hover:border-lineSoft group-hover:text-secondary-text group-focus-visible:border-lineSoft group-focus-visible:text-secondary-text">
                      {service.scope}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
