import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/ui/JsonLd";
import PageClose from "@/components/ui/PageClose";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import SubscribeForm from "@/components/ui/SubscribeForm";
import { EVENTS, EVENTS_HERO } from "@/lib/events";
import { pageMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/richText";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Events",
  description: `${EVENTS_HERO.payoff} ${EVENTS_HERO.lede}`,
  path: "/events",
});

const label = "font-mono text-[11px] uppercase tracking-eyebrow text-overcast";

/* /events: real events only, as register rows with a date column, then a
   sign-up for future invitations on the page's one soft blue band. The
   launch carries Event structured data. */
export default function EventsPage() {
  const launch = EVENTS.find((event) => event.date);
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        {launch && (
          <JsonLd
            data={{
              "@type": "Event",
              name: launch.title,
              description: launch.line,
              startDate: launch.date,
              eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
              eventStatus: "https://schema.org/EventScheduled",
              location: { "@type": "VirtualLocation", url: absoluteUrl("/events") },
              organizer: { "@type": "Organization", name: SITE.name, url: absoluteUrl("/") },
            }}
          />
        )}
        <PageHero label={EVENTS_HERO.label} setup={EVENTS_HERO.setup} payoff={EVENTS_HERO.payoff} lede={EVENTS_HERO.lede} />

        <section id="upcoming" className="scroll-mt-24 bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
          <ScrollRevealRail>
            <SectionHeader num="01" label="Upcoming" setup="What is next." payoff="And what you can book any day." />
            <ScrollReveal delay={80}>
              <ul className="mt-12 border-t border-lineSoft lg:mt-16">
                {EVENTS.map((event) => (
                  <li key={event.id} id={event.id} className="grid scroll-mt-28 gap-4 border-b border-lineSoft py-8 lg:grid-cols-12 lg:items-baseline lg:gap-10">
                    <div className="lg:col-span-3">
                      <p className="text-[26px] font-semibold leading-none tracking-[-0.03em] text-ink">
                        {event.date ? formatDate(event.date) : "Any weekday"}
                      </p>
                      <p className={`mt-2 ${label}`}>{event.format}</p>
                    </div>
                    <div className="lg:col-span-6">
                      <h3 className="text-balance text-[22px] font-semibold leading-snug tracking-[-0.02em] text-ink">{event.title}</h3>
                      <p className="mt-2 max-w-[40em] text-pretty text-[15px] leading-relaxed text-secondary-text">{event.line}</p>
                    </div>
                    <div className="lg:col-span-3 lg:text-right">
                      <Link href="#talk-to-our-team" className="btn-secondary">
                        {event.cta}
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </ScrollRevealRail>
        </section>

        <section
          id="invitations"
          className="scroll-mt-24 bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F5FE_16%,#F1F5FE_84%,#FFFFFF_100%)] pb-20 pt-16 lg:pb-28 lg:pt-20"
        >
          <ScrollRevealRail>
            <SectionHeader
              num="02"
              label="Invitations"
              setup="Hear about the next one."
              payoff="Invitations, by email."
              lede="Launches, briefings and recordings as they are published. No more than one email a month."
            >
              <SubscribeForm id="events-subscribe" cta="Get invitations" />
            </SectionHeader>
          </ScrollRevealRail>
        </section>

        <PageClose
          label="Talk to our team"
          setup="Prefer a session of your own?"
          payoff="We will build it around your data."
          body="Bring one priority use case. A solutions architect walks through Akashic on a problem like yours."
          primary={{ label: "Book a walkthrough", href: "#talk-to-our-team" }}
          secondary={{ label: "Read Insights", href: "/insights" }}
        />
      </main>
      <Footer />
    </>
  );
}
