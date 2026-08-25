// ============================================================================
// Ocean Coast Recovery Center — visit tracking & first-touch attribution
// ============================================================================
//
// Why this exists
// ---------------
// Both lead destinations used to read campaign data live from `location.search`
// at submit time. Land on an ad, read two pages, submit — and the lead arrives
// with the campaign gone, while still looking complete. Nothing surfaces the
// loss, so paid spend simply appears to convert at zero.
//
// Attribution is therefore captured on the FIRST pageview and read back at
// submit time. It lives in localStorage, not sessionStorage: opening a second
// tab is the same visit, and sessionStorage does not follow.
//
// The CTM visitor session id is deliberately NOT cached here. CallTrackingMetrics
// already keeps it in a 30-day first-party cookie and reconciles
// `__ctm.config.sid` against that cookie on load, so a copy of ours could only
// ever be staler than the source.
// ============================================================================

declare global {
  interface Window {
    __ctm?: { config?: { sid?: string; aid?: string | number } };
  }
}

/** First-touch attribution survives this long. Matches CTM's own cookie window. */
const TTL_MS = 30 * 24 * 60 * 60 * 1000;
/** Inactivity that ends a visit. Attribution outlives it; only grouping restarts. */
const IDLE_MS = 30 * 60 * 1000;
const STORE_KEY = "occ.attribution.v1";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
// gclid substitutes under iOS and Google consent mode. CTM account 264810 routes
// on all three, so a site that collects only gclid loses every click Google
// chose to report as wbraid/gbraid instead.
const CLICK_KEYS = ["gclid", "gbraid", "wbraid", "fbclid", "msclkid"] as const;
const CAMPAIGN_KEYS: readonly string[] = [...UTM_KEYS, ...CLICK_KEYS];

const MAX_VALUE_LEN = 300;
const MAX_URL_LEN = 1000;
/** Journey entries kept. Oldest are dropped first. */
const MAX_PAGES = 25;
/**
 * Byte ceiling for the serialised `session` block. The Clarion request is sent
 * with `keepalive`, which caps the WHOLE body at 64 KB — past that the browser
 * drops the request outright and the lead is silently lost. This leaves ample
 * headroom for the form answers.
 */
const MAX_SESSION_BYTES = 8000;

type Campaign = Record<string, string>;

/** One journey entry. Short keys: this is serialised into localStorage. */
type Page = { p: string; t: number };

type Store = {
  v: 1;
  firstTouchAt: number;
  lastSeenAt: number;
  visitId: string;
  visitStartedAt: number;
  landingPageUrl: string;
  referrer: string | null;
  campaign: Campaign;
  pageviews: number;
  pages: Page[];
};

export type Utm = {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  term: string | null;
  content: string | null;
};

export type SessionPage = { path: string; at: string };

/**
 * The visit behind a lead: how long it has been running and what was read.
 *
 * Note that `pages` carries real paths, and on this site a path states what
 * someone is seeking treatment for. This block attaches that to a named person
 * in the CRM. That is deliberate and was asked for — but it is the reason the
 * journey is bounded rather than unlimited, and dropping to a count alone is a
 * one-line change here if that trade is ever reconsidered.
 */
export type Session = {
  id: string | null;
  started_at: string | null;
  first_touch_at: string | null;
  last_seen_at: string | null;
  pageviews: number;
  pages: SessionPage[];
};

export type Attribution = {
  page_url: string;
  landing_page_url: string;
  referrer: string | null;
  utm: Utm | null;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  fbclid: string | null;
  msclkid: string | null;
  /**
   * CallTrackingMetrics' visitor session id — 24 hex characters, no dashes.
   * FLAT and TOP-LEVEL: nesting it is why Clarion's parser never finds it.
   * `null` when CTM is unavailable — never substitute another id (see
   * `visit_id` below, which is ours and is NOT interchangeable).
   */
  ctm_visitor_sid: string | null;
  /** Our own visit id. Diagnostics/dedup only. NOT a CTM id. */
  visit_id: string | null;
  visit_pageviews: number;
  session: Session;
};

const isBrowser = () => typeof window !== "undefined";

const clip = (v: string, max: number) => (v.length > max ? v.slice(0, max) : v);

