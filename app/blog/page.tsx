import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BlogIndex from "@/components/BlogIndex";
import ClarionBlog from "@/components/ClarionBlog";
import CallbackCTA from "@/components/CallbackCTA";
import { getAllPosts, getCategories, coverFor } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Recovery Insights & Resources",
  description:
    "Expert articles on addiction, recovery, detox, mental health, and family healing from the team at Ocean Coast Recovery Center in Costa Mesa, CA.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();
  const covers = Object.fromEntries(posts.map((p) => [p.slug, coverFor(p.slug)]));

  return (
    <>
      <PageHero
        eyebrow="Insights & Resources"
        title="The Ocean Coast blog"
        subtitle="Guidance on addiction, recovery, detox, mental health, and family healing — written to help you and your loved ones take the next step."
        image="/images/stock/stock-08-wide.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      {/* Existing hand-authored posts stay exactly as they are */}
      <section className="section-foam py-16 sm:py-20">
        <BlogIndex posts={posts} categories={categories} covers={covers} />
      </section>

      {/* Clarion's new posts render in their own section below — old and new coexist */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">Fresh off the press</span>
            <h2 className="mt-2 text-3xl font-semibold text-navy sm:text-4xl">More from our team</h2>
          </div>
          <div className="mt-10">
            <ClarionBlog />
          </div>
        </div>
      </section>

      <CallbackCTA />
    </>
  );
}
