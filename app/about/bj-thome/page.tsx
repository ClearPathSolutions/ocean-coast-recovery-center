import type { Metadata } from "next";
import BioPage from "@/components/BioPage";

export const metadata: Metadata = {
  title: "BJ Thome — Alumni Coordinator",
  description:
    "Meet BJ Thome, Alumni Coordinator for Quadrant Health Group's California facilities, keeping alumni connected to a recovery community long after discharge.",
  // Network-wide alumni staff, exactly like Dr. Tambini: this is the parent's
  // approved copy and the same text goes on every California facility site, so
  // the page points at the parent rather than competing with it. The target was
  // checked live and returns 200.
  alternates: {
    canonical: "https://www.quadranthealthgroup.com/team/bj-thome/",
  },
};

export default function BJThomePage() {
  return (
    <BioPage
      name="BJ Thome"
      role="Alumni Coordinator"
      initials="BT"
      photo="/images/team/bj-thome.jpg"
      paragraphs={[
        "BJ Thome serves as the Alumni Coordinator for Quadrant Health Group's California facilities, where his purpose is to ensure that no one feels they have to walk the road of recovery alone. His passion for this work is deeply personal. Having experienced the struggles of addiction firsthand, BJ understands both the courage it takes to begin recovery and the importance of continued support long after treatment ends.",
        "BJ focuses on building genuine, trusting relationships with clients while they are still in treatment, helping establish a sense of connection and community before they transition back into everyday life. He believes recovery does not end at discharge — and neither should the support. His goal is for every client to know they have somewhere to turn, people who understand, and a community that continues to stand behind them.",
        "Drawing from his own lived experience, BJ is passionate about meeting people where they are without judgment and reminding them that their story does not have to end where addiction once took them. He strives to make every person he encounters feel seen, heard, valued, and welcomed.",
        "For BJ, alumni coordination is about more than building a program. It is about creating lasting connection, belonging, and purpose while helping individuals stay engaged in a recovery community that genuinely wants to see them succeed.",
      ]}
    />
  );
}
