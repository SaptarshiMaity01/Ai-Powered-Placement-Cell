"use client";
import React from "react";
import ImageCarousel from "./ImageCarousel ";

const Preview = () => {
  // Sample image URLs for the carousel
  const carouselImages = [
    "https://cdn.builder.io/api/v1/image/assets/TEMP/5ed74bc8fecf76f160bf2f909c3afb38e2f1ce86?placeholderIfAbsent=true&apiKey=bb9b90b2f3554ba380c2b1bd7ac6485a",
    "https://cdn.builder.io/api/v1/image/assets/TEMP/5ed74bc8fecf76f160bf2f909c3afb38e2f1ce86?placeholderIfAbsent=true&apiKey=bb9b90b2f3554ba380c2b1bd7ac6485a", // Duplicated for demo purposes
    "https://cdn.builder.io/api/v1/image/assets/TEMP/5ed74bc8fecf76f160bf2f909c3afb38e2f1ce86?placeholderIfAbsent=true&apiKey=bb9b90b2f3554ba380c2b1bd7ac6485a", // Duplicated for demo purposes
    "https://cdn.builder.io/api/v1/image/assets/TEMP/5ed74bc8fecf76f160bf2f909c3afb38e2f1ce86?placeholderIfAbsent=true&apiKey=bb9b90b2f3554ba380c2b1bd7ac6485a", // Duplicated for demo purposes
    "https://cdn.builder.io/api/v1/image/assets/TEMP/5ed74bc8fecf76f160bf2f909c3afb38e2f1ce86?placeholderIfAbsent=true&apiKey=bb9b90b2f3554ba380c2b1bd7ac6485a", // Duplicated for demo purposes
  ];

  return (
    <main className="flex overflow-hidden flex-col justify-center items-center px-20 py-24 bg-white max-md:px-5 max-md:pt-24">
      <div className="flex flex-col items-center w-full max-w-[1428px] max-md:max-w-full">
        <header className="flex flex-col max-w-full text-black w-[896px]">
          <h1 className="text-7xl font-bold max-md:max-w-full max-md:text-4xl">
            Simple Image Carousel
          </h1>
          <p className="self-start mt-6 text-lg leading-6 text-center max-md:max-w-full">
            5 x Image items <strong>❖ Carousel</strong>
            <br />
            Interactive Components & Variants
          </p>
        </header>

        <ImageCarousel images={carouselImages} />

        <footer className="self-stretch mt-16 text-xs leading-snug text-center text-black max-md:mt-10 max-md:max-w-full">
          <a
            href="https://clean.design"
            target="_blank"
            rel="noopener noreferrer"
          >
            clean.design{" "}
          </a>
          ®
        </footer>
      </div>
    </main>
  );
};

export default Preview;
