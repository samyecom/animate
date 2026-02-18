import { useRef, useState } from "react";
import { cards } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TestimonialMobile = () => {
    const [playingIndex, setPlayingIndex] = useState(null);
    const videoRefs = useRef([]);

    useGSAP(() => {
        // Simple fade in for the title
        gsap.from(".mobile-title h1", {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".mobile-title",
                start: "top 80%",
            }
        });

        // Staggered fade in for cards as they scroll into view
        const cards = gsap.utils.toArray(".mobile-testimonial-card");
        cards.forEach((card, i) => {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                }
            });
        });
    });

    const handlePlayToggle = (index) => {
        const video = videoRefs.current[index];
        if (!video) return;

        if (playingIndex === index) {
            // Pause if currently playing this one
            video.pause();
            setPlayingIndex(null);
        } else {
            // Pause others if playing
            if (playingIndex !== null && videoRefs.current[playingIndex]) {
                videoRefs.current[playingIndex].pause();
            }
            // Play this one
            video.play();
            setPlayingIndex(index);
        }
    };

    return (
        <section className="min-h-screen bg-purple-bg md:py-20 py-10 px-5 flex flex-col items-center overflow-hidden">
            <div className="mobile-title text-center mb-6 flex flex-col items-center">
                <h1 className="text-[12vw] font-bold uppercase text-black leading-none tracking-tighter">What's</h1>
                <h1 className="text-[12vw] font-bold uppercase text-dark-purple leading-none tracking-tighter">Everyone</h1>
                <h1 className="text-[12vw] font-bold uppercase text-black leading-none tracking-tighter">Talking</h1>
                <h1 className="text-[12vw] font-bold uppercase text-dark-purple leading-none tracking-tighter">About</h1>
            </div>

            <div className="mobile-testimonials-list w-full flex flex-col gap-4 items-center max-w-md md:pb-20 pb-0">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="mobile-testimonial-card w-full aspect-[9/16] relative rounded-3xl overflow-hidden bg-black shadow-2xl border-4 border-white"
                        onClick={() => handlePlayToggle(index)}
                    >
                        <video
                            ref={(el) => (videoRefs.current[index] = el)}
                            src={`${card.src}#t=0.1`} // Appending time to force thumbnail on some browsers
                            className="w-full h-full object-cover bg-black"
                            playsInline
                            preload="metadata" // Load metadata to show the first frame as poster
                            onEnded={() => setPlayingIndex(null)}
                        />

                        {/* Dark Gradient Overlay for readability */}
                        <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 transition-opacity duration-300 ${playingIndex === index ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} />

                        {/* Play Button Overlay */}
                        {playingIndex !== index && (
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <div className="size-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/50 shadow-lg animate-pulse">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 5V19L19 12L8 5Z" />
                                    </svg>
                                </div>
                            </div>
                        )}

                        {/* Profile Info Overlay (Bottom) */}
                        <div className={`absolute bottom-6 left-6 z-20 flex items-center gap-4 transition-opacity duration-300 ${playingIndex === index ? 'opacity-0' : 'opacity-100'}`}>
                            <div className="size-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                                <img src={card.img} alt={card.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white font-bold text-xl drop-shadow-lg tracking-wide">{card.name}</span>
                                <span className="text-white/80 text-sm font-medium uppercase tracking-wider">Student</span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialMobile;
