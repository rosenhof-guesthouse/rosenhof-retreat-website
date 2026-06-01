import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const STORAGE_KEY = "rosenhof_cookie_consent_v1";

const CookieBanner = () => {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem(STORAGE_KEY);
    if (!v) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };
  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  const copy =
    language === "af"
      ? {
          title: "Ons respekteer jou privaatheid",
          body: "Hierdie webwerf gebruik slegs noodsaaklike koekies vir basiese funksionaliteit. Geen analitiese of bemarkingskoekies word gestoor nie. Deur voort te gaan, aanvaar jy ons gebruik van koekies in lyn met POPIA.",
          accept: "Aanvaar",
          decline: "Weier",
          privacy: "Privaatheidsbeleid",
        }
      : {
          title: "We respect your privacy",
          body: "This site uses only essential cookies for basic functionality. No analytics or marketing cookies are stored. By continuing, you accept our use of cookies in line with POPIA.",
          accept: "Accept",
          decline: "Decline",
          privacy: "Privacy Policy",
        };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={copy.title}
      className="fixed bottom-0 left-0 right-0 z-[100] p-3 sm:p-4 animate-in slide-in-from-bottom duration-500"
    >
      <div className="mx-auto max-w-4xl bg-card border border-border shadow-2xl rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-4 relative">
        <button
          onClick={decline}
          aria-label="Close"
          className="absolute top-2 right-2 sm:hidden text-muted-foreground hover:text-foreground"
        >
          <X size={18} />
        </button>
        <div className="flex-1 text-sm">
          <p className="font-display font-semibold text-foreground mb-1">{copy.title}</p>
          <p className="text-muted-foreground leading-relaxed">
            {copy.body}{" "}
            <Link to="/privacy" className="underline hover:text-foreground">
              {copy.privacy}
            </Link>
            .
          </p>
        </div>
        <div className="flex gap-2 shrink-0 w-full sm:w-auto">
          <Button variant="outline" size="sm" onClick={decline} className="flex-1 sm:flex-none">
            {copy.decline}
          </Button>
          <Button size="sm" onClick={accept} className="flex-1 sm:flex-none">
            {copy.accept}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
