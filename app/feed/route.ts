import { site } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";

// The WordPress site served an RSS feed at /feed/, so existing subscribers and
// aggregators still request it. Keep it alive rather than 404ing them.

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts();
  const items = posts
    .map((p) => {
      const url = `${site.url}/blog/${p.slug}`;
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.date + "T00:00:00Z").toUTCString()}</pubDate>
      <category>${esc(p.category)}</category>
      <description>${esc(p.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const latest = posts[0]?.date;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)}</title>
    <link>${site.url}/blog</link>
    <atom:link href="${site.url}/feed" rel="self" type="application/rss+xml" />
    <description>${esc(site.description)}</description>
    <language>en-US</language>${
      latest
        ? `\n    <lastBuildDate>${new Date(latest + "T00:00:00Z").toUTCString()}</lastBuildDate>`
        : ""
    }
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
