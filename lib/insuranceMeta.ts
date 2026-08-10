export type InsuranceMeta = { slug: string; name: string; short: string; image: string };

// Carriers with dedicated coverage pages (content in content/insurance/*.json).
export const insuranceMeta: InsuranceMeta[] = [
  { slug: "bcbs", name: "Blue Cross Blue Shield", short: "BCBS", image: "/images/facility/bedroom-twin.jpg" },
  { slug: "cigna", name: "Cigna", short: "Cigna", image: "/images/facility/pool-from-house.jpg" },
  { slug: "meritain", name: "Meritain Health", short: "Meritain", image: "/images/facility/pool-wide.jpg" },
  { slug: "beacon", name: "Beacon Health Options", short: "Beacon", image: "/images/facility/pool-waterfall.jpg" },
  { slug: "geha", name: "GEHA", short: "GEHA", image: "/images/facility/loft-overlook.jpg" },
  { slug: "value-options", name: "Value Options", short: "Value Options", image: "/images/facility/staircase.jpg" },
];

export const getInsuranceMeta = (slug: string) => insuranceMeta.find((c) => c.slug === slug);
