import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState, useRef } from "react";

const HeroSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handlePreloaderComplete = () => {
      setPreloaderComplete(true);
    };

    window.addEventListener("preloaderComplete", handlePreloaderComplete);

    const preloader = document.querySelector(".preloader");
    if (!preloader) {
      setPreloaderComplete(true);
    }

    return () => {
      window.removeEventListener("preloaderComplete", handlePreloaderComplete);
    };
  }, []);

  useEffect(() => {
    if (preloaderComplete && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  }, [preloaderComplete]);

  useGSAP(() => {
    if (!preloaderComplete) return;

    const titleSplit = SplitText.create(".hero-title", {
      type: "chars",
    });

    const tl = gsap.timeline();

    tl.to(".hero-content", {
      opacity: 1,
      y: 0,
      ease: "power1.inOut",
    })
      .to(
        ".hero-text-scroll",
        {
          duration: 1,
          opacity: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "circ.out",
        },
        "-=0.5"
      )
      .from(
        titleSplit.chars,
        {
          yPercent: 200,
          opacity: 0,
          stagger: 0.02,
          ease: "power2.out",
        },
        "-=0.5"
      );

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-container",
        start: "1% top",
        end: "bottom top",
        scrub: true,
      },
    });
    heroTl.to(".hero-container", {
      rotate: 7,
      scale: 0.9,
      yPercent: 30,
      ease: "power1.inOut",
    });

    const blurTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-container",
        start: "top top",
        end: "bottom top",
        scrub:1.2,
      },
    });
    blurTl.to(".hero-container", {
      filter: "blur(12px)",
      ease: "power2.inOut",
    });
  }, [preloaderComplete]);

  return (
    <section className="bg-black">
      <div className="hero-container">
        {isTablet ? (
          <>
            <img
              src="/images/temp-hero-bg.png"
              className="absolute bottom-40 md:bottom-0 size-full object-cover"
            />
            <img
              src="/images/temp-hero.png"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 object-auto"
            />
          </>
        ) : (
          <video
            ref={videoRef}
            src="/videos/hero_bg_vd.mp4"
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="hero-content opacity-0">
          <div className="overflow-hidden">
            <h1 className="hero-title text-center">Create Powerful<br/> & Profitable</h1>
          </div>
          <div
            style={{
              clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
            }}
            className="hero-text-scroll"
          >
            <div className="hero-subtitle">
              <h1> Portfolios</h1>
            </div>
          </div>
          <a
            href="https://wa.me/YOUR_PHONE_NUMBER"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-button"
          >
            <p>Get In Touch</p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
