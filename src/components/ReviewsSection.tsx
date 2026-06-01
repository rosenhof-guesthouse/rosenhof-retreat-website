import { Star, ExternalLink } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/hooks/useLanguage";
import { track } from "@/lib/track";

const platforms = [
  {
    name: "Google",
    url: "https://www.google.com/search?q=Rosenhof+Exclusive+Country+Lodge+Paul+Roux",
    blurb: "Read verified Google reviews from past guests.",
  },
  {
    name: "Lekkeslaap",
    url: "https://www.lekkeslaap.co.za/akkommodasie/rosenhof-exclusive-country-lodge",
    blurb: "South Africa's trusted travel community.",
  },
  {
    name: "TripAdvisor",
    url: "https://www.tripadvisor.com/Search?q=Rosenhof+Paul+Roux",
    blurb: "International traveller reviews and photos.",
  },
];

const ReviewsSection = () => {
  const { language } = useLanguage();
  const headline = language === "af" ? "Wat Gaste Sê" : "What Guests Say";
  const tag = language === "af" ? "Resensies" : "Reviews";

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-12">
          <p className="text-sm tracking-[0.25em] uppercase text-gold font-body mb-3">{tag}</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">{headline}</h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-6" />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {platforms.map((p, i) => (
            <FadeIn key={p.name} delay={i * 120}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("review_click", { platform: p.name })}
                className="block bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-gold/40 transition-all duration-300 h-full"
              >
                <div className="flex items-center gap-1 text-gold mb-3">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} size={16} fill="currentColor" stroke="none" />
                  ))}
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                  {p.name}
                  <ExternalLink size={14} className="text-muted-foreground" />
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{p.blurb}</p>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
