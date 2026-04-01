import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-lodge.jpg";

interface HeroSectionProps {
  onBookNow: () => void;
}

const HeroSection = ({ onBookNow }: HeroSectionProps) => {
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
          Paul Roux, Eastern Free State
        </p>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-cream leading-tight mb-6">
          Step Back in Time at{" "}
          <span className="text-gold italic">Rosenhof</span>{" "}
          Exclusive Country Lodge
        </h1>
        <p className="font-body text-lg md:text-xl text-cream/85 max-w-2xl mx-auto mb-10 font-light">
          Experience the tranquil beauty and "Olde World" charm of Paul Roux's historic hidden gem.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" className="text-base px-8 py-6 bg-cream text-forest hover:bg-cream/90" onClick={scrollToRooms}>
            View Our Rooms
          </Button>
          <Button variant="heroOutline" size="lg" className="text-base px-8 py-6 border-cream text-cream hover:bg-cream hover:text-forest" onClick={onBookNow}>
            Book Your Stay
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
