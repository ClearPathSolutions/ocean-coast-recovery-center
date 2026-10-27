import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site, fitTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: fitTitle("Privacy Policy"),
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
            <li>
              <strong>Referral source.</strong> Your browser stores, for up to 30 days, how you
              first arrived at this site — the page you landed on, the site that referred you, and
              any advertising campaign tags in the link you followed. If you later submit a form,
              that is sent with it so we can tell which of our listings and adverts help people
              find care. It contains no health information and is not used to identify you.
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
          <p suppressHydrationWarning>
            You may request that we correct or delete your information at any time by contacting us at{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> or {site.phone}.
          </p>
          <h2>Contact Us</h2>
          <p suppressHydrationWarning>
            Questions about this policy? Reach us at {site.address.full}, {site.phone}, or{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
          <h2 id="notice-of-privacy-practices">Notice of Privacy Practices</h2>
          <p className="text-navy/60">Effective date: October 27, 2026</p>
          <p>
            <strong>
              This notice describes how medical information about you may be used and disclosed
              and how you can get access to this information. Please review it carefully.
            </strong>
          </p>
          <p>
            {site.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is required by
            law to maintain the privacy and security of your protected health information
            (&ldquo;PHI&rdquo;), to give you this notice of our legal duties and privacy practices,
            and to follow the terms of the notice currently in effect. This notice applies to
            all records of your care that we create or maintain.
          </p>

          <h2>Your Rights</h2>
          <p>When it comes to your health information, you have certain rights.</p>
          <ul>
            <li>
              <strong>Get a copy of your medical record.</strong> You can ask to see or get an
              electronic or paper copy of your medical record and other health information we
              have about you. We will provide a copy or a summary, usually within 30 days of your
              request. We may charge a reasonable, cost-based fee.
            </li>
            <li>
              <strong>Ask us to correct your medical record.</strong> You can ask us to correct
              health information about you that you think is incorrect or incomplete. We may say
              &ldquo;no&rdquo; to your request, but we will tell you why in writing within 60 days.
            </li>
            <li>
              <strong>Request confidential communications.</strong> You can ask us to contact you
              in a specific way (for example, home or office phone) or to send mail to a different
              address. We will say &ldquo;yes&rdquo; to all reasonable requests.
            </li>
            <li>
              <strong>Ask us to limit what we use or share.</strong> You can ask us not to use or
              share certain health information for treatment, payment, or our operations. We are
              not required to agree, and we may say &ldquo;no&rdquo; if it would affect your care.
              If you pay for a service or item out of pocket in full, you can ask us not to share
              that information for the purpose of payment or our operations with your health
              insurer. We will say &ldquo;yes&rdquo; unless a law requires us to share it.
            </li>
            <li>
              <strong>Get a list of those with whom we have shared information.</strong> You can
              ask for an accounting of the times we have shared your health information for six
              years prior to the date you ask, who we shared it with, and why. We will include all
              disclosures except those about treatment, payment, and health care operations, and
              certain other disclosures (such as any you asked us to make). We will provide one
              accounting a year for free but will charge a reasonable, cost-based fee if you ask
              for another within 12 months.
            </li>
            <li>
              <strong>Get a copy of this privacy notice.</strong> You can ask for a paper copy of
              this notice at any time, even if you have agreed to receive it electronically.
            </li>
            <li>
              <strong>Choose someone to act for you.</strong> If you have given someone medical
              power of attorney or if someone is your legal guardian, that person can exercise
              your rights and make choices about your health information. We will confirm the
              person has this authority before we take any action.
            </li>
            <li>
              <strong>File a complaint if you feel your rights are violated.</strong> You can
              complain to us using the contact information at the bottom of this page. You can
              also file a complaint with the U.S. Department of Health and Human Services Office
              for Civil Rights by sending a letter to 200 Independence Avenue, S.W., Washington,
              D.C. 20201, calling 1-800-368-1019, or visiting{" "}
              <a href="https://www.hhs.gov/ocr/privacy/hipaa/complaints/" target="_blank" rel="noopener noreferrer">
                www.hhs.gov/ocr/privacy/hipaa/complaints/
              </a>
              . <strong>We will not retaliate against you for filing a complaint.</strong>
            </li>
          </ul>

          <h2>Your Choices</h2>
          <p>
            For certain health information, you can tell us your choices about what we share. If
            you have a clear preference for how we share your information in the situations
            described below, talk to us. Tell us what you want us to do, and we will follow your
            instructions.
          </p>
          <p>In these cases, you have both the right and choice to tell us to:</p>
          <ul>
            <li>Share information with your family, close friends, or others involved in your care.</li>
            <li>Share information in a disaster relief situation.</li>
          </ul>
          <p>
            If you are not able to tell us your preference, for example if you are unconscious, we
            may go ahead and share your information if we believe it is in your best interest. We
            may also share your information when needed to lessen a serious and imminent threat to
            health or safety.
          </p>
          <p>In these cases, we never share your information unless you give us written permission:</p>
          <ul>
            <li>Marketing purposes.</li>
            <li>Sale of your information.</li>
            <li>Most sharing of psychotherapy notes.</li>
          </ul>
          <p>
            We do not use your health information for fundraising. If that ever changes, we will
            tell you and you will be able to opt out.
          </p>

          <h2>Substance Use Disorder Treatment Records</h2>
          <p>
            Because we provide substance use disorder treatment, records that identify you as
            seeking or receiving such treatment are also protected by the federal confidentiality
            regulations at 42 C.F.R. Part 2. In general, we may not tell anyone outside our program
            that you attend the program, or disclose any information identifying you as having a
            substance use disorder, unless you consent in writing, the disclosure is allowed by a
            court order, or the disclosure is made to medical personnel in a medical emergency, to
            qualified personnel for research, audit, or program evaluation, or as otherwise
            permitted by Part 2. Violation of these federal regulations is a crime, and suspected
            violations may be reported to the appropriate authorities. Federal law and regulations
            do not protect any information about a crime committed by a patient at the program or
            against any person who works for the program, or about any threat to commit such a
            crime, and do not protect information about suspected child abuse or neglect from being
            reported under state law.
          </p>

          <h2>Our Uses and Disclosures</h2>
          <p>We typically use or share your health information in the following ways.</p>
          <ul>
            <li>
              <strong>Treat you.</strong> We can use your health information and share it with
              other professionals who are treating you. <em>Example:</em> a physician treating you
              for a medical condition asks our clinical team about your medications.
            </li>
            <li>
              <strong>Run our organization.</strong> We can use and share your health information
              to run our practice, improve your care, and contact you when necessary.{" "}
              <em>Example:</em> we use health information about you to manage your treatment and
              services.
            </li>
            <li>
              <strong>Bill for your services.</strong> We can use and share your health
              information to bill and get payment from health plans or other entities.{" "}
              <em>Example:</em> we give information about you to your health insurance plan so it
              will pay for your services.
            </li>
          </ul>
          <p>
            We are also allowed or required to share your information in other ways, usually in
            ways that contribute to the public good, such as public health and research. We have
            to meet many conditions in the law before we can share your information for these
            purposes. Where 42 C.F.R. Part 2 applies, we will only make these disclosures as that
            regulation permits.
          </p>
          <ul>
            <li>
              <strong>Help with public health and safety issues.</strong> Preventing disease,
              helping with product recalls, reporting adverse reactions to medications, reporting
              suspected abuse, neglect, or domestic violence, and preventing or reducing a serious
              threat to anyone&rsquo;s health or safety.
            </li>
            <li>
              <strong>Do research.</strong> We can use or share your information for health
              research, subject to the conditions required by law.
            </li>
            <li>
              <strong>Comply with the law.</strong> We will share information about you if state
              or federal laws require it, including with the Department of Health and Human
              Services if it wants to see that we are complying with federal privacy law.
            </li>
            <li>
              <strong>Respond to organ and tissue donation requests</strong> and{" "}
              <strong>work with a medical examiner or funeral director</strong> when required.
            </li>
            <li>
              <strong>Address workers&rsquo; compensation, law enforcement, and other government
              requests.</strong> For workers&rsquo; compensation claims, for law enforcement
              purposes or with a law enforcement official, with health oversight agencies for
              activities authorized by law, and for special government functions such as military,
              national security, and presidential protective services.
            </li>
            <li>
              <strong>Respond to lawsuits and legal actions.</strong> In response to a court or
              administrative order, or in response to a subpoena, as permitted by law.
            </li>
          </ul>

          <h2>Our Responsibilities</h2>
          <ul>
            <li>
              We are required by law to maintain the privacy and security of your protected health
              information.
            </li>
            <li>
              We will let you know promptly if a breach occurs that may have compromised the
              privacy or security of your information.
            </li>
            <li>
              We must follow the duties and privacy practices described in this notice and give you
              a copy of it.
            </li>
            <li>
              We will not use or share your information other than as described here unless you
              tell us we can in writing. If you tell us we can, you may change your mind at any
              time. Let us know in writing if you change your mind.
            </li>
          </ul>
          <p>
            For more information, see{" "}
            <a
              href="https://www.hhs.gov/hipaa/for-individuals/notice-privacy-practices/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.hhs.gov/hipaa/for-individuals/notice-privacy-practices
            </a>
            .
          </p>

          <h2>State Law</h2>
          <p>
            California law, including the Confidentiality of Medical Information Act, may give you
            additional protections for your medical information and may further restrict how we
            use or disclose information about mental health and substance use disorder treatment.
            Where state law is stricter than federal law, we follow the stricter requirement.
          </p>

          <h2>Changes to the Terms of This Notice</h2>
          <p>
            We can change the terms of this notice, and the changes will apply to all information
            we have about you. The new notice will be available upon request, at our facility, and
            on our website.
          </p>

          <h2>Contact Our Privacy Officer</h2>
          <p suppressHydrationWarning>
            To exercise any of the rights above, to ask questions about this notice, or to file a
            complaint, contact our Privacy Officer at:
          </p>
          <p suppressHydrationWarning>
            {site.name}
            <br />
            Attn: Privacy Officer
            <br />
            {site.address.full}
            <br />
            Phone: <a href={site.phoneHref}>{site.phone}</a>
            <br />
            Email: <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </section>
    </>
  );
}
