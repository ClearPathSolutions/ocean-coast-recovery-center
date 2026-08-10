import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Ocean Coast Recovery Center collects, uses, and protects your information.",
  // V0042 cross-ref: this page previously served no robots meta at all, while
  // the rest of the site is index/follow. Portfolio-wide the same page type
  // carried four different treatments; "index, follow" is the majority and
  // matches every other page here. A privacy policy is a trust signal on a
  // YMYL site, so it should be indexable.
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        image="/images/facility/loft-overlook.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x prose-content mx-auto max-w-3xl">
          <p className="text-navy/60">Last updated: {new Date().getFullYear()}</p>
          <p>
            Ocean Coast Recovery Center (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is
            committed to protecting your privacy. This policy explains how we collect, use, and
            safeguard information when you visit our website or contact us.
          </p>
          <h2>Information We Collect</h2>
          <p>
            When you submit a form or request a callback, we may collect your name, phone number,
            email address, and any details you choose to share about your situation.
          </p>
          <h2>Third-Party Services on This Site</h2>
          <p>
            This website uses a small number of third-party services, each of which may receive
            limited information about your visit:
          </p>
          <ul>
            <li>
              <strong>Call tracking.</strong> The phone number shown on the site may be swapped for
              a tracking number so we can tell which pages lead to calls. This records the call and
              basic visit details such as the page you were on and your approximate location.
            </li>
            <li>
              <strong>Chat and form capture.</strong> Our chat widget and contact forms are handled
              by a third-party provider that processes the messages and contact details you submit.
            </li>
            <li>
              <strong>Website analytics.</strong> If enabled, we collect standard, non-identifying
              analytics such as pages visited and device type. We do not use analytics to identify
              you personally.
            </li>
          </ul>
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To respond to your inquiries and provide information about our programs.</li>
            <li>To verify insurance benefits at your request.</li>
            <li>To improve our website and services.</li>
          </ul>
          <p>
            Your information is kept strictly confidential. We do not sell your personal information.
            Communications about treatment are handled in accordance with applicable healthcare
            privacy standards.
          </p>
          <h2>Your Choices</h2>
          <p>
            You may request that we correct or delete your information at any time by contacting us at{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> or {site.phone}.
          </p>
          <h2>Contact Us</h2>
          <p>
            Questions about this policy? Reach us at {site.address.full}, {site.phone}, or{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
          <p className="text-sm text-navy/50">
            This page is provided for general informational purposes and does not constitute legal
            advice. Please consult a qualified professional to tailor a privacy policy to your
            specific compliance needs (including HIPAA where applicable).
          </p>
        </div>
      </section>
    </>
  );
}
