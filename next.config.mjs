import fs from 'node:fs';
import path from 'node:path';

// ---------------------------------------------------------------------------
// Legacy URL redirects (WordPress → Next.js)
//
// The previous WP Engine site published blog posts at the site root (/my-slug)
// and used different paths for several pages. Every one of those URLs is
// indexed, so each needs a 301 to its new home or it 404s at DNS cutover.
// Derived from the live sitemap (post-sitemap.xml + page-sitemap.xml).
// ---------------------------------------------------------------------------

// Top-level route segments that must never be shadowed by a root-level
// blog redirect.
const RESERVED = new Set([
  'about',
  'admissions',
  'api',
  'blog',
  'contact',
  'insurance',
  'privacy',
  'tour',
  'treatment',
  'who-we-help',
]);

function blogSlugs() {
  const dir = path.join(process.cwd(), 'content', 'blog');
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace(/\.json$/, ''))
      .filter((slug) => !RESERVED.has(slug));
  } catch {
    return [];
  }
}

const POPULATIONS = [
  'young-adults',
  'college-students',
  'professionals',
  'first-responders',
  'lgbtq',
  'men',
  'women',
];

const CARRIERS = ['bcbs', 'beacon', 'cigna', 'geha', 'meritain', 'value-options'];

// CR-07 — security headers.
//
// The CSP is deliberately permissive in two places, both forced by what the
// site already loads: 'unsafe-inline' for scripts (Next.js emits inline
// bootstrap scripts and the JSON-LD blocks) and for styles (next/font and the
// inline Clarion :root block). Tightening those needs a nonce, which in turn
// needs middleware and makes every page dynamic — a real trade against the
// fully-static build. Everything else is locked to known hosts.
const CLARION = 'https://www.clarionlabs.ai https://api.clarionlabs.ai';
// https only — the http form permitted a downgrade on a site handling health
// enquiries, and t.js is now loaded absolute-https (AUDIT-03).
const CALL_TRACKING = 'https://*.tctm.co';
// GTM container + GA4. Wildcards cover GA4's regional collect endpoints
// (region1.google-analytics.com etc.) and Google Ads conversion hosts, which
// are the tags a site like this actually runs. Any OTHER vendor tag added in
// GTM later needs its host added here or the browser will block it.
const ANALYTICS =
  'https://*.googletagmanager.com https://*.google-analytics.com ' +
  'https://*.analytics.google.com https://*.g.doubleclick.net https://www.google.com';

const CSP = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-inline' ${CLARION} ${CALL_TRACKING} ${ANALYTICS}`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: blob: https:`,
  `font-src 'self' data:`,
  `connect-src 'self' ${CLARION} ${CALL_TRACKING} ${ANALYTICS}`,
  `frame-src 'self' https://www.google.com https://maps.google.com https://www.googletagmanager.com https://tagassistant.google.com https://td.doubleclick.net`,
  `form-action 'self'`,
  `base-uri 'self'`,
  `frame-ancestors 'none'`,
  `object-src 'none'`,
  `upgrade-insecure-requests`,
].join('; ');

const SECURITY_HEADERS = [
  { key: 'Content-Security-Policy', value: CSP },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Don't advertise the framework version to scanners.
  poweredByHeader: false,
  // Every production site in the portfolio is slash-canonical, and production
  // 301s the slashless form. Defaulting to false meant every inbound link using
  // the production convention would hit a redirect at cutover (V0102).
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [{ source: '/:path*', headers: SECURITY_HEADERS }];
  },
  async redirects() {
    return [
      // Blog posts moved from the site root to /blog/*
      ...blogSlugs().map((slug) => ({
        source: `/${slug}`,
        destination: `/blog/${slug}/`,
        permanent: true,
      })),

      // Population pages moved from the root to /who-we-help/*
      ...POPULATIONS.map((slug) => ({
        source: `/${slug}`,
        destination: `/who-we-help/${slug}/`,
        permanent: true,
      })),

      // Insurance carrier pages moved from the root to /insurance/*
      ...CARRIERS.map((slug) => ({
        source: `/${slug}`,
        destination: `/insurance/${slug}/`,
        permanent: true,
      })),

      // Retired staff bio (BIO-01). Withdrawn because the person does not
      // appear in the authoritative QHG staff-bios document or in any of the
      // 124 approved headshots. Must sit BEFORE the /about-us/:person rule
      // below, which would otherwise hand /about-us/tami-distefano to a 404.
      { source: '/about/tami-distefano', destination: '/about/', permanent: true },
      { source: '/about-us/tami-distefano', destination: '/about/', permanent: true },

      // Departed staff (ticket #36, last day 2026-09-01). Removed from all four
      // Southern California sites. The bio page was indexed and in the sitemap,
      // so it 301s rather than 404s. Same ordering constraint as above: must
      // precede the /about-us/:person rule.
      { source: '/about/elizabeth-wald', destination: '/about/', permanent: true },
      { source: '/about-us/elizabeth-wald', destination: '/about/', permanent: true },

      // Renamed pages
      { source: '/about-us', destination: '/about/', permanent: true },
      { source: '/about-us/:person', destination: '/about/:person/', permanent: true },
      { source: '/tour-facility', destination: '/tour/', permanent: true },
      {
        source: '/treatment/detoxification',
        destination: '/treatment/detox/',
        permanent: true,
      },
      {
        source: '/treatment/detoxification-old/:substance',
        destination: '/treatment/detox/:substance/',
        permanent: true,
      },
      {
        source: '/treatment/residential-inpatient',
        destination: '/treatment/residential/',
        permanent: true,
      },

      // Legacy "Huntington Beach Prescription Drug Rehab" landing page
      {
        source: '/prescription-drugs',
        destination: '/treatment/detox/prescription-drugs/',
        permanent: true,
      },

      // ---------------------------------------------------------------------
      // WordPress archive URLs. These are not in the sitemap but are indexed
      // and internally linked on the old site. The rebuild has no equivalent
      // (the blog index filters by category client-side), so they fold into
      // /blog rather than 404.
      // ---------------------------------------------------------------------
      { source: '/blog/page/:page', destination: '/blog/', permanent: true },
      { source: '/category/:slug*', destination: '/blog/', permanent: true },
      { source: '/tag/:slug*', destination: '/blog/', permanent: true },

      // The old site already 301'd author archives to the homepage; preserve it.
      { source: '/author/:slug*', destination: '/', permanent: true },

      // WordPress served RSS at /feed/; /blog/feed/ and /comments/feed/ also
      // resolved. app/feed/route.ts now serves the real feed.
      { source: '/blog/feed', destination: '/feed/', permanent: true },
      { source: '/comments/feed', destination: '/feed/', permanent: true },

      // Yoast sitemap URLs are what Search Console has on file.
      { source: '/sitemap_index.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/post-sitemap.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/page-sitemap.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/oceanwp_library-sitemap.xml', destination: '/sitemap.xml', permanent: true },
    ];
  },
};

export default nextConfig;
