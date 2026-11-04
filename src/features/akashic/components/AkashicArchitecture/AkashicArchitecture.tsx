/*
 * [03] Where It Runs — deploy it your way. (Eyebrow renamed from "Your
 * architecture", Jul 2026: [04] owns the word "architecture" now.)
 * Sits directly after the [02] teardown (moved above the module stack,
 * July 2026) and is deliberately compact: header, three environment
 * plates, and the consistency close bar all fit one desktop viewport.
 * Each plate is drawn as the ground it represents: an open sky for
 * cloud (real AWS / Azure / Google marks, icons/CloudProviderLogos),
 * a server cabinet for on-premises, a bridged split estate for hybrid.
 * The same AkashicMark sits in all three (SIMULATED PRODUCT UI, see
 * AGENTS.md §8a). The cloud plate shows the three providers only, no
 * named regions (user direction, Jul 2026): the point is any-cloud /
 * any-region, and specific regions read as an India-only signal.
 */

import type { ReactNode } from "react";
import type { AkashicPage } from "@/content/pages/akashic";
import { AwsLogo, AzureLogo, GoogleGLogo } from "@/shared/components/icons";
import { ScrollReveal, SectionHeader } from "@/shared/components/ui";
import {
  AkashicMark,
  BlueChip,
  Capillary,
} from "../AkashicCardChrome";
import {
  FlowPath,
  MergeDown,
  MobileConn,
  Node,
} from "../AkashicFlowConnectors";
import styles from "./AkashicArchitecture.module.scss";

type Deployment = AkashicPage["deployment"];

function PlateHeader({
  name,
  desc,
  chip,
}: {
  name: string;
  desc: string;
  chip: ReactNode;
}) {
  return (
    <div className={styles.plateHeader}>
      <div className={styles.plateHeaderRow}>
        <h3 className={styles.plateTitle}>{name}</h3>
        {chip}
      </div>
      <p className={styles.plateDesc}>{desc}</p>
    </div>
  );
}

/* Animated drop lines fanning from the stack to its ground. */
function Fan({ targets }: { targets: number[] }) {
  return (
    <svg
      viewBox="0 0 300 34"
      className={styles.fanSvg}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      {targets.map((x) => (
        <FlowPath key={x} d={`M 150 0 C 150 18, ${x} 14, ${x} 34`} />
      ))}
      <Node x={150} y={0} />
      {targets.map((x) => (
        <Node key={`t${x}`} x={x} y={34} />
      ))}
    </svg>
  );
}

