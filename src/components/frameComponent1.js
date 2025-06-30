import React from "react";
import FrameComponent3 from "./FrameComponent3";
import img2 from "../images/WhatsApp Image 2024-08-12 at 18.06.02 2.png";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpotlightBackground from "./SpotlightBackground";
import CountUp from "./styles/CountUp";
import TiltedCard from "./styles/TiltedCard";

const FrameComponent1 = () => {
  const navigate = useNavigate();
  const handleLinkClick = (path) => {
    navigate(path, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
  }, []);
  return (
    <div className="flex flex-col items-center px-40 justify-center min-h-screen border-t font-roboto-serif bg-[#030a1c] mq750:border-b border-slate-600 text-white/90 leading-relaxed  mq450:justify-normal mq450:min-h-full">
      <div className="flex flex-row w-full">
        {/* Left Section */}
        <div className="flex-1 pt-12 mq750:p-5 md:w-1/2">
          <h2 className="text-13xl  mq450:text-[20px] ">ABOUT</h2>
          <h1
            className="mt-[20px] text-29xl  mq450:text-[23px] mq450:mt-[20px]"
            data-aos="zoom-in"
          >
            Building Bridges Between Talent and Opportunity
          </h1>
          <h3 className="m-0 w-full relative text-5xl font-light inline-block mq450:text-[19px] mt-[20px] mq450:mt-[20px] mq750:text-[24px] ">
            Welcome to T&P Nexus where passion meets purpose. We are dedicated
            to connecting students with career opportunities through innovative
            tools and personalized support. Our mission is to bridge the gap
            between academic achievements and professional success, ensuring
            every student has the chance to thrive in their chosen field.
          </h3>

          <div
            className="w-[250px] flex flex-row items-start justify-start py-0 box-border max-w-full mq450:box-border mq450:w-[150px] mq450:h-[50px] mt-[50px] mq450:mt-[20px]"
            onClick={() => handleLinkClick("/Read")}
          >
            <FrameComponent3 frame7="Read More" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col  md:w-1/2 mq1050:hidden ">
          <TiltedCard
            imageSrc={img2}
            altText=""
            captionText=""
            containerHeight="600px"
            containerWidth="400px"
            imageHeight="600px"
            imageWidth="400px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={<p className=""></p>}
          />
        </div>
      </div>

      {/* Bottom Statistics Section */}
      <div className="w-full mt-8 mb-8 px-[50px] mq750:px-0 mq750:border-none text-[#B0C4DE]">
        <div className=" grid grid-cols-3 text-center gap-6">
          <SpotlightBackground
            className="custom-spotlight-card min-h-auto h-auto py-6 "
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <div className="py-6 bg-[#051024]">
              <h3 className="text-21xl font-bold text-blue-400 ">
                <CountUp
                  from={0}
                  to={43}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
                +
              </h3>
              <p className="text-3xl">Companies</p>
            </div>
          </SpotlightBackground>
          <SpotlightBackground
            className="custom-spotlight-card"
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <div className="p-6 bg-[#051024] ">
              <h3 className="text-21xl font-bold text-green-400">
                <CountUp
                  from={500}
                  to={1000}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
                +
              </h3>
              <p className="text-3xl">Students Placed</p>
            </div>
          </SpotlightBackground>
          <SpotlightBackground
            className="custom-spotlight-card"
            spotlightColor="rgba(0, 229, 255, 0.2) "
          >
            <div className="p-6 bg-[#051024] ">
              <h3 className="text-21xl font-bold text-purple-400">
                <CountUp
                  from={0}
                  to={20}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
              </h3>
              <p className="text-3xl">T&P Coordinators</p>
            </div>
          </SpotlightBackground>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent1;
