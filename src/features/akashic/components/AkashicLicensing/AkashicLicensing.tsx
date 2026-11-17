import type { AkashicLicensing as AkashicLicensingContent } from "@/content/pages/akashic";
import { ScrollReveal, SectionLink } from "@/shared/components/ui";
import { StoryLabel, StoryTitle } from "../AkashicStory";
import styles from "./AkashicLicensing.module.scss";

/*
 * [03] / Licensing: the claim (capacity licensing, your IP stays yours), its
 * lede and the one onward link to /pricing. Nothing else (17 Nov 2026, user):
 * the two tall tables, plan limits and the IP ledger, came out with the
 * pricing banner under them; plan limits and terms live on /pricing.
 */

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
      </div>
    </section>
  );
}
