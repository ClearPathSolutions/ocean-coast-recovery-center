import type { Metadata } from "next";
import BioPage from "@/components/BioPage";

export const metadata: Metadata = {
  title: "Jeremiah Ross — Nursing Supervisor",
  description:
    "Meet Jeremiah Ross, Nursing Supervisor, with more than 10 years of patient care experience in substance use disorder treatment and clinical team leadership.",
};

export default function JeremiahRossPage() {
  return (
    <BioPage
      name="Jeremiah Ross"
      role="Nursing Supervisor"
      initials="JR"
      photo="/images/team/jeremiah-ross.jpg"
      paragraphs={[
        "Jeremiah Ross is a dedicated healthcare professional with more than 10 years of patient care experience and a strong background in substance use disorder treatment, client care coordination, and clinical team leadership. As Nursing Supervisor, Jeremiah plays an integral role in supporting both clients and staff — helping oversee day-to-day clinical operations, medication-assisted treatment (MAT) protocols, documentation compliance, staff development, and the multidisciplinary collaboration that keeps standards of care high.",
        "Passionate about helping individuals navigate the recovery process, Jeremiah is committed to creating a safe, supportive, and structured treatment environment where clients can build stability, develop healthy coping skills, and work toward lasting recovery. His leadership style emphasizes compassion, accountability, and teamwork, fostering positive outcomes for clients and clinical staff alike.",
      ]}
    />
  );
}
