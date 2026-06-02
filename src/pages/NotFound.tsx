import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <p className="font-display text-[8rem] sm:text-[10rem] leading-none text-gold/30 select-none">404</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground -mt-4 mb-3">
          {t("notFound.title")}
        </h1>
        <p className="text-muted-foreground mb-2 font-body">
          {t("notFound.body")}
        </p>
        <p className="text-xs text-muted-foreground/70 mb-8 font-mono break-all">
          {location.pathname}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft size={16} className="mr-2" /> {t("notFound.goBack")}
          </Button>
          <Button asChild variant="hero">
            <Link to="/">
              <Home size={16} className="mr-2" /> {t("notFound.return")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
