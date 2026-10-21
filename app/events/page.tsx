import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import { EventsInvitations, EventsUpcoming } from "@/components/sections/events/EventsSections";
import JsonLd from "@/components/ui/JsonLd";
import PageClose from "@/components/ui/PageClose";
import PageHero from "@/components/ui/PageHero";
import { getEvents, getPage, getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("events");
  return pageMetadata(seo);
}

/* The dated event (the launch) carries Event structured data. */
export default async function EventsPage() {
  const [page, events, site] = await Promise.all([getPage("events"), getEvents(), getSiteSettings()]);
  const { hero } = page;
  const launch = events.find((event) => event.date);
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        {launch?.date && (
          <JsonLd
            data={{
              "@type": "Event",
              name: launch.title,
              description: launch.line,
              startDate: launch.date,
              eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
              eventStatus: "https://schema.org/EventScheduled",
              location: { "@type": "VirtualLocation", url: absoluteUrl(page.seo.path) },
              organizer: { "@type": "Organization", name: site.name, url: absoluteUrl("/") },
            }}
          />
        )}
        <PageHero label={hero.label} setup={hero.setup} payoff={hero.payoff} lede={hero.lede} />
        <EventsUpcoming content={page.upcoming} events={events} />
        <EventsInvitations content={page.invitations} />
        <PageClose {...page.close} />
      </main>
      <Footer />
    </>
  );
}
