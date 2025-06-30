import React, { useState, useEffect } from 'react';
import TopicSelector from './TopicSelector';
import ChatHeader from './ChatHeader';
import ChatContainer from './ChatContainer';
import ChatInput from './ChatInput';
import CareerInsights from './CareerInsights';

import APIKeyForm from '../components/ApiKeyForm';
import { generateChatCompletion } from '../services/apic';
import { useToast } from "../components/ui/use-toast";

const CareerGuidanceChatbot = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedApiKey = localStorage.getItem("groqApiKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleApiKeySubmit = (key) => {
    setApiKey(key);
    localStorage.setItem("groqApiKey", key);
    // toast({
    //   title: "API Key Saved",
    //   description: "Your API key has been securely stored.",
    // });
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setIsSidebarOpen(false);

    const topicPrompts = {
      'job-search': "I need help with job search strategies and finding suitable positions.",
      'interviews': "I want to prepare for job interviews. Can you help me?",
      'education': "I'm looking for advice on educational pathways and learning opportunities.",
      'career-planning': "I need guidance on career planning and professional development.",
      'coding-tests': "Help me prepare for coding interviews and technical assessments.",
      'aptitude-tests': "I want to practice for aptitude tests for job applications.",
      'time-management': "I want to improve my productivity and time management skills.",
      'soft-skills': "I need advice on developing professional soft skills."
    };

    if (topicPrompts[topic] && messages.length === 0) {
      handleSendMessage(topicPrompts[topic]);
    }
  };



  const systemMessage = (topic) => {
    const basePrompt = "You are SkillSpark, an AI-powered career coach specializing in professional development. You provide helpful, accurate, and concise advice. Your responses should be friendly, encouraging, and tailored to the user's career stage.";

    let specialization = "";
    if (topic) {
      const topicSpecializations = {
        'job-search': "Focus on job search strategies, resume optimization, and finding suitable positions.",
        'interviews': "Emphasize interview preparation, common questions, and techniques for successful interviews.",
        'education': "Concentrate on educational pathways, courses, degrees, and learning resources.",
        'career-planning': "Specialize in career development, promotion strategies, and long-term planning.",
        'coding-tests': "Focus on coding interview preparation, algorithms, data structures, and problem-solving.",
        'aptitude-tests': "Emphasize numerical, verbal, and logical reasoning test preparation.",
        'time-management': "Concentrate on productivity techniques, prioritization, and work-life balance.",
        'soft-skills': "Focus on communication, teamwork, leadership, and other professional soft skills."
      };
      specialization = topicSpecializations[topic];
    }

    return {
      role: "system",
      content: `${basePrompt} ${specialization}`
    };
  };

  const handleSendMessage = async (message) => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Groq API key to continue.",
        variant: "destructive"
      });
      return;
    }

    const userMessage = {
      content: message,
      role: 'user',
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const apiMessages = [
        systemMessage(selectedTopic),
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        { role: "user", content: message }
      ];

      const response = await generateChatCompletion(apiMessages, apiKey);

      const botMessage = {
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Failed to get a response from the AI.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!apiKey && <APIKeyForm apiKey={apiKey} setApiKey={handleApiKeySubmit} />}

      <div className="flex h-screen bg-background text-black">
        <aside className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          translate-x-0
          static
          z-40 md:z-auto
          w-72 h-full
          bg-card
          border-r
          transition-transform duration-300 ease-in-out
          flex flex-col
          overflow-hidden
        `}>
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">SkillSpark</h2>
            <p className="text-sm text-muted-foreground">AI Career Chatbot</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <TopicSelector 
                selectedTopic={selectedTopic} 
                onSelectTopic={handleTopicSelect} 
              />
              <CareerInsights />
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col relative">
          {/* Added a positioned container for the toggle button */}
          
            
       

          <ChatHeader selectedTopic={selectedTopic} />

          <ChatContainer 
            messages={messages}
            isLoading={isLoading}
          />

          <div className="p-4 border-t bg-background">
            <ChatInput 
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default CareerGuidanceChatbot;