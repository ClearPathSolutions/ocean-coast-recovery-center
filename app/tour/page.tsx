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
    "Tour Ocean Coast Recovery — a boutique, six-bed drug & alcohol treatment center in Costa Mesa, CA with private suites, a pool, and a quiet residential setting minutes from the coast.",
};

const amenities = [
  { icon: Bed, title: "Private & Semi-Private Suites", text: "Comfortable bedroom suites with en-suite bathrooms offer the privacy and dignity you deserve while you heal." },
  { icon: Sun, title: "Pool & Sun-Soaked Backyard", text: "A pool and backyard area let you relax and recharge in the Southern California sun between sessions." },
  { icon: Waves, title: "Outings & Time Outdoors", text: "Beach trips, outings and time in the fresh air are woven into treatment — because healing should feel alive." },
];

const galleryImages = [
  { src: "/images/facility/exterior-front.jpg", alt: "The covered front entrance of our Costa Mesa treatment center" },
  { src: "/images/facility/exterior-side.jpg", alt: "The garden path along the side of the house" },
  { src: "/images/facility/living-room.jpg", alt: "The living room, with a sectional sofa and teal armchairs" },
  { src: "/images/facility/living-room-wide.jpg", alt: "A wider view of the living room and its high ceiling" },
  { src: "/images/facility/entry-stairs.jpg", alt: "The entryway and wrought-iron staircase" },
  { src: "/images/facility/dining-kitchen.jpg", alt: "The dining area looking through to the kitchen" },
  { src: "/images/facility/kitchen.jpg", alt: "The kitchen, with a central island and double oven" },
  { src: "/images/facility/bedroom-twin.jpg", alt: "A twin bedroom with two beds and natural light" },
  { src: "/images/facility/bedroom-single.jpg", alt: "A single bedroom with a teal throw" },
  { src: "/images/facility/bathroom.jpg", alt: "A guest bathroom" },
  { src: "/images/facility/pool-wide.jpg", alt: "The backyard pool, steps and barbecue area" },
  { src: "/images/facility/patio-dining.jpg", alt: "Shaded patio dining in the backyard" },
];

export default function TourPage() {
  return (
    <>
      <PageHero
        eyebrow="World-class treatment in Orange County"
        title="Our environment"
        subtitle="An oasis where safety and comfort are the top priority — a private sanctuary in Costa Mesa, minutes from the coast, designed for a real fresh start."
        image="/images/facility/exterior-front.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Tour Facility" }]}
      />

      <Split
        eyebrow="World-Class, Personalized Care"
        title="A boutique home built for healing"
        paragraphs={[
          "Ocean Coast Recovery offers those struggling with addiction an oasis where safety and comfort come first. Our intimate, six-bed residential home was designed to feel calm, private, and genuinely restorative.",
          "Explore our Costa Mesa treatment center and discover how you can find your personal path to recovery at a world-class drug and alcohol rehab facility in the heart of Orange County.",
        ]}
        image="/images/facility/entry-stairs.jpg"
        imageAlt="The entryway and wrought-iron staircase at Ocean Coast Recovery"
      />

      {/* Amenities */}
      <section className="section-foam py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Boutique Amenities"
            title="Modern, comfortable & holistic"
            subtitle="From beach outings and surfing to quiet time in the backyard, we offer the very best for our clients."
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
