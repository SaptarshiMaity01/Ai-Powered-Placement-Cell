import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/download (2).png";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

const Navheader = ({ className = "" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll to top whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  

  return (
    <header
      className={`self-stretch bg-white flex flex-row items-center justify-between py-[16.5px] px-[50px] box-border top-0 z-[99] mq1050:sticky max-w-full gap-5 text-center text-xl text-black font-roboto-serif mq750:text-lg mq750:pl-[25px] mq750:pr-[25px] ${className}`}
    >
      <div className="flex flex-row items-start justify-start">
        <img
          className="h-[66px] w-[141px] relative object-cover hover:scale-105 transition-all"
          loading="lazy"
          alt="Nexus Logo"
          src={logo}
        />
        <div className="flex flex-col items-start justify-start pt-[21.5px] px-0 pb-0 hover:scale-105 transition-all cursor-default">
          NEXUS
        </div>
      </div>
 
      <div className="flex flex-col items-start justify-start pt-[10.5px] px-0 pb-0 box-border max-w-full mq1050:w-0">
        <div className="self-stretch flex flex-row items-start justify-start py-0 pl-0 pr-[3px] relative gap-12 mq1050:hidden">
          <div className="flex flex-col items-start justify-start px-0 pb-0 box-border">
            <Link
              to="/"
              className="[text-decoration:none] relative text-[inherit] inline-block min-w-[61px] hover:text-[#0077b6]"
            >
              Home
              <div className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-indigo-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </Link>
          </div>

          <div className="flex flex-col items-start justify-start px-0 pb-0 box-border hover:text-[#0077b6]">
            <Link
              to="/SignIn"
              className="[text-decoration:none] relative text-[inherit] inline-block min-w-[61px]"
            >
              Login
              <div className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-indigo-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </Link>
          </div>

          <div className="flex flex-col items-start justify-start px-0 pb-0 box-border hover:text-[#0077b6]">
            <Link
              to="/SignUp"
              className="[text-decoration:none] relative text-[inherit] inline-block min-w-[85px]"
            >
              Register
              <div className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-indigo-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </Link>
          </div>

          <div className="flex flex-col items-start justify-start px-0 pb-0 box-border hover:text-[#0077b6]">
            <Link
              to="/ContactUs"
              className="[text-decoration:none] relative text-[inherit] inline-block min-w-[113px] whitespace-nowrap"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      
      <i
        className="bx bx-menu hidden mq1050:block text-5xl cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      ></i>

      <div
        className={`absolute top-24 left-0 w-full bg-white flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } ${!isMenuOpen ? "hidden" : ""}`}
      >
        <li className="list-none w-full text-center p-4 hover:bg-[#00B4D8]/30 cursor-pointer transition-all">
          <Link
            to="/"
            className="w-full h-full block no-underline text-black hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
        </li>

        <li className="list-none w-full text-center p-4 hover:bg-[#00B4D8]/30 cursor-pointer transition-all">
          <Link
            to="/SignIn"
            className="w-full h-full block no-underline text-black hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
        </li>

        <li className="list-none w-full text-center p-4 hover:bg-[#00B4D8]/30 cursor-pointer transition-all">
          <Link
            to="/SignUp"
            className="w-full h-full block no-underline text-black hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Register
          </Link>
        </li>

        <li className="list-none w-full text-center p-4 hover:bg-[#00B4D8]/30 cursor-pointer transition-all">
          <Link
            to="/ContactUs"
            className="w-full h-full block no-underline text-black hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </Link>
        </li>
      </div>
    </header>
  );
};

Navheader.propTypes = {
  className: PropTypes.string,
};

export default Navheader;