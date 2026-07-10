import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";
import { Phone, Mail, MapPin, Clock } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Ocean Coast Recovery Center in Costa Mesa, CA. Call, email, or send a confidential message — someone is here to help 24/7.",
};

const cards = [
  { icon: MapPin, title: "Visit Us", value: site.address.full, href: "https://www.google.com/maps?q=1799+Hummingbird+Drive,+Costa+Mesa,+CA+92626" },
  { icon: Phone, title: "Call Us", value: site.phone, href: site.phoneHref },
  { icon: Mail, title: "Email Us", value: site.email, href: `mailto:${site.email}` },
  { icon: Clock, title: "Hours", value: site.hours, href: null },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Ocean Coast Recovery today"
        title="Get in touch"
        subtitle="Reach out day or night. Whether you're ready to start treatment or just have questions, a caring team member is here for you."
        image="/images/facility/facility-04.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* Contact cards */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => {
            const inner = (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean-500 text-white">
                  <c.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-wider text-ocean-600">{c.title}</h3>
                <p className="mt-1 font-medium text-navy">{c.value}</p>
              </>
            );
            return (
              <Reveal key={c.title} delay={i * 80} className="h-full">
                {c.href ? (
                  <a href={c.href} className="flex h-full flex-col rounded-3xl border border-ocean-100 bg-foam p-7 transition-all hover:-translate-y-1 hover:shadow-soft">
                    {inner}
                  </a>
                ) : (
                  <div className="flex h-full flex-col rounded-3xl border border-ocean-100 bg-foam p-7">{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Form + Map */}
      <section className="section-foam py-16 sm:py-20">
        <div className="container-x grid items-start gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Reach out day or night"
              title="Send a message"
              subtitle="Fill out the form and one of our caring admissions coordinators will get back to you — always confidentially."
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <Reveal delay={120} className="overflow-hidden rounded-4xl shadow-card lg:mt-2">
            <iframe
              title="Ocean Coast Recovery location map"
              src="https://www.google.com/maps?q=1799+Hummingbird+Drive,+Costa+Mesa,+CA+92626&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[520px] w-full border-0"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
