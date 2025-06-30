import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import SummaryCards from "../studentdashboard/SummaryCards";
import JobListings from "../studentdashboard/JobListings";
import ApplicationTracker from "../studentdashboard/ApplicationTracker";
import EventCalendar from "../studentdashboard/EventCalender";
import AnnouncementsPanel from "../studentdashboard/AnnouncementsPanel";
import ProfileCard from "../studentdashboard/ProfileCard";
import { ProjectsSection, ExperienceSection, CertificationsSection } from "../studentdashboard/ProfileSections";
import { Briefcase,Bell, User } from "lucide-react";
import EventCard from '../studentdashboard/EventCard'
import { getProfile } from "../services/profileService";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);
  return (
    <div className=" mx-auto px-20 py-8 bg-[#F3F2F0] text-black ">
      <div className=" mx-auto w-full ">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          {profile?.updatedAt && (
            <div className="text-sm text-gray-500">
              Last updated:{" "}
              {new Date(profile.updatedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          )}
        </div>
        <div className="flex flex-row">
       <div className="w-3/4 h-full">
        <ProfileCard />
        
        <SummaryCards />
        </div>
        <div className="w-1/4 ml-5">
        <EventCard/>
        </div>
        </div>
        <div className="mt-6 ">
          <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full flex flex-col">
            <TabsList className="mb-8 bg-white">
              <TabsTrigger value="overview" className="flex items-center data-[state=active]:bg-linkedin-blue data-[state=active]:text-white">
                <Briefcase className="h-4 w-4 mr-2" />
                Jobs & Applications
              </TabsTrigger>
             
              <TabsTrigger value="profile" className="flex items-center data-[state=active]:bg-linkedin-blue data-[state=active]:text-white">
                <User className="h-4 w-4 mr-2" />
                My Profile
              </TabsTrigger>
              <TabsTrigger value="announcements" className="flex items-center data-[state=active]:bg-linkedin-blue data-[state=active]:text-white">
                <Bell className="h-4 w-4 mr-2" />
                Announcements
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6 animate-fade-in">
              <JobListings />
              <ApplicationTracker />
            </TabsContent>
            
            <TabsContent value="schedule" className="animate-fade-in">
              <EventCalendar />
            </TabsContent>
            
            <TabsContent value="profile" className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                <ProjectsSection />
                <ExperienceSection />
          
              <CertificationsSection />
              </div>
            </TabsContent>
            
            <TabsContent value="announcements" className="animate-fade-in">
              <AnnouncementsPanel />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
    </div>
  );
};

export default StudentDashboard;