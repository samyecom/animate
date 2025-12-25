import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { Link } from "react-router-dom";

const MessageSection = () => {
  useGSAP(() => {
    const firstMsgSplit = SplitText.create(".first-message", {
      type: "words",
    });
    const secMsgSplit = SplitText.create(".second-message", {
      type: "words",
    });
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

    const revealTl = gsap.timeline({
      delay: 0.2,
      scrollTrigger: {
        trigger: ".msg-text-scroll",
        start: "top 100%",
        toggleActions: "restart pause reverse pause",
      },
    });
    revealTl.to(".msg-text-scroll", {
      duration: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "circ.inOut",
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
      <div className="container mx-auto flex-center py-28 relative">
        <div className="w-full h-full">
          <div className="msg-wrapper">
            <h1 className="first-message">From creators to professionals</h1>

            <div
              style={{
                clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
              }}
              className="msg-text-scroll "
            >
              <div className="bg-purple-bg md:pb-5 pb-3 px-5">
                <h2 className="text-dark-purple"><span className="text-[#f67f5d]">We</span> Influence</h2>
              </div>
            </div>
            <h1 className="second-message">
            Academy is where every creator levels up
            </h1>
          </div>

          <div className="flex-center md:mt-20 mt-10 flex-col gap-6">
            <div className="max-w-md px-10 flex-center overflow-hidden">
              <p>
              No matter where you are in your creator journey, WeInfluence helps you grow, learn, and lead.
              </p>
            </div>
            <Link
              to="/course"
              className="bg-purple-bg text-dark-purple font-bold px-8 py-4 rounded hover:opacity-90 transition-opacity"
            >
              Explore Our Course
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
