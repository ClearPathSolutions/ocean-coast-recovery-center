import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Steps } from "@/components/ContentBlocks";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import CallbackCTA from "@/components/CallbackCTA";
import { site, insuranceCarriers } from "@/lib/site";
import { Phone, Shield, Clock, CheckCircle } from "@/components/icons";

export const metadata: Metadata = {
  title: "Admissions & Insurance Verification",
  description:
    "Starting treatment at Ocean Coast Recovery is simple and confidential. Learn how admissions work and verify your insurance benefits for free in minutes.",
};

const steps = [
  { title: "Reach Out, Confidentially", text: "Call us or request a callback any time, day or night. A caring admissions coordinator will listen, answer your questions, and help you understand your options — with zero judgment or pressure." },
  { title: "Free Insurance Verification", text: "We'll run a fast, 100% confidential benefits check to show exactly what your PPO or POS plan covers, so there are no financial surprises. It takes just a few minutes." },
  { title: "A Personalized Plan", text: "Our clinical team designs an individualized treatment plan around your history, needs, and goals — from medical detox through residential care and aftercare." },
  { title: "Arrive & Begin Healing", text: "We coordinate your travel and arrival — we're minutes from John Wayne Airport (SNA) — so all you have to do is take the first step into your fresh start." },
];

const faqs = [
  { q: "How quickly can I be admitted?", a: "Often the same day. Once we verify your benefits and complete a brief assessment, we can typically arrange admission right away. Call 949-649-0702 to get started now." },
  { q: "Is the conversation really confidential?", a: "Completely. Every call and inquiry is 100% confidential. We're here to help you understand your options — nothing more, nothing less." },
  { q: "What insurance do you accept?", a: "We work with most major PPO and POS plans that offer out-of-network coverage for substance abuse treatment, including Blue Cross Blue Shield, Cigna, Aetna, UnitedHealthcare, Meritain, Beacon, GEHA, and more. We do not accept Medicaid or Medicare at this time." },
  { q: "What if I don't have insurance?", a: "We can still help. Reach out and our team will walk you through payment options and help you find a path to the care you need." },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Begin your journey to healing"
        title="Admissions made simple"
        subtitle="Taking the first step is the hardest part. We've made getting help as clear, fast, and confidential as possible."
        image="/images/facility/exterior-side.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Admissions" }]}
      />

      <Steps
        tint={false}
        eyebrow="How It Works"
        title="Four simple steps to a fresh start"
        subtitle="From your first call to your first day, our team guides you through every step."
        steps={steps}
      />

      {/* Verify insurance */}
      <section id="verify" className="scroll-mt-24 section-foam py-20 sm:py-24">
        <div className="container-x">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Did You Know?"
                title="Most major PPO & POS plans help pay for rehab"
                subtitle="Ocean Coast Recovery works with most major insurance plans that offer out-of-network coverage for substance abuse treatment. Get a free, instant, 100% confidential benefits check."
              />
              <p className="mt-4 text-sm text-navy/55">No Medicaid or Medicare accepted at this time.</p>

              <div className="mt-6 rounded-3xl border border-ocean-100 bg-white p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-ocean-600">
                  In-network with plans like
                </p>
                <ul className="mt-4 grid grid-cols-2 gap-2.5">
                  {insuranceCarriers.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-navy/75">
                      <CheckCircle className="h-4 w-4 shrink-0 text-ocean-500" /> {c}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-navy/50">…and many more</p>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  { icon: Shield, text: "100% confidential — no obligation" },
                  { icon: Clock, text: `${site.hours}` },
                ].map((r) => (
                  <div key={r.text} className="flex items-center gap-3 text-navy/75">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ocean-50 text-ocean-600">
                      <r.icon className="h-4 w-4" />
                    </span>
                    {r.text}
                  </div>
                ))}
              </div>

              <a href={site.phoneHref} className="btn-ocean mt-6">
                <Phone className="h-4 w-4" /> Or call {site.phone}
              </a>
            </div>

            <Reveal delay={120}>
              <div className="mb-4 text-center">
                <h3 className="font-display text-2xl font-semibold text-navy">Free Insurance Verification</h3>
                <p className="mt-1 text-navy/60">Fill out the form and a treatment advisor will contact you right away.</p>
              </div>
              <ContactForm variant="insurance" />
            </Reveal>
          </div>
        </div>
      </section>

      <FAQ items={faqs} title="Admissions questions, answered" subtitle="Everything you need to know before you reach out." />
      <CallbackCTA />
    </>
  );
}
