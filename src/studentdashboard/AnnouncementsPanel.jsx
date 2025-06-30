import { useState, useEffect } from "react";
import { useAuth } from "../services/AuthContext";
import AnnouncementForm from "../admin/announcement/AnnouncementForm";
import AnnouncementList from "../admin/announcement/AnnouncementList";
import { fetchAnnouncements as fetchAnnouncementsAPI } from "../services/announcementService";

const AnnouncementPanel = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch announcements on mount
  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        const data = await fetchAnnouncementsAPI();
        setAnnouncements(data);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAnnouncements();
  }, []);

  const handleAddAnnouncement = (newAnnouncement) => {
    // Optimistically update the UI
    setAnnouncements(prev => [newAnnouncement, ...prev]);
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(prev => prev.filter(ann => ann._id !== id));
  };

  const handleUpdateAnnouncement = (updatedAnnouncement) => {
    setAnnouncements(prev =>
      prev.map(ann =>
        ann._id === updatedAnnouncement._id ? updatedAnnouncement : ann
      )
    );
  };

  // Check if user can post announcements
  const canPostAnnouncements = user?.role === "admin" || user?.role === "recruiter";

  return (
    <>
      {canPostAnnouncements ? (
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 text-black">
          {/* Left: Announcement Form */}
          <div className="lg:col-span-1">
            <AnnouncementForm
              onSubmit={handleAddAnnouncement}
              currentUserId={user?._id}
            />
          </div>
  
          {/* Right: Announcement List */}
          <div className="lg:col-span-1">
            {isLoading ? (
              <div className="text-center py-8">Loading announcements...</div>
            ) : (
              <AnnouncementList
                announcements={announcements}
                onDelete={handleDeleteAnnouncement}
                onUpdate={handleUpdateAnnouncement}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="text-black grid grid-cols-1 items-center justify-center">
          {/* Just the list, full width */}
          {isLoading ? (
            <div className="text-center py-8">Loading announcements...</div>
          ) : (
            <AnnouncementList
              announcements={announcements}
              onDelete={handleDeleteAnnouncement}
              onUpdate={handleUpdateAnnouncement}
            />
          )}
        </div>
      )}
    </>
  );
  
};

export default AnnouncementPanel;