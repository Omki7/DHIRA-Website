import type { Metadata } from "next";
import { Footer } from "@/app/_components/Footer";
import { Nav } from "@/app/_components/Nav";
import { ContactOffices, ContactRoutes, ContactWriteToUs } from "@/components/sections/contact/ContactSections";
import { PageHero } from "@/shared/components/ui";
import { PageMinimap } from "@/shared/components/navigation";
import { getPage, getSiteSettings, getUiStrings } from "@/services/content/content";
import { pageMetadata } from "@/app/_lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage("contact");
  return pageMetadata(seo);
}

export default async function ContactPage() {
  const [page, site] = await Promise.all([getPage("contact"), getSiteSettings()]);
  const ui = await getUiStrings();
  const { hero } = page;
  const index = page.sections.filter((section) => section.id !== "hero");
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <PageHero indexLabel={ui.onThisPage} label={hero.label} setup={hero.setup} payoff={hero.payoff} lede={hero.lede} index={index} />
        <ContactWriteToUs content={page.writeToUs} />
        <ContactRoutes content={page.routes} />
        <ContactOffices content={page.offices} offices={site.offices} email={site.email} />
      </main>
      <Footer />
      <PageMinimap sections={page.sections} aria-label={page.sectionsLabel} />
    </>
  );
}
