import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import { GlossaryLetters, GlossaryTerms } from "@/components/sections/glossary/Glossary";
import JsonLd from "@/components/ui/JsonLd";
import PageClose from "@/components/ui/PageClose";
import PageHero from "@/components/ui/PageHero";
import { getGlossary, getPage } from "@/lib/content";
import { groupByLetter } from "@/lib/glossary";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("glossary");
  return pageMetadata(seo);
}

/* The A to Z: a letter index, then each letter's terms. Carries
   DefinedTermSet structured data for the same definitions. */
export default async function GlossaryPage() {
  const [page, terms] = await Promise.all([getPage("glossary"), getGlossary()]);
  const { hero } = page;
  const groups = groupByLetter(terms);
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <JsonLd
          data={{
            "@type": "DefinedTermSet",
            name: page.termSetName,
            url: absoluteUrl(page.seo.path),
            hasDefinedTerm: terms.map((item) => ({
              "@type": "DefinedTerm",
              name: item.term,
              description: item.definition,
              url: absoluteUrl(`${page.seo.path}#${item.id}`),
            })),
          }}
        />
        <PageHero label={hero.label} setup={hero.setup} payoff={hero.payoff} lede={hero.lede} meta={`${terms.length} ${hero.countSuffix}`}>
          <GlossaryLetters groups={groups} label={hero.lettersLabel} />
        </PageHero>
        <GlossaryTerms groups={groups} content={page.terms} />
        <PageClose {...page.close} />
      </main>
      <Footer />
    </>
  );
}
