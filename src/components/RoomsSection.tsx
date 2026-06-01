import FadeIn from "@/components/FadeIn";
import { Wifi, Coffee, TreePine, Tv, ShowerHead, Bath } from "lucide-react";
import honeymoonImg from "@/assets/room-honeymoon.jpg";
import standardImg from "@/assets/room-standard.jpg";
import gardenImg from "@/assets/amenities-garden.jpg";
import { useRooms } from "@/hooks/useSiteContent";
import { useLanguage } from "@/hooks/useLanguage";
import { useRoomsSchema } from "@/hooks/useRoomsSchema";

const iconMap: Record<string, any> = { Wifi, Coffee, TreePine, Tv, ShowerHead, Bath };
const fallbackImages = [honeymoonImg, standardImg, gardenImg];

const RoomsSection = () => {
  const { rooms } = useRooms();
  const { t } = useLanguage();
  useRoomsSchema(rooms);

  const displayRooms = rooms.length > 0 ? rooms : [];

  return (
    <section id="rooms" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <p className="text-sm tracking-[0.25em] uppercase text-gold font-body mb-3">{t("rooms.tag")}</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">{t("rooms.headline")}</h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-6" />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayRooms.map((room, i) => {
            const features = Array.isArray(room.features) ? room.features : [];
            return (
              <FadeIn key={room.id} delay={i * 150}>
                <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="overflow-hidden">
                    <img
                      src={room.image_url || fallbackImages[i] || fallbackImages[0]}
                      alt={room.alt_text || room.title}
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      width={800}
                      height={600}
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">{room.title}</h3>
                    <p className="text-muted-foreground font-body leading-relaxed flex-1">{room.description}</p>
                    {features.length > 0 && (
                      <div className="flex gap-6 mt-4 pt-4 border-t border-border">
                        {features.map((f: any) => {
                          const Icon = iconMap[f.icon];
                          return (
                            <div key={f.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                              {Icon && <Icon size={18} className="text-gold" />}
                              <span>{f.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-gold font-display font-semibold text-lg">
                        From approx. R{room.price_from ?? 350}/night*
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">*Prices vary based on dates &amp; availability</p>
                      <p className="text-xs text-amber-600 font-medium mt-1">⚡ Prices may increase during peak dates &amp; weekends</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;
