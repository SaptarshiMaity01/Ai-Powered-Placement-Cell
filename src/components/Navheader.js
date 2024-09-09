import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../images/download (2).png";

const Navheader = ({ className = "" }) => {
  return (
    <header
      className={`self-stretch bg-white flex flex-row items-center justify-between py-[16.5px] px-[50px] box-border top-0 z-[99] sticky max-w-full gap-5 text-center text-xl text-black font-roboto-serif mq750:text-lg mq750:pl-[25px] mq750:pr-[25px] ${className}`}
    >
      <div className="flex flex-row items-start justify-start">
        <img
          className="h-[66px] w-[141px] relative object-cover"
          loading="lazy"
          alt="Nexus Logo"
          src={logo}
        />
        <div className="flex flex-col items-start justify-start pt-[21.5px] px-0 pb-0">
          <Link
            to="/"
            className="[text-decoration:none] relative text-[inherit] inline-block min-w-[72px]"
          >
            NEXUS
          </Link>
        </div>
      </div>
      <div className="w-[572px] flex flex-col items-start justify-start pt-[10.5px] px-0 pb-0 box-border max-w-full mq1050:w-0">
        <div className="self-stretch flex flex-row items-start justify-start py-0 pl-0 pr-[3px] relative gap-3 mq1050:hidden">
          <div className="flex flex-col items-start justify-start pt-[11px] px-0 pb-0">
            <Link
              to="/"
              className="[text-decoration:none] relative text-[inherit] inline-block min-w-[61px]"
            >
              Home
            </Link>
          </div>
          <div className="flex flex-col items-start justify-start pt-[11px] px-0 pb-0">
            <Link
              to="/services"
              className="[text-decoration:none] relative text-[inherit] inline-block min-w-[87px]"
            >
              Services
            </Link>
          </div>
          <div className="w-[89px] flex flex-col items-start justify-start pt-[11px] pb-0 pl-0 pr-1 box-border">
            <Link
              to="/Adminlogin"
              className="[text-decoration:none] self-stretch relative text-[inherit] whitespace-nowrap"
            >
              Log in
            </Link>
          </div>
          <div className="flex flex-col items-start justify-start pt-[11px] pb-0 pl-0 pr-1">
            <Link
              to="/Form"
              className="[text-decoration:none] relative text-[inherit] inline-block min-w-[85px]"
            >
              Register
            </Link>
          </div>
          <div className="flex flex-col items-start justify-start pt-[11px] px-0 pb-0">
            <Link
              to="/contact-us"
              className="[text-decoration:none] relative text-[inherit] inline-block min-w-[113px] whitespace-nowrap"
            >
              Contact Us
            </Link>
          </div>
          <div className="rounded-6xl bg-black flex flex-row items-start justify-start py-[11px] px-[13px] text-white">
            <Link
              to="/FAQ"
              className="[text-decoration:none] relative text-[inherit] inline-block min-w-[43px]"
            >
              FAQ
            </Link>
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
