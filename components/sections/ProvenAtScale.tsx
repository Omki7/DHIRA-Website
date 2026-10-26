/**
 * DESIGN INTENT:
 * Shared deployment evidence section (home, /akashic, /services).
 * The site's one section header (eyebrow rail, two-tone headline, lede, all
 * on the left) beside the brand chakra ornament, over the deployment
 * carousel: one deployment at a time, story left, photography right.
 * No bridge into another section: sections end on their content (20 Oct
 * 2026, founder).
 */
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionLink from "@/components/ui/SectionLink";
import ProvenStories from "@/components/demos/ProvenStories";
import AshokaChakra from "@/components/demos/AshokaChakra";
import type { ProvenAtScaleBlock } from "@/content/blocks";
import type { Story } from "@/content/collections/customer-stories";
import type { Cta } from "@/content/types";

interface ProvenAtScaleProps {
  id?: string;
  /** The page's own copy for this block (content/blocks.ts ProvenAtScaleBlock). */
  content: ProvenAtScaleBlock;
  /** The deployments the carousel walks through (customer stories collection). */
  stories: Story[];
  /** The section's one onward link, under the lede (/services: the stories). */
  link?: Cta;
  /** Former ids that must still land here (home was #scale until 26 Oct 2026). */
  aliases?: string[];
}

/* Shared by home and /akashic (14 Oct 2026): the gain-led headline written
   for /akashic replaced "Real platform. Real citizens." on both, so the two
   pages make the claim in the same words. /services passes its own. */
export default function ProvenAtScale({ id = "scale", content, stories, link, aliases = [] }: ProvenAtScaleProps) {
  const { number, eyebrow, title, description } = content;
  return (
    <section id={id} className="relative overflow-hidden bg-background pt-12 pb-16 text-ink lg:pt-16 lg:pb-24">
      {aliases.map((alias) => <span key={alias} id={alias} aria-hidden="true" className="absolute top-0 scroll-mt-24" />)}
      

      <ScrollRevealRail className="relative z-10">
        <div className="relative">
          <SectionHeader num={number} label={eyebrow} setup={title.setup} payoff={title.payoff} lede={description}>
            {link && <SectionLink href={link.href}>{link.label}</SectionLink>}
          </SectionHeader>
          {/* The ornament sits beside the headline, under the eyebrow rail. */}
          <div aria-hidden className="absolute right-0 top-[88px] hidden w-[170px] lg:block xl:w-[190px]">
            <AshokaChakra className="w-full" />
          </div>
        </div>

        <ScrollReveal delay={150} className="mt-12 lg:mt-14">
          <ProvenStories stories={stories} ariaLabel={content.storiesLabel} itemNoun={content.storyNoun} />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
