import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "af";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navbar
  "nav.home": { en: "Home", af: "Tuis" },
  "nav.rooms": { en: "Rooms", af: "Kamers" },
  "nav.dining": { en: "Dining", af: "Eetplek" },
  "nav.events": { en: "Events", af: "Geleenthede" },
  "nav.contact": { en: "Contact", af: "Kontak" },
  "nav.bookNow": { en: "Book Now", af: "Bespreek Nou" },
  "nav.enquire": { en: "Enquire", af: "Navraag" },
  "nav.switchToAf": { en: "Switch to Afrikaans", af: "Skakel oor na Afrikaans" },
  "nav.switchToEn": { en: "Switch to English", af: "Skakel oor na Engels" },



  // Hero
  "hero.viewRooms": { en: "View Our Rooms", af: "Bekyk Ons Kamers" },
  "hero.bookStay": { en: "Book Your Stay", af: "Bespreek Jou Verblyf" },
  "hero.sendEnquiry": { en: "Send Enquiry", af: "Stuur Navraag" },

  // About
  "about.tag": { en: "Our Story", af: "Ons Storie" },
  "about.headline": { en: "A Century of Hospitality", af: "'n Eeu van Gasvryheid" },
  "about.paragraph_1": { en: "Nestled in the heart of the Eastern Free State, Rosenhof is a beautifully restored century-old building that preserves the elegance of a bygone era.", af: "Geleë in die hart van die Oos-Vrystaat, is Rosenhof 'n pragtig gerestoureerde eeue-oue gebou wat die elegansie van 'n vervloë era bewaar." },
  "about.paragraph_2": { en: "Every room is adorned with hand-picked antiques and curated art, transporting guests to a world where craftsmanship and attention to detail were the hallmarks of true hospitality.", af: "Elke kamer is versier met handgeselekteerde antieke en gekureerde kuns, wat gaste na 'n wêreld vervoer waar vakmanskap en aandag aan detail die kentekens van ware gasvryheid was." },

  // Rooms
  "rooms.tag": { en: "Accommodation", af: "Akkommodasie" },
  "rooms.headline": { en: "Restful Elegance", af: "Rustige Elegansie" },
  "rooms.bookRoom": { en: "Book This Room", af: "Bespreek Hierdie Kamer" },
  "rooms.priceNote": { en: "*Prices vary based on dates & availability", af: "*Pryse wissel na gelang van datums en beskikbaarheid" },
  "rooms.peakNote": { en: "⚡ Prices may increase during peak dates & weekends", af: "⚡ Pryse kan tydens spitstye en naweke styg" },
  "rooms.priceFrom": { en: "From approx. R{n}/night*", af: "Vanaf ongeveer R{n}/nag*" },

  // Dining
  "dining.tag": { en: "Dining & Leisure", af: "Eetplek & Ontspanning" },
  "dining.headline": { en: "Local Flavours at The Rock", af: "Plaaslike Geure by The Rock" },
  "dining.description": { en: "Our on-site Rock Restaurant & Bar serves hearty, locally-inspired cuisine.", af: "Ons Rock Restaurant & Bar bedien hartlike, plaaslik-geïnspireerde kookkuns." },

  // Events
  "events.tag": { en: "Events & Weddings", af: "Geleenthede & Troues" },
  "events.headline": { en: "Celebrate with Us", af: "Vier Saam met Ons" },
  "events.description": { en: "From intimate weddings in our enchanting gardens to corporate conferences for up to 55 delegates, Rosenhof provides a unique heritage setting for life's most important occasions.", af: "Van intieme troues in ons betowerende tuine tot korporatiewe konferensies vir tot 55 afgevaardigdes, bied Rosenhof 'n unieke erfenisomgewing vir die mees belangrike geleenthede in jou lewe." },
  "events.enquire": { en: "Enquire About Events", af: "Navrae oor Geleenthede" },

  // Reviews
  "reviews.tag": { en: "Reviews", af: "Resensies" },
  "reviews.headline": { en: "What Guests Say", af: "Wat Gaste Sê" },
  "reviews.google": { en: "Read verified Google reviews from past guests.", af: "Lees geverifieerde Google-resensies van vorige gaste." },
  "reviews.lekkeslaap": { en: "South Africa's trusted travel community.", af: "Suid-Afrika se vertroude reisgemeenskap." },
  "reviews.tripadvisor": { en: "International traveller reviews and photos.", af: "Internasionale reisigerresensies en foto's." },

  // Footer
  "footer.lodge": { en: "Exclusive Country Lodge", af: "Eksklusiewe Plaasherberg" },
  "footer.contact": { en: "Contact", af: "Kontak" },
  "footer.followUs": { en: "Follow Us", af: "Volg Ons" },
  "footer.rights": { en: "All rights reserved.", af: "Alle regte voorbehou." },

  // Booking Modal
  "booking.title": { en: "Book Your Stay", af: "Bespreek Jou Verblyf" },
  "booking.subtitle": { en: "Fill in your details and we'll confirm your reservation.", af: "Vul jou besonderhede in en ons sal jou bespreking bevestig." },
  "booking.name": { en: "Full Name", af: "Volle Naam" },
  "booking.email": { en: "Email", af: "E-pos" },
  "booking.inquiryType": { en: "Type of Inquiry", af: "Tipe Navraag" },
  "booking.selectType": { en: "Select inquiry type", af: "Kies tipe navraag" },
  "booking.roomBooking": { en: "Room Booking", af: "Kamerbespreking" },
  "booking.wedding": { en: "Wedding", af: "Troue" },
  "booking.conference": { en: "Conference", af: "Konferensie" },
  "booking.checkIn": { en: "Check-in", af: "Inklok" },
  "booking.checkOut": { en: "Check-out", af: "Uitklok" },
  "booking.guests": { en: "Guests", af: "Gaste" },
  "booking.specialRequests": { en: "Special Requests", af: "Spesiale Versoeke" },
  "booking.specialPlaceholder": { en: "Any special requirements...", af: "Enige spesiale vereistes..." },
  "booking.submit": { en: "Submit Enquiry", af: "Dien Navraag In" },
  "booking.fillFields": { en: "Please fill in all required fields.", af: "Vul asseblief al die verpligte velde in." },
  "booking.success": { en: "Thank you! Your enquiry has been submitted. We'll be in touch shortly.", af: "Dankie! Jou navraag is ingedien. Ons sal binnekort in aanraking wees." },

  // Amenity icons
  "amenity.wifi": { en: "Free WiFi", af: "Gratis WiFi" },
  "amenity.tea": { en: "Tea & Coffee", af: "Tee & Koffie" },
  "amenity.garden": { en: "Garden Access", af: "Tuintoegang" },

  // Dining features
  "dining.breakfast": { en: "Full English Breakfast", af: "Volledige Engelse Ontbyt" },
  "dining.braai": { en: "Communal Braai", af: "Gemeenskaplike Braai" },
  "dining.bar": { en: "Licensed Bar", af: "Gelisensieerde Kroeg" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[key]?.[language] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
