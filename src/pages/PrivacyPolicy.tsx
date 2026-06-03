import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background py-16 px-4">
    <Helmet>
      <title>Privacy Policy — Rosenhof Country Lodge</title>
      <meta name="description" content="How Rosenhof Exclusive Country Lodge collects, uses, and protects your personal information under POPIA." />
      <link rel="canonical" href="https://rosenhofcountrylodge.co.za/privacy" />
      <meta property="og:title" content="Privacy Policy — Rosenhof Country Lodge" />
      <meta property="og:description" content="How we collect, use, and protect your personal information under POPIA." />
      <meta property="og:url" content="https://rosenhofcountrylodge.co.za/privacy" />
    </Helmet>
    <div className="max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Home
      </Link>
      <h1 className="font-display text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}</p>

      <div className="prose prose-sm max-w-none space-y-6 font-body text-foreground/80 leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">1. Introduction</h2>
          <p>Rosenhof Exclusive Country Lodge ("we", "us", "our") is committed to protecting your personal information in accordance with the Protection of Personal Information Act 4 of 2013 (POPIA). This policy explains how we collect, use, and protect your data.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">2. Information We Collect</h2>
          <p>We collect personal information you voluntarily provide when making a booking inquiry, including:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Full name and email address</li>
            <li>Preferred check-in and check-out dates</li>
            <li>Number of guests</li>
            <li>Special requests or messages</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">3. How We Use Your Information</h2>
          <p>Your information is used solely to:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Respond to your booking inquiry</li>
            <li>Confirm reservations and communicate stay details</li>
            <li>Improve our services</li>
          </ul>
          <p className="mt-2">We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">4. Data Storage & Security</h2>
          <p>Your data is stored securely using Supabase (hosted on AWS infrastructure). We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, loss, or destruction.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">5. Your Rights (POPIA)</h2>
          <p>Under POPIA, you have the right to:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Object to the processing of your personal information</li>
          </ul>
          <p className="mt-2">To exercise any of these rights, contact us at <a href="mailto:info@rosenhofcountrylodge.co.za" className="text-gold hover:underline">info@rosenhofcountrylodge.co.za</a>.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">6. Cookies</h2>
          <p>This website uses minimal cookies necessary for functionality (session management). We do not use tracking or advertising cookies.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">7. Contact</h2>
          <p>For any privacy-related queries, contact our Information Officer at <a href="mailto:info@rosenhofcountrylodge.co.za" className="text-gold hover:underline">info@rosenhofcountrylodge.co.za</a> or call <a href="tel:+27828288381" className="text-gold hover:underline">+27 82 828 8381</a>.</p>
        </section>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;
