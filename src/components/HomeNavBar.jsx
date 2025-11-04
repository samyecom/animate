import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const HomeNavBar = () => {
  const location = useLocation();
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);

  useGSAP(() => {
    if (!navRef.current || !logoRef.current || !linksRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth <= 768;
    const initialSize = 300;
    const finalSize = isMobile ? 96 : 160;

    gsap.set(navRef.current, {
      position: "fixed",
      top: "0%",
      left: "50%",
      xPercent: -50,
      yPercent: 20,
      zIndex: 50,
      justifyContent: "center",
    });

    gsap.set(logoRef.current, {
      width: initialSize,
    });

    gsap.set(linksRef.current, {
      opacity: 0,
      pointerEvents: "none",
      width: "0%",
      overflow: "hidden",
    });
  });

  useEffect(() => {
    const smoothWrapper = document.getElementById("smooth-wrapper");
    if (!smoothWrapper || !navRef.current || !logoRef.current || !linksRef.current) return;

    const isMobile = window.innerWidth <= 768;
    const finalSize = isMobile ? 96 : 160;

    const checkHeroContainer = setInterval(() => {
      const heroContainer = document.querySelector(".hero-container");
      if (heroContainer) {
        clearInterval(checkHeroContainer);

        const navTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroContainer,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
            invalidateOnRefresh: true,
            scroller: smoothWrapper,
          },
        });

        navTl.to(
          navRef.current,
          {
            top: "0%",
            left: "0%",
            xPercent: 0,
            yPercent: 0,
            paddingInline: 24,
            paddingBlock: 16,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          logoRef.current,
          {
            width: finalSize,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          linksRef.current,
          {
            opacity: 1,
            pointerEvents: "auto",
            width: "100%",
            ease: "power2.inOut",
          },
          "-=0.3"
        );
      }
    }, 100);

    return () => clearInterval(checkHeroContainer);
  }, []);

  return (
    <nav ref={navRef} className="w-full flex items-center justify-between">
        <div
          ref={logoRef}
          className="px-3 py-1 bg-white/50 backdrop-blur-lg rounded"
          style={{ display: "block" }}
        >
          <img
            src="/images/main_logo.png"
            alt="na-logo"
            className="w-full object-contain"
            style={{ display: "block" }}
          />
        </div>
      
      <div ref={linksRef} className="flex items-center gap-4 w-full justify-end ">
        <Link
          to="/"
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
            location.pathname === "/"
              ? "bg-dark-purple text-purple-bg"
              : "bg-white/50 backdrop-blur-lg text-dark-purple hover:bg-white/70 hover:scale-105"
          }`}
        >
          Home
        </Link>
        <Link
          to="/about-us"
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
            location.pathname === "/about-us"
              ? "bg-dark-purple text-purple-bg"
              : "bg-white/50 backdrop-blur-lg text-dark-purple hover:bg-white/70 hover:scale-105"
          }`}
        >
          About Us
        </Link>
      </div>
    </nav>
  );
};

export default HomeNavBar;
