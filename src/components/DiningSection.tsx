import FadeIn from "@/components/FadeIn";
import restaurantImg from "@/assets/restaurant.jpg";
import { UtensilsCrossed, Flame, Wine } from "lucide-react";
import { useDiningContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/hooks/useLanguage";
import { tx } from "@/lib/contentTranslations";

const DiningSection = () => {
  const { content } = useDiningContent();
  const { t, language } = useLanguage();

  const features = [
    { icon: UtensilsCrossed, label: tx(content.feature_1, language) || t("dining.breakfast") },
    { icon: Flame, label: tx(content.feature_2, language) || t("dining.braai") },
    { icon: Wine, label: tx(content.feature_3, language) || t("dining.bar") },
  ];

  return (
    <section id="dining" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn>
            <div className="overflow-hidden rounded-lg shadow-xl">
              <img
                src={content.image_url || restaurantImg}
                alt="The Rock Restaurant with stone walls and candlelight dining"
                className="w-full h-[400px] lg:h-[480px] object-cover"
                loading="lazy"
                width={800}
                height={800}
              />
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-sm tracking-[0.25em] uppercase text-gold font-body mb-3">
              {tx(content.tag, language) || t("dining.tag")}
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground leading-tight mb-6">
              {tx(content.headline, language) || t("dining.headline")}
            </h2>
            <div className="w-16 h-0.5 bg-gold mb-8" />
            <p className="text-muted-foreground font-body text-lg leading-relaxed mb-8">
              {content.description ? (
                (() => {
                  const text = tx(content.description, language);
                  const brand = "Rock Restaurant & Bar";
                  const parts = text.split(brand);
                  return parts.length > 1
                    ? parts.flatMap((part, i) =>
                        i < parts.length - 1
                          ? [part, <strong key={i} className="text-foreground">{brand}</strong>]
                          : [part]
                      )
                    : text;
                })()
              ) : (
                <>{t("dining.description")}</>
              )}
            </p>
            <div className="flex flex-wrap gap-6">
              {features.map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-muted-foreground">
                  <item.icon size={20} className="text-gold" />
                  <span className="font-body">{item.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default DiningSection;
