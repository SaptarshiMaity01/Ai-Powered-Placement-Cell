import { useMemo } from "react";
import PropTypes from "prop-types";

const FrameComponent4 = ({
  className = "",
  prop,
  propAlignSelf,
  propHeight,
  propFlex,
  propAlignSelf1,
  propMinWidth,
  propAlignSelf2,
  propWidth,
}) => {
  const frameDivStyle = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      height: propHeight,
      flex: propFlex,
    };
  }, [propAlignSelf, propHeight, propFlex]);

  const frameDiv1Style = useMemo(() => {
    return {
      alignSelf: propAlignSelf1,
    };
  }, [propAlignSelf1]);

  const divStyle = useMemo(() => {
    return {
      minWidth: propMinWidth,
      alignSelf: propAlignSelf2,
      width: propWidth,
    };
  }, [propMinWidth, propAlignSelf2, propWidth]);

  return (
    <div
      className={`self-stretch bg-white overflow-hidden flex flex-row items-start justify-start text-left text-46xl text-black font-inter ${className}`}
      style={frameDivStyle}
    >
      <div
        className="flex-1 flex flex-row items-start justify-start py-[63.5px] px-[72px] mq450:pl-5 mq450:pr-5 mq450:box-border"
        style={frameDiv1Style}
      >
        <div
          className="relative inline-block min-w-[111px] mq450:text-20xl mq1050:text-33xl"
          style={divStyle}
        >
          {prop}
        </div>
      </div>
    </div>
  );
};

FrameComponent4.propTypes = {
  className: PropTypes.string,
  prop: PropTypes.string,

  /** Style props */
  propAlignSelf: PropTypes.any,
  propHeight: PropTypes.any,
  propFlex: PropTypes.any,
  propAlignSelf1: PropTypes.any,
  propMinWidth: PropTypes.any,
  propAlignSelf2: PropTypes.any,
  propWidth: PropTypes.any,
};

export default FrameComponent4;