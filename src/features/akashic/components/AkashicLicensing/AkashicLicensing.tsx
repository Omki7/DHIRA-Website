import Link from "next/link";
import type { AkashicLicensing as AkashicLicensingContent, IpPillar } from "@/content/pages/akashic";
import { ScrollReveal, SectionLink } from "@/shared/components/ui";
import { StoryLabel, StoryTitle } from "../AkashicStory";
import styles from "./AkashicLicensing.module.scss";

/*
 * [09] Licensing and IP: transparent capacity-based licensing across four
 * plans and three deployment footprints, paired with total customer ownership
 * of data, logic, schemas and fine-tuned models.
 *
 * Direct onward link to /pricing for full plan limits and terms.
 */

function IpGlyph({ icon }: { icon: IpPillar["icon"] }) {
  return (
    <span className={styles.ipGlyph} aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icon === "ownership" && (
          <>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <circle cx="12" cy="11" r="3" />
          </>
        )}
        {icon === "no-lockin" && (
          <>
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
          </>
        )}
        {icon === "perimeter" && (
          <>
            <rect x="3" y="3" width="18" height="18" rx="3" strokeDasharray="3 3" />
            <rect x="7" y="7" width="10" height="10" rx="2" />
            <circle cx="12" cy="12" r="1.5" />
          </>
        )}
        {icon === "audit" && (
          <>
            <circle cx="6" cy="6" r="3" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="18" r="3" />
            <path d="M6 9v6M9 6h6M18 9v6M9 18h6" />
          </>
        )}
      </svg>
    </span>
  );
}

export interface AkashicLicensingProps {
  content: AkashicLicensingContent;
}

export function AkashicLicensing({ content }: AkashicLicensingProps) {
  return (
    <section id="licensing" className={styles.section}>
      <div className={styles.wrap}>
        <ScrollReveal>
          <StoryLabel number={content.number}>{content.label}</StoryLabel>
          <div className={styles.titleWrap}>
            <StoryTitle setup={content.setup}>{content.title}</StoryTitle>
          </div>
          <p className={styles.intro}>{content.intro}</p>
          <div className={styles.sectionLinkWrap}>
            <SectionLink href={content.link.href}>{content.link.label}</SectionLink>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {/* Pillar 1: Capacity-Based Licensing Model */}
          <ScrollReveal delay={80}>
            <div className={styles.pillarCard}>
              <header className={styles.pillarHeader}>
                <span className={styles.pillarLabel}>{content.plansLabel}</span>
                <h3 className={styles.pillarHeading}>{content.plansHeading}</h3>
                <p className={styles.pillarLede}>{content.plansLede}</p>
              </header>

              <div className={styles.plansList}>
                {content.plans.map((plan) => (
                  <article
                    key={plan.id}
                    className={
                      plan.highlight
                        ? `${styles.planRow} ${styles.planRowEnterprise}`
                        : styles.planRow
                    }
                  >
                    <div className={styles.planTop}>
                      <div className={styles.planNameWrap}>
                        <h4 className={styles.planName}>{plan.name}</h4>
                        <span className={styles.planAudience}>{plan.audience}</span>
                      </div>
                      <span
                        className={
                          plan.highlight
                            ? `${styles.capacityTag} ${styles.capacityTagEnterprise}`
                            : styles.capacityTag
                        }
                      >
                        {plan.capacityTag}
                      </span>
                    </div>
                    <div className={styles.planMetrics}>
                      {plan.metrics.map((metric) => (
                        <div key={metric.label} className={styles.planMetric}>
                          <span className={styles.metricLabel}>{metric.label}</span>
                          <span className={styles.metricValue}>{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              <div className={styles.foundationWrap}>
                <p className={styles.foundationNote}>{content.foundationNote}</p>
                <div className={styles.foundationModules}>
                  {content.foundationModules.map((moduleName) => (
                    <span key={moduleName} className={styles.moduleChip}>
                      {moduleName}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.footprintsWrap}>
                <p className={styles.footprintsLabel}>{content.footprintsHeading}</p>
                <div className={styles.footprintsList}>
                  {content.footprints.map((footprint) => (
                    <div key={footprint.id} className={styles.footprintItem}>
                      <span className={styles.footprintDot} aria-hidden="true" />
                      <div>
                        <span className={styles.footprintName}>{footprint.name}</span>
                        {" · "}
                        <span>{footprint.line}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Pillar 2: Intellectual Property & Sovereignty Ledger */}
          <ScrollReveal delay={120}>
            <div className={styles.pillarCard}>
              <header className={styles.pillarHeader}>
                <span className={styles.pillarLabel}>{content.ipLabel}</span>
                <h3 className={styles.pillarHeading}>{content.ipHeading}</h3>
                <p className={styles.pillarLede}>{content.ipLede}</p>
              </header>

              <div className={styles.ipLedger}>
                {content.ipPillars.map((pillar) => (
                  <article key={pillar.title} className={styles.ipRow}>
                    <div className={styles.ipRowTop}>
                      <IpGlyph icon={pillar.icon} />
                      <div className={styles.ipTitleWrap}>
                        <h4 className={styles.ipTitle}>{pillar.title}</h4>
                        <span className={styles.ipTag}>{pillar.label}</span>
                      </div>
                    </div>
                    <p className={styles.ipDesc}>{pillar.desc}</p>
                    <div className={styles.ipEvidence}>
                      <span>{pillar.evidence}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Dedicated Pricing Bridge */}
        <ScrollReveal delay={160}>
          <div className={styles.pricingBridge}>
            <div className={styles.bridgeContent}>
              <span className={styles.bridgeLabel}>{content.pricingBridge.label}</span>
              <h4 className={styles.bridgeHeadline}>{content.pricingBridge.headline}</h4>
              <p className={styles.bridgeText}>{content.pricingBridge.text}</p>
            </div>
            <Link href={content.pricingBridge.cta.href} className={styles.bridgeCta}>
              <span>{content.pricingBridge.cta.label}</span>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true">
                <path
                  d="M4 10h12m-5-5 5 5-5 5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
