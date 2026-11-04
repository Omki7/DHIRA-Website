import type { AkashicPage } from "@/content/pages/akashic";
import { ScrollReveal } from "@/shared/components/ui";
import { GroundworkDrawing } from "../GroundworkDrawing";
import { StoryLabel, StoryTitle } from "../AkashicStory";
import styles from "./AkashicBuildVsBuy.module.scss";

/* [08] Why Akashic: distinct business initiatives repeat their foundations
   in isolated delivery, or reuse one platform. The drawing is followed by
   four documented reasons to build that foundation on Akashic. */
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

      </div>
    </section>
  );
}
