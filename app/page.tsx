import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import InsuranceBand from "@/components/InsuranceBand";
import Testimonials from "@/components/Testimonials";
import CallbackCTA from "@/components/CallbackCTA";
import {
  Phone, ArrowRight, Star, Waves, Bed, Wifi, Sun, Stethoscope, Home,
  Brain, HeartHand, ChevronRight, CheckCircle, Shield, Users,
} from "@/components/icons";

const features = [
  { icon: Waves, title: "Short Walk to the Beach", text: "Daily ocean air, sand, and sunsets as part of your healing." },
  { icon: Bed, title: "Intimate 6-Bed Setting", text: "A calm, homelike environment — never a crowd, never a number." },
  { icon: Wifi, title: "Flexible Tech Policy", text: "Stay connected to work and family when it supports recovery." },
  { icon: Sun, title: "Have Fun in Recovery", text: "Surfing, outings, and real joy — treatment shouldn't be boring." },
];

const programs = [
  {
    icon: Stethoscope, eyebrow: "Safe & Comfortable", title: "Drug & Alcohol Detox",
    href: "/treatment/detox", img: "/images/stock/stock-11-tall.jpg",
    text: "The first step in treatment. We ease you through withdrawal with medication and round-the-clock comfort and supervision.",
  },
  {
    icon: Home, eyebrow: "Evidence-Based", title: "Residential Inpatient",
    href: "/treatment/residential", img: "/images/facility/facility-05.jpg",
    text: "Immersive, 24/7 care built around you — with 30, 60, and 90+ day options because longer stays lead to stronger recovery.",
  },
  {
    icon: Brain, eyebrow: "Root-Cause Healing", title: "Dual Diagnosis",
    href: "/treatment/dual-diagnosis", img: "/images/stock/stock-03.jpg",
    text: "Integrated care that treats substance use and co-occurring mental health conditions together, not in isolation.",
  },
  {
    icon: HeartHand, eyebrow: "Lifelong Support", title: "Aftercare & Alumni",
    href: "/treatment/aftercare", img: "/images/stock/group-therapy.jpg",
    text: "Recovery doesn't end at discharge. Our alumni community and aftercare keep you supported for the long haul.",
  },
];

const substances = ["Alcohol", "Benzodiazepines", "Cocaine", "Fentanyl", "Heroin", "Methamphetamine", "Xanax", "Prescription Drugs"];
const mentalHealth = ["Anxiety", "Depression", "Bipolar Disorder", "PTSD & Trauma", "Personality Disorders"];

const featuredPosts = [
  { title: "Why Alcohol Withdrawal Can Be More Serious Than People Realize", href: "/blog/why-alcohol-withdrawal-can-be-dangerous", cat: "Alcohol" },
  { title: "What Should You Look for in an Addiction Treatment Program?", href: "/blog/what-to-look-for-in-an-addiction-treatment-program", cat: "Treatment" },
  { title: "Why Detox Is the First Step in Addiction Recovery", href: "/blog/why-detox-is-first-step", cat: "Detox" },
];

