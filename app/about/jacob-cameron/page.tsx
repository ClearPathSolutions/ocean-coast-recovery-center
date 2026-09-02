import type { Metadata } from "next";
import BioPage from "@/components/BioPage";

export const metadata: Metadata = {
  title: "Jacob Cameron — Client Care Director",
  description:
    "Meet Jacob Cameron, SUDCC I, Client Care Director at Quadrant Health Group, focused on personalized care and a genuine sense of belonging in treatment.",
};

export default function JacobCameronPage() {
  return (
    <BioPage
      name="Jacob Cameron"
      role="Client Care Director"
      initials="JC"
      photo="/images/team/jacob-cameron.jpg"
      paragraphs={[
        "Jacob Cameron serves as Client Care Director at Quadrant Health Group and is a Registered Substance Use Disorder Counselor (SUDCC I). Passionate about helping individuals navigate the recovery process, Jacob is dedicated to creating a treatment experience that is both meaningful and engaging. He believes lasting recovery is built through genuine connection, compassionate support, and an environment where clients feel valued every step of the way.",
        "In his role, Jacob works to ensure that each client receives personalized care and experiences a sense of belonging throughout their treatment journey. His goal is to help individuals not only achieve recovery but also discover that life in recovery can be fulfilling, rewarding, and enjoyable. Through his commitment to client-centered care, Jacob strives to make a lasting positive impact on the lives of those he serves.",
      ]}
    />
  );
}
