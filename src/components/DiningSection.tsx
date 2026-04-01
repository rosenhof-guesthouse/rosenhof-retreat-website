import FadeIn from "@/components/FadeIn";
import restaurantImg from "@/assets/restaurant.jpg";
import { UtensilsCrossed, Flame, Wine } from "lucide-react";

const DiningSection = () => (
  <section id="dining" className="py-20 md:py-32 bg-background">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <FadeIn>
          <div className="overflow-hidden rounded-lg shadow-xl">
            <img
              src={restaurantImg}
              alt="The Rock Restaurant with stone walls and candlelight dining"
              className="w-full h-[400px] lg:h-[480px] object-cover"
              loading="lazy"
              width={800}
              height={800}
            />
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="text-sm tracking-[0.25em] uppercase text-gold font-body mb-3">Dining & Leisure</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground leading-tight mb-6">
            Local Flavours at The Rock
          </h2>
          <div className="w-16 h-0.5 bg-gold mb-8" />
          <p className="text-muted-foreground font-body text-lg leading-relaxed mb-8">
            Our on-site <strong className="text-foreground">Rock Restaurant & Bar</strong> serves hearty, locally-inspired cuisine in a warm stone-walled setting. Wake up to a complimentary full English breakfast, and in the evenings, gather around the communal braai area under the Free State stars.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { icon: UtensilsCrossed, label: "Full English Breakfast" },
              { icon: Flame, label: "Communal Braai" },
              { icon: Wine, label: "Licensed Bar" },
            ].map((item) => (
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

export default DiningSection;
