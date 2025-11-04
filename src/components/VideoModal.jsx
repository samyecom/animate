import { useRef, useEffect } from "react";
import { ScrollSmoother } from "gsap/all";

const VideoModal = ({ isOpen, onClose, videoSrc }) => {
  const videoModalRef = useRef(null);

  useEffect(() => {
    if (isOpen && videoModalRef.current) {
      videoModalRef.current.play();
    } else if (!isOpen && videoModalRef.current) {
      videoModalRef.current.pause();
      videoModalRef.current.currentTime = 0;
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      
      const smoothWrapper = document.getElementById("smooth-wrapper");
      if (smoothWrapper) {
        smoothWrapper.style.overflow = "hidden";
        smoothWrapper.style.pointerEvents = "none";
      }

      const smoother = ScrollSmoother?.get();
      if (smoother) {
        smoother.paused(true);
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
      
      const smoothWrapper = document.getElementById("smooth-wrapper");
      if (smoothWrapper) {
        smoothWrapper.style.overflow = "unset";
        smoothWrapper.style.pointerEvents = "auto";
      }

      const smoother = ScrollSmoother?.get();
      if (smoother) {
        smoother.paused(false);
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white/30 backdrop-blur-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
          aria-label="Close video"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <video
          ref={videoModalRef}
          src={videoSrc}
          controls
          autoPlay
          playsInline
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

export default VideoModal;
