import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./theme.css";
import ContactModal from "@/components/layout/ContactModal";
import OffscreenAnimationGate from "@/components/layout/OffscreenAnimationGate";
import RegionSuggest from "@/components/layout/region/RegionSuggest";
import UiProvider from "@/components/providers/UiProvider";
import JsonLd from "@/components/ui/JsonLd";
import { getSiteSettings, getUiStrings } from "@/lib/content";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

export const viewport: Viewport = {
  themeColor: "#FCFDFE",
  width: "device-width",
  initialScale: 1,
};

/* Site-wide defaults from the Site settings document. Pages set their own
   title, description and canonical (lib/metadata.ts); none is set here, or
   every page would inherit "/". */
export async function generateMetadata(): Promise<Metadata> {
  const { name, seo } = await getSiteSettings();
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: seo.title, template: `%s | ${name}` },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name }],
    creator: name,
    publisher: name,
    formatDetection: { email: false, address: false, telephone: false },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: "/",
      siteName: name,
      images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.ogImageAlt, type: "image/png" }],
      locale: seo.locale,
      type: "website",
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: [seo.ogImage] },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [site, ui] = await Promise.all([getSiteSettings(), getUiStrings()]);
  return (
    <html lang="en" data-theme="light" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <link rel="alternate" type="text/plain" title={ui.llmsLinkTitle} href="/llms.txt" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* App Router root layout: this stylesheet loads on every page. It is a
            <link>, not next/font, because next/font has no Google Sans Text or
            Google Sans Mono. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- see above */}
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&family=Google+Sans+Text:wght@400;500;600;700&family=Google+Sans+Mono:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Inter:opsz,wght@14..32,400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* suppressHydrationWarning: browser extensions (e.g. Grammarly) inject
          attributes onto <body> before React hydrates, which would otherwise
          log a hydration mismatch. Only affects this element's attributes. */}
      <body
        suppressHydrationWarning
        className="font-sans bg-background text-primary-text antialiased overflow-x-clip"
      >
        {/* Skip link (WCAG 2.4.1, GIGW): the first focusable element on every
            page. Every page composer gives its <main> id="main". */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-btn focus:bg-action focus:px-4 focus:py-2.5 focus:text-[14px] focus:font-medium focus:text-on-action"
        >
          {ui.skipLink}
        </a>
        <JsonLd
          data={{
            "@type": "Organization",
            "@id": absoluteUrl("/#org"),
            name: site.name,
            alternateName: [site.alternateName, site.expansion],
            legalName: site.legalName,
            url: absoluteUrl("/"),
            logo: absoluteUrl(site.logo),
            email: site.email,
            foundingDate: site.founded,
            founder: { "@type": "Person", name: site.founder.name, jobTitle: site.founder.role },
            address: site.offices.map((office) => ({ "@type": "PostalAddress", addressLocality: office.city, addressCountry: office.country })),
            sameAs: site.social.map((profile) => profile.href),
          }}
        />
        <JsonLd
          data={{
            "@type": "WebSite",
            "@id": absoluteUrl("/#website"),
            url: absoluteUrl("/"),
            name: site.name,
            inLanguage: "en",
            publisher: { "@id": absoluteUrl("/#org") },
          }}
        />
        <UiProvider value={ui}>
          {children}
          <ContactModal />
          <RegionSuggest />
        </UiProvider>
        <OffscreenAnimationGate />
      </body>
    </html>
  );
}
