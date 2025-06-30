import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import { Loader2 } from 'lucide-react';
import WelcomeMessage from './WelcomeMessage';

const ChatContainer = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.length === 0 ? (
        <WelcomeMessage />
      ) : (
        messages.map((msg, index) => (
          <ChatMessage 
            key={index} 
            content={msg.content} 
            role={msg.role} 
            timestamp={msg.timestamp} 
          />
        ))
      )}
      
      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <div className="flex items-center space-x-2 text-accent animate-pulse-light">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm font-medium">Thinking...</span>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatContainer;
