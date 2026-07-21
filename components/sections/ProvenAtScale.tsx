/**
 * DESIGN INTENT:
 * Section 03: Proven At Scale.
 * One deployment at a time: eyebrow + headline beside the brand chakra
 * ornament, over a white split card (story left, photography right), with
 * edge arrows and a progress-dot rail. Sits on white like every other
 * light section — the deep-navy band it briefly carried was dropped so the
 * page keeps one ground.
 *
 * Shape discipline (Rule 1): this is a story stage, not a stat band. The old
 * StatBand + FieldLedger treatment was replaced wholesale.
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
}

export default function ProvenAtScale({
  id = "scale",
  sectionNumber = "03",
  eyebrowText = "Proven at scale",
  title = "Real platform. Real citizens.",
  description = "Not pilots. National systems in production, on the public record.",
}: ProvenAtScaleProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className="relative overflow-hidden bg-background pt-12 pb-24 lg:pt-16 lg:pb-32"
    >
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.035]" />

      <ScrollRevealRail className="relative z-10">
        <ScrollReveal>
          <div className="mb-12 flex flex-col items-center gap-10 lg:mb-14 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center gap-2.5 font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft lg:justify-start">
                <span className="h-[5px] w-[5px] rounded-full bg-blue/70" aria-hidden />
                <span>
                  <span className="text-overcast">[{sectionNumber}]</span>
                  &nbsp;&nbsp;{eyebrowText}
                </span>
                <span className="h-[5px] w-[5px] rounded-full bg-blue/70" aria-hidden />
              </div>

              <h2
                id={`${id}-h`}
                className="mx-auto mt-6 max-w-[16em] text-[40px] font-semibold leading-[1.1] tracking-tighter text-ink sm:text-[48px] lg:mx-0 lg:text-[56px]"
              >
                {title}
              </h2>

              {/* Carries the credibility the removed client names used to */}
              <p className="mx-auto mt-5 max-w-[30em] text-[17px] leading-relaxed text-inkSoft md:text-[18px] lg:mx-0">
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
