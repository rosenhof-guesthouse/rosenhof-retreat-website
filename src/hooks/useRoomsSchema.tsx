import { useEffect } from "react";

interface Room {
  id: string;
  title: string;
  description?: string;
  image_url?: string | null;
}

/**
 * Inject Hotel + per-Room JSON-LD into <head> for rich Google snippets.
 * Avoids react-helmet-async dependency by mutating the head directly.
 */
export const useRoomsSchema = (rooms: Room[]) => {
  useEffect(() => {
    if (!rooms?.length) return;
    const SCRIPT_ID = "rosenhof-rooms-jsonld";
    document.getElementById(SCRIPT_ID)?.remove();

    const data = {
      "@context": "https://schema.org",
      "@type": "Hotel",
      name: "Rosenhof Exclusive Country Lodge",
      url: "https://rosenhofcountrylodge.co.za",
      containsPlace: rooms.map((r) => ({
        "@type": "HotelRoom",
        name: r.title,
        description: r.description || undefined,
        image: r.image_url || undefined,
      })),
    };

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.getElementById(SCRIPT_ID)?.remove();
    };
  }, [rooms]);
};
