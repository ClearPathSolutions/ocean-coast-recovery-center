import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import DocSections from "@/components/DocSections";
import FAQ from "@/components/FAQ";
import SectionHeading from "@/components/SectionHeading";
import CallbackCTA from "@/components/CallbackCTA";
import { getInsuranceDocs, getDoc } from "@/lib/contentPages";
import { insuranceMeta, getInsuranceMeta } from "@/lib/insuranceMeta";
import { site } from "@/lib/site";
import { Phone, ChevronRight } from "@/components/icons";

export function generateStaticParams() {
  return getInsuranceDocs().map((d) => ({ carrier: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ carrier: string }>;
}): Promise<Metadata> {
  const { carrier } = await params;
  const doc = getDoc("insurance", carrier);
  const meta = getInsuranceMeta(carrier);
  if (!doc || !meta) return {};
  return {
    title: `${meta.name} Rehab Coverage`,
    description: doc.metaDescription || `Does ${meta.name} cover rehab? Verify your ${meta.name} benefits for treatment at Ocean Coast Recovery in Costa Mesa, CA.`,
  };
}

export default async function InsurancePage({
  params,
}: {
  params: Promise<{ carrier: string }>;
}) {
  const { carrier } = await params;
  const doc = getDoc("insurance", carrier);
  const meta = getInsuranceMeta(carrier);
  if (!doc || !meta) notFound();

  return (
    <>
      <PageHero
        eyebrow="Insurance coverage"
        title={`${meta.name} rehab coverage`}
        subtitle={doc.heroSubtitle || `Find out how your ${meta.name} plan can help cover treatment at Ocean Coast Recovery.`}
        image={meta.image}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Insurance", href: "/insurance" },
          { label: meta.short },
        ]}
      />

      {/* Verify banner */}
      <section className="bg-white py-12">
        <div className="container-x">
          <div className="flex flex-col items-center justify-between gap-4 rounded-4xl bg-gradient-to-br from-navy to-ocean-800 px-8 py-8 text-center shadow-lift sm:flex-row sm:text-left">
            <div>
              <h2 className="text-2xl font-semibold text-white">Verify your {meta.name} benefits</h2>
              <p className="mt-1 text-white/75">Free, 100% confidential, and takes just a few minutes.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/admissions#verify" className="btn-primary whitespace-nowrap">Free Benefits Check</Link>
              <a href={site.phoneHref} className="btn-outline whitespace-nowrap"><Phone className="h-4 w-4" /> {site.phone}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white pb-4 pt-2">
        <div className="container-x mx-auto max-w-3xl">
          <div className="space-y-4">
            {doc.intro.map((p, i) => (
              <p key={i} className="leading-relaxed text-navy/70">{p}</p>
            ))}
          </div>
        </div>
      </section>

      <DocSections sections={doc.sections} startTint />

      {doc.faqs && doc.faqs.length > 0 && <FAQ items={doc.faqs} title={`${meta.name} coverage — FAQs`} />}

      {/* Other carriers */}
      <section className="section-foam py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Other Carriers" title="More insurance we work with" />
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
            {insuranceMeta
              .filter((c) => c.slug !== meta.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/insurance/${c.slug}`}
                  className="rounded-full border border-ocean-200 bg-white px-5 py-2.5 font-medium text-navy transition-colors hover:border-ocean-400 hover:text-ocean-600"
                >
                  {c.name}
                </Link>
              ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/insurance" className="inline-flex items-center gap-1.5 font-semibold text-ocean-600 hover:gap-2.5">
              View all accepted insurance <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CallbackCTA />
    </>
  );
}
