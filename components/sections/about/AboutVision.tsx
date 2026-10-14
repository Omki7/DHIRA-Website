"use client";

/*
 * [03] Vision: "The ambition: intelligence as public infrastructure."
 *
 * Intent: the ambition, drawn honestly, and for any government. Until
 * 23 Sep 2026 this read "India's intelligence layer", which told a US, UK
 * or EU buyer the ambition was not about them. The ambition is now public
 * systems anywhere; India is the proof (three live national programmes),
 * not the destination. `SiloLayer` labels every system by public function
 * and runs one layer across them: solid over the three programmes where
 * DHIRA built it (tagged India), dashed everywhere else. The
 * three commitments below are the drawing's legend, each keyed to the mark it
 * explains (the ground, the drop, the layer), so they read as parts of one
 * picture rather than a row of three generic columns.
 *
 * Ground: `depth`, the page's one dark section (Rule 5: blue-black, never
 * neutral). It is the page's turn from what DHIRA is to what it wants to be.
 */

import SiloLayer, { DEPLOYMENTS } from "@/components/demos/about/SiloLayer";
import { AboutHeading } from "@/components/sections/about/AboutSection";
import SectionCoda from "@/components/ui/SectionCoda";
import { ABOUT_STORY } from "@/lib/aboutContent";

const LEGEND = [
  {
    title: "Sovereign by design",
    caption: "Runs in-country, in your cloud or your data centre.",
    glyph: (
      <>
        <line x1="2" x2="38" y1="14" y2="14" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="1.2" />
        {[6, 14, 22, 30, 38].map((x) => (
          <line key={x} x1={x} x2={x - 5} y1="15" y2="20" stroke="#FFFFFF" strokeOpacity="0.3" />
        ))}
      </>
    ),
  },
  {
    title: "Proven, then extended",
    caption: "Every connection starts inside a live programme.",
    glyph: (
      <>
        <line x1="20" x2="20" y1="2" y2="14" stroke="#8AA8FB" strokeWidth="1.5" />
        <path d="M11 22L11 14L29 14L29 22" fill="none" stroke="#8AA8FB" strokeWidth="1.4" />
        <circle cx="20" cy="3" r="2.5" fill="#8AA8FB" />
      </>
    ),
  },
  {
    title: "Better with every join",
    caption: "Each system joined serves citizens better.",
    glyph: (
      <>
        <line x1="2" x2="16" y1="11" y2="11" stroke="#8AA8FB" strokeWidth="3" strokeLinecap="round" />
        <line x1="20" x2="38" y1="11" y2="11" stroke="#8AA8FB" strokeOpacity="0.6" strokeWidth="1.2" strokeDasharray="3 4" />
      </>
    ),
  },
];

export default function AboutVision() {
  const content = ABOUT_STORY.vision;
  return (
    <section id="vision" className="scroll-mt-24 bg-depth pt-12 pb-20 text-uc-text lg:pt-16 lg:pb-24">
      <div className="about-shell">
        <AboutHeading number="03" label={content.label} setup={content.setup} title={content.title} intro={content.intro} dark />

        <div data-about-reveal="100">
          <div className="mt-12 lg:mt-14">
            <SiloLayer />
          </div>

          {/* Below lg: the three built drops, listed (the labels under the
              ground collide at tablet widths) */}
          <ul className="mt-6 space-y-3 lg:hidden">
            {DEPLOYMENTS.map((d) => (
              <li key={d.at} className="flex gap-3">
                <span className="mt-[5px] h-2 w-2 shrink-0 rounded-full bg-blue-400" aria-hidden />
                <span className="font-mono text-[11px] uppercase leading-[1.6] tracking-[0.08em] text-uc-text">
                  {d.name}
                  <span className="block text-blue-300">{d.figure}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <dl className="mt-10 grid grid-cols-1 gap-8 border-t border-white/10 pt-7 md:grid-cols-3 md:gap-10">
            {LEGEND.map((item, index) => (
              <div key={item.title} data-about-reveal={index * 70} className="flex gap-4">
                <svg viewBox="0 0 40 24" className="mt-1 h-6 w-10 shrink-0" aria-hidden>
                  {item.glyph}
                </svg>
                <div>
                  <dt className="text-[17px] font-semibold tracking-tight text-uc-text">{item.title}</dt>
                  <dd className="mt-1.5 text-[15px] leading-relaxed text-uc-mute">{item.caption}</dd>
                </div>
              </div>
            ))}
          </dl>
          <SectionCoda
            dark
            className="mt-8 sm:hidden"
            lead="Solid: live today, India."
            payoff={<span className="text-blue-300">Dashed: any jurisdiction.</span>}
          />
        </div>
      </div>
    </section>
  );
}
