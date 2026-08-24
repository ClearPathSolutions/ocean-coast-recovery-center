// ============================================================================
// Ocean Coast Recovery Center — central site data
// Single source of truth for NAP (name/address/phone), navigation & insurance.
// ============================================================================

export const site = {
  name: "Ocean Coast Recovery Center",
  shortName: "Ocean Coast Recovery",
  tagline: "A Fresh Start Is Closer Than You Think",
  description:
    "Top-rated drug & alcohol rehab in Costa Mesa, CA. Intimate, six-bed residential treatment with medical detox, dual diagnosis care, and lifelong aftercare.",
  url: "https://oceancoastrecovery.com",
  phone: "(949) 649-0702",
  phoneHref: "tel:+19496490702",
  phoneRaw: "1-949-649-0702",
  email: "info@oceancoastrecovery.com",
  address: {
    street: "1799 Hummingbird Drive",
    city: "Costa Mesa",
    state: "CA",
    zip: "92626",
    full: "1799 Hummingbird Drive, Costa Mesa, CA 92626",
  },
  hours: "Admissions available 24/7",
  social: {
    instagram: "https://www.instagram.com/oceancoastrecovery/",
    facebook: "https://www.facebook.com/oceancoastrecovery/",
    handle: "@oceancoastrecovery",
  },
  license: "DHCS License #300423AP · Expires 8/31/2027",
} as const;

// ----------------------------------------------------------------------------
// Third-party widgets & tracking (per-site values live here — single source)
// ----------------------------------------------------------------------------
// Clarion — chat widget, form capture, and blog embed.
export const clarion = {
  siteKey: "cpx_CBI9m6-UCDbYqCmcGx0KVVN0rHgRWhbO", // 👈 the only value that changes per site
  api: "https://api.clarionlabs.ai",
  widget: "https://www.clarionlabs.ai/widget.v1.js",
  formsCapture: "https://www.clarionlabs.ai/forms-capture.v1.js",
  // Blog posts are pulled as data from {api}/blog/public/feed and /blog/public/post
  // (see lib/clarionBlog.ts) so they merge & date-sort with local posts.
  // form_key values must already exist in the Clarion dashboard.
  formKeys: {
    contact: "contact",
    insurance: "insurance_verification",
  },
  // Chat bubble styling — keep `color` in sync with the ocean-500 token in
  // tailwind.config.ts so the widget never drifts from the site design.
  brand: {
    color: "#3fa6cd", // ocean-500 — primary brand blue
    headerText: "#ffffff", // readable text on the brand color
    title: "Chat with us",
    position: "right" as const,
    font: "var(--font-sans), system-ui, sans-serif", // Barlow, matching the page
  },
} as const;

// Call tracking (tctm.co) — swaps/tracks phone numbers for attribution.
export const callTracking = {
  accountId: "264810", // 👈 tctm.co account ID for this site
} as const;

/**
 * Google Tag Manager container for this site.
 *
 * Committed rather than env-only so it ships with the build, matching
 * callTracking above. Neither value is a secret — both are visible in page
 * source by design. NEXT_PUBLIC_GTM_ID still overrides at build time if a
 * different container is ever needed per environment.
 *
 * NOTE: GTM is a container. Any tag you add inside it that loads from a host
 * not in the CSP allowlist in next.config.mjs will be silently blocked by the
 * browser. Add the host there when you add the tag.
 */
export const analytics = {
  gtmId: "GTM-T5FSQTCL",
} as const;

/**
 * Absolute, slash-canonical URL for a route.
 *
 * `trailingSlash: true` in next.config.mjs makes the slash form the canonical
 * one, matching production. Anything that emits absolute URLs outside of
 * Next's metadata layer — sitemap, RSS feed, JSON-LD — has to agree with that,
 * or it advertises URLs that immediately redirect (V0102).
 */
export function absoluteUrl(path = "/"): string {
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  const withTrailing = withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
  return `${site.url}${withTrailing}`;
}

// ----------------------------------------------------------------------------
// Primary navigation
// ----------------------------------------------------------------------------
export type NavChild = { label: string; href: string; desc?: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const nav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about", desc: "Who we are & why we're different" },
      { label: "Our Team", href: "/about#team", desc: "Meet the people behind your care" },
      { label: "Tour the Facility", href: "/tour", desc: "See our Costa Mesa home" },
      { label: "Blog", href: "/blog", desc: "Recovery insights & resources" },
    ],
  },
  {
    label: "Treatment",
    href: "/treatment",
    children: [
      { label: "All Programs", href: "/treatment", desc: "Our full continuum of care" },
      { label: "Medical Detox", href: "/treatment/detox", desc: "Safe, supervised withdrawal" },
      { label: "Residential Inpatient", href: "/treatment/residential", desc: "24/7 immersive care" },
      { label: "Dual Diagnosis", href: "/treatment/dual-diagnosis", desc: "Addiction + mental health" },
      { label: "Family Therapy", href: "/treatment/family-therapy", desc: "Healing together" },
      { label: "Aftercare", href: "/treatment/aftercare", desc: "Support beyond treatment" },
    ],
  },
  {
    label: "Who We Help",
    href: "/who-we-help",
    children: [
      { label: "Young Adults", href: "/who-we-help/young-adults" },
      { label: "College Students", href: "/who-we-help/college-students" },
      { label: "Professionals", href: "/who-we-help/professionals" },
      { label: "First Responders", href: "/who-we-help/first-responders" },
      { label: "LGBTQ+ Community", href: "/who-we-help/lgbtq" },
      { label: "Men", href: "/who-we-help/men" },
      { label: "Women", href: "/who-we-help/women" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "How Admissions Work", href: "/admissions", desc: "Your first steps, made simple" },
      { label: "Verify Insurance", href: "/admissions#verify", desc: "Confidential benefits check" },
      { label: "Accepted Insurance", href: "/insurance", desc: "Carriers & coverage details" },
    ],
  },
  { label: "Tour", href: "/tour" },
  { label: "Contact", href: "/contact" },
];

// ----------------------------------------------------------------------------
// Insurance carriers (logos in /public/images/insurance where available)
// ----------------------------------------------------------------------------
export const insuranceCarriers = [
  "Blue Cross Blue Shield",
  "Cigna",
  "Aetna",
  "UnitedHealthcare",
  "Meritain Health",
  "Beacon Health Options",
  "GEHA",
  "Value Options",
];

// ----------------------------------------------------------------------------
// Accreditations & trust markers
// ----------------------------------------------------------------------------
export const accreditations = [
  {
    name: "The Joint Commission",
    label: "Gold Seal of Approval®",
    img: "/images/logos/jointcommission-goldseal.png",
    href: "https://www.qualitycheck.org/",
  },
  {
    name: "LegitScript",
    label: "Certified Provider",
    img: "/images/logos/legitscript-certified.png",
    href: "https://www.legitscript.com/",
  },
  {
    // VIS-1624 — the DHCS seal shipped in the repo unreferenced, and the licence
    // number was plain text. The link points at California's public provider
    // register so the licence can actually be checked.
    name: "California DHCS",
    label: "Licensed Provider",
    img: "/images/logos/dhcs-accredited.webp",
    href: "https://data.chhs.ca.gov/dataset/sud-recovery-treatment-facilities",
  },
];
