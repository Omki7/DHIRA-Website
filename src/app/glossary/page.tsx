import type { Metadata } from "next";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";
import { GlossaryLetters, GlossaryTerms } from "@/components/sections/glossary/Glossary";
import { JsonLd } from "@/shared/components/data-display";
import { PageClose } from "@/shared/components/ui";
import { PageHero } from "@/shared/components/ui";
import { getGlossary, getPage, getUiStrings } from "@/services/content/content";
import { groupByLetter } from "@/shared/utils/glossary";
import { pageMetadata } from "@/app/_lib/metadata";
import { absoluteUrl } from "@/config/site";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("glossary");
  return pageMetadata(seo);
}

/* The A to Z: a letter index, then each letter's terms. Carries
   DefinedTermSet structured data for the same definitions. */
export default async function GlossaryPage() {
  const [page, terms] = await Promise.all([getPage("glossary"), getGlossary()]);
  const ui = await getUiStrings();
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
        <PageHero indexLabel={ui.onThisPage} label={hero.label} setup={hero.setup} payoff={hero.payoff} lede={hero.lede} meta={`${terms.length} ${hero.countSuffix}`}>
          <GlossaryLetters groups={groups} label={hero.lettersLabel} />
        </PageHero>
        <GlossaryTerms groups={groups} content={page.terms} />
        <PageClose {...page.close} />
      </main>
      <Footer />
    </>
  );
}
