import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { featureLists } from "../constants";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";

const FlavorSlider = () => {
  const sliderRef = useRef();

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    if (!isTablet && sliderRef.current) {
      const flavors = sliderRef.current.querySelector('.flavors');
      const scrollAmount = flavors.scrollWidth - window.innerWidth;

      gsap.set(flavors, { 
        willChange: "transform",
        force3D: true 
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".flavor-section",
          start: "2% top",
          end: `+=${scrollAmount + 1500}px`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(flavors, {
        x: `-${scrollAmount + 1500}px`,
        ease: "none",
        force3D: true,
      });
    }

    gsap.set([".first-text-split", ".flavor-text-scroll", ".second-text-split"], { 
      willChange: "transform",
      force3D: true 
    });

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top top",
        end: "bottom 80%",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    titleTl
      .to(".first-text-split", {
        xPercent: -15,
        ease: "none",
        force3D: true,
      })
      .to(
        ".flavor-text-scroll",
        {
          xPercent: -22,
          ease: "none",
          force3D: true,
        },
        "<"
      )
      .to(
        ".second-text-split",
        {
          xPercent: -10,
          ease: "none",
          force3D: true,
        },
        "<"
      );
  });

  useEffect(() => {
    const cards = document.querySelectorAll('.flavor-card');
    
    cards.forEach(card => {
      const drinks = card.querySelector('.drinks');
      const elements = card.querySelector('.elements');
      
      const handleMouseOver = () => {
        gsap.to(elements, {
          scale: 1.03,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(drinks, {
          scale: 1.01,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        gsap.to(elements, {
          x: deltaX * -5,
          y: deltaY * -5,
          scale: 1.03,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(drinks, {
          yPercent: deltaY * -1,
          scale: 1.01,
          duration: 0.5,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(elements, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        });

        gsap.to(drinks, {
          yPercent: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        });
      };

      card.addEventListener('mouseover', handleMouseOver);
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseover', handleMouseOver);
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, [featureLists]);

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="flavors">
        {featureLists.map((item) => {
          const CardContent = (
            <Link
              to={item.link}
              key={item.title}
              className={`flavor-card relative z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${item.rotation}`}
            >
              <img
                src={item.image}
                alt="" 
                className="absolute bottom-0 w-full"
              />

              <img
                src={item.elementsImg}
                alt=""
                className="elements"
              />

              <img
                src={`${item.mainImage}`}
                alt=""
                className="drinks"
              />

              <h1 className="text-purple-bg text-center text-6xl font-bold uppercase tracking-tighter">
                {item.title}
              </h1>
            </Link>
          );

          return CardContent;
        })}
      </div>
    </div>
  );
};

export default FlavorSlider;
