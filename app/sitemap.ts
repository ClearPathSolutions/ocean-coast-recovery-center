import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import { populations } from "@/lib/populations";
import { getSubstanceDocs, getInsuranceDocs } from "@/lib/contentPages";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/about/tami-distefano",
    "/about/elizabeth-wald",
    "/about/halie-nall",
    "/about/vahan-oknayan",
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
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const populationRoutes = populations.map((p) => ({
    url: `${base}/who-we-help/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const postRoutes = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date + "T00:00:00"),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const substanceRoutes = getSubstanceDocs().map((d) => ({
    url: `${base}/treatment/detox/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const insuranceRoutes = getInsuranceDocs().map((d) => ({
    url: `${base}/insurance/${d.slug}`,
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
  ];
}
