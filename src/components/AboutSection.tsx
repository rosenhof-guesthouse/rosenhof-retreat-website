import FadeIn from "@/components/FadeIn";
import aboutImg from "@/assets/about-interior.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/hooks/useLanguage";

const AboutSection = () => {
  const { content } = useSiteContent("about");
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn>
            <div className="overflow-hidden rounded-lg shadow-xl">
              <img
                src={aboutImg}
                alt="Rosenhof interior with antique furniture and curated art"
                className="w-full h-[400px] lg:h-[520px] object-cover"
                loading="lazy"
                width={800}
                height={1000}
              />
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-sm tracking-[0.25em] uppercase text-gold font-body mb-3">
              {t("about.tag")}
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground leading-tight mb-6">
              {content.headline || t("about.headline")}
            </h2>
            <div className="w-16 h-0.5 bg-gold mb-8" />
            <p className="text-muted-foreground font-body text-lg leading-relaxed mb-6">
              {content.paragraph_1 || "Nestled in the heart of the Eastern Free State, Rosenhof is a beautifully restored century-old building that preserves the elegance of a bygone era."}
            </p>
            <p className="text-muted-foreground font-body text-lg leading-relaxed">
              {content.paragraph_2 || "Every room is adorned with hand-picked antiques and curated art, transporting guests to a world where craftsmanship and attention to detail were the hallmarks of true hospitality."}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
