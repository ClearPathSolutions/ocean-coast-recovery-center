import type { Metadata } from "next";
import BioPage from "@/components/BioPage";

export const metadata: Metadata = {
  title: "Shawn Young — Executive Director",
  description:
    "Meet Shawn Young, Executive Director for Quadrant Health Group's Southern California treatment facilities, including Ocean Coast Recovery Center.",
};

// Regional leadership: Shawn covers every Southern California facility, not
// this one alone. His bio in the QHG staff-bios doc is written in the first
// person; it is rendered here in the same third-person voice as the rest of
// the team so one team page does not mix two voices. Every fact is his own.
export default function ShawnYoungPage() {
  return (
    <BioPage
      name="Shawn Young"
      role="Executive Director"
      initials="SY"
      photo="/images/team/shawn-young.jpg"
      paragraphs={[
        "As Executive Director of Southern California, Shawn Young leads a team of dedicated professionals across several substance abuse treatment facilities — but at the heart of what he does is people. Whether it is helping a client take their first step toward recovery or supporting a staff member as they grow into leadership, his passion lies in developing others and building environments where people can thrive.",
        "He did not get here by accident. Shawn worked his way up through this field — from cooking in the kitchen and working as a tech, to becoming a clinician, and now serving in executive leadership. That journey gave him a deep understanding of what this work really takes: grit, heart, and an unwavering commitment to showing up for people when they need it most.",
        "Shawn believes recovery is more than just treatment. It is a lifelong journey, and his teams have the privilege of helping people build that foundation.",
        "At the end of the day, Shawn is a husband and a father. His family is his foundation and the reason he leads with heart. The way he shows up at home is how he tries to show up in this work — grounded, honest, and fully present. This isn't just a job to him; it's a calling, and he is all in.",
      ]}
    />
  );
}
