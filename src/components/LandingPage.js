import Footer from "./Footer";
import FrameComponent from "./FrameComponent";
import FrameComponent1 from "./frameComponent1";

import FrameComponent2 from "./FrameComponent2";

import Card from "./Card"


const LandingPage = () => {
  return (
    <div className="w-full bg-[#030a1c] overflow-hidden pr-0 pb-px leading-[normal] tracking-[normal] ">
      <FrameComponent />

      <FrameComponent1 />

      <Card/>
     
      <FrameComponent2 />

      <Footer />
    </div>
  );
};

export default LandingPage;
