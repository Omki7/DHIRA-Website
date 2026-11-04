import type { HomePlatform } from "@/content/pages/home";
import { FigureEyebrow, ScrollReveal, ScrollRevealRail } from "@/shared/components/ui";
import { AkashicOutcomeCardsMockup } from "../../mockups/AkashicOutcomeCardsMockup";
import { UCCapabilities } from "../UCCapabilities";
import { UCHero } from "../UCHero";
import styles from "./MeetAkashic.module.scss";

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
export interface MeetAkashicProps {
  content: HomePlatform;
}

export function MeetAkashic({ content }: MeetAkashicProps) {
  return (
    <section id="platform" aria-labelledby="platform-h" className={styles.root}>
      <ScrollRevealRail>
        <ScrollReveal>
          <FigureEyebrow num={content.eyebrow.number} label={content.eyebrow.label} dark />
        </ScrollReveal>
      </ScrollRevealRail>

      <UCHero content={content.hero} />

      <div className={styles.showcase}>
        <ScrollReveal delay={120}>
          <AkashicOutcomeCardsMockup content={content.showcase} />
        </ScrollReveal>
      </div>

      <div className={styles.capabilities}>
        <UCCapabilities features={content.features} />
      </div>
    </section>
  );
}
