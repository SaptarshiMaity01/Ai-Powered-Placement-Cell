import FrameComponent3 from "./FrameComponent3";
import PropTypes from "prop-types";

const FrameComponent = ({ className = "" }) => {
  return (
    <section
      className={`h-full w-full bg-gradient-to-b from-[#caf0f8] via-[#70d5ea] to-[#0077b6] overflow-hidden flex flex-col items-start justify-start pt-[93px] px-0 pb-[101px] box-border gap-[162px] max-w-full text-left text-9xl text-white font-roboto-serif mq450:gap-10 mq450:pt-[39px] mq450:pb-[43px] mq450:box-border mq750:gap-[81px] mq1050:pt-[60px] mq1050:pb-[66px] mq1050:box-border ${className}`}
    >
      {/* Content container with max-width and centered */}
      <div className="w-full max-w-[1440px] mx-auto flex flex-col items-start justify-start py-0 pl-0 pr-5 box-border gap-[54px] mq750:gap-[27px]">
        <div className="self-stretch flex flex-col items-start justify-start gap-[26.6px] max-w-full">
          <div className="self-stretch flex flex-row items-start justify-end max-w-full">
            <h2 className="m-0 h-7 w-[681px] relative text-inherit font-normal font-[inherit] inline-block max-w-full mq450:text-3xl">
              Empowering Futures, Connecting Talent to Opportunity
            </h2>
          </div>
        </div>
        <div className="w-[350px] flex flex-row items-start justify-start py-0 px-[50px] box-border max-w-full mq450:pl-5 mq450:pr-5 mq450:box-border">
          <FrameComponent3 frame7="Get Started" />
        </div>
      </div>
      <div className="flex flex-row items-start justify-start py-0 px-12 text-5xl font-inter mq750:pl-6 mq750:pr-6 mq750:box-border">
        <h3 className="m-0 relative text-inherit font-light font-[inherit] mq450:text-lgi">
          <p className="m-0">{`Welcome to Career Launch Nexus! Your journey towards a successful career starts here. Explore our platform to access `}</p>
          <p className="m-0">{`exclusive training resources, connect with top employers, and prepare yourself for the opportunities that await. `}</p>
          <p className="m-0">
            Together, let's shape your future and turn your ambitions into
            achievements.
          </p>
        </h3>
      </div>
    </section>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;
