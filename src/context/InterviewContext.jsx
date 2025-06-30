import React, { createContext, useContext, useState } from 'react';

const defaultIndustries = [
  { id: 'tech', name: 'Technology' },
  { id: 'finance', name: 'Finance' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'education', name: 'Education' },
  { id: 'marketing', name: 'Marketing' },
];

const defaultRolesByIndustry = {
  tech: [
    { id: 'swe', name: 'Software Engineer', industry: 'tech' },
    { id: 'pm', name: 'Product Manager', industry: 'tech' },
    { id: 'data', name: 'Data Scientist', industry: 'tech' },
    { id: 'ux', name: 'UX Designer', industry: 'tech' },
  ],
  finance: [
    { id: 'analyst', name: 'Financial Analyst', industry: 'finance' },
    { id: 'advisor', name: 'Financial Advisor', industry: 'finance' },
    { id: 'accountant', name: 'Accountant', industry: 'finance' },
  ],
  healthcare: [
    { id: 'nurse', name: 'Nurse', industry: 'healthcare' },
    { id: 'doctor', name: 'Physician', industry: 'healthcare' },
    { id: 'therapist', name: 'Therapist', industry: 'healthcare' },
  ],
  education: [
    { id: 'teacher', name: 'Teacher', industry: 'education' },
    { id: 'professor', name: 'Professor', industry: 'education' },
    { id: 'counselor', name: 'School Counselor', industry: 'education' },
  ],
  marketing: [
    { id: 'manager', name: 'Marketing Manager', industry: 'marketing' },
    { id: 'specialist', name: 'Digital Marketing Specialist', industry: 'marketing' },
    { id: 'content', name: 'Content Strategist', industry: 'marketing' },
  ],
};

const InterviewContext = createContext(undefined);

export const InterviewProvider = ({ children }) => {
  const [apiKeySettings, setApiKeySettings] = useState({ groqApiKey: '' });
  const [currentSession, setCurrentSession] = useState(null);
  const [allSessions, setAllSessions] = useState([]);

  const startNewSession = (industry, role) => {
    const newSession = {
      id: `session-${Date.now()}`,
      industry,
      role,
      questions: [],
      messages: [
        {
          id: `message-${Date.now()}`,
          role: 'system',
          content: `You are an AI interviewer for a ${role.name} role in the ${industry.name} industry. Ask relevant interview questions one at a time. After the candidate responds to each question, provide brief feedback before asking the next question.`,
          timestamp: new Date(),
        },
        {
          id: `message-${Date.now() + 1}`,
          role: 'assistant',
          content: `Hello! I'll be conducting your mock interview for the ${role.name} position today. Let's get started with the first question.`,
          timestamp: new Date(),
        },
      ],
      startTime: new Date(),
    };
    setCurrentSession(newSession);
    setAllSessions((prev) => [...prev, newSession]);
  };

  const addMessage = (content, role) => {
    if (!currentSession) return;

    const newMessage = {
      id: `message-${Date.now()}`,
      role,
      content,
      timestamp: new Date(),
    };

    setCurrentSession((prev) => {
      if (!prev) return null;
      const updatedSession = {
        ...prev,
        messages: [...prev.messages, newMessage],
      };

      setAllSessions((sessions) =>
        sessions.map((session) =>
          session.id === updatedSession.id ? updatedSession : session
        )
      );

      return updatedSession;
    });
  };

  const endCurrentSession = () => {
    if (!currentSession) return;

    setCurrentSession((prev) => {
      if (!prev) return null;
      const updatedSession = {
        ...prev,
        endTime: new Date(),
      };

      setAllSessions((sessions) =>
        sessions.map((session) =>
          session.id === updatedSession.id ? updatedSession : session
        )
      );

      return updatedSession;
    });
  };

  const saveRecording = (url) => {
    if (!currentSession) return;

    setCurrentSession((prev) => {
      if (!prev) return null;
      const updatedSession = {
        ...prev,
        recordingUrl: url,
      };

      setAllSessions((sessions) =>
        sessions.map((session) =>
          session.id === updatedSession.id ? updatedSession : session
        )
      );

      return updatedSession;
    });
  };

  const value = {
    apiKeySettings,
    setApiKeySettings,
    currentSession,
    startNewSession,
    addMessage,
    endCurrentSession,
    saveRecording,
    allSessions,
    industries: defaultIndustries,
    rolesByIndustry: defaultRolesByIndustry,
  };

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (context === undefined) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
};
