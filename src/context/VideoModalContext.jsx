import { createContext, useContext, useState } from "react";

const VideoModalContext = createContext();

export const useVideoModal = () => {
  const context = useContext(VideoModalContext);
  if (!context) {
    throw new Error("useVideoModal must be used within VideoModalProvider");
  }
  return context;
};

export const VideoModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  const openModal = (src) => {
    setVideoSrc(src);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setVideoSrc("");
  };

  return (
    <VideoModalContext.Provider value={{ isOpen, videoSrc, openModal, closeModal }}>
      {children}
    </VideoModalContext.Provider>
  );
};
