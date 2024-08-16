import PropTypes from "prop-types";

const Navheader = ({ className = "" }) => {
  return (
    <header
      className={`self-stretch bg-white flex flex-row items-start justify-between py-[16.5px] px-[50px] box-border top-[0] z-[99] sticky max-w-full gap-5 text-center text-xl text-black font-roboto-serif mq750:pl-[25px] mq750:pr-[25px] mq750:box-border ${className}`}
    >
      <div className="flex flex-row items-start justify-start">
        <img
          className="h-[66px] w-[141px] relative object-cover"
          loading="lazy"
          alt=""
          src="/download-1-1@2x.png"
        />
        <div className="flex flex-col items-start justify-start pt-[21.5px] px-0 pb-0">
          <a className="[text-decoration:none] relative text-[inherit] inline-block min-w-[72px]">
            NEXUS
          </a>
        </div>
      </div>
      <div className="w-[572px] flex flex-col items-start justify-start pt-[10.5px] px-0 pb-0 box-border max-w-full mq1050:w-0">
        <div className="self-stretch flex flex-row items-start justify-start py-0 pl-0 pr-[3px] relative gap-3 mq1050:hidden">
          <div className="flex flex-col items-start justify-start pt-[11px] px-0 pb-0">
            <a className="[text-decoration:none] relative text-[inherit] inline-block min-w-[61px]">
              Home
            </a>
          </div>
          <div className="flex flex-col items-start justify-start pt-[11px] px-0 pb-0">
            <a className="[text-decoration:none] relative text-[inherit] inline-block min-w-[87px]">
              Services
            </a>
          </div>
          <div className="w-[89px] flex flex-col items-start justify-start pt-[11px] pb-0 pl-0 pr-1 box-border">
            <a className="[text-decoration:none] self-stretch relative text-[inherit] whitespace-nowrap">
              Log in
            </a>
          </div>
          <div className="flex flex-col items-start justify-start pt-[11px] pb-0 pl-0 pr-1">
            <a className="[text-decoration:none] relative text-[inherit] inline-block min-w-[85px]">
              Register
            </a>
          </div>
          <div className="flex flex-col items-start justify-start pt-[11px] px-0 pb-0">
            <a className="[text-decoration:none] relative text-[inherit] inline-block min-w-[113px] whitespace-nowrap">
              Contact Us
            </a>
          </div>
          <div className="rounded-6xl bg-black flex flex-row items-start justify-start py-[11px] px-[13px] text-white">
            <a className="[text-decoration:none] relative text-[inherit] inline-block min-w-[43px]">
              FAQ
            </a>
          </div>
          <div className="h-1.5 w-[74px] !m-[0] absolute top-[1px] left-[0px] hidden z-[6]" />
        </div>
      </div>
    </header>
  );
};

Navheader.propTypes = {
  className: PropTypes.string,
};

export default Navheader;