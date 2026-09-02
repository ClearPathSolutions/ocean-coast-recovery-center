import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Testimonials from "@/components/Testimonials";
import CallbackCTA from "@/components/CallbackCTA";
import { site } from "@/lib/site";
import { aggregate } from "@/lib/reviews";
import { ArrowRight, CheckCircle, HeartHand, Users, Waves, Star } from "@/components/icons";

export const metadata: Metadata = {
  title: "About Us — Who We Are",
  description:
    "Ocean Coast Recovery is an intimate, six-bed drug & alcohol treatment center in Costa Mesa, CA. Meet our caring team and learn what makes us different.",
};

// Every figure here has to be sourceable. Two were not and were replaced:
//   • "25+ years combined experience" was carried mostly by a staff member who
//     is no longer on the roster (BIO-01), and cannot be recomputed from the
//     current team — the bios document gives start years for only some of them.
//   • "2 blocks from the beach" is not supportable: the facility is inland in
//     Costa Mesa and the approved photo set contains no coastline (D1/IMG-06).
const stats = [
  { value: "6", label: "Boutique beds", icon: Users },
  { value: "24/7", label: "Admissions & clinical support", icon: HeartHand },
  { value: aggregate.rating, label: `Rating · ${aggregate.count} reviews`, icon: Star },
  { value: "DHCS", label: "Licensed · Joint Commission accredited", icon: Waves },
];

