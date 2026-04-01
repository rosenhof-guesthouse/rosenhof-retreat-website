import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import weddingImg from "@/assets/events-wedding.jpg";

interface EventsSectionProps {
  onBookNow: () => void;
}

const EventsSection = ({ onBookNow }: EventsSectionProps) => (
  <section id="events" className="relative py-28 md:py-40 overflow-hidden">
    <img
      src={weddingImg}
      alt="Outdoor wedding ceremony at Rosenhof"
      className="absolute inset-0 w-full h-full object-cover"
      loading="lazy"
      width={1920}
      height={800}
    />
    <div className="absolute inset-0 bg-forest/70" />

    <div className="relative z-10 container mx-auto px-4 text-center">
      <FadeIn>
        <p className="text-sm tracking-[0.25em] uppercase text-gold font-body mb-3">Events & Weddings</p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-cream leading-tight mb-6">
          Celebrate with Us
        </h2>
        <div className="w-16 h-0.5 bg-gold mx-auto mb-8" />
        <p className="text-cream/85 font-body text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          From intimate weddings in our enchanting gardens to corporate conferences for up to 55 delegates, Rosenhof provides a unique heritage setting for life's most important occasions.
        </p>
        <Button
          variant="heroOutline"
          size="lg"
          className="text-base px-8 py-6 border-cream text-cream hover:bg-cream hover:text-forest"
          onClick={onBookNow}
        >
          Enquire About Events
        </Button>
      </FadeIn>
    </div>
  </section>
);

export default EventsSection;
