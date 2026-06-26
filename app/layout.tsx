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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-background text-primary-text antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
