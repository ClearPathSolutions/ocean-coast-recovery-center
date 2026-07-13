import type { Metadata, Viewport } from "next";
import { Fraunces, Barlow } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site, clarion, callTracking } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Clarion from "@/components/Clarion";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Barlow({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Drug & Alcohol Rehab in Costa Mesa, CA`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "drug rehab Costa Mesa",
    "alcohol rehab Orange County",
    "residential treatment California",
    "medical detox",
    "dual diagnosis treatment",
    "addiction treatment Costa Mesa",
  ],
  icons: {
    icon: [
      { url: "/images/logos/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logos/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/images/logos/icon-180.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Drug & Alcohol Rehab in Costa Mesa, CA`,
    description: site.description,
    images: [{ url: "/images/facility/facility-01.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  alternates: { canonical: site.url },
};

export const viewport: Viewport = {
  themeColor: "#113c4c",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phoneRaw,
  email: site.email,
  image: `${site.url}/images/facility/facility-01.jpg`,
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 33.6713545, longitude: -117.936243 },
  openingHours: "Mo-Su 00:00-23:59",
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "124" },
  sameAs: [site.social.instagram, site.social.facebook],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      {/* Call tracking (tctm.co) — loads early to swap/track phone numbers */}
      <Script src={`//${callTracking.accountId}.tctm.co/t.js`} strategy="beforeInteractive" />
      <body className="min-h-screen overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />

        {/* Clarion — form capture (exposes window.ClarionForms) + chat widget */}
        <Script
          src={clarion.formsCapture}
          strategy="afterInteractive"
          data-site-key={clarion.siteKey}
          data-api={clarion.api}
        />
        <Clarion />
      </body>
    </html>
  );
}
