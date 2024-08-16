import Navheader from "src/components/Navheader";
import FrameComponent from "src/components/FrameComponent";
import RectangleComponent from "src/components/RectangleComponent";
import FrameComponent1 from "src/components/FrameComponent1";
import UnlockPotentialInnerContent from "src/components/UnlockPotentialInnerContent";
import FrameComponent2 from "src/components/FrameComponent2";
import Footer from "src/components/Footer";

const Desktop = () => {
  return (
    <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start pt-0 px-0 pb-px box-border leading-[normal] tracking-[normal] text-left text-46xl text-black font-inter">
      <Navheader />
      <FrameComponent />
      <div className="w-px h-px !m-[0] absolute top-[1024px] right-[-1px] overflow-hidden shrink-0 flex flex-row items-start justify-start">
        <RectangleComponent />
      </div>
      <div className="w-64 h-[206px] relative bg-gray overflow-hidden shrink-0 hidden z-[3]">
        <div className="absolute top-[0px] left-[0px] w-full h-full flex flex-row items-center justify-center py-2.5 px-[50px] box-border">
          <div className="relative mq450:text-20xl mq1050:text-33xl" />
        </div>
      </div>
      <FrameComponent1 />
      <section className="self-stretch border-black border-[1px] border-solid box-border overflow-hidden flex flex-row flex-wrap items-start justify-start py-14 px-12 gap-[43px] max-w-full mq750:gap-[21px] mq750:py-9 mq750:px-6 mq750:box-border">
        <div className="h-[584px] flex-1 relative [background:radial-gradient(50%_50%_at_50%_50%,_#009bb9,_#90e0ef_32.6%,_#caf0f8_52.2%,_#afe4ef_70.44%,_#0077b6)] overflow-hidden min-w-[326px] max-w-full" />
        <div className="h-[584px] flex-1 relative [background:radial-gradient(50%_50%_at_50%_50%,_#90e0ef,_#caf0f8_29.96%,_#009bb9_72.39%,_#0091b9_86.9%,_#0077b6)] overflow-hidden min-w-[326px] max-w-full" />
        <img
          className="h-[584px] w-[254px] relative overflow-hidden shrink-0 min-h-[584px]"
          loading="lazy"
          alt=""
          src="/frame-30.svg"
        />
      </section>
      <img
        className="w-full h-[1.1px] absolute !m-[0] right-[0px] bottom-[1475px] left-[0px] max-w-full overflow-hidden shrink-0 object-contain z-[2]"
        alt=""
        src="/line-12.svg"
      />
      <section className="self-stretch flex flex-row items-start justify-start pt-0 pb-32 pl-12 pr-[50px] box-border max-w-full lg:pb-[83px] lg:box-border mq450:pb-[35px] mq450:box-border mq750:pl-6 mq750:pr-[25px] mq750:box-border mq1050:pb-[54px] mq1050:box-border">
        <div className="flex-1 flex flex-col items-start justify-start gap-[53px] max-w-full mq750:gap-[26px]">
          <UnlockPotentialInnerContent />
          <FrameComponent2 />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Desktop;