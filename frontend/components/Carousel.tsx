// components/Carousel.tsx

import React, { useState, useEffect, useRef } from "react";

const images = [
  { src: "/event1.webp", caption: "Aggie Gala Night" },
  { src: "/event1.webp", caption: "Aggie Community Fair" },
  { src: "/event1.webp", caption: "Tech & Innovation Expo" },
  { src: "/event1.webp", caption: "Spring Arts Festival" },
  { src: "/event1.webp", caption: "Music Fest" },
  { src: "/event1.webp", caption: "Art Expo" },
  { src: "/event1.webp", caption: "Summer Fest" },
];

const Carousel: React.FC = () => {
  const visibleCards = 3;
  const totalItems = images.length;
  const totalSlides = totalItems + visibleCards * 2; // Including clones
  const [currentIndex, setCurrentIndex] = useState(visibleCards); // Start on the first real slide
  const trackRef = useRef<HTMLDivElement>(null);

  // Clone images at the start and end
  const extendedImages = [
    ...images.slice(-visibleCards),
    ...images,
    ...images.slice(0, visibleCards),
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const slideWidth = track?.children[0]?.clientWidth ?? 0;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

    // Infinite scroll effect
    if (currentIndex === totalSlides - visibleCards) {
      // If at the last cloned slide, jump to the original start
      setTimeout(() => {
        track.style.transition = "none";
        setCurrentIndex(visibleCards);
        track.style.transform = `translateX(${-slideWidth * visibleCards}px)`;
      }, 500); // Timeout matches transition duration
    } else if (currentIndex === 0) {
      // If at the first cloned slide, jump to the original end
      setTimeout(() => {
        track.style.transition = "none";
        setCurrentIndex(totalItems);
        track.style.transform = `translateX(${-slideWidth * totalItems}px)`;
      }, 500); // Timeout matches transition duration
    }
  }, [currentIndex, totalSlides]);

  return (
    <div className="relative w-full max-w-5xl mx-auto py-8">
      {/* Left Arrow Outside Carousel */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 transform -translate-y-1/2 -left-12 bg-[rgba(255,255,255,0.8)] text-black p-3 w-12 h-12 rounded-full hover:bg-opacity-80 transition z-10 text-3xl font-light pl-4 scale-x-[-1]"
      >
        <img
          src={"/arrow.png"}
          alt={"left arrow"}
          className="w-2/3"
        />
      </button>

      {/* Carousel Container */}
      <div className="mx-7 p-0 lg:px- md:px-10 sm:px-10">
        {/* Carousel Track */}
        <div
          className="flex transition-transform duration-500"
          ref={trackRef}
          style={{ width: `${(totalSlides / visibleCards) * 100}%` }}
        >
          {extendedImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / visibleCards}%` }}
            >
              <img
                src={image.src}
                alt={image.caption}
                className="w-full h-80 object-cover rounded-lg"
              />
              <p className="text-center text-gray-900 mt-4 font-semibold text-lg">
                {image.caption}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow Outside Carousel */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 transform -translate-y-1/2 -right-12 bg-[rgba(255,255,255,0.8)] text-black p-3 w-12 h-12 rounded-full hover:bg-opacity-80 transition z-10 text-3xl font-light pl-4"
      >
        <img
          src={"/arrow.png"}
          alt={"right arrow"}
          className="w-2/3"
        />
      </button>
    </div>
  );
};

export default Carousel;
