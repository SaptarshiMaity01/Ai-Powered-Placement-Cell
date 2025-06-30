import React from "react";
import AIInterview from "./AiInterview";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">AI Mock Interview</h1>
        <AIInterview />
      </div>
    </div>
  );
};

export default Index;
