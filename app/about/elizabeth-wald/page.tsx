import type { Metadata } from "next";
import BioPage from "@/components/BioPage";

// BIO-02: title, credentials, scope and start history all corrected to the QHG
// staff-bios document, which is authoritative. Previously this page published
// her as "Director of Operations, RADT" scoped to this facility alone and said
// she had been here "since the facility's opening" — the doc places her as
// Program Director across Quadrant Health Group's Southern California
// facilities, lists no credential, and puts her start at the opening of a
// *Northern* California facility.
export const metadata: Metadata = {
  title: "Elizabeth Wald — Program Director",
  description:
    "Meet Elizabeth Wald, Program Director for Quadrant Health Group's Southern California facilities, including Ocean Coast Recovery Center in Costa Mesa, CA.",
};

export default function ElizabethPage() {
  return (
    <BioPage
      name="Elizabeth Wald"
      role="Program Director"
      initials="EW"
      photo="/images/team/elizabeth-wald.jpg"
      paragraphs={[
        "I serve as Program Director for Quadrant Health Group's Southern California facilities, including Ocean Coast Recovery Center. My role covers managing staff, developing and implementing policies and procedures, and ensuring full compliance with industry regulations and standards across the programs I oversee.",
        "I've been working in the addiction treatment field since 2021, beginning with the opening of one of Quadrant Health Group's Northern California facilities. What I appreciate most about our smaller programs is the family-like atmosphere they create. It allows us to truly focus on each individual's needs and provide meaningful, personalized support.",
        "Professionally, I'm passionate about creating a space where people feel heard, supported, and empowered. I entered this field because I understand firsthand what our clients are going through — I've walked that path myself. My own recovery journey gives me insight into the challenges they face.",
        "My job is about meeting people where they are, equipping them with the tools, knowledge, and encouragement they need to pursue lasting sobriety.",
      ]}
    />
  );
}
