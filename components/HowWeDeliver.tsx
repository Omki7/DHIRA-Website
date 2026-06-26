/**
 * DESIGN INTENT:
 * Section 06: How We Deliver.
 * Three clean non-overlapping zones — all fit in one desktop fold (~650px):
 *   Zone 1: Header row (headline left, CTA right — mirrors enterprise section pattern)
 *   Zone 2: Full-width avatar cloud band, radially masked — "our people" visual
 *   Zone 3: Three numbered step cards in a row
 * No negative-margin tricks. No text overlapping the people grid.
 * Real estate matches the Voices section.
 */
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    num: "01",
    title: "We assess where you stand.",
    desc: "A rigorous audit of your data maturity and operational readiness, identifying exactly where intervention is needed."
  },
  {
    num: "02",
    title: "We engineer what's missing.",
    desc: "Plugging the gaps with custom connectors and governance pipelines so your data is trustworthy from the source."
  },
  {
    num: "03",
    title: "We deliver proven solutions.",
    desc: "Deploying architectures that have already succeeded in your sector. One accountable partner, not a stack of vendors."
  }
];

export default function HowWeDeliver() {
  const COLUMNS = 32;
  const ROWS = 5;

  const avatars = Array.from({ length: COLUMNS * ROWS }).map((_, i) => {
    const rand = Math.sin(i * 13.3) * 10000;
    const n = rand - Math.floor(rand);
    const gender = n > 0.5 ? "men" : "women";
    const picId = Math.floor(n * 90);
    const opacity = 0.32 + n * 0.58;

    if (n < 0.1) {
      return (
        <div
          key={i}
          className="w-9 h-9 rounded-btn bg-[#F3F3F4] flex-shrink-0"
          style={{ opacity: opacity * 0.4 }}
        />
      );
    }

    return (
      <div
        key={i}
        className="w-9 h-9 rounded-btn overflow-hidden flex-shrink-0"
        style={{ opacity }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://randomuser.me/api/portraits/${gender}/${picId}.jpg`}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover grayscale opacity-65 mix-blend-multiply"
          loading="lazy"
        />
      </div>
    );
  });

  return (
    <section
      id="delivery"
      className="bg-white py-32 lg:py-40 overflow-hidden border-t border-lineSoft"
    >
      <div className="rail-container">

        {/* ── Zone 1: Header row ── */}
        <ScrollReveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-10 flex items-center gap-2 border-b border-dashed border-lineSoft pb-4 font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
                <span className="text-overcast">[04]</span>
                <span>/</span>
                <span>HOW WE DELIVER</span>
              </div>
              <h2 className="max-w-[14em] text-[48px] font-semibold leading-[1.1] tracking-tighter text-ink md:text-[56px] lg:text-[64px]">
                Live in weeks, not quarters.
              </h2>
              <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-inkSoft">
                The platform is the engine. Our people make it run in your world.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link href="#contact" className="btn-primary">
                Talk to Our Team
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Zone 2: Avatar Cloud ── clean band, no text on top */}
        <ScrollReveal delay={90}>
          <div
            className="mt-10 lg:mt-12 w-full overflow-hidden pointer-events-none select-none"
            style={{
              maskImage:
                "radial-gradient(ellipse 90% 78% at 50% 50%, black 22%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 90% 78% at 50% 50%, black 22%, transparent 100%)",
            }}
          >
            <div
              className="grid gap-2 justify-center"
              style={{ gridTemplateColumns: `repeat(${COLUMNS}, max-content)` }}
            >
              {avatars}
            </div>
          </div>
        </ScrollReveal>

        {/* ── Zone 3: Step Cards ── clearly below the cloud, no overlap */}
        <div className="mt-6 lg:mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step, idx) => (
            <ScrollReveal key={step.num} delay={200 + idx * 75}>
              <div className="bg-white rounded-card border border-[#EEEFF1] p-5 sm:p-6 flex flex-col hover:border-[#D9DADB] transition-colors duration-[250ms] ease-settle h-full">
                <div className="mb-2 font-mono text-sm font-semibold text-blue tracking-tight">
                  {step.num}
                </div>
                <h3 className="text-sm font-semibold text-ink tracking-tight mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-inkSoft leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
