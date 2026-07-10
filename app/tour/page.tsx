import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Split } from "@/components/ContentBlocks";
import SectionHeading from "@/components/SectionHeading";
import Gallery from "@/components/Gallery";
import InsuranceBand from "@/components/InsuranceBand";
import CallbackCTA from "@/components/CallbackCTA";
import Reveal from "@/components/Reveal";
import { Waves, Bed, Sun } from "@/components/icons";

export const metadata: Metadata = {
  title: "Tour Our Facility — Costa Mesa Rehab Environment",
  description:
    "Tour Ocean Coast Recovery — a boutique, six-bed drug & alcohol treatment center in Costa Mesa, CA with private suites, a pool, and the beach just steps away.",
};

const amenities = [
  { icon: Bed, title: "Private & Semi-Private Suites", text: "Comfortable bedroom suites with en-suite bathrooms offer the privacy and dignity you deserve while you heal." },
  { icon: Sun, title: "Pool & Sun-Soaked Backyard", text: "A pool and backyard area let you relax and recharge in the Southern California sun between sessions." },
  { icon: Waves, title: "The Beach, Just Steps Away", text: "Daily walks on the sand, surfing, and ocean air are woven into treatment — because healing should feel alive." },
];

const galleryImages = [
  { src: "/images/facility/facility-01.jpg", alt: "Ocean Coast Recovery exterior" },
  { src: "/images/facility/facility-08.jpg", alt: "Comfortable living space" },
  { src: "/images/facility/facility-04.jpg", alt: "Bright, homelike common area" },
  { src: "/images/facility/facility-05.jpg", alt: "Private bedroom suite" },
  { src: "/images/facility/facility-07.jpg", alt: "Relaxing lounge" },
  { src: "/images/facility/facility-10.jpg", alt: "Serene interior" },
  { src: "/images/facility/facility-06.jpg", alt: "Peaceful corner to reflect" },
  { src: "/images/facility/facility-11.jpg", alt: "Shared gathering space" },
  { src: "/images/facility/facility-03.jpg", alt: "Warm, inviting details" },
  { src: "/images/facility/facility-09.jpg", alt: "Bright treatment space" },
  { src: "/images/facility/aerial.jpg", alt: "Aerial view of the Costa Mesa coast" },
  { src: "/images/stock/unsplash-beach.jpg", alt: "The beach near our facility" },
];

export default function TourPage() {
  return (
    <>
      <PageHero
        eyebrow="World-class treatment in Orange County"
        title="Our environment"
        subtitle="An oasis where safety and comfort are the top priority — a private sanctuary just steps from the coast, designed for a real fresh start."
        image="/images/facility/facility-01.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Tour Facility" }]}
      />

      <Split
        eyebrow="World-Class, Personalized Care"
        title="A boutique home built for healing"
        paragraphs={[
          "Ocean Coast Recovery offers those struggling with addiction an oasis where safety and comfort come first. Our intimate, six-bed residential home was designed to feel calm, private, and genuinely restorative.",
          "Explore our Costa Mesa treatment center and discover how you can find your personal path to recovery at a world-class drug and alcohol rehab facility in the heart of Orange County.",
        ]}
        image="/images/facility/facility-07.jpg"
        imageAlt="Interior of Ocean Coast Recovery"
      />

      {/* Amenities */}
      <section className="section-foam py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Boutique Amenities"
            title="Modern, comfortable & holistic"
            subtitle="From daily walks on the beach to surfing and other activities, we offer the very best for our clients."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {amenities.map((a, i) => (
              <Reveal key={a.title} delay={i * 90} className="rounded-3xl bg-white p-8 shadow-soft ring-1 ring-ocean-100">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean-500 text-white">
                  <a.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-navy">{a.title}</h3>
                <p className="mt-2 leading-relaxed text-navy/65">{a.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Gallery" title="Take a look inside" subtitle="A calm, coastal home where recovery doesn't just happen — it thrives." />
          <div className="mt-12">
            <Gallery images={galleryImages} />
          </div>
        </div>
      </section>

      <InsuranceBand />
      <CallbackCTA />
    </>
  );
}
