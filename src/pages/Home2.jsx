import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { cards } from "../constants";
import VideoPinSection from "../components/VideoPinSection";
import TestimonialSectionMobile from "../sections/TestimonialSectionMobile";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Section 1: Hero Section (Exact replica of Hero)
const HeroSection = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const videoRef = useRef(null);

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

  useEffect(() => {
    if (preloaderComplete && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  }, [preloaderComplete]);

  useGSAP(() => {
    if (!preloaderComplete) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
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
        }, "-=0.5")
        .from(".hero-desc, .hero-btns", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out"
        }, "-=0.3");

      gsap.to(".hero-container", {
        rotate: 7,
        scale: 0.9,
        yPercent: 30,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".hero-container",
          start: "1% top",
          end: "bottom top",
          scrub: true,
        }
      });

      gsap.to(".hero-container", {
        filter: "blur(12px)",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".hero-container",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        }
      });
    });

    mm.add("(max-width: 1024px)", () => {
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
        }, "-=0.5")
        .from(".hero-desc, .hero-btns", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out"
        }, "-=0.3");

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
    });

    return () => mm.revert();
  }, [preloaderComplete]);

  return (
    <section className="bg-black">
      <div className="hero-container">
        {isTablet ? (
          <img
            src="/images/temp-hero-bg.png"
            className="absolute bottom-40 md:bottom-0 size-full object-cover"
            alt="Hero Background"
          />
        ) : (
          <video
            ref={videoRef}
            src="/videos/hero_bg_og.mp4"
            muted
            playsInline
            loop
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="hero-content opacity-0">
          <p className="uppercase tracking-[0.3em] text-dark-purple font-bold text-sm md:text-base mb-4 font-paragraph">
            Your Brand Has a Story.
          </p>
          <div className="overflow-hidden">
            <h1 className="hero-title text-center">We Make People</h1>
          </div>
          <div
            style={{ clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" }}
            className="hero-text-scroll"
          >
            <div className="hero-subtitle">
              <h1>Listen To Your Story.</h1>
            </div>
          </div>
          <h2 className="hero-desc font-paragraph text-dark-purple text-center max-w-2xl px-5 text-base md:text-lg leading-[115%] mt-3">
            We help brands, founders and businesses turn ideas into powerful marketing, engaging content and conversations worth watching.
          </h2>
          <div className="hero-btns flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto px-6 justify-center items-center">
            <a
              href="https://wa.me/919501243534"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-dark-purple text-purple-bg hover:opacity-90 font-bold uppercase text-center py-4 px-8 rounded-full transition-all text-sm md:text-base font-sans tracking-wider hover:scale-105"
            >
              Start Your Project
            </a>
            <a
              href="#offerings"
              className="bg-white/50 backdrop-blur-md border-2 border-dark-purple text-dark-purple hover:bg-dark-purple hover:text-purple-bg font-bold uppercase text-center py-4 px-8 rounded-full transition-all text-sm md:text-base font-sans tracking-wider hover:scale-105"
              style={{ backgroundColor: "rgba(255,255,255,0.5)", color: "#a1236b", borderColor: "#a1236b" }}
            >
              Explore Our Studio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Section 2: WeInfluence Introduction (Exact replica of MessageSection)
const IntroSection = () => {
  useGSAP(() => {
    const firstMsgSplit = SplitText.create(".first-message", { type: "words" });
    const secMsgSplit = SplitText.create(".second-message", { type: "words" });
    const paragraphSplit = SplitText.create(".message-content p", {
      type: "words, lines",
      linesClass: "paragraph-line",
    });

    gsap.to(firstMsgSplit.words, {
      color: "#faeade",
      ease: "power1.in",
      stagger: 1,
      scrollTrigger: {
        trigger: ".message-content",
        start: "top 110%",
        end: "10% center",
        scrub: true,
      },
    });

    gsap.to(secMsgSplit.words, {
      color: "#faeade",
      ease: "power1.in",
      stagger: 1,
      scrollTrigger: {
        trigger: ".second-message",
        start: "top 110%",
        end: "10% center",
        scrub: true,
      },
    });

    gsap.to(".msg-text-scroll", {
      duration: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "circ.inOut",
      scrollTrigger: {
        trigger: ".msg-text-scroll",
        start: "top 100%",
        toggleActions: "restart pause reverse pause",
      }
    });

    const paragraphTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".message-content p",
        start: "top 110%",
      },
    });
    paragraphTl.from(paragraphSplit.words, {
      yPercent: 300,
      rotate: 3,
      ease: "power1.inOut",
      duration: 1,
      stagger: 0.01,
    });
  });

  return (
    <section className="message-content">
      <div className="container mx-auto flex-center py-10 lg:py-28 relative">
        <div className="w-full h-full">
          <div className="msg-wrapper">
            <p className="uppercase tracking-[0.2em] text-[#ffbac3] font-bold text-xs md:text-sm mb-2 font-paragraph normal-case">
              WeInfluence
            </p>
            <h1 className="first-message">Where Marketing Meets</h1>

            <div
              style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
              className="msg-text-scroll"
            >
              <div className="bg-purple-bg md:pb-5 pb-3 px-5">
                <h2 className="text-dark-purple">
                  <span className="text-[#f67f5d]">We</span>Influence
                </h2>
              </div>
            </div>

            <h1 className="second-message">Media.</h1>
          </div>

          <div className="flex-center md:mt-10 mt-4 flex-col gap-4">
            <div className="max-w-2xl px-10 flex-center overflow-hidden">
              <p className="text-xl">
                We bring strategy, creativity and production together to help brands get noticed, build authority and grow. From digital marketing and social media to content creation and professional podcast production, we create everything your brand needs to stay relevant in a constantly changing digital world.
              </p>
            </div>
            <a
              href="#offerings"
              className="bg-purple-bg text-dark-purple font-bold px-8 py-4 rounded hover:opacity-90 transition-opacity"
            >
              Explore Our Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Section 3: Journey / Growth (Custom styled dark card layout)
const JourneySection = () => {
  useGSAP(() => {
    gsap.from(".journey-header > *", {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".journey-header",
        start: "top 85%",
      }
    });

    const journeyCards = gsap.utils.toArray(".journey-card");
    journeyCards.forEach((card) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        }
      });
    });
  });

  const steps = [
    {
      num: "01",
      title: "Build Your Brand",
      desc: "Strategy, positioning and creative direction to give your brand a clear voice.",
      color: "border-[#f67f5d]",
      textCol: "text-[#f67f5d]",
    },
    {
      num: "02",
      title: "Create Your Content",
      desc: "From reels and campaigns to brand videos and social content, we turn ideas into things people want to see.",
      color: "border-[#ffbac3]",
      textCol: "text-[#ffbac3]",
    },
    {
      num: "03",
      title: "Start Conversations",
      desc: "Use podcasts, video and storytelling to put your expertise and brand in front of the right audience.",
      color: "border-[#faeade]",
      textCol: "text-[#faeade]",
    },
    {
      num: "04",
      title: "Grow Your Reach",
      desc: "Connect the right content with the right channels to turn attention into lasting growth.",
      color: "border-purple-300",
      textCol: "text-purple-300",
    },
  ];

  return (
    <section className="bg-[#222123] text-purple-bg py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-dark-purple/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#f67f5d]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="journey-header text-center mb-16 lg:mb-24 max-w-3xl mx-auto">
          <p className="uppercase tracking-[0.25em] text-[#ffbac3] font-bold text-xs md:text-sm mb-4 font-paragraph">
            From Idea to Influence
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-none tracking-tight mb-6">
            We Help You Build <br className="hidden md:inline" />What Comes Next.
          </h2>
          <p className="text-base md:text-lg lg:text-xl font-paragraph text-purple-bg/80 leading-relaxed">
            Whether you're launching something new, growing an established brand or looking for better ways to connect with your audience, we help turn your ideas into meaningful brand experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`journey-card group bg-[#2d2c2f] border-l-4 ${step.color} p-8 rounded-r-2xl shadow-xl hover:bg-[#343336] transition-all duration-300 hover:-translate-y-2`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className={`text-4xl font-bold font-sans ${step.textCol} tracking-tight`}>
                  {step.num}
                </span>
                <div className="w-8 h-8 rounded-full border border-purple-bg/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-purple-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-3 text-white">
                {step.title}
              </h3>
              <p className="font-paragraph text-[#faeade]/75 text-sm md:text-base leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Section 4: Advantages / Services (Exact replica of BenefitSection container and VideoPinSection)
const AdvantagesSection = () => {
  useGSAP(() => {
    gsap.from(".advantages-header > *", {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".advantages-header",
        start: "top 85%",
      }
    });

    const itemElements = gsap.utils.toArray(".advantage-item");
    itemElements.forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        }
      });
    });
  });

  const items = [
    {
      title: "Content Strategy",
      desc: "Build a smarter digital footprint with target research, brand positioning, and channel strategy.",
      badgeBg: "bg-dark-purple",
      badgeText: "text-purple-bg",
      rotateClass: "rotate-[1deg]"
    },
    {
      title: "Scripting",
      desc: "From short-form reels to long-form video campaigns, we write scripts that keep viewers hooked.",
      badgeBg: "bg-[#f67f5d]",
      badgeText: "text-purple-bg",
      rotateClass: "rotate-[-1deg]"
    },
    {
      title: "Post Production",
      desc: "Premium editing, sound engineering, color correction, and visual effects to make your content stand out.",
      badgeBg: "bg-white",
      badgeText: "text-dark-purple",
      rotateClass: "rotate-[2deg]"
    },
    {
      title: "Influencer Marketing",
      desc: "Connect with matching creators and turn partnerships into campaigns that build authority and trust.",
      badgeBg: "bg-[#ffbac3]",
      badgeText: "text-dark-purple",
      rotateClass: "rotate-[-2deg]"
    },
    {
      title: "Podcast Studio",
      desc: "A professional recording space for brands, founders, and creators to film podcasts and high-quality interviews.",
      badgeBg: "bg-dark-purple",
      badgeText: "text-[#ffbac3]",
      rotateClass: "rotate-[1.5deg]"
    },
    {
      title: "Brand & Founder Content",
      desc: "Build authority and scale your personal brand with customized founder-led content and strategic storytelling.",
      badgeBg: "bg-[#f67f5d]",
      badgeText: "text-purple-bg",
      rotateClass: "rotate-[-1.5deg]"
    }
  ];

  return (
    <section className="benefit-section">
      <div className="container mx-auto md:pt-20 pt-10 px-6 max-w-6xl">
        <div className="advantages-header text-center mb-16 max-w-3xl mx-auto">
          <p className="uppercase tracking-[0.2em] text-[#ffbac3] font-bold text-xs md:text-sm mb-4 font-paragraph text-center">
            Everything You Need to Build Influence.
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-center text-white max-w-4xl leading-tight">
            Instead of managing separate agencies, freelancers, creators and production teams, bring everything together under one roof.
          </h2>
        </div>

        <div className="flex flex-col gap-6 max-w-4xl mx-auto md:mt-20 mt-10">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`advantage-item flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 shadow-md hover:bg-white/10 transition-all duration-300`}
            >
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <span className="text-lg font-bold font-paragraph text-purple-bg/50">0{idx + 1}</span>
                <span className={`inline-block py-2 px-4 font-bold uppercase text-lg rounded-lg ${item.badgeBg} ${item.badgeText} ${item.rotateClass} shadow-sm`}>
                  {item.title}
                </span>
              </div>
              <p className="font-paragraph text-purple-bg/80 text-sm md:text-base max-w-xl md:text-right leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overlay-box mt-10 md:mt-20">
        <VideoPinSection />
      </div>
    </section>
  );
};

