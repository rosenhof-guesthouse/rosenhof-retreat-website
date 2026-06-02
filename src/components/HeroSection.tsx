import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-lodge.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/hooks/useLanguage";
import { tx } from "@/lib/contentTranslations";

interface HeroSectionProps {
  onBookNow: () => void;
  onEnquire: () => void;
}

const HeroSection = ({ onBookNow, onEnquire }: HeroSectionProps) => {
  const { content } = useSiteContent("hero");
  const { t, language } = useLanguage();

  const scrollToRooms = () => {
    document.querySelector("#rooms")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroImg}
        alt="Rosenhof Exclusive Country Lodge at golden hour"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-forest/60" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="font-body text-sm md:text-base tracking-[0.3em] uppercase text-cream/80 mb-4">
          {tx(content.location_label, language) || "Paul Roux, Eastern Free State"}
        </p>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-cream leading-tight mb-6">
          {(() => {
            const headline = tx(content.headline, language) || "Step Back in Time at Rosenhof Exclusive Country Lodge";
            const parts = headline.split("Rosenhof");
            return parts.length > 1 ? (
              <>
                {parts[0]}
                <span className="text-gold italic">Rosenhof</span>
                {parts[1]}
              </>
            ) : headline;
          })()}
        </h1>
        <p className="font-body text-lg md:text-xl text-cream/85 max-w-2xl mx-auto mb-10 font-light">
          {tx(content.subheadline, language) || "Experience the tranquil beauty and \"Olde World\" charm of Paul Roux's historic hidden gem."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" className="text-base w-full sm:w-52 h-14 bg-cream text-forest hover:bg-cream/90" onClick={scrollToRooms}>
            {t("hero.viewRooms")}
          </Button>
          <Button variant="heroOutline" size="lg" className="text-base w-full sm:w-52 h-14 border-cream text-cream hover:bg-cream hover:text-forest" onClick={onBookNow}>
            {t("hero.bookStay")}
          </Button>
          <Button variant="heroOutline" size="lg" className="text-base w-full sm:w-52 h-14 border-gold text-gold hover:bg-gold hover:text-forest" onClick={onEnquire}>
            {t("hero.sendEnquiry")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
