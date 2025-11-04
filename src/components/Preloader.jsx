import { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

const Preloader = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const preloaderRef = useState(null)[0];

  useEffect(() => {
    setIsVisible(true);
    
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      gsap.set(preloader, {
        opacity: 1,
        display: "block",
      });
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  useGSAP(() => {
    if (!isVisible) {
      const preloader = document.querySelector(".preloader");
      if (preloader) {
        gsap.to(preloader, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            preloader.style.display = "none";
            window.dispatchEvent(new CustomEvent("preloaderComplete"));
          },
        });
      }
    }
  }, [isVisible]);

  return (
    <div
      className="preloader fixed inset-0 z-[9999] flex-center bg-purple-bg"
      ref={preloaderRef}
    >
      <div className="flex items-center justify-center gap-2 h-full w-full">
        <span className="text-dark-purple text-2xl md:text-4xl font-bold uppercase">
          loading
        </span>
        <span className="blinking-dot text-dark-purple text-2xl md:text-4xl font-bold">
          .
        </span>
      </div>
    </div>
  );
};

export default Preloader;
