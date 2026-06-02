import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const TO_EMAIL = "info@rosenhofcountrylodge.co.za";

serve(async (req) => {
  const { record } = await req.json();

  const { name, email, inquiry_type, check_in, check_out, guests, message } = record;

  const html = `
    <h2>New Inquiry — Rosenhof Exclusive Country Lodge</h2>
    <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
      <tr><td style="padding:8px;font-weight:bold;background:#f5f0e8">Name</td><td style="padding:8px">${name}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f5f0e8">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f5f0e8">Type</td><td style="padding:8px">${inquiry_type}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f5f0e8">Check-in</td><td style="padding:8px">${check_in || "—"}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f5f0e8">Check-out</td><td style="padding:8px">${check_out || "—"}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f5f0e8">Guests</td><td style="padding:8px">${guests || "—"}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;background:#f5f0e8">Message</td><td style="padding:8px">${message || "—"}</td></tr>
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
      subject: `New Inquiry from ${name} — ${inquiry_type}`,
      html,
    }),
  });

  const data = await res.json();
  console.log("Resend response:", res.status, JSON.stringify(data));
  return new Response(JSON.stringify(data), { status: res.ok ? 200 : res.status });
});
