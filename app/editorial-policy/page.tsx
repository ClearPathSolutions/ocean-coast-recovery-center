import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import {
  editorial,
  editorialPolicyBody,
  editorialPolicyReady,
  editorialPolicyServed,
  EDITORIAL_POLICY_PATH,
  EDITORIAL_POLICY_URL,
  ORGANIZATION_ID,
} from "@/lib/editorial";

// Reads the package template from disk, so it must render at build time.
export const dynamic = "force-static";

const title = `Editorial Policy | ${editorial.facilityName}`;
const description = `How ${editorial.facilityName} researches, writes, clinically reviews and updates the health information on ${editorial.domain}.`;

export function generateMetadata(): Metadata {
  // Withheld build: the page's title and description stay out of the 404.
  if (!editorialPolicyServed) return {};
  return {
    // Absolute: the package specifies this exact title.
    title: { absolute: title },
    description,
    alternates: { canonical: EDITORIAL_POLICY_PATH },
    // Not yet signed off: reviewable on previews but never indexed.
    robots: editorialPolicyReady ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export default function EditorialPolicyPage() {
  if (!editorialPolicyServed) notFound();
  const html = editorialPolicyBody();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${EDITORIAL_POLICY_URL}#webpage`,
    url: EDITORIAL_POLICY_URL,
    name: "Editorial Policy",
    description,
    // The site emits no WebSite node, so the template's isPartOf has nothing
    // to reference and is omitted.
    about: { "@id": ORGANIZATION_ID },
    ...(editorial.lastReviewed ? { lastReviewed: editorial.lastReviewed } : {}),
    inLanguage: "en-US",
  };

  return (
    <>
      <PageHero
        title="Editorial Policy"
        image="/images/facility/loft-overlook.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Editorial Policy" }]}
      />
      <section className="bg-white py-16 sm:py-20">
        {/* suppressHydrationWarning: call tracking rewrites the phone link inside. */}
        <div
          className="container-x prose-content mx-auto max-w-3xl"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
