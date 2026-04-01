import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import RoomsSection from "@/components/RoomsSection";
import DiningSection from "@/components/DiningSection";
import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

const Index = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar onBookNow={() => setBookingOpen(true)} />
      <HeroSection onBookNow={() => setBookingOpen(true)} />
      <AboutSection />
      <RoomsSection />
      <DiningSection />
      <EventsSection onBookNow={() => setBookingOpen(true)} />
      <Footer />
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
};

export default Index;
