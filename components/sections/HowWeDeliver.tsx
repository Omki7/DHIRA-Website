/* Solid surfaces and crisp boundaries adapt to both appearances. */
import Link from "next/link";
import FigureEyebrow from "@/components/ui/FigureEyebrow";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionLink from "@/components/ui/SectionLink";
import TwoToneTitle from "@/components/ui/TwoToneTitle";
import type { HomeDelivery } from "@/content/pages/home";

export default function HowWeDeliver({ content: HOME_DELIVERY }: { content: HomeDelivery }) {
  return (
    <section id="delivery" aria-labelledby="delivery-heading" className="overflow-hidden delivery-band pt-12 pb-16 lg:pt-16 lg:pb-24">
      <ScrollRevealRail>
        <ScrollReveal>
          <FigureEyebrow num={HOME_DELIVERY.eyebrow.number} label={HOME_DELIVERY.eyebrow.label} />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="relative mt-10 overflow-hidden rounded-outer border border-card-line bg-anchor px-6 py-10 text-ink  sm:p-10 lg:mt-12 lg:p-16">
            
            

            <div className="relative z-10 max-w-[46rem]">
              <TwoToneTitle id="delivery-heading" tone="ink" setup={HOME_DELIVERY.title.setup} payoff={HOME_DELIVERY.title.payoff} />
              <p className="mt-6 max-w-[36em] text-pretty text-base leading-relaxed text-secondary-text sm:text-lg">{HOME_DELIVERY.description}</p>
              <SectionLink href={HOME_DELIVERY.cta.href}>
                {HOME_DELIVERY.cta.label}
              </SectionLink>
            </div>

            <div className="relative z-10 mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 lg:mt-12 lg:gap-6">
              {HOME_DELIVERY.services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group flex flex-col rounded-inner border border-card-line bg-background p-6 text-ink transition-colors duration-200 ease-settle hover:border-blue-border hover:bg-background focus-visible:bg-background lg:p-7"
                >
                  <div className="flex items-center justify-end text-overcast group-hover:text-blue group-focus-visible:text-blue">
                    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                      <path d="M4 10h12m-5-5 5 5-5 5" />
                    </svg>
                  </div>
                  <h3 className="mt-7 font-heading text-[24px] font-semibold leading-tight tracking-tight lg:text-[27px]">{service.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-secondary-text">
                    {service.description}
                  </p>
                  <div className="mt-auto pt-7">
                    <p className="border-t border-lineSoft pt-4 text-[12px] leading-relaxed text-inkSoft">
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
