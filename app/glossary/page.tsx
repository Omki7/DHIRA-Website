import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/ui/JsonLd";
import PageClose from "@/components/ui/PageClose";
import PageHero from "@/components/ui/PageHero";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { GLOSSARY, GLOSSARY_HERO, glossaryByLetter } from "@/lib/glossary";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Glossary",
  description: `${GLOSSARY_HERO.payoff} ${GLOSSARY_HERO.lede}`,
  path: "/glossary",
});

/* The A to Z: a letter index, then each letter's terms on hairlines. Term
   anchors (#entity-resolution) are linkable from articles and other pages.
   Carries DefinedTermSet structured data for the same definitions. */
export default function GlossaryPage() {
  const groups = glossaryByLetter();
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <JsonLd
          data={{
            "@type": "DefinedTermSet",
            name: "DHIRA glossary",
            url: absoluteUrl("/glossary"),
            hasDefinedTerm: GLOSSARY.map((item) => ({
              "@type": "DefinedTerm",
              name: item.term,
              description: item.definition,
              url: absoluteUrl(`/glossary#${item.id}`),
            })),
          }}
        />
        <PageHero
          label={GLOSSARY_HERO.label}
          setup={GLOSSARY_HERO.setup}
          payoff={GLOSSARY_HERO.payoff}
          lede={GLOSSARY_HERO.lede}
          meta={`${GLOSSARY.length} terms`}
        >
          <nav aria-label="Letters" className="mt-10 flex flex-wrap gap-2 border-t border-dashed border-lineSoft pt-5">
            {groups.map((group) => (
              <a
                key={group.letter}
                href={`#letter-${group.letter}`}
                className="flex h-9 w-9 items-center justify-center rounded-tile border border-subtle-stroke font-mono text-[13px] text-inkSoft transition-colors duration-150 hover:border-blue-border hover:text-blue"
              >
                {group.letter}
              </a>
            ))}
          </nav>
        </PageHero>

        <section id="terms" className="scroll-mt-24 bg-background pb-20 pt-8 lg:pb-28">
          <ScrollRevealRail>
            {groups.map((group) => (
              <div key={group.letter} id={`letter-${group.letter}`} className="grid scroll-mt-28 gap-6 border-b border-lineSoft py-10 lg:grid-cols-12 lg:gap-10">
                <p aria-hidden className="text-[44px] font-semibold leading-none tracking-[-0.04em] text-overcast/60 lg:col-span-2">
                  {group.letter}
                </p>
                <dl className="lg:col-span-10">
                  {group.terms.map((item) => (
                    <div key={item.id} id={item.id} className="grid scroll-mt-28 gap-2 border-t border-dashed border-lineSoft py-6 first:border-t-0 first:pt-0 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-10">
                      <dt className="text-[19px] font-semibold leading-snug tracking-[-0.01em] text-ink">{item.term}</dt>
                      <dd>
                        <p className="max-w-[44em] text-pretty text-[16px] leading-relaxed text-secondary-text">{item.definition}</p>
                        {item.inAkashic && (
                          <p className="mt-3 text-[14.5px] leading-relaxed text-ink">
                            <span className="font-mono text-[11px] uppercase tracking-eyebrow text-blue">In Akashic</span>&nbsp;&nbsp;{item.inAkashic}
                            {item.href && (
                              <>
                                {" "}
                                <Link href={item.href} className="whitespace-nowrap text-blue underline decoration-blue/30 underline-offset-[3px] hover:decoration-blue">
                                  See where
                                </Link>
                              </>
                            )}
                          </p>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </ScrollRevealRail>
        </section>

        <PageClose
          label="Talk to our team"
          setup="Missing a term?"
          payoff="Ask the people who use it."
          body="If a word on this site needs more than a definition, a solutions architect will walk you through it on your own data."
          primary={{ label: "Talk to our team", href: "#talk-to-our-team" }}
          secondary={{ label: "Read Insights", href: "/insights" }}
        />
      </main>
      <Footer />
    </>
  );
}
