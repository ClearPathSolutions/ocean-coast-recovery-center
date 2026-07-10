import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Stethoscope, Home, Brain, HeartHand, ChevronRight } from "@/components/icons";

const programs = [
  { icon: Stethoscope, eyebrow: "Safe & Comfortable", title: "Medical Detox", href: "/treatment/detox", text: "Medically supervised withdrawal with 24/7 comfort and monitoring." },
  { icon: Home, eyebrow: "Evidence-Based", title: "Residential Inpatient", href: "/treatment/residential", text: "Immersive 24/7 care with 30, 60, and 90+ day options." },
  { icon: Brain, eyebrow: "Root-Cause Healing", title: "Dual Diagnosis", href: "/treatment/dual-diagnosis", text: "Integrated care for addiction and co-occurring mental health." },
  { icon: HeartHand, eyebrow: "Lasting Recovery", title: "Aftercare & Alumni", href: "/treatment/aftercare", text: "Ongoing support and community long after you leave." },
];

export default function ProgramGrid({
  eyebrow = "Our Programs",
  title = "A full continuum of care",
  subtitle,
  exclude,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  exclude?: string; // href to omit (e.g. current page)
  className?: string;
}) {
  const list = programs.filter((p) => p.href !== exclude);
  return (
    <section className={`section-foam py-20 sm:py-24 ${className}`}>
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className={`mt-12 grid gap-6 sm:grid-cols-2 ${list.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {list.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <Link
                href={p.href}
                className="group flex h-full flex-col rounded-3xl bg-white p-7 shadow-soft ring-1 ring-ocean-100 transition-all hover:-translate-y-1.5 hover:shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean-500 text-white">
                  <p.icon className="h-6 w-6" />
                </span>
                <span className="mt-5 text-xs font-semibold uppercase tracking-wider text-ocean-600">
                  {p.eyebrow}
                </span>
                <h3 className="mt-1 text-xl font-semibold text-navy">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/65">{p.text}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-600 transition-all group-hover:gap-2.5">
                  Learn More <ChevronRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
