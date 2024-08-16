import PropTypes from "prop-types";

const Footer = ({ className = "" }) => {
  return (
    <footer
      className={`w-[1410px] flex flex-row items-start justify-between py-0 pl-0 pr-5 box-border max-w-full gap-5 text-left text-base text-black font-roboto-serif lg:flex-wrap ${className}`}
    >
      <div className="w-[585px] flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border max-w-full text-5xl">
        <div className="self-stretch flex flex-col items-start justify-start gap-[79px] max-w-full mq450:gap-5 mq750:gap-[39px]">
          <div className="self-stretch flex flex-row items-start justify-end max-w-full">
            <div className="w-[555px] flex flex-row items-start justify-start py-0 pl-5 pr-0 box-border gap-20 max-w-full mq450:flex-wrap mq450:gap-5 mq750:gap-10">
              <div className="flex-1 bg-white overflow-hidden flex flex-col items-start justify-start pt-0 px-0.5 pb-[140px] box-border gap-[54px] min-w-[169px] mq750:pb-[91px] mq750:box-border">
                <h3 className="m-0 relative text-inherit font-medium font-[inherit] mq450:text-lgi">{`T&P Nexus`}</h3>
                <div className="ml-[-4px] flex flex-col items-start justify-start gap-[19px] text-base">
                  <div className="flex flex-row items-start justify-start py-0 px-1">
                    <div className="relative font-medium inline-block min-w-[50px]">
                      Home
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-start py-0 px-1">
                    <div className="relative font-medium inline-block min-w-[71px]">
                      Services
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-start py-0 px-1">
                    <div className="relative font-medium inline-block min-w-[48px]">
                      Login
                    </div>
                  </div>
                  <div className="relative font-medium inline-block min-w-[69px]">
                    Register
                  </div>
                  <div className="flex flex-row items-start justify-start py-0 pl-1 pr-3.5">
                    <div className="relative font-medium inline-block min-w-[76px]">
                      About Us
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-start py-0 pl-1 pr-0">
                    <div className="relative font-medium inline-block min-w-[90px]">
                      Contact us
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-start py-0 px-px">
                    <div className="relative font-medium inline-block min-w-[34px]">
                      FAQ
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[195px] flex flex-col items-start justify-start gap-[114px] min-w-[195px] text-base mq450:flex-1">
                <div className="self-stretch flex flex-col items-start justify-start gap-16">
                  <div className="relative font-medium inline-block min-w-[117px]">
                    HEAD OFFICE
                  </div>
                  <div className="relative font-medium">
                    <p className="m-0">500 Terry Francine St,</p>
                    <p className="m-0">San Francisco, CA 94158</p>
                  </div>
                </div>
                <div className="relative font-medium">
                  <p className="m-0">123-456-7890</p>
                  <p className="m-0">info@mysite.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[430px] overflow-hidden flex flex-row items-start justify-start py-[21px] px-12 box-border gap-7 max-w-full text-mini mq450:flex-wrap mq450:pl-5 mq450:pr-5 mq450:box-border">
            <div className="h-[18px] w-[113px] relative">
              <div className="absolute top-[0px] left-[2px] font-medium inline-block min-w-[112px] w-full h-full">
                Privacy Policy
              </div>
              <div className="absolute top-[14px] left-[0px] border-black border-t-[1px] border-solid box-border w-[114px] h-px z-[1]" />
            </div>
            <div className="h-[18px] flex-1 relative min-w-[124px]">
              <div className="absolute top-[0px] left-[0px] font-medium whitespace-pre-wrap inline-block w-full h-full">
                {" "}
                Accessibility Statement
              </div>
              <img
                className="absolute top-[14px] left-[0px] w-[191px] h-0 object-contain z-[1]"
                alt=""
                src="/accessibility-divider.svg"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[195px] flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border">
        <div className="flex flex-col items-start justify-start gap-[73px]">
          <div className="relative font-medium inline-block min-w-[75px]">
            SOCIALS
          </div>
          <div className="flex flex-col items-start justify-start gap-[60px]">
            <div className="relative font-medium inline-block min-w-[81px]">
              Facebook
            </div>
            <div className="relative font-medium inline-block min-w-[86px]">
              Instagram
            </div>
            <div className="relative font-medium inline-block min-w-[76px]">
              LinkedIn
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-start justify-start gap-[25px]">
        <div className="relative font-medium inline-block min-w-[92px]">
          INQUIRIES
        </div>
        <div className="flex flex-col items-start justify-start pt-[571px] px-0 pb-0 text-mini mq750:pt-[371px] mq750:box-border">
          <div className="relative font-medium">{`© 2035 by T&P Nexus`}</div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;