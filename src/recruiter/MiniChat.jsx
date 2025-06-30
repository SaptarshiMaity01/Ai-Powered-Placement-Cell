import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ScrollArea } from "../components/ui/scroll-area";
import { Send, Phone, Video, PaperclipIcon } from "lucide-react";

/**
 * @param {{ 
 *   contact: { id: string, name: string, avatar?: string, status?: string, role?: string }, 
 *   messages: { id: string, sender: "user" | "contact", text: string, timestamp: string, read?: boolean }[], 
 *   onSendMessage: (text: string) => void, 
 *   onCall?: () => void, 
 *   onVideoCall?: () => void, 
 *   onAttachFile?: () => void 
 * }} props 
 */
 const MiniChat = ({
  contact,
  messages,
  onSendMessage,
  onCall,
  onVideoCall,
  onAttachFile,
}) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <Card className="min-h-[400px] max-w-full flex flex-col border rounded-lg">
      <CardHeader className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar>
                <AvatarImage src={contact.avatar} />
                <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(
                  contact.status
                )}`}
              />
            </div>
            <div>
              <CardTitle className="text-base">{contact.name}</CardTitle>
              {contact.role && (
                <p className="text-sm text-gray-500">{contact.role}</p>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            {onCall && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onCall}
                className="h-8 w-8"
              >
                <Phone className="h-4 w-4" />
              </Button>
            )}
            {onVideoCall && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onVideoCall}
                className="h-8 w-8"
              >
                <Video className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-0 overflow-hidden">
        <ScrollArea className="h-[350px] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-primary-foreground/70"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-3 border-t">
        <div className="flex items-center gap-2 w-full">
          {onAttachFile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onAttachFile}
              className="h-9 w-9"
            >
              <PaperclipIcon className="h-5 w-5" />
            </Button>
          )}
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            size="icon"
            className="h-9 w-9"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
export default MiniChat;