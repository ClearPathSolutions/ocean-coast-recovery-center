import type { Metadata, Viewport } from "next";
import { Fraunces, Barlow } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site, clarion, callTracking } from "@/lib/site";
import { aggregate } from "@/lib/reviews";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocationMap from "@/components/LocationMap";
import Clarion from "@/components/Clarion";
import Analytics from "@/components/Analytics";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  // CR-15 — only the weights actually used: 600 for display headings, plus
  // 400 italic for the two pull-quotes. Was 4 weights x2 styles.
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Barlow({
  subsets: ["latin"],
  variable: "--font-sans",
  // CR-15 — 300 and 700 were never referenced by a utility class.
  weight: ["400", "500", "600"],
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
    // "./" resolves against metadataBase + the current pathname, so every page
    // gets its own og:url instead of inheriting the homepage's (V0088).
    url: "./",
    siteName: site.name,
    // Deliberately no `title` here: omitting it makes Next.js fall back to each
    // page's own resolved <title>. Setting it would push the homepage title onto
    // all 107 pages, which is the defect V0088 records.
    description: site.description,
    images: [
      {
        url: "/images/facility/exterior-front.jpg",
        width: 2560,
        height: 1707,
        alt: `The front entrance of ${site.name} in Costa Mesa, California`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    description: site.description,
  },
  // Self-referencing canonical. "./" is resolved per-route against metadataBase;
  // a literal site.url here canonicals all 107 pages to the homepage and
  // instructs Google to deindex 106 of them (V0109).
  alternates: { canonical: "./" },
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
  image: `${site.url}/images/facility/exterior-front.jpg`,
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
  // CR-09: sourced from content/reviews.json so the structured data cannot
  // drift from the rating shown on the page.
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: aggregate.rating,
    reviewCount: String(aggregate.count),
  },
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
        {/* VIS-1625 — location map directly above the footer, sitewide. */}
        <LocationMap />
        <Footer />

        {/* Clarion — form capture (exposes window.ClarionForms) + chat widget */}
        <Script
          src={clarion.formsCapture}
          strategy="afterInteractive"
          data-site-key={clarion.siteKey}
          data-api={clarion.api}
        />
        <Clarion />
        <Analytics />
      </body>
    </html>
  );
}
