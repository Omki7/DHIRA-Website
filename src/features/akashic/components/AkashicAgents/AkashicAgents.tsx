import type { AkashicPage } from "@/content/pages/akashic";
import { PreviewTag, ScrollReveal } from "@/shared/components/ui";
import { AgentRunDrawing } from "../AgentRunDrawing";
import { StoryLabel, StoryTitle } from "../AkashicStory";
import styles from "./AkashicAgents.module.scss";

/* [05] Akashic Agents (added 14 Oct 2026, the founder's agents section).
   Owns ONE claim: agents do the legwork, a person makes the call. [01]
   owns asking a question, [04] the foundation it runs on; [06] owns security; this section shows the run
   and who sits where in it. Header, one drawing, one model-neutral coda.
   Copy and the claims rules applied to his wireframe: AKASHIC_AGENTS. */
export interface AkashicAgentsProps {
  content: AkashicPage["agents"];
}

export function AkashicAgents({ content }: AkashicAgentsProps) {
  return (
    <section id="agents" className={styles.section}>
      <div className={styles.wrap}>
        <ScrollReveal>
          <StoryLabel
            number={content.number}
            tag={content.preview ? <PreviewTag /> : undefined}
          >
            {content.label}
          </StoryLabel>
          <div className={styles.heading}>
            <StoryTitle setup={content.setup}>{content.title}</StoryTitle>
            <p className={styles.intro}>{content.intro}</p>
          </div>
        </ScrollReveal>

        <AgentRunDrawing content={content} />

        <p className={styles.coda}>{content.coda}</p>
      </div>
    </section>
  );
}
