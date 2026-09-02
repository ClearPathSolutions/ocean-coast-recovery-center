import type { Metadata } from "next";
import BioPage from "@/components/BioPage";

export const metadata: Metadata = {
  title: "Michael McArthur — Nursing Director",
  description:
    "Meet Michael McArthur, Nursing Director for Quadrant Health Group's California facilities, overseeing medical staff and client care operations.",
};

// Regional leadership. As with Shawn Young, the doc's first-person copy is
// rendered in the site's third-person voice; the facts are unchanged.
export default function MichaelMcArthurPage() {
  return (
    <BioPage
      name="Michael McArthur"
      role="Nursing Director"
      initials="MM"
      photo="/images/team/michael-mcarthur.jpg"
      paragraphs={[
        "Michael McArthur is the Director of Nursing for Quadrant Health Group's California facilities, overseeing all medical staff and client care operations. His journey into nursing was inspired by a personal desire to provide hope and compassion during life's most challenging moments. Watching nurses care for his family during a difficult time, he realized how powerful a little hope and dedicated care can be — and knew he could make a difference when people need it most.",
        "He loves working in addiction recovery because it lets him witness clients grow and thrive within our walls. The staff's client-focused approach creates a positive, motivating environment that makes coming to work truly rewarding.",
        "Outside of his professional life, Michael is a proud father of four wonderful kids. They are his greatest inspiration, teaching him patience, resilience, and the importance of hope every day. His own recovery journey has strengthened his understanding of overcoming adversity, and it fuels his dedication to helping others find their path to healing.",
        "Michael works in this industry because he believes substance use disorder and behavioral health are underserved populations that deserve attention, compassion, and support. He is glad to be on the front lines helping to reduce stigma and provide clients with genuine opportunities for recovery.",
        "Personally, he is passionate about his family, about continuous improvement in patient care through scientific and technological advances, and about the Los Angeles Lakers. His goal is to make a meaningful difference, one life at a time, with hope, compassion, and unwavering dedication.",
      ]}
    />
  );
}
