"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogCard } from "@/lib/blog";
import { ArrowRight, Clock } from "@/components/icons";

export default function BlogIndex({
  posts,
  categories,
}: {
  posts: BlogCard[];
  categories: string[];
}) {
  const [active, setActive] = useState<string>("All");
  // VIS-1640 — the index rendered all ~80 cards at once. Paginate to 10.
  const [page, setPage] = useState(1);
  const gridTopRef = useRef<HTMLDivElement | null>(null);
  const didMount = useRef(false);

  const filtered = useMemo(
    () => (active === "All" ? posts : posts.filter((p) => p.category === active)),
    [active, posts]
  );

  const PER_PAGE = 10;
  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  // Changing the category resets to page 1.
  useEffect(() => { setPage(1); }, [active]);

  // Scroll the grid back into view on page change — but not on first render,
  // which would yank the viewport on load.
  useEffect(() => {
    if (!didMount.current) { didMount.current = true; return; }
    gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [current]);

  const fmt = (iso: string) => {
    const d = new Date(iso.includes("T") ? iso : iso + "T00:00:00");
    return isNaN(d.getTime())
      ? ""
      : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div className="container-x">
      {/* Filter bar */}
      <div className="flex flex-wrap justify-center gap-2.5">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              active === c
                ? "bg-ocean-500 text-white shadow-soft"
                : "border border-ocean-200 bg-white text-navy hover:border-ocean-400 hover:text-ocean-600"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div ref={gridTopRef} className="scroll-mt-32" />

      <p className="mt-6 text-center text-sm text-navy/50">
        {filtered.length === 0
          ? "No articles in this category yet."
          : `Showing ${(current - 1) * PER_PAGE + 1}–${Math.min(current * PER_PAGE, filtered.length)} of ${filtered.length} article${filtered.length === 1 ? "" : "s"}`}
      </p>

      {/* Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ocean-100 transition-all hover:-translate-y-1.5 hover:shadow-card"
          >
            <div className="relative h-44 overflow-hidden">
              <Image
                src={post.cover}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ocean-700">
                {post.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-3 text-xs text-navy/45">
                <span>{fmt(post.date)}</span>
                {post.readMinutes != null && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {post.readMinutes} min read
                  </span>
                )}
              </div>
              {/* h2: the card grid is the first section after the page h1. */}
              <h2 className="mt-3 flex-1 text-lg font-semibold leading-snug text-navy group-hover:text-ocean-700">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-navy/60">{post.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-600 transition-all group-hover:gap-2.5">
                Read Article <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination (VIS-1640) */}
      {pageCount > 1 && (
        <nav
          aria-label="Blog pagination"
          className="mt-12 flex flex-wrap items-center justify-center gap-2"
        >
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={current === 1}
            className="rounded-full border border-ocean-200 bg-white px-4 py-2 text-sm font-semibold text-navy transition-colors hover:border-ocean-400 hover:text-ocean-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              aria-current={n === current ? "page" : undefined}
              aria-label={`Page ${n}`}
              className={`h-10 min-w-10 rounded-full px-3 text-sm font-semibold transition-colors ${
                n === current
                  ? "bg-ocean-500 text-white shadow-soft"
                  : "border border-ocean-200 bg-white text-navy hover:border-ocean-400 hover:text-ocean-600"
              }`}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={current === pageCount}
            className="rounded-full border border-ocean-200 bg-white px-4 py-2 text-sm font-semibold text-navy transition-colors hover:border-ocean-400 hover:text-ocean-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
