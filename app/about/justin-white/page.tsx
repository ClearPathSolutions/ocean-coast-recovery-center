import type { Metadata } from "next";
import BioPage from "@/components/BioPage";

export const metadata: Metadata = {
  title: "Justin White — Program Director",
  description:
    "Meet Justin White, Registered Addiction Counselor and Program Director for Quadrant Health Group's Southern California facilities.",
};

export default function JustinWhitePage() {
  return (
    <BioPage
      name="Justin White"
      role="Program Director"
      initials="JW"
      photo="/images/team/justin-white.jpg"
      paragraphs={[
        "Justin White serves as Program Director for Quadrant Health Group's Southern California facilities, providing operational leadership and program oversight across the organization's behavioral health treatment centers. In this role he works closely with multidisciplinary teams to ensure each facility delivers high-quality, individualized care while maintaining excellence in clinical programming, regulatory compliance, and day-to-day operations.",
        "A Registered Addiction Counselor, Justin brings extensive experience in both detoxification and residential treatment settings. His leadership is rooted in the belief that recovery is never one-size-fits-all, and he is committed to fostering treatment environments where every client feels respected, supported, and empowered throughout their healing journey.",
        "Known for his compassionate and collaborative leadership style, Justin is passionate about developing strong teams and creating programs that promote lasting recovery. He believes meaningful change begins with genuine human connection and is dedicated to helping both clients and staff reach their fullest potential.",
      ]}
    />
  );
}
