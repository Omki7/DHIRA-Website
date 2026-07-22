/**
 * DESIGN INTENT:
 * Section 03: Proven At Scale.
 * One deployment at a time: eyebrow + headline beside the brand chakra
 * ornament, over a split card (story left, photography right), with
 * edge arrows and a progress-dot rail.
 */
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import ProvenStories from "@/components/demos/ProvenStories";
import AshokaChakra from "@/components/demos/AshokaChakra";

interface ProvenAtScaleProps {
  id?: string;
  sectionNumber?: string;
  eyebrowText?: string;
  title?: string;
  description?: string;
  dark?: boolean;
}

export default function ProvenAtScale({
  id = "scale",
  sectionNumber = "03",
  eyebrowText = "Proven at scale",
  title = "Real platform. Real citizens.",
  description = "Not pilots. National systems in production, on the public record.",
  dark = false,
}: ProvenAtScaleProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className={`relative overflow-hidden pt-12 pb-24 lg:pt-16 lg:pb-32 ${
        dark ? "bg-transparent text-white" : "bg-background text-ink"
      }`}
    >
      <div className={`dot-grid pointer-events-none absolute inset-0 ${dark ? "opacity-[0.08] invert" : "opacity-[0.035]"}`} />

      <ScrollRevealRail dark={dark} className="relative z-10">
        <ScrollReveal>
          <div className="mb-12 flex flex-col items-center gap-10 lg:mb-14 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
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
                {title}
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
      </ScrollRevealRail>
    </section>
  );
}
