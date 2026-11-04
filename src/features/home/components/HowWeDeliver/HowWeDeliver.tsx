/* Homepage [04]: the problems only the reader has. The header sits on the
   page ground like every other section; the three service lines stand on
   one route from the reader's problem to daily use (ServiceRoute), on the
   approved pastel panel. */
import type { HomeDelivery } from "@/content/pages/home";
import { ScrollReveal, ScrollRevealRail, SectionHeader, SectionLink } from "@/shared/components/ui";
import { cx } from "@/shared/utils/cx";
import { ServiceRoute } from "./ServiceRoute";
import styles from "./HowWeDeliver.module.scss";

export interface HowWeDeliverProps {
  content: HomeDelivery;
}

export function HowWeDeliver({ content }: HowWeDeliverProps) {
  return (
    <section id="services" aria-labelledby="delivery-heading" className={cx(styles.section, "delivery-band")}>
      {/* The section was #delivery until 26 Oct 2026; old links still land here. */}
      <span id="delivery" aria-hidden="true" className={styles.alias} />
      <ScrollRevealRail>
        <SectionHeader
          num={content.eyebrow.number}
          label={content.eyebrow.label}
          setup={content.title.setup}
          payoff={content.title.payoff}
          lede={content.description}
          titleId="delivery-heading"
        >
          <SectionLink href={content.cta.href}>{content.cta.label}</SectionLink>
        </SectionHeader>

        <ScrollReveal delay={140} className={styles.route}>
          <ServiceRoute route={content.route} services={content.services} />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
