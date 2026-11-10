import AboutSection from "@/components/sections/about/AboutSection";
import type { AboutPage } from "@/content/pages/about";
import { RegionOnly, SectionLink } from "@/shared/components/ui";
import { DhiraDotMatrix } from "./DhiraDotMatrix";
import styles from "./AboutCulture.module.scss";

export interface AboutCultureProps {
  content: AboutPage["culture"];
}

/* Attio's centred, compact composition for [05], refined to showcase
   DHIRA spelled in an interactive, generative dot matrix.
   The page's numbered rail and India-only careers link frame the field. */
export function AboutCulture({ content }: AboutCultureProps) {
  return (
    <AboutSection id="culture" eyebrow={{ number: content.number, label: content.label }}>
      <span id="careers" aria-hidden="true" className={styles.alias} />
      <span id="join-us" aria-hidden="true" className={styles.alias} />
      <div className={styles.story}>
        <header className={styles.storyHeader}>
          <h2>{content.title}</h2>{" "}
          <p>{content.intro}</p>
        </header>
        <RegionOnly region={content.link.audience}>
          <SectionLink href={content.link.href}>{content.link.label}</SectionLink>
        </RegionOnly>
      </div>
      <DhiraDotMatrix />
    </AboutSection>
  );
}
