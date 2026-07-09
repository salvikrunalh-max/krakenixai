import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { BRAND_NAME, BRAND_SITE_URL } from "@/lib/brand";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? BRAND_SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${BRAND_NAME} — Autonomous Systems & Websites That Close Clients`,
  description:
    "Stop losing leads to 5-minute delays. Krakenix AI engineers autonomous systems for Ardmore, OK, Southern Oklahoma, and North Texas — responding, booking, and closing clients in under 15 seconds.",
  openGraph: {
    title: `${BRAND_NAME} — Autonomous Systems That Close Clients`,
    description:
      "Custom AI agents, automation, and websites for local businesses. Based in Ardmore, OK.",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND_NAME,
    description: "Autonomous systems that close clients in under 15 seconds.",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BRAND_NAME,
  description:
    "Custom AI agents, autonomous lead response systems, and software for local businesses and enterprise.",
  url: siteUrl,
  telephone: "+1-918-840-3501",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ardmore",
    addressRegion: "OK",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Ardmore" },
    { "@type": "State", name: "Oklahoma" },
    { "@type": "State", name: "Texas" },
  ],
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <div className="mobile-bg-layer" aria-hidden />
        {children}
      </body>
    </html>
  );
}
