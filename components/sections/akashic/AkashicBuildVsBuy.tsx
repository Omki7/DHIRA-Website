import ScrollReveal from "@/components/ui/ScrollReveal";
import GroundworkDrawing from "@/components/demos/akashic/GroundworkDrawing";
import type { AkashicPage } from "@/content/pages/akashic";
import { StoryLabel, StoryTitle } from "@/components/sections/akashic/AkashicStory";

/* [07] Why Akashic: header, one drawing with four keyed executive seats,
   one measure line with the CTA. The drawing owns the reuse argument;
   see GroundworkDrawing for what each row claims. */
export default function AkashicBuildVsBuy({ content }: { content: AkashicPage["advantage"] }) {
  return (
    <section id="build-vs-buy" className="ak-story bg-background">
      <div className="ak-story-wrap">
        <ScrollReveal>
          <StoryLabel number={content.number}>{content.label}</StoryLabel>
          <div className="ak-story-heading">
            <StoryTitle setup={content.setup}>{content.title}</StoryTitle>
            <p className="ak-story-intro">{content.intro}</p>
          </div>
        </ScrollReveal>

        <GroundworkDrawing content={content} />

        {/* The section ends on its measure line. The "Map your first use
            case" button went on 20 Oct 2026: the close owns the contact
            CTA, and no section ends on a button (founder). */}
        <div className="ak-gw-close">
          <p>{content.measure}</p>
        </div>
      </div>
    </section>
  );
}
