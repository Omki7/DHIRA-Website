import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageClose from "@/components/ui/PageClose";
import PageHero from "@/components/ui/PageHero";
import CustomersLibrary from "@/components/sections/customers/CustomersLibrary";
import { CUSTOMERS_HERO, STORIES } from "@/lib/customerStories";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Customer stories",
  description: `${CUSTOMERS_HERO.payoff} ${CUSTOMERS_HERO.lede}`,
  path: "/customers",
});

export default function CustomersPage() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <PageHero
          label={CUSTOMERS_HERO.label}
          setup={CUSTOMERS_HERO.setup}
          payoff={CUSTOMERS_HERO.payoff}
          lede={CUSTOMERS_HERO.lede}
          meta={`${STORIES.length} programmes · ${CUSTOMERS_HERO.note}`}
        />
        <CustomersLibrary />
        <PageClose
          label="Talk to our team"
          setup="Bring the records you have."
          payoff="See what they can answer."
          body="A solutions architect works through one of your questions on your own data, with the governance a published figure needs."
          primary={{ label: "Talk to our team", href: "#talk-to-our-team" }}
          secondary={{ label: "See pricing", href: "/pricing" }}
        />
      </main>
      <Footer />
    </>
  );
}
