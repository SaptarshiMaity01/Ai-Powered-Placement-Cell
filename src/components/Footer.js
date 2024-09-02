import PropTypes from "prop-types";

const Footer = ({ className = "" }) => {
  return (
    <footer
      className={`w-full flex flex-col py-0 px-[50px] pt-[20px] box-border max-w-full text-left text-base text-black font-roboto-serif lg:flex-wrap  ${className}`}
    >
       
      <div className="w-full flex flex-row items-start justify-between">
      <div className="self-stretch flex flex-col items-start justify-start gap-8 pb-[80px]">
          <h3 className="m-0 relative text-inherit font-medium">T&P Nexus</h3>
          <div className="ml-[-4px] flex flex-col items-start justify-start gap-[19px] text-base">
            <div className="relative font-medium inline-block">Home</div>
            <div className="relative font-medium inline-block">Services</div>
            <div className="relative font-medium inline-block">Login</div>
            <div className="relative font-medium inline-block">Register</div>
            <div className="relative font-medium inline-block">About Us</div>
            <div className="relative font-medium inline-block">Contact Us</div>
            <div className="relative font-medium inline-block">FAQ</div>
          </div>
        </div>
        <div className="w-auto flex flex-col items-start justify-start gap-[50px] text-base">
          <div className="self-stretch flex flex-col items-start justify-start gap-8">
            <div className="relative font-medium inline-block">HEAD OFFICE</div>
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

        <div className="w-auto flex flex-col items-start justify-start pt-0.5 pb-0 box-border">
          <div className="flex flex-col items-start justify-start gap-[50px]">
            <div className="relative font-medium inline-block">SOCIALS</div>
            <div className="flex flex-col items-start justify-start gap-[30px]">
              <div className="relative font-medium inline-block">Facebook</div>
              <div className="relative font-medium inline-block">Instagram</div>
              <div className="relative font-medium inline-block">LinkedIn</div>
            </div>
          </div>
        </div>
        <div className="w-auto flex flex-col items-start justify-start pt-0.5 pb-0 box-border">
        <div className="flex flex-col items-start justify-start gap-[50px]">
          <div className="relative font-medium inline-block">INQUIRIES</div>
        </div>
      </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="w-full mt-10 flex flex-row justify-between items-center px-0 pb-4 text-mini">
        <div className="flex flex-row space-x-5">
          <div className="relative font-medium">Privacy Policy</div>
          <div className="relative font-medium">Accessibility Statement</div>
        </div>
        <div className="relative font-medium">© 2035 by T&P Nexus</div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
