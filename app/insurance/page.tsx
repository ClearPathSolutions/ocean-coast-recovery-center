import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CallbackCTA from "@/components/CallbackCTA";
import { insuranceMeta } from "@/lib/insuranceMeta";
import { ArrowRight, ChevronRight, Shield } from "@/components/icons";

export const metadata: Metadata = {
  title: "Insurance We Accept",
  description:
    "Ocean Coast Recovery works with most major PPO & POS plans — Blue Cross Blue Shield, Cigna, Aetna, UnitedHealthcare, Meritain, Beacon, GEHA, and more. Verify your benefits free.",
};

// Additional carriers we're in-network with (logos, no dedicated page).
const alsoAccepted = [
  { name: "Aetna", img: "/images/insurance/aetna-white.png" },
  { name: "UnitedHealthcare", img: "/images/insurance/uhc-white.png" },
  { name: "ComPsych", img: "/images/insurance/compsych.png" },
  { name: "AmeriHealth", img: "/images/insurance/amerihealth.png" },
  { name: "Highmark", img: "/images/insurance/highmark.png" },
];

export default function InsuranceIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Coverage & Benefits"
        title="Insurance we accept"
        subtitle="Ocean Coast Recovery works with most major PPO & POS insurance plans that offer out-of-network coverage for substance abuse treatment. Verify your benefits for free — it's fast and 100% confidential."
        image="/images/facility/facility-05.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Insurance" }]}
      />

      {/* Carrier pages */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Covered Providers"
            title="Explore your carrier"
            subtitle="Learn how each plan can help cover detox, residential, and dual diagnosis treatment."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {insuranceMeta.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/insurance/${c.slug}`}
                  className="group flex h-full items-center justify-between gap-4 rounded-3xl border border-ocean-100 bg-foam p-7 transition-all hover:-translate-y-1 hover:shadow-soft"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean-500 text-white">
                      <Shield className="h-6 w-6" />
                    </span>
                    <span className="text-lg font-semibold text-navy">{c.name}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-ocean-500 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Also accepted */}
      <section className="section-foam py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="And Many More" title="Also in-network with plans like" />
          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-4">
            {alsoAccepted.map((c) => (
              <div
                key={c.name}
                className="flex h-20 w-40 items-center justify-center rounded-2xl bg-navy p-5 shadow-soft"
                title={c.name}
              >
                <Image src={c.img} alt={c.name} width={140} height={48} className="max-h-10 w-auto object-contain" />
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-navy/60">
            Don&rsquo;t see your provider? We work with most major PPO &amp; POS plans.
            <br className="hidden sm:block" /> No Medicaid or Medicare accepted at this time.
          </p>
          <div className="mt-8 text-center">
            <Link href="/admissions#verify" className="btn-ocean">Verify Your Insurance Free <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <CallbackCTA />
    </>
  );
}
