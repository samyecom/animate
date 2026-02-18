import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import AboutHeroSection from "./AboutHeroSection";

gsap.registerPlugin(SplitText);

const AboutUsHeroSection = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create(".about-hero-title", {
      type: "words,chars",
    });

    const tl = gsap.timeline({
      delay: 0.5,
    });

    tl.from(".about-hero-content", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
    })
      .from(
        titleSplit.chars,
        {
          yPercent: 100,
          opacity: 0,
          stagger: 0.05,
          ease: "power3.out",
          duration: 0.8,
        },
        "-=0.7"
      )
      .to(
        ".about-hero-text-scroll",
        {
          duration: 1.2,
          opacity: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "circ.out",
        },
        "-=0.6"
      );

    return () => {
      titleSplit.revert();
    };
  });

  return (
    <>
      <AboutHeroSection />
    </>
  );
};

export default AboutUsHeroSection;


