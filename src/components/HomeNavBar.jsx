import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useRef, useEffect } from "react";

const HomeNavBar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);

  useGSAP(() => {
    if (!navRef.current || !logoRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth <= 768;
    const initialSize = 300;
    const finalSize = isMobile ? 96 : 160;
    const finalPadding = isMobile ? 12 : 36;

    gsap.set(navRef.current, {
      position: "fixed",
      top: "0%",
      left: "50%",
      xPercent: -50,
      yPercent: 20,
      zIndex: 50,
    });

    gsap.set(logoRef.current, {
      width: initialSize,
    });
  });

  useEffect(() => {
    const smoothWrapper = document.getElementById("smooth-wrapper");
    if (!smoothWrapper || !navRef.current || !logoRef.current) return;

    const isMobile = window.innerWidth <= 768;
    const finalSize = isMobile ? 96 : 160;
    const finalPadding = isMobile ? 12 : 36;

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
            padding: finalPadding,
            ease: "power2.inOut",
          },
          0
        ).to(
          logoRef.current,
          {
            width: finalSize,
            ease: "power2.inOut",
          },
          0
        );
      }
    }, 100);

    return () => clearInterval(checkHeroContainer);
  }, []);

  return (
    <nav ref={navRef}>
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
    </nav>
  );
};

export default HomeNavBar;
