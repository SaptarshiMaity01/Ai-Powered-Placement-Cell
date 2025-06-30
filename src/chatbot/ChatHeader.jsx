import React from 'react';
import {
  Briefcase, BookOpen, GraduationCap, Code,
  Brain, Calculator, Clock, ThumbsUp, Sparkles
} from 'lucide-react';

// Define topic options manually since we're not using TypeScript types
const topicIcons = {
  'job-search': Briefcase,
  'interviews': ThumbsUp,
  'education': GraduationCap,
  'career-planning': BookOpen,
  'coding-tests': Code,
  'aptitude-tests': Calculator,
  'time-management': Clock,
  'soft-skills': Brain
};

const topicTitles = {
  'job-search': 'Job Search Assistant',
  'interviews': 'Interview Coach',
  'education': 'Education Planner',
  'career-planning': 'Career Development Advisor',
  'coding-tests': 'Coding Test Trainer',
  'aptitude-tests': 'Aptitude Test Prep',
  'time-management': 'Productivity Coach',
  'soft-skills': 'Soft Skills Development'
};

const ChatHeader = ({ selectedTopic }) => {
  const Icon = selectedTopic ? topicIcons[selectedTopic] : Sparkles;
  const title = selectedTopic 
    ? topicTitles[selectedTopic]
    : 'SkillSpark ';
  
  return (
    <div className="flex items-center p-4 border-b">
      <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground mr-3">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">
          {selectedTopic 
            ? 'AI-powered guidance tailored to your needs'
            : 'Your AI career Chatbot powered by qwen-2.5-32b'}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
