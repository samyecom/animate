import { useRef } from "react";
import { cards } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

const TestimonialSection = () => {
  const vdRef = useRef([]);
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      gsap.set(".testimonials-section", { marginTop: "-140vh" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top bottom",
          end: "200% top",
          scrub: true,
        },
      });

      tl.to(".testimonials-section .first-title", { xPercent: 70 })
        .to(".testimonials-section .sec-title", { xPercent: 25 }, "<")
        .to(".testimonials-section .third-title", { xPercent: -50 }, "<");

      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "10% top",
          end: "200% top",
          scrub: 1.5,
          pin: true,
        },
      });

      pinTl.from(".vd-card", {
        yPercent: 150,
        stagger: 0.2,
        ease: "power1.inOut",
      });
    });

    mm.add("(max-width: 1024px)", () => {
      gsap.set(".testimonials-section", { marginTop: "0" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.to(".testimonials-section .first-title", { xPercent: 30 })
        .to(".testimonials-section .sec-title", { xPercent: 10 }, "<")
        .to(".testimonials-section .third-title", { xPercent: -20 }, "<");

      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top 70%",
        },
      });

      mobileTl.from(".vd-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        clearProps: "all"
      });
    });

    return () => mm.revert();
  });

  const handlePlay = (index) => {
    const video = vdRef.current[index];
    video.play();
  };

  const handlePause = (index) => {
    const video = vdRef.current[index];
    video.pause();
  };

  return (
    <section className="testimonials-section">
      <div className="absolute size-full flex flex-col items-center pt-[5vw]">
        <h1 className="text-black first-title">What's</h1>
        <h1 className="text-dark-purple sec-title">Everyone</h1>
        <h1 className="text-black third-title">Talking</h1>
        <h1 className="text-dark-purple sec-title">About</h1>
      </div>

      <div className="pin-box">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`vd-card ${card.translation} ${card.rotation}`}
            onMouseEnter={() => handlePlay(index)}
            onMouseLeave={() => handlePause(index)}
          >
            <video
              ref={(el) => (vdRef.current[index] = el)}
              src={card.src}
              playsInline
              muted
              loop
              className="size-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
