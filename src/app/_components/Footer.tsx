import { FooterSubscribe } from "@/features/newsletter";
import { RegionSwitch } from "@/features/region";
import { getNavigation, getSiteSettings, getUiStrings } from "@/services/content/content";
import { FooterContent } from "@/shared/components/navigation";

/* The site footer: loads the Navigation, Site settings and interface
   strings documents and composes the presentational footer
   (shared/components/navigation/FooterContent) with the two feature
   pieces it hosts: the newsletter sign-up and the region switch. Every
   page renders it until the (site) route-group layout takes over
   (NEXTJS_ARCHITECTURE P-01). */
export async function Footer() {
  const [{ footer }, site, ui] = await Promise.all([getNavigation(), getSiteSettings(), getUiStrings()]);
  return (
    <FooterContent footer={footer} site={site} ui={ui} subscribe={<FooterSubscribe />} regionSwitch={<RegionSwitch />} />
  );
}
