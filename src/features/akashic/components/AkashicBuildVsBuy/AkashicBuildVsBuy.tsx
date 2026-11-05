import type { AkashicPage } from "@/content/pages/akashic";
import { ScrollReveal } from "@/shared/components/ui";
import { GroundworkDrawing } from "../GroundworkDrawing";
import { LeaderGains } from "../LeaderGains";
import { StoryLabel, StoryTitle } from "../AkashicStory";
import styles from "./AkashicBuildVsBuy.module.scss";

/* [08] Why Akashic: distinct business initiatives repeat their foundations
   in isolated delivery, or reuse one platform. The drawing proves the
   reuse; the leadership panel under it says what that reuse changes for
   each executive (user, 5 Nov 2026). The four reasons that once followed
   the drawing repeated [02], [04] and [05] and stay retired. */
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

        <ScrollReveal>
          <LeaderGains content={content.leaders} />
        </ScrollReveal>
      </div>
    </section>
  );
}
