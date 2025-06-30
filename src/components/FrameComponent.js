import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Aurora from './styles/Aurora';
import FrameComponent3 from "./FrameComponent3";
import image1 from "../images/download.jpg";
import image2 from "../images/image.png";
import image3 from "../images/image18.jpg";

const FrameComponent = ({ className = "" }) => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#030a1c]">
      {/* Aurora background - full screen with vibrant colors */}
      <div className="absolute inset-0 overflow-hidden">
        <Aurora
          colorStops={["#00d8ff", "#7cff67", "#00d8ff"]}
          blend={0.85}
          amplitude={1.2}
          speed={0.5}
          size={{ width: "100%", height: "100%" }}
          className="h-full w-full opacity-90"
        />
      </div>
      
      {/* Content container with relative positioning */}
      <section className={`relative h-full w-full flex flex-col  items-start justify-start pt-[93px] px-20 pb-[20px] box-border gap-[162px] max-w-full text-left text-9xl text-white font-roboto-serif mq450:p-5 mq450:gap-10 mq450:pt-[20px] mq450:pb-[20px] mq750:gap-[81px] mq1050:pt-[60px] mq1050:pb-[66px] ${className}`}>
        <div className="w-full mx-auto flex flex-col items-start justify-start py-0 pl-0 box-border gap-[54px] mq750:gap-[27px] ">
          {/* Title section */}
          <div className="self-stretch flex flex-col items-start justify-start gap-[26.6px] max-w-full">
            <h1 className="m-0 text-96xl mq450:text-48xl mq750:text-64xl text-white drop-shadow-lg">
              Career Launch <br />
              Nexus
            </h1>
            <h2 className="m-0 text-inherit font-normal max-w-full mq450:text-3xl text-white/90 drop-shadow-lg">
              Empowering Futures, Connecting Talent to Opportunity
            </h2>
          </div>

          {/* Get Started button */}
          <Link to="/SignUp" className="w-[250px] flex flex-row items-start justify-start py-0  box-border max-w-full mq450:box-border mq450:w-[150px] mq450:h-[50px] mt-[10px] mq450:mt-[20px]">
            <FrameComponent3 frame7="Get Started" />
          </Link>

          {/* User testimonials */}
          <div className="flex flex-col ">
            <div className="flex gap-1 items-center">
              {[image1, image2, image3, image1, image2].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  width="128"
                  height="128"
                  className={`rounded-full border-2 border-solid border-white/30 h-9 w-9 relative ${index > 0 ? '-ml-4' : ''} drop-shadow-lg`}
                  alt={`User ${index + 1}`}
                />
              ))}
              
              <div className="flex items-center gap-1 ml-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 w-4 drop-shadow-lg">
                    <svg
                      viewBox="64 64 896 896"
                      className="w-full h-full text-yellow-400 fill-yellow-400"
                    >
                      <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm max-w-sm text-white/80 mt-3 drop-shadow-lg">
              1000+ from happy users
            </p>
          </div>

          {/* Description */}
          <div className="flex flex-row items-start justify-start text-5xl mq750:box-border ">
            <h3 className="mt-0 font-light mq450:text-lgi text-white/90 leading-relaxed">
              Welcome to Career Launch Nexus! Your journey towards a successful
              career starts here. Explore our platform to access exclusive training resources,
              connect with top employers, and prepare yourself for the opportunities that await.
              Together, let's shape your future and turn your ambitions into achievements.
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;