function RackUnit() {
  return (
    <div className={styles.rackUnit}>
      <span className={styles.rackDots} aria-hidden>
        <span className={styles.rackDot} />
        <span className={styles.rackDot} />
        <span className={styles.rackDot} />
      </span>
      <span className={styles.rackLed} aria-hidden />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  The three grounds                                                  */
/* ------------------------------------------------------------------ */

/* Provider marks, index-matched to content deployment.cloud.providers. */
const PROVIDER_LOGOS = [
  <AwsLogo key="aws" className="h-6 w-auto" />,
  <AzureLogo key="azure" className="h-6 w-6" />,
  <GoogleGLogo key="gcp" className="h-6 w-6" />,
];

function CloudPlate({ copy }: { copy: Deployment["cloud"] }) {
  const providers = copy.providers.map((name, k) => ({
    name,
    logo: PROVIDER_LOGOS[k],
  }));
  return (
    <div className={`${styles.plate} ${styles.plateCloud}`}>
      <Capillary />
      <PlateHeader
        name={copy.name}
        desc={copy.desc}
        chip={<BlueChip label={copy.chip} />}
      />
      <div className={styles.plateBody}>
        <AkashicMark className={styles.markCenter} />
        <Fan targets={[52, 150, 248]} />
        <div className={styles.providersGrid}>
          {providers.map((p) => (
            <div key={p.name} className={styles.providerCard}>
              <span className={styles.providerLogo}>{p.logo}</span>
              <span className={styles.providerName}>{p.name}</span>
            </div>
          ))}
        </div>
        <div className={styles.plateFooter}>
          <span className={styles.plateFooterDot} />
          <span className={styles.plateFooterText}>{copy.footer}</span>
        </div>
      </div>
    </div>
  );
}

function OnPremPlate({ copy }: { copy: Deployment["onPrem"] }) {
  return (
    <div className={`${styles.plate} ${styles.plateOnPrem}`}>
      <Capillary />
      <PlateHeader
        name={copy.name}
        desc={copy.desc}
        chip={<BlueChip label={copy.chip} />}
      />
      <div className={styles.plateBody}>
        <div className={styles.cabinet}>
          <div className={styles.cabinetHeader}>
            <span className={styles.cabinetTitle}>{copy.rack}</span>
            <svg
              width="9"
              height="9"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgb(var(--overcast))"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <rect x="4" y="10" width="16" height="11" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
          </div>
          <div className={styles.cabinetStack}>
            <RackUnit />
            <div className={styles.cabinetMarkWrap}>
              <AkashicMark className={styles.cabinetMark} />
            </div>
            <RackUnit />
            <RackUnit />
          </div>
        </div>
        <div className={styles.cabinetChips}>
          {copy.chips.map((item) => (
            <span key={item} className={styles.cabinetChip}>
              {item}
            </span>
          ))}
        </div>
        <div className={styles.plateFooter}>
          <span className={styles.plateFooterDot} />
          <span className={styles.plateFooterText}>{copy.footer}</span>
        </div>
      </div>
    </div>
  );
}

function HybridPlate({ copy }: { copy: Deployment["hybrid"] }) {
  return (
    <div className={`${styles.plate} ${styles.plateHybrid}`}>
      <Capillary />
      <PlateHeader
        name={copy.name}
        desc={copy.desc}
        chip={<BlueChip label={copy.chip} />}
      />
      <div className={styles.plateBody}>
        <AkashicMark className={styles.markCenter} />
        <Fan targets={[75, 225]} />
        <div className={styles.hybridGrid}>
          <div className={styles.hybridOnPremBox}>
            <div className={styles.cabinetStack}>
              <RackUnit />
              <RackUnit />
            </div>
            <div className={styles.hybridBoxLabel}>{copy.racks}</div>
          </div>
          <div className={styles.hybridCloudBox}>
            <div className={styles.hybridCloudLogos}>
              <AwsLogo className="h-4 w-auto" />
              <AzureLogo className="h-4 w-4" />
              <GoogleGLogo className="h-4 w-4" />
            </div>
            <div className={styles.hybridBoxLabel}>{copy.cloud}</div>
          </div>
        </div>
        <div className={styles.plateFooter}>
          <span className={styles.hybridAvatars}>
            <span className={styles.avatarUs}>{copy.us}</span>
            <span className={styles.avatarYou}>{copy.you}</span>
          </span>
          <span className={styles.plateFooterText}>{copy.footer}</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export interface AkashicArchitectureProps {
  content: Deployment;
}

export function AkashicArchitecture({ content }: AkashicArchitectureProps) {
  return (
    <section id="architecture" className={styles.section}>
      <div className={`rail-container ${styles.container}`}>
        <SectionHeader
          num={content.eyebrow.number}
          label={content.eyebrow.label}
          payoff={content.title}
          lede={content.intro}
        />

        <div className={styles.platesWrap}>
          <div className={styles.platesGrid}>
            <ScrollReveal>
              <CloudPlate copy={content.cloud} />
            </ScrollReveal>
            <ScrollReveal delay={90}>
              <OnPremPlate copy={content.onPrem} />
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <HybridPlate copy={content.hybrid} />
            </ScrollReveal>
          </div>

          <MergeDown />
          <MobileConn />

          <ScrollReveal delay={120}>
            <div className={styles.summaryBox}>
              <AkashicMark className={styles.summaryMark} />
              <p className={styles.summaryText}>
                <span className={styles.summarySetup}>
                  {content.summary.setup}
                </span>{" "}
                <span className={styles.summaryPayoff}>
                  {content.summary.payoff}
                </span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
