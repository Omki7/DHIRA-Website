import UCHero from "./universal-context/UCHero";
import UCCapabilities from "./universal-context/UCCapabilities";
import AkashicOutcomeCardsMockup from "@/components/demos/mockups/AkashicOutcomeCardsMockup";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import FigureEyebrow from "@/components/ui/FigureEyebrow";
import type { HomePlatform } from "@/content/pages/home";

// Meet Akashic — the homepage platform section. Parts keep their legacy UC*
// names; see docs/ARCHITECTURE.md.
//
// Three parts, one job each (23 Oct 2026, user): the intro names the
// platform; the outcome cards, with their module index, show what each
// module gives a team; the five capabilities say what your AI knows. The
// cards came from the /akashic hero, and this section's dome and module rail
// went there in exchange (user: the /akashic hero looked better). Content
// and tagline are unchanged; each module's one line is now its card caption.
// On 20 Oct 2026 the founder had the "Nothing to rip out" logo strip and the
// old "Seven modules" tag-list close removed; do not cut this section
// further without asking.
//
// The eyebrow is the site's one rail (ui/FigureEyebrow), aligned with every
// other section's rail. Below it the section stays full bleed: the cards'
// fan and the capabilities' hairline run wide, so do not put the parts back
// inside the rail.
//
// TYPE (22 Sep 2026): the site stack only. Do not reintroduce a section-local
// face.
export default function MeetAkashic({ content }: { content: HomePlatform }) {
  return (
    <section id="platform" aria-labelledby="platform-h" className="relative overflow-hidden bg-uc-bg pt-12 text-uc-text lg:pt-16">
      <ScrollRevealRail>
        <ScrollReveal>
          <FigureEyebrow num={content.eyebrow.number} label={content.eyebrow.label} dark />
        </ScrollReveal>
      </ScrollRevealRail>

      <UCHero content={content.hero} />

      <div className="relative mx-auto mt-12 w-full max-w-[1440px] px-4 sm:px-6 lg:mt-16 lg:px-8">
        <ScrollReveal delay={120}>
          <AkashicOutcomeCardsMockup content={content.showcase} />
        </ScrollReveal>
      </div>

      <div className="mt-4 lg:mt-20">
        <UCCapabilities features={content.features} />
      </div>
    </section>
  );
}
