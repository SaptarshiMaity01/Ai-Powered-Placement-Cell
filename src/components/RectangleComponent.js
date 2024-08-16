import PropTypes from "prop-types";

const RectangleComponent = ({ className = "" }) => {
  return (
    <div
      className={`h-[50px] w-[50px] !m-[0] absolute top-[-51px] left-[-49px] bg-white flex flex-row items-start justify-start z-[1] ${className}`}
    >
      <div className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] bg-white" />
    </div>
  );
};

RectangleComponent.propTypes = {
  className: PropTypes.string,
};

export default RectangleComponent;