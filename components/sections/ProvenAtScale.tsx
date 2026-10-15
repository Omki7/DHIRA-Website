/**
 * DESIGN INTENT:
 * Section 03: Proven At Scale.
 * One deployment at a time: eyebrow + headline beside the brand chakra
 * ornament, over a split card (story left, photography right), with
 * edge arrows and a progress-dot rail.
 */
import type { ReactNode } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionBridge from "@/components/ui/SectionBridge";
import ProvenStories from "@/components/demos/ProvenStories";
import AshokaChakra from "@/components/demos/AshokaChakra";

interface ProvenAtScaleProps {
  id?: string;
  sectionNumber?: string;
  eyebrowText?: string;
  /* A node so a page can pass a two-tone title (/akashic does). */
  title?: ReactNode;
  description?: string;
  dark?: boolean;
  /* Opt-in hand-off into the next section. Off by default because this
     section is also rendered on /about and /akashic, where nothing about
     delivery follows it. Light ground only — see SectionBridge. */
  bridge?: {
    lead: string;
    payoff: string;
    targetId: string;
    number: string;
    label: string;
  };
}

export default function ProvenAtScale({
  id = "scale",
  sectionNumber = "03",
  eyebrowText = "In production",
  title,
  description = "Not pilots. National systems in production, on the public record.",
  dark = false,
  bridge,
}: ProvenAtScaleProps) {
  /* Shared by home and /akashic (14 Oct 2026): the gain-led headline written
     for /akashic replaced "Real platform. Real citizens." on both, so the
     two pages make the claim in the same words. /delivery passes its own. */
  const heading = title ?? (
    <>
      <span className={dark ? "text-white/60" : "text-inkSoft"}>Proven at national scale.</span>{" "}
      <span className="sm:block">Ready for your organisation.</span>
    </>
  );
  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className={`relative overflow-hidden ${
        bridge ? "pt-10 pb-10 lg:pt-14 lg:pb-14" : "pt-10 pb-12 lg:pt-14 lg:pb-16"
      } ${dark ? "bg-transparent text-white" : "bg-background text-ink"}`}
    >
      <div className={`dot-grid pointer-events-none absolute inset-0 ${dark ? "opacity-[0.08] invert" : "opacity-[0.035]"}`} />

      <ScrollRevealRail className="relative z-10">
        <ScrollReveal>
          <div className="mb-8 flex flex-col items-center gap-10 lg:mb-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <div className="text-center lg:text-left">
              <div className={`flex items-center justify-center gap-2.5 font-mono text-[11px] uppercase tracking-eyebrow lg:justify-start ${
                dark ? "text-white/70" : "text-inkSoft"
              }`}>
                <span className="h-[5px] w-[5px] rounded-full bg-blue" aria-hidden />
                <span>
                  <span className={dark ? "text-white/40" : "text-overcast"}>[{sectionNumber}]</span>
                  &nbsp;&nbsp;{eyebrowText}
                </span>
                <span className="h-[5px] w-[5px] rounded-full bg-blue" aria-hidden />
              </div>

              <h2
                id={`${id}-h`}
                className={`mx-auto mt-6 max-w-[16em] text-[40px] font-semibold leading-[1.1] tracking-tighter sm:text-[48px] lg:mx-0 lg:text-[56px] ${
                  dark ? "text-white" : "text-ink"
                }`}
              >
                {heading}
              </h2>

              <p className={`mx-auto mt-5 max-w-[30em] text-[17px] leading-relaxed md:text-[18px] lg:mx-0 ${
                dark ? "text-white/70" : "text-inkSoft"
              }`}>
                {description}
              </p>
            </div>

            <div className="w-[150px] shrink-0 sm:w-[170px] lg:w-[190px]">
              <AshokaChakra className="w-full" />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <ProvenStories />
        </ScrollReveal>

        {/* The turn from "here is the platform" to "here is who builds with
            you". Everything above this point — hero, [01], [02], [03] — is a
            product argument, so [04] used to open on the word "delivery" with
            nothing behind it. */}
        {bridge && !dark && (
          <ScrollReveal>
            <SectionBridge {...bridge} className="mt-16 lg:mt-20" />
          </ScrollReveal>
        )}
      </ScrollRevealRail>
    </section>
  );
}
