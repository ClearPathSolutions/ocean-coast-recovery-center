import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CallbackCTA from "@/components/CallbackCTA";
import { site } from "@/lib/site";
import { getAllPosts, getPost, coverFor, formatDate, relatedPosts } from "@/lib/blog";
import { getClarionPosts, getClarionPost, estimateReadMinutes, CLARION_CATEGORY } from "@/lib/clarionBlog";
import { Clock, ArrowRight, Phone, ArrowLeft } from "@/components/icons";

// Normalized shape both local and Clarion posts render through.
type PostView = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  dateISO: string;
  cover: string;
  remoteCover: boolean;
  readMinutes: number;
  bodyHtml: string;
  seo?: { title?: string; description?: string };
};

async function loadView(slug: string): Promise<PostView | null> {
  const local = getPost(slug);
  if (local) {
    return {
      slug: local.slug,
      title: local.title,
      category: local.category,
      excerpt: local.excerpt,
      dateISO: local.date,
      cover: coverFor(local.slug),
      remoteCover: false,
      readMinutes: local.readMinutes,
      bodyHtml: local.bodyHtml,
    };
  }
  const cp = await getClarionPost(slug);
  if (cp && cp.bodyHtml) {
    return {
      slug: cp.slug,
      title: cp.title,
      category: CLARION_CATEGORY,
      excerpt: cp.excerpt,
      dateISO: cp.publishedAt,
      cover: cp.coverImageUrl || coverFor(cp.slug),
      remoteCover: !!cp.coverImageUrl,
      readMinutes: estimateReadMinutes(cp.bodyHtml),
      bodyHtml: cp.bodyHtml,
      seo: cp.seo,
    };
  }
  return null;
}

export async function generateStaticParams() {
  const localSlugs = getAllPosts().map((p) => p.slug);
  const clarionSlugs = (await getClarionPosts()).map((p) => p.slug);
  const seen = new Set<string>();
  return [...localSlugs, ...clarionSlugs]
    .filter((slug) => (seen.has(slug) ? false : (seen.add(slug), true)))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const view = await loadView(slug);
  if (!view) return {};
  return {
    // Bare title — the root layout template appends "| {site.name}". Clarion's
    // seo_meta.title already bakes in the site name, so use the plain title here.
    title: view.title,
    description: view.seo?.description ?? view.excerpt,
    openGraph: {
      title: view.seo?.title ?? view.title,
      description: view.seo?.description ?? view.excerpt,
      type: "article",
      images: [{ url: view.cover }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await loadView(slug);
  if (!post) notFound();

  const related = relatedPosts(post.slug, post.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.dateISO,
    description: post.excerpt,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        image={post.cover}
        unoptimizedImage={post.remoteCover}
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.category }]}
      />

      <article className="bg-white py-16 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="flex items-center gap-4 border-b border-ocean-100 pb-6 text-sm text-navy/50">
              <span>{formatDate(post.dateISO)}</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {post.readMinutes} min read
              </span>
              <span className="rounded-full bg-ocean-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ocean-700">
                {post.category}
              </span>
            </div>

            <div
              className="prose-content mt-8 max-w-none"
              dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
            />

            <Link href="/blog" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-ocean-600 hover:gap-3">
              <ArrowLeft className="h-4 w-4" /> Back to all articles
            </Link>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-navy-dark p-7 text-white shadow-card">
              <h3 className="font-display text-2xl font-semibold">Ready to talk?</h3>
              <p className="mt-2 text-sm text-white/75">
                Our caring admissions team is here for you 24/7 — confidential and judgment-free.
              </p>
              <a href={site.phoneHref} className="btn-primary mt-5 w-full">
                <Phone className="h-4 w-4" /> {site.phone}
              </a>
              <Link href="/admissions#verify" className="btn-outline mt-3 w-full">
                Verify Insurance
              </Link>
            </div>

            {related.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-navy">Related articles</h3>
                <div className="mt-4 space-y-4">
                  {related.map((r) => (
                    <Link key={r.slug} href={`/blog/${r.slug}`} className="group flex gap-3">
                      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                        <Image src={coverFor(r.slug)} alt="" fill sizes="80px" className="object-cover" />
                      </div>
                      <span className="text-sm font-medium leading-snug text-navy group-hover:text-ocean-600">
                        {r.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </article>

      <section className="section-foam py-14">
        <div className="container-x flex flex-col items-center justify-between gap-4 rounded-4xl bg-white p-8 shadow-soft sm:flex-row">
          <div>
            <h2 className="font-display text-2xl font-semibold text-navy">Explore more resources</h2>
            <p className="mt-1 text-navy/60">Browse our full library of recovery articles.</p>
          </div>
          <Link href="/blog" className="btn-ocean shrink-0">
            View All Articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CallbackCTA />
    </>
  );
}
