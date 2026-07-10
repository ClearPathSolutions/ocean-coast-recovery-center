import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { Split } from "@/components/ContentBlocks";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ProgramGrid from "@/components/ProgramGrid";
import InsuranceBand from "@/components/InsuranceBand";
import CallbackCTA from "@/components/CallbackCTA";
import { populations, getPopulation } from "@/lib/populations";
import { CheckCircle } from "@/components/icons";

export function generateStaticParams() {
  return populations.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPopulation(slug);
  if (!p) return {};
  return { title: p.navLabel, description: p.metaDescription };
}

export default async function PopulationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPopulation(slug);
  if (!p) notFound();

  return (
    <>
      <PageHero
        eyebrow="Who We Help"
        title={p.heroTitle}
        subtitle={p.heroSubtitle}
        image={p.image}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Who We Help", href: "/who-we-help" },
          { label: p.navLabel },
        ]}
      />

      <Split eyebrow="Welcome to Ocean Coast Recovery" title={p.introTitle} paragraphs={p.intro} image={p.introImage} imageAlt={p.navLabel} />

      {p.stats && (
        <section className="bg-navy py-14">
          <div className="container-x grid grid-cols-1 gap-6 sm:grid-cols-3">
            {p.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90} className="text-center">
                <p className="font-display text-4xl font-semibold text-sand-300 sm:text-5xl">{s.value}</p>
                <p className="mx-auto mt-2 max-w-[240px] text-sm text-white/75">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {p.sections.map((sec, idx) => (
        <section key={sec.title} className={`${idx % 2 === 0 ? "bg-white" : "section-foam"} py-16 sm:py-20`}>
          <div className="container-x mx-auto max-w-3xl">
            <SectionHeading align="left" title={sec.title} />
            <div className="mt-5 space-y-4">
              {sec.body.map((b, i) => (
                <p key={i} className="leading-relaxed text-navy/70">{b}</p>
              ))}
            </div>
            {sec.bullets && (
              <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {sec.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-navy/75">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-ocean-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}

      <ProgramGrid eyebrow="How We Help" title="Our programs" subtitle="Every population we serve has access to our full continuum of care." />
      <InsuranceBand />
      <CallbackCTA />
    </>
  );
}
