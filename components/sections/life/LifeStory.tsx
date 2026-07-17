/*
 * [03] The 2-Minute Story — Detection to Dispatch.
 * A stopwatch timeline: three mono timestamps on one blue rail, the severe
 * risk score surfaced as a chip, closed by the platform-review pull line.
 * Sits on the page's one soft blue band (site-wide consistency pass, 17
 * Jul) — Life had zero background variation across all eight sections.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";

const beats = [
  {
    time: "00:00",
    title: "Vitals recorded",
    desc: "An ASHA worker inputs a mother's vitals on a basic smartphone. No special equipment, no lab visit required.",
  },
  {
    time: "00:01",
    title: "AI flags severe risk",
    desc: "The on-device model flags severe preeclampsia. An alert fires immediately: no internet needed.",
    chip: "RISK SCORE 0.98",
  },
  {
    time: "01:50",
    title: "Ambulance dispatched",
    desc: "Integration with the 108 emergency response network triggers pickup. Help is already moving before the village clinic could have placed a single phone call.",
  },
];

export default function LifeStory() {
  return (
    <section
      id="two-minutes"
      className="scroll-mt-24 border-t border-lineSoft bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F5FE_16%,#F1F5FE_84%,#FFFFFF_100%)]"
    >
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="self-start lg:sticky lg:top-32">
            <ScrollReveal>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow">
                <span className="text-overcast">[03]</span>
                <span className="text-inkSoft">&nbsp;&nbsp;The 2-minute story</span>
              </p>
              <h2 className="mt-5 text-heading-sm font-semibold leading-[1.05] tracking-tighter text-ink md:text-heading-md">
                From detection to dispatch, in the blink of an eye.
              </h2>
              <p className="mt-6 max-w-[26em] text-lg leading-relaxed text-inkSoft">
                In a hospital, the system means a patient&rsquo;s history appears the
                second they walk in. At the edge, in a village with no signal, it
                means a mother&rsquo;s life-threatening risk is caught and acted on
                in under two minutes.
              </p>
              <div className="mt-8 max-w-[26em] rounded-card border border-subtle-stroke bg-primary-bg p-5">
                <p className="text-[16px] font-medium leading-relaxed tracking-tight text-ink">
                  &ldquo;The system surfaces what matters, instantly, before anyone
                  has to ask.&rdquo;
                </p>
                <p className="mt-2.5 font-mono text-[9px] uppercase tracking-eyebrow text-overcast">
                  From a customer platform review
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="relative">
            <span
              className="absolute bottom-6 left-[38px] top-6 w-[2px] rounded-full bg-gradient-to-b from-blue/60 via-blue/30 to-blue/60 sm:left-[46px]"
              aria-hidden
            />
            <div className="space-y-10">
              {beats.map((beat, idx) => (
                <ScrollReveal key={beat.time} delay={120 + idx * 110}>
                  <div className="relative flex gap-6 sm:gap-8">
                    <div className="relative z-10 flex h-[76px] w-[76px] shrink-0 flex-col items-center justify-center rounded-full border border-blue-border bg-white shadow-card sm:h-[92px] sm:w-[92px]">
                      <span className="font-mono text-[15px] font-bold tracking-tight text-blue sm:text-[17px]">
                        {beat.time}
                      </span>
                      <span className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-overcast">
                        min : sec
                      </span>
                      {idx === beats.length - 1 && (
                        <span className="absolute inset-0 rounded-full border border-blue/30 animate-[ps-ring_2.4s_ease-out_infinite]" aria-hidden />
                      )}
                    </div>
                    <div className="min-w-0 pt-2 sm:pt-4">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-[21px] font-semibold tracking-tight text-ink md:text-[24px]">
                          {beat.title}
                        </h3>
                        {beat.chip && (
                          <span className="inline-flex items-center rounded-[7px] border border-[#EEDFC4] bg-[#FDF9F1] px-2 py-1 font-mono text-[9px] font-bold tracking-[0.05em] text-[#8A6A33]">
                            {beat.chip}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 max-w-[34em] text-[15px] leading-relaxed text-inkSoft">
                        {beat.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
