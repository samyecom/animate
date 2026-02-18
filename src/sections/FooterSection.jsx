import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useState } from "react";

const FooterSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ loading: false, message: "" });

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

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
    <section className="footer-section">
      <div className="2xl:h-[110dvh] relative md:pt-[20vh] pt-[4vh]">
        <div className="overflow-hidden z-10">
          <h1 className="general-title text-center text-purple-bg py-5">
            #WEINFLUENCEACADEMY
          </h1>
        </div>

        <div className="flex-center gap-5 relative z-10 md:mt-10 mt-0">
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
        </div>

        <div className="md:mt-10 mt-6 md:px-10 px-5 flex flex-col md:flex-row justify-between text-purple-bg font-paragraph md:text-lg font-medium">
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
            <form onSubmit={handleSubmit} className="md:mt-4">
              <div className="flex justify-between items-center border-b border-purple-bg py-5">
                <input
                  type="email"
                  name="entry_email_subscribe"
                  id="footer_email"
                  placeholder={status.loading ? "Sending..." : "Enter your email"}
                  autoComplete="new-password"
                  spellCheck="false"
                  required
                  value={email}
                  disabled={status.loading}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full placeholder:font-sans placeholder:text-purple-bg focus:outline-none text-purple-bg disabled:opacity-50"
                />
                <button type="submit" disabled={status.loading} className="disabled:opacity-50 transition-opacity">
                  <img src="/images/arrow.svg" alt="arrow" className="cursor-pointer" />
                </button>
              </div>
              {status.message && (
                <p className="text-sm mt-3 font-paragraph animate-pulse">
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="copyright-box">
          <p>Copyright © {new Date().getFullYear()} WeInfluence - All Rights Reserved</p>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
