import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Button } from '../../components/ui/button'
import { cn } from "../../components/lib/utils";
import { Search, Plus, Bell } from "lucide-react";

const UserChatSidebar = ({ users, activeUserId, onSelectUser, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (!currentUser?._id) return; // Check if currentUser exists and has _id
    
    const filtered = users.filter((user) => {
      // Don't show the current user in the list
      if (user.id === currentUser._id.toString()) return false;
      
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "students" && user.type === "student") ||
        (activeTab === "companies" && user.type === "company") ||
        (activeTab === "admins" && user.type === "admin");

      return matchesSearch && matchesTab;
    });
    
    // Sort users: first by hasNewMessage (new messages first), then by lastMessageTime
    const sortedUsers = [...filtered].sort((a, b) => {
      // First prioritize users with new messages
      if (a.hasNewMessage && !b.hasNewMessage) return -1;
      if (!a.hasNewMessage && b.hasNewMessage) return 1;
      
      // Then sort by most recent message time
      if (a.lastMessageTime && b.lastMessageTime) {
        return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
      }
      
      // If only one has a lastMessageTime, prioritize that one
      if (a.lastMessageTime && !b.lastMessageTime) return -1;
      if (!a.lastMessageTime && b.lastMessageTime) return 1;
      
      // Default to alphabetical sort by name
      return a.name.localeCompare(b.name);
    });
    
    setFilteredUsers(sortedUsers);
    
    // Debug log for new messages
    const usersWithNewMessages = sortedUsers.filter(u => u.hasNewMessage);
    if (usersWithNewMessages.length > 0) {
      console.log("Users with new messages:", usersWithNewMessages.map(u => u.name));
    }
  }, [users, searchTerm, activeTab, currentUser]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectUser = (userId) => {
    console.log(`Selecting user ${userId}`);
    onSelectUser(userId);
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle>Messages</CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-8"
          />
        </div>
      </CardHeader>

      <div className="px-4">
        <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">
              All
            </TabsTrigger>
            <TabsTrigger value="students" className="flex-1">
              Students
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex-1">
              Companies
            </TabsTrigger>
            <TabsTrigger value="admins" className="flex-1">
              Admins
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <CardContent className="flex-grow overflow-y-auto py-2">
        {filteredUsers.length > 0 ? (
          <div className="space-y-2">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-md cursor-pointer transition-colors",
                  activeUserId === user.id
                    ? "bg-linkedin-blue/10"
                    : user.hasNewMessage
                      ? "bg-red-50 hover:bg-red-100" // Use red for new messages
                      : "hover:bg-linkedin-light"
                )}
                onClick={() => handleSelectUser(user.id)}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-linkedin-light flex items-center justify-center text-linkedin-blue font-medium">
                    {user.avatar || user.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  {user.online && (
                    <div className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-background"></div>
                  )}
                  {user.hasNewMessage && (
                    <div className="absolute -right-1 -top-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs ring-2 ring-background animate-pulse">
                      <Bell className="h-3 w-3" />
                    </div>
                  )}
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={cn(
                      "font-medium text-sm truncate",
                      user.hasNewMessage ? "text-red-600 font-bold" : "" // Make text red and bold for new messages
                    )}>
                      {user.name}
                      {user.hasNewMessage}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {user.lastMessageTime 
                        ? new Date(user.lastMessageTime).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          }) 
                        : ''}
                    </span>
                  </div>
                  
                  {/* Show last message preview */}
                  {user.lastMessage && (
                    <p className={cn(
                      "text-xs truncate",
                      user.hasNewMessage ? "text-green-600 font-semibold" : "text-muted-foreground"
                    )}>
                      {user.lastMessage}
                    </p>
                  )}
                </div>

                {user.unreadCount > 0 && (
                  <div className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {user.unreadCount}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-4">
            <p className="text-muted-foreground mb-4">No chats found</p>
            <Button 
              variant="outline"
              onClick={() => {
                console.log("Show all users for new chat");
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Start New Chat
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserChatSidebar;