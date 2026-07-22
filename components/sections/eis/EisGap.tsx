/*
 * [01] The Gap — Your Data Is Not Late. Your Decisions Are.
 * Latency ladder schematic restaged in Keytail-inspired dark sky glass aesthetics.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

const todayStations = ["Event", "Recorded", "Reconciled", "Reported", "Reviewed", "Decided"];
const eisStations = ["Event", "Recorded", "Decided"];

function Station({ label, tone }: { label: string; tone: "muted" | "ink" | "live" }) {
  const dot =
    tone === "live"
      ? "bg-blue-400"
      : tone === "ink"
        ? "bg-white"
        : "bg-white/30";
  const text =
    tone === "live"
      ? "text-blue-400"
      : tone === "ink"
        ? "text-white"
        : "text-white/50";
  return (
    <span className="flex shrink-0 items-center gap-2.5 md:flex-col md:gap-2">
      <span className="relative flex h-[9px] w-[9px] shrink-0 items-center justify-center">
        <span className={`h-[7px] w-[7px] rounded-full ${dot}`} aria-hidden />
        {tone === "live" && (
          <span
            className="absolute inset-0 rounded-full border border-blue-400/50 animate-[ps-ring_2.6s_ease-out_infinite]"
            aria-hidden
          />
        )}
      </span>
      <span className={`whitespace-nowrap font-mono text-[9.5px] font-bold uppercase tracking-[0.07em] ${text}`}>
        {label}
      </span>
    </span>
  );
}

function Rail({
  eyebrow,
  stations,
  verdict,
  tone,
}: {
  eyebrow: string;
  stations: string[];
  verdict: string;
  tone: "muted" | "ink";
}) {
  const isLive = tone === "ink";
  return (
    <div>
      <p className="font-mono text-[9.5px] font-bold uppercase tracking-eyebrow text-white/50">
        {eyebrow}
      </p>
      <div
        className={`mt-4 flex flex-col items-start md:flex-row md:items-start ${
          isLive ? "md:gap-6 lg:gap-8" : "md:justify-between md:gap-4"
        }`}
      >
        {stations.map((label, idx) => (
          <span key={label} className="contents">
            <Station
              label={label}
              tone={isLive && idx === stations.length - 1 ? "live" : tone}
            />
            {idx < stations.length - 1 && (
              <span
                className={`ml-1 h-3 w-px md:ml-0 md:mt-[3px] md:h-px md:w-auto md:min-w-[16px] md:flex-1 ${
                  isLive
                    ? "bg-white/30"
                    : "bg-white/20 md:bg-[length:14px_1px] md:bg-repeat-x md:bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.2)_0_7px,transparent_7px_14px)]"
                }`}
                aria-hidden
              />
            )}
          </span>
        ))}
        {isLive && <span className="mt-[3px] hidden h-px flex-[3] md:block" aria-hidden />}
      </div>
      <p
        className={`mt-4 font-mono text-[10px] uppercase tracking-eyebrow ${
          isLive ? "font-bold text-blue-400" : "text-white/40"
        }`}
      >
        {verdict}
      </p>
    </div>
  );
}

export default function EisGap() {
  return (
    <section
      id="the-gap"
      className="scroll-mt-24 border-t border-white/10 bg-transparent pt-12 pb-24 lg:pt-16 lg:pb-32"
    >
      <ScrollRevealRail dark>
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-white/40">[01]</span>
              <span className="text-white/70">&nbsp;&nbsp;The gap</span>
            </p>
            <span className="hidden text-white/40 sm:inline">/ Decision latency</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-white md:text-heading-md lg:text-heading-lg">
            Your data is not late. Your decisions are.
          </h2>
          <p className="mt-5 max-w-[40em] text-lg leading-relaxed text-white/70">
            Executives are not short of dashboards. They are short of the hours
            between a number moving and someone deciding about it. That gap is
            where margin leaks, renewals lapse, and the person holding the account
            resigns.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <ScrollReveal delay={100}>
            <p className="max-w-[32em] text-lg leading-relaxed text-white/70">
              The executive information system is not a new idea. It was named in
              the early 1980s and it failed for one reason: a person had to
              assemble it by hand, so the screen was stale the morning it was
              built.
            </p>
            <p className="mt-6 max-w-[32em] text-lg leading-relaxed text-white/70">
              Forty years on, the idea is unchanged and the constraint is gone.
              Your systems are already connected to each other. What was missing
              is a layer that knows what they mean together, and a way to act on
              that before the week turns.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={180}>
            <div className="overflow-hidden rounded-frame border border-[#242D5A] bg-[#0D122B]/90 shadow-2xl backdrop-blur-md">
              <div className="h-[3px] bg-gradient-to-r from-blue via-blue/40 to-transparent" aria-hidden />
              <div className="space-y-9 p-6 md:p-8">
                <Rail
                  eyebrow="Today"
                  stations={todayStations}
                  verdict="Weeks"
                  tone="muted"
                />
                <div className="border-t border-dashed border-white/15" aria-hidden />
                <Rail
                  eyebrow="With EIS"
                  stations={eisStations}
                  verdict="The same morning"
                  tone="ink"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={240}>
          <p className="mt-12 max-w-[26em] text-[24px] font-semibold leading-snug tracking-tight text-white md:text-[28px] lg:mt-14">
            Analytics was built to explain the past. It was never asked to help
            you decide.{" "}
            <span className="relative inline-block">
              EIS is where those two jobs meet.
              <span className="absolute -bottom-[0.04em] left-0 h-[0.09em] w-full rounded-full bg-blue-400" aria-hidden />
            </span>
          </p>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
