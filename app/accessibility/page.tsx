import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import LegalDocument from "@/components/sections/legal/LegalDocument";
import { ACCESSIBILITY } from "@/lib/legal";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: ACCESSIBILITY.title, description: ACCESSIBILITY.summary, path: "/accessibility" });

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-background">
        <LegalDocument doc={ACCESSIBILITY} />
      </main>
      <Footer />
    </>
  );
}
