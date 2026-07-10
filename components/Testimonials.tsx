import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Star, GoogleG, ArrowRight } from "@/components/icons";
import { reviews, aggregate, googleReviewsUrl } from "@/lib/reviews";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex text-sand-400" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < n ? "" : "text-navy/15"}`} />
      ))}
    </div>
  );
}

export default function Testimonials({ variant = "light" }: { variant?: "light" | "foam" }) {
  return (
    <section className={variant === "foam" ? "section-foam py-20 sm:py-24" : "bg-white py-20 sm:py-24"}>
      <div className="container-x">
        <SectionHeading
          eyebrow="Stories of Hope & Recovery"
          title="What people say about Ocean Coast"
          subtitle="Real reviews from clients, alumni, and the families who trusted us with their loved ones."
        />

        {/* Aggregate badge */}
        <Reveal className="mx-auto mt-8 flex w-fit items-center gap-4 rounded-2xl border border-ocean-100 bg-white px-6 py-4 shadow-soft">
          <GoogleG className="h-8 w-8" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-navy">{aggregate.rating}</span>
            <Stars n={5} />
          </div>
          <span className="hidden text-navy/50 sm:inline">·</span>
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-ocean-600 hover:text-ocean-700"
          >
            {aggregate.count} Google reviews
          </a>
        </Reveal>

        {/* Masonry of real reviews */}
        <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {reviews.map((r, i) => (
            <Reveal
              key={r.name + i}
              delay={(i % 3) * 70}
              className="break-inside-avoid rounded-3xl border border-ocean-100 bg-white p-6 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <Stars n={r.rating} />
                <GoogleG className="h-5 w-5" />
              </div>
              <p className="mt-4 leading-relaxed text-navy/80">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3 border-t border-ocean-100 pt-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ocean-400 to-navy text-sm font-semibold text-white">
                  {r.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-navy">{r.name}</p>
                  <p className="text-xs text-navy/45">{r.posted} · via {r.platform}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-navy">
            Read all reviews on Google <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
