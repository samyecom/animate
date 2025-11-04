import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomeNavBar from "./components/HomeNavBar";
import DefaultNavBar from "./components/DefaultNavBar";
import HeroSection from "./sections/HeroSection";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import MessageSection from "./sections/MessageSection";
import FlavorSection from "./sections/FlavorSection";
import { useGSAP } from "@gsap/react";
import BenefitSection from "./sections/BenefitSection";
import TestimonialSection from "./sections/TestimonialSection";
import FooterSection from "./sections/FooterSection";
import AboutUsHeroSection from "./about-us/HeroSection";
import ProfessorsPage from "./pages/ProfessorsPage";
import { useEffect } from "react";
import Preloader from "./components/Preloader";
import { VideoModalProvider, useVideoModal } from "./context/VideoModalContext";
import VideoModal from "./components/VideoModal";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <MessageSection />
      <FlavorSection />
      <div>
        <BenefitSection />
        <TestimonialSection />
      </div>
    </>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { isOpen, videoSrc, closeModal } = useVideoModal();

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
      ignoreMobileResize: true,
      normalizeScroll: true,
    });
  });

  useEffect(() => {
    const smoothWrapper = document.getElementById("smooth-wrapper");
    if (smoothWrapper) {
      smoothWrapper.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <main>
      <Preloader />
      {isHomePage ? <HomeNavBar /> : <DefaultNavBar />}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<><AboutUsHeroSection /><ProfessorsPage /></>} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
          <FooterSection />
        </div>
      </div>
      <VideoModal isOpen={isOpen} onClose={closeModal} videoSrc={videoSrc} />
    </main>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <VideoModalProvider>
        <AppContent />
      </VideoModalProvider>
    </BrowserRouter>
  );
};

export default App;
