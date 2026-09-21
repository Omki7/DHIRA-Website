/*
 * Careers, demoted to a strip (23 Jul 2026, homepage pacing pass).
 *
 * This replaced JoinTheTeam on the homepage. That section ran 1.59 screens —
 * larger than Proven at Scale, larger than Governance, larger than Every
 * Sector — to show a four-role job board with department filter pills. On a
 * page whose job is to convert a buyer it was the second-biggest thing on the
 * site, and it swapped the audience from buyer to candidate in the two screens
 * before the close. The full board still exists, on /careers, which is where
 * a candidate is going anyway.
 *
 * Deliberately UNNUMBERED and with no eyebrow: every real section on this page
 * opens `[NN]  LABEL`, and giving a strip one would put it back in the table
 * of contents this change exists to take it out of. It is also out of
 * HOME_SECTIONS for the same reason — the minimap rail lists stops, and this
 * is not a stop.
 *
 * JoinTheTeam.tsx is left in the tree untouched: /about and /careers both
 * reference it in their own comments as the pattern they were derived from.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import FlyingEagleSketch from "@/components/icons/FlyingEagleSketch";

export default function CareersStrip() {
  return (
    <section
      id="careers"
      aria-labelledby="careers-h"
      className="relative overflow-hidden bg-[#FAFAF9] py-10 lg:py-12"
    >
      {/* Warm ambient — the section's one carry-over from the full board. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(215,155,60,0.08), transparent 70%)" }}
      />

      <ScrollRevealRail className="relative z-10">
        <ScrollReveal>
          <div className="flex flex-col gap-7 border-y border-dashed border-lineSoft py-9 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="flex items-center gap-5 sm:gap-7">
              <FlyingEagleSketch
                className="hidden h-16 w-24 shrink-0 text-ink/85 sm:block"
                aria-hidden="true"
              />
              <div className="min-w-0">
                {/* Live hiring indicator — the old section's signature, kept
                    because it is the one thing here that has to feel current. */}
                <span className="mb-2 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-50"
                      style={{ animationDuration: "2.4s" }}
                    />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
                  </span>
                  <span className="font-mono text-[11px] font-medium uppercase tracking-eyebrow text-blue">
                    Now hiring
                  </span>
                </span>

                <h2
                  id="careers-h"
                  className="text-[22px] font-semibold leading-tight tracking-tight text-ink sm:text-[26px]"
                >
                  Join us in building India&apos;s intelligence&nbsp;layer.
                </h2>

                <p className="mt-1.5 text-[14.5px] leading-relaxed text-inkSoft sm:text-[15px]">
                  Engineering, machine learning, product and delivery.
                  <span className="hidden sm:inline">
                    {" "}
                    New York · Hyderabad · Bangalore · Remote.
                  </span>
                </p>
              </div>
            </div>

            <Link href="/careers" className="btn-secondary shrink-0 self-start lg:self-auto">
              Explore open roles
            </Link>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
