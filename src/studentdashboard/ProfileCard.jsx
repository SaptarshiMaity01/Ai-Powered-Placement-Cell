import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Linkedin, Github, Globe } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router-dom";
import { getProfile } from "../services/profileService";
import { fetchSkills } from "../services/skillService";

const ProfileCard = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    profilePicture: "",
    linkedinUrl: "",
    githubUrl: "",
    portfolioUrl: "",
    skills: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getProfile();
        const skills = await fetchSkills();

        setProfileData({
          name: profile?.name || "No Name",
          email: profile?.email || "No Email",
          phone: profile?.phone || "No Phone",
          profilePicture: profile?.profilePicture || "",
          linkedinUrl: profile?.linkedinUrl || "",
          githubUrl: profile?.githubUrl || "",
          portfolioUrl: profile?.portfolioUrl || "",
          skills: skills || [],
        });
      } catch (err) {
        setError("Failed to load profile data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getInitials = (name) => {
    if (!name) return "NA";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading) {
    return <div className="text-center py-8">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <Card className="bg-white shadow-sm mb-6">
      <CardContent className="p-6">
        <div className="flex flex-row md:flex-row gap-6 items-start md:items-start">
          {/* Avatar and basic info */}
          <div className="flex flex-col items-start ml-9 md:items-start">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={profileData.profilePicture || undefined}
                alt={profileData.name || "User"}
              />
              <AvatarFallback className="bg-linkedin-blue text-white text-xl">
                {getInitials(profileData.name)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 space-y-4 ml-5">
            <div>
              <h2 className="font-medium text-xl">{profileData.name || "Unnamed User"}</h2>
              <p className="text-sm text-gray-600">{profileData.email || "No Email"}</p>
              <p className="text-sm text-gray-600">{profileData.phone || "No Phone"}</p>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {profileData.linkedinUrl && (
                <a
                  href={profileData.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-linkedin-blue text-sm px-3 py-1 bg-linkedin-light rounded-full"
                >
                  <Linkedin className="h-3 w-3" /> LinkedIn
                </a>
              )}
              {profileData.githubUrl && (
                <a
                  href={profileData.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-gray-700 text-sm px-3 py-1 bg-gray-100 rounded-full"
                >
                  <Github className="h-3 w-3" /> GitHub
                </a>
              )}
              {profileData.portfolioUrl && (
                <a
                  href={profileData.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-gray-700 text-sm px-3 py-1 bg-gray-100 rounded-full"
                >
                  <Globe className="h-3 w-3" /> Portfolio
                </a>
              )}
            </div>

            {/* Skills */}
            <div className="mt-2">
              {profileData.skills && profileData.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-linkedin-light text-linkedin-blue border-none"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No skills added yet.</p>
              )}
            </div>

            <div className="mt-2">
              <Link to="/profile" className="text-linkedin-blue text-sm hover:underline">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
