import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { useToast } from "../components/ui/use-toast";
import { AlertCircle, CheckCircle, Loader2, Upload } from "lucide-react";
import { Progress } from "../components/ui/progress";

const JobApplicationForm = ({ 
  isOpen, 
  onClose, 
  jobId, 
  jobTitle, 
  companyName,
  onApplicationSubmitted // Add this callback prop
}) => {
  const [step, setStep] = useState(1);
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [resumeUrl, setResumeUrl] = useState(null);
  const { toast } = useToast();
  
  // Load user data from localStorage
  useEffect(() => {
    const storedProfile = localStorage.getItem('user');
    if (storedProfile) {
      try {
        const user = JSON.parse(storedProfile);
        console.log("Loaded user data from localStorage:", user);
        
        if (user) {
          form.reset({
            fullName: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            currentCompany: user.currentCompany || "",
            linkedinProfile: user.linkedinProfile || "",
            coverLetter: "",
            useExistingResume: true,
          });
          
          if (user.resume) {
            console.log("Found resume in user profile:", user.resume);
            setResumeUrl(user.resume);
          }
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, [isOpen]);

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      currentCompany: "",
      linkedinProfile: "",
      coverLetter: "",
      useExistingResume: true,
    },
    mode: "onSubmit",
  });

  const handleFileChange = async (e, setFile) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (setFile === setResumeFile) {
      const formData = new FormData();
      formData.append("resume", file);
      
      try {
        setIsSubmitting(true);
        const response = await axios.post("/api/resume/upload", formData, {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Resume upload response:", response.data);
        const url = response.data.resumeLink;
        const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
        console.log("Final resume URL:", fullUrl);
        setResumeUrl(fullUrl);
        
        // Update localStorage
        const storedProfile = localStorage.getItem('user');
        if (storedProfile) {
          const user = JSON.parse(storedProfile);
          user.resume = fullUrl;
          localStorage.setItem('user', JSON.stringify(user));
        }

        setFile(file);
        toast({
          title: "Resume uploaded successfully",
          description: "Your resume has been saved to your profile.",
        });
      } catch (error) {
        console.error("Resume upload failed:", error);
        toast({
          title: "Resume upload failed",
          description: error.response?.data?.message || "Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setFile(file);
    }
  };

  const simulateUploadProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress(progress);
    }, 200);
    return interval;
  };

  const validateStep1 = async () => {
    const isValid = await form.trigger(["fullName", "email", "phone"]);
    if (!isValid) {
      toast({
        title: "Missing required fields",
        description: "Please fill out all required fields before continuing.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const goToNextStep = async () => {
    if (step === 1 && !(await validateStep1())) return;
    setStep(step + 1);
  };

  const goToPreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = form.getValues();
    console.log("Submitting application with data:", data);
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append("jobId", jobId);
      
      Object.keys(data).forEach(key => {
        if (key !== "useExistingResume") {
          formData.append(key, data[key]);
        }
      });
      
      if (!data.useExistingResume && resumeFile) {
        formData.append("resume", resumeFile);
      } else if (data.useExistingResume && resumeUrl) {
        formData.append("resumeUrl", resumeUrl);
        formData.append("useExistingResume", "true");
      }
      if (coverLetterFile) {
        formData.append("coverLetterFile", coverLetterFile);
      }
      
      const progressInterval = simulateUploadProgress();
      
      console.log("Making API call to submit application");
      const response = await axios.post("/api/applications", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      console.log("Application submission response:", response.data);
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setApplicationSuccess(true);
      
      // Call the callback to update parent components
      if (onApplicationSubmitted && typeof onApplicationSubmitted === 'function') {
        onApplicationSubmitted(response.data);
      }
      
      toast({
        title: "Application Submitted Successfully",
        description: "The employer will review your application soon.",
      });
      
      setTimeout(() => {
        onClose();
        resetForm();
      }, 2000);
      
    } catch (error) {
      console.error("Application submission error:", error);
      toast({
        title: "Application Failed",
        description: error.response?.data?.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setApplicationSuccess(false);
    setStep(1);
    setResumeFile(null);
    setCoverLetterFile(null);
    setUploadProgress(0);
    form.reset();
  };

  if (applicationSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-6 text-black">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Application Submitted!</h3>
            <p className="text-center text-gray-500 mb-4">
              Your application for {jobTitle} at {companyName} has been submitted successfully.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-black">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="fullName"
                  rules={{ required: "Full name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
                          {...field} 
                          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  rules={{ 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="john.doe@example.com" 
                          {...field} 
                          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  rules={{ 
                    required: "Phone number is required",
                    pattern: {
                      value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                      message: "Invalid phone number"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="+1 (555) 123-4567" 
                          {...field} 
                          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="currentCompany"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Company (Optional)</FormLabel>            
                      <FormControl>
                        <Input 
                          placeholder="Acme Inc." 
                          {...field} 
                          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="linkedinProfile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn Profile (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://linkedin.com/in/johndoe" 
                          {...field} 
                          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            
            {step === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="useExistingResume"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Use resume from my profile
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                {!form.watch("useExistingResume") && (
                  <div className="space-y-2">
                    <FormLabel>Upload Resume</FormLabel>
                    <div className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="file"
                        id="resume"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange(e, setResumeFile)}
                        disabled={isSubmitting}
                      />
                      <label htmlFor="resume" className="cursor-pointer">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm font-medium">
                          {resumeFile ? resumeFile.name : "Click to upload resume"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PDF, DOC, DOCX (Max 5MB)
                        </p>
                      </label>
                    </div>
                  </div>
                )}
                
                {form.watch("useExistingResume") && resumeUrl && (
                  <div className="p-3 bg-gray-50 rounded-md text-sm">
                    <p className="font-medium">Using resume from your profile:</p>
                    <a 
                      href={resumeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {resumeUrl.split('/').pop()}
                    </a>
                  </div>
                )}
                
                <FormField
                  control={form.control}
                  name="coverLetter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Letter (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us why you're interested in this position..." 
                          className="min-h-[120px]"
                          {...field} 
                          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-2">
                  <FormLabel>Upload Cover Letter (Optional)</FormLabel>
                  <div className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="file"
                      id="coverLetterFile"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, setCoverLetterFile)}
                      disabled={isSubmitting}
                    />
                    <label htmlFor="coverLetterFile" className="cursor-pointer">
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm font-medium">
                        {coverLetterFile ? coverLetterFile.name : "Click to upload cover letter"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOC, DOCX (Max 5MB)
                      </p>
                    </label>
                  </div>
                </div>
              </>
            )}
            
            {isSubmitting && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Uploading application</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
              {step === 1 ? (
                <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                  Cancel
                </Button>
              ) : (
                <Button type="button" variant="outline" onClick={goToPreviousStep} disabled={isSubmitting}>
                  Back
                </Button>
              )}
              
              {step === 1 ? (
                <Button type="button" onClick={goToNextStep} disabled={isSubmitting}>
                  Next
                </Button>
              ) : (
                <Button 
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationForm;