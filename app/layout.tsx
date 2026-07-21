import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DHIRA — Answers you can act on.",
  description:
    "From spreadsheets to PDFs to live streams, DHIRA gives your AI the full picture. Powered by Akashic, the complete record of your data, ready to answer.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
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
        {children}
      </body>
    </html>
  );
}
