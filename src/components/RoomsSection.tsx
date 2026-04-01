import FadeIn from "@/components/FadeIn";
import { Wifi, Coffee, TreePine } from "lucide-react";
import honeymoonImg from "@/assets/room-honeymoon.jpg";
import standardImg from "@/assets/room-standard.jpg";
import gardenImg from "@/assets/amenities-garden.jpg";

const rooms = [
  {
    title: "Honeymoon Suite",
    description: "Indulge in romance with a luxurious spa bath, double shower, and four-poster bed draped in fine linens.",
    image: honeymoonImg,
    alt: "Honeymoon suite with spa bath and four-poster bed",
  },
  {
    title: "Standard Luxury",
    description: "Generous high ceilings and elegant walk-in showers complement antique furnishings for a restful retreat.",
    image: standardImg,
    alt: "Standard luxury room with high ceilings",
  },
  {
    title: "Lodge Amenities",
    description: "Enjoy complimentary WiFi, tea & coffee stations, and access to our tranquil landscaped gardens.",
    image: gardenImg,
    alt: "Beautiful lodge gardens",
    icons: [
      { icon: Wifi, label: "Free WiFi" },
      { icon: Coffee, label: "Tea & Coffee" },
      { icon: TreePine, label: "Garden Access" },
    ],
  },
];

const RoomsSection = () => (
  <section id="rooms" className="py-20 md:py-32 bg-secondary">
    <div className="container mx-auto px-4">
      <FadeIn className="text-center mb-16">
        <p className="text-sm tracking-[0.25em] uppercase text-gold font-body mb-3">Accommodation</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">Restful Elegance</h2>
        <div className="w-16 h-0.5 bg-gold mx-auto mt-6" />
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {rooms.map((room, i) => (
          <FadeIn key={room.title} delay={i * 150}>
            <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
              <div className="overflow-hidden">
                <img
                  src={room.image}
                  alt={room.alt}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{room.title}</h3>
                <p className="text-muted-foreground font-body leading-relaxed flex-1">{room.description}</p>
                {room.icons && (
                  <div className="flex gap-6 mt-4 pt-4 border-t border-border">
                    {room.icons.map((ic) => (
                      <div key={ic.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ic.icon size={18} className="text-gold" />
                        <span>{ic.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

export default RoomsSection;
