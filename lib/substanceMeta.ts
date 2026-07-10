// Clean display metadata for the substance detox pages (the scraped titles carry
// legacy "Huntington Beach" SEO wording; we present clean titles + keep the real body).
export type SubstanceMeta = { slug: string; label: string; heroTitle: string; image: string };

export const substanceMeta: SubstanceMeta[] = [
  { slug: "alcohol", label: "Alcohol Detox", heroTitle: "Alcohol detox & rehab in Costa Mesa", image: "/images/stock/stock-07.jpg" },
  { slug: "benzodiazepines", label: "Benzo Detox", heroTitle: "Benzodiazepine detox & rehab", image: "/images/stock/stock-09.jpg" },
  { slug: "cocaine", label: "Cocaine Detox", heroTitle: "Cocaine detox & rehab in Costa Mesa", image: "/images/stock/stock-04.jpg" },
  { slug: "fentanyl", label: "Fentanyl Detox", heroTitle: "Fentanyl detox & rehab in Costa Mesa", image: "/images/stock/stock-10.jpg" },
  { slug: "heroin", label: "Heroin Detox", heroTitle: "Heroin detox & rehab in Costa Mesa", image: "/images/stock/stock-06.jpg" },
  { slug: "meth", label: "Meth Detox", heroTitle: "Methamphetamine detox & rehab", image: "/images/stock/stock-12.jpg" },
  { slug: "xanax", label: "Xanax Detox", heroTitle: "Xanax detox & rehab in Costa Mesa", image: "/images/stock/stock-01.jpg" },
  { slug: "prescription-drugs", label: "Prescription Drug Detox", heroTitle: "Prescription drug detox & rehab", image: "/images/stock/stock-03.jpg" },
];

export const getSubstanceMeta = (slug: string) => substanceMeta.find((s) => s.slug === slug);