export default function HomePage() {
  return (
    <>
      {/* ============================ HERO ============================ */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-navy-dark">
        <Image
          src="/images/facility/facility-01.jpg"
          alt="Ocean Coast Recovery Center in Costa Mesa, California"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="hero-overlay absolute inset-0" />

        <div className="container-wide relative z-10 pt-36 pb-20 lg:pt-48">
          <Reveal className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
              <span className="flex text-sand-300">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5" />)}
              </span>
              5.0 · 124 reviews · Costa Mesa, CA
            </span>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Top-rated drug &amp; alcohol rehab in Costa Mesa, California
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
              Escape the chaos at our intimate detox &amp; residential program in the heart of
              Orange County. A fresh start is closer than you think.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href={site.phoneHref} className="btn-primary text-base">
                <Phone className="h-5 w-5" /> {site.phone}
              </a>
              <Link href="/admissions#verify" className="btn-outline text-base">
                Verify Your Insurance <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/75">
              {["Joint Commission Accredited", "LegitScript Certified", "In-network with major PPOs"].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-ocean-300" /> {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================= FEATURE BADGES ========================= */}
      <section className="relative z-20 bg-white">
        <div className="container-wide -mt-16 sm:-mt-20">
          <div className="grid gap-4 rounded-4xl bg-white p-4 shadow-lift sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
            {features.map((f, i) => (
              <Reveal
                key={f.title}
                delay={i * 80}
                className="flex flex-col gap-3 rounded-3xl bg-foam p-6 transition-transform hover:-translate-y-1"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean-500 text-white">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-semibold text-navy">{f.title}</h3>
                <p className="text-sm leading-relaxed text-navy/65">{f.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ WELCOME ============================ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-4xl shadow-card">
              <Image
                src="/images/facility/facility-08.jpg"
                alt="Comfortable, homelike interior at Ocean Coast Recovery"
                width={900}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden rounded-3xl bg-navy px-7 py-5 text-white shadow-lift sm:block">
              <p className="font-display text-4xl font-semibold text-sand-300">25+</p>
              <p className="text-sm text-white/80">years of combined<br />clinical experience</p>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Welcome to Ocean Coast Recovery"
              title="Comprehensive addiction treatment designed for lasting recovery."
              subtitle="Ocean Coast Recovery Center is a state-of-the-art drug and alcohol treatment center offering medical detox, boutique six-bed residential inpatient care, and dual diagnosis treatment in beautiful Costa Mesa."
            />
            <p className="mt-5 leading-relaxed text-navy/70">
              Ideally situated in the heart of Orange County, our facility is a private sanctuary for
              those seeking a fresh start near Huntington Beach, Newport Beach, and beyond. Our
              clinically accredited, individualized approach ensures every client receives the
              evidence-based therapies and personalized plan they need for long-term recovery.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="btn-ocean">About Us <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/tour" className="btn-outline-navy">Tour the Facility</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ PROGRAMS ============================ */}
      <section className="section-foam py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Programs"
            title="A full continuum of care, all in one place"
            subtitle="From your first day of detox to lifelong alumni support, every stage of your recovery is covered under one roof."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <Link
                  href={p.href}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ocean-100 transition-all hover:-translate-y-1.5 hover:shadow-card"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/95 text-ocean-600 shadow-soft">
                      <p.icon className="h-6 w-6" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-ocean-600">
                      {p.eyebrow}
                    </span>
                    <h3 className="mt-1.5 text-xl font-semibold text-navy">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/65">{p.text}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-600 group-hover:gap-2.5 transition-all">
                      Learn More <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= FRESH START BAND ========================= */}
      <section className="relative isolate overflow-hidden bg-navy py-24">
        <Image
          src="/images/stock/unsplash-beach.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-navy-dark/70" />
        <div className="container-x relative z-10 text-center">
          <Reveal className="mx-auto max-w-3xl">
            <span className="eyebrow !text-sand-300 justify-center">You can live the life you deserve</span>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
              A fresh start is closer than you think.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
              You have the strength to recover; we provide the tools to make it stick. From the
              serenity of our coastal retreat to the expertise of our clinical team, your
              breakthrough is waiting.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={site.phoneHref} className="btn-primary"><Phone className="h-4 w-4" /> {site.phone}</a>
              <Link href="/admissions#verify" className="btn-outline">Verify Your Insurance</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ WHAT WE TREAT ============================ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="What We Treat"
            title="Personalized addiction & dual diagnosis care"
            subtitle="We provide evidence-based treatment for a wide range of substance use and co-occurring mental health disorders at our Costa Mesa facility."
          />
          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
            <Reveal className="rounded-3xl border border-ocean-100 bg-foam p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean-500 text-white">
                <Shield className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-2xl font-semibold text-navy">Substance Use Disorders</h3>
              <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {substances.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-navy/75">
                    <CheckCircle className="h-4 w-4 shrink-0 text-ocean-500" /> {s}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120} className="rounded-3xl border border-ocean-100 bg-foam p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sand-400 text-white">
                <Brain className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-2xl font-semibold text-navy">Co-Occurring Mental Health</h3>
              <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {mentalHealth.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-navy/75">
                    <CheckCircle className="h-4 w-4 shrink-0 text-sand-500" /> {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <InsuranceBand />

      {/* ============================ ENVIRONMENT ============================ */}
      <section className="section-foam py-20 sm:py-24">
        <div className="container-x">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Discover How to Thrive in Costa Mesa"
                title="Our luxury coastal environment"
                subtitle="Ocean Coast Recovery offers those struggling with addiction an oasis where safety and comfort are the top priority — from daily beach walks to private suites and a sun-soaked backyard."
              />
              <ul className="mt-6 space-y-3">
                {["Private & semi-private suites with en-suite baths", "Pool and backyard for Southern California sun", "Steps from the beach — surf, walk, and reset", "Boutique amenities in a serene, homelike setting"].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-navy/75">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ocean-500 text-white">
                      <CheckCircle className="h-4 w-4" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <Link href="/tour" className="btn-ocean mt-8">Explore Our Facility <ArrowRight className="h-4 w-4" /></Link>
            </div>

            <Reveal delay={120} className="grid grid-cols-2 gap-4">
              {["facility-04.jpg", "facility-07.jpg", "facility-10.jpg", "facility-06.jpg"].map((img, i) => (
                <div
                  key={img}
                  className={`overflow-hidden rounded-3xl shadow-soft ${i % 2 === 0 ? "mt-8" : ""}`}
                >
                  <Image
                    src={`/images/facility/${img}`}
                    alt="Ocean Coast Recovery facility"
                    width={400}
                    height={500}
                    className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* ============================ BLOG PREVIEW ============================ */}
      <section className="section-foam py-20 sm:py-24">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              align="left"
              eyebrow="Latest News"
              title="Stay informed with our blog"
              className="!max-w-xl"
            />
            <Link href="/blog" className="btn-outline-navy shrink-0">View All Articles <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredPosts.map((post, i) => (
              <Reveal key={post.href} delay={i * 90}>
                <Link
                  href={post.href}
                  className="group flex h-full flex-col rounded-3xl border border-ocean-100 bg-white p-7 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card"
                >
                  <span className="w-fit rounded-full bg-ocean-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ocean-600">
                    {post.cat}
                  </span>
                  <h3 className="mt-4 flex-1 text-xl font-semibold leading-snug text-navy group-hover:text-ocean-700">
                    {post.title}
                  </h3>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-600">
                    Read Article <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CallbackCTA />
    </>
  );
}
