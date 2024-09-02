import { Button } from "@mui/material";
import FrameComponent3 from "./FrameComponent3";
import Arrow2 from "../images/Arrow2.png";
import img2 from "../images/WhatsApp Image 2024-08-12 at 18.06.02 2.png";
import PropTypes from "prop-types";

const FrameComponent1 = ({ className = "" }) => {
  return (
    <section
    className={`flex flex-col items-end justify-start pt-0 pb-[50px] pl-[50px] pr-[50px] box-border gap-[52px] w-full max-w-[1950px] mx-auto text-left text-xl text-black font-roboto-serif lg:pb-[34px] lg:pl-[25px] lg:pr-[25px] lg:gap-[40px] mq750:gap-[26px] mq750:pb-[22px] mq750:pl-[15px] mq750:pr-[15px] ${className}`}
  >
      <div className="flex flex-row items-start justify-end box-border w-full">
        <div className="flex-1 flex flex-row items-end justify-start min-w-[300px] mq750:flex-col mq750:items-center">
          <div className="flex-1 flex flex-col items-start justify-start max-w-full shrink-0">
            <div className="h-auto overflow-hidden shrink-0 flex flex-col items-start justify-start pt-4 px-0 pb-[40px] box-border gap-[53px] w-full z-[3] mq450:gap-[26px] mq750:pt-5 mq750:pb-[34px]">
              <div className="flex flex-row items-start justify-start pt-0 px-[47px] pb-[11px] mq750:px-[25px]">
                <div className="relative leading-[24px] inline-block min-w-[110px] mq450:text-base">
                  ABOUT US
                </div>
              </div>
              <div className="flex flex-row items-start justify-start pt-0 pb-[10px] box-border w-full text-21xl mq750:px-[25px]">
                <h1 className="m-0 flex-1 relative text-inherit font-medium inline-block mq450:text-5xl mq1050:text-13xl">
                  Building Bridges Between Talent and Opportunity
                </h1>
              </div>
              <div className="w-full flex flex-row items-start justify-start box-border text-5xl mq750:px-[25px]">
                <div className="flex flex-col items-start justify-start gap-[51.5px] w-full mq750:gap-[26px]">
                  <h3 className="m-0 w-full relative text-inherit font-medium inline-block mq450:text-lgi mb-5">
                    Welcome to T&P Nexus where passion meets <br />
                    purpose. We are dedicated to connecting
                    <br />
                    students with career opportunities through
                    <br />
                    innovative tools and personalized support.
                    <br />
                    Our mission is to bridge the gap between academic
                    <br />
                    achievements and professional success, ensuring
                    <br />
                    every student has the chance to thrive in their chosen
                    <br />
                    field.
                  </h3>
                  <Button
                    className="w-[222px] h-[68px]"
                    endIcon={
                      <img width="16px" height="20px" src={Arrow2} alt="" />
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
            </div>
            <div className="w-full h-px bg-black box-border z-[1] mx-auto" />
            <div className="flex flex-row items-center justify-between relative w-full h-[206px] mq750:flex-col mq750:h-auto mq750:items-center">
            <div className="h-full w-px bg-black box-border z-[1] mx-auto" />
              {/* First Block */}
              <div className="relative flex-1 flex flex-col items-center justify-center min-w-[168px] h-full bg-white shrink-0 px-5 py-[63.5px] box-border mq750:mb-4">
                <div className="relative text-center text-33xl mq450:text-20xl mq1050:text-33xl">
                  132
                </div>
              </div>
              <div className="h-full w-px bg-black box-border z-[1] mx-auto" />
              {/* Second Block */}
              <div className="relative flex-1 flex flex-col items-center justify-center min-w-[168px] h-full bg-white shrink-0 px-5 py-[63.5px] box-border mq750:mb-4">
                <div className="relative text-center text-33xl mq450:text-20xl mq1050:text-33xl">
                  132
                </div>
              </div>
              <div className="h-full w-px bg-black box-border z-[1] mx-auto" />
              {/* Third Block */}
              <div className="flex-1 flex flex-col items-center justify-center min-w-[168px] h-full shrink-0 mq750:mb-4">
                <p className="text-center text-33xl mq450:text-20xl mq1050:text-33xl">
                  150
                </p>
              </div>
              <div className="h-full w-px bg-black box-border z-[1] mx-auto" /> 
            </div>
            
            <div className="w-full h-px bg-black box-border z-[1] mx-auto" />
            
          </div>
          <div className="flex-1 flex items-center justify-end ">
          <img
            src={img2}
            alt="Descriptive Alt Text"
            className="max-w-full h-auto object-contain " // Adjust the width as needed
          />
        </div>
        </div>
      </div>
      

      <div className="flex flex-row items-start justify-between gap-5 text-29xl mq1050:flex-wrap w-full">
        <div className="w-full flex flex-col items-start justify-start pt-6 px-0 pb-0 box-border">
          <h1 className="m-0 self-stretch h-14 relative text-inherit font-light inline-block mq450:text-10xl mq1050:text-19xl">
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
