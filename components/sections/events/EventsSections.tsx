/*
 * /events: real events only, as register rows with a date column, then a
 * sign-up for future invitations on the page's one soft blue band
 * (Rule 5a). Copy: content/pages/events.ts; events:
 * content/collections/events.ts.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import SubscribeForm from "@/components/ui/SubscribeForm";
import type { DhiraEvent } from "@/content/collections/events";
import type { EventsPage } from "@/content/pages/events";
import { formatDate } from "@/lib/richText";

const label = "font-mono text-[11px] uppercase tracking-eyebrow text-overcast";

export function EventsUpcoming({ content: c, events }: { content: EventsPage["upcoming"]; events: DhiraEvent[] }) {
  return (
    <section id="upcoming" className="scroll-mt-24 bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
      <ScrollRevealRail>
        <SectionHeader num={c.num} label={c.label} setup={c.setup} payoff={c.payoff} />
        <ScrollReveal delay={80}>
          <ul className="mt-12 border-t border-lineSoft lg:mt-16">
            {events.map((event) => (
              <li key={event.id} id={event.id} className="grid scroll-mt-28 gap-4 border-b border-lineSoft py-8 lg:grid-cols-12 lg:items-baseline lg:gap-10">
                <div className="lg:col-span-3">
                  <p className="text-[26px] font-semibold leading-none tracking-[-0.03em] text-ink">{event.date ? formatDate(event.date) : c.standing}</p>
                  <p className={`mt-2 ${label}`}>{event.format}</p>
                </div>
                <div className="lg:col-span-6">
                  <h3 className="text-balance text-[22px] font-semibold leading-snug tracking-[-0.02em] text-ink">{event.title}</h3>
                  <p className="mt-2 max-w-[40em] text-pretty text-[15px] leading-relaxed text-secondary-text">{event.line}</p>
                </div>
                <div className="lg:col-span-3 lg:text-right">
                  <Link href={event.cta.href} className="btn-secondary">
                    {event.cta.label}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}

export function EventsInvitations({ content: c }: { content: EventsPage["invitations"] }) {
  return (
    <section
      id="invitations"
      className="scroll-mt-24 bg-band pb-20 pt-16 lg:pb-28 lg:pt-20"
    >
      <ScrollRevealRail>
        <SectionHeader num={c.num} label={c.label} setup={c.setup} payoff={c.payoff} lede={c.lede}>
          <SubscribeForm id="events-subscribe" cta={c.cta} />
        </SectionHeader>
      </ScrollRevealRail>
    </section>
  );
}
