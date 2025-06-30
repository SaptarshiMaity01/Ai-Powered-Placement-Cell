import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { SendHorizontal, Loader2 } from 'lucide-react';
import { cn } from '../components/lib/utils';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex items-end gap-2 bg-card p-4 rounded-lg border">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about jobs, interviews, education, or career advice..."
        className="resize-none min-h-[60px]"
        disabled={isLoading}
      />
      <Button 
        onClick={handleSubmit} 
        size="icon" 
        className={cn(
          "h-10 w-10 rounded-full flex-shrink-0",
          isLoading ? "cursor-not-allowed" : "cursor-pointer"
        )}
        disabled={isLoading || !message.trim()}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <SendHorizontal className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default ChatInput;
