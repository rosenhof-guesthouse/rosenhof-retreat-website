import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import RoomsSection from "@/components/RoomsSection";
import DiningSection from "@/components/DiningSection";
import EventsSection from "@/components/EventsSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import StickyMobileActions from "@/components/StickyMobileActions";
import BookingModal from "@/components/BookingModal";
import { track } from "@/lib/track";

const NIGHTSBRIDGE_URL = "https://book.nightsbridge.com/39887";

const openNightsbridge = () => {
  track("book_now_click", { destination: "nightsbridge" });
  window.open(NIGHTSBRIDGE_URL, "_blank", "noopener,noreferrer");
};

const Index = () => {
  const [enquireOpen, setEnquireOpen] = useState(false);

  const openEnquire = () => {
    track("enquiry_open");
    setEnquireOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar onBookNow={openNightsbridge} onEnquire={openEnquire} />
      <HeroSection onBookNow={openNightsbridge} onEnquire={openEnquire} />
      <AboutSection />
      <RoomsSection />
      <DiningSection />
      <EventsSection onBookNow={openNightsbridge} />
      <ReviewsSection />
      <Footer />
      <StickyMobileActions />
      <BookingModal open={enquireOpen} onOpenChange={setEnquireOpen} />
    </div>
  );
};

export default Index;
