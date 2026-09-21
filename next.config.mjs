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
  experimental: {
    // The one render-blocking request on every page was the 8.8 KB stylesheet,
    // costing a round trip before anything could paint (Lighthouse measured
    // ~190 ms). Inlining removes it from the critical path. The trade is that
    // those bytes are re-sent per navigation instead of being cached once —
    // acceptable here because the CSS is small and most sessions are one or
    // two pages.
    inlineCss: true,
  },
  // Don't advertise the framework version to scanners.
  poweredByHeader: false,
  // Every production site in the portfolio is slash-canonical, and production
  // 301s the slashless form. Defaulting to false meant every inbound link using
  // the production convention would hit a redirect at cutover (V0102).
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // 31 days. Next's default is 60 SECONDS, which is the single biggest cause
    // of this site's wildly inconsistent mobile Lighthouse scores: every
    // optimised variant falls out of Vercel's edge cache after a minute, so any
    // audit arriving later than that pays a cold AVIF re-encode of a 2560x1707
    // source before the LCP image can even start downloading. Measured on
    // production 2026-09-18: `x-vercel-cache: MISS, age: 0` on every hero size
    // on first request, `HIT` immediately after — the cache works, it just
    // expires faster than real traffic arrives. Identical code scored 65, 71,
    // 74 and 92 depending on which side of that minute the run landed.
    //
    // Trade-off: replacing an image in-place without renaming it can serve the
    // old optimised copy for up to 31 days. Rename the file to bust it.
    minimumCacheTTL: 60 * 60 * 24 * 31,
    // Clarion blog covers. The URL 302s to a presigned S3 link that expires in
    // an hour, so it has to be fetched server-side by next/image rather than
    // linked directly — which also keeps the browser on our own origin and out
    // of img-src entirely.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.clarionlabs.ai',
        pathname: '/blog/public/image/**',
      },
    ],
  },
  async headers() {
    return [{ source: '/:path*', headers: SECURITY_HEADERS }];
  },
  async redirects() {
    return [
      // Every other site in the network serves its privacy policy at
      // /privacy-policy; this one is at /privacy (V0100 in the audit workbook).
      // Anyone following the network's own pattern hit a 404, whose title is the
      // site default — which is what made it look like the page had the wrong
      // title rather than not existing.
      {
        source: "/privacy-policy",
        destination: "/privacy/",
        permanent: true,
      },
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
