import type { Metadata } from "next";
import BioPage from "@/components/BioPage";

export const metadata: Metadata = {
  title: "Tami DiStefano, CADC II — Program Director",
  description:
    "Meet Tami DiStefano, CADC II, ICDC, Program Director at Ocean Coast Recovery Center in Costa Mesa, CA.",
};

export default function TamiPage() {
  return (
    <BioPage
      name="Tami DiStefano"
      creds="CADC II, ICDC"
      role="Program Director"
      initials="TD"
      paragraphs={[
        "I've been in this field for a little over 18 years, beginning my journey in 2007 by supporting Veterans. I started as a housing specialist and case manager, helping Veterans secure permanent housing and access their VA benefits. That experience opened the door for me to explore other meaningful ways to help people.",
        "In 2013, I began working in treatment and discovered my passion for this work. I enrolled in school to become a drug and alcohol counselor and have since had the opportunity to work with a wide range of populations, including First Responders.",
        "As someone in recovery myself, I bring a deep sense of understanding and empathy to the work I do. I know firsthand how challenging — and how rewarding — the journey can be. That experience allows me to meet people exactly where they are, with compassion, respect, and hope.",
        "What I love most about working at Ocean Coast Recovery Center is the genuine care everyone here has — not just for their work, but for every person who comes through our doors. It truly feels like a family. I find purpose in connecting with each client and walking alongside them as they discover their own strength and work toward a life of sobriety.",
        "Outside of work, I enjoy spending time with my family and taking beach days to reset and recharge. I'm passionate about sponsoring women in recovery and being part of their growth. I also love anything outdoors — traveling, ziplining, and skydiving whenever I get the chance. I believe in living fully, finding joy in the moment, and staying connected to what makes life meaningful.",
      ]}
    />
  );
}
