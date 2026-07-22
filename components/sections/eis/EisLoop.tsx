/*
 * [06] The Loop — Reading the Business Is Half the Job.
 * Restaged in Keytail-inspired dark sky glass aesthetics.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import EisLoopSimulatorMockup from "@/components/demos/mockups/EisLoopSimulatorMockup";

const stations = [
  {
    num: "01",
    name: "Signal",
    line: "The system raises it, ranked, before anyone thinks to ask.",
  },
  {
    num: "02",
    name: "Question",
    line: "Ask in plain language. Get an answer with its evidence listed.",
  },
  {
    num: "03",
    name: "Scenario",
    line: "Test the obvious consequence before committing to it.",
  },
  {
    num: "04",
    name: "Decision",
    line: "Compose the action: what changes, which system, who approves.",
  },
  {
    num: "05",
    name: "Record",
    line: "Approval, write-back, and an append-only entry naming who decided.",
  },
];

function ReturningRail() {
  return (
    <div className="relative md:px-8">
      <div className="relative">
        <span
          className="absolute left-[10%] right-[10%] top-[7px] hidden h-px bg-[length:14px_1px] bg-repeat-x bg-[repeating-linear-gradient(90deg,rgba(62,99,221,0.6)_0_7px,transparent_7px_14px)] md:block"
          aria-hidden
        />
        <span
          className="absolute -left-8 top-[7px] hidden h-px w-[calc(10%+2rem)] bg-[length:14px_1px] bg-repeat-x bg-[repeating-linear-gradient(90deg,rgba(62,99,221,0.6)_0_7px,transparent_7px_14px)] md:block"
          aria-hidden
        />
        <span
          className="absolute -right-8 top-[7px] hidden h-px w-[calc(10%+2rem)] bg-[length:14px_1px] bg-repeat-x bg-[repeating-linear-gradient(90deg,rgba(62,99,221,0.6)_0_7px,transparent_7px_14px)] md:block"
          aria-hidden
        />
        <ol className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-5 md:gap-4">
          {stations.map((station, idx) => (
            <li key={station.num} className="flex flex-col items-start md:items-center md:text-center">
              <span className="relative mb-4 flex h-[15px] w-[15px] items-center justify-center">
                <span
                  className={`h-[9px] w-[9px] rounded-full ${
                    idx === stations.length - 1 ? "bg-blue-400" : "bg-[#0D122B] ring-1 ring-blue-400"
                  }`}
                  aria-hidden
                />
                {idx === stations.length - 1 && (
                  <span
                    className="absolute inset-0 rounded-full border border-blue-400/40 animate-[ps-ring_2.6s_ease-out_infinite]"
                    aria-hidden
                  />
                )}
              </span>
              <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.08em] text-blue-400">
                {station.num}
              </p>
              <h3 className="mt-1.5 text-[19px] font-semibold tracking-tight text-white">
                {station.name}
              </h3>
              <p className="mt-1.5 max-w-[22em] text-[13.5px] leading-relaxed text-white/70 md:max-w-none">
                {station.line}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[7px] hidden rounded-b-[14px] border-b border-l border-r border-dashed border-blue-400/40 md:block"
        aria-hidden
      />
      <div className="relative hidden h-[38px] md:block" aria-hidden>
        <span className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 items-center gap-1.5 bg-[#070A1C] px-3 font-mono text-[9.5px] font-bold uppercase tracking-eyebrow text-blue-400 border border-blue-400/30 rounded-full">
          <svg viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-3">
            <path d="M12.5 6 H2 M5.5 2.5 L2 6 L5.5 9.5" />
          </svg>
          Tomorrow&rsquo;s brief
        </span>
      </div>
      <p className="mt-6 font-mono text-[9.5px] font-bold uppercase tracking-eyebrow text-blue-400 md:hidden">
        And back into tomorrow&rsquo;s brief
      </p>
    </div>
  );
}

export default function EisLoop() {
  return (
    <section
      id="the-loop"
      className="scroll-mt-24 border-t border-white/10 bg-transparent pt-12 pb-24 lg:pt-16 lg:pb-32"
    >
      <ScrollRevealRail dark>
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-white/40">[06]</span>
              <span className="text-white/70">&nbsp;&nbsp;The loop</span>
            </p>
            <span className="hidden text-white/40 sm:inline">/ Analytics meets the decision</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-white md:text-heading-md lg:text-heading-lg">
            Reading the business is half the job.
          </h2>
          <p className="mt-5 max-w-[40em] text-lg leading-relaxed text-white/70">
            Analytics and decision-making have lived in separate software for
            thirty years. One described the business. The other happened in a
            meeting, and then in somebody&rsquo;s ERP window three days later. EIS
            runs both on one surface.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="mt-12 lg:mt-14">
            <ReturningRail />
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
          <ScrollReveal delay={160}>
            <EisLoopSimulatorMockup />
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <p className="max-w-[24em] text-[24px] font-semibold leading-snug tracking-tight text-white md:text-[28px]">
              The number, the question, the decision, and the receipt.{" "}
              <span className="relative inline-block whitespace-nowrap">
                One surface.
                <span className="absolute -bottom-[0.04em] left-0 h-[0.09em] w-full rounded-full bg-blue/70" aria-hidden />
              </span>
            </p>
            <p className="mt-6 max-w-[30em] text-lg leading-relaxed text-white/70">
              Nothing leaves EIS without a named approver and a target system. The
              write is logged whether it succeeds or fails, so the question
              &ldquo;who decided this, on what, and when?&rdquo; has an answer
              before anyone has to go looking for one.
            </p>
            <p className="mt-8 font-mono text-[9.5px] uppercase tracking-eyebrow text-white/40">
              Demonstration data &middot; Single Surface Architecture
            </p>
          </ScrollReveal>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
