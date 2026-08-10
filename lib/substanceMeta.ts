// Clean display metadata for the substance detox pages.
// No `image`: per IMG-07 these heroes ship imageless rather than carry stock
// photography. The approved photo set has no frame that honestly represents
// substance-specific detox, and the audit asked for removal, not substitution.
// Original note on titles: (the scraped titles carry
// legacy "Huntington Beach" SEO wording; we present clean titles + keep the real body).
export type SubstanceMeta = { slug: string; label: string; heroTitle: string };

export const substanceMeta: SubstanceMeta[] = [
  { slug: "alcohol", label: "Alcohol Detox", heroTitle: "Alcohol detox & rehab in Costa Mesa" },
  { slug: "benzodiazepines", label: "Benzo Detox", heroTitle: "Benzodiazepine detox & rehab" },
  { slug: "cocaine", label: "Cocaine Detox", heroTitle: "Cocaine detox & rehab in Costa Mesa" },
  { slug: "fentanyl", label: "Fentanyl Detox", heroTitle: "Fentanyl detox & rehab in Costa Mesa" },
  { slug: "heroin", label: "Heroin Detox", heroTitle: "Heroin detox & rehab in Costa Mesa" },
  { slug: "meth", label: "Meth Detox", heroTitle: "Methamphetamine detox & rehab" },
  { slug: "xanax", label: "Xanax Detox", heroTitle: "Xanax detox & rehab in Costa Mesa" },
  { slug: "prescription-drugs", label: "Prescription Drug Detox", heroTitle: "Prescription drug detox & rehab" },
];

export const getSubstanceMeta = (slug: string) => substanceMeta.find((s) => s.slug === slug);

/**
 * Resolve a free-text substance label to its detox page, or null when there
 * isn't one. Used to turn the plain-text substance lists on the homepage and
 * the population pages into internal links (VIS-1623 / VIS-1641) without
 * hand-maintaining a second mapping at each call site.
 */
const LABEL_TO_SLUG: Record<string, string> = {
  alcohol: "alcohol",
  benzodiazepines: "benzodiazepines",
  benzos: "benzodiazepines",
  cocaine: "cocaine",
  fentanyl: "fentanyl",
  heroin: "heroin",
  meth: "meth",
  methamphetamine: "meth",
  amphetamines: "meth",
  xanax: "xanax",
  opioids: "heroin",
  "prescription drugs": "prescription-drugs",
  "prescription medications": "prescription-drugs",
  "prescription medication": "prescription-drugs",
};

export function substanceHref(label: string): string | null {
  const slug = LABEL_TO_SLUG[label.trim().toLowerCase()];
  return slug ? `/treatment/detox/${slug}` : null;
}
