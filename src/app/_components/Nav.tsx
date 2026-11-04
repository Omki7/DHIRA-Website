import { getNavigation, getSiteSettings } from "@/services/content/content";
import { NavBar } from "@/shared/components/navigation";

/* The site header: loads the Navigation and Site settings documents and
   hands them to the interactive bar (shared/components/navigation/NavBar).
   Every page renders it until the (site) route-group layout takes over
   (NEXTJS_ARCHITECTURE P-01). */
export async function Nav() {
  const [navigation, site] = await Promise.all([getNavigation(), getSiteSettings()]);
  return <NavBar navigation={navigation} brand={{ name: site.name, expansion: site.expansion }} />;
}
