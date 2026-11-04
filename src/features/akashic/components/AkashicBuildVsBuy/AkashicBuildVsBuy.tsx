import type { AkashicPage } from "@/content/pages/akashic";
import { ScrollReveal } from "@/shared/components/ui";
import { GroundworkDrawing } from "../GroundworkDrawing";
import { StoryLabel, StoryTitle } from "../AkashicStory";
import styles from "./AkashicBuildVsBuy.module.scss";

/* [07] Why Akashic: header, one drawing with four keyed executive seats,
   one measure line with the CTA. The drawing owns the reuse argument;
   see GroundworkDrawing for what each row claims. */
export interface AkashicBuildVsBuyProps {
  content: AkashicPage["advantage"];
}

export function AkashicBuildVsBuy({ content }: AkashicBuildVsBuyProps) {
  return (
    <section id="build-vs-buy" className={styles.section}>
      <div className={styles.wrap}>
        <ScrollReveal>
          <StoryLabel number={content.number}>{content.label}</StoryLabel>
          <div className={styles.heading}>
            <StoryTitle setup={content.setup}>{content.title}</StoryTitle>
            <p className={styles.intro}>{content.intro}</p>
          </div>
        </ScrollReveal>

        <GroundworkDrawing content={content} />

        {/* The section ends on its measure line. The "Map your first use
            case" button went on 20 Oct 2026: the close owns the contact
            CTA, and no section ends on a button (founder). */}
        <div className={styles.close}>
          <p>{content.measure}</p>
        </div>
      </div>
    </section>
  );
}
