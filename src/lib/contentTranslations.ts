// Maps known English DB content to Afrikaans.
// Used so existing site_content / rooms / dining / events rows render in Afrikaans
// without requiring an _af column for every field.

const map: Record<string, string> = {
  // Hero
  "Paul Roux, Eastern Free State": "Paul Roux, Oos-Vrystaat",
  "Step Back in Time at Rosenhof Exclusive Country Lodge":
    "Stap Terug in Tyd by Rosenhof Eksklusiewe Plaasherberg",
  'Experience the tranquil beauty and "Olde World" charm of Paul Roux\'s historic hidden gem.':
    "Ervaar die rustige skoonheid en \"Olde World\"-bekoring van Paul Roux se historiese verborge juweel.",

  // About
  "Our Story": "Ons Storie",
  "A Century of Hospitality": "'n Eeu van Gasvryheid",
  "Nestled in the heart of the Eastern Free State, Rosenhof is a beautifully restored century-old building that preserves the elegance of a bygone era. Located conveniently near the N5, the lodge offers a 'fresh champagne climate' amidst rolling landscapes.":
    "Geleë in die hart van die Oos-Vrystaat, is Rosenhof 'n pragtig gerestoureerde eeue-oue gebou wat die elegansie van 'n vervloë era bewaar. Geleë naby die N5, bied die herberg 'n 'vars sjampanjeklimaat' te midde van golwende landskappe.",
  "Every room is adorned with hand-picked antiques and curated art, transporting guests to a world where craftsmanship and attention to detail were the hallmarks of true hospitality.":
    "Elke kamer is versier met handgeselekteerde antieke en gekureerde kuns, wat gaste na 'n wêreld vervoer waar vakmanskap en aandag aan detail die kentekens van ware gasvryheid was.",

  // Rooms
  "The Honeymoon Suite": "Die Wittebroodsuite",
  "Indulge in romance with a luxurious spa bath, double shower, and four-poster bed draped in fine linens.":
    "Geniet romanse met 'n luukse spa-bad, dubbele stort en vierpaal-bed gedrapeer in fyn linne.",
  "Standard Luxury Rooms": "Standaard Luukse Kamers",
  "Generous high ceilings and elegant walk-in showers complement antique furnishings for a restful retreat.":
    "Ruim hoë plafonne en elegante instap-storte komplementeer antieke meubels vir 'n rustige toevlug.",
  "Lodge Amenities": "Herberg Geriewe",
  "Enjoy complimentary WiFi, tea & coffee stations, and access to our tranquil landscaped gardens.":
    "Geniet gratis WiFi, tee- en koffiestasies, en toegang tot ons rustige aangelegde tuine.",
  "Free WiFi": "Gratis WiFi",
  "Tea & Coffee": "Tee & Koffie",
  "Garden Access": "Tuintoegang",

  // Dining
  "Dining & Leisure": "Eetplek & Ontspanning",
  "Local Flavours at The Rock": "Plaaslike Geure by The Rock",
  "Our on-site Rock Restaurant & Bar serves hearty, locally-inspired cuisine in a warm stone-walled setting. Wake up to a complimentary full English breakfast, and in the evenings, gather around the communal braai area under the Free State stars.":
    "Ons Rock Restaurant & Bar bedien hartlike, plaaslik-geïnspireerde kookkuns in 'n warm klipmuur-omgewing. Word wakker met 'n gratis volledige Engelse ontbyt, en saans, kom bymekaar by die gemeenskaplike braai-area onder die Vrystaat-sterre.",
  "Full English Breakfast": "Volledige Engelse Ontbyt",
  "Communal Braai": "Gemeenskaplike Braai",
  "Licensed Bar": "Gelisensieerde Kroeg",

  // Events
  "Events & Weddings": "Geleenthede & Troues",
  "Celebrate with Us": "Vier Saam met Ons",
  "From intimate weddings in our enchanting gardens to corporate conferences for up to 55 delegates, Rosenhof provides a unique heritage setting for life's most important occasions.":
    "Van intieme troues in ons betowerende tuine tot korporatiewe konferensies vir tot 55 afgevaardigdes, bied Rosenhof 'n unieke erfenisomgewing vir die mees belangrike geleenthede in jou lewe.",

  // Footer
  "Proudly Pet-Friendly — Inquire for details.":
    "Trots Troeteldier-vriendelik — Doen navraag vir besonderhede.",
};

export const tx = (value: string | undefined | null, language: string): string => {
  if (!value) return "";
  if (language === "en") return value;
  return map[value.trim()] ?? value;
};
