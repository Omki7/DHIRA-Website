import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageMinimap from "@/components/layout/PageMinimap";
import PageClose from "@/components/ui/PageClose";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import { pageMetadata } from "@/lib/metadata";
import { PARTNERS_HERO, PARTNERS_SECTIONS, PARTNER_BENEFITS, PARTNER_STEPS, PARTNER_TYPES } from "@/lib/partnersSections";
import { mailto } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Partners",
  description: `${PARTNERS_HERO.payoff} ${PARTNERS_HERO.lede}`,
  path: "/partners",
});

const INDEX = PARTNERS_SECTIONS.filter((section) => section.id !== "hero");
const pad = (n: number) => String(n).padStart(2, "0");

/* /partners: four ways to partner as hairline columns, what partners get as
   a numbered register, how to join as four stations on the page's one soft
   blue band (Rule 5a), then the application close. Copy is DRAFT
   (lib/partnersSections.ts); no partner is named until one is confirmed. */
export default function PartnersPage() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <PageHero label={PARTNERS_HERO.label} setup={PARTNERS_HERO.setup} payoff={PARTNERS_HERO.payoff} lede={PARTNERS_HERO.lede} index={INDEX} />

        <section id="ways-to-partner" className="scroll-mt-24 bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
          <ScrollRevealRail>
            <SectionHeader
              num="01"
              label="Ways to partner"
              setup="Four ways in."
              payoff="One platform under all of them."
              lede="Implement it, connect to it, run it under your brand or carry it to your market."
            />
            <div className="mt-12 grid border-t border-ink/80 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
              {PARTNER_TYPES.map((type, index) => (
                <ScrollReveal
                  key={type.name}
                  delay={index * 60}
                  className={`border-b border-lineSoft py-8 sm:pr-6 lg:border-b-0 ${["", "sm:border-l sm:pl-6", "lg:border-l lg:pl-6", "sm:border-l sm:pl-6"][index]}`}
                >
                  <p className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">[{pad(index + 1)}]</p>
                  <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.02em] text-ink">{type.name}</h3>
                  <p className="mt-3 text-pretty text-[15px] leading-relaxed text-secondary-text">{type.line}</p>
                </ScrollReveal>
              ))}
            </div>
          </ScrollRevealRail>
        </section>

        <section id="what-partners-get" className="scroll-mt-24 border-t border-lineSoft bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
          <ScrollRevealRail>
            <SectionHeader num="02" label="What partners get" setup="Everything to deliver well." payoff="And to be paid for it." />
            <ScrollReveal delay={80}>
              <ol className="mt-12 grid border-t border-lineSoft md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-16">
                {PARTNER_BENEFITS.map((benefit, index) => (
                  <li key={benefit.title} className="grid grid-cols-[44px_1fr] gap-4 border-b border-lineSoft py-6">
                    <span className="pt-[5px] font-mono text-[11px] tracking-eyebrow text-overcast">{pad(index + 1)}</span>
                    <span>
                      <span className="block text-[18px] font-semibold leading-snug tracking-[-0.01em] text-ink">{benefit.title}</span>
                      <span className="mt-1.5 block text-pretty text-[15px] leading-relaxed text-secondary-text">{benefit.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </ScrollRevealRail>
        </section>

        <section
          id="how-to-join"
          className="scroll-mt-24 bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F5FE_16%,#F1F5FE_84%,#FFFFFF_100%)] pb-20 pt-16 lg:pb-28 lg:pt-20"
        >
          <ScrollRevealRail>
            <SectionHeader num="03" label="How to join" setup="Four steps." payoff="From application to first deployment." />
            <ScrollReveal delay={80}>
              <ol className="mt-12 grid border-t border-ink/80 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
                {PARTNER_STEPS.map((step, index) => (
                  <li key={step.title} className={`border-b border-lineSoft py-8 sm:pr-6 lg:border-b-0 ${["", "sm:border-l sm:pl-6", "lg:border-l lg:pl-6", "sm:border-l sm:pl-6"][index]}`}>
                    <p className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">[{pad(index + 1)}]</p>
                    <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.02em] text-ink">{step.title}</h3>
                    <p className="mt-3 text-pretty text-[15px] leading-relaxed text-secondary-text">{step.text}</p>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </ScrollRevealRail>
        </section>

        <PageClose
          label="Become a partner"
          setup="Bring Akashic to your clients."
          payoff="Start with one conversation."
          body="Tell us about your practice and the clients you serve. A partner manager replies with next steps."
          primary={{ label: "Apply to partner", href: mailto("Partnership application") }}
          secondary={{ label: "See how we deliver", href: "/delivery" }}
        />
      </main>
      <Footer />
      <PageMinimap sections={PARTNERS_SECTIONS} aria-label="Partners page sections" />
    </>
  );
}
