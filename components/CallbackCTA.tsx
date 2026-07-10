import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";
import { Phone, Clock, Shield } from "@/components/icons";

export default function CallbackCTA() {
  return (
    <section id="verify" className="relative overflow-hidden bg-navy-dark py-20 sm:py-24">
      {/* decorative wash */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-ocean-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-sand-300/10 blur-3xl" />

      <div className="container-x relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow !text-sand-300">Don&rsquo;t wait another day</span>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Request a confidential callback, 24/7.
            </h2>
            <p className="mt-4 max-w-lg text-lg text-white/80">
              Share a few details and one of our caring admissions coordinators will guide you to
              a personalized treatment plan — no judgment, no pressure, ever.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                { icon: Shield, text: "100% confidential — your privacy is protected." },
                { icon: Clock, text: `${site.hours}. Someone is always here to help.` },
                { icon: Phone, text: "Free insurance verification in minutes." },
              ].map((row) => (
                <li key={row.text} className="flex items-center gap-3 text-white/90">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-ocean-300">
                    <row.icon className="h-5 w-5" />
                  </span>
                  {row.text}
                </li>
              ))}
            </ul>

            <a href={site.phoneHref} className="btn-primary mt-8">
              <Phone className="h-4 w-4" /> Call {site.phone}
            </a>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
