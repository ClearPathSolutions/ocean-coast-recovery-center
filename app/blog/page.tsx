import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BlogIndex from "@/components/BlogIndex";
import CallbackCTA from "@/components/CallbackCTA";
import { getAllPosts, coverFor, type BlogCard } from "@/lib/blog";
import { getClarionPosts, CLARION_CATEGORY } from "@/lib/clarionBlog";

export const metadata: Metadata = {
  title: "Blog — Recovery Insights & Resources",
  description:
    "Expert articles on addiction, recovery, detox, mental health, and family healing from the team at Ocean Coast Recovery Center in Costa Mesa, CA.",
};

export default async function BlogPage() {
  const localPosts = getAllPosts();
  const clarionPosts = await getClarionPosts();

  // Merge both sources into one card list, dedupe by slug (local wins),
  // then sort newest-first so Clarion and local posts interleave by date.
  const bySlug = new Map<string, BlogCard>();

  for (const p of localPosts) {
    bySlug.set(p.slug, {
      slug: p.slug,
      title: p.title,
      date: p.date,
      category: p.category,
      excerpt: p.excerpt,
      cover: coverFor(p.slug),
      readMinutes: p.readMinutes,
    });
  }
  for (const p of clarionPosts) {
    if (bySlug.has(p.slug)) continue; // don't let a Clarion post shadow a local one
    bySlug.set(p.slug, {
      slug: p.slug,
      title: p.title,
      date: p.publishedAt,
      category: CLARION_CATEGORY,
      excerpt: p.excerpt,
      // Clarion supplies a `coverImageUrl`, but it points at third-party stock
      // (Unsplash). Site policy is approved facility photography only, so the
      // remote cover is deliberately ignored in favour of a local one.
      cover: coverFor(p.slug),
    });
  }

  const posts = Array.from(bySlug.values()).sort((a, b) => (a.date < b.date ? 1 : -1));
  const categories = Array.from(new Set(posts.map((p) => p.category))).sort();

  return (
    <>
      <PageHero
        eyebrow="Insights & Resources"
        title="The Ocean Coast blog"
        subtitle="Guidance on addiction, recovery, detox, mental health, and family healing — written to help you and your loved ones take the next step."
        image="/images/facility/bedroom-coastal-wide.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <section className="section-foam py-16 sm:py-20">
        <BlogIndex posts={posts} categories={categories} />
      </section>

      <CallbackCTA />
    </>
  );
}
