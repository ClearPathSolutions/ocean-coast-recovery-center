import type { Metadata } from "next";
import BioPage from "@/components/BioPage";

export const metadata: Metadata = {
  title: "Vahan Oknayan, AMFT — Therapist",
  description:
    "Meet Vahan Oknayan, AMFT, Therapist at Ocean Coast Recovery Center in Costa Mesa, CA.",
};

export default function VahanPage() {
  return (
    <BioPage
      name="Vahan Oknayan"
      creds="AMFT"
      role="Therapist"
      initials="VO"
      paragraphs={[
        "Vahan Oknayan is an Associate Marriage and Family Therapist who earned his Master of Arts in Clinical Psychology from Pepperdine University and his Bachelor of Fine Arts in Acting from California State University, Fullerton. His background in the arts has fostered a deep appreciation for creativity, emotional expression, and the powerful connection between the mind and body.",
        "Vahan takes an integrative, client-centered approach to therapy, recognizing the unique ways that thoughts, emotions, relationships, behaviors, past experiences, and physical responses influence overall well-being. He values curiosity, authenticity, and collaboration, striving to understand each individual beyond the challenges that initially bring them into treatment.",
        "Committed to creating a safe, supportive, and engaging therapeutic environment, Vahan believes that meaningful healing begins with a strong therapeutic relationship. He encourages both honest reflection and moments of humor throughout the recovery process, tailoring treatment to each client's individual needs while empowering them to build lasting resilience and meaningful change.",
      ]}
    />
  );
}
