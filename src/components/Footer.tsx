import { MapPin, Phone, Mail, PawPrint } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/hooks/useLanguage";
import { tx } from "@/lib/contentTranslations";

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Footer = () => {
  const { content } = useSiteContent("footer");
  const { t, language } = useLanguage();

  return (
    <footer id="contact" className="bg-forest text-cream py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-display text-2xl font-bold text-cream mb-4">Rosenhof</h3>
            <p className="text-cream/70 font-body text-sm leading-relaxed mb-4">
              {t("footer.lodge")}
            </p>
            <div className="flex items-center gap-2 text-cream/70 text-sm mb-2">
              <PawPrint size={16} className="text-gold" />
              <span>{tx(content.pet_policy, language) || t("footer.petPolicy")}</span>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-cream mb-4">{t("footer.contact")}</h4>
            <div className="space-y-3 text-sm text-cream/70 font-body">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                <span>{content.address || "18 Market St, Paul Roux, 9800"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gold" />
                <a href={`tel:${content.phone || "+27828288381"}`} className="hover:text-gold transition-colors">
                  {content.phone || "+27 82 828 8381"}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gold" />
                <a href={`mailto:${content.email || "info@rosenhof.co.za"}`} className="hover:text-gold transition-colors">
                  {content.email || "info@rosenhof.co.za"}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-cream mb-4">{t("footer.followUs")}</h4>
            <div className="flex gap-4">
              <a
                href={content.instagram_url || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-cream/30 flex items-center justify-center text-cream/70 hover:border-gold hover:text-gold transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a
                href={content.facebook_url || "https://facebook.com"}
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

        {/* Google Maps embed — directions to the lodge */}
        <div className="mt-12 rounded-lg overflow-hidden border border-cream/15 shadow-lg">
          <iframe
            title={t("footer.mapTitle")}
            src="https://www.google.com/maps?q=18+Market+St,+Paul+Roux,+9800,+South+Africa&output=embed"
            width="100%"
            height="280"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="bg-forest/80 px-4 py-2 text-center">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=18+Market+St,+Paul+Roux,+9800,+South+Africa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream text-sm font-body hover:text-gold transition-colors underline"
            >
              {t("footer.getDirections")}
            </a>
          </div>
        </div>


        <div className="border-t border-cream/15 mt-12 pt-8 space-y-3 text-center">
          <div className="flex items-center justify-center gap-4 text-cream/40 text-xs font-body">
            <Link to="/privacy" className="hover:text-gold transition-colors underline">{t("footer.privacy")}</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-gold transition-colors underline">{t("footer.terms")}</Link>
          </div>
          <p className="text-cream/50 text-xs font-body">
            &copy; {new Date().getFullYear()} Rosenhof Exclusive Country Lodge. {t("footer.rights")}
          </p>
          <a
            href="https://astartechnologies.co.za"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-cream/40 text-xs font-body hover:text-gold transition-colors underline"
          >
            <WhatsAppIcon />
            {t("footer.designedBy")}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
