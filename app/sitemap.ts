import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import { getClarionPosts } from "@/lib/clarionBlog";
import { populations } from "@/lib/populations";
import { getSubstanceDocs, getInsuranceDocs } from "@/lib/contentPages";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    // Bio pages, in the order the /about team grid lists them.
    "/about/pamela-tambini",
    "/about/shawn-young",
    "/about/michael-mcarthur",
    "/about/riky-hanaumi",
    "/about/justin-white",
    "/about/jeremiah-ross",
    "/about/monica-olivares",
    "/about/jacob-cameron",
    "/about/vahan-oknayan",
    "/about/alanna-mcmurtrey",
    "/about/halie-nall",
    "/about/bj-thome",
    "/treatment",
    "/treatment/detox",
    "/treatment/residential",
    "/treatment/dual-diagnosis",
    "/treatment/aftercare",
    "/treatment/family-therapy",
    "/who-we-help",
    "/admissions",
    "/insurance",
    "/tour",
    "/contact",
    "/blog",
    "/privacy",
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const populationRoutes = populations.map((p) => ({
    url: absoluteUrl(`/who-we-help/${p.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const localPosts = getAllPosts();
  const postRoutes = localPosts.map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.date + "T00:00:00"),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  // Clarion feed posts render at /blog/<slug> exactly like local ones, so they
  // have to be listed here too. Omitting them is what V0087 recorded: a post
  // that is reachable and indexable but absent from the sitemap. Local slugs
  // win, matching the dedupe in app/blog/page.tsx.
  const localSlugs = new Set(localPosts.map((p) => p.slug));
  const clarionRoutes = (await getClarionPosts())
    .filter((p) => !localSlugs.has(p.slug))
    .map((p) => {
      const published = new Date(p.publishedAt);
      return {
        url: absoluteUrl(`/blog/${p.slug}`),
        lastModified: isNaN(published.getTime()) ? now : published,
        changeFrequency: "yearly" as const,
        priority: 0.6,
      };
    });

  const substanceRoutes = getSubstanceDocs().map((d) => ({
    url: absoluteUrl(`/treatment/detox/${d.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const insuranceRoutes = getInsuranceDocs().map((d) => ({
    url: absoluteUrl(`/insurance/${d.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...populationRoutes,
    ...substanceRoutes,
    ...insuranceRoutes,
    ...postRoutes,
    ...clarionRoutes,
  ];
}
