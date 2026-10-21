import Link from "next/link";
import type { AboutHeroContent } from "@/content/pages/about";
import Image from "next/image";

export default function AboutHero({ content: ABOUT_HERO }: { content: AboutHeroContent }) {
  return (
    <section id="hero" aria-labelledby="about-mission" className="about-hero relative">

      <div className="about-shell relative">
        <div className="mx-auto max-w-[960px] pb-16 pt-20 text-center sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28">
          <div>
            <p data-about-enter="0" className="font-mono text-[11px] font-medium uppercase tracking-eyebrow text-secondary-text">{ABOUT_HERO.label}</p>
            <h1 id="about-mission" className="mt-7 font-heading text-[clamp(28px,8.7vw,40px)] font-semibold leading-[1.08] tracking-tighter sm:text-[60px] lg:text-[76px] xl:text-[84px]">
              <span data-about-enter="90" className="block text-inkSoft">{ABOUT_HERO.setup}</span>
              <span data-about-enter="180" className="block text-ink">{ABOUT_HERO.headline}</span>
            </h1>
            <div data-about-enter="270" className="about-hero-description mx-auto mt-7 text-[17px] leading-[1.75] text-secondary-text sm:text-[18px]">
              <p>{ABOUT_HERO.description.split(/(?<=\.)\s+/).map((sentence, index) => <span key={sentence} className="lg:block">{index > 0 && " "}{sentence}</span>)}</p>
            </div>
            <div data-about-enter="350" className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              <Link href={ABOUT_HERO.primary.href} className="btn-primary btn-lg gap-5">{ABOUT_HERO.primary.label} <span aria-hidden="true">↗</span></Link>
              <Link href={ABOUT_HERO.secondary.href} className="inline-flex min-h-11 items-center gap-3 text-sm font-medium text-ink underline decoration-line underline-offset-[6px] hover:decoration-ink">{ABOUT_HERO.secondary.label} <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
        <dl className="mx-auto grid max-w-[1000px] grid-cols-1 border-t border-ink/10 sm:grid-cols-3">
          {ABOUT_HERO.proof.map((proof, index) => (
            <div key={proof.label} data-about-reveal={index * 70} className={`flex items-center justify-center gap-5 py-5 sm:flex-col sm:gap-3 sm:py-8 ${index > 0 ? "border-t border-ink/10 sm:border-t-0" : ""}`}>
              <dt className="order-2 max-w-[12rem] text-[13px] leading-relaxed text-secondary-text">{proof.label}</dt>
              <dd className="min-w-[7.5rem] whitespace-nowrap font-heading text-[28px] font-medium leading-none tracking-tighter text-ink sm:min-w-0">{proof.value}</dd>
            </div>
          ))}
        </dl>
      <div className="about-hero-landscape" aria-hidden="true">
        <div className="about-landscape-plane"><Image src="/about-landscape.webp" alt="" fill priority sizes="(min-width: 1440px) 1344px, 100vw" className="object-cover object-center" /></div>
      </div>
      </div>
    </section>
  );
}
