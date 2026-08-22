"use client";

import { useState } from "react";
import { site, clarion } from "@/lib/site";
import { leadAttribution } from "@/lib/session";
import { submitToClarion } from "@/lib/clarionForms";
import { Phone, CheckCircle } from "@/components/icons";

type Status = "idle" | "submitting" | "success" | "error";
type Variant = "contact" | "insurance";

export default function ContactForm({
  compact = false,
  variant = "contact",
}: {
  compact?: boolean;
  variant?: Variant;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const isInsurance = variant === "insurance";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    // Read once, so both destinations are told the same story about this visit.
    // Campaign data comes from the persisted first-touch store, not the current
    // URL — by the time someone fills this in, the URL that carried the ad click
    // is usually two navigations behind them.
    const attribution = leadAttribution();
    try {
      // Best-effort Clarion capture. Fire-and-forget (keepalive) rather than
      // awaited: it must never add latency to, or block, the real lead reaching
      // /api/lead below. Skipped for honeypot hits so bots do not reach the CRM
      // — the endpoint below already drops them.
      const isBot = typeof data.company === "string" && data.company.trim() !== "";
      if (!isBot) {
        void submitToClarion(clarion.formKeys[variant], { ...data, variant }, attribution);
      }

      const res = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Attribution is spread at the top level: `ctm_visitor_sid` in
        // particular must stay flat, since a nested copy is invisible to
        // everything downstream that looks for it.
        body: JSON.stringify({ ...data, ...attribution }),
      });
      if (!res.ok) {
        // The endpoint returns a human-readable reason when it cannot deliver
        // the lead (no channel configured, every channel failed, rate limited).
        // Show that rather than a generic failure.
        const reason = await res
          .json()
          .then((j: { error?: string }) => j?.error)
          .catch(() => undefined);
        throw new Error(reason || "Request failed");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-card">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ocean-50 text-ocean-600">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-2xl font-semibold text-navy">Thank you for reaching out.</h3>
        <p className="mt-2 text-navy/70">
          A caring admissions coordinator will contact you shortly — always confidentially.
          Prefer to talk right now?
        </p>
        <a href={site.phoneHref} className="btn-ocean mt-5">
          <Phone className="h-4 w-4" /> Call {site.phone}
        </a>
      </div>
    );
  }

  const input =
    "w-full rounded-xl border border-ocean-100 bg-white px-4 py-3 text-navy placeholder:text-navy/40 focus:border-ocean-400 focus:outline-none focus:ring-2 focus:ring-ocean-200";

  return (
    <form onSubmit={onSubmit} className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
      {/* Honeypot (CR-05). Hidden from users and from assistive tech; bots fill
          it in and the endpoint then silently drops the submission. Not
          `display:none`, which some bots detect and skip. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div className={compact ? "" : "sm:col-span-2"}>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy">
            Name
          </label>
          <input id="name" name="name" required autoComplete="name" className={input} placeholder="Jane Doe" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" className={input} placeholder="(000) 000-0000" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={input} placeholder="you@email.com" />
        </div>
      </div>

      {isInsurance && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="dob" className="mb-1.5 block text-sm font-medium text-navy">
              Date of birth
            </label>
            <input id="dob" name="dob" type="date" required autoComplete="bday" className={input} />
          </div>
          <div>
            <label htmlFor="insurer" className="mb-1.5 block text-sm font-medium text-navy">
              Insurance provider
            </label>
            <input id="insurer" name="insurer" required className={input} placeholder="Anthem, Aetna, Cigna…" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="who" className="mb-1.5 block text-sm font-medium text-navy">
              Who needs help?
            </label>
            <select id="who" name="who" className={input} defaultValue="Myself">
              <option value="Myself">Myself</option>
              <option value="A loved one">A loved one</option>
              <option value="A client / patient">A client / patient</option>
            </select>
          </div>
        </div>
      )}

      <div className="mt-4">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy">
          How can we help? <span className="text-navy/40">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={compact ? 3 : 4}
          className={input}
          placeholder="Tell us a little about your situation…"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {errorMsg || "Something went wrong."} Please call us at{" "}
          <a href={site.phoneHref} className="font-semibold underline">
            {site.phone}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary mt-5 w-full disabled:opacity-60"
      >
        {status === "submitting"
          ? "Sending…"
          : isInsurance
            ? "Verify My Benefits"
            : "Request My Confidential Callback"}
      </button>
      <p className="mt-3 text-center text-xs text-navy/50">
        Your information is kept 100% confidential. By submitting, you agree to be contacted by
        Ocean Coast Recovery.
      </p>
    </form>
  );
}
