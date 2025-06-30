import React, { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import SpotlightBackground from "./SpotlightBackground";

const Services = () => {
  
  
  

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
  }, []);

  const services = [
    {
      title: "Resume Enhancement",
      description: "AI analyzes and enhances resume to optimize them for specific job application"
    },
    {
      title: "AI-Driven Interview Simulation",
      description: "Simulated interview environments powered by AI help students prepare for real-world interviews"
    },
    {
      title: "Predictive Analytics",
      description: "AI provides predictive reports on job market trends and candidate performance"
    },
    {
      title: "Personalized Job Recommendation",
      description: "Use AI to automatically screen resumes and match them with job description"
    }
  ];

  return (
    <div className="flex flex-row lg:flex-col w-full min-h-screen mb-5 p-12 border-b border-slate-600 text-white/90 font-roboto-serif">
      {/* Left Content - appears first on all screens */}
      <div className="w-1/2 lg:w-full p-5 lg:p-12">
        <h2 className="text-19xl md:text-5xl ">SERVICES</h2>
        <h1 className="mt-6 md:mt-10 text-19xl md:text-5xl " data-aos="zoom-in">
          Unlock the Potential of Your Recruitment and Placement Process
        </h1>
        <p className="mt-6 md:mt-10 text-5xl md:text-xl leading-relaxed font-light">
          Discover how our cutting-edge tools and services can transform your
          hiring and career development effort. From AI-driven resume building
          to advanced candidate screening, we offer a comprehensive suite
          designed to meet the needs of both students and HR professionals.
          Explore how we can support your journey to success.
        </p>
        
      </div>

      {/* Right Content - Services Grid */}
      <div className="w-1/2 grid grid-cols-2 lg:grid-cols-1 lg:w-full">
        {services.map((service, index) => (
          <div key={index} className="p-5  md:border-t-0">
            <SpotlightBackground 
              className="custom-spotlight-card h-full min-h-[300px] md:min-h-[350px] lg:min-h-[400px]" 
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <div className="w-8 h-8 bg-[#B0C4DE] rounded-full mb-6" data-aos="zoom-in"></div>
              <h1 className="text-20xl lg:text-13xl font-semibold mb-4">{service.title}</h1>
         
            </SpotlightBackground>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;