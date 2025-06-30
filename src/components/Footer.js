import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const navigate = useNavigate();
  
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [showRegisterOptions, setShowRegisterOptions] = useState(false);

  const handleLinkClick = (path) => {
    navigate(path, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="flex flex-col h-full justify-between bg-[#030a1c] text-[#8198B0] border-t border-slate-600 mt-12">
      <div className="flex flex-row md:flex-row justify-between p-8 mq750:flex-col">
        <div className="mb-8 md:mb-0">
          <h1 className="text-xl font-bold mb-4">Business Name</h1>
          <ul className="space-y-2 cursor-pointer">
            <li onClick={() => handleLinkClick("/")}>HOME</li>

            {/* Login dropdown */}
            <li onClick={() => handleLinkClick("/SignUp")}>Register</li>
            <li onClick={() => handleLinkClick("/SignIn")}>Login</li>

            <li onClick={() => handleLinkClick("/Read")}>ABOUT US</li>
            <li onClick={() => handleLinkClick("/ContactUs")}>CONTACT US</li>
          </ul>
        </div>
        <div className="mb-8 md:mb-0">
          <h2 className="text-lg font-bold mb-4">HEAD OFFICE</h2>
          <p>
          Anjaneri ,Trimbak Road, 
            <br />
            Nashik-422213.
          </p>
          <p className="mt-4">
            123-456-7890
            <br />
            bvcoe@gmail.com
          </p>
        </div>
        <div className="mb-8 md:mb-0">
          <h2 className="text-lg font-bold mb-4">SOCIALS</h2>
          <ul className="space-y-2">
            <li>
              <a href="https://www.facebook.com/" className="text-blue-600">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/accounts/login/?hl=en" className="text-blue-600">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://in.linkedin.com/" className="text-blue-600">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">INQUIRIES</h2>
          
          <p className="mt-4">
            <Link to="/ContactUs" className="text-blue-600">
              Work with us
            </Link>
          </p>
        </div>
      </div>
      <div className="border-t text-[#8198B0]  border-slate-600 py-4 text-center text-sm">
        <a href="https://in.linkedin.com/" className=" mr-4">
          Privacy Policy
        </a>
        <a href="https://in.linkedin.com/" >
          Accessibility Statement
        </a>
        <p className="mt-4 ">
          © 2035 {""}
          <a href="https://in.linkedin.com/" className="text-blue-600">
            T&P NEXUS
          </a>
        </p>
      </div>
    </div>
  );
};
export default Footer;
