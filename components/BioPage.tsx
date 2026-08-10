import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CallbackCTA from "@/components/CallbackCTA";
import Reveal from "@/components/Reveal";
import { ArrowLeft } from "@/components/icons";

export default function BioPage({
  name,
  creds,
  role,
  initials,
  photo,
  paragraphs,
}: {
  name: string;
  creds?: string;
  role: string;
  initials: string;
  /** Approved headshot. Falls back to the initials monogram when absent. */
  photo?: string;
  paragraphs: string[];
}) {
  return (
    <>
      <PageHero
        eyebrow="Our Staff"
        title={name}
        subtitle={role}
        image="/images/facility/entry-stairs.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: name }]}
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[300px_1fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-ocean-100 bg-foam p-8 text-center">
              {photo ? (
                <Image
                  src={photo}
                  alt={`${name}, ${role} at Ocean Coast Recovery Center`}
                  width={224}
                  height={224}
                  className="mx-auto h-28 w-28 rounded-full object-cover shadow-soft"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-ocean-400 to-navy font-display text-3xl font-semibold text-white shadow-soft"
                >
                  {initials}
                </div>
              )}
              <h2 className="mt-5 text-2xl font-semibold text-navy">{name}</h2>
              {creds && <p className="text-sm text-navy/50">{creds}</p>}
              <p className="mt-2 inline-block rounded-full bg-ocean-500 px-4 py-1 text-sm font-semibold text-white">
                {role}
              </p>
            </div>
          </Reveal>

          <div>
            <div className="prose-content max-w-none">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <Link href="/about#team" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ocean-600 hover:gap-3">
              <ArrowLeft className="h-4 w-4" /> Back to our team
            </Link>
          </div>
        </div>
      </section>

      <CallbackCTA />
    </>
  );
}
