import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { fitTitle } from "@/lib/site";

// Standard network SMS terms (legal-pages package, 2026-10-27). The approved
// wording is shared across every site; only facility facts differ.
export const metadata: Metadata = {
  title: fitTitle("SMS Terms"),
  description: "Terms for text-message communications from Ocean Coast Recovery Center: consent, frequency, cost, opt-out, and privacy.",
  robots: { index: true, follow: true },
};

export default function SmsTermsPage() {
  return (
    <>
      <PageHero
        title="SMS Terms"
        image="/images/facility/loft-overlook.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "SMS Terms" }]}
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x prose-content mx-auto max-w-3xl">
          <p>These terms describe how text-message communications work when you opt in to messages from Ocean Coast Recovery Center.</p>
          <p><em>Last updated: October 27, 2026.</em></p>

          <h2>Program description</h2>
          <p>By providing your mobile number and opting in, you agree to receive recurring informational and admissions-related text messages from Ocean Coast Recovery Center. Message frequency varies.</p>
          <h2>Consent is not a condition of treatment</h2>
          <p>Consent to receive SMS communications is not a condition of purchasing or receiving treatment or services.</p>

          <h2>Cost</h2>
          <p>Message and data rates may apply, depending on your carrier plan.</p>

          <h2>Opt-out</h2>
          <p suppressHydrationWarning>You can cancel at any time by replying STOP to any message. For help, reply HELP or contact us at <a href="tel:+19496490702">(949) 649-0702</a>.</p>
          <h2>Carriers</h2>
          <p>Carriers are not liable for delayed or undelivered messages.</p>

          <h2>Privacy</h2>
          <p>Mobile information is never shared or sold to third parties for marketing purposes. See our <Link href="/privacy-policy/">Privacy Policy</Link> for details.</p>
          <h2>If this is an emergency</h2>
          <p>Text messages are not monitored around the clock and are not for emergencies. If you are in crisis, call or text 988. In a medical emergency, call 911.</p>
        </div>
      </section>
    </>
  );
}
