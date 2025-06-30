import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Edit, Trash2, Users, User, Users2 } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "../../components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog";
import { X } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import { useAuth } from "../../services/AuthContext";
import {
  deleteAnnouncement as deleteAnnouncementAPI,
  updateAnnouncement as updateAnnouncementAPI,
} from "../../services/announcementService";


const audienceIcons = {
  student: User,
  recruiter: Users,
  all: Users2,
};

const audienceLabels = {
  student: "Students",
  recruiter: "Recruiters",
  all: "Everyone",
};

const AnnouncementList = ({ announcements, onDelete, onUpdate }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  const handleDelete = async (id) => {
    try {
      console.log("Attempting to delete announcement with ID:", id);

      await deleteAnnouncementAPI(id);

      console.log("Delete successful, updating parent component");
      // Update parent component state via callback
      onDelete(id);
    } catch (error) {
      console.error("Delete error:", {
        error: error,
        message: error.message,
      });
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to delete announcement",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (announcement) => {
    console.log("Editing announcement - original data:", announcement);
    const announcementCopy = {
      _id: announcement._id,
      title: announcement.title,
      content: announcement.content,
      targetAudience: announcement.targetAudience || "all",
    };
    setEditingAnnouncement(announcementCopy);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (!editingAnnouncement?._id) {
      console.log("Update attempted without announcement ID");
      return;
    }

    try {
      const { title, content, targetAudience } = editingAnnouncement;
      const updateData = {
        title,
        content,
        targetAudience: targetAudience || "all",
      };

      console.log("Sending update for announcement:", {
        id: editingAnnouncement._id,
        data: updateData,
      });

      const updatedAnnouncement = await updateAnnouncementAPI(
        editingAnnouncement._id,
        updateData
      );

      console.log("Update successful, notifying parent component");

      // Update parent component state via callback
      onUpdate(updatedAnnouncement);

      setIsEditing(false);
      setEditingAnnouncement(null);
    } catch (error) {
      console.error("Update error:", {
        error: error,
        message: error.message,
      });
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field, value) => {
    if (editingAnnouncement) {
      setEditingAnnouncement({
        ...editingAnnouncement,
        [field]: value,
      });
    }
  };

  const isNewAnnouncement = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffInHours = (now - createdDate) / (1000 * 60 * 60);
    return diffInHours <= 24; // Last 48 hours
  };

  return (
    <>
      <Card className="max-h-[625px] overflow-y-auto scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        <CardHeader>
          <CardTitle >Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-black ">
            {announcements.length > 0 ? (
              announcements.map((announcement) => {
                const AudienceIcon =
                  audienceIcons[announcement.targetAudience] || Users2;
                return (
                  <Card
                    key={announcement._id}
                    className="border-l-4 border-linkedin-blue"
                  >
                    <CardContent className="pt-6 ">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          {isNewAnnouncement(announcement.createdAt) && (
                            <span className="top-2 right-2 bg-red-100 text-red-400 text-xs px-4 py-1  rounded">
                              New
                            </span>
                          )}
                          <h3 className="font-semibold text-lg">
                            {announcement.title}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <AudienceIcon className="h-3 w-3" />
                            <span>
                              {audienceLabels[announcement.targetAudience] ||
                                "Everyone"}
                            </span>
                            <span className="mx-1">•</span>
                            <span>
                              {format(
                                new Date(announcement.createdAt),
                                "MMM dd, yyyy"
                              )}
                            </span>
                          </div>
                        </div>
                        {user?.role === "admin" && (
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(announcement)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(announcement._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                      <p className="mt-2 text-sm whitespace-pre-wrap">
                        {announcement.content}
                      </p>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No announcements available
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog
        open={isEditing}
        onOpenChange={(open) => {
          if (!open) {
            setIsEditing(false);
            setEditingAnnouncement(null);
          }
        }}
      >
        <DialogContent className="bg-white text-black">
          <DialogHeader>
            <DialogTitle>Edit Announcement</DialogTitle>
            <DialogDescription>
              Make changes to your announcement here. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>

          {/* Close button - explicitly added with contrasting color */}
          <button
            onClick={() => setIsEditing(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
            aria-label="Close"
          >
            <X className="h-4 w-4 text-slate-950" />{" "}
            {/* Make sure to import X from 'lucide-react' */}
          </button>

          <div className="space-y-4 py-4">
            <div className="space-y-1">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={editingAnnouncement?.title || ""}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="edit-content">Content</Label>
              <Textarea
                id="edit-content"
                value={editingAnnouncement?.content || ""}
                onChange={(e) => handleInputChange("content", e.target.value)}
                className="min-h-[120px]"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="edit-audience">Target Audience</Label>
              <Select
                value={editingAnnouncement?.targetAudience || "all"}
                onValueChange={(value) =>
                  handleInputChange("targetAudience", value)
                }
              >
                <SelectTrigger id="edit-audience">
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Students</SelectItem>
                  <SelectItem value="recruiter">Recruiters</SelectItem>
                  <SelectItem value="all">Everyone</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AnnouncementList;
