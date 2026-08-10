import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Split, CardGrid, Steps } from "@/components/ContentBlocks";
import ProgramGrid from "@/components/ProgramGrid";
import FAQ from "@/components/FAQ";
import InsuranceBand from "@/components/InsuranceBand";
import CallbackCTA from "@/components/CallbackCTA";

export const metadata: Metadata = {
  title: "Dual Diagnosis Treatment in Costa Mesa, CA",
  description:
    "Integrated dual diagnosis care in Costa Mesa treating addiction and co-occurring mental health disorders together — depression, anxiety, PTSD, bipolar, and more.",
};

const combos = [
  { title: "Alcoholism & Depression", text: "Breaking the self-medication cycle by treating mood and substance use together." },
  { title: "Opioid Addiction & Anxiety", text: "Managing Fentanyl cravings alongside panic and anxiety disorders." },
  { title: "Benzodiazepine Use & PTSD", text: "Safe medical tapers for Xanax or Valium coupled with trauma-informed care." },
  { title: "Stimulant Abuse & ADHD", text: "Stabilizing the crash from Cocaine or Meth while managing focus and mood." },
];

const therapies = [
  { title: "Cognitive Behavioral Therapy", text: "Reframing the negative thought patterns that trigger both mental health symptoms and cravings." },
  { title: "Dialectical Behavior Therapy", text: "Building emotional regulation, mindfulness, and distress tolerance for high-stress situations." },
  { title: "Family Therapy & Education", text: "Improving communication, setting boundaries, and equipping families to support recovery." },
  { title: "Trauma-Informed Care", text: "A safe environment to process the PTSD and past experiences behind self-medication." },
  { title: "Medication Management", text: "Supervised psychiatric support to balance neurochemistry and manage symptoms safely." },
  { title: "Group Therapy & Peer Support", text: "Connection and accountability that reduce the isolation of dual diagnosis recovery." },
];

const expect = [
  { title: "A Peaceful Place to Heal", text: "A quiet, high-comfort boutique home where you can finally focus on yourself without the noise of the outside world." },
  { title: "Safety First with Medical Detox", text: "If your body needs to clear substances, our doctors monitor your vitals 24/7 to keep your mental health stable at the same time." },
  { title: "Therapy That Actually Fits", text: "A personalized schedule of one-on-one sessions and small groups that get to the 'why' behind the addiction." },
  { title: "Support for the Whole Family", text: "The space and tools for your family to heal, set boundaries, and move forward together." },
];

const faqs = [
  { q: "What is dual diagnosis, and why does it matter?", a: "Dual diagnosis is when someone struggles with both a mental health condition (like depression or anxiety) and a substance use disorder at the same time. Treating only the addiction without healing the underlying condition sharply raises relapse risk — so we treat both as one integrated issue." },
  { q: "How do I know if my loved one needs a dual diagnosis program?", a: "If they use substances to 'cope' with their mood, or their mental health symptoms worsen when they aren't using, they likely need dual diagnosis care. Many of our clients come to us because standard rehabs didn't address the anxiety or trauma driving their addiction." },
  { q: "Will you manage my psychiatric medications during detox?", a: "Absolutely. Our clinical team monitors your neurochemistry 24/7 and can adjust or maintain psychiatric medications during detox to keep you stable and comfortable as your body clears substances." },
  { q: "Do I have to live in Orange County to attend?", a: "Not at all. We frequently welcome clients from across the country. Because we're minutes from John Wayne Airport (SNA), we make it easy for out-of-state families to access our boutique care with coordinated travel support." },
  { q: "Is dual diagnosis treatment covered by insurance?", a: "Yes — most PPO plans cover dual diagnosis treatment as essential medical and behavioral healthcare. Our admissions team provides a 100% confidential verification. Call 949-649-0702 for more information." },
];

export default function DualDiagnosisPage() {
  return (
    <>
      <PageHero
        eyebrow="Healing the intersection of mental health and addiction"
        title="Dual diagnosis program in Costa Mesa"
        subtitle="True recovery requires healing the underlying mental health conditions that drive the cycle of addiction. We treat co-occurring disorders simultaneously — the whole person, not just the symptoms."
        image="/images/facility/consult-room.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Treatment", href: "/treatment" }, { label: "Dual Diagnosis" }]}
      />

      <Split
        eyebrow="Welcome to Ocean Coast Recovery"
        title="Treating the root cause"
        paragraphs={[
          "At Ocean Coast Recovery Center, we specialize in dual diagnosis treatment — an integrated clinical approach that addresses co-occurring disorders at the same time.",
          "Our multidisciplinary team of medical and psychiatric experts creates a personalized roadmap to stabilize your mind and body. By treating the whole person rather than just the symptoms, we empower you to build a foundation for long-term sobriety and mental wellness.",
        ]}
        image="/images/facility/living-room-wide.jpg"
        imageAlt="Therapy session at Ocean Coast Recovery"
      />

      <CardGrid
        tint
        eyebrow="Common Co-Occurring Combinations"
        title="Conditions we treat together"
        subtitle="Whether you're dealing with depression, anxiety, or trauma alongside chemical dependency, we uncover the root causes of your struggle."
        items={combos}
        cols={2}
      />

      <CardGrid
        eyebrow="Proven Tools to Break the Cycle"
        title="Evidence-based therapies for co-occurring disorders"
        items={therapies}
      />

      <Steps
        eyebrow="What to Expect"
        title="Your integrated recovery journey"
        subtitle="From the moment you walk through our doors, you'll find a safe, six-bed boutique environment where your physical safety and mental well-being are our only priorities."
        steps={expect}
      />

      <ProgramGrid eyebrow="Your Path Through Care" title="Explore our other programs" exclude="/treatment/dual-diagnosis" />
      <InsuranceBand />
      <FAQ items={faqs} subtitle="Common questions about dual diagnosis treatment at Ocean Coast Recovery." />
      <CallbackCTA />
    </>
  );
}
