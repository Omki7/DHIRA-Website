import NavBar from "@/components/layout/nav/NavBar";
import { getNavigation, getSiteSettings } from "@/lib/content";

/* The site header: loads the Navigation and Site settings documents and
   hands them to the interactive bar (nav/NavBar). Every page renders it. */
export default async function Nav() {
  const [navigation, site] = await Promise.all([getNavigation(), getSiteSettings()]);
  return <NavBar navigation={navigation} brand={{ name: site.name, expansion: site.expansion }} />;
}