// Section 5: Services / Offering Cards (Exact replica of FlavorSection and FlavorSlider)
const OfferingCardsSection = () => {
  const sliderRef = useRef();

  useGSAP(() => {
    const firstTextSplit = SplitText.create(".offerings-flavor-section .first-text-split h1", {
      type: "chars",
    });
    const secondTextSplit = SplitText.create(".offerings-flavor-section .second-text-split h1", {
      type: "chars",
    });

    gsap.from(firstTextSplit.chars, {
      yPercent: 200,
      stagger: 0.02,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".offerings-flavor-section",
        start: "top 20%",
      },
    });

    gsap.to(".offerings-flavor-section .flavor-text-scroll", {
      duration: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scrollTrigger: {
        trigger: ".offerings-flavor-section",
        start: "top 10%",
      },
    });

    gsap.from(secondTextSplit.chars, {
      yPercent: 200,
      stagger: 0.02,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".offerings-flavor-section",
        start: "top 1%",
      },
    });

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      // Pull this section up over VideoPinSection pin spacer
      gsap.set(".offerings-flavor-section", { marginTop: "-140vh" });

      if (sliderRef.current) {
        const flavors = sliderRef.current.querySelector(".flavors");
        const scrollAmount = flavors.scrollWidth - window.innerWidth;

        gsap.set(flavors, {
          willChange: "transform",
          force3D: true,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".offerings-flavor-section",
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

      // Parallax scroll on titles
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".offerings-flavor-section",
          start: "top top",
          end: "bottom 80%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      titleTl
        .to(".offerings-flavor-section .first-text-split", { xPercent: -15, ease: "none", force3D: true })
        .to(".offerings-flavor-section .flavor-text-scroll", { xPercent: -22, ease: "none", force3D: true }, "<")
        .to(".offerings-flavor-section .second-text-split", { xPercent: -10, ease: "none", force3D: true }, "<");
    });

    mm.add("(max-width: 1024px)", () => {
      // Ensure margin top is reset on mobile/tablet
      gsap.set(".offerings-flavor-section", { marginTop: "0px" });

      // Mobile parallax (less intense)
      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".offerings-flavor-section",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });

      titleTl
        .to(".offerings-flavor-section .first-text-split", { xPercent: -5, ease: "none" })
        .to(".offerings-flavor-section .flavor-text-scroll", { xPercent: -8, ease: "none" }, "<")
        .to(".offerings-flavor-section .second-text-split", { xPercent: -3, ease: "none" }, "<");
    });

    return () => mm.revert();
  });

  useEffect(() => {
    const cards = document.querySelectorAll('.offerings-flavor-section .flavor-card');

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
  }, []);

  const cardsList = [
    {
      title: "Marketing",
      desc: "From strategy to execution, we create marketing that works towards real business goals.",
      image: "/images/course-bg.png",
      mainImage: "/images/Courses.png",
      elementsImg: "/images/course-elements.png",
      btnText: "Explore Marketing",
      link: "#contact",
      rotation: "md:rotate-[-8deg] rotate-0"
    },
    {
      title: "Content Studio",
      desc: "Creative content for brands that want to look better, communicate better and stand out.",
      image: "/images/coaching-bg.png",
      mainImage: "/images/Coaching.png",
      elementsImg: "/images/coaching-elements.png",
      btnText: "Explore Content",
      link: "#contact",
      rotation: "md:rotate-[8deg] rotate-0"
    },
    {
      title: "Podcast Studio",
      desc: "Record professional podcasts, interviews and video content in a studio built for modern creators and brands.",
      image: "/images/community-bg.png",
      mainImage: "/images/Community.png",
      elementsImg: "/images/community-elements.png",
      btnText: "Explore Studio",
      link: "#contact",
      rotation: "md:rotate-[-8deg] rotate-0"
    },
    {
      title: "Influence",
      desc: "Influencer campaigns, creator collaborations and founder-led storytelling designed to expand your reach.",
      image: "/images/course-bg.png",
      mainImage: "/images/Courses.png",
      elementsImg: "/images/course-elements.png",
      btnText: "Explore Influence",
      link: "#contact",
      rotation: "md:rotate-[8deg] rotate-0"
    },
    {
      title: "Additional Offering",
      desc: "Brand strategy, social media, performance marketing, video production and everything in between.",
      image: "/images/coaching-bg.png",
      mainImage: "/images/Coaching.png",
      elementsImg: "/images/coaching-elements.png",
      btnText: "Start Project",
      link: "#contact",
      rotation: "md:rotate-[-8deg] rotate-0"
    }
  ];

  return (
    <section className="flavor-section offerings-flavor-section mb-0">
      <div className="h-full flex lg:flex-row flex-col items-center relative">
        {/* Left Side: Title */}
        <div className="lg:w-[57%] flex-none h-80 lg:h-full md:mt-20 xl:mt-0">
          <div className="general-title col-center h-full 2xl:gap-32 xl:gap-24 md:gap-16 gap-4 px-5 md:px-0">
            <div className="overflow-hidden 2xl:py-0 py-3 first-text-split">
              <h1>Everything</h1>
            </div>

            <div
              style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
              className="flavor-text-scroll"
            >
              <div className="bg-dark-purple pb-5 2xl:pt-0 pt-3 2xl:px-5 px-3">
                <h2 className="text-purple-bg"><span className="text-[#ffbac3]">We</span> Influence</h2>
              </div>
            </div>

            <div className="overflow-hidden 2xl:py-0 py-3 second-text-split">
              <h1>to build growth</h1>
            </div>
          </div>
        </div>

        {/* Right Side: Slider */}
        <div className="h-full z-10 w-full lg:w-auto">
          <div ref={sliderRef} className="slider-wrapper">
            <div className="flavors pl-5 md:pl-0">
              {cardsList.map((item, idx) => (
                <div
                  key={idx}
                  className={`flavor-card relative z-30 lg:w-[50vw] w-[85vw] lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${item.rotation}`}
                >
                  <img src={item.image} alt="" className="absolute bottom-0 w-full" />
                  <img src={item.elementsImg} alt="" className="elements" />
                  <img src={`${item.mainImage}`} alt="" className="drinks" />

                  {/* Overlay with Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-8 lg:p-12 z-40 text-purple-bg select-none">
                    <div>
                      <span className="text-xs font-bold font-paragraph tracking-wider bg-white/10 px-3 py-1.5 rounded-full inline-block mb-3 lg:mb-6 backdrop-blur-sm">
                        0{idx + 1}
                      </span>
                      <h3 className="text-3xl lg:text-5xl font-bold uppercase tracking-tighter mb-2 text-white">
                        {item.title}
                      </h3>
                      <p className="font-paragraph text-[#faeade]/90 text-xs md:text-sm lg:text-base leading-relaxed max-w-sm">
                        {item.desc}
                      </p>
                    </div>

                    {item.btnText && (
                      <div>
                        <a
                          href={item.link}
                          className="inline-block bg-white text-dark-purple font-bold uppercase py-2.5 px-6 rounded-full text-xs lg:text-sm hover:scale-105 duration-300 shadow-md"
                        >
                          {item.btnText}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Section 6: Podcast / Content Feature (Custom styled layout)
const PodcastFeatureSection = () => {
  useGSAP(() => {
    gsap.from(".podcast-content > *", {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".podcast-content",
        start: "top 85%",
      }
    });

    gsap.from(".process-step", {
      opacity: 0,
      scale: 0.8,
      stagger: 0.2,
      duration: 0.6,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".process-grid",
        start: "top 85%",
      }
    });
  });

  const steps = [
    { title: "Record", desc: "Studio session with multi-cam setups.", num: "1", color: "bg-[#a1236b]" },
    { title: "Create", desc: "Edit core high-quality episodes.", num: "2", color: "bg-[#f67f5d]" },
    { title: "Repurpose", desc: "Extract clips, shorts & threads.", num: "3", color: "bg-[#ffbac3] text-dark-purple" },
    { title: "Distribute", desc: "Launch across all global platforms.", num: "4", color: "bg-[#faeade] text-dark-purple" }
  ];

  return (
    <section className="bg-purple-bg text-dark-purple py-20 lg:py-32 overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="podcast-content lg:col-span-6 flex flex-col items-start">
            <p className="uppercase tracking-[0.25em] text-[#f67f5d] font-bold text-xs md:text-sm mb-4 font-paragraph">
              One Conversation.
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-none tracking-tight mb-6">
              A Hundred Ways <br />to Influence.
            </h2>
            <p className="text-base md:text-lg lg:text-xl font-paragraph text-dark-purple/80 leading-relaxed mb-8">
              Your podcast shouldn't end when the recording stops. We help turn one conversation into an entire content ecosystem - long-form episodes, short-form videos, reels, social posts, YouTube content and more.
            </p>
            <a
              href="#contact"
              className="inline-block bg-dark-purple text-purple-bg hover:opacity-90 font-bold uppercase py-4 px-8 rounded-full text-sm font-sans tracking-wide hover:scale-105 duration-300 shadow-md"
            >
              Discover Our Podcast Studio
            </a>
          </div>

          <div className="lg:col-span-6 flex flex-col bg-white p-8 lg:p-12 rounded-3xl border border-dark-purple/10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#ffbac3]/20 rounded-bl-full pointer-events-none"></div>
            
            <h3 className="text-2xl font-bold uppercase mb-8 border-b border-dark-purple/10 pb-4">
              Podcast Process
            </h3>

            <div className="process-grid grid grid-cols-2 gap-4 lg:gap-6">
              {steps.map((s, idx) => (
                <div key={idx} className="process-step bg-[#FCEFEC]/40 border border-dark-purple/5 p-6 rounded-2xl flex flex-col justify-between hover:bg-purple-bg/10 transition-colors">
                  <div>
                    <span className={`w-8 h-8 rounded-full ${s.color} font-bold flex items-center justify-center text-sm shadow-sm mb-4`}>
                      {s.num}
                    </span>
                    <h4 className="text-xl font-bold uppercase mb-2">{s.title}</h4>
                    <p className="font-paragraph text-xs lg:text-sm text-dark-purple/70 leading-normal">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Section 7 Introduction (To avoid overlapping content in the gallery section)
const SocialProofIntro = () => {
  return (
    <section className="bg-purple-bg text-dark-purple pt-24 pb-12 px-6 relative z-30">
      <div className="container mx-auto max-w-4xl text-center">
        <p className="uppercase tracking-[0.2em] text-[#f67f5d] font-bold text-xs md:text-sm mb-4 font-paragraph">
          Ideas Worth Sharing. Stories Worth Remembering.
        </p>
        <h2 className="text-4xl md:text-6xl font-bold uppercase mb-6 leading-tight">
          What's Everyone Talking About?
        </h2>
        <p className="font-paragraph text-dark-purple/80 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8 font-medium">
          Showcase client work, podcast episodes, campaigns, social content and brand collaborations. The work we create is designed to start conversations, capture attention and keep brands in the conversation.
        </p>
        <a
          href="#contact"
          className="inline-block bg-dark-purple text-purple-bg font-bold uppercase py-3.5 px-8 rounded-full text-xs font-sans tracking-wide hover:scale-105 duration-300"
        >
          View Our Work
        </a>
      </div>
    </section>
  );
};

// Section 7: Social Proof / Talking About (Exact replica of TestimonialSection and TestimonialSectionMobile)
const SocialProofSection = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const vdRef = useRef([]);

  if (isMobile) {
    return <TestimonialSectionMobile />;
  }

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      gsap.set(".testimonials-section", { marginTop: "0px" });

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

    mm.add("(max-width: 1024px)", () => {
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

      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top 70%",
        },
      });

      mobileTl.from(".vd-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        clearProps: "all"
      });
    });

    return () => mm.revert();
  });

  const handlePlay = (index) => {
    const video = vdRef.current[index];
    if (video) video.play().catch(e => console.log(e));
  };

  const handlePause = (index) => {
    const video = vdRef.current[index];
    if (video) video.pause();
  };

  return (
    <section className="testimonials-section">
      <div className="absolute size-full flex flex-col items-center pt-[5vw] select-none pointer-events-none">
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

// Section 8: Why WeInfluence
const WhyWeInfluenceSection = () => {
  useGSAP(() => {
    const whyTextSplit = SplitText.create(".why-anim-text", { type: "words, lines" });

    gsap.from(whyTextSplit.words, {
      opacity: 0.1,
      y: 10,
      stagger: 0.04,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".why-anim-text",
        start: "top 80%",
        end: "bottom 50%",
        scrub: true,
      }
    });

    gsap.from(".key-message-box", {
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".key-message-box",
        start: "top 85%",
      }
    });
  });

  return (
    <section className="bg-dark-purple text-purple-bg py-20 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.25em] text-[#ffbac3] font-bold text-xs md:text-sm mb-4 font-paragraph">
            Why WeInfluence?
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-none tracking-tight mb-8">
            Because Marketing <br />Should Work Together.
          </h2>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <p className="why-anim-text font-paragraph text-xl md:text-2xl lg:text-3xl text-center leading-relaxed font-medium">
            Your branding shouldn't feel disconnected from your social media. Your social media shouldn't exist separately from your content. Your podcast shouldn't disappear after one episode. We connect strategy, content, production and distribution so every idea has the potential to do more.
          </p>
        </div>

        <div className="key-message-box bg-purple-bg text-dark-purple p-8 md:p-12 rounded-3xl shadow-2xl border border-[#ffbac3] max-w-3xl mx-auto text-center transform rotate-[-1.5deg]">
          <p className="uppercase tracking-[0.15em] text-[#f67f5d] font-bold text-xs mb-3 font-paragraph">
            Key Message
          </p>
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold uppercase leading-tight tracking-tight">
            One Strategy. One Creative Direction. <br />One Content Engine. One Team.
          </h3>
        </div>
      </div>
    </section>
  );
};

// Section 9: Final CTA
const FinalCTASection = () => {
  return (
    <section className="bg-[#222123] text-purple-bg py-24 lg:py-36 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-dark-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-none tracking-tight mb-6">
          Ready to Make <br />Some Noise.
        </h2>
        <p className="font-paragraph text-[#faeade]/80 text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
          Whether you're looking for a marketing partner, planning your next campaign or ready to launch your podcast, let's create something that makes an impact.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <a
            href="https://wa.me/919501243534"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-dark-purple hover:opacity-95 text-purple-bg font-bold uppercase py-4 px-8 rounded-full text-sm md:text-base font-sans tracking-wide hover:scale-105 duration-300 shadow-lg text-center"
          >
            Start a Project
          </a>
          <a
            href="#contact"
            className="border-2 border-[#ffbac3] text-[#ffbac3] hover:bg-[#ffbac3] hover:text-dark-purple font-bold uppercase py-4 px-8 rounded-full text-sm md:text-base font-sans tracking-wide hover:scale-105 duration-300 text-center"
          >
            Book the Studio
          </a>
        </div>
      </div>
    </section>
  );
};

// Section 10: Newsletter & Custom Footer (Uses footer-section class style bindings)
const NewsletterFooterSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ loading: false, message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus({ loading: true, message: "" });

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ loading: false, message: "Thanks for subscribing! ✨" });
        setEmail("");
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (error) {
      setStatus({ loading: false, message: "Oops! Please try again later." });
    }
  };

  return (
    <section id="contact" className="footer-section">
      <div className="relative pt-[8dvh] md:pt-[12vh] px-6 max-w-6xl mx-auto pb-[18vh]">
        {/* Newsletter Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-purple-bg/15">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="uppercase tracking-[0.2em] text-[#ffbac3] font-bold text-xs mb-3 font-paragraph">
              Stay In The Loop
            </span>
            <h3 className="text-3xl md:text-5xl font-bold uppercase mb-4 text-white font-sans">
              Newsletter
            </h3>
            <p className="font-paragraph text-[#faeade]/75 text-sm md:text-base leading-relaxed">
              Marketing ideas, content inspiration, podcast insights and the latest from WeInfluence - straight to your inbox.
            </p>
          </div>

          <div className="lg:col-span-6 flex items-center">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex justify-between items-center border-b border-[#faeade] py-4">
                <input
                  type="email"
                  name="entry_email_subscribe"
                  id="footer_email_2"
                  placeholder={status.loading ? "Sending..." : "Enter your email"}
                  autoComplete="email"
                  spellCheck="false"
                  required
                  value={email}
                  disabled={status.loading}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xl md:text-2xl placeholder:font-bold placeholder:tracking-tight bg-transparent border-none outline-none focus:ring-0 text-[#faeade] disabled:opacity-50 font-sans"
                />
                <button type="submit" disabled={status.loading} className="disabled:opacity-50 transition-opacity p-2 hover:scale-110 duration-200">
                  <img src="/images/arrow.svg" alt="arrow" className="cursor-pointer size-6 md:size-8" />
                </button>
              </div>
              {status.message && (
                <p className="text-sm mt-3 font-paragraph animate-pulse text-[#ffbac3]">
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Brand, explore and services footer sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-12 text-sm lg:text-base font-paragraph">
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="text-2xl font-bold uppercase text-white font-sans tracking-tight mb-4">
                WeInfluence
              </h4>
              <p className="text-[#faeade]/75 leading-relaxed text-sm">
                WeInfluence - Marketing. Content. Podcasts. Influence. Connecting strategy, production, and distribution for modern brands.
              </p>
            </div>
            
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/_weinfluence/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >
                <img src="/images/insta.svg" alt="Instagram" className="size-5" />
              </a>
              <a
                href="https://in.linkedin.com/company/weinfluence-academy"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >
                <img src="/images/linkedin.svg" alt="LinkedIn" className="size-5" />
              </a>
            </div>
          </div>

          {/* Navigation Col */}
          <div className="lg:col-span-3 lg:col-start-6">
            <h5 className="font-sans font-bold uppercase text-white text-base tracking-wider mb-6">
              Explore
            </h5>
            <ul className="flex flex-col gap-3 font-medium text-[#faeade]/80">
              <li><Link to="/about-us" className="hover:text-[#ffbac3] transition-colors">About</Link></li>
              <li><a href="#offerings" className="hover:text-[#ffbac3] transition-colors">Services</a></li>
              <li><a href="#offerings" className="hover:text-[#ffbac3] transition-colors">Our Work</a></li>
              <li><a href="#offerings" className="hover:text-[#ffbac3] transition-colors">Podcast Studio</a></li>
              <li><Link to="/course" className="hover:text-[#ffbac3] transition-colors">Insights</Link></li>
              <li><a href="#contact" className="hover:text-[#ffbac3] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services Col */}
          <div className="lg:col-span-4">
            <h5 className="font-sans font-bold uppercase text-white text-base tracking-wider mb-6">
              Services
            </h5>
            <ul className="flex flex-col gap-3 font-medium text-[#faeade]/80">
              <li><a href="#offerings" className="hover:text-[#ffbac3] transition-colors">Digital Marketing</a></li>
              <li><a href="#offerings" className="hover:text-[#ffbac3] transition-colors">Social Media</a></li>
              <li><a href="#offerings" className="hover:text-[#ffbac3] transition-colors">Content Production</a></li>
              <li><a href="#offerings" className="hover:text-[#ffbac3] transition-colors">Influencer Marketing</a></li>
              <li><a href="#offerings" className="hover:text-[#ffbac3] transition-colors">Podcast Production</a></li>
              <li><a href="#offerings" className="hover:text-[#ffbac3] transition-colors">Founder Branding</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="copyright-box">
          <p>Copyright © {new Date().getFullYear()} WeInfluence - All Rights Reserved</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-[#faeade]/60">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-[#faeade]/60">Terms of Service</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home2 = () => {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <JourneySection />
      <AdvantagesSection />
      <OfferingCardsSection />
      <PodcastFeatureSection />
      <SocialProofIntro />
      <SocialProofSection />
      <WhyWeInfluenceSection />
      <FinalCTASection />
      <NewsletterFooterSection />
    </>
  );
};

export default Home2;
