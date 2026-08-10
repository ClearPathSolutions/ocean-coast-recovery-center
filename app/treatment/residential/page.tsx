import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Split, CardGrid } from "@/components/ContentBlocks";
import ProgramGrid from "@/components/ProgramGrid";
import FAQ from "@/components/FAQ";
import InsuranceBand from "@/components/InsuranceBand";
import Testimonials from "@/components/Testimonials";
import CallbackCTA from "@/components/CallbackCTA";

export const metadata: Metadata = {
  title: "Luxury Residential Inpatient Rehab in Costa Mesa, CA",
  description:
    "Immersive, 24/7 residential addiction treatment in an intimate six-bed home in Costa Mesa. 30, 60, and 90+ day options with evidence-based, personalized care.",
};

const advantages = [
  { title: "True 1-on-1 Clinical Focus", text: "With fewer residents, our therapists and medical staff have more time for your specific journey — no detail overlooked." },
  { title: "A Quiet, Boutique Sanctuary", text: "Our Costa Mesa home is a peaceful retreat. Without the noise of a large facility, you can truly focus on healing." },
  { title: "Peer Connection & Accountability", text: "In a six-bed setting, group sessions are intimate and meaningful, building deep, supportive bonds." },
  { title: "Executive-Level Privacy", text: "Our small size ensures maximum discretion for professionals and families who prioritize privacy above all." },
];

const therapies = [
  { title: "Cognitive Behavioral Therapy (CBT)", text: "Shifting the deep-seated thought patterns that lead to self-medication and emotional distress." },
  { title: "Dialectical Behavior Therapy (DBT)", text: "Practical tools for distress tolerance and emotional regulation in a safe environment." },
  { title: "Trauma-Informed Care", text: "Addressing the underlying PTSD and past experiences that drive the cycle of addiction." },
  { title: "Dual Diagnosis Integration", text: "Psychiatric oversight combined with behavioral therapy to stabilize co-occurring disorders." },
  { title: "Family Therapy", text: "Healing the entire family unit — communication, boundaries, and the dynamics affected by addiction." },
  { title: "Group Therapy", text: "A supportive community of peers providing the accountability and shared experience recovery requires." },
];

const faqs = [
  { q: "What is the difference between detox and residential inpatient?", a: "Detox focuses on medical stabilization and clearing substances from your system. Residential inpatient is where the deep psychological healing begins — a structured, 24/7 environment of intensive therapy, group sessions, and mental health support." },
  { q: "Why is a six-bed program better than a larger facility?", a: "A six-bed program offers a level of intimacy and personalized clinical attention large institutions can't match. Our therapists provide true one-on-one care, and our medical team monitors your progress with far greater detail and compassion." },
  { q: "Is your residential program licensed and accredited?", a: "Yes. Ocean Coast Recovery is a state-licensed residential care facility through the Department of Health Care Services (DHCS), adhering to the highest clinical standards for dual diagnosis and addiction treatment." },
  { q: "Do you accept insurance for residential care?", a: "We work with most major PPO providers to make our boutique care accessible. Our team offers a 100% confidential insurance verification to help you maximize your benefits. Call 949-649-0702 for a free verification." },
  { q: "What should I bring for my stay?", a: "Since our program is a 'home-away-from-home,' bring comfortable clothing, personal hygiene items, and any current medications. Our Orange County weather is mild, so light layers are best for time in our outdoor healing spaces." },
];

export default function ResidentialPage() {
  return (
    <>
      <PageHero
        eyebrow="Orange County drug & alcohol residential program"
        title="Luxury inpatient rehab in Costa Mesa"
        subtitle="The most immersive level of care we offer — 24/7 clinical support in a safe, high-comfort home designed for those who need to step away and focus entirely on healing."
        image="/images/facility/bedroom-twin.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Treatment", href: "/treatment" }, { label: "Residential Inpatient" }]}
      />

      <Split
        eyebrow="Round-the-clock support that feels like home"
        title="Is residential treatment right for you?"
        paragraphs={[
          "Residential treatment is designed for those who need to step away from the noise and triggers of daily life to focus entirely on healing. You live on-site in a safe home where medical and clinical support is available around the clock.",
          "This level of care bridges the gap between the intensity of detox and the return to independent living. It's the right choice for anyone who feels their current environment makes staying sober feel impossible — especially those who've tried outpatient before and needed more consistent, 24/7 accountability.",
        ]}
        image="/images/facility/bedroom-single.jpg"
        imageAlt="Residential bedroom suite at Ocean Coast Recovery"
      />

      <CardGrid
        tint
        eyebrow="The Advantage of Intimacy"
        title="Why our six-bed home changes everything"
        subtitle="In a large, institutional facility, it's easy to feel like just another number. We intentionally limited our program to six beds — so you're a member of a close-knit healing community, not a statistic."
        items={advantages}
        cols={2}
      />

      <CardGrid
        eyebrow="Comprehensive 24/7 Clinical Care"
        title="Evidence-based therapies for real healing"
        subtitle="Because our clinicians observe you in a residential setting, we can fine-tune your medication management and therapeutic plan — treating root causes, not just symptoms."
        items={therapies}
      />

      <ProgramGrid eyebrow="Your Path Through Care" title="Explore our other programs" exclude="/treatment/residential" />

      <InsuranceBand />
      <Testimonials variant="foam" />
      <FAQ items={faqs} subtitle="Common questions about our residential inpatient program in Costa Mesa." />
      <CallbackCTA />
    </>
  );
}
