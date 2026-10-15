import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import LegalDocument from "@/components/sections/legal/LegalDocument";
import { COOKIES } from "@/lib/legal";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: COOKIES.title, description: COOKIES.summary, path: "/cookies" });

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <LegalDocument doc={COOKIES} />
      </main>
      <Footer />
    </>
  );
}
