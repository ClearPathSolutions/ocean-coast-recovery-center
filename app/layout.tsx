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
import SessionTracker from "@/components/SessionTracker";

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
      {/* Call tracking (tctm.co) — renders as <script async>. Root layout, so it
          is on every page including campaign landing pages.

          MUST NOT be made eager/synchronous, whatever the rollout spec says.
          Measured on this site with `beforeInteractive`:
          `Object.keys(__ctm_tracked_numbers).length === 0` and every rendered
          tel: link still matched the hardcoded number in lib/site.ts — the swap
          never happened. Two causes, both silent:

            1. A sync tag in <head> runs before <body> exists. CTM's number scan
               defaults its root to document.body and no-ops when that is null,
               so it finds nothing and CTM can only guess which web session an
               inbound call belongs to.
            2. Running before hydration, any swap it did manage is reverted when
               React replaces the server HTML.

          afterInteractive runs it after hydration, which fixes both. Verify with
          the tracked-number count, not the tag's `async` property — that reads
          true under beforeInteractive as well and proves nothing.

          Pinned to https — protocol-relative permits a downgrade on a site
          handling health enquiries (AUDIT-03). Exactly one copy: count with
          `script[src*="tctm.co/t.js"]`, never `script[src*="tctm.co"]`, which
          returns 2 because t.js injects its own p.js. Removing that breaks CTM. */}
      <Script
        src={`https://${callTracking.accountId}.tctm.co/t.js`}
        strategy="afterInteractive"
      />
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

        {/* Clarion form capture. The site submits to Clarion itself (see
            lib/clarionForms.ts) because this script reads the campaign live
            from location.search; it stays loaded so Clarion still sees the
            integration as installed. It auto-binds only to
            `form[data-clarion-form]` — never add that attribute to this site's
            form, or every lead is submitted twice. */}
        <Script
          src={clarion.formsCapture}
          strategy="afterInteractive"
          data-site-key={clarion.siteKey}
          data-api={clarion.api}
        />
        <Clarion />
        <Analytics />
        {/* First-touch attribution — records a pageview on every route change. */}
        <SessionTracker />
      </body>
    </html>
  );
}
