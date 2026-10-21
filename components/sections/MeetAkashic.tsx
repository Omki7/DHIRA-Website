import UCHero from "./universal-context/UCHero";
import UCModules from "./universal-context/UCModules";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import FigureEyebrow from "@/components/ui/FigureEyebrow";
import type { HomePlatform } from "@/content/pages/home";

// Meet Akashic — the homepage platform section. Parts keep their legacy UC*
// names; see docs/ARCHITECTURE.md.
//
// Two parts, one job each: the intro names the platform and, inside the
// dome, its five capabilities (what your AI knows); then the seven modules
// beside their drawings (what it is made of), which sets up [03], where the
// solutions are these modules switched on. Both changes are 21 Oct 2026
// (user): the first fold showed nothing that said what Akashic is, and the
// particle demo ("Ask why a number moved") gave way to the modules.
// On 20 Oct 2026 the founder had the "Nothing to rip out" logo strip and the
// old "Seven modules" tag-list close removed; the modules came back on 21 Oct
// as the rail beside their drawings, at the user's request. A shorter rebuild
// (header plus the module moments) was tried the same day and rejected by the
// user in favour of this original section; do not cut it further without
// asking.
//
// The eyebrow is the site's one rail (ui/FigureEyebrow), aligned with every
// other section's rail. Below it the section stays full bleed (22 Jul): the
// orb and the feature grid's hairlines run edge to edge, so do not put the
// parts back inside the rail. The one exception is the modules block's
// content (21 Oct 2026, user): its hairlines stay full bleed, but its text
// and drawing sit on the five capabilities' centred column, the heading on
// the first capability's line (see UCModules).
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

      <UCHero content={content.hero} features={content.features} />
      <UCModules content={content.modules} />
    </section>
  );
}
