# Ocean Coast Recovery Center — Website

A modern, mobile-first rebuild of [oceancoastrecovery.com](https://oceancoastrecovery.com) — a
boutique drug & alcohol treatment center in Costa Mesa, CA. Built with **Next.js 15 (App Router)**,
**React 19**, **TypeScript**, and **Tailwind CSS**, and optimized for deployment on **Vercel**.

## Highlights

- **Mobile-first, full-width design** — a sticky, transparent-over-hero navbar that turns frosted
  white on scroll; a full-screen mobile drawer with accordion sub-menus; and content that fills the
  viewport edge-to-edge with balanced gutters (no dead space on desktop).
- **Fast & SEO-ready** — static generation for every page (110 pages), `next/image` with AVIF/WebP,
  `sitemap.xml`, `robots.txt`, an RSS feed at `/feed`, a legacy WordPress 301 map, self-referencing
  per-page canonicals and Open Graph tags, and `MedicalBusiness` + `BlogPosting` + `FAQPage` JSON-LD.
- **Slash-canonical URLs** — `trailingSlash: true` matches production and every other site in the
  portfolio, so inbound links don't hit a redirect at cutover. Anything emitting an absolute URL
  outside Next's metadata layer must go through `absoluteUrl()` in `lib/site.ts`.
- **All original content & assets** rebuilt locally — every page, the 70-article local blog (merged
  at build time with posts from the Clarion feed), 8 substance-specific detox pages, 6
  insurance-carrier coverage pages, the real Google reviews, and the approved facility photography
  and accreditation badges.
- **Photography is approved-source only** — every image traces to the owner-supplied shoot. See
  *Images* below; this is a hard rule, not a preference.
- **Accessible** — semantic HTML, keyboard-navigable menus, focus states, skip-to-content link,
  `prefers-reduced-motion` support, and a 988/911 crisis notice in the footer.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
```

Requires Node 18.18+ (Node 20 recommended).

## Deploying to Vercel

1. Push this folder to a Git repository (GitHub/GitLab/Bitbucket).
2. In Vercel, **Add New → Project** and import the repo. Vercel auto-detects Next.js — no config
   needed. Click **Deploy**.
3. Add your custom domain under **Project → Settings → Domains**.

## Lead / contact form

The contact and "verify insurance" forms are the same component
([components/ContactForm.tsx](components/ContactForm.tsx), `variant="contact" | "insurance"`).
Both submit **directly to Clarion** from the browser — `POST {api}/forms/public/submit` — via
[lib/clarionForms.ts](lib/clarionForms.ts). Clarion is the system of record; there is no
server-side lead endpoint and no environment variable to configure.

Each submission carries first-touch attribution built by [lib/session.ts](lib/session.ts):

| Field | Notes |
| --- | --- |
| `ctm_visitor_sid` | CallTrackingMetrics' visitor session id. **Flat and top-level** — nested, Clarion's parser never finds it and the lead attaches to no visit. 24 hex characters, no dashes; `null` if CTM is unavailable. Never substitute another id. |
| `utm` | Object with unprefixed keys (`source`, `medium`, …), or `null`. |
| `gclid` | Falls back to `wbraid` / `gbraid`, which is how Google reports a click under iOS and consent mode. |
| `landing_page_url`, `referrer` | The real entry page and external referrer, not the form page. |

Attribution is captured on the **first** pageview into `localStorage` (30-day window, 30-minute
idle, a fresh ad click re-attributes) and read back at submit time. Reading it live from
`location.search` is the bug this replaced: anyone who browsed before converting submitted as
direct traffic, and the record still looked complete.

`NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GTM_ID` remain optional — GA4 / Tag Manager load only when set.

> **The form's success message is gated on Clarion's response.** If the POST fails, the visitor
> sees the "please call us" fallback with the real phone number instead of a success message the
> delivery does not support.

> **Never add `data-clarion-form` to the form.** `forms-capture.v1.js` is still loaded (it reports
> the integration as installed) and auto-binds to any form carrying that attribute without checking
> `defaultPrevented` — every lead would be submitted twice.

No secrets are required to build or run the site.

## Editing content

| What | Where |
| --- | --- |
| Phone, email, address, nav, insurance list, accreditations | `lib/site.ts` |
| Homepage sections | `app/page.tsx` |
| Treatment pages | `app/treatment/**` |
| Substance detox pages (data-driven) | `content/substances/*.json` + `lib/substanceMeta.ts` |
| Insurance carrier pages (data-driven) | `content/insurance/*.json` + `lib/insuranceMeta.ts` |
| "Who We Help" population pages (data-driven) | `lib/populations.ts` |
| Blog articles (one JSON file per post) | `content/blog/*.json` |
| Google reviews / testimonials | `content/reviews.json` |
| Team bios | `app/about/**` |
| Brand colors & fonts | `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx` |
| Images | `public/images/**` (facility, logos, insurance, team) — see *Images* below |

### Refreshing the Google reviews

`content/reviews.json` holds the reviews shown across the site (the aggregate 5.0 / 124-review
rating plus the individual reviews). These were pulled from the live site's Google-reviews widget.
To refresh them later, replace the `reviews` array with new entries of the shape
`{ name, text, rating, posted, initials, platform }` — the testimonials section updates
automatically everywhere it appears.

### Adding a blog post

Create `content/blog/<slug>.json`:

```json
{
  "slug": "my-post",
  "title": "My Post Title",
  "date": "2026-07-01",
  "category": "Treatment",
  "excerpt": "A one-sentence summary.",
  "readMinutes": 4,
  "bodyHtml": "<p>Body using only h2, h3, p, ul, ol, li, strong, em tags.</p>"
}
```

It will appear automatically in the blog index, the category filter, sitemap, and get its own
statically generated page at `/blog/my-post`.

## Images

Every photograph on the site must come from the owner-approved shoot. There is deliberately **no
`public/images/stock/` directory** — it was removed along with four non-facility files, because
while it existed stock imagery kept creeping back in.

- Facility photography lives in `public/images/facility/` under semantic names (`exterior-front`,
  `living-room`, `bedroom-twin`, …) rather than `facility-07`, so the call site says what it shows.
- Staff headshots live in `public/images/team/`, normalised to an 800×800 square crop.
- Substance and population pages ship **without** hero images on purpose: nothing in the approved
  set honestly depicts therapy, people or a specific substance, so `PageHero` renders the brand
  gradient instead. Passing no `image` prop is the supported path, not an oversight.
- Captions and `alt` text are trust claims on a healthcare site. Describe what is actually in the
  frame; never label a photograph as this facility unless it is.

## Brand

| Token | Value | Use |
| --- | --- | --- |
| Ocean | `#3fa6cd` | Primary accent |
| Navy | `#113c4c` | Headings, dark sections |
| Sand | `#f6b57e` | Call-to-action buttons |
| Fonts | Fraunces (display) · Barlow (body) | Loaded via `next/font` |

## Notes

- A few source-site inconsistencies were standardized: a single phone number
  `(949) 649-0702`, the email `info@oceancoastrecovery.com`, and "Costa Mesa" as the primary
  location.
- Testimonials live in `content/reviews.json` (10 reviews plus the aggregate rating), rendered by
  `components/Testimonials.tsx`. The aggregate is read from that one file by the homepage badge, the
  About stats and the `MedicalBusiness` JSON-LD, so updating the JSON updates all three.
- Outstanding work, decisions and their evidence are tracked in **`ISSUES.md`** at the repo root.
```
