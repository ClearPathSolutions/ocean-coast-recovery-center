import Link from "next/link";
import { site } from "@/lib/site";
import { Phone, ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-navy-dark px-6 pt-[120px] lg:pt-[148px] text-center">
      <div className="max-w-lg">
        <p className="font-display text-7xl font-semibold text-sand-300">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          This page drifted out to sea.
        </h1>
        <p className="mt-3 text-white/75">
          The page you&rsquo;re looking for can&rsquo;t be found — but help is always within reach.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            Back Home <ArrowRight className="h-4 w-4" />
          </Link>
          <a href={site.phoneHref} className="btn-outline">
            <Phone className="h-4 w-4" /> {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
