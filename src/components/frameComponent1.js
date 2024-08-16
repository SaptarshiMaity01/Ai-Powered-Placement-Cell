import { Button } from "@mui/material";
import FrameComponent4 from "./FrameComponent4";
import FrameComponent3 from "./FrameComponent3";
import PropTypes from "prop-types";

const FrameComponent1 = ({ className = "" }) => {
  return (
    <section
      className={`w-[1394px] flex flex-col items-end justify-start pt-0 pb-[53px] pl-[22px] pr-5 box-border gap-[52px] max-w-full text-left text-xl text-black font-roboto-serif lg:pb-[34px] lg:box-border mq750:gap-[26px] mq750:pb-[22px] mq750:box-border ${className}`}
    >
      <div className="self-stretch flex flex-row items-start justify-end py-0 px-7 box-border max-w-full">
        <div className="w-[1347px] flex flex-row items-end justify-start gap-[46px] max-w-[104%] shrink-0 lg:flex-wrap mq750:gap-[23px]">
          <div className="flex-1 flex flex-row items-end justify-start min-w-[501px] max-w-full mq750:min-w-full">
            <div className="flex-1 flex flex-col items-start justify-start max-w-full shrink-0">
              <div className="self-stretch h-[633px] overflow-hidden shrink-0 flex flex-col items-start justify-start pt-4 px-0 pb-[53px] box-border gap-[53px] max-w-full z-[3] mq450:gap-[26px] mq750:pt-5 mq750:pb-[34px] mq750:box-border">
                <div className="flex flex-row items-start justify-start pt-0 px-[47px] pb-[11px]">
                  <div className="relative leading-[24px] inline-block min-w-[110px] mq450:text-base">
                    ABOUT US
                  </div>
                </div>
                <div className="w-[747px] flex flex-row items-start justify-start pt-0 px-[50px] pb-[14.5px] box-border max-w-full shrink-0 text-21xl mq750:pl-[25px] mq750:pr-[25px] mq750:box-border">
                  <h1 className="m-0 flex-1 relative text-inherit font-medium font-[inherit] inline-block max-w-full mq450:text-5xl mq1050:text-13xl">
                    <p className="m-0">{`Building Bridges Between Talent `}</p>
                    <p className="m-0">and Opportunity</p>
                  </h1>
                </div>
                <div className="self-stretch flex flex-row items-start justify-end py-0 px-4 box-border max-w-full shrink-0 text-5xl">
                  <div className="w-[698px] flex flex-col items-start justify-start gap-[51.5px] max-w-full mq750:gap-[26px]">
                    <h3 className="m-0 self-stretch h-[196px] relative text-inherit font-medium font-[inherit] inline-block mq450:text-lgi">
                      <p className="m-0">{`Welcome to T&P Nexus where passion meets `}</p>
                      <p className="m-0">{`purpose. We are dedicated to connecting `}</p>
                      <p className="m-0">{`students with career opportunities through `}</p>
                      <p className="m-0">{`innovative tools and personalized support. `}</p>
                      <p className="m-0">{`Our mission is to bridge the gap between academic `}</p>
                      <p className="m-0">{`achievements and professional success, ensuring `}</p>
                      <p className="m-0">
                        every student has the chance to thrive in their chosen
                        field.
                      </p>
                    </h3>
                    <Button
                      className="w-[222px] h-[68px]"
                      endIcon={
                        <img width="16px" height="20px" src="/arrow-2.svg" />
                      }
                      disableElevation
                      variant="contained"
                      sx={{
                        textTransform: "none",
                        color: "#fff",
                        fontSize: "24",
                        background: "#000",
                        borderRadius: "40px",
                        "&:hover": { background: "#000" },
                        width: 222,
                        height: 68,
                      }}
                    >
                      READ MORE
                    </Button>
                  </div>
                </div>
                <div className="self-stretch h-px relative border-black border-t-[1px] border-solid box-border shrink-0" />
              </div>
              <div className="self-stretch flex flex-row items-start justify-start py-0 pl-px pr-0 box-border max-w-full text-46xl font-inter">
                <div className="flex-1 flex flex-row items-start justify-start max-w-full [row-gap:20px] mq750:flex-wrap">
                  <div className="flex-1 flex flex-row items-start justify-start relative min-w-[168px] shrink-0">
                    <FrameComponent4
                      propAlignSelf="unset"
                      propHeight="206px"
                      propFlex="1"
                      propAlignSelf1="stretch"
                      propMinWidth="unset"
                      propAlignSelf2="stretch"
                      propWidth="0px"
                    />
                    <div className="absolute !m-[0] top-[calc(50%_-_39.5px)] left-[87.5px] inline-block min-w-[83px] z-[1] mq450:text-20xl mq1050:text-33xl">
                      48
                    </div>
                    <div className="h-[207px] w-px relative border-black border-r-[1px] border-solid box-border z-[2]" />
                  </div>
                  <div className="h-[206px] w-64 bg-white flex flex-row items-start justify-start pt-[63.5px] px-[72px] pb-px box-border gap-[72.5px] shrink-0 z-[1] ml-[-0.5px] mq450:gap-9 mq450:pl-5 mq450:pr-5 mq450:box-border">
                    <div className="relative inline-block min-w-[111px] shrink-0 mq450:text-20xl mq1050:text-33xl">
                      132
                    </div>
                    <div className="mt-[-64.5px] h-[207px] w-px relative border-black border-r-[1px] border-solid box-border shrink-0 z-[2]" />
                  </div>
                  <div className="flex-1 flex flex-col items-start justify-start relative min-w-[168px] shrink-0 ml-[-0.5px]">
                    <FrameComponent4 prop="150" />
                    <img
                      className="w-px h-px absolute !m-[0] right-[0px] bottom-[0px] object-contain z-[1]"
                      loading="lazy"
                      alt=""
                      src="/line-5.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[892px] w-px relative border-black border-r-[1px] border-solid box-border" />
          </div>
          <div className="h-[787px] w-[530px] flex flex-col items-start justify-start min-w-[530px] max-w-full lg:flex-1 mq750:min-w-full">
            <img
              className="self-stretch h-[729px] relative max-w-full overflow-hidden shrink-0 object-cover lg:self-stretch lg:w-auto"
              loading="lazy"
              alt=""
              src="/whatsapp-image-20240812-at-180602-2@2x.png"
            />
          </div>
        </div>
      </div>
      <div className="w-[1324px] flex flex-row items-start justify-between max-w-full gap-5 text-29xl mq1050:flex-wrap">
        <div className="w-[531px] flex flex-col items-start justify-start pt-6 px-0 pb-0 box-border max-w-full">
          <h1 className="m-0 self-stretch h-14 relative text-inherit font-light font-[inherit] inline-block mq450:text-10xl mq1050:text-19xl">
            From Campus to Career
          </h1>
        </div>
        <FrameComponent3
          frame7=" View Placements"
          propFlex="unset"
          propWidth="300px"
        />
      </div>
    </section>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent1;