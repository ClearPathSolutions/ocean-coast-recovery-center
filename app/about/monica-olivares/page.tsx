import type { Metadata } from "next";
import BioPage from "@/components/BioPage";

export const metadata: Metadata = {
  title: "Monica Olivares — Clinical Supervisor",
  description:
    "Meet Monica Olivares, CADC II, Clinical Supervisor for Quadrant Health Group's California facilities, with over 11 years in behavioral health.",
};

// The approved headshot filename reads "Olivires"; the staff-bios doc spells it
// Olivares, and the doc is authoritative on names (HS-04).
export default function MonicaOlivaresPage() {
  return (
    <BioPage
      name="Monica Olivares"
      role="Clinical Supervisor"
      initials="MO"
      photo="/images/team/monica-olivares.jpg"
      paragraphs={[
        "Monica Olivares serves as Clinical Supervisor for Quadrant Health Group's California facilities, bringing over 11 years of experience in the behavioral health field and a deeply personal passion for recovery and healing. Throughout her career, Monica has worked across nearly every level of care — detox, residential, IOP, PHP, and outpatient — while holding a wide range of roles from Behavioral Health Technician and Case Manager to Program Manager and Program Director.",
        "Monica holds a CADC II certification and has extensive experience supporting individuals struggling with substance use disorders, co-occurring mental health conditions, and eating disorders. Her leadership style is rooted in compassion, authenticity, accountability, and connection, helping create treatment environments where clients feel genuinely supported, understood, and empowered throughout their recovery journey.",
        "In addition to her professional experience, Monica brings 13 years of personal recovery experience to the work she does each day. Her lived experience allows her to connect with clients on a deeper level while helping foster hope, trust, and meaningful change. She believes recovery should be individualized, engaging, and centered around human connection, and that healing can happen while still embracing joy, humor, and community.",
        "Known for her energy, heart, and dedication, Monica is passionate about helping both clients and staff grow while cultivating strong, supportive treatment teams across the California programs. Outside of work, she enjoys spending time with her family, being outdoors, attending music festivals, exploring escape rooms, traveling, and creating memorable life experiences.",
      ]}
    />
  );
}
