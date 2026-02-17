import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { featureLists } from "../../constants";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const FlavorMobile = () => {
    const containerRef = useRef();

    useGSAP(() => {
        // Title Animation (Mobile)
        const firstTextSplit = SplitText.create(".mobile-flavor-title .first-text-split h1", { type: "chars" });
        const secondTextSplit = SplitText.create(".mobile-flavor-title .second-text-split h1", { type: "chars" });

        gsap.from(firstTextSplit.chars, {
            yPercent: 200,
            stagger: 0.02,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".mobile-flavor-title",
                start: "top 80%",
            },
        });

        gsap.from(secondTextSplit.chars, {
            yPercent: 200,
            stagger: 0.02,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".mobile-flavor-title",
                start: "top 70%",
            },
        });

        // Slider Parallax (Mobile)
        const titleTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".mobile-flavor-section",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.8,
            },
        });

        titleTl
            .to(".first-text-split", { xPercent: -5, ease: "none" })
            .to(".flavor-text-scroll", { xPercent: -8, ease: "none" }, "<")
            .to(".second-text-split", { xPercent: -3, ease: "none" }, "<");

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="mobile-flavor-section min-h-dvh bg-purple-bg mb-20 overflow-hidden">
            {/* Title Container */}
            <div className="mobile-flavor-title h-80 w-full flex flex-col justify-center gap-4 px-5">
                <div className="overflow-hidden py-3 first-text-split">
                    <h1 className="text-[14vw] font-bold uppercase leading-none tracking-tighter text-dark-purple">Beginner or pro</h1>
                </div>

                <div className="flavor-text-scroll relative rotate-[-3deg] border-[.5vw] border-purple-bg z-10 w-fit">
                    <div className="bg-dark-purple py-3 px-5">
                        <h2 className="text-purple-bg text-4xl font-bold uppercase"><span className="text-[#ffbac3]">We</span> Influence</h2>
                    </div>
                </div>

                <div className="overflow-hidden py-3 second-text-split">
                    <h1 className="text-[14vw] font-bold uppercase leading-none tracking-tighter text-dark-purple">creator journey</h1>
                </div>
            </div>

            {/* Slider Container */}
            <div className="slider-wrapper w-full mt-10">
                <div className="flavors flex flex-col gap-16 px-5 w-full items-center">
                    {featureLists.map((item) => {
                        const isExternal = item.openInNewTab || (item.link && item.link.startsWith('http'));
                        const commonProps = {
                            key: item.title,
                            className: `flavor-card relative z-30 w-full aspect-[4/5] flex-none ${item.rotation}`,
                        };

                        const content = (
                            <>
                                <img src={item.image} alt="" className="absolute bottom-0 w-full" />
                                <img src={item.elementsImg} alt="" className="absolute bottom-10 w-full scale-105" />
                                <img src={`${item.mainImage}`} alt="" className="absolute bottom-0 h-3/4 left-1/2 -translate-x-1/2" />
                                <h1 className="absolute bottom-5 left-5 text-purple-bg text-4xl font-bold uppercase tracking-tighter drop-shadow-lg">
                                    {item.title}
                                </h1>
                            </>
                        );

                        if (isExternal) {
                            return (
                                <a href={item.link} target="_blank" rel="noopener noreferrer" {...commonProps}>
                                    {content}
                                </a>
                            );
                        }

                        return (
                            <Link to={item.link} {...commonProps}>
                                {content}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FlavorMobile;
