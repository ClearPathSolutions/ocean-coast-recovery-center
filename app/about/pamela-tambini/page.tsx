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
          "Dr. Pamela Tambini is a board-certified physician in Internal Medicine and Addiction Medicine, healthcare executive, and Founder and Chief Executive Officer of The Sober Connection, a physician-led medical services organization supporting behavioral healthcare facilities nationwide.",
          "Through The Sober Connection, Dr. Tambini provides executive-level medical oversight and supports the development of clinical standards, quality assurance processes, and regulatory compliance initiatives. The Sober Connection's network of qualified medical professionals is responsible for the direct delivery and management of patient medical services at the behavioral healthcare facilities it serves, in accordance with applicable state and federal requirements.",
          "The Sober Connection provides comprehensive medical services across the continuum of behavioral healthcare, including medical detoxification, residential treatment, partial hospitalization, intensive outpatient, and outpatient settings. Its services include physician and advanced practice provider staffing, medical directorship services, provider credentialing, clinical quality assurance, policy development, provider education, and regulatory support.",
          "Dr. Tambini's role is focused primarily on organizational medical leadership, clinical governance, quality improvement, provider oversight.",
          "Prior to founding The Sober Connection, Dr. Tambini served as a hospitalist within the Veterans Health Administration, where she gained extensive experience managing medically complex patients and collaborating with multidisciplinary healthcare teams.",
          "Under Dr. Tambini's leadership, The Sober Connection has developed a multi-state medical services platform designed to provide behavioral healthcare organizations with consistent, evidence-based, and compliant medical services. The organization supports facilities with qualified medical professionals who evaluate and treat patients, manage medical needs, coordinate care, and provide services within their respective scopes of practice and applicable regulatory requirements.",
          "Dr. Tambini remains focused on advancing standards in addiction medicine and behavioral healthcare through physician leadership, provider education, clinical governance, and the development of systems that promote quality, accountability, continuity of care, and regulatory excellence.",
        ]}
    />
  );
}
