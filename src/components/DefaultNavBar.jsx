import { Link, useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { HiMenu, HiX } from "react-icons/hi";

const DefaultNavBar = () => {
  const location = useLocation();
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);

  useGSAP(() => {
    if (!navRef.current || !logoRef.current) return;

    const isMobile = window.innerWidth <= 768;
    const logoSize = isMobile ? 96 : 160;

    gsap.set(navRef.current, {
      position: "fixed",
      top: "0%",
      left: "0%",
      zIndex: 50,
    });

    gsap.set(logoRef.current, {
      width: logoSize,
    });
  }, [location.pathname]);

  useEffect(() => {
    if (sidebarRef.current && overlayRef.current) {
      if (isMenuOpen) {
        gsap.to(overlayRef.current, { opacity: 1, pointerEvents: "auto", duration: 0.3 });
        gsap.to(sidebarRef.current, { x: 0, duration: 0.3, ease: "power2.out" });
      } else {
        gsap.to(overlayRef.current, { opacity: 0, pointerEvents: "none", duration: 0.3 });
        gsap.to(sidebarRef.current, { x: "100%", duration: 0.3, ease: "power2.in" });
      }
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (sidebarRef.current && overlayRef.current) {
      gsap.set(overlayRef.current, { opacity: 0, pointerEvents: "none" });
      gsap.set(sidebarRef.current, { x: "100%" });
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav ref={navRef} className="w-full px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div
            ref={logoRef}
            className="px-3 py-1 bg-white/50 backdrop-blur-lg rounded"
            style={{ display: "block" }}
          >
            <img
              src="/images/winfluence-logo.png"
              alt="na-logo"
              className="w-full object-contain"
              style={{ display: "block" }}
            />
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMenu}
            className="block lg:hidden transition-all"
            aria-label="Toggle menu"
          >
            <HiMenu className="w-8 h-8 text-dark-purple stroke-1 stroke-white" />
          </button>
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/"
              className={`px-6 py-2 rounded-full font-semibold transition-all ${location.pathname === "/"
                ? "bg-dark-purple text-purple-bg"
                : "bg-white/50 backdrop-blur-lg text-dark-purple hover:bg-white/70"
                }`}
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className={`px-6 py-2 rounded-full font-semibold transition-all ${location.pathname.replace(/\/$/, "") === "/about-us"
                ? "bg-dark-purple text-purple-bg"
                : "bg-white/50 backdrop-blur-lg text-dark-purple hover:bg-white/70"
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
        className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
      ></div>

      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-lg z-[70] lg:hidden shadow-2xl"
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
              className={`px-6 py-3 rounded-full font-semibold text-center transition-all duration-300 ${location.pathname === "/"
                ? "bg-dark-purple text-purple-bg"
                : "bg-white/50 backdrop-blur-lg text-dark-purple hover:bg-dark-purple hover:text-purple-bg"
                }`}
            >
              Home
            </Link>
            <Link
              to="/about-us"
              onClick={closeMenu}
              className={`px-6 py-3 rounded-full font-semibold text-center transition-all duration-300 ${location.pathname.replace(/\/$/, "") === "/about-us"
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

export default DefaultNavBar;
