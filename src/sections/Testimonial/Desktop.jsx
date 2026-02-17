import { useRef } from "react";
import { cards } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const TestimonialDesktop = () => {
    const vdRef = useRef([]);

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

        // Keeping tablet/intermediate logic if needed, or it can be handled by Mobile view if > 768px is considered desktop
        // For now, removing the specific "max-width: 1024px" block that was bridging the gap, 
        // assuming the Mobile component handles < 768px and this handles everything else.
        // However, if there's a tablet range (768-1024) that needs specific handling, we can keep it.
        // Let's keep a simplified version for tablet (768px - 1024px) if widely used, 
        // OR just rely on the main desktop logic adapting. 

        // Check original code: The original code had a (max-width: 1024px) block. 
        // Since we are splitting mainly for Mobile (< 768), Tablet (768-1024) technically falls into "Desktop" (or non-mobile) territory in this binary split.
        // So I will include the tablet logic here too.

        mm.add("(min-width: 769px) and (max-width: 1024px)", () => {
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

            // Tablet specific animation (similar to old mobile but adapted)
            const tabletTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".testimonials-section",
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: 1,
                },
            });

            tabletTl.from(".vd-card", {
                yPercent: 100,
                stagger: 0.2,
                ease: "power1.inOut",
            });
        });

        return () => mm.revert();
    });

    const handlePlay = (index) => {
        const video = vdRef.current[index];
        if (video) video.play();
    };

    const handlePause = (index) => {
        const video = vdRef.current[index];
        if (video) video.pause();
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

export default TestimonialDesktop;
