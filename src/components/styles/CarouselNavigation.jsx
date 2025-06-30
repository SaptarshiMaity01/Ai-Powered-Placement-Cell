import React from "react";
import CarouselIndicator from "../CarouselIndicator";

const CarouselNavigation = ({
  currentSlide,
  totalSlides,
  onPrevClick,
  onNextClick,
  onDotClick,
}) => {
  return (
    <nav
      className="flex gap-2 justify-center items-center self-center p-2 mt-6"
      aria-label="Carousel Navigation"
    >
      <button
        className="flex items-start self-stretch p-2 my-auto w-10"
        onClick={onPrevClick}
        aria-label="Previous slide"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6fa0a884b8484ec1c6528465284085a229364fb0?placeholderIfAbsent=true&apiKey=bb9b90b2f3554ba380c2b1bd7ac6485a"
          className="object-contain w-6 aspect-square"
          alt="Previous"
        />
      </button>

      <div
        className="flex gap-2.5 items-center self-stretch p-2 my-auto"
        role="tablist"
      >
        {Array.from({ length: totalSlides }).map((_, index) => (
          <CarouselIndicator
            key={index}
            isActive={currentSlide === index}
            onClick={() => onDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
            role="tab"
            aria-selected={currentSlide === index}
          />
        ))}
      </div>

      <button
        className="flex items-start self-stretch p-2 my-auto w-10"
        onClick={onNextClick}
        aria-label="Next slide"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/927ac142456ce40d6f4d63967e4bf6e4dddbcd0f?placeholderIfAbsent=true&apiKey=bb9b90b2f3554ba380c2b1bd7ac6485a"
          className="object-contain w-6 aspect-square"
          alt="Next"
        />
      </button>
    </nav>
  );
};

export default CarouselNavigation;
