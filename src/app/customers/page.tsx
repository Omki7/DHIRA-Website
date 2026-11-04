import type { Metadata } from "next";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";
import CustomersLibrary from "@/components/sections/customers/CustomersLibrary";
import { PageClose } from "@/shared/components/ui";
import { PageHero } from "@/shared/components/ui";
import { PageMinimap } from "@/shared/components/navigation";
import { getCustomerStories, getPage, getUiStrings } from "@/services/content/content";
import { pageMetadata } from "@/app/_lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("customers");
  return pageMetadata(seo);
}

export default async function CustomersPage() {
  const [page, stories] = await Promise.all([getPage("customers"), getCustomerStories()]);
  const ui = await getUiStrings();
  const { hero } = page;
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <PageHero indexLabel={ui.onThisPage}
          label={hero.label}
          setup={hero.setup}
          payoff={hero.payoff}
          lede={hero.lede}
          meta={`${stories.length} ${hero.metaSuffix} · ${hero.note}`}
        />
        <CustomersLibrary content={page.library} stories={stories} />
        <PageClose {...page.close} />
      </main>
      <Footer />
      <PageMinimap sections={page.sections} aria-label={page.sectionsLabel} />
    </>
  );
}
