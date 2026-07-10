import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import InsuranceBand from "@/components/InsuranceBand";
import CallbackCTA from "@/components/CallbackCTA";
import { populations } from "@/lib/populations";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Who We Help",
  description:
    "Specialized, population-specific addiction treatment in Costa Mesa, CA — for young adults, college students, professionals, first responders, the LGBTQ+ community, men, and women.",
};

export default function WhoWeHelpPage() {
  return (
    <>
      <PageHero
        eyebrow="Personalized to your world"
        title="Who we help"
        subtitle="Recovery isn't one-size-fits-all. We tailor care to the specific pressures, experiences, and needs of the people we serve."
        image="/images/stock/stock-08-wide.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Who We Help" }]}
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Specialized Programs"
            title="Care built around who you are"
            subtitle="Peer-specific groups and individualized plans create the safety and relatability that make lasting recovery possible."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {populations.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/who-we-help/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ocean-100 transition-all hover:-translate-y-1.5 hover:shadow-card"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.navLabel}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-5 font-display text-2xl font-semibold text-white">
                      {p.navLabel}
                    </h3>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex-1 text-sm leading-relaxed text-navy/65">{p.heroSubtitle}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-600 transition-all group-hover:gap-2.5">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <InsuranceBand />
      <CallbackCTA />
    </>
  );
}
