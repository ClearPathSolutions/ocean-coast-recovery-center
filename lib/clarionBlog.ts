import { clarion } from "@/lib/site";

// Posts pulled from Clarion's public feed. Fetched server-side so they merge
// into the same server-rendered grid as the local posts (crawlable + sortable).
export type ClarionPost = {
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl: string;
  authorName: string;
  publishedAt: string; // ISO 8601
  bodyHtml?: string; // only present from the single-post endpoint
  seo?: { title?: string; description?: string };
};

// Category label applied to every Clarion post in the blog index filter bar.
export const CLARION_CATEGORY = "Recovery";

const REVALIDATE = 3600; // re-fetch at most hourly (ISR)

function endpoint(path: string, extra: Record<string, string> = {}) {
  const qs = new URLSearchParams({ site_key: clarion.siteKey, ...extra });
  return `${clarion.api}${path}?${qs.toString()}`;
}

/**
 * Clarion post bodies are third-party HTML injected via dangerouslySetInnerHTML.
 * The site CSP has to allow 'unsafe-inline' for scripts (Next.js emits inline
 * bootstrap + JSON-LD), so an injected <script> WOULD execute — CSP is not a
 * backstop here. Strip the executable surface before it ever reaches the DOM.
 *
 * Deliberately conservative: an allow-list parser would be better, but that
 * means a dependency, and this content is semantic article markup.
 */
export function sanitizeRemoteHtml(html: string): string {
  return html
    // Drop whole elements that can execute or restyle the page.
    .replace(/<(script|style|iframe|object|embed|link|meta|base|form)\b[\s\S]*?<\/\1\s*>/gi, "")
    // ...and their self-closing / unterminated forms.
    .replace(/<(script|style|iframe|object|embed|link|meta|base|form)\b[^>]*>/gi, "")
    // Inline event handlers: onclick=, onerror=, onload=…
    .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "")
    .replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, "")
    // javascript:/data: URLs in href/src.
    .replace(/\s(href|src)\s*=\s*"\s*(javascript|data|vbscript):[^"]*"/gi, "")
    .replace(/\s(href|src)\s*=\s*'\s*(javascript|data|vbscript):[^']*'/gi, "");
}

function normalize(p: unknown): ClarionPost | null {
  const o = p as Record<string, unknown>;
  if (!o || typeof o.slug !== "string" || typeof o.title !== "string") return null;
  const seo = o.seo_meta as { title?: string; description?: string } | undefined;
  return {
    slug: o.slug,
    title: o.title,
    excerpt: typeof o.excerpt === "string" ? o.excerpt : "",
    coverImageUrl: typeof o.cover_image_url === "string" ? o.cover_image_url : "",
    authorName: typeof o.author_name === "string" ? o.author_name : "",
    publishedAt: typeof o.published_at === "string" ? o.published_at : "",
    bodyHtml: typeof o.body_html === "string" ? sanitizeRemoteHtml(o.body_html) : undefined,
    seo: seo ? { title: seo.title, description: seo.description } : undefined,
  };
}

/** All published Clarion posts. Returns [] on any failure so the blog never breaks. */
export async function getClarionPosts(): Promise<ClarionPost[]> {
  try {
    const res = await fetch(endpoint("/blog/public/feed"), {
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const posts = Array.isArray(data?.posts) ? data.posts : [];
    return posts.map(normalize).filter((p: ClarionPost | null): p is ClarionPost => !!p);
  } catch {
    return [];
  }
}

/** A single Clarion post (includes bodyHtml), or null if not found / on failure. */
export async function getClarionPost(slug: string): Promise<ClarionPost | null> {
  try {
    const res = await fetch(endpoint("/blog/public/post", { slug }), {
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return normalize(data?.post ?? data);
  } catch {
    return null;
  }
}

/** Rough read-time estimate from HTML body (~200 wpm). */
export function estimateReadMinutes(html: string): number {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
