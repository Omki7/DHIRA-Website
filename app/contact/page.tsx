import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/layout/ContactForm";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import { CONTACT_HERO, CONTACT_ROUTES, CONTACT_SECTIONS } from "@/lib/contactSections";
import { pageMetadata } from "@/lib/metadata";
import { SITE, mailto } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description: `${CONTACT_HERO.payoff} ${CONTACT_HERO.lede}`,
  path: "/contact",
});

const INDEX = CONTACT_SECTIONS.filter((section) => section.id !== "hero");
const pad = (n: number) => String(n).padStart(2, "0");
const label = "font-mono text-[11px] uppercase tracking-eyebrow text-overcast";

/* /contact: the sales form inline (the same form the modal opens), every
   other enquiry as a register row with its own route, and the three offices.
   The page's one soft blue band (Rule 5a) is the form. */
export default function ContactPage() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <PageHero label={CONTACT_HERO.label} setup={CONTACT_HERO.setup} payoff={CONTACT_HERO.payoff} lede={CONTACT_HERO.lede} index={INDEX} />

        <section
          id="write-to-us"
          className="scroll-mt-24 bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F5FE_12%,#F1F5FE_88%,#FFFFFF_100%)] pb-20 pt-16 lg:pb-28 lg:pt-20"
        >
          <ScrollRevealRail>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <SectionHeader
                  num="01"
                  label="Write to us"
                  setup="Sales, demos and first questions."
                  payoff="A reply from someone who read it."
                  lede="A few details are enough to get the right people in the room: a solutions architect, and the delivery lead for your sector."
                />
                <ScrollReveal delay={160}>
                  <ol className="mt-10 border-y border-dashed border-lineSoft">
                    {[
                      "You tell us the question you most need answered.",
                      "A solutions architect replies and sets up a 30-minute discovery.",
                      "We walk through Akashic on a problem like yours, then propose a first step.",
                    ].map((step, index) => (
                      <li key={step} className="grid grid-cols-[36px_1fr] gap-4 border-b border-dashed border-lineSoft py-4 last:border-b-0">
                        <span className="pt-[3px] font-mono text-[11px] tracking-eyebrow text-overcast">{pad(index + 1)}</span>
                        <span className="text-pretty text-[15px] leading-relaxed text-ink">{step}</span>
                      </li>
                    ))}
                  </ol>
                </ScrollReveal>
              </div>
              <ScrollReveal delay={120} className="lg:col-span-7">
                <div className="rounded-frame border border-subtle-stroke bg-background p-6 shadow-frame sm:p-8">
                  <ContactForm idPrefix="contact" />
                </div>
              </ScrollReveal>
            </div>
          </ScrollRevealRail>
        </section>

        <section id="routes" className="scroll-mt-24 bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
          <ScrollRevealRail>
            <SectionHeader num="02" label="Other enquiries" setup="Something else in mind?" payoff="Go straight to the right team." />
            <ScrollReveal delay={80}>
              <ul className="mt-12 border-t border-lineSoft lg:mt-16">
                {CONTACT_ROUTES.map((route, index) => (
                  <li key={route.name} className="grid gap-2 border-b border-lineSoft py-6 lg:grid-cols-[56px_minmax(0,14rem)_1fr_auto] lg:items-baseline lg:gap-8">
                    <span className="font-mono text-[11px] tracking-eyebrow text-overcast">{pad(index + 1)}</span>
                    <span className="text-[18px] font-semibold tracking-[-0.01em] text-ink">{route.name}</span>
                    <span className="text-pretty text-[15px] leading-relaxed text-secondary-text">{route.line}</span>
                    <Link
                      href={route.href}
                      className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-blue transition-colors duration-150 hover:text-blue-hover"
                    >
                      {route.cta}
                      <span aria-hidden className="transition-transform duration-250 ease-settle group-hover:translate-x-0.5">
                        &rarr;
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </ScrollRevealRail>
        </section>

        <section id="offices" className="scroll-mt-24 border-t border-lineSoft bg-background pb-24 pt-16 lg:pb-32 lg:pt-20">
          <ScrollRevealRail>
            <SectionHeader num="03" label="Offices" setup="Three offices." payoff="One team across time zones." />
            <ScrollReveal delay={80}>
              <ul className="mt-12 grid border-t border-ink/80 sm:grid-cols-3 lg:mt-16">
                {SITE.offices.map((office, index) => (
                  <li key={office.city} className={`border-b border-lineSoft py-8 sm:border-b-0 sm:pr-6 ${index > 0 ? "sm:border-l sm:pl-6" : ""}`}>
                    <p className={label}>
                      [{pad(index + 1)}]&nbsp;&nbsp;{office.region}
                    </p>
                    <p className="mt-4 text-[30px] font-semibold leading-none tracking-[-0.03em] text-ink">{office.city}</p>
                    <p className="mt-3 text-[15px] text-secondary-text">
                      {office.country}&nbsp;&nbsp;·&nbsp;&nbsp;{office.zone}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-10 border-t border-dashed border-lineSoft pt-5 text-[15px] text-secondary-text">
                General enquiries:{" "}
                <a href={mailto("General enquiry")} className="font-medium text-blue underline decoration-blue/30 underline-offset-[3px] hover:decoration-blue">
                  {SITE.email}
                </a>
              </p>
            </ScrollReveal>
          </ScrollRevealRail>
        </section>
      </main>
      <Footer />
    </>
  );
}
