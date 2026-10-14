import UCHero from "./universal-context/UCHero";
import UCFeatureGrid from "./universal-context/UCFeatureGrid";
import UCSignals from "./universal-context/UCSignals";
import UCConnectivity from "./universal-context/UCConnectivity";
import UCSdk from "./universal-context/UCSdk";
import ScrollReveal from "@/components/ui/ScrollReveal";

// Meet Akashic — the homepage platform section. Parts keep their legacy UC*
// names; see docs/ARCHITECTURE.md.
//
// GROUND (22 Sep 2026, user direction): `uc-bg` is now `vault` #0a0a0c, the
// same black as [04]'s card, so the page runs one dark ground, not an indigo
// one here and a black one two sections later.
//
// TYPE (22 Sep 2026): the section used to set its body in Inter (`font-inter`)
// with Attio's 500-weight, negatively tracked text, so it read as a different
// site from its neighbours. It now inherits the site stack: Google Sans
// headings at 600 with `tracking-tighter`, Google Sans Text body at 400,
// Google Sans Mono for labels. Do not reintroduce a section-local face.
//
// READER: the senior decision maker who funds AI and has just read [01]'s
// "46% of AI pilots never reach production ... the data underneath was never
// made ready for AI". [02] answers that in the platform's own vocabulary,
// neither simplified nor spec sheet. Each part has one job:
//   UCHero          "The intelligence layer" / Meet Akashic / makes your data
//                   ready for AI, then puts AI to work on it
//   UCFeatureGrid   what your AI knows (five tiles)
//   UCSignals       what your AI does: find, reason, answer, audit
//   UCConnectivity  what it plugs into (nothing to rip out)
//   UCSdk           what it is made of (seven modules) + the one exit
// No claim is made twice, and three topics stay out because other sections
// own them: security and residency ([08]), "one platform, not a stack of
// vendors" and reconciliation ([06]), delivery ([04]).
//
// FULL BLEED BY DIRECTION (22 Jul): this is the one homepage section outside
// `ScrollRevealRail`. Its orb already ran to both edges while every rule and
// divider stopped at the 1440px rail, so the horizontal hairlines cut across
// the rail's vertical edge lines and the section read as narrower than its own
// artwork. Every rule now runs edge to edge and content is inset by the shared
// gutter below. Do not put this section back inside the rail.
export default function MeetAkashic() {
  return (
    <section
      id="platform"
      aria-labelledby="platform-h"
      className="relative overflow-hidden bg-uc-bg text-uc-text"
    >
      <ScrollReveal>
        <div className="flex items-center border-b border-dashed border-uc-line px-6 py-[17px] font-mono text-[11px] uppercase tracking-eyebrow text-uc-dim md:px-10 xl:px-14">
          {/* No accent dot: every section eyebrow on the page is a bare
              `[NN]  LABEL`. The label is THE PLATFORM, not MEET AKASHIC,
              because the headline directly below already says "Meet
              Akashic"; it also pairs with [01]'s THE PROBLEM. */}
          <span>
            <span className="text-uc-mute">[02]</span>
            &nbsp;&nbsp;THE PLATFORM
          </span>
        </div>
      </ScrollReveal>

      <UCHero />
      <UCFeatureGrid />
      <UCSignals />
      <UCConnectivity />
      <UCSdk />
    </section>
  );
}
