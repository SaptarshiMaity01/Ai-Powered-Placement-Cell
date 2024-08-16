import FrameComponent3 from "./FrameComponent3";
import PropTypes from "prop-types";

const UnlockPotentialInnerContent = ({ className = "" }) => {
  return (
    <div
      className={`w-[1125px] flex flex-row items-start justify-end py-20 px-0 box-border relative min-h-[923px] max-w-full text-left text-13xl text-black font-roboto-serif mq750:pt-[52px] mq750:pb-[52px] mq750:box-border ${className}`}
    >
      <div className="w-[646px] !m-[0] absolute bottom-[0px] left-[0px] flex flex-row items-start justify-start max-w-full">
        <div className="w-[433.5px] flex flex-row items-start justify-start gap-[3.5px] max-w-full">
          <div className="flex-1 flex flex-col items-start justify-start pt-[94.5px] px-0 pb-0 box-border max-w-[calc(100%_-_5px)]">
            <div className="self-stretch flex flex-col items-start justify-start gap-[69px] max-w-full">
              <div className="self-stretch flex flex-row items-start justify-start py-0 pl-0.5 pr-0 box-border max-w-full">
                <div className="flex-1 flex flex-col items-start justify-start gap-12 max-w-full">
                  <h1 className="m-0 w-[408px] h-24 relative text-inherit leading-[37px] font-normal font-[inherit] inline-block max-w-full mq450:text-lgi mq1050:text-7xl">
                    <p className="m-0">{`Unlock the Potential of Your `}</p>
                    <p className="m-0">{`Recruitment and Placement `}</p>
                    <p className="m-0">Process</p>
                  </h1>
                  <h3 className="m-0 relative text-5xl font-light font-inter mq450:text-lgi">
                    <p className="m-0">{`Discover how our cutting-edge `}</p>
                    <p className="m-0">{`tools and services can transform `}</p>
                    <p className="m-0">{`your hiring and career development `}</p>
                    <p className="m-0">
                      effort. From AI-driven resume building
                    </p>
                    <p className="m-0">to advanced candidate screening,</p>
                    <p className="m-0">{`we offer a comprehensive suite `}</p>
                    <p className="m-0">{`designed to meet the needs of both `}</p>
                    <p className="m-0">{`students and HR professionals. `}</p>
                    <p className="m-0">{`Explore how we can support `}</p>
                    <p className="m-0">your journey to success.</p>
                  </h3>
                </div>
              </div>
              <FrameComponent3
                frame7="Get Started"
                propFlex="unset"
                propWidth="250px"
              />
            </div>
          </div>
          <img
            className="h-[922.5px] w-0.5 relative object-contain"
            loading="lazy"
            alt=""
            src="/line-10.svg"
          />
        </div>
      </div>
      <div className="h-full w-[213px] !m-[0] absolute top-[0px] right-[0px] bottom-[0px] flex flex-row items-start justify-start">
        <div className="self-stretch w-px relative border-black border-r-[1px] border-solid box-border z-[1]" />
      </div>
      <div className="w-[624px] flex flex-col items-start justify-start gap-[393px] max-w-full text-5xl mq450:gap-[98px] mq750:gap-[196px]">
        <div className="self-stretch flex flex-row items-start justify-start py-0 pl-3.5 pr-0 box-border max-w-full">
          <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-5 mq450:flex-wrap">
            <div className="flex flex-col items-start justify-start gap-[22px]">
              <div className="w-[30px] h-[30px] relative rounded-[50%] bg-black" />
              <h3 className="m-0 relative text-inherit font-medium font-[inherit] mq450:text-lgi">
                SERVICE 1
              </h3>
            </div>
            <div className="flex flex-col items-start justify-start gap-[22px]">
              <div className="w-[30px] h-[30px] relative rounded-[50%] bg-black" />
              <h3 className="m-0 relative text-inherit font-medium font-[inherit] mq450:text-lgi">
                SERVICE 2
              </h3>
            </div>
          </div>
        </div>
        <div className="w-[591px] flex flex-row items-start justify-between gap-5 max-w-full mq450:flex-wrap">
          <div className="flex flex-col items-start justify-start gap-[21px]">
            <div className="flex flex-row items-start justify-start py-0 px-3.5">
              <div className="h-[30px] w-[30px] relative rounded-[50%] bg-black" />
            </div>
            <h3 className="m-0 relative text-inherit font-medium font-[inherit] mq450:text-lgi">
              SERVICE 3
            </h3>
          </div>
          <div className="flex flex-col items-start justify-start gap-[21px]">
            <div className="flex flex-row items-start justify-start py-0 px-[33px]">
              <div className="h-[30px] w-[30px] relative rounded-[50%] bg-black" />
            </div>
            <h3 className="m-0 relative text-inherit font-medium font-[inherit] mq450:text-lgi">
              SERVICE 4
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

UnlockPotentialInnerContent.propTypes = {
  className: PropTypes.string,
};

export default UnlockPotentialInnerContent;