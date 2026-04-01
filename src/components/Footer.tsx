import { MapPin, Phone, Mail, PawPrint } from "lucide-react";

const Footer = () => (
  <footer id="contact" className="bg-forest text-cream py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-display text-2xl font-bold text-cream mb-4">Rosenhof</h3>
          <p className="text-cream/70 font-body text-sm leading-relaxed mb-4">
            Exclusive Country Lodge
          </p>
          <div className="flex items-center gap-2 text-cream/70 text-sm mb-2">
            <PawPrint size={16} className="text-gold" />
            <span>Proudly Pet-Friendly — Inquire for details.</span>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-cream mb-4">Contact</h4>
          <div className="space-y-3 text-sm text-cream/70 font-body">
            <div className="flex items-start gap-2">
              <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
              <span>18 Market St, Paul Roux, 9800</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-gold" />
              <a href="tel:+27000000000" className="hover:text-gold transition-colors">+27 (0) 00 000 0000</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-gold" />
              <a href="mailto:info@rosenhof.co.za" className="hover:text-gold transition-colors">info@rosenhof.co.za</a>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-cream mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-cream/30 flex items-center justify-center text-cream/70 hover:border-gold hover:text-gold transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full border border-cream/30 flex items-center justify-center text-cream/70 hover:border-gold hover:text-gold transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/15 mt-12 pt-8 text-center text-cream/50 text-xs font-body">
        &copy; {new Date().getFullYear()} Rosenhof Exclusive Country Lodge. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
