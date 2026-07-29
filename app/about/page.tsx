import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Testimonials from "@/components/Testimonials";
import CallbackCTA from "@/components/CallbackCTA";
import { site } from "@/lib/site";
import { ArrowRight, CheckCircle, HeartHand, Users, Waves, Star } from "@/components/icons";

export const metadata: Metadata = {
  title: "About Us — Who We Are",
  description:
    "Ocean Coast Recovery is an intimate, six-bed drug & alcohol treatment center in Costa Mesa, CA. Meet our caring team and learn what makes us different.",
};

const stats = [
  { value: "6", label: "Boutique beds", icon: Users },
  { value: "25+", label: "Years combined experience", icon: HeartHand },
  { value: "5.0", label: "Rating · 124 reviews", icon: Star },
  { value: "2 blocks", label: "From the beach", icon: Waves },
];

const team = [
  {
    name: "Tami DiStefano",
    creds: "CADC II, ICDC",
    role: "Program Director",
    href: "/about/tami-distefano",
    initials: "TD",
    blurb:
      "18+ years in the field and in recovery herself, Tami meets every client where they are — with compassion, respect, and hope.",
  },
  {
    name: "Elizabeth Wald",
    creds: "RADT",
    role: "Director of Operations",
    href: "/about/elizabeth-wald",
    initials: "EW",
    blurb:
      "With the facility since it opened, Elizabeth keeps our six-bed home running with heart, ensuring every detail supports your care.",
  },
  {
    name: "Halie Nall",
    creds: "",
    role: "Case Manager",
    href: "/about/halie-nall",
    initials: "HN",
    blurb:
      "Halie walks alongside each client through the logistics of treatment so they can stay focused on healing.",
  },
  {
    name: "Vahan Oknayan",
    creds: "AMFT",
    role: "Therapist",
    href: "/about/vahan-oknayan",
    initials: "VO",
    blurb:
      "Integrative and client-centered, Vahan looks past the challenges that bring someone in — and believes healing starts with a genuine therapeutic relationship.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Together, we can overcome anything"
        title="Who we are"
        subtitle="We understand that millions of Americans suffer from the disease of addiction. Ocean Coast Recovery offers a personalized, detailed experience in addiction treatment — and if we're not the right fit, we'll help you find a program that is."
        image="/images/facility/facility-07.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Mission */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="order-2 grid grid-cols-2 gap-4 lg:order-1">
            <div className="overflow-hidden rounded-3xl shadow-soft">
              <Image src="/images/team/team-02.jpg" alt="Our team at Ocean Coast Recovery" width={500} height={600} className="h-full w-full object-cover" />
            </div>
            <div className="mt-8 overflow-hidden rounded-3xl shadow-soft">
              <Image src="/images/facility/facility-03.jpg" alt="Inside our Costa Mesa home" width={500} height={600} className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="We believe in recovery"
              title="Your journey starts here"
              subtitle="Ocean Coast Recovery Center is not your typical addiction treatment center in Orange County. Our dedicated staff has years of personal and professional experience."
            />
            <p className="mt-5 leading-relaxed text-navy/70">
              We are here to help any and every person who needs it. Whether you end up at our
              program or not, we will help you find the treatment that best fits your needs. When you
              enter our program you are an individual seeking help — not an illness.
            </p>
            <div className="mt-8 rounded-3xl border-l-4 border-ocean-500 bg-foam p-6">
              <p className="font-display text-xl italic text-navy">
                &ldquo;We don&rsquo;t see you as an addict who happens to be a person. We see you as a
                person who happens to have an addiction.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy py-14">
        <div className="container-x grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="text-center">
              <s.icon className="mx-auto h-7 w-7 text-ocean-300" />
              <p className="mt-3 font-display text-4xl font-semibold text-sand-300 sm:text-5xl">{s.value}</p>
              <p className="mt-1 text-sm text-white/70">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The difference */}
      <section className="section-foam py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Re-discover life"
            title="What makes Ocean Coast different"
            subtitle="We take a holistic approach because addiction affects the whole person — mind, body, and spirit. Our treatment brings healing to all three."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { title: "You, not your illness", text: "Individualized plans built around the person seeking help — never a one-size-fits-all program." },
              { title: "An intimate six-bed home", text: "A close-knit healing community where you're a member, not a number — with true one-on-one attention." },
              { title: "Whole-person healing", text: "Evidence-based clinical care blended with holistic therapies for mind, body, and spirit." },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 90} className="rounded-3xl bg-white p-8 shadow-soft ring-1 ring-ocean-100">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean-500 text-white">
                  <CheckCircle className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-navy">{c.title}</h3>
                <p className="mt-2 leading-relaxed text-navy/65">{c.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="scroll-mt-24 bg-white py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="A team that cares about your outcome"
            title="Meet our expert treatment staff"
            subtitle="Over 25 years of combined experience in substance abuse and mental health treatment — many of us walking the path of recovery ourselves."
          />
          <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 90} className="flex flex-col items-center rounded-3xl border border-ocean-100 bg-foam p-8 text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-ocean-400 to-navy font-display text-2xl font-semibold text-white shadow-soft">
                  {m.initials}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-navy">{m.name}</h3>
                {m.creds && <p className="text-sm text-navy/50">{m.creds}</p>}
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-ocean-600">{m.role}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-navy/65">{m.blurb}</p>
                {m.href && (
                  <Link href={m.href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-600 hover:gap-2.5">
                    Read Bio <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Family recovery */}
      <section className="section-foam py-20 sm:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="A note to loved ones"
              title="We believe in family recovery"
              subtitle="Addiction is often called a family disease — each person contributes to it in one way or another, frequently by unknowingly enabling a loved one. And that's okay."
            />
            <p className="mt-5 leading-relaxed text-navy/70">
              Through our integrated family program, we work with you and your loved one to heal the
              core issues that may exist throughout the family and provide tools that aid in your
              family&rsquo;s recovery as a unit.
            </p>
            <Link href="/treatment/family-therapy" className="btn-ocean mt-8">
              Help for Your Loved One <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Reveal delay={120} className="overflow-hidden rounded-4xl shadow-card">
            <Image src="/images/stock/group-therapy.jpg" alt="Family therapy at Ocean Coast Recovery" width={800} height={600} className="h-full w-full object-cover" />
          </Reveal>
        </div>
      </section>

      <Testimonials />
      <CallbackCTA />
    </>
  );
}
