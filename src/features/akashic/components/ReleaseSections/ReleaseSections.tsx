/*
 * /akashic/1-0: what ships, what stays in preview, where it runs. Text-led
 * like the other hubs; the page's one soft blue band (Rule 5a) is [03].
 * Copy: content/pages/akashic-release.ts.
 */

import Link from "next/link";
import type { AkashicReleasePage } from "@/content/pages/akashic-release";
import {
  PreviewTag,
  ScrollReveal,
  ScrollRevealRail,
  SectionHeader,
} from "@/shared/components/ui";
import { AkashicModuleMomentsMockup } from "../../mockups/AkashicModuleMomentsMockup";
import styles from "./ReleaseSections.module.scss";

const pad = (n: number) => String(n).padStart(2, "0");

export interface ReleaseAvailableProps {
  content: AkashicReleasePage["available"];
}

export function ReleaseAvailable({ content: c }: ReleaseAvailableProps) {
  return (
    <section id="generally-available" className={styles.sectionAvailable}>
      <ScrollRevealRail>
        <SectionHeader
          num={c.num}
          label={c.label}
          setup={c.setup}
          payoff={c.payoff}
          lede={c.lede}
        />
        {/* The seven generally available modules, each shown at work, above
            the register that lists them (moved here 20 Oct 2026). */}
        <ScrollReveal delay={80} className={styles.mockupWrap}>
          <AkashicModuleMomentsMockup />
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <ol className={styles.modulesList}>
            {c.modules.map((module, index) => (
              <li key={module.name} className={styles.moduleItem}>
                <span className={`${styles.label} ${styles.moduleIndex}`}>
                  {pad(index + 1)}
                </span>
                <span className={styles.moduleDetails}>
                  <Link href={module.href} className={styles.moduleLink}>
                    {module.name}
                  </Link>
                  <span className={styles.moduleSub}>{module.sub}</span>
                </span>
                <ul className={styles.capsList}>
                  {module.caps.map((cap) => (
                    <li key={cap} className={styles.capItem}>
                      <span aria-hidden className={styles.capDot} />
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

export interface ReleasePreviewProps {
  content: AkashicReleasePage["preview"];
}

export function ReleasePreview({ content: c }: ReleasePreviewProps) {
  return (
    <section id="in-preview" className={styles.sectionPreview}>
      <ScrollRevealRail>
        <SectionHeader
          num={c.num}
          label={c.label}
          setup={c.setup}
          payoff={c.payoff}
          lede={c.lede}
        />
        <ScrollReveal delay={80}>
          <ul className={styles.agentsList}>
            {c.agents.map((agent, index) => (
              <li
                key={agent.name}
                className={`${styles.agentItem} ${
                  index > 0 ? styles.agentItemBordered : ""
                }`}
              >
                <p className={styles.agentName}>
                  {agent.name}
                  <PreviewTag />
                </p>
                <p className={styles.agentLine}>{agent.line}</p>
              </li>
            ))}
          </ul>
          <Link href={c.link.href} className={styles.moreLink}>
            {c.link.label}
            <span aria-hidden className={styles.arrow}>
              &rarr;
            </span>
          </Link>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}

export interface ReleaseDeploymentsProps {
  content: AkashicReleasePage["deployments"];
}

export function ReleaseDeployments({ content: c }: ReleaseDeploymentsProps) {
  return (
    <section id="where-it-runs" className={styles.sectionDeployments}>
      <ScrollRevealRail>
        <SectionHeader
          num={c.num}
          label={c.label}
          setup={c.setup}
          payoff={c.payoff}
          lede={c.lede}
        />
        <ScrollReveal delay={80}>
          <ul className={styles.deploymentsList}>
            {c.options.map((option, index) => (
              <li
                key={option.name}
                className={`${styles.deploymentItem} ${
                  index > 0 ? styles.deploymentItemBordered : ""
                }`}
              >
                <p className={styles.label}>[{pad(index + 1)}]</p>
                <p className={styles.deploymentName}>{option.name}</p>
                <p className={styles.deploymentLine}>{option.line}</p>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
