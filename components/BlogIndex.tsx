"use client";

import { useMemo, useState } from "react";
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

  const filtered = useMemo(
    () => (active === "All" ? posts : posts.filter((p) => p.category === active)),
    [active, posts]
  );

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

      <p className="mt-6 text-center text-sm text-navy/50">
        Showing {filtered.length} article{filtered.length === 1 ? "" : "s"}
      </p>

      {/* Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
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
                unoptimized={post.remoteCover}
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
              <h3 className="mt-3 flex-1 text-lg font-semibold leading-snug text-navy group-hover:text-ocean-700">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-navy/60">{post.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-600 transition-all group-hover:gap-2.5">
                Read Article <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
