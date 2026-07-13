"use client";

/*
 * [01] The Work — Production Is a Country.
 * Why the work matters: narrative plus one wide impact band of the four
 * public-record missions DHIRA's work already runs inside (count-up figures,
 * per Rule 4: same platform numbers as the Public Sector page).
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import useCountUp from "@/hooks/useCountUp";

const missions = [
  { platform: "CoWIN / U-WIN", figure: "2B+", label: "vaccinations" },
  { platform: "DIKSHA", figure: "564 Cr", label: "learning sessions" },
  { platform: "Poshan Tracker", figure: "10 Cr+", label: "children & mothers" },
  { platform: "eMigrate", figure: "3.87 L", label: "emigrations tracked" },
];

function Figure({ figure }: { figure: string }) {
  const { ref, display } = useCountUp(figure, { duration: 1500 });
  return (
    <div ref={ref} className="whitespace-nowrap text-[34px] font-semibold leading-none tracking-tighter text-ink md:text-[38px]">
      {display}
    </div>
  );
}

export default function CareersImpact() {
  return (
    <section id="the-work" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[01]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;The work</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Not a sandbox</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Ship to production. Production is a country.
          </h2>
          <p className="mt-5 max-w-[38em] text-lg leading-relaxed text-secondary-text">
            Most engineering work ships to a dashboard nobody opens. Ours runs
            inside national platforms where the numbers are public record and the
            stakes don&rsquo;t allow for guesswork. You will work on systems like
            these from your first week.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <div className="mt-12 overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg lg:mt-14">
            <div className="h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent" aria-hidden />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {missions.map((mission, idx) => (
                <div
                  key={mission.platform}
                  className={`flex flex-col p-6 ${
                    idx > 0 ? "border-t border-dashed border-lineSoft sm:border-t-0 lg:border-l" : ""
                  } ${idx >= 2 ? "sm:border-t lg:border-t-0" : ""} ${idx === 1 ? "sm:border-l" : ""} ${idx === 3 ? "sm:border-l" : ""}`}
                >
                  <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-eyebrow text-inkSoft">
                    <span className="h-[5px] w-[5px] rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
                    {mission.platform}
                  </span>
                  <div className="mt-4">
                    <Figure figure={mission.figure} />
                  </div>
                  <span className="mt-2 text-[12.5px] text-inkSoft">{mission.label}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-dashed border-lineSoft px-6 py-3.5 font-mono text-[9px] uppercase tracking-[0.08em] text-overcast">
              Where DHIRA&rsquo;s work already runs &middot; public-record numbers
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
