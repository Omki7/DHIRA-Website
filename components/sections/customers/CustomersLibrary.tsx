/*
 * /customers [01]: every story as a full row, photograph beside the claim,
 * the two sourced figures under it, and the way into the story page. All
 * stories are on the page at once (no carousel: the EIS rule against
 * leaving most of a section unpublished). Photography is illustrative of
 * the sector, not a screenshot of the system. Data: lib/customerStories.ts.
 */

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Metric, Story } from "@/content/collections/customer-stories";
import type { CustomersPage } from "@/content/pages/customers";

export function MetricPair({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className="grid grid-cols-2 border-y border-lineSoft">
      {metrics.map((metric, index) => (
        <div key={metric.label} className={`py-5 ${index > 0 ? "border-l border-lineSoft pl-6" : "pr-6"}`}>
          <dt className="sr-only">{metric.label}</dt>
          <dd>
            <span className="block text-[34px] font-semibold leading-none tabular-nums tracking-[-0.035em] text-ink lg:text-[40px]">{metric.value}</span>
            <span className="mt-2.5 block font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{metric.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function CustomersLibrary({ content, stories: STORIES }: { content: CustomersPage["library"]; stories: Story[] }) {
  return (
    <section id="stories" className="scroll-mt-24 bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
      <ScrollRevealRail>
        <SectionHeader
          num={content.num}
          label={content.label}
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <div className="mt-12 border-t border-lineSoft lg:mt-16">
          {STORIES.map((story, index) => (
            <ScrollReveal key={story.id} delay={index * 40}>
              <article id={story.id} className="grid scroll-mt-28 gap-8 border-b border-lineSoft py-10 lg:grid-cols-12 lg:gap-12 lg:py-14">
                <Link href={`/customers/${story.id}`} className="group relative block aspect-[4/3] overflow-hidden rounded-frame bg-panel lg:col-span-5">
                  <Image
                    src={story.image}
                    alt={story.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-settle group-hover:scale-[1.02] motion-reduce:transition-none"
                  />
                </Link>
                <div className="flex flex-col lg:col-span-7">
                  <p className="font-mono text-[11px] uppercase tracking-eyebrow">
                    <span className="text-ink">{story.platform}</span>
                    <span className="text-overcast">&nbsp;&nbsp;·&nbsp;&nbsp;{story.authority}</span>
                  </p>
                  <h2 className="mt-4 text-balance text-[28px] font-medium leading-[1.15] tracking-[-0.02em] text-ink lg:text-[32px]">
                    <Link href={`/customers/${story.id}`} className="transition-colors duration-150 hover:text-blue">
                      {story.title}
                    </Link>
                  </h2>
                  <p className="mt-4 max-w-[40em] text-pretty text-[15px] leading-relaxed text-secondary-text">{story.description}</p>
                  <div className="mt-8">
                    <MetricPair metrics={story.metrics} />
                  </div>
                  <Link
                    href={`/customers/${story.id}`}
                    className="group mt-6 inline-flex items-center gap-1.5 self-start text-[15px] font-medium text-blue transition-colors duration-150 hover:text-blue-hover"
                  >
                    {content.readStory}
                    <span aria-hidden className="transition-transform duration-200 ease-settle group-hover:translate-x-0.5">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </ScrollRevealRail>
    </section>
  );
}
