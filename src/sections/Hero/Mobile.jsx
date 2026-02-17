import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText);

const HeroMobile = () => {
    const [preloaderComplete, setPreloaderComplete] = useState(false);

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

    useGSAP(() => {
        if (!preloaderComplete) return;

        // Mobile & Tablet specific animations
        const titleSplit = SplitText.create(".hero-title", { type: "chars" });
        const tl = gsap.timeline();

        tl.to(".hero-content", { opacity: 1, y: 0, ease: "power1.inOut" })
            .to(".hero-text-scroll", {
                duration: 1,
                opacity: 1,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease: "circ.out",
            }, "-=0.5")
            .from(titleSplit.chars, {
                yPercent: 200,
                opacity: 0,
                stagger: 0.02,
                ease: "power2.out",
            }, "-=0.5");

        // Reduced intensity scroll effects for mobile
        gsap.to(".hero-container", {
            scale: 0.98,
            yPercent: 5,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".hero-container",
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        });

    }, [preloaderComplete]);

    return (
        <section className="bg-black">
            <div className="hero-container">
                <>
                    <img
                        src="/images/temp-hero-bg.png"
                        className="absolute bottom-40 md:bottom-0 size-full object-cover"
                    />
                    {/* <img
              src="/images/temp-hero.png"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 object-auto h-80"
            /> */}
                </>

                <div className="hero-content opacity-0">
                    <div className="overflow-hidden">
                        <h1 className="hero-title text-center">Create Powerful<br /> & Profitable</h1>
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

export default HeroMobile;
