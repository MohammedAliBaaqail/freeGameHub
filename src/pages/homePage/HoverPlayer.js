import React, { useState } from "react";

const HoverPlayer = ({ vidSrc, imgSrc }) => {
  const [isHovered, setIsHovered] = useState(false);
  let videoRef;
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef) {
      videoRef.currentTime = 0;
      videoRef.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef) {
      videoRef.pause();
      videoRef.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block", position: "relative" }}
    >
      <img
        src={imgSrc}
        alt={imgSrc}
        style={{
          width: "100%",
          height: "100%",
          display: isHovered ? "none" : "inline-block",
        }}
      />
      <video
        ref={(ref) => (videoRef = ref)}
        autoPlay
        playsInline
        muted
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: isHovered ? "inline-block" : "none",
        }}
      >
        <source src={vidSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HoverPlayer;
