import React from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../components/ui/card';
import { Sparkles } from 'lucide-react';

const WelcomeMessage = () => {
  return (
    <Card className="w-full max-w-xl mx-auto mb-8 mt-4 shadow-md animate-fade-in">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <CardTitle className="text-2xl">Welcome to SkillSpark</CardTitle>
          <CardDescription>Your AI-powered career coach</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="text-sm space-y-2">
        <p>I'm here to help with your career journey. You can ask me about:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Job search strategies and resume optimization</li>
          <li>Interview preparation and common questions</li>
          <li>Educational pathways and learning resources</li>
          <li>Career planning and advancement</li>
          <li>Coding exercises and practice problems</li>
          <li>Aptitude test preparation</li>
        </ul>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground border-t pt-4">
        <p>Select a topic or simply start chatting!</p>
      </CardFooter>
    </Card>
  );
};

export default WelcomeMessage;
