import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Split, Steps } from "@/components/ContentBlocks";
import ProgramGrid from "@/components/ProgramGrid";
import FAQ from "@/components/FAQ";
import InsuranceBand from "@/components/InsuranceBand";
import CallbackCTA from "@/components/CallbackCTA";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { substanceMeta } from "@/lib/substanceMeta";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Drug & Alcohol Detox Center in Costa Mesa, CA",
  description:
    "Safe, medically supervised detox in Costa Mesa with 24/7 clinical monitoring, medication-assisted comfort, and a seamless transition to residential care.",
};

const withdrawalRisks = [
  { title: "Alcohol & Benzodiazepines", text: "Abruptly stopping Xanax, Valium, or alcohol can trigger seizures, delirium tremens (DTs), and dangerous spikes in blood pressure and heart rate." },
  { title: "Opioids & Synthetics", text: "Withdrawal from Fentanyl, Heroin, or OxyContin often causes respiratory distress, severe muscle pain, and electrolyte imbalances requiring stabilization." },
  { title: "Stimulants", text: "Methamphetamine and Cocaine withdrawal can cause cardiovascular strain and severe suicidal ideation, making 24/7 supervision essential." },
  { title: "The Relapse & Overdose Cycle", text: "Because tolerance drops during detox, an unsupervised 'slip' carries a massive risk of accidental overdose. Professional care manages cravings safely." },
];

const stages = [
  { title: "Comprehensive Medical Evaluation", text: "On arrival, a thorough clinical assessment of your substance use history, physical health, and co-occurring needs builds a detox plan tailored to your body." },
  { title: "24/7 Clinical Monitoring & Stabilization", text: "As your body clears substances, our staff monitor vital signs around the clock to prevent the dangerous cardiovascular 'rebellion' of unsupervised withdrawal." },
  { title: "Medication-Assisted Comfort", text: "We use evidence-based Medication-Assisted Treatment (MAT) to mitigate physical pain and intense cravings, keeping you as comfortable and safe as possible." },
  { title: "Therapeutic Integration & Transition", text: "Once medically stable, gentle therapeutic support addresses rebound anxiety and cognitive fog — a seamless handoff to residential care." },
];

const faqs = [
  { q: "How long does the detox process take?", a: "The duration varies based on the substance and severity of dependency, but most clients complete the acute phase in 5 to 10 days. Our medical team continuously assesses your progress before transitioning you to the next phase." },
  { q: "Is medical detox safe?", a: "Yes. We provide 24/7 supervision by trained clinical staff who monitor your vitals and manage withdrawal symptoms in real time — designed to prevent dangerous complications like seizures or cardiovascular distress." },
  { q: "Do you use medication to help with withdrawal?", a: "Yes. We use evidence-based Medication-Assisted Treatment (MAT) to reduce the physical pain and cravings of withdrawal, with protocols tailored for substances like Fentanyl, Alcohol, and Benzodiazepines." },
  { q: "Can I detox from home?", a: "We strongly advise against unsupervised home detox. Withdrawal from alcohol and benzodiazepines can be life-threatening without medical intervention. Our Orange County facility provides the emergency resources needed to manage these risks safely." },
  { q: "Does insurance cover the cost of detox?", a: "Most PPO and private plans cover medically supervised detox. We provide a 100% confidential insurance verification to help you understand your coverage. Call us at 949-649-0702 to review your benefits." },
];

export default function DetoxPage() {
  return (
    <>
      <PageHero
        eyebrow="Safe, medically supervised withdrawal management"
        title="Drug & alcohol detox in Costa Mesa"
        subtitle="Detox is the vital first step on the road to recovery — a safe, medical intervention under 24/7 clinical supervision that creates a firm foundation for the treatment that follows."
        image="/images/facility/consult-room.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Treatment", href: "/treatment" }, { label: "Detox" }]}
      />

      <Split
        eyebrow="Welcome to Ocean Coast Recovery"
        title="Medically supervised detox, built around you"
        paragraphs={[
          "At Ocean Coast Recovery Center, we provide a safe medical intervention designed to manage acute intoxication and withdrawal under 24/7 clinical supervision.",
          "As your body stabilizes, you're protected by medical professionals who monitor your vital signs and overall health around the clock. By completing detox in our supportive Orange County environment, you create a firm foundation for the residential treatment that follows.",
        ]}
        image="/images/facility/bedroom-twin.jpg"
        imageAlt="Calming detox environment at Ocean Coast Recovery"
      />

      <ProgramGrid
        eyebrow="Your Path Through Our Levels of Care"
        title="Beyond detox"
        exclude="/treatment/detox"
      />

      {/* Withdrawal risks */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why you should never detox alone"
            title="Critical withdrawal risks by substance"
            subtitle="When someone struggles with long-term substance use, the body physically rewires itself. During withdrawal, that artificial balance is shattered — and the effects can be dangerous."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {withdrawalRisks.map((r, i) => (
              <Reveal key={r.title} delay={(i % 2) * 90} className="rounded-3xl border border-ocean-100 bg-foam p-7">
                <h3 className="text-lg font-semibold text-navy">{r.title}</h3>
                <p className="mt-2 leading-relaxed text-navy/70">{r.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Steps
        eyebrow="What to Expect"
        title="Our four-stage detox protocol"
        subtitle="The first days of sobriety should be defined by dignity, not distress. Here's how we bridge the gap between active addiction and a clear mind."
        steps={stages}
      />

      {/* Specialized protocols */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Specialized Protocols for Every Need"
            title="Detox tailored to your substance"
            subtitle="No two journeys are the same. Our medical team develops protocols tailored to the unique physiological demands of different substances."
          />
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
            {substanceMeta.map((s) => (
              <Link
                key={s.slug}
                href={`/treatment/detox/${s.slug}`}
                className="rounded-full border border-ocean-200 bg-foam px-5 py-2.5 font-medium text-navy transition-colors hover:border-ocean-400 hover:bg-white hover:text-ocean-600"
              >
                {s.label}
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/admissions" className="btn-ocean">Start Now <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <InsuranceBand />
      <FAQ items={faqs} title="Most frequently asked questions about detox" subtitle="Everything you need to know about detoxing safely at Ocean Coast Recovery." />
      <CallbackCTA />
    </>
  );
}
