import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import { ContactOffices, ContactRoutes, ContactWriteToUs } from "@/components/sections/contact/ContactSections";
import PageHero from "@/components/ui/PageHero";
import { getPage, getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("contact");
  return pageMetadata(seo);
}

export default async function ContactPage() {
  const [page, site] = await Promise.all([getPage("contact"), getSiteSettings()]);
  const { hero } = page;
  const index = page.sections.filter((section) => section.id !== "hero");
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <PageHero label={hero.label} setup={hero.setup} payoff={hero.payoff} lede={hero.lede} index={index} />
        <ContactWriteToUs content={page.writeToUs} />
        <ContactRoutes content={page.routes} />
        <ContactOffices content={page.offices} offices={site.offices} email={site.email} />
      </main>
      <Footer />
    </>
  );
}
