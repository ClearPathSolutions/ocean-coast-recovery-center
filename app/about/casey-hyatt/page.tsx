import type { Metadata } from "next";
import { fitTitle } from "@/lib/site";
import BioPage from "@/components/BioPage";

export const metadata: Metadata = {
  title: fitTitle("Casey Hyatt — Director of Family Services"),
  description:
    "Meet Casey Hyatt, Director of Family Services at Quadrant Health Group, with 15 years in behavioral health and 18 years in recovery.",
  // Network-wide leadership, exactly like Dr. Tambini and BJ Thome: this is the
  // parent's approved copy and the same text goes on every Quadrant facility
  // site, so the page points at the parent rather than competing with it.
  alternates: {
    canonical: "https://www.quadranthealthgroup.com/team/casey-hyatt/",
  },
};

export default function CaseyHyattPage() {
  return (
    <BioPage
      name="Casey Hyatt"
      role="Director of Family Services"
      initials="CH"
      photo="/images/team/casey-hyatt.jpg"
      paragraphs={[
        "Casey Hyatt brings 15 years of experience in the behavioral health field, clinical expertise, and a personal connection to recovery to his role as Director of Family Services at Quadrant Health Group. A Nashville, Tennessee native, Casey previously served as Director of Alumni Services for ten years, leading a team of eight peer professionals and coordinating 62 annual alumni and community recovery events to strengthen engagement, connection, and support beyond treatment. He holds a Master of Arts in Counseling from the Hazelden Betty Ford Graduate School and has extensive experience facilitating groups and utilizing multiple clinical approaches, with an emphasis on substance use disorders, mental health, experiential modalities, and Internal Family Systems (IFS).",
        "With 18 years in recovery, Casey understands the importance of connection, accountability, and continued growth throughout the recovery journey. In his current role, he works collaboratively with clinical teams across Quadrant Health Group to strengthen team dynamics, streamline services, and expand support for families navigating the challenges of addiction and mental health. Casey is passionate about helping families build healthier relationships, improve communication, and develop the tools needed to support long-term recovery while prioritizing their own well-being. His professional experience and personal perspective reflect his commitment to creating stronger support systems for individuals, families, and the broader recovery community.",
      ]}
    />
  );
}
