import { useState } from "react";
import "aos/dist/aos.css";

const panels = [
  {
    id: 1,
    title: "AI Mock Interview",
    description: "Practice with our AI-powered interview simulator that provides real-time feedback on your responses, body language, and communication skills",
    extraInfo: "Select Any Job Role",
    icon: "🎤",
    days: [
      { day: "Start Now", items: [] },
      
    ],
  },
  {
    id: 2,
    title: "AI Resume Analyzer/Builder",
    description: "Get your resume analyzed and optimized by our AI to highlight your strengths and match job requirements perfectly",
    extraInfo: "ATS Compatible",
    icon: "📄",
    content: ["Keyword Optimization", "Skills Gap Analysis", "Formatting Recommendations"],
  },
  {
    id: 3,
    title: "Personalized Job Recommendation",
    description: "Our Algorithm matches your skills and preferences with the best job opportunities in the market",
    extraInfo: "1000+ Companies",
    icon: "🔍",
  },
  {
    id: 4,
    title: "Career Chat Bot",
    description: "24/7 AI career assistant that answers your questions about job search, interview prep, and career development",
    extraInfo: "Instant Responses",
    icon: "🤖",
  },
];

const ExpandablePanels = () => {
  const [activePanel, setActivePanel] = useState(1);
  const [isHovering, setIsHovering] = useState(false);

  const panelColors = [
    { base: "bg-[#0b1c3e]", active: "bg-[#29B6F6]" },  // AI Mock Interview
    { base: "bg-[#0b1c3e]", active: "bg-[#00B8D4]" },  // AI Resume Parser
    { base: "bg-[#0b1c3e]", active: "bg-[#FF5252]" },  // Job Recommendation
    { base: "bg-[#0b1c3e]", active: "bg-[#64DD17]" }   // Career Chat Bot
  ];

  return (
    <div className="w-full px-[160px] md:px-40 mb-20">
      <div className="text-white font-roboto-serif mb-12">
        <h2 className="text-4xl md:text-5xl mb-4">SERVICES</h2>
        <h1 className="text-4xl md:text-5xl leading-tight mb-6">
          Unlock the Potential of Your Career Development
        </h1>
        <p className="text-xl md:text-2xl leading-relaxed font-light max-w-3xl">
          Discover how our AI-powered tools can transform your job search and career growth. 
          From interview preparation to resume optimization, we offer comprehensive solutions 
          designed to help you succeed in today's competitive market.
        </p>
      </div>
      
      <div
        className="flex w-full h-[500px]"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {panels.map((panel, index) => (
          <div
            key={panel.id}
            className={`relative flex flex-col justify-between p-6 h-full transition-all duration-500 ease-in-out text-white/80  
              ${index === 0 ? "rounded-l-xl" : ""}
              ${index === panels.length - 1 ? "rounded-r-xl" : ""}
              ${activePanel === panel.id 
                ? `w-1/2 ${panelColors[index].active}` 
                : `w-1/6 ${panelColors[index].base} hover:w-1/5 hover:${panelColors[index].active}`
              }`}
            onMouseEnter={() => setActivePanel(panel.id)}
          >
            <div className="text-4xl mb-4">{panel.icon}</div>
            <div className="flex-1 flex flex-col">
              <h3 className="font-semibold text-2xl mb-4">{panel.title}</h3>
              
              {activePanel === panel.id && (
                <>
                  {/* Quarter-circle image in bottom right */}
                  <div className="absolute bottom-0 right-0 w-48 h-48 overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-full h-full rounded-tl-full bg-white/10 backdrop-blur-sm"></div>
                    <img 
                      src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg" 
                      alt="Coding Practice" 
                      className="absolute bottom-0 right-0 w-full h-full object-cover rounded-tl-full clip-quarter-circle"
                      style={{
                        clipPath: 'circle(70% at 100% 100%)',
                        transform: 'scale(1.1)'
                      }}
                    />
                  </div>
                  
                  <div className="flex-1 overflow-y-auto pr-12 pb-12">
                    <p className="text-lg mb-6">
                      {panel.description}
                    </p>
                    
                    {panel.id === 1 && (
                      <div className="mb-4">
                        {panel.days.map((day, index) => (
                          <div key={index} className="mb-4">
                            <h4 className="font-medium text-xl mb-2">{day.day}</h4>
                            {day.items.map((item, i) => (
                              <div key={i} className="ml-4 text-lg">
                                • {item}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {panel.id === 2 && (
                      <div className="mb-4">
                        {panel.content.map((item, index) => (
                          <div key={index} className="text-lg mb-2">
                            {item === "Projects" ? (
                              <div className="font-medium text-xl mb-2">{item}</div>
                            ) : (
                              <div>• {item}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
              
              <p className="text-lg font-medium mt-auto">
                {panel.extraInfo}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpandablePanels;