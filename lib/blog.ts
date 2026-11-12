import fs from "node:fs";
import path from "node:path";
import { team, teamSlug, type TeamMember } from "@/lib/team";
import { site } from "@/lib/site";

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readMinutes: number;
  bodyHtml: string;
  /**
   * The editorial policy's per-post fields, all optional. People are bio-page
   * slugs from lib/team.ts (e.g. "riky-hanaumi" for /about/riky-hanaumi/), so
   * every credited name links to a real bio. A missing written_by means no
   * author line. A missing reviewed_by falls back to the site's default medical
   * reviewer (DEFAULT_REVIEWER below), so every post carries a reviewer.
   */
  written_by?: string;
  reviewed_by?: string;
  /** YYYY-MM-DD. Optional; shown (and emitted as lastReviewed) only when set. */
  last_reviewed?: string;
};

// Unified card shape for the blog index — covers both local posts and posts
// pulled from the Clarion feed, so they can be merged and sorted together.
export type BlogCard = {
  slug: string;
  title: string;
  date: string; // ISO or YYYY-MM-DD — compared/sorted lexicographically
  category: string;
  excerpt: string;
  cover: string;
  readMinutes?: number; // optional: Clarion feed items have no body to measure
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// A rotating set of local cover images so each post has a pleasant thumbnail.
const COVERS = [
  "/images/facility/exterior-front.jpg",
  "/images/facility/exterior-side.jpg",
  "/images/facility/living-room.jpg",
  "/images/facility/living-room-wide.jpg",
  "/images/facility/dining-room.jpg",
  "/images/facility/dining-kitchen.jpg",
  "/images/facility/kitchen.jpg",
  "/images/facility/kitchen-island.jpg",
  "/images/facility/bedroom-twin.jpg",
  "/images/facility/bedroom-single.jpg",
  "/images/facility/pool-wide.jpg",
  "/images/facility/aerial-neighborhood.jpg",
];

let cache: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cache) return cache;
  let files: string[] = [];
  try {
    files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }
  const posts = files
    .map((f) => {
      try {
        const raw = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, f), "utf-8"));
        return raw as Post;
      } catch {
        return null;
      }
    })
    .filter((p): p is Post => !!p && !!p.title && !!p.bodyHtml)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  cache = posts;
  return posts;
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function coverFor(slug: string): string {
  // Deterministic pick based on slug so covers are stable across builds.
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  return COVERS[hash % COVERS.length];
}

export function getCategories(): string[] {
  const set = new Set(getAllPosts().map((p) => p.category));
  return Array.from(set).sort();
}

export function formatDate(iso: string): string {
  // Local posts are date-only (YYYY-MM-DD); Clarion posts are full ISO timestamps.
  const d = new Date(iso.includes("T") ? iso : iso + "T00:00:00");
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function relatedPosts(slug: string, category: string, n = 3): Post[] {
  // Rotate from this post's position so each post is linked from the ones just
  // before it. Always taking the first n left most older posts reachable from
  // a single internal link (the blog index).
  const list = getAllPosts();
  const idx = list.findIndex((p) => p.slug === slug);
  const all = (idx >= 0 ? [...list.slice(idx + 1), ...list.slice(0, idx)] : list).filter(
    (p) => p.slug !== slug
  );
  const sameCat = all.filter((p) => p.category === category);
  const others = all.filter((p) => p.category !== category);
  return [...sameCat, ...others].slice(0, n);
}

// ---------------------------------------------------------------------------
// Article byline (editorial policy package: templates/article-byline.html)
// ---------------------------------------------------------------------------

export type BylinePerson = {
  name: string;
  credentials: string | null;
  /** Bio page on this site, or null when the person has none (Clarion's author_name). */
  bioPath: string | null;
  /** Off-site profile URL, used only when there is no bioPath. */
  externalUrl?: string | null;
};

export type Byline = {
  author: BylinePerson | null;
  /** Always set for published posts: the post's own reviewer or DEFAULT_REVIEWER. */
  reviewer: BylinePerson | null;
  lastReviewed: string | null;
};

function teamPerson(slug: string, post: string): BylinePerson {
  const m: TeamMember | undefined = team.find((t) => teamSlug(t) === slug);
  // Fail the build: a byline naming someone without a bio page is exactly
  // what the policy promises never to publish.
  if (!m) throw new Error(`${post}: byline references unknown team slug "${slug}"`);
  return { name: m.name, credentials: m.creds || null, bioPath: `${m.href}/` };
}

/**
 * Default medical reviewer for every blog post on this site.
 *
 * The client has overridden the editorial policy package's "no default reviewer"
 * rule: every post, past and future, shows a medical reviewer. A post's own
 * reviewer (Clarion's medically_reviewed_by* fields, or a local reviewed_by)
 * wins field by field; whatever it leaves blank is filled from here.
 */
export const DEFAULT_REVIEWER = {
  name: "Dr. Pamela Tambini",
  credentials: "M.D.",
  // Slash form is what the live bio page serves (the bare path 308s).
  url: `${site.url}/about/pamela-tambini/`,
} as const;

const bareHost = (h: string) => h.toLowerCase().replace(/^www\./, "");

/**
 * Resolve a reviewer from possibly-partial source fields. A URL on this site's
 * host (www or not, slash or not) becomes an internal slash-canonical bioPath,
 * so it renders as a same-tab <Link> and its schema URL lands on site.url.
 */
export function resolveReviewer(raw?: {
  name?: string | null;
  credentials?: string | null;
  url?: string | null;
}): BylinePerson {
  const name = raw?.name?.trim() || DEFAULT_REVIEWER.name;
  const credentials = raw?.credentials?.trim() || DEFAULT_REVIEWER.credentials;
  const rawUrl = raw?.url?.trim() || DEFAULT_REVIEWER.url;
  let abs: URL;
  try {
    abs = new URL(rawUrl, site.url);
  } catch {
    abs = new URL(DEFAULT_REVIEWER.url);
  }
  if (bareHost(abs.hostname) === bareHost(new URL(site.url).hostname)) {
    const path = abs.pathname.replace(/\/+$/, "");
    return { name, credentials, bioPath: `${path}/` };
  }
  return { name, credentials, bioPath: null, externalUrl: abs.href };
}

/** Byline for a local post, from its optional written_by / reviewed_by / last_reviewed. */
export function getByline(post: Post): Byline {
  if (post.last_reviewed && !/^\d{4}-\d{2}-\d{2}$/.test(post.last_reviewed)) {
    throw new Error(`${post.slug}: last_reviewed must be YYYY-MM-DD, got "${post.last_reviewed}"`);
  }
  const lastReviewed = post.last_reviewed || null;
  // A named team reviewer keeps their own name and bio; no reviewed_by means
  // the site default. Credentials are only defaulted for the default reviewer,
  // so another team member is never labelled "M.D.".
  const named = post.reviewed_by ? teamPerson(post.reviewed_by, post.slug) : null;
  const reviewer =
    named && named.name !== DEFAULT_REVIEWER.name
      ? named
      : resolveReviewer({ name: named?.name, credentials: named?.credentials, url: named?.bioPath });
  return {
    author: post.written_by ? teamPerson(post.written_by, post.slug) : null,
    reviewer,
    lastReviewed,
  };
}
