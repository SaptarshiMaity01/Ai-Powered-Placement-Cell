import { useState, useEffect, useRef } from "react";
import UserChatSidebar from "./UserChatSidebar";
import ChatWindow from "./ChatWindow";
import socket, { connectSocket, disconnectSocket } from "./socket";
import { useAuth } from "../../services/AuthContext";
import { Card } from "../../components/ui/card";

const Chat = () => {
  const { user: currentUser } = useAuth();
  const [activeUserId, setActiveUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser?._id) {
      console.log("Current user detected, connecting socket:", currentUser._id);
      connectSocket(currentUser._id);
      
      const fetchInitialData = async () => {
        try {
          // Make sure we have a valid token before making requests
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('No authentication token found');
          }
          
          // Make the request
          const usersResponse = await fetch('/api/messages/users', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          // Check if the response is ok (status code 200-299)
          if (!usersResponse.ok) {
            const errorData = await usersResponse.json().catch(() => ({}));
            console.error("Error response data:", errorData);
            throw new Error(`Failed to fetch users: ${errorData.message || usersResponse.statusText}`);
          }
          
          const usersData = await usersResponse.json();
          console.log("Users with unread messages:", usersData.filter(u => u.hasNewMessage).map(u => u.name));
          setUsers(usersData);
      
          // Only fetch messages if activeUserId exists
          if (activeUserId) {
            const messagesResponse = await fetch(`/api/messages/${activeUserId}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            
            if (!messagesResponse.ok) {
              throw new Error('Failed to fetch messages');
            }
            
            const messagesData = await messagesResponse.json();
            setMessages(messagesData);
          }
        } catch (err) {
          console.error("Error fetching data:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchInitialData();
    }

    return () => {
      disconnectSocket();
    };
  }, [currentUser?._id]);

  // Critical handler for new messages
  useEffect(() => {
    const handleReceiveMessage = (message) => {
      console.log("Received new message:", message);
      
      // Message from active user or to current user
      if (message.senderId && (
          (message.senderId._id && message.senderId._id.toString() === activeUserId) || 
          (message.receiverId === currentUser._id)
      )) {
        // Add to messages array
        setMessages(prev => [...prev, message]);
        
        // If message is TO current user (we received it)
        if (message.receiverId === currentUser._id) {
          // Update users list to show new message indicator 
          setUsers(prevUsers => {
            return prevUsers.map(user => {
              // Find the sender in our users list
              if (user.id === message.senderId._id.toString()) {
                const isFromActiveUser = activeUserId === message.senderId._id.toString();
                console.log(`New message from ${user.name} (active=${isFromActiveUser}): ${message.content.substring(0, 20)}...`);
                
                // Update this user with new message info
                return {
                  ...user,
                  lastMessage: message.content,
                  lastMessageTime: message.timestamp,
                  // Only mark as new if NOT currently chatting with this user
                  hasNewMessage: !isFromActiveUser,
                  // Only increment unread if NOT currently chatting with this user
                  unreadCount: isFromActiveUser ? 0 : (user.unreadCount || 0) + 1
                };
              }
              return user;
            });
          });
        }
      } else {
        console.warn("Received message with missing data:", message);
      }
    };

    const handleTyping = ({ senderId, isTyping }) => {
      if (senderId === activeUserId) {
        setIsTyping(isTyping);
      }
    };

    const handleUserStatus = ({ userId, isOnline }) => {
      console.log(`User ${userId} status changed to ${isOnline ? 'online' : 'offline'}`);
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId.toString() ? { ...user, online: isOnline } : user
        )
      );
    };

    const handleMessageDelivered = ({ tempId, messageId }) => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === tempId ? { ...msg, id: messageId, status: 'delivered' } : msg
        )
      );
    };

    // Setup socket event listeners
    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("typing", handleTyping);
    socket.on("userStatus", handleUserStatus);
    socket.on("messageDelivered", handleMessageDelivered);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("typing", handleTyping);
      socket.off("userStatus", handleUserStatus);
      socket.off("messageDelivered", handleMessageDelivered);
    };
  }, [currentUser?._id, activeUserId]);

  // Load messages when active user changes
  useEffect(() => {
    if (activeUserId) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(`/api/messages/${activeUserId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (!response.ok) throw new Error('Failed to fetch messages');
          const data = await response.json();
          setMessages(data);
        } catch (err) {
          setError(err.message);
        }
      };
      
      fetchMessages();
    }
  }, [activeUserId]);

  const handleSelectUser = async (userId) => {
    setActiveUserId(userId);
    
    // Update local state first for immediate UI feedback
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { 
          ...user, 
          unreadCount: 0, 
          hasNewMessage: false 
        } : user
      )
    );
    
    console.log(`User selected: ${userId}, marking messages as read`);
    
    // Then mark messages as read in the database
    try {
      await fetch(`/api/messages/${userId}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(`Successfully marked messages from ${userId} as read`);
    } catch (error) {
      console.error('Error marking messages as read:', error);
      // Revert local state if API call fails
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { 
            ...user, 
            hasNewMessage: true 
          } : user
        )
      );
    }
  };

  const handleSendMessage = async (content) => {
    if (!activeUserId || !content.trim()) return;

    const tempId = Date.now().toString();
    const newMessage = {
      id: tempId,
      senderId: {
        _id: currentUser._id,
        name: currentUser.name,
        avatar: currentUser.avatar
      },
      receiverId: activeUserId,
      content,
      timestamp: new Date().toISOString(),
      status: 'sending'
    };

    // Optimistic update
    setMessages(prev => [...prev, newMessage]);

    try {
      // Send via socket
      socket.emit("sendMessage", {
        receiverId: activeUserId,
        message: newMessage
      });
    } catch (err) {
      setMessages(prev => prev.map(msg => 
        msg.id === tempId ? { ...msg, status: 'failed' } : msg
      ));
      setError(err.message);
    }
  };


  const handleTyping = (e) => {
    if (!activeUserId) return;
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    socket.emit("typing", { 
      receiverId: activeUserId, 
      isTyping: true 
    });

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing", { 
        receiverId: activeUserId, 
        isTyping: false 
      });
    }, 2000);
  };

  const activeUser = users.find(user => user.id === activeUserId) || null;

  if (loading) {
    return (
      <div className="flex gap-4">
        <Card className="w-[350px] h-[600px] flex items-center justify-center">
          <p>Loading chats...</p>
        </Card>
        <Card className="flex-1 h-[600px] flex items-center justify-center">
          <p>Loading messages...</p>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex gap-4">
        <Card className="w-[350px] h-[600px] flex items-center justify-center">
          <p className="text-destructive">Error: {error}</p>
        </Card>
        <Card className="flex-1 h-[600px] flex items-center justify-center">
          <p className="text-destructive">Error: {error}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <div className="w-[350px]">
        <UserChatSidebar 
          users={users} 
          activeUserId={activeUserId}
          onSelectUser={handleSelectUser}
          currentUser={currentUser}
        />
      </div>
      <div className="flex-1">
        {activeUser ? (
          <ChatWindow 
            activeUser={activeUser}
            messages={messages}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
            currentUserId={currentUser._id}
          />
        ) : (
          <Card className="h-[600px] flex items-center justify-center">
            <p className="text-muted-foreground">
              Select a chat to start messaging
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Chat;