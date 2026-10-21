/*
 * /newsroom [01] to [03]: announcements as register rows, recognition as a
 * dated register, and the media kit on the page's one soft blue band
 * (Rule 5a): marks with real downloads, the boilerplate, leadership with
 * portrait downloads, colours and type. Copy: lib/newsroom.ts.
 */

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Leader } from "@/content/collections/leaders";
import type { PressRelease } from "@/content/collections/press-releases";
import type { NewsroomPage } from "@/content/pages/newsroom";
import { formatDate } from "@/lib/richText";

const pad = (n: number) => String(n).padStart(2, "0");
const label = "font-mono text-[11px] uppercase tracking-eyebrow text-overcast";
const download =
  "group inline-flex items-center gap-1.5 text-[14px] font-medium text-blue transition-colors duration-150 hover:text-blue-hover";

export function NewsroomAnnouncements({ content, releases }: { content: NewsroomPage["announcements"]; releases: PressRelease[] }) {
  return (
    <section id="announcements" className="scroll-mt-24 bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
      <ScrollRevealRail>
        <SectionHeader
          num={content.num}
          label={content.label}
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />
        <ScrollReveal delay={80}>
          <ul className="mt-12 border-t border-lineSoft lg:mt-16">
            {releases.map((release) => (
              <li key={release.slug}>
                <Link href={`/newsroom/${release.slug}`} className="group grid gap-3 border-b border-lineSoft py-8 lg:grid-cols-12 lg:gap-10">
                  <span className={`${label} lg:col-span-3`}>
                    <span className="block text-blue">{content.kind}</span>
                    <span className="block">{formatDate(release.date)}</span>
                  </span>
                  <span className="lg:col-span-8">
                    <span className="block text-balance text-[24px] font-semibold leading-snug tracking-[-0.02em] text-ink transition-colors duration-150 group-hover:text-blue">
                      {release.title}
                    </span>
                    <span className="mt-2 block max-w-[44em] text-pretty text-[15px] leading-relaxed text-secondary-text">{release.dek}</span>
                  </span>
                  <span aria-hidden className="hidden text-right text-overcast transition-transform duration-250 ease-settle group-hover:translate-x-0.5 group-hover:text-blue lg:col-span-1 lg:block">
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}

export function NewsroomRecognition({ content: RECOGNITION }: { content: NewsroomPage["recognition"] }) {
  return (
    <section id="recognition" className="scroll-mt-24 border-t border-lineSoft bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
      <ScrollRevealRail>
        <SectionHeader num="02" label={RECOGNITION.label} setup={RECOGNITION.setup} payoff={RECOGNITION.payoff} />
        <ScrollReveal delay={80}>
          <ul className="mt-12 grid border-t border-ink/80 lg:mt-16 lg:grid-cols-3">
            {RECOGNITION.items.map((item, index) => (
              <li key={item.name} className={`border-b border-lineSoft py-8 lg:border-b-0 lg:pr-8 ${index > 0 ? "lg:border-l lg:pl-8" : ""}`}>
                <p className={label}>[{pad(index + 1)}]&nbsp;&nbsp;{item.year || "Recognised"}</p>
                <p className="mt-4 text-[26px] font-semibold leading-tight tracking-[-0.02em] text-ink">{item.name}</p>
                <p className="mt-2 text-[15px] text-secondary-text">{item.detail}</p>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}

export function NewsroomMediaKit({
  content: MEDIA_KIT,
  boilerplate: BOILERPLATE,
  leaders: ABOUT_LEADERS,
}: {
  content: NewsroomPage["mediaKit"];
  boilerplate: string;
  leaders: Leader[];
}) {
  return (
    <section
      id="media-kit"
      className="scroll-mt-24 bg-band pb-20 pt-16 lg:pb-28 lg:pt-20"
    >
      <ScrollRevealRail>
        <SectionHeader num="03" label={MEDIA_KIT.label} setup={MEDIA_KIT.setup} payoff={MEDIA_KIT.payoff} lede={MEDIA_KIT.lede} />

        <ScrollReveal delay={80}>
          <h3 className={`mt-12 lg:mt-16 ${label}`}>{MEDIA_KIT.labels.marks}</h3>
          <ul className="mt-4 grid gap-6 border-t border-lineSoft pt-6 sm:grid-cols-3">
            {MEDIA_KIT.logos.map((logo) => (
              <li key={logo.file}>
                <div className="flex aspect-[16/10] items-center justify-center rounded-frame border border-subtle-stroke bg-background">
                  {/* eslint-disable-next-line @next/next/no-img-element -- an SVG download shown as itself */}
                  <img src={logo.file} alt={logo.name} className={`h-28 w-28 rounded-tile p-6 ${logo.dark ? "bg-scrim" : "bg-[rgb(var(--logo-paper))]"}`} />
                </div>
                <p className="mt-3 text-[15px] font-medium text-ink">{logo.name}</p>
                <p className="mt-0.5 text-[13px] text-secondary-text">{logo.note}</p>
                <a href={logo.file} download className={`${download} mt-2`}>
                  {MEDIA_KIT.labels.download}
                  <span aria-hidden className="transition-transform duration-250 ease-settle group-hover:translate-y-0.5">
                    &darr;
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="mt-16 grid gap-10 border-t border-lineSoft pt-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h3 className={label}>{MEDIA_KIT.labels.boilerplate}</h3>
              <p className="mt-4 max-w-[40em] text-pretty text-[17px] leading-relaxed text-ink">{BOILERPLATE}</p>
            </div>
            <div className="lg:col-span-5">
              <h3 className={label}>{MEDIA_KIT.labels.colours}</h3>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4">
                {MEDIA_KIT.colours.map((colour) => (
                  <li key={colour.value} className="flex items-center gap-3">
                    <span aria-hidden className="h-8 w-8 shrink-0 rounded-tile border border-subtle-stroke" style={{ background: colour.value }} />
                    <span>
                      <span className="block text-[14px] font-medium text-ink">{colour.name}</span>
                      <span className="block font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{colour.value}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[14px] text-secondary-text">
                {MEDIA_KIT.labels.typeface} <span className="text-ink">{MEDIA_KIT.typeface}</span>
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h3 className={`mt-16 ${label}`}>{MEDIA_KIT.labels.leadership}</h3>
          <ul className="mt-4 grid gap-6 border-t border-lineSoft pt-6 sm:grid-cols-3 lg:grid-cols-5">
            {ABOUT_LEADERS.map((leader) => (
              <li key={leader.id}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-frame bg-panel">
                  <Image src={leader.image} alt={leader.name} fill sizes="(min-width: 1024px) 18vw, 45vw" className={`object-cover grayscale ${leader.imageClass}`} />
                </div>
                <p className="mt-3 text-[15px] font-medium text-ink">{leader.name}</p>
                <p className="mt-0.5 text-[13px] text-secondary-text">{leader.role}</p>
                <a href={leader.image} download className={`${download} mt-2`}>
                  {MEDIA_KIT.labels.portrait}
                  <span aria-hidden className="transition-transform duration-250 ease-settle group-hover:translate-y-0.5">
                    &darr;
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
