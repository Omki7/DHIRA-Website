import UCHero from "./universal-context/UCHero";
import UCFeatureGrid from "./universal-context/UCFeatureGrid";
import UCSignals from "./universal-context/UCSignals";
import UCConnectivity from "./universal-context/UCConnectivity";
import UCSdk from "./universal-context/UCSdk";
import ScrollReveal from "@/components/ui/ScrollReveal";

// Meet Akashic — the homepage platform section, in the dark Attio-derived
// aesthetic (user direction 18–19 Jul). Parts keep their legacy UC* names;
// see AGENTS.md §6. The ground is `uc-bg` #0A0E24 — the same deep indigo the
// Akashic page's `.ak-depth` slabs use (re-tinted from neutral #101010 on
// 21 Jul, user direction). See AGENTS.md §7 Rule 5.
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
      className="relative overflow-hidden bg-uc-bg font-inter text-uc-text"
    >
      <ScrollReveal>
        <div className="flex items-center border-b border-dashed border-uc-line px-6 py-[17px] font-mono text-[11px] uppercase tracking-eyebrow text-uc-dim md:px-10 xl:px-14">
          {/* No accent dot. Every other section eyebrow on the page is a bare
              `[NN]  LABEL`; the pulsing blue dot here made [02] the one
              section that announced itself, which is what the team flagged as
              "odd in blue". The section already earns its emphasis from being
              the only dark ground on the page. */}
          <span>
            <span className="text-uc-mute">[02]</span>
            &nbsp;&nbsp;MEET AKASHIC
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
