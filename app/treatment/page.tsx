import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Split, CardGrid } from "@/components/ContentBlocks";
import ProgramGrid from "@/components/ProgramGrid";
import InsuranceBand from "@/components/InsuranceBand";
import Testimonials from "@/components/Testimonials";
import CallbackCTA from "@/components/CallbackCTA";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Addiction Treatment Services in Orange County",
  description:
    "Comprehensive drug & alcohol treatment in Costa Mesa, CA — medical detox, residential inpatient, dual diagnosis, family therapy, and aftercare.",
};

const therapies = [
  { title: "Cognitive Behavioral Therapy", text: "Identifying and shifting the thought patterns that lead to self-medication and distress." },
  { title: "Dialectical Behavior Therapy", text: "Practical tools for distress tolerance and emotional regulation." },
  { title: "Trauma-Informed Care", text: "Addressing the underlying PTSD and experiences that drive the cycle of addiction." },
  { title: "Group & Peer Support", text: "Building a supportive community of peers who share accountability and hope." },
  { title: "Holistic Therapies", text: "Meditation, yoga, tai chi, reiki, art & music therapy, acupuncture, and nature hikes." },
  { title: "Nutrition Counseling", text: "Restoring physical health to support the work of long-term recovery." },
];

export default function TreatmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Premier substance abuse treatment in Costa Mesa"
        title="Addiction treatment services in Orange County"
        subtitle="We meet you where you are and build an individualized plan that treats the whole person — mind, body, and spirit."
        image="/images/facility/facility-05.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Treatment" }]}
      />

      <Split
        eyebrow="Welcome to Ocean Coast Recovery"
        title="Substance abuse treatment, reimagined"
        paragraphs={[
          "Addiction is a complex disease of brain reward, motivation, memory, and pathways — shaped by genetic, biological, social, and psychological factors. It cannot be viewed through a single lens.",
          "At our treatment center in Orange County, we understand that your addiction may have taken over your identity. We're here to help you find your way back to you — to step away from drugs and alcohol and into recovery.",
          "The proper treatment can feel as if someone not only turned on the light, but showed you the path out. You do not have to continue to suffer in isolation, because there is a way out.",
        ]}
        image="/images/facility/facility-08.jpg"
        imageAlt="Comfortable interior at Ocean Coast Recovery"
      />

      <ProgramGrid
        eyebrow="Addiction & Mental Health Programs"
        title="Our continuum of care"
        subtitle="From your first day of detox to lifelong alumni support, every stage of recovery is covered under one roof."
      />

      <CardGrid
        eyebrow="Types of Care"
        title="A multifaceted, holistic approach"
        subtitle="Treatment should be more than a circle of chairs. We blend medical and non-medical therapies to give you a wide range of tools for life after treatment."
        items={therapies}
      />

      <Split
        tint
        imageSide="left"
        eyebrow="What Makes Ocean Coast Different?"
        title="A person who happens to have an addiction"
        paragraphs={[
          "At Ocean Coast, we don't see you as an addict who happens to be a person. We see you as a person who happens to have an addiction. Your addiction is not who you are.",
          "We take a holistic approach because addiction affects your whole person — mind, body, and spirit. Our treatment seeks to bring healing to all three so you can move forward into long-term recovery.",
          "While your addiction may always be part of your story, it doesn't have to be the whole story. We'll partner with you to write new chapters.",
        ]}
        image="/images/facility/facility-10.jpg"
        imageAlt="Ocean Coast Recovery facility"
      >
        <Link href="/admissions" className="btn-ocean mt-8">Get Help Now <ArrowRight className="h-4 w-4" /></Link>
      </Split>

      <InsuranceBand />
      <Testimonials variant="foam" />
      <CallbackCTA />
    </>
  );
}
