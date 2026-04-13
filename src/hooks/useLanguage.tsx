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

  // Hero
  "hero.viewRooms": { en: "View Our Rooms", af: "Bekyk Ons Kamers" },
  "hero.bookStay": { en: "Book Your Stay", af: "Bespreek Jou Verblyf" },

  // About
  "about.tag": { en: "Our Story", af: "Ons Storie" },
  "about.headline": { en: "A Century of Hospitality", af: "'n Eeu van Gasvryheid" },

  // Rooms
  "rooms.tag": { en: "Accommodation", af: "Akkommodasie" },
  "rooms.headline": { en: "Restful Elegance", af: "Rustige Elegansie" },

  // Dining
  "dining.tag": { en: "Dining & Leisure", af: "Eetplek & Ontspanning" },

  // Events
  "events.tag": { en: "Events & Weddings", af: "Geleenthede & Troues" },
  "events.enquire": { en: "Enquire About Events", af: "Navrae oor Geleenthede" },

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
