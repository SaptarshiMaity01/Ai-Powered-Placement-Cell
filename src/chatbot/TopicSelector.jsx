import React from 'react';
import { Button } from '../components/ui/button';
import { 
  Briefcase, BookOpen, GraduationCap, Code, 
  Brain, Calculator, Clock, ThumbsUp 
} from 'lucide-react';
import { cn } from '../components/lib/utils';

const topics = [
  {
    id: 'job-search',
    label: 'Job Search',
    icon: Briefcase,
    description: 'Find the right job opportunities'
  },
  {
    id: 'interviews',
    label: 'Interviews',
    icon: ThumbsUp,
    description: 'Prepare for job interviews'
  },
  {
    id: 'education',
    label: 'Education',
    icon: GraduationCap,
    description: 'Plan your learning journey'
  },
  {
    id: 'career-planning',
    label: 'Career Planning',
    icon: BookOpen,
    description: 'Strategic career development'
  },
  {
    id: 'coding-tests',
    label: 'Coding Tests',
    icon: Code,
    description: 'Practice for coding interviews'
  },
  {
    id: 'aptitude-tests',
    label: 'Aptitude Tests',
    icon: Calculator,
    description: 'Prepare for assessment tests'
  },
  {
    id: 'time-management',
    label: 'Time Management',
    icon: Clock,
    description: 'Improve productivity skills'
  },
  {
    id: 'soft-skills',
    label: 'Soft Skills',
    icon: Brain,
    description: 'Develop professional attributes'
  }
];

const TopicSelector = ({ selectedTopic, onSelectTopic }) => {
  return (
    <div className="w-full space-y-2 py-4">
      <h3 className="text-lg font-semibold mb-3">Topics</h3>
      <div className="grid grid-cols-1 gap-2">
        {topics.map((topic) => {
          const Icon = topic.icon;
          const isSelected = selectedTopic === topic.id;
          
          return (
            <Button
              key={topic.id}
              variant={isSelected ? "default" : "ghost"}
              className={cn(
                "justify-start h-auto py-3",
                isSelected ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
              )}
              onClick={() => onSelectTopic(topic.id)}
            >
              <Icon className="mr-2 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">{topic.label}</div>
                <div className={cn(
                  "text-xs",
                  isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                )}>
                  {topic.description}
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default TopicSelector;
