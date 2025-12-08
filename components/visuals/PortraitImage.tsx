"use client";

import React, { useState } from "react";

export function PortraitImage() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/images/IMG_0346.JPG",
    "/images/IMG_0226.JPG",
    "/images/IMG_4351.jpeg",
    "/images/pic1.JPG",
    "/images/pic2.JPG"
  ];

  const handleClick = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  return (
    <div 
      className="relative w-full h-full cursor-pointer"
      onClick={handleClick}
      title={`Click to switch image (${currentImage + 1}/${images.length})`}
    >
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Portrait ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out ${
            index === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />
      ))}
    </div>
  );
}

