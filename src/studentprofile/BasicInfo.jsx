import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Edit,
  GithubIcon,
  LinkedinIcon,
  Globe,
  Upload,
  ExternalLink,
} from "lucide-react";
import {getProfile, saveProfile} from '../services/profileService'

// Helper to convert file to base64
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const BasicInfo = ({ initialData, onSave }) => {
    const defaultData = {
      name: "",
      email: "",
      phone: "",
      profilePicture: "",
      resumeLink: "",
      linkedinUrl: "",
      githubUrl: "",
      portfolioUrl: "",
    };
  
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(initialData || defaultData);  // Initialize with defaultData if initialData is not available
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getProfile();
          if (data && Object.keys(data).length > 0) {
            setFormData(data);
          } else {
            setFormData(defaultData); // Fallback to defaultData if no data is found
          }
        } catch (err) {
          console.error("Failed to load profile data", err);
          setFormData(defaultData);  // Fallback to defaultData if an error occurs
        }
      };
  
      fetchData();
    }, []);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleSave = async () => {
      try {
        const saved = await saveProfile(formData);
        setFormData(saved);
        setIsEditing(false);
        onSave && onSave(saved);
      } catch (err) {
        console.error("Failed to save", err);
      }
    };
  
    const handleFileChange = async (e, type) => {
      const file = e.target.files?.[0];
      if (!file) return;
  
      const base64 = await toBase64(file);
  
      if (type === "profile") {
        setFormData((prev) => ({ ...prev, profilePicture: base64 }));
      } else if (type === "resume") {
        const base64 = await toBase64(file);
        setFormData((prev) => ({ ...prev, resumeLink: base64 }));
      }
    };
  
    const getInitials = (name) => {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    };
  
    const startEditing = () => {
      setIsEditing(true);
    };
  
    return (
      <div className="profile-card">
        {/* Header */}
        <div className="section-header">
          <h2>Basic Information</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={isEditing ? () => setIsEditing(false) : startEditing}
            className="text-linkedin-blue"
          >
            <Edit className="h-4 w-4 mr-1" />
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>
  
        {!isEditing ? (
          <div className="flex flex-row md:flex-row gap-6">
            <div className="flex flex-col items-start ml-9">
              <Avatar className="w-24 h-24">
                {/* Render the avatar only when formData.profilePicture exists */}
                <AvatarImage
                  src={formData.profilePicture || ""}
                  alt={formData.name || "Profile"}
                />
                <AvatarFallback className="bg-primary text-white text-xl">
                  {getInitials(formData.name || "N/A")}
                </AvatarFallback>
              </Avatar>
            </div>
  
            <div className="flex-1 space-y-4 ml-5">
              <h3 className="font-medium text-xl">{formData.name}</h3>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">{formData.email}</p>
                <p className="text-sm text-gray-600">{formData.phone}</p>
              </div>
  
              <div className="flex flex-wrap gap-3">
                {formData.linkedinUrl && (
                  <a
                    href={formData.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-linkedin-blue text-sm px-3 py-1 bg-linkedin-light rounded-full"
                  >
                    <LinkedinIcon className="h-3 w-3" /> LinkedIn
                  </a>
                )}
                {formData.githubUrl && (
                  <a
                    href={formData.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-gray-700 text-sm px-3 py-1 bg-gray-100 rounded-full"
                  >
                    <GithubIcon className="h-3 w-3" /> GitHub
                  </a>
                )}
                {formData.portfolioUrl && (
                  <a
                    href={formData.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-gray-700 text-sm px-3 py-1 bg-gray-100 rounded-full"
                  >
                    <Globe className="h-3 w-3" /> Portfolio
                  </a>
                )}
              </div>
            </div>
          </div>
        ) : (
          <form className="space-y-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={formData.profilePicture || ""}
                    alt={formData.name || "Profile"}
                  />
                  <AvatarFallback className="bg-primary text-white text-xl">
                    {getInitials(formData.name || "N/A")}
                  </AvatarFallback>
                </Avatar>
  
                <div className="mt-2 flex flex-col items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => document.getElementById("profile-upload")?.click()}
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    Profile Picture
                  </Button>
                  <Input
                    id="profile-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "profile")}
                  />
  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => document.getElementById("resume-upload")?.click()}
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    Resume
                  </Button>
                  <Input
                    id="resume-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, "resume")}
                  />
                </div>
              </div>
  
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {["name", "email", "phone"].map((field) => (
                    <div key={field} className="space-y-2">
                      <Label htmlFor={field}>{field[0].toUpperCase() + field.slice(1)}</Label>
                      <Input
                        id={field}
                        name={field}
                        type={field === "email" ? "email" : "text"}
                        value={formData[field] || ""}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
  
                  {[{ id: "linkedinUrl", icon: LinkedinIcon, placeholder: "https://linkedin.com/in/..." },
                    { id: "githubUrl", icon: GithubIcon, placeholder: "https://github.com/..." },
                    { id: "portfolioUrl", icon: Globe, placeholder: "https://..." },
                  ].map(({ id, icon: Icon, placeholder }) => (
                    <div key={id} className="space-y-2">
                      <Label htmlFor={id}>{id.replace("Url", "").replace(/^\w/, (c) => c.toUpperCase())}</Label>
                      <div className="flex items-center">
                        <Icon className="h-4 w-4 mr-2" />
                        <Input
                          id={id}
                          name={id}
                          value={formData[id] || ""}
                          onChange={handleChange}
                          placeholder={placeholder}
                        />
                      </div>
                    </div>
                  ))}
                </div>
  
                <div className="flex justify-end pt-4">
                  <Button
                    type="button"
                    onClick={handleSave}
                    className="bg-linkedin-blue hover:bg-blue-700"
                  >
                    Save Information
                  </Button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  };
  export default BasicInfo;