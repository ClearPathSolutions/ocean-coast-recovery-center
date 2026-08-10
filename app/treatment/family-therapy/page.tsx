import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Split, CardGrid } from "@/components/ContentBlocks";
import ProgramGrid from "@/components/ProgramGrid";
import InsuranceBand from "@/components/InsuranceBand";
import CallbackCTA from "@/components/CallbackCTA";

export const metadata: Metadata = {
  title: "Family Therapy for Addiction in Orange County",
  description:
    "Addiction is a family disease. Ocean Coast Recovery's family therapy program helps loved ones heal, set healthy boundaries, and support lasting recovery together.",
};

const supportGroups = [
  { title: "Nar-Anon", text: "A confidential, welcoming 12-step space where family members of those with addiction can share their experiences and learn they are not alone." },
  { title: "Al-Anon", text: "A support group for family and friends affected by another person's addiction to alcohol — open to anyone impacted." },
  { title: "SMART Recovery Friends & Family", text: "A secular, science-based four-point alternative built on SMART and CRAFT tools, teaching non-confrontational, self-protective approaches." },
  { title: "PAL, GRASP & Others", text: "Parents of Addicted Loved Ones, sibling support groups, and grief-centered groups like GRASP for families affected by overdose loss." },
];

export default function FamilyTherapyPage() {
  return (
    <>
      <PageHero
        eyebrow="Therapy for the whole family"
        title="Family therapy for addiction"
        subtitle="Those closest to a person with addiction often suffer the most. Family therapy helps everyone heal from the pain and dysfunction addiction can cause."
        image="/images/facility/living-room-wide.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Treatment", href: "/treatment" }, { label: "Family Therapy" }]}
      />

      <Split
        eyebrow="Family Therapy in Orange County"
        title="Addiction is a family disease"
        paragraphs={[
          "Drug and alcohol use profoundly impacts the brain of someone with an addiction, and people struggling with the disease will sometimes do and say things that cause emotional harm to those they love most.",
          "Family members may feel alone, angry, or as though they failed as a parent or spouse. It is crucial for them to find support from others who understand — because one family member's addiction inevitably affects the entire family.",
        ]}
        image="/images/facility/dining-room.jpg"
        imageAlt="Family therapy session"
      />

      <Split
        tint
        imageSide="left"
        eyebrow="An Important Piece"
        title="How family therapy is used in rehab"
        paragraphs={[
          "While individual therapy focuses on one person's behaviors, thoughts, and emotions, family therapy focuses on the entire family's relationships — validating everyone's experience while repairing strained communication.",
          "A trained family therapist explores how substance use is embedded in a cycle of interaction within the family. They educate the whole family about substance use and help reduce unhelpful behaviors, such as enabling, while increasing effective ones.",
          "Research shows family therapy helps repair relationships, supports behavioral change, and improves family engagement — increasing the chance that a loved one seeks help and maintains long-term recovery.",
        ]}
        image="/images/facility/patio-dining.jpg"
        imageAlt="Comfortable common space at Ocean Coast Recovery"
      />

      <CardGrid
        eyebrow="Beyond Our Program"
        title="Family support groups"
        subtitle="In addition to family therapy, several support groups exist to help family members of a loved one in treatment. A few of the most helpful:"
        items={supportGroups}
        cols={2}
      />

      <ProgramGrid eyebrow="Your Path Through Care" title="Explore our programs" exclude="/treatment/family-therapy" />
      <InsuranceBand />
      <CallbackCTA />
    </>
  );
}
