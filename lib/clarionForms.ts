// ============================================================================
// Clarion form capture — direct submission
// ============================================================================
//
// Why this does not use window.ClarionForms.submit()
// --------------------------------------------------
// The vendor helper (forms-capture.v1.js) builds its own payload and reads
// `utm_*` and `gclid` straight out of `location.search` at submit time. Anyone
// who reads a second page before converting therefore reaches Clarion with a
// correct landing page and no campaign at all — a record that looks populated
// and is silently unattributed. It also never collects wbraid/gbraid, which is
// how Google reports a click under iOS and consent mode, and which CTM account
// 264810's own routing rules key on.
//
// So we build the request ourselves from the persisted first-touch store in
// lib/session.ts. The shape below is the vendor's exact contract, read off the
// published script (`s()` in forms-capture.v1.js) — `utm` is an object whose
// keys have no `utm_` prefix, and every absent value is null, not omitted.
//
// The vendor script stays loaded in app/layout.tsx: it reports the integration
// as installed and costs one cached request. It only auto-binds to
// `form[data-clarion-form]`, and this site's form deliberately carries no such
// attribute — adding one would submit every lead to Clarion twice, because the
// vendor does not check `defaultPrevented`.
// ============================================================================

import { clarion } from "@/lib/site";
import type { Attribution } from "@/lib/session";

/** Keys the vendor script itself sends. Anything else is an extension. */
const VENDOR_KEYS = [
  "site_key",
  "form_key",
  "data",
  "page_url",
  "landing_page_url",
  "referrer",
  "utm",
  "gclid",
  "ctm_visitor_sid",
  "user_agent",
] as const;

function endpoint(): string {
  return `${clarion.api.replace(/\/$/, "")}/forms/public/submit`;
}

function post(body: Record<string, unknown>): Promise<Response> {
  return fetch(endpoint(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    // Public, origin-pinned endpoint — it takes no cookies.
    credentials: "omit",
    // Survives the page being navigated away from mid-flight.
    keepalive: true,
  });
}

/**
 * Send a lead to Clarion. Best-effort: it resolves either way and never throws,
 * so a Clarion outage cannot stop the visitor's enquiry reaching /api/lead.
 */
export async function submitToClarion(
  formKey: string,
  data: Record<string, unknown>,
  attribution: Attribution
): Promise<void> {
  const body: Record<string, unknown> = {
    site_key: clarion.siteKey,
    form_key: formKey,
    data,
    page_url: attribution.page_url,
    landing_page_url: attribution.landing_page_url,
    referrer: attribution.referrer,
    utm: attribution.utm,
    // Already folded to gclid || wbraid || gbraid in lib/session.ts.
    gclid: attribution.gclid,
    // FLAT and TOP-LEVEL. Nested, Clarion's parser never finds it and the lead
    // attaches to no visit.
    ctm_visitor_sid: attribution.ctm_visitor_sid,
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",

    // Extensions beyond the vendor's own payload. Stripped on the retry below.
    gbraid: attribution.gbraid,
    wbraid: attribution.wbraid,
    fbclid: attribution.fbclid,
    msclkid: attribution.msclkid,
    visit_id: attribution.visit_id,
    visit_pageviews: attribution.visit_pageviews,
  };

  try {
    const res = await post(body);
    if (res.ok || res.status < 400 || res.status >= 500) return;

    // 4xx. The extra keys are ones Clarion was never asked to accept, so strict
    // validation would turn every lead into an error. Retry with the vendor's
    // exact contract: losing the enquiry to gain attribution is not a trade
    // worth making.
    const minimal: Record<string, unknown> = {};
    for (const k of VENDOR_KEYS) minimal[k] = body[k];
    console.warn(`[clarion] ${res.status} with extended payload — retrying vendor-only fields`);
    await post(minimal);
  } catch {
    // Network failure or CORS. The lead still reaches /api/lead.
  }
}
