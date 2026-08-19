import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/**
 * Lead capture endpoint.
 *
 * Delivery channels — configure at least one in Vercel → Settings → Environment
 * Variables. In production the endpoint refuses submissions when none is set,
 * rather than accepting a lead it cannot deliver:
 *
 *   LEAD_WEBHOOK_URL   – POST the lead as JSON to Zapier / Make / your CRM
 *   RESEND_API_KEY     – + LEAD_TO_EMAIL to email the lead via https://resend.com
 *   LEAD_FROM_EMAIL    – optional; sender for Resend. MUST be an address on a
 *                        domain you have verified with Resend. The default,
 *                        onboarding@resend.dev, is Resend's sandbox sender and
 *                        only ever delivers to the Resend account owner — with
 *                        any other recipient it accepts the call and drops the
 *                        mail, which reads as success.
 */

const MAX_FIELD_LEN = 2000;
const RATE_LIMIT_MAX = 5; // submissions per window, per IP
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_KEYS = 5000; // bound memory on a long-lived instance

/**
 * Best-effort in-memory rate limit. Serverless instances are ephemeral and not
 * shared, so this throttles a naive flood rather than a distributed one; put a
 * WAF or Vercel Firewall rule in front for anything stronger.
 */
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  if (hits.size > RATE_LIMIT_MAX_KEYS) hits.clear();
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/** Same-origin check. Absent Origin/Referer (curl, some privacy tools) is allowed. */
function originAllowed(req: Request): boolean {
  const origin = req.headers.get("origin") ?? req.headers.get("referer");
  if (!origin) return true;
  let host: string;
  try {
    host = new URL(origin).host;
  } catch {
    return false;
  }
  const selfHost = req.headers.get("host");
  if (selfHost && host === selfHost) return true;
  return host === new URL(site.url).host;
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v);
const isPhone = (v: string) => (v.match(/\d/g) ?? []).length >= 7;

type Delivery = { channel: string; ok: boolean; detail?: string };

export async function POST(req: Request) {
  // Every early return below is deliberately vague: a lead form should not
  // report back which specific check rejected a caller.
  if (!originAllowed(req)) {
    return NextResponse.json({ ok: false, error: "Rejected" }, { status: 403 });
  }
  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please call us." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: a real browser leaves this hidden field empty. Answer 200 so the
  // bot records a success and does not retry with the field removed.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const name = str(body.name);
  const phone = str(body.phone);
  const email = str(body.email);
  const message = str(body.message);

  if (!name || !phone || !email) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 422 });
  }
  if (!isEmail(email) || !isPhone(phone)) {
    return NextResponse.json(
      { ok: false, error: "Please check your email address and phone number." },
      { status: 422 }
    );
  }
  if ([name, phone, email, message].some((v) => v.length > MAX_FIELD_LEN)) {
    return NextResponse.json({ ok: false, error: "Submission too long" }, { status: 413 });
  }

  // Correlation id. This — not the payload — is what goes in the logs (CR-06).
  const leadId = crypto.randomUUID();
  const lead = {
    leadId,
    name,
    phone,
    email,
    message,
    receivedAt: new Date().toISOString(),
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_TO_EMAIL;
  const fromEmail = process.env.LEAD_FROM_EMAIL ?? "Ocean Coast Website <onboarding@resend.dev>";

  const channels: Promise<Delivery>[] = [];

  if (webhook) {
    channels.push(
      fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      })
        // fetch only rejects on network failure, so the status has to be
        // checked explicitly or a 4xx/5xx from the CRM counts as delivered.
        .then((res) => ({
          channel: "webhook",
          ok: res.ok,
          detail: res.ok ? undefined : `HTTP ${res.status}`,
        }))
        .catch((err: unknown) => ({
          channel: "webhook",
          ok: false,
          detail: err instanceof Error ? err.message : "network error",
        }))
    );
  }

  if (resendKey && toEmail) {
    channels.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: email,
          subject: `New admissions inquiry — ${name}`,
          text: [
            `Lead ID: ${leadId}`,
            `Name:    ${name}`,
            `Phone:   ${phone}`,
            `Email:   ${email}`,
            `Message: ${message || "(none)"}`,
            `Received: ${lead.receivedAt}`,
          ].join("\n"),
        }),
      })
        .then((res) => ({
          channel: "resend",
          ok: res.ok,
          detail: res.ok ? undefined : `HTTP ${res.status}`,
        }))
        .catch((err: unknown) => ({
          channel: "resend",
          ok: false,
          detail: err instanceof Error ? err.message : "network error",
        }))
    );
  }

  // No channel configured. Accepting here would put the lead only into logs
  // that expire — the CR-04 failure mode. Fail loudly instead so the form shows
  // its "call us" fallback.
  if (channels.length === 0) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        `[lead ${leadId}] REJECTED — no delivery channel configured. ` +
          `Set LEAD_WEBHOOK_URL, or RESEND_API_KEY + LEAD_TO_EMAIL.`
      );
      return NextResponse.json(
        { ok: false, error: "We could not submit your request. Please call us." },
        { status: 503 }
      );
    }
    console.warn(`[lead ${leadId}] accepted with no delivery channel (development only)`);
    return NextResponse.json({ ok: true, leadId });
  }

  const results = await Promise.all(channels);
  const delivered = results.filter((r) => r.ok);

  // Status only — never the payload (CR-06).
  console.log(
    `[lead ${leadId}] ${delivered.length}/${results.length} delivered: ` +
      results.map((r) => `${r.channel}=${r.ok ? "ok" : `FAILED(${r.detail})`}`).join(" ")
  );

  if (delivered.length === 0) {
    return NextResponse.json(
      { ok: false, error: "We could not submit your request. Please call us." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, leadId });
}
