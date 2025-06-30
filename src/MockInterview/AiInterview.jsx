import React, { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Textarea } from "../components/ui/textarea";
import { ArrowLeft, ArrowRight, Settings, AlertTriangle, Clock, X } from "lucide-react";
import { useGroqInterview } from '../components/hooks/useGroqInterview';
import VideoFeed from './VideoFeed';
import SummaryPage from './SummaryPage';
import { useToast } from "../components/hooks/use-toast";

const AIInterview = () => {
  
  const HARDCODED_API_KEY = '';
  
  const [jobRole, setJobRole] = useState('');
  const [field, setField] = useState('');
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(5).fill(''));
  const [feedback, setFeedback] = useState(Array(5).fill(''));
  const [showSummary, setShowSummary] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState('');
  const [interviewTime, setInterviewTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const { toast } = useToast();

  const { questions, isLoading, error, generateQuestions, evaluateAnswer, setGroqApiKey } = useGroqInterview();

  // Timer effect
  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setInterviewTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleStart = async () => {
    if (jobRole && field) {
      console.log('Starting interview with API key:', HARDCODED_API_KEY);
      try {
        await generateQuestions(jobRole, field, HARDCODED_API_KEY);
        setStarted(true);
        setTimerActive(true);
        console.log('Interview started successfully');
      } catch (error) {
        console.error('Failed to start interview:', error);
        toast({
          title: "Error",
          description: "Failed to start interview. Please check your API key.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmitAnswer = async () => {
    if (answers[currentQuestionIndex]) {
      console.log('Submitting answer for question', currentQuestionIndex + 1);
      setIsSubmitting(true);
      setCurrentFeedback('');
      
      try {
        const feedbackResponse = await evaluateAnswer(
          answers[currentQuestionIndex], 
          jobRole,
          HARDCODED_API_KEY
        );
        console.log('Received feedback:', feedbackResponse);
        
        const newFeedback = [...feedback];
        newFeedback[currentQuestionIndex] = feedbackResponse;
        setFeedback(newFeedback);
        setCurrentFeedback(feedbackResponse);
      } catch (error) {
        console.error('Error getting feedback:', error);
        setCurrentFeedback("Could not get feedback. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleNext = () => {
    if (answers[currentQuestionIndex]) {
      if (currentQuestionIndex < 4) {
        console.log('Moving to next question');
        setCurrentQuestionIndex(prev => prev + 1);
        setCurrentFeedback('');
      } else {
        console.log('Interview completed, showing summary');
        setShowSummary(true);
        setTimerActive(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      console.log('Moving to previous question');
      setCurrentQuestionIndex(prev => prev - 1);
      setCurrentFeedback(feedback[currentQuestionIndex - 1] || '');
    }
  };

  const handleAnswerChange = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
    setCurrentFeedback('');
  };

  const handleEndInterview = () => {
    console.log('Interview ended manually');
    setShowSummary(true);
    setTimerActive(false);
  };

  const handleStartNew = () => {
    console.log('Starting new interview');
    setStarted(false);
    setShowSummary(false);
    setCurrentQuestionIndex(0);
    setAnswers(Array(5).fill(''));
    setFeedback(Array(5).fill(''));
    setCurrentFeedback('');
    setJobRole('');
    setField('');
    setInterviewTime(0);
  };

  const progress = ((currentQuestionIndex + 1) / 5) * 100;

  if (showSummary) {
    return (
      <SummaryPage 
        answers={answers}
        feedback={feedback}
        jobRole={jobRole}
        onStartNew={handleStartNew}
        interviewTime={formatTime(interviewTime)}
      />
    );
  }

  if (!started) {
    return (
      <Card className="p-6 w-full max-w-2xl mx-auto mt-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">AI Mock Interview</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Job Role</label>
            <Input
              placeholder="e.g., Frontend Developer"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              className="border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Field/Industry</label>
            <Input
              placeholder="e.g., Technology"
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="border-gray-300"
            />
          </div>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleStart}
            disabled={!jobRole || !field || isLoading}
          >
            {isLoading ? 
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div> : 
              'Start Interview'
            }
          </Button>
          
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-md flex items-start">
              <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto mt-8 shadow-lg relative">
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
          <Clock className="w-4 h-4 mr-1" />
          <span>{formatTime(interviewTime)}</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleEndInterview}
          className="text-red-600 hover:bg-red-50"
        >
          <X className="w-4 h-4 mr-1" />
          End Interview
        </Button>
      </div>

      <VideoFeed />
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Question {currentQuestionIndex + 1} of 5</span>
          <span className="text-sm font-medium text-gray-700">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2 bg-gray-200" />
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700">Loading questions...</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              {questions[currentQuestionIndex]?.question || 'Loading...'}
            </h3>
            {questions[currentQuestionIndex]?.codeChallenge && (
              <div className="bg-gray-50 p-4 rounded-md mb-4 font-mono text-sm border border-gray-200">
                {questions[currentQuestionIndex].codeChallenge}
              </div>
            )}
            <Textarea
              placeholder="Type your answer here..."
              className="min-h-[150px] border-gray-300"
              value={answers[currentQuestionIndex]}
              onChange={(e) => handleAnswerChange(e.target.value)}
            />
            
            <div className="mt-4">
              <Button
                onClick={handleSubmitAnswer}
                disabled={!answers[currentQuestionIndex] || isSubmitting}
                className="bg-green-600 hover:bg-green-700 w-full"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  'Submit Answer & Get Feedback'
                )}
              </Button>
            </div>
          </div>

          {currentFeedback && (
            <div className="mb-6 p-4 bg-blue-50 rounded-md border border-blue-100">
              <h4 className="font-semibold mb-2 text-blue-800">Feedback:</h4>
              <p className="text-gray-700">{currentFeedback}</p>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="border-gray-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!answers[currentQuestionIndex] || !currentFeedback}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {currentQuestionIndex === 4 ? 'Finish' : 'Next'} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

export default AIInterview;