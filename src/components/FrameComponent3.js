import { useMemo } from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import Arrow2 from '../images/Arrow2.png'; // Ensure this image supports color change if needed


const FrameComponent3 = ({ className = "", frame7, propFlex, propWidth }) => {
  const frameButtonStyle = useMemo(() => ({
    flex: propFlex,
    width: propWidth,
  }), [propFlex, propWidth]);

  return (
    <Button
      className={`h-20 mq450:h-[50px] flex-1 ${className}`}
      endIcon={<img width="16px" height="24px" src={Arrow2} alt="Arrow Icon" className="transition-transform duration-300" />}
      disableElevation
      variant="contained"
      sx={{
        
        textTransform: "none",
        color: "#B0C4DE", // Default text color
        fontSize:{   // Applies to small screens
          mq450: "12px",
          md:"20px", // Custom breakpoint for screens below 450px
          lg: "20px"},

        background: "#051024", // Default background color
        borderRadius: "40px",
  
        transition: "background-color 0.3s, color 0.3s",
        "&:hover": {
          background: "#B0C4DE", // Background color on hover
          color: "#030a1c", // Text color on hover
          "& .MuiButton-endIcon img": {
            transform: "rotate(-65deg)", // Rotate arrow to right on hover
            filter: "invert(1)", // Adjust color to black if using an image that supports color changes
          },
        },
      }}
      style={frameButtonStyle}
    >
      {frame7}
    </Button>
  );
};

FrameComponent3.propTypes = {
  className: PropTypes.string,
  frame7: PropTypes.string,
  /** Style props */
  propFlex: PropTypes.any,
  propWidth: PropTypes.any,
};

export default FrameComponent3;
