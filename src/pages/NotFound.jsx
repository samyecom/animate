import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import DefaultNavBar from "../components/DefaultNavBar";
import FooterSection from "../sections/FooterSection";

const NotFound = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(".notfound-404", {
            y: 5,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
        })
            .from(".notfound-title", {
                y: 10,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8")
            .from(".notfound-btn", {
                scale: 0.8,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, "-=0.5");

        // Floating animation for the 404 text
        gsap.to(".notfound-404", {
            y: -5,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }, { scope: containerRef });

    return (
        <main className="bg-purple-bg min-h-screen flex flex-col">
            <DefaultNavBar />

            <section
                ref={containerRef}
                className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center relative overflow-hidden"
            >
                {/* Decorative Elements */}
                <div className="absolute top-1/4 left-10 w-32 h-32 bg-dark-purple/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-dark-purple/20 rounded-full blur-3xl animate-pulse delay-700" />

                <div className="relative z-10">
                    <h1 className="notfound-404 text-[15vw] md:text-[12vw] font-black text-dark-purple leading-none tracking-tighter select-none">
                        404
                    </h1>
                    <img src="/images/404.png" className="w-full object-contain max-w-[500px] m-auto" alt="" />
                    <div className="mt-8 space-y-6">
                        <h2 className="notfound-title text-3xl md:text-5xl font-bold text-dark-purple/90 uppercase tracking-tight">
                            Page Not Found
                        </h2>

                        <p className="max-w-md mx-auto text-lg text-dark-purple/70 font-paragraph leading-relaxed">
                            The chapter you're looking for doesn't exist. Let's get you back to the academy and start your journey.
                        </p>

                        <div className="notfound-btn pt-4">
                            <Link
                                to="/"
                                className="inline-block bg-dark-purple text-purple-bg px-12 py-4 rounded-full font-bold text-xl uppercase tracking-wider hover:scale-105 transition-transform shadow-xl active:scale-95"
                            >
                                Back to Academy
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default NotFound;
