import Link from "next/link";
import type { AboutHeroContent } from "@/content/pages/about";
import Image from "next/image";

export default function AboutHero({ content: ABOUT_HERO }: { content: AboutHeroContent }) {
  return (
    <section id="hero" aria-labelledby="about-mission" className="about-hero relative">

      <div className="about-shell relative">
        <div className="mx-auto max-w-[1200px] pb-12 pt-16 text-center sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28">
          <div>
            <p data-about-enter="0" className="font-mono text-[11px] font-medium uppercase tracking-eyebrow text-secondary-text">{ABOUT_HERO.label}</p>
            <h1 id="about-mission" className="mt-7 font-heading text-[clamp(28px,8.7vw,40px)] font-medium leading-[1.08] tracking-tighter sm:text-[48px] lg:text-[64px]">
              <span data-about-enter="90" className="block text-inkSoft">{ABOUT_HERO.setup}</span>
              <span data-about-enter="180" className="block text-ink">{ABOUT_HERO.headline}</span>
            </h1>
            <div data-about-enter="270" className="about-hero-description mx-auto mt-7 text-[17px] leading-[1.75] text-secondary-text sm:text-[18px]">
              <p>{ABOUT_HERO.description.split(/(?<=\.)\s+/).map((sentence, index) => <span key={sentence} className="lg:block">{index > 0 && " "}{sentence}</span>)}</p>
            </div>
            <div data-about-enter="350" className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href={ABOUT_HERO.primary.href} className="btn-primary">{ABOUT_HERO.primary.label}</Link>
              <Link href={ABOUT_HERO.secondary.href} className="btn-secondary gap-3">
                <span className="flex gap-1">
                  {ABOUT_HERO.peoplePreview.map((person) => <Image key={person.src} src={person.src} alt="" width={24} height={28} className="h-7 w-6 rounded-[2px] object-cover object-top grayscale" />)}
                </span>
                {ABOUT_HERO.secondary.label}
              </Link>
            </div>
          </div>
        </div>
        <dl className="mx-auto grid max-w-[1100px] grid-cols-1 overflow-hidden rounded-frame border border-subtle-stroke sm:grid-cols-3">
          {ABOUT_HERO.proof.map((proof, index) => (
            <div key={proof.label} data-about-reveal={index * 70} className={`flex items-center justify-center gap-5 px-4 py-6 sm:flex-col sm:gap-4 sm:py-9 ${index > 0 ? "border-t border-dashed border-lineSoft sm:border-l sm:border-t-0" : ""}`}>
              <dt className="order-2 max-w-[13rem] font-mono text-[11px] uppercase leading-relaxed tracking-[0.05em] text-secondary-text">{proof.label}</dt>
              <dd className="min-w-[7.5rem] whitespace-nowrap font-heading text-[28px] font-semibold leading-none tabular-nums tracking-tighter text-ink sm:min-w-0 sm:text-[32px]">{proof.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
