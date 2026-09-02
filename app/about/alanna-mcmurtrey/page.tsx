import type { Metadata } from "next";
import BioPage from "@/components/BioPage";

export const metadata: Metadata = {
  title: "Alanna McMurtrey — Lead Case Manager",
  description:
    "Meet Alanna McMurtrey, Lead Case Manager for Quadrant Health Group's Southern California facilities, supporting clients through detox and residential care.",
};

export default function AlannaMcMurtreyPage() {
  return (
    <BioPage
      name="Alanna McMurtrey"
      role="Lead Case Manager"
      initials="AM"
      photo="/images/team/alanna-mcmurtrey.jpg"
      paragraphs={[
        "Alanna McMurtrey serves as Lead Case Manager for the Southern California facilities of Quadrant Health Group, where she oversees case management services and supports clients through detox and residential levels of care. In her role she coordinates client care, provides leadership and clinical support to case management staff, and helps ensure that each individual receives consistent, structured, and personalized support throughout their treatment journey.",
        "With several years of experience in behavioral health and addiction treatment, Alanna has developed a strong passion for helping individuals overcome substance use disorders and co-occurring mental health challenges. She is dedicated to fostering engagement in treatment, promoting personal growth, and supporting clients as they work toward sustainable, long-term recovery.",
        "Alanna takes a client-centered, strengths-based approach to care, meeting individuals where they are and helping them build upon their unique strengths. She is committed to creating a safe, respectful, and supportive environment where clients feel heard, valued, and empowered to make meaningful changes in their lives. Through collaboration, compassion, and clinical consistency, she helps clients develop the skills, confidence, and stability needed to achieve lasting recovery and improved well-being.",
      ]}
    />
  );
}
