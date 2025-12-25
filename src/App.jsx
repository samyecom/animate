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
import CoursePage from "./pages/CoursePage";

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

    const pageTitles = {
      "/": "WeInfluence Academy - Transform Creators to Professionals",
      "/about-us": "About Us - WeInfluence Academy",
      "/course": "Course - WeInfluence Academy Flagship Influencer Training Program",
      "/privacy-policy": "Privacy Policy - WeInfluence Academy",
      "/terms-of-service": "Terms of Service - WeInfluence Academy",
    };

    const pageDescriptions = {
      "/": "WeInfluence Academy helps creators grow, learn, and lead. Transform from creators to professionals with our comprehensive training programs.",
      "/about-us": "Meet the professors and learn about WeInfluence Academy's mission to transform creators into professionals.",
      "/course": "WeInfluence Academy Flagship Influencer Training Program - 1 Month, 20 Working Days, 2 hrs/day. Transform from beginner to collaboration-ready influencer.",
      "/privacy-policy": "Privacy Policy for WeInfluence Academy. Learn how we protect and handle your personal information.",
      "/terms-of-service": "Terms of Service for WeInfluence Academy. Read our terms and conditions.",
    };

    const title = pageTitles[location.pathname] || "WeInfluence Academy";
    const description = pageDescriptions[location.pathname] || "WeInfluence Academy - Transform Creators to Professionals";

    document.title = title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', description);
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
            <Route path="/course" element={<CoursePage />} />
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
