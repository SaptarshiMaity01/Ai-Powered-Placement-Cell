import FrameComponent3 from "./FrameComponent3";
import PropTypes from "prop-types";

const UnlockPotentialInnerContent = ({ className = "" }) => {
  return (
    <div
      className={`relative w-full flex flex-col items-start justify-start py-[50px] box-border  max-w-full text-left text-13xl text-black font-roboto-serif mq750:pt-[52px] mq750:pb-[52px] mq750:box-border ${className}`}
    >
      <div className="w-full max-w-[646px] flex flex-col items-start justify-start gap-12 relative z-10">
        <h1 className="m-0 w-full text-inherit leading-[37px] font-normal font-[inherit] inline-block max-w-full mq450:text-lg mq1050:text-7xl">
          Unlock the Potential of Your <br />
          Recruitment and Placement <br />
          Process
        </h1>
        <p className="m-0 text-5xl font-light font-inter mq450:text-lg">
          Discover how our cutting-edge tools and services can transform
          your hiring and career development effort. From AI-driven resume
          building to advanced candidate screening, we offer a comprehensive
          suite designed to meet the needs of both students and HR
          professionals. Explore how we can support your journey to success.
        </p>
        <FrameComponent3
          frame7="Know More"
          propFlex="unset"
          propWidth="250px"
       
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-black z-[1]" />
    </div>
  );
};

UnlockPotentialInnerContent.propTypes = {
  className: PropTypes.string,
};

export default UnlockPotentialInnerContent;
