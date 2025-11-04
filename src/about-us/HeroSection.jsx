import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import AboutSection from "./AboutSection";

const AboutUsHeroSection = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create(".about-hero-title", {
      type: "chars",
    });

    const subtitleSplit = SplitText.create(".about-hero-subtitle", {
      type: "chars",
    });

    const tl = gsap.timeline({
      delay: 1,
    });

    tl.to(".about-hero-content", {
      opacity: 1,
      y: 0,
      ease: "power1.inOut",
    })
      .from(
        titleSplit.chars,
        {
          yPercent: 200,
          opacity: 0,
          stagger: 0.02,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .from(
        subtitleSplit.chars,
        {
          yPercent: 100,
          opacity: 0,
          stagger: 0.01,
          ease: "power2.out",
        },
        "-=0.3"
      );

  });

  return (
    <>
      <section className="about-hero-section bg-purple-bg pt-5">
      </section>
      <AboutSection />
    </>
  );
};

export default AboutUsHeroSection;


