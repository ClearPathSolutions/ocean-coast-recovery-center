import type { Metadata } from "next";
import BioPage from "@/components/BioPage";

export const metadata: Metadata = {
  title: "Riky Hanaumi, LCSW — Clinical Director",
  description:
    "Meet Riky Hanaumi, LCSW, Clinical Director for Quadrant Health Group's California facilities, with more than 20 years in behavioral health and addiction treatment.",
};

export default function RikyHanaumiPage() {
  return (
    <BioPage
      name="Riky Hanaumi"
      role="Clinical Director"
      initials="RH"
      photo="/images/team/riky-hanaumi.jpg"
      paragraphs={[
        "Erika “Riky” Hanaumi is a Licensed Clinical Social Worker with more than 20 years of experience in behavioral health and addiction treatment. She serves as Clinical Director for Quadrant Health Group's California facilities, where she oversees clinical programming, mentors and supports therapists in developing effective treatment strategies, and ensures the delivery of compassionate, individualized, and clinically sound care. Her leadership focuses on promoting evidence-based practices, clinical excellence, and positive treatment outcomes for individuals with co-occurring mental health and substance use disorders.",
        "Riky began her career working with individuals experiencing homelessness, providing intensive support, advocacy, and resource coordination to help clients overcome barriers and access essential services. That experience fueled her passion for serving vulnerable populations and inspired her to pursue a Master of Social Work from California State University, Fullerton, which she earned in 2013.",
        "Throughout her career, Riky has worked in both inpatient and outpatient settings, providing therapy, crisis intervention, case management, and recovery-oriented services. She has extensive experience supporting adults with complex behavioral health needs, including co-occurring mental health and substance use disorders, while helping individuals navigate the challenges of recovery and major life transitions.",
        "She is trained in evidence-based treatment modalities including Cognitive Behavioral Therapy (CBT) and Dialectical Behavior Therapy (DBT), and is passionate about helping clients build resilience, strengthen coping skills, improve interpersonal relationships, and achieve lasting recovery.",
        "At the heart of Riky's work is a belief in the power of human connection and personal transformation. She is committed to empowering individuals to recognize their strengths, cultivate self-worth, and build fulfilling lives grounded in purpose, integrity, and hope.",
      ]}
    />
  );
}
