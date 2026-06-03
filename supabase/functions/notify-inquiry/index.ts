import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const WEBHOOK_SECRET = Deno.env.get("NOTIFY_INQUIRY_SECRET");
const TO_EMAIL = "info@rosenhofcountrylodge.co.za";

const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

serve(async (req) => {
  // Require a shared secret header so only our database webhook can trigger emails.
  if (!WEBHOOK_SECRET) {
    console.error("NOTIFY_INQUIRY_SECRET is not configured");
    return new Response("Server misconfigured", { status: 500 });
  }
  const provided =
    req.headers.get("x-webhook-secret") ??
    req.headers.get("x-supabase-signature") ??
    "";
  if (provided !== WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return new Response("Bad Request", { status: 400 });
  }
  const record = payload?.record ?? {};
  const { name, email, inquiry_type, check_in, check_out, guests, message } = record;

  const safeEmail = esc(email);
  const html = `
    <h2>New Inquiry — Rosenhof Exclusive Country Lodge</h2>
    <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
      <tr><td style="padding:8px;font-weight:bold;background:#f5f0e8">Name</td><td style="padding:8px">${esc(name)}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f5f0e8">Email</td><td style="padding:8px"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f5f0e8">Type</td><td style="padding:8px">${esc(inquiry_type)}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f5f0e8">Check-in</td><td style="padding:8px">${esc(check_in || "—")}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f5f0e8">Check-out</td><td style="padding:8px">${esc(check_out || "—")}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f5f0e8">Guests</td><td style="padding:8px">${esc(guests || "—")}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f5f0e8">Message</td><td style="padding:8px">${esc(message || "—")}</td></tr>
    </table>
    <p style="margin-top:16px;font-size:13px;color:#666">
      <a href="https://rosenhofcountrylodge.co.za/admin">View in Admin Panel →</a>
    </p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Rosenhof Inquiries <noreply@rosenhofcountrylodge.co.za>",
      to: [TO_EMAIL],
      subject: `New Inquiry from ${String(name ?? "guest").replace(/[\r\n]/g, " ").slice(0, 80)} — ${String(inquiry_type ?? "").slice(0, 40)}`,
      html,
    }),
  });

  const data = await res.json();
  console.log("Resend response:", res.status);
  return new Response(JSON.stringify(data), { status: res.ok ? 200 : res.status });
});
