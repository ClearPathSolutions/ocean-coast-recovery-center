import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import DocSections from "@/components/DocSections";
import ProgramGrid from "@/components/ProgramGrid";
import FAQ from "@/components/FAQ";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import InsuranceBand from "@/components/InsuranceBand";
import CallbackCTA from "@/components/CallbackCTA";
import { getSubstanceDocs, getDoc } from "@/lib/contentPages";
import { substanceMeta, getSubstanceMeta } from "@/lib/substanceMeta";
import { ArrowRight, ChevronRight } from "@/components/icons";

export function generateStaticParams() {
  return getSubstanceDocs().map((d) => ({ substance: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ substance: string }>;
}): Promise<Metadata> {
  const { substance } = await params;
  const doc = getDoc("substances", substance);
  const meta = getSubstanceMeta(substance);
  if (!doc || !meta) return {};
  return {
    title: `${meta.label} in Costa Mesa, CA`,
    description: doc.metaDescription || doc.heroSubtitle,
  };
}

export default async function SubstancePage({
  params,
}: {
  params: Promise<{ substance: string }>;
}) {
  const { substance } = await params;
  const doc = getDoc("substances", substance);
  const meta = getSubstanceMeta(substance);
  if (!doc || !meta) notFound();

  return (
    <>
      <PageHero
        eyebrow="Medically supervised detox"
        title={meta.heroTitle}
        subtitle={doc.heroSubtitle}
        image={meta.image}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Treatment", href: "/treatment" },
          { label: "Detox", href: "/treatment/detox" },
          { label: meta.label },
        ]}
      />

      {/* Intro */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x mx-auto max-w-3xl">
          <SectionHeading align="left" eyebrow="Welcome to Ocean Coast Recovery" title={meta.heroTitle} />
          <div className="mt-5 space-y-4">
            {doc.intro.map((p, i) => (
              <p key={i} className="leading-relaxed text-navy/70">{p}</p>
            ))}
          </div>
        </div>
      </section>

      <DocSections sections={doc.sections} startTint />

      {doc.faqs && doc.faqs.length > 0 && (
        <FAQ items={doc.faqs} title={`${meta.label} — frequently asked questions`} />
      )}

      {/* Other substances */}
      <section className="section-foam py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Specialized Protocols" title="Detox for other substances" />
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
            {substanceMeta
              .filter((s) => s.slug !== meta.slug)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/treatment/detox/${s.slug}`}
                  className="rounded-full border border-ocean-200 bg-white px-5 py-2.5 font-medium text-navy transition-colors hover:border-ocean-400 hover:text-ocean-600"
                >
                  {s.label}
                </Link>
              ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/treatment/detox" className="inline-flex items-center gap-1.5 font-semibold text-ocean-600 hover:gap-2.5">
              Back to Detox overview <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <ProgramGrid eyebrow="Your Path Through Care" title="Continue your recovery" exclude="/treatment/detox" />
      <InsuranceBand />
      <section className="bg-white pb-4 pt-2 text-center">
        <Link href="/admissions" className="btn-ocean">Start Your Recovery Today <ArrowRight className="h-4 w-4" /></Link>
      </section>
      <CallbackCTA />
    </>
  );
}
