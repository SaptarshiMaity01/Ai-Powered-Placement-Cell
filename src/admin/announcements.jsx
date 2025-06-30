// pages/AnnouncementPage.js
import AnnouncementPanel from "./announcement/AnnouncementPanel";

const AnnouncementPage = () => {
  return (
    <div className="min-h-screen bg-[#F3F2F0]">
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-linkedin-blue">Announcements</h1>
        <AnnouncementPanel />
      </div>
    </div>
  );
};

export default AnnouncementPage;
