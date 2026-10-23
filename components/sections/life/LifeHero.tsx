import Link from "next/link";
import LifeVisitPhoto from "@/components/demos/life/LifeVisitPhoto";
import { LifePill } from "@/components/ui/life/LifeChrome";
import type { LifePage } from "@/content/pages/solutions-life";
import AkashicWordmark from "@/components/icons/AkashicWordmark";

export default function LifeHero({ content }: { content: LifePage["hero"] }) {
  return (
    <section id="hero" className="relative isolate overflow-hidden bg-life-abyss">
      


      

      
      <div
        className="pointer-events-none absolute bottom-20 right-10 top-20 hidden w-[40%] overflow-hidden rounded-frame border border-life-line lg:block xl:right-14"
        aria-hidden
      >
        <LifeVisitPhoto className="h-full w-full" />
      </div>

      
      

      

      
      
      
      

      <div className="relative mx-auto flex min-h-[calc(100vh-65px)] w-full max-w-[1440px] flex-col justify-center px-6 py-24 sm:px-10 lg:px-14 lg:py-28">
        <div className="max-w-[36rem] lg:max-w-[51%]">
          
          <figure className="inline-flex items-center gap-2.5 rounded-full border border-line bg-tertiary-bg px-3.5 py-1.5 text-xs  sm:text-[13px]">
            <span className="font-medium text-ink">{content.badge.product}</span>
            <span className="h-3.5 w-px bg-tertiary-bg" aria-hidden />
            {/* "Built on Akashic": the name is the wordmark (21 Oct 2026). */}
            <span className="inline-flex items-center gap-[0.3em] font-medium text-life-mist">
              {content.badge.platform.replace(/\s*Akashic$/, "")}
              {content.badge.platform.endsWith("Akashic") && <AkashicWordmark accentColor="rgb(var(--life-cyan))" />}
            </span>
          </figure>

          <h1 className="mt-9 text-[38px] font-medium leading-[1.2] tracking-[-0.005em] text-ink sm:text-[46px] lg:text-[54px] xl:text-[58px]">
            {content.title}
          </h1>

          <p className="mt-8 max-w-[33em] text-[16.5px] leading-[1.62] text-secondary-text lg:text-[17px]">
            {content.lede}
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-3.5">
            <LifePill href={content.primary.href}>{content.primary.label}</LifePill>
            <LifePill href={content.secondary.href} variant="ghost">
              {content.secondary.label}
            </LifePill>
          </div>
        </div>
      </div>

      
      <Link
        href="#the-gap"
        aria-label={content.skipLabel}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-inkSoft transition-colors duration-200 ease-settle hover:text-secondary-text lg:block"
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
