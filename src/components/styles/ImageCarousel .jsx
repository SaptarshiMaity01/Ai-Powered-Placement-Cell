"use client";
import React, { useState } from "react";
import CarouselNavigation from "./CarouselNavigation";

const ImageCarousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevClick = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextClick = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section
      className="flex flex-col px-16 py-10 mt-16 w-full min-h-[560px] max-md:px-5 max-md:mt-10 max-md:max-w-full"
      aria-label="Image Carousel"
    >
      <div className="relative flex-1 w-full">
        <img
          src={images[currentSlide]}
          className="object-contain flex-1 w-full aspect-[3.25] max-md:max-w-full"
          alt={`Slide ${currentSlide + 1}`}
        />
      </div>

      <CarouselNavigation
        currentSlide={currentSlide}
        totalSlides={images.length}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
        onDotClick={handleDotClick}
      />
    </section>
  );
};

export default ImageCarousel;
