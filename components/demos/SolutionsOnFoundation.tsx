import Link from "next/link";
import { nameOrWordmark } from "@/components/icons/AkashicWordmark";
import SolutionIllustration from "@/components/demos/SolutionIllustration";
import type { HomeSolution, HomeSolutions } from "@/content/pages/home";

type Props = {
  blocks: HomeSolution[];
  modules: string[];
  foundation: HomeSolutions["foundation"];
};

/* The shared base belongs to every solution. No selection or module subsets. */
export default function SolutionsOnFoundation({ blocks, modules, foundation }: Props) {
  return (
    <div>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
        {blocks.map((block) => (
          <li key={block.id} className="relative min-w-0 lg:pb-12">
            <Link
              href={block.href}
              aria-labelledby={`home-solution-${block.id}`}
              className="group flex h-full flex-col rounded-outer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-blue sm:grid sm:grid-cols-2 sm:gap-6 lg:flex lg:gap-0"
            >
              <div className="flex h-[280px] items-center justify-center overflow-hidden border-y border-lineSoft bg-primary-bg sm:h-full sm:min-h-[280px] lg:h-[304px] lg:min-h-0">
                <SolutionIllustration kind={block.id} label={block.illustrationLabel} />
              </div>
              <div className="flex flex-1 flex-col px-1 pt-6 sm:py-4 lg:px-2 lg:pb-0 lg:pt-8">
                <p className="font-mono text-[11px] uppercase tracking-eyebrow text-secondary-text">{block.audience}</p>
                <h3 id={`home-solution-${block.id}`} className="mt-3 text-pretty font-heading text-[25px] font-semibold leading-[1.2] tracking-tight text-ink lg:min-h-[3.6em] lg:text-[28px] xl:min-h-[2.4em]">
                  {block.name}
                </h3>
                <p className="mt-4 max-w-[20em] text-pretty text-[16px] leading-relaxed text-secondary-text">{block.benefit}</p>
                <span className="mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-5 text-[14px] font-medium text-ink group-hover:text-blue group-focus-visible:text-blue lg:pt-6">
                  <span className="underline decoration-line underline-offset-[5px] group-hover:decoration-blue">{block.linkLabel}</span>
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-4 w-4 transition-transform duration-250 group-hover:translate-x-1 motion-reduce:!transform-none motion-reduce:transition-none" aria-hidden="true">
                    <path d="M3 10h13m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
            <span aria-hidden="true" className="absolute bottom-0 left-1/2 hidden h-6 w-px bg-line lg:block" />
          </li>
        ))}
      </ul>

      {/* The stems meet one continuous rail before entering the platform. */}
      <div aria-hidden="true" className="relative mx-auto hidden h-8 w-[calc((100%+2rem)/3*2)] border-t border-line lg:block">
        <span className="absolute left-1/2 top-0 h-full w-px bg-line" />
      </div>
      <div className="relative mt-10 rounded-outer border border-blue-border bg-depth px-5 py-6 lg:mt-0 lg:px-8 lg:py-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-10">
          <div className="shrink-0 text-[30px] font-semibold tracking-tight text-ink">
            {nameOrWordmark(foundation.name)}
          </div>
          <div className="lg:border-l lg:border-blue-border lg:pl-10">
            <p className="text-[17px] font-medium tracking-tight text-ink">{foundation.caption}</p>
            <p className="mt-1 text-pretty text-[14px] leading-relaxed text-secondary-text">{foundation.description}</p>
          </div>
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-blue-border pt-5 sm:grid-cols-3 lg:grid-cols-7 lg:gap-x-3">
          {modules.map((name) => (
            <li key={name} className="flex items-center gap-2 text-[12px] font-medium leading-relaxed text-ink lg:justify-center lg:text-center xl:text-[13px]">
              <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-blue lg:hidden" />
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
