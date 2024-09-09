import { useMemo } from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

const AdminLogin = ({
  adminLoginPosition,
  title,
  titleTextDecoration,
  titleMargin,
  icons,
  logoGoogleg48dp,
  path4,
}) => {
  const adminLoginStyle = useMemo(() => {
    return {
      position: adminLoginPosition,
    };
  }, [adminLoginPosition]);

  const titleStyle = useMemo(() => {
    return {
      textDecoration: titleTextDecoration,
      margin: titleMargin,
    };
  }, [titleTextDecoration, titleMargin]);

  return (
    <form
      className="m-0 w-full relative rounded bg-base-white flex flex-col items-start justify-start pt-[30px] px-6 pb-[61px] box-border gap-6 leading-[normal] tracking-[normal]"
      style={adminLoginStyle}
    >
      <div className="w-[369px] flex flex-row items-start justify-start pt-0 px-0 pb-1.5 box-border max-w-full">
        <a className="[text-decoration:none] h-[22px] flex-1 relative text-base font-extrabold font-open-sans text-transparent !bg-clip-text [background:linear-gradient(-88.11deg,_#00b4d8,_#70d5ea)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] text-left inline-block overflow-hidden text-ellipsis whitespace-nowrap max-w-full"href=" ">{`T&P Nexus`}</a>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-2">
        <h3
          className="m-0 self-stretch relative text-3xl font-bold font-manrope text-neutral-800 text-left"
          style={titleStyle}
        >
          {title}
        </h3>
        <div className="self-stretch relative text-sm font-manrope text-neutral-500 text-left">
          Welcome back. Enter your credentials to access your account
        </div>
      </div>
      <div className="self-stretch h-[63px] flex flex-col items-start justify-start gap-1 mq450:h-auto">
        <div className="self-stretch h-[19px] relative text-sm font-semibold font-manrope text-neutral-800 text-left inline-block overflow-hidden text-ellipsis whitespace-nowrap shrink-0">
          Email Address
        </div>
        <div className="self-stretch rounded border-neutral-500 border-[1.5px] border-solid box-border flex flex-row items-start justify-start flex-wrap content-start py-[10.5px] px-3 min-h-[43px] [row-gap:20px] shrink-0">
          <input
            className="w-full [border:none] [outline:none] font-manrope text-sm bg-[transparent] h-[19px] flex-1 relative text-neutral-800 text-left inline-block overflow-hidden text-ellipsis whitespace-nowrap min-w-[72px] p-0"
            placeholder="hello@example.c"
            type="text"
          />
          <div className="h-[16.5px] flex flex-col items-start justify-start pt-[3.5px] px-0 pb-0 box-border">
            <div className="w-px h-3.5 relative border-neutral-800 border-r-[1px] border-solid box-border" />
          </div>
        </div>
      </div>
      <section className="self-stretch flex flex-col items-start justify-start gap-1 max-w-full">
        <div className="self-stretch flex flex-col items-start justify-start gap-1 max-w-full">
          <div className="self-stretch flex flex-row items-center justify-between gap-5 mq750:flex-wrap">
            <div className="h-[19px] w-[215px] relative text-sm font-semibold font-manrope text-neutral-800 text-left inline-block overflow-hidden text-ellipsis whitespace-nowrap shrink-0">
              Password
            </div>
            <b className="relative text-xs inline-block font-manrope text-deepskyblue text-right min-w-[97px]">
              Forgot Password
            </b>
          </div>
          <div className="self-stretch rounded border-error-red-500 border-[1px] border-solid box-border flex flex-row items-center justify-start py-2.5 px-[11px] gap-2 max-w-full">
            <div className="h-2.5 flex-1 relative text-6xs tracking-[0.4em] font-manrope text-neutral-800 text-left inline-block overflow-hidden text-ellipsis whitespace-nowrap max-w-[calc(100%_-_24px)]">
              ●●●●●●●●●●●●●●
            </div>
            <img className="h-4 w-4 relative" alt="" src={icons} />
          </div>
        </div>
        <div className="self-stretch h-[19px] relative text-sm font-light font-manrope text-error-red-600 text-left inline-block overflow-hidden text-ellipsis whitespace-nowrap shrink-0">
          Please enter correct password
        </div>
      </section>
      <div className="self-stretch flex flex-row items-start justify-start flex-wrap content-start gap-2 max-w-full">
        <div className="flex flex-col items-start justify-start pt-[1.5px] px-0 pb-0">
          <input className="m-0 w-4 h-4 relative rounded-sm" type="checkbox" />
        </div>
        <div className="flex-1 relative text-sm font-manrope text-neutral-800 text-left inline-block min-w-[91px] max-w-full">
          Keep me signed in
        </div>
      </div>
      <Button
        className="self-stretch h-11 mq1050:pl-5 mq1050:pr-5 mq1050:box-border"
        disableElevation
        variant="contained"
        sx={{
          textTransform: "none",
          color: "#fff",
          fontSize: "16",
          background: "#00b4d8",
          borderRadius: "4px",
          "&:hover": { background: "#00b4d8" },
          height: 44,
        }}
      >
        Continue
      </Button>
      <section className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-2 gap-[5px]">
        <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
          <div className="w-28 flex flex-row items-start justify-start relative">
            <div className="h-px w-[281px] absolute !m-[0] bottom-[16px] left-[calc(50%_-_140px)] border-neutral-600 border-t-[1px] border-solid box-border" />
            <div className="h-[35px] flex-1 bg-base-white flex flex-row items-start justify-start p-2 box-border whitespace-nowrap z-[1]">
              <div className="self-stretch flex-1 relative text-sm font-medium font-manrope text-neutral-600 text-left overflow-hidden text-ellipsis whitespace-nowrap">
                or sign up with
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-center flex-wrap content-start gap-1">
          <div className="rounded border-lightgray border-[1px] border-solid flex flex-row items-start justify-start py-1.5 px-[30px] gap-1.5 opacity-[0.8]">
            <img
              className="h-4 w-4 relative min-h-[16px]"
              alt=""
              src={logoGoogleg48dp}
            />
            <div className="relative text-xs font-manrope text-neutral-800 text-left inline-block min-w-[40px]">
              Google
            </div>
          </div>
          <div className="rounded border-lightgray border-[1px] border-solid flex flex-row items-start justify-start py-1.5 px-[35px] gap-1.5">
            <div className="flex flex-row items-center justify-center">
              <img className="h-4 w-3.5 relative" alt="" src={path4} />
            </div>
            <div className="relative text-xs font-manrope text-neutral-800 text-left inline-block min-w-[32px]">
              Apple
            </div>
          </div>
          <Button
            className="h-8 flex-1 min-w-[81px]"
            startIcon={<img width="16px" height="16px" src="/path14.svg" alt=" "/>}
            disableElevation
            variant="outlined"
            sx={{
              textTransform: "none",
              color: "#191d23",
              fontSize: "12",
              borderColor: "#d0d5dd",
              borderRadius: "4px",
              "&:hover": { borderColor: "#d0d5dd" },
              height: 32,
            }}
          >
            Facebook
          </Button>
        </div>
      </section>
      <div className="self-stretch h-[19px] relative text-sm text-center inline-block overflow-hidden text-ellipsis whitespace-nowrap shrink-0">
        <span className="font-manrope text-neutral-800">{`Don’t have an Account? `}</span>
        <b className="font-manrope text-deepskyblue">Sign up here</b>
      </div>
    </form>
  );
};

AdminLogin.propTypes = {
  title: PropTypes.string,
  icons: PropTypes.string,
  logoGoogleg48dp: PropTypes.string,
  path4: PropTypes.string,

  /** Style props */
  adminLoginPosition: PropTypes.any,
  titleTextDecoration: PropTypes.any,
  titleMargin: PropTypes.any,
};

export default AdminLogin;;