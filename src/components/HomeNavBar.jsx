import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { HiX } from "react-icons/hi";

const HomeNavBar = () => {
  const location = useLocation();
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const burgerRef = useRef(null);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useGSAP(() => {
    if (!navRef.current || !logoRef.current || !linksRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth <= 768;
    const initialSize = isMobile ? 200 : 300;
    const finalSize = isMobile ? 150 : 160;

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

    if (burgerRef.current) {
      gsap.set(burgerRef.current, {
        opacity: 0,
        pointerEvents: "none",
      });
    }
  });

  useEffect(() => {
    const smoothWrapper = document.getElementById("smooth-wrapper");
    if (!smoothWrapper || !navRef.current || !logoRef.current || !linksRef.current) return;

    const isMobile = window.innerWidth <= 768;
    const finalSize = isMobile ? 150 : 160;
    const paddingInline = isMobile ? 8 : 24;
    const paddingBlock = isMobile ? 10 : 16;

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
            paddingInline: paddingInline,
            paddingBlock: paddingBlock,
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

        if (burgerRef.current) {
          navTl.to(
            burgerRef.current,
            {
              opacity: 1,
              pointerEvents: "auto",
              ease: "power2.inOut",
            },
            "-=0.3"
          );
        }
      }
    }, 100);

    return () => clearInterval(checkHeroContainer);
  }, []);

  useEffect(() => {
    if (sidebarRef.current && overlayRef.current) {
      if (isMenuOpen) {
        gsap.to(overlayRef.current, {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.3,
        });
        gsap.to(sidebarRef.current, {
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(overlayRef.current, {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.3,
        });
        gsap.to(sidebarRef.current, {
          x: "100%",
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (sidebarRef.current && overlayRef.current) {
      gsap.set(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
      });
      gsap.set(sidebarRef.current, {
        x: "100%",
      });
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
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
      
        <div ref={linksRef} className="flex items-center gap-4 w-full justify-end">
          <button
            ref={burgerRef}
            onClick={toggleMenu}
            className="block lg:hidden transition-all"
            aria-label="Toggle menu"
          >
            <HiMenu className="w-8 h-8 text-dark-purple stroke-1 stroke-white" />
          </button>
          <div className="menu-list hidden lg:flex items-center gap-4">
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
        </div>
      </nav>

      <div
        ref={overlayRef}
        onClick={closeMenu}
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
      ></div>

      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-lg z-50 lg:hidden shadow-2xl"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-6">
            <button
              onClick={closeMenu}
              className="p-2 bg-white/50 backdrop-blur-lg rounded-lg hover:bg-white/70 transition-all"
              aria-label="Close menu"
            >
              <HiX className="w-6 h-6 text-dark-purple" />
            </button>
          </div>
          <div className="flex flex-col px-6 gap-4">
            <Link
              to="/"
              onClick={closeMenu}
              className={`px-6 py-3 rounded-full font-semibold text-center transition-all duration-300 ${
                location.pathname === "/"
                  ? "bg-dark-purple text-purple-bg"
                  : "bg-white/50 backdrop-blur-lg text-dark-purple hover:bg-dark-purple hover:text-purple-bg"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about-us"
              onClick={closeMenu}
              className={`px-6 py-3 rounded-full font-semibold text-center transition-all duration-300 ${
                location.pathname === "/about-us"
                  ? "bg-dark-purple text-purple-bg"
                  : "bg-white/50 backdrop-blur-lg text-dark-purple hover:bg-dark-purple hover:text-purple-bg"
              }`}
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeNavBar;
