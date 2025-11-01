import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useRef, useState } from "react";

const AdaptiveLogo = ({ className }) => {
  const svgRef = useRef(null);
  const [logoColor, setLogoColor] = useState("#222123");

  useGSAP(() => {
    if (!svgRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const sections = [
      {
        selector: ".hero-container",
        lightColor: "#a1236b",
        darkColor: "#FCEFEC",
      },
      {
        selector: ".message-content",
        lightColor: "#FCEFEC",
        darkColor: "#a1236b",
      },
      {
        selector: ".flavor-section",
        lightColor: "#a1236b",
        darkColor: "#FCEFEC",
      },
      {
        selector: ".benefit-section",
        lightColor: "#FCEFEC",
        darkColor: "#222123",
      },
      {
        selector: ".testimonials-section",
        lightColor: "#a1236b",
        darkColor: "#FCEFEC",
      },
      {
        selector: ".footer-section",
        lightColor: "#FCEFEC",
        darkColor: "#222123",
      },
    ];

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section.selector,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          const element = document.querySelector(section.selector);
          if (element) {
            const bgColor = window.getComputedStyle(element).backgroundColor;
            const rgb = bgColor.match(/\d+/g);
            
            if (rgb) {
              const isDark = 
                (parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2])) < 400 ||
                bgColor.includes("rgb(34, 33, 35)") ||
                bgColor.includes("rgb(161, 35, 107)");

              const newColor = isDark ? section.lightColor : section.darkColor;
              setLogoColor(newColor);

              if (svgRef.current) {
                const paths = svgRef.current.querySelectorAll("path.fil1, path.fil2, path.fil3, .fil4");
                paths.forEach((path) => {
                  gsap.to(path, {
                    attr: { fill: newColor },
                    duration: 0.6,
                    ease: "power2.inOut",
                  });
                });
              }
            }
          }
        },
        onEnterBack: () => {
          const element = document.querySelector(section.selector);
          if (element) {
            const bgColor = window.getComputedStyle(element).backgroundColor;
            const rgb = bgColor.match(/\d+/g);
            
            if (rgb) {
              const isDark = 
                (parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2])) < 400 ||
                bgColor.includes("rgb(34, 33, 35)") ||
                bgColor.includes("rgb(161, 35, 107)");

              const newColor = isDark ? section.lightColor : section.darkColor;
              setLogoColor(newColor);

              if (svgRef.current) {
                const paths = svgRef.current.querySelectorAll("path.fil1, path.fil2, path.fil3, .fil4");
                paths.forEach((path) => {
                  gsap.to(path, {
                    attr: { fill: newColor },
                    duration: 0.6,
                    ease: "power2.inOut",
                  });
                });
              }
            }
          }
        },
      });
    });
  });

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 7238.54 1783.12"
      className={className}
    >
      {/* Paste your SVG code here - everything inside <svg> tag except the opening <svg> itself */}
    </svg>
  );
};

export default AdaptiveLogo;
