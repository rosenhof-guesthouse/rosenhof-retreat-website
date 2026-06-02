import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface NavbarProps {
  onBookNow: () => void;
  onEnquire: () => void;
}

const Navbar = ({ onBookNow, onEnquire }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.rooms"), href: "#rooms" },
    { label: t("nav.dining"), href: "#dining" },
    { label: t("nav.events"), href: "#events" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleLang = () => setLanguage(language === "en" ? "af" : "en");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <a href="#home" onClick={() => scrollTo("#home")} className={`font-display text-xl md:text-2xl font-bold tracking-wide transition-colors ${scrolled ? "text-foreground" : "text-cream"}`}>
          Rosenhof
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className={`text-sm font-body tracking-wide hover:text-gold transition-colors ${scrolled ? "text-foreground/80" : "text-cream/90"}`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleLang}
            className={`flex items-center gap-1.5 text-xs font-body font-semibold tracking-wide w-28 h-9 justify-center rounded-full border hover:border-gold hover:text-gold transition-colors ${scrolled ? "border-foreground/20 text-foreground/70" : "border-cream/40 text-cream/80"}`}
            title={language === "en" ? t("nav.switchToAf") : t("nav.switchToEn")}
          >
            <Globe size={13} />
            {language === "en" ? "Afrikaans" : "English"}
          </button>
          <Button variant="outline" size="default" onClick={onEnquire} className={`w-28 h-9 hover:border-gold hover:text-gold ${scrolled ? "border-foreground/30 text-foreground/80" : "border-cream/50 text-cream bg-transparent hover:bg-transparent"}` }>
            {t("nav.enquire")}
          </Button>
          <Button variant="gold" size="default" onClick={onBookNow} className="w-28 h-9">
            {t("nav.bookNow")}
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} className={scrolled ? "text-foreground" : "text-cream"} /> : <Menu size={24} className={scrolled ? "text-foreground" : "text-cream"} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur border-t border-border">
          <div className="flex flex-col p-4 gap-3">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-left py-2 text-foreground/80 hover:text-gold font-body"
              >
                {l.label}
              </button>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 text-xs font-body font-semibold tracking-wide px-3 py-1.5 rounded-full border border-foreground/20 text-foreground/70 hover:border-gold hover:text-gold transition-colors"
              >
                <Globe size={13} />
                {language === "en" ? "Afrikaans" : "English"}
              </button>
              <Button variant="outline" className="flex-1 border-foreground/30" onClick={() => { setMobileOpen(false); onEnquire(); }}>
                Enquire
              </Button>
              <Button variant="gold" className="flex-1" onClick={() => { setMobileOpen(false); onBookNow(); }}>
                {t("nav.bookNow")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
