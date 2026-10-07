import fs from "node:fs";
import path from "node:path";
import { team, teamSlug, type TeamMember } from "@/lib/team";

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
   * every credited name links to a real bio. A missing value means no line:
   * there is never a site-wide default author or reviewer.
   */
  written_by?: string;
  reviewed_by?: string;
  /** YYYY-MM-DD. The reviewer line needs both reviewed_by and this. */
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
  const all = getAllPosts().filter((p) => p.slug !== slug);
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
  /** Bio page, or null when the person has none (Clarion's author_name). */
  bioPath: string | null;
};

export type Byline = {
  author: BylinePerson | null;
  /** Set only when the post has both a reviewer and a review date. */
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

/** Byline for a local post, from its optional written_by / reviewed_by / last_reviewed. */
export function getByline(post: Post): Byline {
  if (post.last_reviewed && !/^\d{4}-\d{2}-\d{2}$/.test(post.last_reviewed)) {
    throw new Error(`${post.slug}: last_reviewed must be YYYY-MM-DD, got "${post.last_reviewed}"`);
  }
  const lastReviewed = post.last_reviewed || null;
  // Resolved even when undated, so a typo'd slug still fails the build.
  const reviewer = post.reviewed_by ? teamPerson(post.reviewed_by, post.slug) : null;
  return {
    author: post.written_by ? teamPerson(post.written_by, post.slug) : null,
    reviewer: lastReviewed ? reviewer : null,
    lastReviewed,
  };
}
