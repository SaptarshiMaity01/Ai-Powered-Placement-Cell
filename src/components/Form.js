import { Button } from "@mui/material";
import PropTypes from "prop-types";

const FormComponent = ({ className = "" }) => {
  return (
    <div
      className={`flex-1 shadow-[0px_3px_11px_rgba(0,_0,_0,_0.06),_0px_10px_15px_rgba(0,_0,_0,_0.03)] rounded-xl bg-base-white flex flex-col items-start justify-start pt-10 pb-[33.2px] pl-10 pr-[38px] box-border gap-[22px] max-w-full text-center text-base text-gray-600 font-regular-13 mq750:pt-[26px] mq750:pb-[22px] mq750:box-border ${className}`}
    >
      <div className="self-stretch rounded-4xs bg-base-white border-gray-200 border-[1px] border-solid flex flex-row items-start justify-center py-4 px-5">
        <div className="flex flex-row items-start justify-start gap-[9px]">
          <div className="relative leading-[26px]">{`First & Last Name`}</div>
          <div className="hidden flex-row items-center justify-center">
            <img
              className="h-[18px] w-[18px] relative overflow-hidden shrink-0"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[15.1px] gap-[22px]">
        <div className="self-stretch rounded-4xs bg-base-white border-gray-200 border-[1px] border-solid flex flex-row items-start justify-center py-4 px-5">
          <div className="flex flex-row items-start justify-start gap-[9px]">
            <div className="relative leading-[26px] inline-block min-w-[113px]">
              Email Address
            </div>
            <div className="hidden flex-row items-center justify-center">
              <img
                className="h-[18px] w-[18px] relative overflow-hidden shrink-0"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="self-stretch rounded-4xs bg-base-white border-gray-200 border-[1px] border-solid flex flex-row items-start justify-center py-4 px-5">
          <div className="flex flex-row items-start justify-start gap-[9px]">
            <div className="w-[137px] relative leading-[26px] flex items-center justify-center">
              Create Password
            </div>
            <div className="hidden flex-row items-center justify-center">
              <img
                className="h-[18px] w-[18px] relative overflow-hidden shrink-0"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="w-[294.9px] flex flex-row items-start justify-start gap-[7.8px] text-left text-sm text-base-02">
          <input
            className="m-0 h-[17.8px] w-[16.3px] relative rounded-8xs border-blue-gray-400 border-[1px] border-solid box-border shrink-0"
            type="checkbox"
          />
          <div className="flex-1 relative leading-[22px] shrink-0">
            <span>{`I agree with the `}</span>
            <span className="text-royalblue">{`Terms & Conditions`}</span>
            <span> of Clarity</span>
          </div>
        </div>
        <Button/>
      </div>
      <div className="self-stretch flex flex-row items-start justify-start py-0 pl-[76px] pr-[79px] text-left text-sm text-neutral-600 font-manrope mq450:pl-5 mq450:pr-5 mq450:box-border">
        <div className="flex-1 flex flex-col items-start justify-start gap-[5px]">
          <div className="self-stretch flex flex-row items-start justify-start py-0 px-[70px] mq450:pl-5 mq450:pr-5 mq450:box-border">
            <div className="flex-1 flex flex-row items-start justify-start relative">
              <div className="w-[252px] !m-[0] absolute top-[-54px] left-[calc(50%_-_126px)] flex flex-row items-start justify-start pt-[72px] pb-0 pl-[50px] pr-[49px] box-border z-[1]">
                <div className="h-px flex-1 relative border-neutral-600 border-t-[1px] border-solid box-border z-[1]" />
              </div>
              <div className="h-[35px] flex-1 bg-base-white flex flex-row items-start justify-start p-2 box-border whitespace-nowrap z-[2]">
                <div className="self-stretch flex-1 relative font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                  or sign up with
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start gap-[4.1px] text-xs text-neutral-800 mq450:flex-wrap">
            <div className="flex-[0.8165] rounded border-lightgray border-[1px] border-solid box-border flex flex-row items-start justify-start py-1.5 pl-[9px] pr-2 gap-1.5 opacity-[0.8] min-w-[61px] z-[1] mq450:flex-1">
              <img className="h-4 w-4 relative min-h-[16px]" alt="" />
              <div className="relative inline-block min-w-[40px]">Google</div>
            </div>
            <button className="cursor-pointer border-lightgray border-[1px] border-solid py-1.5 pl-3.5 pr-[13px] bg-[transparent] flex-[0.6855] rounded box-border flex flex-row items-start justify-start gap-1.5 min-w-[61px] z-[1] mq450:flex-1">
              <div className="flex flex-row items-center justify-center">
                <img className="h-4 w-3.5 relative" alt="" />
              </div>
              <div className="relative text-xs font-manrope text-neutral-800 text-left inline-block min-w-[32px]">
                Apple
              </div>
            </button>
            <button className="cursor-pointer border-lightgray border-[1px] border-solid py-1.5 pl-0.5 pr-px bg-[transparent] flex-1 rounded box-border flex flex-row items-start justify-start gap-1.5 min-w-[61px] z-[1]">
              <div className="flex flex-row items-center justify-center w-4 h-4">
                <img className="h-4 w-4 relative" alt="" />
              </div>
              <div className="relative text-xs font-manrope text-neutral-800 text-left inline-block min-w-[54px]">
                Facebook
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

FormComponent.propTypes = {
  className: PropTypes.string,
};

export default FormComponent;