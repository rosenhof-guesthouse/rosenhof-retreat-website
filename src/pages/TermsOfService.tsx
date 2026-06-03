import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

const TermsOfService = () => (
  <div className="min-h-screen bg-background py-16 px-4">
    <Helmet>
      <title>Terms of Service — Rosenhof Country Lodge</title>
      <meta name="description" content="Terms governing bookings, pricing, cancellations, and guest responsibilities at Rosenhof Exclusive Country Lodge." />
      <link rel="canonical" href="https://rosenhofcountrylodge.co.za/terms" />
      <meta property="og:title" content="Terms of Service — Rosenhof Country Lodge" />
      <meta property="og:description" content="Booking, pricing, and cancellation terms for Rosenhof Exclusive Country Lodge." />
      <meta property="og:url" content="https://rosenhofcountrylodge.co.za/terms" />
    </Helmet>
    <div className="max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Home
      </Link>
      <h1 className="font-display text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}</p>

      <div className="prose prose-sm max-w-none space-y-6 font-body text-foreground/80 leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">1. Acceptance of Terms</h2>
          <p>By accessing and using the Rosenhof Exclusive Country Lodge website and submitting a booking inquiry, you agree to be bound by these Terms of Service.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">2. Booking Inquiries</h2>
          <p>Submitting an inquiry form does not constitute a confirmed booking. A booking is only confirmed upon receipt of written confirmation from Rosenhof and payment of the required deposit.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">3. Pricing</h2>
          <p>All prices displayed are approximate and subject to change based on dates, availability, and seasonal rates. Final pricing will be confirmed at the time of booking. Prices are quoted in South African Rand (ZAR) and include VAT where applicable.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">4. Cancellation Policy</h2>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Cancellations made 14+ days before check-in: full deposit refund</li>
            <li>Cancellations made 7–13 days before check-in: 50% deposit refund</li>
            <li>Cancellations made less than 7 days before check-in: no refund</li>
          </ul>
          <p className="mt-2">All cancellations must be submitted in writing to <a href="mailto:info@rosenhofcountrylodge.co.za" className="text-gold hover:underline">info@rosenhofcountrylodge.co.za</a>.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">5. Guest Responsibilities</h2>
          <p>Guests are responsible for any damage caused to the property during their stay. Rosenhof reserves the right to charge for damages beyond normal wear and tear. Guests must comply with all house rules provided at check-in.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">6. Pet Policy</h2>
          <p>Rosenhof is proudly pet-friendly. Pets are welcome subject to prior arrangement and applicable pet fees. Owners are fully responsible for their pets at all times.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">7. Limitation of Liability</h2>
          <p>Rosenhof Exclusive Country Lodge shall not be liable for any indirect, incidental, or consequential damages arising from your stay or use of this website. Our total liability shall not exceed the amount paid for your booking.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">8. Governing Law</h2>
          <p>These terms are governed by the laws of the Republic of South Africa. Any disputes shall be subject to the jurisdiction of the South African courts.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">9. Contact</h2>
          <p>For any queries regarding these terms, contact us at <a href="mailto:info@rosenhofcountrylodge.co.za" className="text-gold hover:underline">info@rosenhofcountrylodge.co.za</a>.</p>
        </section>
      </div>
    </div>
  </div>
);

export default TermsOfService;
