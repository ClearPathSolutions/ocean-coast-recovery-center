import { NextResponse } from "next/server";

/**
 * Lead capture endpoint.
 *
 * Out of the box this validates the payload and returns success so the site
 * works immediately on Vercel. To actually DELIVER leads, set ONE of:
 *
 *   LEAD_WEBHOOK_URL   – any endpoint (Zapier / Make / your CRM) to POST JSON to
 *   RESEND_API_KEY     – + LEAD_TO_EMAIL to email leads via https://resend.com
 *
 * Add these in the Vercel dashboard → Project → Settings → Environment Variables.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { firstName, lastName, phone, email } = body as Record<string, string>;
  if (!firstName || !lastName || !phone || !email) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 422 });
  }

  const lead = { ...body, receivedAt: new Date().toISOString() };

  // 1) Forward to a webhook (Zapier/Make/CRM) if configured
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch (err) {
      console.error("Lead webhook failed:", err);
    }
  }

  // 2) Or email via Resend if configured
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_TO_EMAIL;
  if (resendKey && toEmail) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Ocean Coast Website <onboarding@resend.dev>",
          to: [toEmail],
          subject: `New admissions inquiry — ${firstName} ${lastName}`,
          text: Object.entries(lead)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n"),
        }),
      });
    } catch (err) {
      console.error("Resend email failed:", err);
    }
  }

  // Always log server-side so leads are recoverable from Vercel logs
  console.log("New lead:", lead);

  return NextResponse.json({ ok: true });
}
