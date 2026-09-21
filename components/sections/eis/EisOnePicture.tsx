"use client";

import { useState } from "react";
import EisAtmosphere from "@/components/ui/eis/EisAtmosphere";
import ScrollReveal from "@/components/ui/ScrollReveal";
import EisBrowserChromeMockup from "@/components/demos/mockups/EisBrowserChromeMockup";
import EisEstateScreenMockup from "@/components/demos/mockups/eis/EisEstateScreenMockup";
import EisSchemaMatrixMockup from "@/components/demos/mockups/eis/EisSchemaMatrixMockup";
import { DOMAINS } from "@/lib/eisDomains";

/* [one-picture] — the proof that the model is not built for one industry.
 *
 * The previous build carried TWO headlines about 700px apart ("One picture
 * of the whole organisation", then "Your estate, ranked by what needs you")
 * with only sub-copy between them, repeated the hero's switcher, chrome and
 * badged pillar tiles, and rendered the 01→05 loop rail here, which is the
 * next section's entire punchline. It ran to 1457px to say one thing.
 *
 * The one thing is now said properly. The section's unique contribution is
 * that the SCHEMA is industry-shaped, not just the data, and no single
 * industry view can demonstrate that. So the matrix (all four industries at
 * once, static, no interaction needed) settles the claim, and the live
 * estate screen below is the payoff rather than the argument.
 */

export default function EisOnePicture() {
  /* Its own switcher rather than one shared with the hero: sections are read
     independently, and a reader arriving from the minimap has not seen the
     hero's control. */
  const [domainKey, setDomainKey] = useState(DOMAINS[0].key);
  const domain = DOMAINS.find((d) => d.key === domainKey) ?? DOMAINS[0];

  return (
    <section id="one-picture" className="scroll-mt-24 bg-background pt-20 sm:pt-24 lg:pt-32">
      <div className="mx-auto max-w-[1180px] px-6">
        <ScrollReveal>
          <h2 className="max-w-[22ch] font-heading text-4xl font-medium leading-[1.05] tracking-tighter sm:text-5xl md:text-6xl">
            <span className="text-eis-body">The columns rebuild.</span>
            <br />
            <span className="text-eis-ink">Not just the numbers.</span>
          </h2>
          <p className="mt-5 max-w-[640px] text-balance text-base leading-[1.5] tracking-tight text-eis-body sm:mt-6 sm:text-lg">
            Every organisation runs on people and money. What changes is the
            unit you operate and the thing it produces. Two pillars are the
            same in every industry, and two of them are the industry.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={90}>
          <div className="mt-10 sm:mt-12">
            <EisSchemaMatrixMockup />
          </div>
        </ScrollReveal>
      </div>

      {/* The payoff: the estate running, in whichever world you pick. On a
          dusk band so the page has one dark breath between the white
          argument sections, and with no headline of its own. */}
      <div className="relative mt-16 overflow-hidden sm:mt-20">
        <EisAtmosphere variant="dusk" ridges={false} />

        <div className="relative z-10 px-6 pt-12 sm:pt-16">
          <div className="mx-auto max-w-[1180px]">
            <ScrollReveal>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-[480px] text-balance text-lg leading-tight text-white sm:text-xl">
                  Your whole estate, ranked by what needs you. Pick a row and it
                  resolves across all four pillars at once.
                </p>

                <div className="inline-flex flex-wrap gap-1 self-start rounded-full border border-white/25 bg-white/15 p-1 backdrop-blur-md sm:self-auto">
                  {DOMAINS.map((d) => (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => setDomainKey(d.key)}
                      aria-pressed={d.key === domainKey}
                      className={`rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-250 sm:px-4 ${
                        d.key === domainKey
                          ? "bg-white text-eis-ink"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {d.tab}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <div className="mt-8 overflow-hidden rounded-t-outer shadow-float-dark sm:mt-10">
              <EisBrowserChromeMockup url="akashic.dhira.ai/eis/estate">
                <EisEstateScreenMockup key={domain.key} domain={domain} />
              </EisBrowserChromeMockup>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
