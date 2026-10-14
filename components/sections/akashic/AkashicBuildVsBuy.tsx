import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GroundworkDrawing from "@/components/demos/akashic/GroundworkDrawing";
import { AKASHIC_ADVANTAGE as content } from "@/lib/akashicSections";
import { StoryLabel, StoryTitle, StoryArrow } from "@/components/sections/akashic/AkashicStory";

/* [07] Why Akashic: header, one drawing with four keyed executive seats,
   one measure line with the CTA. The drawing owns the reuse argument;
   see GroundworkDrawing for what each row claims. */
export default function AkashicBuildVsBuy() {
  return (
    <section id="build-vs-buy" className="ak-story bg-background">
      <div className="ak-story-wrap">
        <ScrollReveal>
          <StoryLabel number="08">Why Akashic</StoryLabel>
          <div className="ak-story-heading">
            <StoryTitle setup={content.setup}>{content.title}</StoryTitle>
            <p className="ak-story-intro">{content.intro}</p>
          </div>
        </ScrollReveal>

        <GroundworkDrawing />

        <div className="ak-gw-close">
          <p>{content.measure}</p>
          <Link href="#get-started" className="btn-primary btn-lg">{content.cta}<StoryArrow /></Link>
        </div>
      </div>
    </section>
  );
}
