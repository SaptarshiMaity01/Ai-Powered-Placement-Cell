import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import { useToast } from "../../components/ui/use-toast";

  const AnnouncementForm = ({ onSubmit, currentUserId }) => {
    const { toast } = useToast();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [targetAudience, setTargetAudience] = useState("all");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      console.log("Form submission started with values:", {
        title,
        content,
        targetAudience,
        createdBy: currentUserId 
      });
    
      if (!title.trim() || !content.trim()) {
        console.log("Validation failed - empty fields");
        toast({
          title: "Invalid Input",
          description: "Please fill in all the fields",
          variant: "destructive",
        });
        return;
      }
    
      const newAnnouncement = {
        title,
        content,
        targetAudience,
        createdBy: currentUserId 
      };
    
      console.log("Preparing to send announcement:", newAnnouncement);
      console.log("Current auth token:", localStorage.getItem("token"));
    
      try {
        const res = await fetch("http://localhost:5000/api/announcements", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(newAnnouncement),
        });
    
        console.log("Server response status:", res.status);
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.error("Server error response:", errorData);
          throw new Error(errorData.message || "Failed to post announcement");
        }
    
        const data = await res.json();
        console.log("Successfully created announcement:", data);
        
        onSubmit(data);
        setTitle("");
        setContent("");
        setTargetAudience("all");
    
        
      } catch (error) {
        console.error("Error posting announcement:", error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    };
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post Announcement</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Announcement title"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your announcement here..."
              className="min-h-[120px]"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="audience">Target Audience</Label>
            <Select
              value={targetAudience}
              onValueChange={(value) => setTargetAudience(value)}
            >
              <SelectTrigger id="audience">
                <SelectValue placeholder="Select audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Students</SelectItem>
                <SelectItem value="recruiter">Recruiters</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Post Announcement
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AnnouncementForm;
