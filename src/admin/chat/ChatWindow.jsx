import { useState, useRef, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { SendHorizonal, Phone, Video, RefreshCw, AlertCircle } from "lucide-react";
import { ScrollArea } from "../../components/ui/scroll-area";
import { cn } from "../../components/lib/utils";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

const ChatWindow = ({ 
  activeUser, 
  messages, 
  onSendMessage, 
  isTyping,
  currentUserId
}) => {
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef(null);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRetryMessage = (messageId) => {
    const message = messages.find(msg => msg.id === messageId);
    if (message) {
      onSendMessage(message.content);
    }
  };

  // Group messages by date
  const groupedMessages = {};
  messages.forEach(message => {
    const dateKey = format(new Date(message.timestamp), 'yyyy-MM-dd');
    if (!groupedMessages[dateKey]) {
      groupedMessages[dateKey] = [];
    }
    groupedMessages[dateKey].push(message);
  });

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-linkedin-light text-linkedin-blue font-medium">
                  {activeUser.avatar || activeUser.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {activeUser.online && (
                <div className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-background"></div>
              )}
            </div>
            <div>
              <CardTitle className="text-base">{activeUser.name}</CardTitle>
              <p className="text-xs text-muted-foreground">
                {activeUser.online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <ScrollArea ref={scrollAreaRef} className="flex-grow p-4">
        <div className="space-y-6">
          {Object.keys(groupedMessages).map(dateKey => (
            <div key={dateKey} className="space-y-4">
              <div className="flex justify-center">
                <span className="text-xs text-muted-foreground bg-background px-3 py-1 rounded-full">
                  {format(new Date(dateKey), 'MMMM d, yyyy')}
                </span>
              </div>
              
              {groupedMessages[dateKey].map(message => {
                const isSentByMe = message.senderId._id.toString() === currentUserId.toString();
                return (
                  <div 
                    key={message.id || message._id}
                    className={cn("flex", isSentByMe ? "justify-end" : "justify-start")}
                  >
                    <div 
                      className={cn(
                        "max-w-[75%] rounded-2xl px-4 py-2 text-sm relative",
                        isSentByMe 
                          ? "bg-linkedin-blue text-white rounded-br-none" 
                          : "bg-muted rounded-bl-none"
                      )}
                    >
                      <div>{message.content}</div>
                      <div className={cn(
                        "flex items-center justify-end space-x-1 mt-1",
                        isSentByMe ? "text-blue-100" : "text-muted-foreground"
                      )}>
                        <span className="text-xs">
                          {format(new Date(message.timestamp), 'h:mm a')}
                        </span>
                        {isSentByMe && (
                          message.status === 'failed' ? (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-4 w-4 text-destructive hover:text-destructive"
                              onClick={() => handleRetryMessage(message.id)}
                            >
                              <RefreshCw className="h-3 w-3" />
                            </Button>
                          ) : message.status === 'sending' ? (
                            <RefreshCw className="h-3 w-3 animate-spin" />
                          ) : (
                            <span className="text-xs">✓</span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[75%] rounded-2xl px-4 py-2 text-sm bg-muted rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <CardFooter className="border-t p-4">
        <div className="flex w-full space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!newMessage.trim()}
          >
            <SendHorizonal className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatWindow;