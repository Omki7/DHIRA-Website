import ScrollReveal from "@/components/ui/ScrollReveal";
import PreviewTag from "@/components/ui/PreviewTag";
import AgentRunDrawing from "@/components/demos/akashic/AgentRunDrawing";
import type { AkashicPage } from "@/content/pages/akashic";
import { StoryLabel, StoryTitle } from "@/components/sections/akashic/AkashicStory";

/* [05] Akashic Agents (added 14 Oct 2026, the founder's agents section).
   Owns ONE claim: agents do the legwork, a person makes the call. [01]
   owns asking a question, [04] the foundation it runs on; [06] owns security; this section shows the run
   and who sits where in it. Header, one drawing, one model-neutral coda.
   Copy and the claims rules applied to his wireframe: AKASHIC_AGENTS. */
export default function AkashicAgents({ content }: { content: AkashicPage["agents"] }) {
  return (
    <section id="agents" className="ak-story border-t border-lineSoft bg-background">
      <div className="ak-story-wrap">
        <ScrollReveal>
          <StoryLabel number={content.number} tag={content.preview ? <PreviewTag /> : undefined}>{content.label}</StoryLabel>
          <div className="ak-story-heading">
            <StoryTitle setup={content.setup}>{content.title}</StoryTitle>
            <p className="ak-story-intro">{content.intro}</p>
          </div>
        </ScrollReveal>

        <AgentRunDrawing content={content} />

        <p className="ak-story-coda">{content.coda}</p>
      </div>
    </section>
  );
}
