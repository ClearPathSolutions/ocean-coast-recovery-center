import fs from "node:fs";
import path from "node:path";

export type ContentSection = { title: string; body: string[]; bullets?: string[] };
export type QAItem = { q: string; a: string };
export type ContentDoc = {
  slug: string;
  title: string;
  metaDescription?: string;
  heroSubtitle?: string;
  intro: string[];
  sections: ContentSection[];
  faqs?: QAItem[];
};

function loadDir(dir: string): ContentDoc[] {
  const full = path.join(process.cwd(), "content", dir);
  let files: string[] = [];
  try {
    files = fs.readdirSync(full).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }
  return files
    .map((f) => {
      try {
        return JSON.parse(fs.readFileSync(path.join(full, f), "utf-8")) as ContentDoc;
      } catch {
        return null;
      }
    })
    .filter((d): d is ContentDoc => !!d && !!d.title && Array.isArray(d.sections));
}

export function getSubstanceDocs() {
  return loadDir("substances");
}
export function getInsuranceDocs() {
  return loadDir("insurance");
}
export function getDoc(dir: "substances" | "insurance", slug: string) {
  return loadDir(dir).find((d) => d.slug === slug);
}
