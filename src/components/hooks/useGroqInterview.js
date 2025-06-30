import { useState } from 'react';
import { Groq } from 'groq-sdk';

export const useGroqInterview = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateQuestions = async (jobRole, field, apiKey) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Initializing Groq client with API key');
      const groq = new Groq({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Required for client-side usage
      });

      const systemPrompt = 'You are an expert technical interviewer. Respond with a valid JSON array containing interview questions.';
      const userPrompt = `Generate 5 interview questions for a ${jobRole} position in the ${field} industry. Include 2 technical questions if relevant. Format the response as a JSON array with 'question' and optional 'codeChallenge' properties for each question.`;
      
      console.log('Sending request to Groq API');
      const chatCompletion = await groq.chat.completions.create({
        "messages": [
          { role: 'system', content: systemPrompt },          
          { role: 'user', content: userPrompt }
        ],
        "model": "qwen-qwq-32b",
        "temperature": 0.6,
        "max_completion_tokens": 4096,
        "top_p": 0.95,
        "stream": true,
        "stop": null
      });

      let fullContent = '';
      // Process the stream
      for await (const chunk of chatCompletion) {
        const content = chunk.choices[0]?.delta?.content || '';
        fullContent += content;
        // Could implement progressive updates here if desired
      }
      
      console.log('Full content from API:', fullContent);

      let parsedQuestions;
      try {
        parsedQuestions = JSON.parse(fullContent);
      } catch (parseError) {
        console.log('Direct parsing failed, trying to extract JSON from text');
        const jsonMatch = fullContent.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          parsedQuestions = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('Could not extract valid JSON from API response');
        }
      }

      if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
        throw new Error('Invalid questions format from API');
      }

      setQuestions(parsedQuestions);
    } catch (error) {
      console.error('Error generating questions:', error);
      setError(`Failed to generate questions: ${error.message || 'Unknown error'}`);
      
      // Fallback questions
      setQuestions([
        { question: "What made you interested in this role?" },
        { question: "Can you describe your most challenging project?" },
        { question: "How do you handle tight deadlines?" },
        { 
          question: "Technical question: Implement a function that finds duplicates in an array",
          codeChallenge: "Write a function that takes an array of numbers and returns an array of numbers that appear more than once."
        },
        { question: "Where do you see yourself in 5 years?" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const evaluateAnswer = async (answer, jobRole, apiKey) => {
    try {
      const groq = new Groq({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });
  
      // Update the system prompt to be more specific about feedback format
      const systemPrompt = 'You are an expert technical interviewer. Provide personalized feedback that addresses what the candidate said and specific areas to improve.';
      
      // Update the user prompt to request more specific feedback
      const userPrompt = `
      Evaluate this answer for a ${jobRole} position:
      
      "${answer}"
      
      Provide feedback in 2-3 sentences that:
      1. Acknowledges what was good about their answer
      2. Points out specific ways they could improve
      3. Focuses on content rather than general advice
      
      Do not include any "thinking" process in your response. Just provide the direct feedback.`;
  
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        model: 'qwen-qwq-32b',
        temperature: 0.7,
        max_tokens: 8000,
        top_p: 0.95,
        stream: true
      });
  
      let fullFeedback = '';
      for await (const chunk of chatCompletion) {
        const content = chunk.choices[0]?.delta?.content || '';
        fullFeedback += content;
      }
  
      // Check if feedback contains any <think> tags and remove them
      const cleanedFeedback = fullFeedback
        .replace(/<think>[\s\S]*?<\/think>/g, '')
        .trim();
  
      return cleanedFeedback || "Your response shows understanding of the concept. To improve, consider providing more specific examples and explaining your reasoning in greater detail.";
    } catch (error) {
      console.error('Error evaluating answer:', error);
      return "Your answer demonstrates good knowledge. To strengthen it further, try including more specific examples from your experience and explaining the practical applications of your approach.";
    }
  };

  return {
    questions,
    isLoading,
    error,
    generateQuestions,
    evaluateAnswer,
  };
};