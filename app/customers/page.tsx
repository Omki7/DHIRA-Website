import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import CustomersLibrary from "@/components/sections/customers/CustomersLibrary";
import PageClose from "@/components/ui/PageClose";
import PageHero from "@/components/ui/PageHero";
import { getCustomerStories, getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("customers");
  return pageMetadata(seo);
}

export default async function CustomersPage() {
  const [page, stories] = await Promise.all([getPage("customers"), getCustomerStories()]);
  const { hero } = page;
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <PageHero
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
    </>
  );
}
