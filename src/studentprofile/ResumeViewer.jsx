import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { FileText, Upload } from "lucide-react";

const ResumeViewer = ({
  initialResumeUrl = "",
  onUpload = () => {},
}) => {
  const [resumeUrl, setResumeUrl] = useState(initialResumeUrl);
  
  // Load resume URL from localStorage on mount
  useEffect(() => {
    const storedProfile = localStorage.getItem('user'); // Get user from localStorage
    if (storedProfile) {
      const user = JSON.parse(storedProfile); // Parse the user data from localStorage
      if (user && user.resume) {
        setResumeUrl(user.resume); // Set the resume URL if available in the user object
      }
    }
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("resume", file);
    
    try {
      const response = await fetch("/api/resume/upload", {
        method: "POST",
        
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      
      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        throw new Error("Upload failed");
      };
      
      const data = await response.json();
    if (data.message) {
      console.error('Backend error:', data.message);
    }
    console.log("URL from backend:", data.resumeLink);
    const url = data.resumeLink;
    const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
    console.log("Final URL:", fullUrl);
    setResumeUrl(fullUrl);
  
  
      
      // Save the new resume URL to localStorage
      const storedProfile = localStorage.getItem('profileData');
      if (storedProfile) {
        const profileData = JSON.parse(storedProfile);
        profileData.resumeLink = url;
        localStorage.setItem('profileData', JSON.stringify(profileData));
      } else {
        localStorage.setItem('profileData', JSON.stringify({ resumeLink: url }));
      }
      
      // Callback to parent component
      onUpload(file);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };
  
  // For debugging - log the resumeUrl
  useEffect(() => {
    console.log("Current resume URL:", resumeUrl);
  }, [resumeUrl]);

  return (
    <div className="profile-card">
      <div className="section-header">
        <h2>Resume Preview</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => document.getElementById('resume-upload-viewer')?.click()}
          className="text-linkedin-blue border-linkedin-blue"
        >
          <Upload className="h-4 w-4 mr-1" />
          Upload Resume
          <input 
            id="resume-upload-viewer"
            type="file"
            className="hidden"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </Button>
      </div>
      
      {resumeUrl ? (
        <div className="h-[500px] w-full border border-gray-200 rounded-lg overflow-hidden">
          {/* Use embed tag for PDF display */}
          {/* <embed 
            src={resumeUrl}
            type="application/pdf"
            width="100%"
            height="100%"
            className="w-full h-full"
          /> */}
          
          {/* Alternative: iframe approach if embed doesn't work well */}
          
          <iframe
            src={resumeUrl}
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="Resume PDF"
          ></iframe>
         
        </div>
      ) : (
        <div className="border border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500">
          <FileText className="h-16 w-16 mb-4 text-gray-400" />
          <p className="mb-2">No resume uploaded yet</p>
          <p className="text-sm text-gray-400">Upload your resume to preview it here</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => document.getElementById('resume-upload-viewer')?.click()}
            className="mt-4"
          >
            <Upload className="h-4 w-4 mr-1" />
            Upload Resume
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResumeViewer;