/*
 * "Keep reading" under a long-form page: two or three register rows linking
 * on, in the Insights hub row grammar.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { getUiStrings } from "@/lib/content";

export type RelatedItem = { href: string; eyebrow: string; title: string; dek: string };

/** `heading` defaults to the interface string "Keep reading". */
export default async function RelatedList({ heading, items }: { heading?: string; items: RelatedItem[] }) {
  if (items.length === 0) return null;
  const ui = await getUiStrings();
  return (
    <section aria-labelledby="related-heading" className="border-t border-lineSoft bg-background pb-16 pt-12 lg:pb-20 lg:pt-14">
      <ScrollRevealRail>
        <ScrollReveal>
          <h2 id="related-heading" className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">
            {heading ?? ui.longform.keepReading}
          </h2>
          <ul className={`mt-4 grid border-t border-lineSoft ${items.length > 2 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
            {items.map((item, index) => (
              <li key={item.href} className={`border-b border-lineSoft lg:border-b-0 ${index > 0 ? "lg:border-l lg:pl-8" : ""} lg:pr-8`}>
                <Link href={item.href} className="group block py-7">
                  <span className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{item.eyebrow}</span>
                  <span className="mt-3 block text-balance text-[20px] font-semibold leading-snug tracking-[-0.02em] text-ink transition-colors duration-150 group-hover:text-blue">
                    {item.title}
                  </span>
                  <span className="mt-2 block text-pretty text-[15px] leading-relaxed text-secondary-text">{item.dek}</span>
                </Link>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