function newVisitId(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch {}
  return `v-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function read(): Store | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Store;
    if (!s || s.v !== 1 || typeof s.firstTouchAt !== "number") return null;
    // Expired first touch. Treat as no attribution rather than stale attribution.
    if (Date.now() - s.firstTouchAt > TTL_MS) return null;
    return s;
  } catch {
    return null;
  }
}

function write(s: Store): void {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(s));
  } catch {
    // Private mode / storage disabled. Attribution degrades to live-URL only,
    // which is the behaviour we had before — never a thrown error mid-pageview.
  }
}

/** Campaign parameters present in the URL right now. */
function liveCampaign(): Campaign {
  const out: Campaign = {};
  if (!isBrowser()) return out;
  try {
    const q = new URLSearchParams(location.search);
    for (const k of CAMPAIGN_KEYS) {
      const v = q.get(k);
      if (v) out[k] = clip(v, MAX_VALUE_LEN);
    }
  } catch {}
  return out;
}

/** document.referrer, but only when it is genuinely external. */
function externalReferrer(): string | null {
  if (!isBrowser()) return null;
  try {
    const r = document.referrer || "";
    return r && r.indexOf(location.origin) !== 0 ? clip(r, MAX_URL_LEN) : null;
  } catch {
    return null;
  }
}

/**
 * Record a pageview. Must run on EVERY route change, not just first paint —
 * otherwise a client-side navigation away from the landing page is invisible
 * and the idle window never advances.
 */
export function recordPageview(): void {
  if (!isBrowser()) return;

  const now = Date.now();
  const live = liveCampaign();
  const freshClick = Object.keys(live).length > 0;
  let s = read();

  if (!s || freshClick) {
    // A fresh ad click always wins: that is a new campaign, not a continuation
    // of the old one. Without a click and without a store, this is the genuine
    // first touch (organic, direct or referral) and the campaign stays empty.
    s = {
      v: 1,
      firstTouchAt: now,
      lastSeenAt: now,
      visitId: newVisitId(),
      visitStartedAt: now,
      landingPageUrl: clip(location.href, MAX_URL_LEN),
      referrer: externalReferrer(),
      campaign: live,
      pageviews: 0,
      // A fresh campaign starts a fresh journey.
      pages: [],
    };
  } else if (now - s.lastSeenAt > IDLE_MS) {
    // New visit, same person, same first-touch campaign.
    s.visitId = newVisitId();
    s.visitStartedAt = now;
  }

  s.lastSeenAt = now;
  s.pageviews += 1;
  // `?? []` matters: stores written before the journey existed are still v1 and
  // must keep their first-touch data rather than being discarded.
  s.pages = [...(s.pages ?? []), { p: clip(location.pathname + location.search, MAX_VALUE_LEN), t: now }]
    .slice(-MAX_PAGES);
  write(s);
}

function buildSession(s: Store | null): Session {
  const iso = (n: number | undefined) => (typeof n === "number" ? new Date(n).toISOString() : null);
  const session: Session = {
    id: s?.visitId ?? null,
    started_at: iso(s?.visitStartedAt),
    first_touch_at: iso(s?.firstTouchAt),
    last_seen_at: iso(s?.lastSeenAt),
    pageviews: s?.pageviews ?? 0,
    // Capped here as well as on write. recordPageview is not the only thing that
    // can have produced this store — an older build, or another tab on a
    // different version — and the cap should hold regardless of what it reads.
    pages: (s?.pages ?? [])
      .slice(-MAX_PAGES)
      .map((e) => ({ path: e.p, at: new Date(e.t).toISOString() })),
  };
  // Shed the oldest entries until the block fits. Losing the start of a long
  // journey is a far better outcome than losing the lead to a dropped request.
  while (session.pages.length > 1 && JSON.stringify(session).length > MAX_SESSION_BYTES) {
    session.pages.shift();
  }
  return session;
}

/**
 * CallTrackingMetrics' visitor session id.
 *
 * Two sources, both CTM's own: the `__ctm.config.sid` global that `t.js`
 * installs, and the `__ctmid` first-party cookie it reconciles against. A real
 * CTM id is 24 hex characters with no dashes; anything dash-shaped is some
 * other system's UUID and must never be sent in its place.
 */
export function ctmSessionId(): string | null {
  if (!isBrowser()) return null;

  let sid: string | null = null;
  let vid: string | null = null;
  try {
    sid = window.__ctm?.config?.sid ?? null;
  } catch {}
  try {
    const m = document.cookie.match(/(?:^|;\s*)__ctmid=([^;]*)/);
    vid = m ? decodeURIComponent(m[1]) : null;
  } catch {}

  const CTM = /^[0-9a-f]{24}$/i;
  if (CTM.test(sid || "")) return sid;
  if (CTM.test(vid || "")) return vid;
  // Neither is CTM-shaped. Hand back whatever CTM itself exposed (the server
  // logs it and falls back to the cookie); never this site's own session id.
  return sid || vid || null;
}

/**
 * The attribution to attach to a lead. Safe to call during SSR — it returns an
 * empty shell rather than throwing.
 */
export function leadAttribution(): Attribution {
  const empty: Attribution = {
    page_url: "",
    landing_page_url: "",
    referrer: null,
    utm: null,
    gclid: null,
    gbraid: null,
    wbraid: null,
    fbclid: null,
    msclkid: null,
    ctm_visitor_sid: null,
    visit_id: null,
    visit_pageviews: 0,
    session: buildSession(null),
  };
  if (!isBrowser()) return empty;

  const s = read();
  const live = liveCampaign();
  // Same rule as recordPageview: a live click supersedes the stored campaign
  // wholesale, so a fresh source is never blended with a stale medium.
  const c: Campaign = Object.keys(live).length ? live : (s?.campaign ?? {});

  const utm: Utm = {
    source: c.utm_source ?? null,
    medium: c.utm_medium ?? null,
    campaign: c.utm_campaign ?? null,
    term: c.utm_term ?? null,
    content: c.utm_content ?? null,
  };
  const hasUtm = Object.values(utm).some(Boolean);

  return {
    page_url: clip(location.href, MAX_URL_LEN),
    landing_page_url: s?.landingPageUrl ?? clip(location.href, MAX_URL_LEN),
    referrer: s?.referrer ?? externalReferrer(),
    utm: hasUtm ? utm : null,
    // Google reports the click as wbraid/gbraid when gclid is unavailable;
    // downstream consumers read one field, so fold the fallback in here.
    gclid: c.gclid ?? c.wbraid ?? c.gbraid ?? null,
    gbraid: c.gbraid ?? null,
    wbraid: c.wbraid ?? null,
    fbclid: c.fbclid ?? null,
    msclkid: c.msclkid ?? null,
    ctm_visitor_sid: ctmSessionId(),
    visit_id: s?.visitId ?? null,
    visit_pageviews: s?.pageviews ?? 0,
    session: buildSession(s),
  };
}
