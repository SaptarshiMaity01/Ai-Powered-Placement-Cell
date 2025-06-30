import React from 'react';
import { Avatar } from '../components/ui/avatar';
import { cn } from '../components/lib/utils';
import { Bot, User } from 'lucide-react';

const ChatMessage = ({ content, role, timestamp }) => {
  const isUser = role === 'user';

  return (
    <div className={cn(
      "flex w-full mb-4 items-start",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <Avatar className="h-8 w-8 mr-2 bg-accent text-accent-foreground">
          <Bot className="h-4 w-4" />
        </Avatar>
      )}

      <div className={cn(
        isUser ? "chat-bubble-user" : "chat-bubble-bot"
      )}>
        <div className="whitespace-pre-wrap">{content}</div>
        <div className={cn(
          "text-xs mt-1",
          isUser ? "text-primary-foreground/80" : "text-secondary-foreground/80"
        )}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 ml-2 bg-primary text-primary-foreground">
          <User className="h-4 w-4" />
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
