import AkashicLogo from "@/components/icons/AkashicLogo";
import EisAtmosphere from "@/components/ui/eis/EisAtmosphere";
import EisPill from "@/components/ui/eis/EisPill";

/* [talk-to-our-team] — the close.
 *
 * Kept rather than rebuilt: the composition (mark left, claim right, on the
 * sky the page opened on) already works, and "bring the question you
 * currently cannot get answered by Friday" is the sharpest CTA line here.
 *
 * Two things were fixed. The section ran two paragraphs of equal weight
 * saying different things, one under the mark and one under the headline,
 * so neither led. And the left column was a logo with a small floating
 * caption under it, which left the strongest column on the page carrying
 * almost nothing. It now states what the session actually covers, in the
 * same plain terms as the "what do you need from us" answer in [questions]
 * rather than promising a demo.
 */

const SESSION = [
  "Your systems, named. What EIS would read on day one, and what it would not.",
  "One decision you cannot currently close, walked from signal to write-back.",
  "What write-back would need from the people who own those systems.",
];

export default function EisClose() {
  return (
    <section id="talk-to-our-team" className="relative scroll-mt-24 overflow-hidden">
      {/* The page opened on a sky and closes on one. Ridges stay off: this
          slab is a horizon, not a landscape, and the mark below needs a
          clean ground to sit on. */}
      <EisAtmosphere variant="dusk" ridges={false} />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-12 gap-6 pb-12 pt-16 lg:pb-16 lg:pt-24">
          <div className="col-span-12 flex items-start md:col-span-5">
            <AkashicLogo
              className="h-auto w-full max-w-[240px] text-white md:max-w-[420px] lg:max-w-[520px]"
              primaryColor="#FFFFFF"
              accentColor="rgba(255,255,255,0.55)"
            />
          </div>

          <div className="col-span-12 flex items-start md:col-span-7 md:justify-end">
            <h2 className="font-heading text-4xl font-medium leading-[1.05] tracking-tighter text-white sm:text-5xl md:text-right md:text-6xl lg:text-7xl">
              See it with
              <br />
              your own numbers.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-6 gap-y-10 pb-16 lg:pb-24">
          <div className="col-span-12 md:col-span-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">
              Thirty minutes, on a dataset shaped like yours
            </p>
            <ul className="mt-4 space-y-3">
              {SESSION.map((s) => (
                <li key={s} className="flex gap-3">
                  <span
                    className="mt-[7px] h-[5px] w-[5px] flex-shrink-0 rounded-full bg-white/50"
                    aria-hidden
                  />
                  <span className="max-w-[38ch] text-[15px] leading-snug text-white/85">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-7 md:flex md:justify-end">
            <div className="md:text-right">
              <p className="max-w-md text-lg leading-snug text-white md:ml-auto">
                Bring the question you currently cannot get answered by Friday.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 md:justify-end">
                <EisPill href="#talk-to-our-team">Talk to our team</EisPill>
                <EisPill href="/akashic" tone="ghost">
                  See the Akashic platform
                </EisPill>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
