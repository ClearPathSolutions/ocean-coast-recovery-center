import { readFileSync } from "node:fs";
import path from "node:path";
import { site, absoluteUrl } from "@/lib/site";

/**
 * Editorial policy — the portfolio-wide page from the editorial policy dev
 * package (Clear Path, September 2026).
 *
 * The copy is shared by every site and must not be reworded here; only the five
 * merge fields below differ per site. Values mirror this site's row (SITE_ID 11)
 * in the package's facilities.csv — update both together.
 *
 * Until every field is filled and the CSV's CONTENT_SIGNOFF is recorded, the
 * policy is withheld from production: the route 404s there and nothing links
 * to it, it is left out of the sitemap, and the Organization schema does not
 * point at it. Local and Vercel preview builds still render it (noindex) so it
 * can be reviewed.
 *
 * Going live = filling lastReviewed and contentSignoff below. Nothing else.
 */
export const editorial = {
  /** Brand name as in the site footer. */
  facilityName: site.name,
  domain: new URL(site.url).hostname,
  /**
   * Corrections inbox. EDITORIAL_EMAIL is blank in facilities.csv; this is the
   * site's PUBLIC_EMAIL from the source-of-truth sheet, as instructed.
   */
  editorialEmail: "info@oceancoastrecovery.com",
  /**
   * PHONE as stored in facilities.csv. The site displays the same number as
   * site.phone, "(949) 649-0702"; the tel: form is identical either way.
   */
  phone: "1-949-649-0702",
  phoneTel: site.phoneHref.replace(/^tel:/, ""),
  /** YYYY-MM-DD. Blank in facilities.csv as of 2026-10-07. */
  lastReviewed: "",
  /** Copy of the CSV's CONTENT_SIGNOFF cell. Blank as of 2026-10-07. */
  contentSignoff: "",
} as const;

// Slash-canonical, like every route on this site (trailingSlash: true).
export const EDITORIAL_POLICY_PATH = "/editorial-policy/";
export const EDITORIAL_POLICY_URL = absoluteUrl(EDITORIAL_POLICY_PATH);
export const CORRECTIONS_ANCHOR = "content-updates-and-corrections";
export const ORGANIZATION_ID = `${site.url}/#organization`;

export const editorialMissing: string[] = [
  !editorial.editorialEmail && "EDITORIAL_EMAIL",
  !/^\d{4}-\d{2}-\d{2}$/.test(editorial.lastReviewed) && "LAST_REVIEWED",
  !editorial.contentSignoff && "CONTENT_SIGNOFF",
].filter((f): f is string => Boolean(f));

/** Every field filled and signed off: the policy may be public. */
export const editorialPolicyReady = editorialMissing.length === 0;

/** Whether this build serves the page at all (previews do, for review). */
export const editorialPolicyServed =
  editorialPolicyReady || process.env.VERCEL_ENV !== "production";

/** "2026-09-30" -> "September 2026". */
function monthYear(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * The policy body, read at build time from content/editorial-policy.html — an
 * unedited copy of the package's templates/editorial-policy.html. When the
 * master copy changes, replace that file wholesale; never hand-edit it.
 * Unfilled fields are left as their {{TOKEN}} so they are impossible to miss in
 * a preview, and a ready policy that still has one fails the build.
 *
 * The template's /about/ link already matches this site's About URL, so it is
 * left as is.
 */
export function editorialPolicyBody(): string {
  const file = path.join(process.cwd(), "content/editorial-policy.html");
  const fields: Record<string, string> = {
    FACILITY_NAME: editorial.facilityName,
    DOMAIN: editorial.domain,
    EDITORIAL_EMAIL: editorial.editorialEmail,
    PHONE: editorial.phone,
    PHONE_TEL: editorial.phoneTel,
    LAST_REVIEWED: editorial.lastReviewed && monthYear(editorial.lastReviewed),
  };

  const html = readFileSync(file, "utf8")
    // Header comment is dev notes, not page content.
    .replace(/<!--[\s\S]*?-->/g, "")
    // PageHero renders the page's single H1.
    .replace(/<h1>[\s\S]*?<\/h1>/, "")
    .replace(/\{\{([A-Z_]+)\}\}/g, (token, name: string) =>
      fields[name] ? escapeHtml(fields[name]) : token,
    )
    .trim();

  if (editorialPolicyReady && html.includes("{{")) {
    // README: "Any hit blocks launch." Fail the build rather than ship it.
    throw new Error(
      `Editorial policy still contains a placeholder: ${html.match(/\{\{[^}]*\}\}/)?.[0]}`,
    );
  }

  return html;
}
