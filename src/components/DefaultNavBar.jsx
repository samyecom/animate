import { Link } from "react-router-dom";

const DefaultNavBar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="/images/main_logo.png"
            alt="logo"
            className="h-12 object-contain"
          />
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-dark-purple font-semibold hover:text-dark-purple/80 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about-us"
            className="text-dark-purple font-semibold hover:text-dark-purple/80 transition-colors"
          >
            About Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default DefaultNavBar;
