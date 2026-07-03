import Link from "next/link";
import AkashicLogo from "@/components/icons/AkashicLogo";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function AkashicHero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-white" aria-hidden />

      <div className="rail-container relative border-x-0">
        <div className="flex min-h-[56vh] flex-col items-center justify-center pt-24 pb-20 text-center lg:pt-32 lg:pb-24">
          <ScrollReveal>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-subtle-stroke bg-white/95 px-3.5 py-1.5 text-xs shadow-sm backdrop-blur-md sm:text-sm">
              <span className="inline-flex items-center font-semibold text-primary-text">
                <AkashicLogo className="h-5 w-5" />
                <span className="-ml-1">kashic</span>
              </span>
              <span className="h-3.5 w-px bg-default-stroke" />
              <span className="font-medium text-secondary-text">The platform</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
              Grounded data <span className="text-overcast">&middot;</span> Trusted AI{" "}
              <span className="text-overcast">&middot;</span> Decisions you can defend
            </p>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <h1 className="mt-6 max-w-[13em] text-5xl font-semibold leading-[1.05] tracking-tightest text-primary-text md:text-6xl lg:text-7xl">
              The platform behind{" "}
              <span className="relative inline-block whitespace-nowrap">
                every answer
                <span
                  className="absolute -bottom-[0.06em] left-0 h-[0.08em] w-full rounded-full bg-blue/35"
                  aria-hidden
                />
              </span>{" "}
              DHIRA gives.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <p className="mt-8 max-w-[34em] text-lg font-normal leading-relaxed text-secondary-text md:text-xl">
              Wherever your data lives. One platform that keeps it current, connected,
              and ready the moment a decision needs it.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/#get-started" className="btn-primary">
                Talk to our team
              </Link>
              <Link href="/#sectors" className="btn-secondary">
                See it by sector
              </Link>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
