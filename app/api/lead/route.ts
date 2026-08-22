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

const MAX_URL_LEN = 1000;
const MAX_ATTR_LEN = 300;

/** A real CallTrackingMetrics session id: 24 hex characters, no dashes. */
const CTM_ID = /^[0-9a-f]{24}$/i;

/**
 * The CTM visitor session id for this lead.
 *
 * Prefers what the browser sent, and falls back to the `__ctmid` first-party
 * cookie that rides along on this very request. That fallback is the point: a
 * client-side regression can otherwise un-attribute every lead silently, since
 * the submission still succeeds and the lead still arrives.
 *
 * A UUID here means some other system's session id got substituted for CTM's.
 * `null` is the correct answer when CTM's id is genuinely unavailable.
 */
function ctmVisitorSid(body: Record<string, unknown>, req: Request): string | null {
  const fromClient = typeof body.ctm_visitor_sid === "string" ? body.ctm_visitor_sid : null;
  if (fromClient && CTM_ID.test(fromClient)) return fromClient;

  const raw = req.headers.get("cookie")?.match(/(?:^|;\s*)__ctmid=([^;]*)/)?.[1];
  const fromCookie = raw ? decodeURIComponent(raw) : null;
  if (fromCookie && CTM_ID.test(fromCookie)) {
    if (fromClient) console.warn("[lead] non-CTM sid from browser; using __ctmid cookie");
    return fromCookie;
  }
  if (fromClient) {
    console.warn("[lead] sid not CTM-shaped and no cookie — no visit will attach");
    return fromClient;
  }
  console.warn("[lead] no CTM session id — t.js likely blocked");
  return null;
}

/**
 * Rebuild the attribution block from an explicit allow-list.
 *
 * This endpoint is public and unauthenticated, and the object arrives shaped
 * entirely by the client — so nothing is passed through. Every key is known,
 * every value is a bounded string, and `__proto__` and friends cannot survive
 * a rebuild like this.
 */
function attributionFrom(body: Record<string, unknown>) {
  const s = (v: unknown, max = MAX_ATTR_LEN) =>
    typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;

  const raw = body.utm;
  const utm =
    raw && typeof raw === "object" && !Array.isArray(raw)
      ? {
          source: s((raw as Record<string, unknown>).source),
          medium: s((raw as Record<string, unknown>).medium),
          campaign: s((raw as Record<string, unknown>).campaign),
          term: s((raw as Record<string, unknown>).term),
          content: s((raw as Record<string, unknown>).content),
        }
      : null;

  const pageviews = body.visit_pageviews;

  return {
    page_url: s(body.page_url, MAX_URL_LEN),
    // The entry page, campaign and all — not the page the form sits on.
    landing_page_url: s(body.landing_page_url, MAX_URL_LEN),
    referrer: s(body.referrer, MAX_URL_LEN),
    utm: utm && Object.values(utm).some(Boolean) ? utm : null,
    gclid: s(body.gclid),
    gbraid: s(body.gbraid),
    wbraid: s(body.wbraid),
    fbclid: s(body.fbclid),
    msclkid: s(body.msclkid),
    visit_id: s(body.visit_id),
    visit_pageviews:
      typeof pageviews === "number" && Number.isFinite(pageviews)
        ? Math.max(0, Math.min(9999, Math.trunc(pageviews)))
        : 0,
  };
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
  // Insurance-variant answers. Absent on the contact variant, but when present
  // they are the substance of the enquiry — an insurance verification without
  // the carrier or date of birth cannot actually be verified. These reached
  // Clarion and no other channel.
  const dob = str(body.dob);
  const insurer = str(body.insurer);
  const who = str(body.who);

  if (!name || !phone || !email) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 422 });
  }
  if (!isEmail(email) || !isPhone(phone)) {
    return NextResponse.json(
      { ok: false, error: "Please check your email address and phone number." },
      { status: 422 }
    );
  }
  if ([name, phone, email, message, dob, insurer, who].some((v) => v.length > MAX_FIELD_LEN)) {
    return NextResponse.json({ ok: false, error: "Submission too long" }, { status: 413 });
  }

  // Correlation id. This — not the payload — is what goes in the logs (CR-06).
  const leadId = crypto.randomUUID();
  const attribution = attributionFrom(body);
  const lead = {
    leadId,
    name,
    phone,
    email,
    message,
    dob,
    insurer,
    who,
    receivedAt: new Date().toISOString(),
    ...attribution,
    // FLAT and TOP-LEVEL, deliberately. Nested, every downstream consumer that
    // looks for it comes up empty and the lead attaches to no visit.
    ctm_visitor_sid: ctmVisitorSid(body, req),
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
          subject: insurer
            ? `Insurance verification — ${name} (${insurer})`
            : `New admissions inquiry — ${name}`,
          text: [
            `Lead ID: ${leadId}`,
            `Name:    ${name}`,
            `Phone:   ${phone}`,
            `Email:   ${email}`,
            ...(insurer ? [`Insurer: ${insurer}`] : []),
            ...(dob ? [`DOB:     ${dob}`] : []),
            ...(who ? [`For:     ${who}`] : []),
            `Message: ${message || "(none)"}`,
            `Received: ${lead.receivedAt}`,
            ``,
            `-- Attribution --`,
            `Campaign: ${
              lead.utm
                ? [lead.utm.source, lead.utm.medium, lead.utm.campaign]
                    .filter(Boolean)
                    .join(" / ")
                : "(none — organic, direct or referral)"
            }`,
            `Click ID: ${lead.gclid || "(none)"}`,
            `Landing:  ${lead.landing_page_url || "(unknown)"}`,
            `Referrer: ${lead.referrer || "(none)"}`,
            `Submitted from: ${lead.page_url || "(unknown)"}`,
            `Pages read: ${lead.visit_pageviews || "(unknown)"}`,
            `CTM visit: ${lead.ctm_visitor_sid || "(none — not attached to a call session)"}`,
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

  // Status only — never the payload (CR-06). `page_url` in particular is
  // excluded on purpose: on this site a path discloses what someone is seeking
  // treatment for, and these logs are not the place for that.
  console.log(
    `[lead ${leadId}] ${delivered.length}/${results.length} delivered: ` +
      results.map((r) => `${r.channel}=${r.ok ? "ok" : `FAILED(${r.detail})`}`).join(" ") +
      ` | ctm=${lead.ctm_visitor_sid ? "ok" : "MISSING"}` +
      ` campaign=${lead.utm?.source ?? (lead.gclid ? "paid-click" : "none")}`
  );

  if (delivered.length === 0) {
    return NextResponse.json(
      { ok: false, error: "We could not submit your request. Please call us." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, leadId });
}
