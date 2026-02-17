import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const FooterSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return (
    <section className="footer-section">
      {/* <img
        src="/images/footer-dip.png"
        alt=""
        className="w-full object-cover -translate-y-1"
      /> */}

      <div className="2xl:h-[110dvh] relative md:pt-[20vh] pt-[10vh]">
        <div className="overflow-hidden z-10">
          <h1 className="general-title text-center text-purple-bg py-5">
            #WEINFLUENCEACADEMY
          </h1>
        </div>

        {/* {isMobile ? (
          <img
            src="/images/footer-drink.png"
            className="absolute top-0 object-contain"
          />
        ) : (
          <video
            src="/videos/splash.mp4"
            autoPlay
            playsInline
            muted
            className="absolute top-0 object-contain mix-blend-lighten"
          />
        )} */}

        <div className="flex-center gap-5 relative z-10 md:mt-20 mt-5">
          {/* <div className="social-btn">
            <img src="/images/yt.svg" alt="YouTube" />
          </div> */}
          <a
            href="https://www.instagram.com/_weinfluence/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
          >
            <img src="/images/insta.svg" alt="Instagram" />
          </a>
          <a
            href="https://in.linkedin.com/company/weinfluence-academy"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
          >
            <img src="/images/linkedin.svg" alt="LinkedIn" />
          </a>
          {/* <div className="social-btn">
            <img src="/images/tiktok.svg" alt="TikTok" />
          </div> */}
        </div>

        <div className="mt-20 md:px-10 px-5 flex flex-col md:flex-row justify-between text-purple-bg font-paragraph md:text-lg font-medium">
          <div>
            <p className="font-bold">WeInfluence Academy</p>
            <div className="mt-4 flex flex-col gap-2">
              <Link to="/about-us" className="hover:opacity-80 transition-opacity">About Us</Link>
              <Link to="/course" className="hover:opacity-80 transition-opacity">Course</Link>
              <Link to="/privacy-policy" className="hover:opacity-80 transition-opacity">Privacy Policy</Link>
            </div>
          </div>

          <div className="md:max-w-lg mt-8 md:mt-0">
            <p>
              Get Exclusive Early Access and Stay Informed About Product
              Updates, Events, and More!
            </p>
            <div className="flex justify-between items-center border-b border-purple-bg py-5 md:mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full placeholder:font-sans placeholder:text-purple-bg"
              />
              <img src="/images/arrow.svg" alt="arrow" />
            </div>
          </div>
        </div>

        <div className="copyright-box">
          <p>Copyright © 2025 WeInfluence - All Rights Reserved</p>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
