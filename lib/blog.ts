import fs from "node:fs";
import path from "node:path";

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readMinutes: number;
  bodyHtml: string;
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
  remoteCover?: boolean; // remote covers render with next/image `unoptimized`
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// A rotating set of local cover images so each post has a pleasant thumbnail.
const COVERS = [
  "/images/stock/stock-01.jpg",
  "/images/stock/stock-03.jpg",
  "/images/stock/stock-04.jpg",
  "/images/stock/stock-06.jpg",
  "/images/stock/stock-07.jpg",
  "/images/stock/stock-09.jpg",
  "/images/stock/stock-10.jpg",
  "/images/stock/stock-12.jpg",
  "/images/stock/unsplash-beach.jpg",
  "/images/stock/unsplash-02.jpg",
  "/images/facility/facility-03.jpg",
  "/images/facility/facility-06.jpg",
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
