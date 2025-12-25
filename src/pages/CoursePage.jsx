import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { Link } from "react-router-dom";

const CoursePage = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create(".course-title", {
      type: "words",
    });

    gsap.from(titleSplit.words, {
      yPercent: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".course-title",
        start: "top 80%",
      },
    });

    const weekCards = document.querySelectorAll(".week-card");
    weekCards.forEach((card, index) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
      });
    });
  });

  const weeks = [
    {
      number: 1,
      title: "Foundations of Influencing + Content Creation Basics",
      topics: [
        "Who is an Influencer? Influencer vs UGC creator",
        "The Responsibilities of Influence & Ethical promotion",
        "Smartphone & Camera Handling",
        "Lighting & Audio Essentials",
        "Introduction to Editing Fundamentals"
      ]
    },
    {
      number: 2,
      title: "AI & Digital Tools for Creators + Storytelling & Branding",
      topics: [
        "Canva for Creators",
        "AI for Scripts & Ideas (ChatGPT, Gemini, VEO)",
        "AI for Audio & Video (ElevenLabs, Murf, OpusClip)",
        "Personal Branding & Storytelling",
        "Captions, Hooks & Engagement Scripts"
      ]
    },
    {
      number: 3,
      title: "Brand Expectations + Marketing Yourself",
      topics: [
        "Understanding Brand Campaigns",
        "Product Research & Brand Fit",
        "Growth Strategies (Organic)",
        "Growth Strategies (Paid)",
        "Building Niche Authority & Credibility"
      ]
    },
    {
      number: 4,
      title: "The Business of Influencing + Digital Foundations",
      topics: [
        "Pricing & Pitching",
        "Negotiations & Contracts",
        "Working with Agencies",
        "Digital Foundations (SEO, Analytics, Affiliate Marketing)",
        "Final Project & Graduation"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h1 className="course-title text-5xl md:text-7xl font-bold text-white mb-6">
            WeInfluence Academy
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#faeade] mb-4">
            Flagship Influencer Training Program
          </h2>
          <div className="flex flex-wrap gap-4 text-lg mb-8">
            <span className="bg-purple-bg text-dark-purple px-4 py-2 rounded font-semibold">Duration: 1 Month</span>
            <span className="bg-purple-bg text-dark-purple px-4 py-2 rounded font-semibold">20 Working Days</span>
            <span className="bg-purple-bg text-dark-purple px-4 py-2 rounded font-semibold">2 hrs/day (40 hrs total)</span>
          </div>
          <p className="text-xl text-[#faeade] font-medium">
            Format: Beginner to Collaboration-Ready Influencer
          </p>
        </div>

        <div className="space-y-8">
          {weeks.map((week) => (
            <div key={week.number} className="week-card bg-gray-900 rounded-lg p-8 border border-gray-800">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-[#a1236b] text-white font-bold text-2xl px-6 py-3 rounded flex-shrink-0">
                  Week {week.number}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white flex-1">
                  {week.title}
                </h3>
              </div>
              <ul className="space-y-3 ml-4">
                {week.topics.map((topic, index) => (
                  <li key={index} className="text-gray-300 text-lg flex items-start gap-3">
                    <span className="text-[#f67f5d] mt-2">•</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/"
            className="inline-block bg-purple-bg text-dark-purple font-bold px-8 py-4 rounded hover:opacity-90 transition-opacity"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;

