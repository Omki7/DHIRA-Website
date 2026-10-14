import ScrollReveal from "@/components/ui/ScrollReveal";
import PreviewTag from "@/components/ui/PreviewTag";
import AgentRunDrawing from "@/components/demos/akashic/AgentRunDrawing";
import { AKASHIC_AGENTS as content } from "@/lib/akashicSections";
import { StoryLabel, StoryTitle } from "@/components/sections/akashic/AkashicStory";

/* [05] Akashic Agents (added 14 Oct 2026, the founder's agents section).
   Owns ONE claim: agents do the legwork, a person makes the call. [01]
   owns asking a question, [04] the foundation it runs on; [06] owns security; this section shows the run
   and who sits where in it. Header, one drawing, one model-neutral coda.
   Copy and the claims rules applied to his wireframe: AKASHIC_AGENTS. */
export default function AkashicAgents() {
  return (
    <section id="agents" className="ak-story border-t border-lineSoft bg-background">
      <div className="ak-story-wrap">
        <ScrollReveal>
          <div className="flex flex-wrap items-center gap-3">
            <StoryLabel number="05">{content.label}</StoryLabel>
            {content.preview && <PreviewTag />}
          </div>
          <div className="ak-story-heading">
            <StoryTitle setup={content.setup}>{content.title}</StoryTitle>
            <p className="ak-story-intro">{content.intro}</p>
          </div>
        </ScrollReveal>

        <AgentRunDrawing />

        <p className="ak-story-coda">{content.coda}</p>
      </div>
    </section>
  );
}
