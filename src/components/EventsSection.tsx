import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import weddingImg from "@/assets/events-wedding.jpg";
import { useEventsContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/hooks/useLanguage";

interface EventsSectionProps {
  onBookNow: () => void;
}

const EventsSection = ({ onBookNow }: EventsSectionProps) => {
  const { content } = useEventsContent();
  const { t } = useLanguage();

  return (
    <section id="events" className="relative overflow-hidden">
      <img
        src={content.image_url || weddingImg}
        alt="Outdoor wedding ceremony at Rosenhof"
        className="w-full h-auto block"
        loading="lazy"
        width={1920}
        height={800}
      />
      <div className="absolute inset-0 flex items-end justify-center pb-48">
        <FadeIn>
          <Button
            variant="gold"
            size="lg"
            className="text-base px-8 py-6"
            onClick={onBookNow}
          >
            {t("events.enquire")}
          </Button>
        </FadeIn>
      </div>
    </section>
  );
};

export default EventsSection;
