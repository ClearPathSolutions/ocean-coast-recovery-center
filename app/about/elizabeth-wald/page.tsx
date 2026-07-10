import type { Metadata } from "next";
import BioPage from "@/components/BioPage";

export const metadata: Metadata = {
  title: "Elizabeth Wald, RADT — Director of Operations",
  description:
    "Meet Elizabeth Wald, RADT, Director of Operations at Ocean Coast Recovery Center in Costa Mesa, CA.",
};

export default function ElizabethPage() {
  return (
    <BioPage
      name="Elizabeth Wald"
      creds="RADT"
      role="Director of Operations"
      initials="EW"
      paragraphs={[
        "I currently serve as the Director of Operations at Ocean Coast Recovery Center, where I am responsible for overseeing the daily operations of the facility. My role includes managing staff, developing and implementing policies and procedures, and ensuring full compliance with industry regulations and standards.",
        "I've been working in the addiction treatment field since 2021, and I've proudly been part of the team since the facility's opening. What I appreciate most about being part of a small, six-bed facility is the family-like atmosphere it creates. It allows us to truly focus on each individual's needs and provide meaningful, personalized support.",
        "Professionally, I'm passionate about creating a space where people feel heard, supported, and empowered. I entered this field because I understand firsthand what our clients are going through — I've walked that path myself. My own recovery journey gives me insight into the challenges they face.",
        "My job is about meeting people where they are, equipping them with the tools, knowledge, and encouragement they need to pursue lasting sobriety.",
      ]}
    />
  );
}
