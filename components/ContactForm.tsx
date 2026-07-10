"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { Phone, CheckCircle } from "@/components/icons";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
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
      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-navy">
            First name
          </label>
          <input id="firstName" name="firstName" required className={input} placeholder="Jane" />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-navy">
            Last name
          </label>
          <input id="lastName" name="lastName" required className={input} placeholder="Doe" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" required className={input} placeholder="(000) 000-0000" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">
            Email
          </label>
          <input id="email" name="email" type="email" required className={input} placeholder="you@email.com" />
        </div>
      </div>
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
        <p className="mt-3 text-sm text-red-600">
          Something went wrong. Please call us at{" "}
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
        {status === "submitting" ? "Sending…" : "Request My Confidential Callback"}
      </button>
      <p className="mt-3 text-center text-xs text-navy/50">
        Your information is kept 100% confidential. By submitting, you agree to be contacted by
        Ocean Coast Recovery.
      </p>
    </form>
  );
}
