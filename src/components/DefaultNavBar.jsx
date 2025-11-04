import { Link, useLocation } from "react-router-dom";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const DefaultNavBar = () => {
  const location = useLocation();
  const navRef = useRef(null);
  const logoRef = useRef(null);

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

  return (
    <nav ref={navRef} className="w-full px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center">
        <div
          ref={logoRef}
          className="px-3 py-1 bg-white/50 backdrop-blur-lg rounded"
          style={{ display: "block" }}
        >
          <img
            src="/images/main_logo.png"
            alt="logo"
            className="w-full object-contain"
            style={{ display: "block" }}
          />
        </div>
      </Link>
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            location.pathname === "/"
              ? "bg-dark-purple text-purple-bg"
              : "bg-white/50 backdrop-blur-lg text-dark-purple hover:bg-white/70"
          }`}
        >
          Home
        </Link>
        <Link
          to="/about-us"
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            location.pathname === "/about-us"
              ? "bg-dark-purple text-purple-bg"
              : "bg-white/50 backdrop-blur-lg text-dark-purple hover:bg-white/70"
          }`}
        >
          About Us
        </Link>
      </div>
    </nav>
  );
};

export default DefaultNavBar;
