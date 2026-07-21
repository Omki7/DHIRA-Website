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
export default function MeetAkashic() {
  return (
    <section
      id="platform"
      className="relative bg-uc-bg font-inter text-uc-text pt-12 lg:pt-16"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 z-50 h-px w-screen -translate-x-1/2 bg-uc-line"
      />
      <div className="mx-auto max-w-[1440px] border-x border-uc-line max-lg:border-x-0">
        {/* Eyebrow / Section divider */}
        <ScrollReveal>
          <div className="mx-4 sm:mx-6 lg:mx-8 mb-10 flex items-center border-t border-b border-dashed border-uc-line py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-uc-dim">
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
      </div>
    </section>
  );
}