// Roster and titles follow the QHG staff-bios document, which is authoritative
// on names, titles and bio copy. The three tabs that cover this facility are all
// published here (supersedes the earlier HS-04/BIO-05 "option (b)" ruling, which
// listed 6): California leadership, the Cali SOUTH regional team, and the
// facility's own Ocean Coast Recovery staff, plus the network alumni coordinator.
// Order below is the order the owner listed them in — leadership first, facility
// staff last. Tami DiStefano remains off the roster: she appears in neither the
// bios document nor the approved headshots (BIO-01).
//
// Every member now has sourced bio copy, so every card carries a blurb that
// condenses that person's own bio and a link to their page. Nothing here is
// invented — an unsourced blurb on a healthcare team page is a trust claim we
// cannot stand behind.
//
// ⚠️ V0086 exposure is wider than before: the 8 shared staff below are scoped to
// other California sites too, so their bio copy will repeat across those builds.
// Accepted knowingly, as in BIO-05. Dr. Tambini and BJ Thome are network-wide and
// canonical to their parent-site pages; the rest have no parent page to point at.
const team = [
  {
    name: "Dr. Pamela Tambini",
    creds: "",
    role: "Medical Oversight",
    href: "/about/pamela-tambini",
    initials: "PT",
    photo: "/images/team/pamela-tambini.jpg",
    blurb:
      "Board-certified in Internal Medicine and Addiction Medicine, Dr. Tambini provides medical oversight across the Quadrant Health Group network.",
  },
  {
    name: "Shawn Young",
    creds: "",
    role: "Executive Director",
    href: "/about/shawn-young",
    initials: "SY",
    photo: "/images/team/shawn-young.jpg",
    blurb:
      "Shawn worked his way up from the kitchen to clinician to executive leadership — and leads Southern California with the grit and heart that journey taught him.",
  },
  {
    name: "Michael McArthur",
    creds: "",
    role: "Nursing Director",
    href: "/about/michael-mcarthur",
    initials: "MM",
    photo: "/images/team/michael-mcarthur.jpg",
    blurb:
      "Michael oversees medical staff and client care across our California facilities, drawing on his own recovery journey to lead with hope and compassion.",
  },
  {
    name: "Riky Hanaumi",
    creds: "",
    role: "Clinical Director",
    href: "/about/riky-hanaumi",
    initials: "RH",
    photo: "/images/team/riky-hanaumi.jpg",
    blurb:
      "A Licensed Clinical Social Worker with 20+ years in behavioral health, Riky oversees clinical programming and mentors the therapists who deliver it.",
  },
  {
    name: "Justin White",
    creds: "",
    role: "Program Director",
    href: "/about/justin-white",
    initials: "JW",
    photo: "/images/team/justin-white.jpg",
    blurb:
      "A Registered Addiction Counselor experienced in both detox and residential care, Justin believes recovery is never one-size-fits-all.",
  },
  {
    name: "Jacob Cameron",
    creds: "",
    role: "Client Care Director",
    href: "/about/jacob-cameron",
    initials: "JC",
    photo: "/images/team/jacob-cameron.jpg",
    blurb:
      "A Registered Substance Use Disorder Counselor, Jacob works to make sure every client feels a genuine sense of belonging throughout treatment.",
  },
  {
    name: "Jeremiah Ross",
    creds: "",
    role: "Nursing Supervisor",
    href: "/about/jeremiah-ross",
    initials: "JR",
    photo: "/images/team/jeremiah-ross.jpg",
    blurb:
      "With more than 10 years of patient care behind him, Jeremiah keeps daily clinical operations safe, structured and steady for clients and staff alike.",
  },
  {
    name: "Monica Olivares",
    creds: "",
    role: "Clinical Supervisor",
    href: "/about/monica-olivares",
    initials: "MO",
    photo: "/images/team/monica-olivares.jpg",
    blurb:
      "CADC II certified, with 11 years across every level of care and 13 years of personal recovery — Monica believes healing can happen alongside joy and humor.",
  },
  {
    name: "Vahan Oknayan",
    creds: "AMFT",
    role: "Therapist",
    href: "/about/vahan-oknayan",
    initials: "VO",
    photo: "/images/team/vahan-oknayan.jpg",
    blurb:
      "Integrative and client-centered, Vahan looks past the challenges that bring someone in — and believes healing starts with a genuine therapeutic relationship.",
  },
  {
    name: "Alanna McMurtrey",
    creds: "",
    role: "Lead Case Manager",
    href: "/about/alanna-mcmurtrey",
    initials: "AM",
    photo: "/images/team/alanna-mcmurtrey.jpg",
    blurb:
      "Alanna coordinates care through detox and residential treatment, meeting clients where they are and building on the strengths they already have.",
  },
  {
    name: "Halie Nall",
    creds: "",
    role: "Case Manager",
    href: "/about/halie-nall",
    initials: "HN",
    photo: "/images/team/halie-nall.jpg",
    blurb:
      "Halie helps clients reach the resources, tools and support they need to build healthy, fulfilling lives — informed by her own lived experience.",
  },
  {
    name: "BJ Thome",
    creds: "",
    role: "Alumni Coordinator",
    href: "/about/bj-thome",
    initials: "BT",
    photo: "/images/team/bj-thome.jpg",
    blurb:
      "BJ makes sure no one walks the road of recovery alone — building connection during treatment that carries on long after discharge.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Together, we can overcome anything"
        title="Who we are"
        subtitle="We understand that millions of Americans suffer from the disease of addiction. Ocean Coast Recovery offers a personalized, detailed experience in addiction treatment — and if we're not the right fit, we'll help you find a program that is."
        image="/images/facility/exterior-front.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Mission */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="order-2 grid grid-cols-2 gap-4 lg:order-1">
            <div className="overflow-hidden rounded-3xl shadow-soft">
              <Image src="/images/facility/living-room.jpg" alt="The living room at our Costa Mesa facility" width={500} height={600} className="h-full w-full object-cover" />
            </div>
            <div className="mt-8 overflow-hidden rounded-3xl shadow-soft">
              <Image src="/images/facility/dining-room.jpg" alt="The dining room at our Costa Mesa facility" width={500} height={600} className="h-full w-full object-cover" />
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
            subtitle="Licensed clinicians, nurses and case managers in substance abuse and mental health treatment — many of us walking the path of recovery ourselves."
          />
          <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 90} className="flex flex-col items-center rounded-3xl border border-ocean-100 bg-foam p-8 text-center">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={`${m.name}, ${m.role} at Ocean Coast Recovery Center`}
                    width={192}
                    height={192}
                    className="h-24 w-24 rounded-full object-cover shadow-soft"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-ocean-400 to-navy font-display text-2xl font-semibold text-white shadow-soft"
                  >
                    {m.initials}
                  </div>
                )}
                <h3 className="mt-5 text-xl font-semibold text-navy">{m.name}</h3>
                {m.creds && <p className="text-sm text-navy/50">{m.creds}</p>}
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-ocean-600">{m.role}</p>
                {m.blurb && (
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-navy/65">{m.blurb}</p>
                )}
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
          {/* VIS-1628 asks for no image in this section, and the stock photo
              that was here carried alt="Family therapy at Ocean Coast Recovery"
              on a picture taken somewhere else. Replaced with a pull-quote. */}
          <Reveal delay={120} className="rounded-4xl border-l-4 border-ocean-500 bg-white p-8 shadow-card">
            <p className="font-display text-2xl italic leading-relaxed text-navy">
              &ldquo;Addiction is a family disease. When one person begins to heal, everyone
              around them gets the chance to heal too.&rdquo;
            </p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-ocean-600">
              Our family program
            </p>
          </Reveal>
        </div>
      </section>

      <Testimonials />
      <CallbackCTA />
    </>
  );
}
