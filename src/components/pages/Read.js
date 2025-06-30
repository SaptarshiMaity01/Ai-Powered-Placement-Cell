import React from "react";
import Footer from "../Footer";

const Read = () => {
  return (
    <div className="w-full flex flex-col font-roboto-serif bg-[#030a1c] text-white/90">
      <div className="flex flex-row w-full min-h-screen border-t border-b border-slate-600 mb-12 mq750:flex-col mq750:border-none ">
        <div className="relative  w-1/2 h-full flex flex-col mq750:w-full">
          <h2 className="text-7xl font-bold   m-12 mq750:mx-5">
            ABOUT US
          </h2>
          <h1 className="text-29xl font-light   mx-12 mt-12 mb-20 mq750:mx-5 ">
            Revolutionizing Campus Placements with AI
          </h1>
          <div className="h-[1px]  mq750:hidden"></div>
          <div className="bg-gradient-to-b from-purple-300 to-purple-100 h-[700px] m-12 mq750:h-[350px] rounded-xl"></div>
        </div>
        <div className="w-1/2 min-h-screen p-4 border-l border-slate-600 mq750:w-full mq750:min-h-fit mq750:border-none">
          <div className="space-y-8">
            <div>
              <p className=" text-3xl text-gray-600 m-12">
                "Welcome to the T&P Nexus platform designed to transform how
                colleges approach campus recruitment. Our mission is simple: to
                bridge the gap between students, employers, and placement
                officers by leveraging the power of Artificial Intelligence.
                With features like automated resume screening, personalized job
                matching, and interactive interview preparation tools, we
                streamline the placement process for everyone involved. Whether
                you’re a student striving for your dream job, an employer
                searching for top talent, or a placement officer managing campus
                recruitments, our platform offers a centralized, efficient, and
                user-friendly solution. At our core, we are driven by
                innovation, efficiency, and scalability, ensuring that colleges
                can seamlessly transition from traditional, manual processes to
                a fully digital and data-driven system."
              </p>
              <p className="text-gray-600 mt-4 text-3xl m-12"></p>
            </div>
            <div>
              <h3 className="text-3xl font-bold  mb-2 m-12">
                OUR SERVICES
              </h3>
              <p className="text-gray-600 text-3xl m-12">
                What We Offer
                <br />
                AI-powered resume screening
                <br />
                Personalized job matching
                <br />
                Interview preparation tools
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold  mb-2 m-12">
                EXPERIENCE
              </h3>
              <p className="text-gray-600 text-3xl m-12">
                "With a proven track record in delivering scalable AI solutions,
                we strive to prioritize the unique needs of our users. Our
                platform evolves constantly, incorporating valuable feedback to
                stay ahead in addressing challenges in campus placements.
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold  mb-2 m-12">
                ACCOUNTABILITY
              </h3>
              <p className="text-gray-600 text-3xl m-12">
                "Our platform is built on a foundation of trust, transparency,
                and reliability. We are dedicated to delivering solutions that
                empower students, employers, and placement officers, ensuring a
                seamless and effective recruitment experience.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center h-full bg-slate-900 m-12 rounded-xl">
        <h2 className="text-sm font-semibold m-16 text-white">TESTIMONIALS</h2>
        <h1 className="text-3xl font-bold text-center m-12 text-white">
          Client Success Stories: Hear What Our Clients Say
        </h1>
        <div className="flex justify-center space-x-8 m-20 mq750:flex-col mq750:h-full mq750:m-10 mq750:space-x-0">
          <div className="text-center text-white  mq750:mb-10">
            <div className="text-xl mb-4 text-white items-center justify-center">
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
            </div>
            <p className="mb-4 text-white">
              This is the space to share a review from one of the business's
              clients or customers.
            </p>
            <p className="font-semibold text-white">CUSTOMER'S NAME</p>
          </div>
          <div className="text-center text-white mq750:mb-10">
            <div className="text-xl mb-4 items-center justify-center">
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
            </div>
            <p className="mb-4 text-white">
              This is the space to share a review from one of the business's
              clients or customers.
            </p>
            <p className="font-semibold text-white">CUSTOMER'S NAME</p>
          </div>
          <div className="text-center text-white">
            <div className="text-xl mb-4 items-center justify-center">
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
            </div>
            <p className="mb-4 text-white">
              This is the space to share a review from one of the business's
              clients or customers.
            </p>
            <p className="font-semibold text-white">CUSTOMER'S NAME</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Read;
