export type InsuranceMeta = { slug: string; name: string; short: string; image: string };

// Carriers with dedicated coverage pages (content in content/insurance/*.json).
export const insuranceMeta: InsuranceMeta[] = [
  { slug: "bcbs", name: "Blue Cross Blue Shield", short: "BCBS", image: "/images/facility/facility-04.jpg" },
  { slug: "cigna", name: "Cigna", short: "Cigna", image: "/images/facility/facility-05.jpg" },
  { slug: "meritain", name: "Meritain Health", short: "Meritain", image: "/images/facility/facility-09.jpg" },
  { slug: "beacon", name: "Beacon Health Options", short: "Beacon", image: "/images/facility/facility-10.jpg" },
  { slug: "geha", name: "GEHA", short: "GEHA", image: "/images/facility/facility-06.jpg" },
  { slug: "value-options", name: "Value Options", short: "Value Options", image: "/images/facility/facility-11.jpg" },
];

export const getInsuranceMeta = (slug: string) => insuranceMeta.find((c) => c.slug === slug);
