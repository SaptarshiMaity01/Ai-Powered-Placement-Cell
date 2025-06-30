import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "aos/dist/aos.css";
import AOS from "aos";

// Import all images
const companyLogos = [
  { id: 1, src: require("../images/image 10.png"), alt: "Company 1" },
  { id: 2, src: require("../images/image3.png"), alt: "Company 2" },
  { id: 3, src: require("../images/image 4.png"), alt: "Company 3" },
  { id: 4, src: require("../images/image 6.png"), alt: "Company 4" },
  { id: 5, src: require("../images/image 8.png"), alt: "Company 5" },
  { id: 6, src: require("../images/image 11.png"), alt: "Company 6" },
  { id: 7, src: require("../images/image 12.png"), alt: "Company 7" },
  { id: 8, src: require("../images/image 13.png"), alt: "Company 8" },
  { id: 9, src: require("../images/image 14.png"), alt: "Company 9" },
  { id: 10, src: require("../images/image 16.png"), alt: "Company 10" },
  { id: 11, src: require("../images/15.png"), alt: "Company 11" },
  { id: 12, src: require("../images/13.png"), alt: "Company 12" },
];

const FrameComponent2 = ({ className = "" }) => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <div className={`w-full bg-[#051024] text-white py-10 ${className}`}>
      <div className=" mx-auto ">
        {/* Header Section */}
        <div className="text-center mb-14 border-b pb-5">
          <h3 className="text-19xl font-roboto-serif md:text-3xl font-medium mb-6">
            Companies Hiring Our Graduates
          </h3>
          <p 
            className="text-5xl font-roboto-serif md:text-xl max-w-3xl mx-auto" 
            data-aos="zoom-in"
          >
            We are proud to partner with these esteemed companies who regularly
            recruit from our campus.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden pt-10 pb-16">
          {/* First Marquee Row */}
          <div className="mb-8">
            <div className="marquee-container">
              <div className="marquee-track">
                {[...companyLogos, ...companyLogos].map((logo, index) => (
                  <div 
                    key={`${logo.id}-${index}`} 
                    className="marquee-item"
                    data-aos="zoom-in"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-16 object-contain mx-6"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second Marquee Row (reverse direction) */}
          <div>
            <div className="marquee-container">
              <div className="marquee-track reverse">
                {[...companyLogos, ...companyLogos].map((logo, index) => (
                  <div 
                    key={`${logo.id}-${index}-reverse`} 
                    className="marquee-item"
                    data-aos="zoom-in"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-16 object-contain mx-6"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS-in-JS for the marquee effect */}
      <style jsx>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
        }
        
        .marquee-track {
          display: inline-block;
          white-space: nowrap;
          animation: scroll 40s linear infinite;
        }
        
        .marquee-track.reverse {
          animation: scrollReverse 40s linear infinite;
        }
        
        .marquee-container:hover .marquee-track,
        .marquee-container:hover .marquee-track.reverse {
          animation-play-state: paused;
        }
        
        .marquee-item {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 180px;
          height: 140px;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scrollReverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        @media (max-width: 768px) {
          .marquee-item {
            min-width: 140px;
            height: 100px;
          }
          
          img {
            height: 12px;
            margin: 0 4px;
          }
        }
      `}</style>
    </div>
  );
};

FrameComponent2.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent2;