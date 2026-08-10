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

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Blog posts moved from the site root to /blog/*
      ...blogSlugs().map((slug) => ({
        source: `/${slug}`,
        destination: `/blog/${slug}`,
        permanent: true,
      })),

      // Population pages moved from the root to /who-we-help/*
      ...POPULATIONS.map((slug) => ({
        source: `/${slug}`,
        destination: `/who-we-help/${slug}`,
        permanent: true,
      })),

      // Insurance carrier pages moved from the root to /insurance/*
      ...CARRIERS.map((slug) => ({
        source: `/${slug}`,
        destination: `/insurance/${slug}`,
        permanent: true,
      })),

      // Renamed pages
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/about-us/:person', destination: '/about/:person', permanent: true },
      { source: '/tour-facility', destination: '/tour', permanent: true },
      {
        source: '/treatment/detoxification',
        destination: '/treatment/detox',
        permanent: true,
      },
      {
        source: '/treatment/detoxification-old/:substance',
        destination: '/treatment/detox/:substance',
        permanent: true,
      },
      {
        source: '/treatment/residential-inpatient',
        destination: '/treatment/residential',
        permanent: true,
      },

      // Legacy "Huntington Beach Prescription Drug Rehab" landing page
      {
        source: '/prescription-drugs',
        destination: '/treatment/detox/prescription-drugs',
        permanent: true,
      },

      // ---------------------------------------------------------------------
      // WordPress archive URLs. These are not in the sitemap but are indexed
      // and internally linked on the old site. The rebuild has no equivalent
      // (the blog index filters by category client-side), so they fold into
      // /blog rather than 404.
      // ---------------------------------------------------------------------
      { source: '/blog/page/:page', destination: '/blog', permanent: true },
      { source: '/category/:slug*', destination: '/blog', permanent: true },
      { source: '/tag/:slug*', destination: '/blog', permanent: true },

      // The old site already 301'd author archives to the homepage; preserve it.
      { source: '/author/:slug*', destination: '/', permanent: true },

      // WordPress served RSS at /feed/; /blog/feed/ and /comments/feed/ also
      // resolved. app/feed/route.ts now serves the real feed.
      { source: '/blog/feed', destination: '/feed', permanent: true },
      { source: '/comments/feed', destination: '/feed', permanent: true },

      // Yoast sitemap URLs are what Search Console has on file.
      { source: '/sitemap_index.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/post-sitemap.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/page-sitemap.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/oceanwp_library-sitemap.xml', destination: '/sitemap.xml', permanent: true },
    ];
  },
};

export default nextConfig;
