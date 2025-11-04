import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const AboutSection = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-text-section",
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1,
      },
    });

    tl.from(".about-text-content", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
    });
  });

  return (
    <section className="about-text-section bg-purple-bg py-10 md:py-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="about-text-content">
            <h2 className="text-3xl md:text-4xl font-black text-dark-purple mb-6 text-center">
              About WeInfluence Academy
            </h2>
            <div className="space-y-4 text-base md:text-lg text-dark-purple/90 font-paragraph leading-relaxed">
              <p>
                At WeInfluence Academy, we believe every creator has the potential to become legendary. Our mission is to transform aspiring professionals into industry leaders through cutting-edge education, personalized coaching, and a vibrant community of like-minded individuals.
              </p>
              <p>
                Whether you're just starting your journey or looking to take your skills to the next level, our experienced professors bring decades of real-world expertise to help you succeed. We combine innovative teaching methods with actionable strategies that deliver measurable results.
              </p>
              <p>
                Join thousands of creators who've elevated their careers through our comprehensive programs. Your journey to excellence starts here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

