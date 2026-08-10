import type { Metadata } from "next";
import BioPage from "@/components/BioPage";

export const metadata: Metadata = {
  title: "Halie Nall — Case Manager",
  description:
    "Meet Halie Nall, Case Manager at Ocean Coast Recovery Center in Costa Mesa, CA.",
};

export default function HaliePage() {
  return (
    <BioPage
      name="Halie Nall"
      role="Case Manager"
      initials="HN"
      photo="/images/team/halie-nall.jpg"
      paragraphs={[
        "Halie Nall is a dedicated Case Manager who is passionate about supporting individuals throughout their recovery journey and helping them access the resources, tools, and support needed to build healthy, fulfilling lives.",
        "Her commitment to this work is shaped by both professional experience and personal lived experience with addiction and mental health challenges, as well as witnessing the impact of substance use within her own family. These experiences have provided Halie with a deep sense of empathy, understanding, and compassion for those facing similar struggles.",
        "She believes that recovery is possible for everyone and is committed to meeting clients where they are, offering encouragement, advocacy, and support every step of the way. Known for her compassionate approach and genuine connection with clients, Halie strives to create a safe and supportive environment where individuals feel heard, valued, and empowered as they work toward lasting recovery and personal growth.",
      ]}
    />
  );
}
