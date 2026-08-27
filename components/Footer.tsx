import Link from "next/link";
import Image from "next/image";
import { site, accreditations } from "@/lib/site";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, ArrowRight } from "@/components/icons";

const columns = [
  {
    title: "Treatment",
    links: [
      { label: "Medical Detox", href: "/treatment/detox" },
      { label: "Residential Inpatient", href: "/treatment/residential" },
      { label: "Dual Diagnosis", href: "/treatment/dual-diagnosis" },
      { label: "Family Therapy", href: "/treatment/family-therapy" },
      { label: "Aftercare", href: "/treatment/aftercare" },
    ],
  },
  {
    title: "Who We Help",
    links: [
      { label: "Young Adults", href: "/who-we-help/young-adults" },
      { label: "Professionals", href: "/who-we-help/professionals" },
      { label: "First Responders", href: "/who-we-help/first-responders" },
      { label: "LGBTQ+ Community", href: "/who-we-help/lgbtq" },
      { label: "Men", href: "/who-we-help/men" },
      { label: "Women", href: "/who-we-help/women" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Tour the Facility", href: "/tour" },
      { label: "Admissions", href: "/admissions" },
      { label: "Accepted Insurance", href: "/insurance" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/80">
      {/* CTA strip */}
      <div className="border-b border-white/10">
        <div className="container-wide flex flex-col items-center gap-6 py-12 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              A fresh start is closer than you think.
            </h2>
            <p className="mt-2 max-w-xl text-white/70">
              Speak with a caring admissions coordinator now — confidential, judgment-free, {site.hours.toLowerCase()}.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={site.phoneHref} className="btn-primary whitespace-nowrap">
              <Phone className="h-4 w-4" /> {site.phone}
            </a>
            <Link href="/admissions#verify" className="btn-outline whitespace-nowrap">
              Verify Insurance <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-wide grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-6">
        {/* Brand + contact */}
        <div className="col-span-2 md:col-span-3">
          <Image
            src="/images/logos/logo-white.png"
            alt={site.name}
            width={260}
            height={195}
            className="h-28 w-auto"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
            An intimate, six-bed drug &amp; alcohol treatment center in Costa Mesa, California —
            minutes from the coast, built for lasting recovery.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a href={site.phoneHref} className="flex items-center gap-3 hover:text-white">
                <Phone className="h-4 w-4 shrink-0 text-ocean-400" /> {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-ocean-400" /> {site.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-ocean-400" /> {site.address.full}
            </li>
            <li className="flex items-center gap-3">
              <Clock className="h-4 w-4 shrink-0 text-ocean-400" /> {site.hours}
            </li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a
              href={site.social.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-ocean-500"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={site.social.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-ocean-500"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Link columns */}
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/65 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Accreditations + legal */}
      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col items-center gap-6 py-8 md:flex-row md:justify-between">
          <div className="flex items-center gap-5">
            {accreditations.map((a) => (
              <a
                key={a.name}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                title={`${a.name} — ${a.label}`}
                className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-300"
              >
                <Image
                  src={a.img}
                  alt={`${a.name} — ${a.label}`}
                  width={64}
                  height={64}
                  className="h-14 w-14 rounded-lg bg-white/95 object-contain p-1.5 transition-transform hover:scale-105"
                />
              </a>
            ))}
            <p className="max-w-[240px] text-xs leading-relaxed text-white/50">
              Accredited by The Joint Commission and licensed by the California
              Department of Health Care Services.
            </p>
          </div>
          <div className="text-center text-xs text-white/45 md:text-right">
            <p>
              <a
                href="https://data.chhs.ca.gov/dataset/sud-recovery-treatment-facilities"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/70"
              >
                {site.license}
              </a>
            </p>
            <p className="mt-1">
              © {new Date().getFullYear()} {site.name}. All rights reserved. ·{" "}
              <Link href="/privacy" className="hover:text-white/70">Privacy Policy</Link>
            </p>
            <p className="mt-1">
              If you are experiencing a medical emergency, call 911. For 24/7 crisis support, dial 988.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
