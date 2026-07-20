import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "@/components/icons";

type Crumb = { label: string; href?: string };

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  crumbs = [],
  align = "left",
  unoptimizedImage = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  crumbs?: Crumb[];
  align?: "left" | "center";
  unoptimizedImage?: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-dark pt-[120px] lg:pt-[148px]">
      <Image
        src={image}
        alt=""
        fill
        priority
        unoptimized={unoptimizedImage}
        sizes="100vw"
        className="object-cover"
      />
      <div className="hero-overlay absolute inset-0" />
      <div
        className={`container-wide relative z-10 flex min-h-[46vh] flex-col justify-center py-16 sm:min-h-[52vh] sm:py-20 ${
          align === "center" ? "items-center text-center" : "items-start"
        }`}
      >
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white/90">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <ChevronRight className="h-3.5 w-3.5 opacity-60" />}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && (
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-sand-200 backdrop-blur">
            {eyebrow}
          </span>
        )}
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p
            className={`mt-5 max-w-2xl text-lg leading-relaxed text-white/85 ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
