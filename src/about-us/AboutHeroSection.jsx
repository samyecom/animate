import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const AboutHeroSection = () => {
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-intro-section",
                start: "top 90%",
                end: "bottom 30%",
                scrub: 0.5,
            },
        });

        tl.from(".about-intro-content", {
            opacity: 0,
            filter: "blur(10px)",
            y: 30,
            duration: 1,
            ease: "power2.out",
        });

        // Vision/Mission animation - cards appear together
        gsap.from(".vision-mission-card", {
            scrollTrigger: {
                trigger: ".vision-mission-section",
                start: "top 80%",
                end: "bottom 30%",
                scrub: 0.5,
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
        });
    });

    return (
        <>
            {/* About Us Introduction */}
            <section className="about-intro-section bg-purple-bg py-12 md:py-20">
                <div className="container mx-auto px-4 md:px-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="about-intro-content">
                            <h2 className="about-hero-title text-3xl md:text-5xl font-black text-dark-purple mb-6 text-center leading-tight">
                                About WeInfluence Academy
                            </h2>
                            <div className="space-y-6 text-base md:text-xl text-dark-purple/90 font-paragraph leading-relaxed">
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

            {/* Vision & Mission Section */}
            <section className="vision-mission-section bg-gradient-to-br from-purple-bg to-purple-100 py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
                            {/* Vision Card */}
                            <div className="vision-mission-card bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                <div className="flex items-center gap-4 mb-4 md:mb-6">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl md:text-4xl font-black text-dark-purple">
                                        Our Vision
                                    </h3>
                                </div>
                                <p className="text-base md:text-lg text-dark-purple/80 leading-relaxed">
                                    To be the world's leading platform for creator education, empowering millions to turn their passion into thriving careers. We envision a future where every creator has access to world-class training, mentorship, and resources to achieve their dreams.
                                </p>
                            </div>

                            {/* Mission Card */}
                            <div className="vision-mission-card bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                <div className="flex items-center gap-4 mb-4 md:mb-6">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl md:text-4xl font-black text-dark-purple">
                                        Our Mission
                                    </h3>
                                </div>
                                <p className="text-base md:text-lg text-dark-purple/80 leading-relaxed">
                                    To deliver exceptional education and support that transforms aspiring creators into industry leaders. Through innovative teaching methods, personalized coaching, and a supportive community, we help our students achieve measurable success and lasting impact.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutHeroSection;
