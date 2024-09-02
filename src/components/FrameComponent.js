import FrameComponent3 from "./FrameComponent3";
import PropTypes from "prop-types";
import image1 from "../images/download.jpg";
import image2 from "../images/image.png";
import image3 from "../images/image18.jpg";


const FrameComponent = ({ className = "" }) => {
  return (
    <section
      className={`h-full w-full  overflow-hidden flex flex-col items-start justify-start pt-[93px] px-0 pb-[101px] box-border gap-[162px] max-w-full text-left text-9xl text-white font-roboto-serif mq450:gap-10 mq450:pt-[39px] mq450:pb-[43px] mq450:box-border mq750:gap-[81px] mq1050:pt-[60px] mq1050:pb-[66px] mq1050:box-border ${className}`}
      style={{ background: 'radial-gradient(circle at top left, #caf0f8, #70d5ea, #0077b6)' }}>
      <div
        className="w-full  mx-auto flex flex-col items-start justify-start py-0 pl-0  box-border gap-[54px] mq750:gap-[27px]"
        style={{
          marginLeft: "0px",
          marginRight: "0px",
        }}
      >
        <div className="self-stretch flex flex-col items-start justify-start gap-[26.6px] max-w-full">
          <div
            className="self-stretch flex flex-col items-start justify-start max-w-full"
            style={{ paddingLeft: "50px" }}
          >
            <h1 className="m-0 relative font-[inherit] max-h-full max-w-full text-96xl mq450:text-48xl mq750:text-64xl">
              Career Launch <br />
              Nexus
            </h1>
            <h2 className="m-0 h-7 w-[681px] relative text-inherit font-normal font-[inherit] inline-block max-w-full mq450:text-3xl">
              Empowering Futures, Connecting Talent to Opportunity
            </h2>
          </div>
        </div>

        <div
          className="w-[350px] flex flex-row items-start justify-start py-0 px-[50px] box-border max-w-full mq450:pl-5 mq450:pr-5 mq450:box-border"
          style={{ marginTop: "40px" }}
        >
          <FrameComponent3 frame7="Get Started" />
        </div>
        <div className="pl-[50px]">
          <div className="flex gap-1 items-center">
            <img
              src={image1}
              width="128"
              height="128"
              className="rounded-full border-2 border-solid border-primary-100 h-9 w-9 relative"
              alt="User 1"
            />
            <img
              src={image2}
              width="128"
              height="128"
              className="rounded-full border-2 border-solid border-primary-100 h-9 w-9 relative -ml-4"
              alt="User 2"
            />
            <img
              src={image3}
              width="128"
              height="128"
              className="rounded-full border-2 border-solid border-primary-100 h-9 w-9 relative -ml-4"
              alt="User 3"
            />
            <img
              src={image1}
              width="128"
              height="128"
              className="rounded-full border-2 border-solid border-primary-100 h-9 w-9 relative -ml-5"
              alt="User 4"
            />
            <img
              src={image2}
              width="128"
              height="128"
              className="rounded-full border-2 border-solid border-primary-100 h-9 w-9 relative -ml-6"
              alt="User 5"
            />
            <div className="flex items-center gap-1 ml-4">
              {/* Star rating code */}
              <div className="h-4 w-4">
                <span
                  role="img"
                  aria-label="star"
                  aria-hidden="true"
                  className="anticon anticon-star w-full h-full text-yellow-400 fill-yellow-400"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="star"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                </span>
              </div>
              {/* Repeat for other stars */}
              <div className="h-4 w-4">
                <span
                  role="img"
                  aria-label="star"
                  aria-hidden="true"
                  className="anticon anticon-star w-full h-full text-yellow-400 fill-yellow-400"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="star"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                </span>
              </div>
              <div className="h-4 w-4">
                <span
                  role="img"
                  aria-label="star"
                  aria-hidden="true"
                  className="anticon anticon-star w-full h-full text-yellow-400 fill-yellow-400"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="star"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                </span>
              </div>
              <div className="h-4 w-4">
                <span
                  role="img"
                  aria-label="star"
                  aria-hidden="true"
                  className="anticon anticon-star w-full h-full text-yellow-400 fill-yellow-400"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="star"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                </span>
              </div>
              <div className="h-4 w-4">
                <span
                  role="img"
                  aria-label="star"
                  aria-hidden="true"
                  className="anticon anticon-star w-full h-full text-yellow-400 fill-yellow-400"
                >
                  <svg
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="star"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <p className="text-xs max-w-sm text-slate-950 mt-[20px] ">
            1000+ from happy users
          </p>
        </div>
        <div className="flex flex-row items-start justify-start py-0 px-12 text-5xl font-inter mq750:pl-6 mq750:pr-6 mq750:box-border pl-[50px] ">
          <h3 className="m-0 relative text-inherit font-light font-[inherit] mq450:text-lgi">
            <p className="m-0">
              Welcome to Career Launch Nexus! Your journey towards a successful
              career starts here.
              <br />
              Explore our platform to accessexclusive training resources,
              connect with top employers,
              <br />
              and prepare yourself for the opportunities that await. Together,
              let's shape your future <br />
              and turn your ambitions into achievements.
            </p>
          </h3>
        </div>
      </div>
    </section>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;
