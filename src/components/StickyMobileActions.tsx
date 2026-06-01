import { Phone, MessageCircle } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { track } from "@/lib/track";

/**
 * Mobile-only floating action bar: Call + WhatsApp.
 * Older guests strongly prefer phone; younger guests prefer WhatsApp.
 * Hidden on desktop where the navbar/header already exposes contact info.
 */
const StickyMobileActions = () => {
  const { content } = useSiteContent("footer");
  const phone = (content.phone || "+27828288381").replace(/\s+/g, "");
  const whatsapp = (content.whatsapp || phone).replace(/\D/g, "");

  return (
    <div className="md:hidden fixed bottom-4 right-4 z-40 flex flex-col gap-3">
      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Rosenhof"
        onClick={() => track("contact_click", { channel: "whatsapp" })}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
      >
        <MessageCircle size={26} />
      </a>
      <a
        href={`tel:${phone}`}
        aria-label="Call Rosenhof"
        onClick={() => track("contact_click", { channel: "phone" })}
        className="w-14 h-14 rounded-full bg-forest text-cream shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
      >
        <Phone size={24} />
      </a>
    </div>
  );
};

export default StickyMobileActions;
