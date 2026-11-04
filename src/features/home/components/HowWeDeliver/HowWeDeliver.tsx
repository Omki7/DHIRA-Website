/* Solid surfaces and crisp boundaries adapt to both appearances. */
import Link from "next/link";
import type { HomeDelivery } from "@/content/pages/home";
import { FigureEyebrow, ScrollReveal, ScrollRevealRail, SectionLink, TwoToneTitle } from "@/shared/components/ui";
import { cx } from "@/shared/utils/cx";
import styles from "./HowWeDeliver.module.scss";

export interface HowWeDeliverProps {
  content: HomeDelivery;
}

export function HowWeDeliver({ content: HOME_DELIVERY }: HowWeDeliverProps) {
  return (
    <section id="services" aria-labelledby="delivery-heading" className={cx(styles.section, "delivery-band")}>
      {/* The section was #delivery until 26 Oct 2026; old links still land here. */}
      <span id="delivery" aria-hidden="true" className={styles.alias} />
      <ScrollRevealRail>
        <ScrollReveal>
          <FigureEyebrow num={HOME_DELIVERY.eyebrow.number} label={HOME_DELIVERY.eyebrow.label} />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className={styles.card}>



            <div className={styles.intro}>
              <TwoToneTitle id="delivery-heading" tone="ink" setup={HOME_DELIVERY.title.setup} payoff={HOME_DELIVERY.title.payoff} />
              <p className={styles.lede}>{HOME_DELIVERY.description}</p>
              <SectionLink href={HOME_DELIVERY.cta.href}>
                {HOME_DELIVERY.cta.label}
              </SectionLink>
            </div>

            <div className={styles.services}>
              {HOME_DELIVERY.services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className={styles.service}
                >
                  <div className={styles.arrowRow}>
                    <svg viewBox="0 0 20 20" className={styles.arrow} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                      <path d="M4 10h12m-5-5 5 5-5 5" />
                    </svg>
                  </div>
                  <h3 className={styles.title}>{service.title}</h3>
                  <p className={styles.description}>
                    {service.description}
                  </p>
                  <div className={styles.foot}>
                    <p className={styles.scope}>
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
