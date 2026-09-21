/*
 * [00] Hero — the intelligence layer for care that cannot wait.
 *
 * Rebuilt 23 Jul 2026. The first pass copied the reference's asymmetry
 * literally: headline top-left, paragraph floating low-right, one capsule.
 * That composition only holds up over a full-bleed photograph, which anchors
 * the paragraph and fills the lower-left. Over a line drawing that dissolves,
 * the paragraph had nothing under it and a quarter of the frame was empty
 * navy, which is what read as odd.
 *
 * So: a left stack (badge, headline, paragraph, buttons) with the figure
 * owning the right. That is the site's own sub-page hero skeleton wearing
 * this page's skin, and it fixes the hole without giving up the reference.
 *
 * Three deliberate carry-overs from the rest of the site: the Akashic badge
 * every DHIRA hero opens with, a pair of CTAs rather than one, and a headline
 * that still runs at weight 500 on near-normal tracking because that is what
 * this page is.
 */

import Link from "next/link";
import AkashicLogo from "@/components/icons/AkashicLogo";
import LifeVisitPhoto from "@/components/demos/life/LifeVisitPhoto";
import { LifePill } from "@/components/ui/life/LifeChrome";

export default function LifeHero() {
  return (
    <section id="hero" className="relative isolate overflow-hidden bg-life-abyss">
      {/* Ground: deep at the edges, opening toward the source on the right. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_130%_at_78%_26%,#12356F_0%,#0B1E4E_40%,#0A0E24_76%)]"
      />

      {/* LAYER ORDER MATTERS, bottom to top: photograph, then the wavefront
          over it, then the glow, then the left scrim that guarantees the
          type's contrast. Put the photograph last and it paints over its own
          scrim and the headline goes unreadable. */}

      {/* The subject: the visit itself. Occupies the right of the frame and
          bleeds off it, so the hero is a scene the type sits in rather than a
          panel beside a picture. Dropped below md, where there is no room for
          it and the hero is type only. */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] md:block lg:w-[56%]"
        aria-hidden
      >
        <LifeVisitPhoto className="h-full w-full" />
      </div>

      {/* The wavefront, riding over the photograph so the reading being taken
          in it is visibly the source of the signal. */}
      <div aria-hidden className="alife-wavefield absolute inset-0 hidden opacity-40 md:block" />

      <div
        aria-hidden
        className="alife-aurora absolute bottom-0 left-[72%] hidden h-[560px] w-[680px] -translate-x-1/2 translate-y-1/3 rounded-full bg-[#0096C7]/25 md:block"
      />

      {/* Left scrim. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,#0A0E24_0%,rgba(10,14,36,0.86)_20%,rgba(10,14,36,0.34)_40%,transparent_62%)]"
      />
      {/* Seam into the next section. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent_0%,rgba(10,14,36,0.7)_62%,#0A0E24_100%)]"
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-65px)] w-full max-w-[1440px] flex-col justify-center px-6 py-24 sm:px-10 lg:px-14 lg:py-28">
        <div className="max-w-[36rem] lg:max-w-[40rem]">
          {/* The badge every other DHIRA hero opens with, in this page's
              register. It is also the claim the page has to make in its first
              second: this is not a village app, it is Akashic. */}
          <figure className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.18] bg-white/[0.06] px-3.5 py-1.5 text-xs backdrop-blur-md sm:text-[13px]">
            <span className="font-medium text-white">Akashic Life</span>
            <span className="h-3.5 w-px bg-white/20" aria-hidden />
            <span className="inline-flex items-center gap-1 font-medium text-life-mist">
              <AkashicLogo className="h-[17px] w-[17px]" accentColor="#48CAE4" />
              Built on Akashic
            </span>
          </figure>

          <h1 className="mt-9 text-[38px] font-medium leading-[1.2] tracking-[-0.005em] text-white sm:text-[46px] lg:text-[54px] xl:text-[58px]">
            The intelligence layer for care that cannot wait.
          </h1>

          <p className="mt-8 max-w-[33em] text-[16.5px] leading-[1.62] text-white/80 lg:text-[17px]">
            Akashic Life puts specialist-grade risk detection in the hands of a
            frontline health worker, on a basic phone, with no signal. A mother
            is screened where she is, and the district hospital knows before the
            ambulance starts its engine.
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-3.5">
            <LifePill href="#talk-to-our-team">Talk to our team</LifePill>
            <LifePill href="#the-solution" variant="ghost">
              See how it works
            </LifePill>
          </div>
        </div>
      </div>

      {/* Anchors the eye to the fold without competing with the buttons. */}
      <Link
        href="#the-gap"
        aria-label="Skip to the problem"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-white/35 transition-colors duration-250 ease-settle hover:text-white/80 lg:block"
      >
        <svg width="20" height="26" viewBox="0 0 20 26" fill="none" aria-hidden>
          <path
            d="M10 4v16M4.5 14.5 10 20.5l5.5-6"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </section>
  );
}
