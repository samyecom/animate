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
import ProfessorsSection from "./about-us/page";

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

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
      ignoreMobileResize: true,
      normalizeScroll: true,
    });
  });

  return (
    <main>
      {isHomePage ? <HomeNavBar /> : <DefaultNavBar />}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<ProfessorsSection />} />
          </Routes>
          <FooterSection />
        </div>
      </div>
    </main>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
