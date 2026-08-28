import type { Metadata } from "next";
import BioPage from "@/components/BioPage";

export const metadata: Metadata = {
  title: "Dr. Pamela Tambini — Medical Oversight",
  description:
    "Dr. Pamela Tambini, board-certified in Internal Medicine and Addiction Medicine, provides medical oversight across Quadrant Health Group.",
  // Network-wide staff. This exact bio is published on quadranthealthgroup.com
  // and on every other Quadrant facility site, so the page points at the parent
  // rather than competing with it as a near-duplicate.
  alternates: {
    canonical: "https://www.quadranthealthgroup.com/team/pamela-tambini/",
  },
};

export default function PamelaTambiniPage() {
  return (
    <BioPage
      name="Dr. Pamela Tambini"
      role="Medical Oversight"
      initials="PT"
      photo="/images/team/pamela-tambini.jpg"
      paragraphs={[
          "Dr. Pamela Tambini is a board-certified physician in Internal Medicine and Addiction Medicine, entrepreneur, and healthcare executive dedicated to advancing evidence-based treatment for individuals with substance use and co-occurring mental health disorders. She is the Founder and Chief Executive Officer of The Sober Connection, a physician-led medical services organization that partners with behavioral healthcare facilities nationwide to provide comprehensive medical leadership, provider staffing, quality assurance, and regulatory compliance solutions.",
          "With extensive experience across the continuum of addiction treatment\u2014including medical detoxification, residential treatment, partial hospitalization, intensive outpatient, and outpatient care\u2014Dr. Tambini has developed scalable clinical programs that improve patient outcomes while helping organizations maintain regulatory excellence and operational efficiency. Her expertise includes addiction medicine, psychopharmacology, withdrawal management, medical stabilization, utilization review, physician leadership, and multi-state healthcare operations.",
          "Prior to founding The Sober Connection, Dr. Tambini served as a hospitalist within the Veterans Health Administration, where she managed medically complex patients and collaborated with multidisciplinary teams to deliver high-quality inpatient care. Her clinical expertise, combined with her operational leadership, provides a unique perspective on integrating medical excellence with sustainable healthcare systems.",
          "Under Dr. Tambini's leadership, The Sober Connection has grown into a multi-state organization supporting behavioral healthcare facilities through physician staffing, medical directorships, quality improvement initiatives, provider education, credentialing, policy development, and clinical oversight. She is recognized for building high-performing medical teams, implementing standardized clinical processes, and helping treatment centers navigate accreditation, licensing, and payer requirements.",
          "Dr. Tambini is passionate about raising the standard of addiction medicine by combining compassionate patient care with innovative operational strategies. Her leadership philosophy emphasizes clinical integrity, accountability, and collaboration, with a focus on creating systems that support both providers and the patients they serve.",
          "She remains actively involved in medical education, physician mentorship, and the ongoing advancement of best practices in behavioral healthcare while continuing to care for patients and advise organizations on clinical program development, healthcare operations, and quality improvement initiatives.",
      ]}
    />
  );
}
