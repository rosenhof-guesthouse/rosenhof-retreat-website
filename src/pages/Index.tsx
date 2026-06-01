import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import RoomsSection from "@/components/RoomsSection";
import DiningSection from "@/components/DiningSection";
import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";

const NIGHTSBRIDGE_URL = "https://book.nightsbridge.com/34659";

const openNightsbridge = () => window.open(NIGHTSBRIDGE_URL, "_blank", "noopener,noreferrer");

const Index = () => (
  <div className="min-h-screen">
    <Navbar onBookNow={openNightsbridge} />
    <HeroSection onBookNow={openNightsbridge} />
    <AboutSection />
    <RoomsSection />
    <DiningSection />
    <EventsSection onBookNow={openNightsbridge} />
    <Footer />
  </div>
);

export default Index;
