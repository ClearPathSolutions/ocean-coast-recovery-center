import Link from "next/link";
import type { Byline, BylinePerson } from "@/lib/blog";
import { editorialPolicyServed, EDITORIAL_POLICY_PATH } from "@/lib/editorial";

/** Date-only and UTC, so "2026-09-30" can't render as the 29th in US zones. */
function formatReviewDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function PersonName({ person, rel }: { person: BylinePerson; rel?: string }) {
  const label = person.credentials ? `${person.name}, ${person.credentials}` : person.name;
  // Names link to a bio page when one exists (same tab); an off-site profile
  // opens in a new tab; Clarion authors have neither.
  return person.bioPath ? (
    <Link href={person.bioPath} rel={rel}>
      {label}
    </Link>
  ) : person.externalUrl ? (
    <a href={person.externalUrl} target="_blank" rel={[rel, "noopener noreferrer"].filter(Boolean).join(" ")}>
      {label}
    </a>
  ) : (
    <>{label}</>
  );
}

/**
 * Article byline, from the editorial policy package's templates/article-byline.html.
 * Sits directly under the post's H1. The author line renders only when the post
 * names one. The medical reviewer always renders: the client overrode the
 * package's "no default reviewer" rule, so a post without its own reviewer gets
 * the site default (DEFAULT_REVIEWER in lib/blog.ts), with or without a review
 * date. "Last reviewed" shows only when there is a real date. The "Updated" item is
 * omitted because posts carry no modified date (the publish date is shown in
 * the article's meta row).
 */
export default function ArticleByline({ byline }: { byline: Byline }) {
  const { author, reviewer, lastReviewed } = byline;
  const meta = [
    lastReviewed && (
      <span key="reviewed">
        Last reviewed <time dateTime={lastReviewed}>{formatReviewDate(lastReviewed)}</time>
      </span>
    ),
    // Linked only where the policy is served, so production never links a 404.
    editorialPolicyServed && (
      <Link key="policy" href={EDITORIAL_POLICY_PATH}>
        Editorial policy
      </Link>
    ),
  ].filter(Boolean);

  if (!author && !reviewer && meta.length === 0) return null;

  return (
    <div className="article-byline">
      {author && (
        <p className="byline-line">
          Written by <PersonName person={author} rel="author" />
        </p>
      )}
      {reviewer && (
        <p className="byline-line">
          Medically reviewed by <PersonName person={reviewer} />
        </p>
      )}
      {meta.length > 0 && (
        <p className="byline-meta">{meta.flatMap((m, i) => (i === 0 ? [m] : [" · ", m]))}</p>
      )}
    </div>
  );
}
