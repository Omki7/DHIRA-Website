/*
 * [04] A Teacher's Morning — Minute by Minute.
 * A morning-schedule timeline (clock-stamped cousin of Life's stopwatch
 * rail): three timestamped beats on one blue rail, with the platform-review
 * pull line as the sticky-side anchor.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";

const beats = [
  {
    time: "08:00",
    title: "At-risk alert received",
    desc: "The system identifies a student struggling with a specific topic, based on yesterday's quiz performance: before the student falls further behind.",
  },
  {
    time: "08:15",
    title: "Remedial content assigned",
    desc: "The system auto-generates a personalised, short explanation video in the student's preferred language. No manual lesson prep required.",
  },
  {
    time: "09:00",
    title: "Engagement improves",
    desc: "The student completes the module. Their confidence score updates in real time, visible to both teacher and counsellor.",
  },
];

export default function KnowledgeMorning() {
  return (
    <section id="a-teachers-morning" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="self-start lg:sticky lg:top-32">
            <ScrollReveal>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow">
                <span className="text-overcast">[04]</span>
                <span className="text-inkSoft">&nbsp;&nbsp;A teacher&rsquo;s morning</span>
              </p>
              <h2 className="mt-5 text-heading-sm font-semibold leading-[1.05] tracking-tighter text-ink md:text-heading-md">
                How the grid empowers educators, minute by minute.
              </h2>
              <div className="mt-8 max-w-[26em] rounded-card border border-subtle-stroke bg-primary-bg p-5">
                <p className="text-[16px] font-medium leading-relaxed tracking-tight text-ink">
                  &ldquo;A student selects a subject, and the system already knows
                  the right path.&rdquo;
                </p>
                <p className="mt-2.5 font-mono text-[9px] uppercase tracking-eyebrow text-overcast">
                  From a customer platform review
                </p>
              </div>
              <p className="mt-6 max-w-[26em] text-lg leading-relaxed text-inkSoft">
                Here is what that looks like from the teacher&rsquo;s side of the
                screen.
              </p>
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
                        am
                      </span>
                      {idx === beats.length - 1 && (
                        <span className="absolute inset-0 rounded-full border border-blue/30 animate-[ps-ring_2.4s_ease-out_infinite]" aria-hidden />
                      )}
                    </div>
                    <div className="min-w-0 pt-2 sm:pt-4">
                      <h3 className="text-[21px] font-semibold tracking-tight text-ink md:text-[24px]">
                        {beat.title}
                      </h3>
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
