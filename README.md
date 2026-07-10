# Ocean Coast Recovery Center — Website

A modern, mobile-first rebuild of [oceancoastrecovery.com](https://oceancoastrecovery.com) — a
boutique drug & alcohol treatment center in Costa Mesa, CA. Built with **Next.js 15 (App Router)**,
**React 19**, **TypeScript**, and **Tailwind CSS**, and optimized for deployment on **Vercel**.

## Highlights

- **Mobile-first, full-width design** — a sticky, transparent-over-hero navbar that turns frosted
  white on scroll; a full-screen mobile drawer with accordion sub-menus; and content that fills the
  viewport edge-to-edge with balanced gutters (no dead space on desktop).
- **Fast & SEO-ready** — static generation for every page (98 routes), `next/image` with AVIF/WebP,
  `sitemap.xml`, `robots.txt`, per-page metadata, Open Graph tags, and `MedicalBusiness` +
  `BlogPosting` JSON-LD structured data.
- **All original content & assets** rebuilt locally — every page, the full 69-article blog, 8
  substance-specific detox pages, 6 insurance-carrier coverage pages, the real Google reviews, and
  all facility photos, insurance logos, and accreditation badges live in this repo.
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

The contact and "verify insurance" forms POST to `app/api/lead/route.ts`. Out of the box it
validates input, logs each lead to the server (visible in Vercel logs), and returns success so the
site works immediately. To actually **deliver** leads, set one of these environment variables in
**Vercel → Settings → Environment Variables**:

| Variable | Purpose |
| --- | --- |
| `LEAD_WEBHOOK_URL` | POST each lead as JSON to a Zapier/Make webhook or your CRM endpoint. |
| `RESEND_API_KEY` + `LEAD_TO_EMAIL` | Email each lead via [Resend](https://resend.com). |

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
| Images | `public/images/**` (facility, stock, logos, insurance, team) |

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
- The homepage/legacy site used a JS review widget; the four verbatim testimonials that were
  recoverable are included in `components/Testimonials.tsx` along with the 5.0 / 124-review rating.
```
