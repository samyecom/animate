import { useGSAP } from "@gsap/react";
import { flavorlists } from "../constants";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

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
        xPercent: -30,
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

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="flavors">
        <div className={`relative z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none`}
          >
           <img
              src={`/images/Course.png`}
              alt=""
              className="absolute bottom-0 w-full h-full object-contain"
            /> 
 
            <img
              src={`/images/Course.png`}
              alt=""
              className="drinks"
            />

            <img
              src={`/images/course-elements.png`}
              alt=""
              className="elements"
            />

            <h1 className="text-purple-bg text-center text-6xl font-bold uppercase tracking-tighter">Courses</h1>
          </div>
        {/* {flavorlists.map((flavor) => (
          <div
            key={flavor.name}
            className={`relative z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${flavor.rotation}`}
          >
            <img
              src={`/images/${flavor.color}-bg.svg`}
              alt=""
              className="absolute bottom-0"
            />

            <img
              src={`/images/${flavor.color}-drink.webp`}
              alt=""
              className="drinks"
            />

            <img
              src={`/images/${flavor.color}-elements.webp`}
              alt=""
              className="elements"
            />

            <h1>{flavor.name}</h1>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default FlavorSlider;
