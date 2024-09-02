import { useMemo } from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import Arrow2 from '../images/Arrow2.png'; 

const FrameComponent3 = ({ className = "", frame7, propFlex, propWidth }) => {
  const frameButtonStyle = useMemo(() => {
    return {
      flex: propFlex,
      width: propWidth,
    };
  }, [propFlex, propWidth]);

  return (
    <Button
      className={`h-20 flex-1 ${className}`}
      endIcon={<img width="16px" height="24px" src={Arrow2} alt="Arrow Icon" />}
      disableElevation
      variant="contained"
      sx={{
        textTransform: "none",
        color: "#fff",
        fontSize: "36",
        background: "#000",
        borderRadius: "40px",
        "&:hover": { background: "#000" },
        height: 80,
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