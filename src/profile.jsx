import { ScrollArea } from "./components/ui/scroll-area";
import BasicInfo from "./studentprofile/BasicInfo";
import AcademicInfo from "./studentprofile/AcademiicInfo";
import SkillTags from "./studentprofile/SkillTags";
import ProjectList from "./studentprofile/ProjectList";
import ExperienceList from "./studentprofile/ExperienceList";
import CertificationList from "./studentprofile/CertificationList";
import ResumeViewer from "./studentprofile/ResumeViewer";

const ProfilePage = () => {
  return (
    <div className=" mx-auto px-20 py-8 bg-[#F3F2F0] text-black">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-6">Student Profile</h1>
        
        <div className="space-y-6">
          <BasicInfo />
          
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            <AcademicInfo />
            <SkillTags />
          </div>
          
          <ProjectList />
          <ExperienceList />
          <CertificationList />
          <ResumeViewer />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;