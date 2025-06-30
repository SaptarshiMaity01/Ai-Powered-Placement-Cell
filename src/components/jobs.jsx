import React, { useState, useEffect } from "react";

import { toast } from "sonner";

// Components
import  StudentView  from "../student/StudentView";

// Utils
import { 
  APPLICATIONS_STORAGE_KEY,
  CHATS_STORAGE_KEY,
  getLocalStorage, 
  setLocalStorage 
} from "./lib/localStorage";

// Sample mock data
import { 
  mockJobs, 
  mockRecommendedJobs,
  mockApplications,
  mockMessages
} from "../data/mockData";

const StudentComponent = () => {
  // Student state
  const [allJobs, setAllJobs] = useState([...mockJobs]);
  const [filteredJobs, setFilteredJobs] = useState([...mockJobs]);
  const [applications, setApplications] = useState([...mockApplications]);
  const [chats, setChats] = useState([...mockMessages]);

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedApplications = getLocalStorage(APPLICATIONS_STORAGE_KEY, mockApplications);
    setApplications(storedApplications);
    
    const storedChats = getLocalStorage(CHATS_STORAGE_KEY, mockMessages);
    setChats(storedChats);
    
    // We might need to also load jobs that were posted by recruiters
    const storedJobs = getLocalStorage("postedJobs", []);
    const jobsToAdd = storedJobs
      .filter(job => job.status === 'active')
      .map(job => ({
        id: job.id,
        title: job.title,
        company: job.company || "Your Company",
        location: job.location,
        jobType: job.jobType,
        salary: job.salary,
        postedDate: job.postedDate,
        tags: job.tags || [],
      }));
    
    setAllJobs([...mockJobs, ...jobsToAdd]);
    setFilteredJobs([...mockJobs, ...jobsToAdd]);
  }, []);

  const handleFilterChange = (filters) => {
    console.log("Filters applied:", filters);
    
    let newFilteredJobs = [...allJobs];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      newFilteredJobs = newFilteredJobs.filter(
        job => 
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    if (filters.location && filters.location !== "any") {
      newFilteredJobs = newFilteredJobs.filter(
        job => job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.jobType && filters.jobType !== "any") {
      newFilteredJobs = newFilteredJobs.filter(
        job => job.jobType.toLowerCase().includes(filters.jobType.toLowerCase())
      );
    }
    
    if (filters.salaryRange) {
      newFilteredJobs = newFilteredJobs.filter(job => {
        const salaryText = job.salary;
        if (!salaryText) return true;
        
        const salaryMatch = salaryText.match(/\$(\d+(?:,\d+)?)\s*-\s*\$(\d+(?:,\d+)?)/);
        if (salaryMatch) {
          const minSalary = parseInt(salaryMatch[1].replace(/,/g, ''));
          const maxSalary = parseInt(salaryMatch[2].replace(/,/g, ''));
          
          return maxSalary >= filters.salaryRange[0] && minSalary <= filters.salaryRange[1];
        }
        return true;
      });
    }
    
    if (filters.tags && filters.tags.length > 0) {
      newFilteredJobs = newFilteredJobs.filter(
        job => filters.tags.some(tag => job.tags.includes(tag))
      );
    }
    
    setFilteredJobs(newFilteredJobs);
  };

  const handleApplyToJob = (jobId) => {
    const job = [...allJobs].find(j => j.id === jobId);
    if (!job) return;
    
    if (applications.some(app => app.jobTitle === job.title)) {
      toast.error("You have already applied to this job!");
      return;
    }
    
    const newApplication = {
      id: Date.now().toString(),
      jobTitle: job.title,
      company: job.company,
      logo: job.logo,
      appliedDate: new Date().toISOString().split('T')[0],
      status: "applied"
    };
    
    const updatedApplications = [...applications, newApplication];
    setApplications(updatedApplications);
    setLocalStorage(APPLICATIONS_STORAGE_KEY, updatedApplications);
    
    toast.success(`Applied to ${job.title} at ${job.company} successfully!`);
  };

  const handleViewApplication = (applicationId) => {
    toast.info(`Viewing application ${applicationId}`);
  };

  const handleJobClick = (jobId) => {
    console.log("Job clicked:", jobId);
  };

  const handleSendMessage = (text) => {
    const newMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    const updatedChats = [...chats, newMessage];
    setChats(updatedChats);
    setLocalStorage(CHATS_STORAGE_KEY, updatedChats);
    
    toast.success("Message sent successfully!");
  };

  return (
    <div className="bg-[#F3F2F0] text-black w-full">
      <div className="mx-10 px-2 py-6">
        
        
        <div className="space-y-3">
          <StudentView 
            allJobs={allJobs}
            filteredJobs={filteredJobs}
            applications={applications}
            onFilterChange={handleFilterChange}
            onApplyToJob={handleApplyToJob}
            onViewApplication={handleViewApplication}
            onJobClick={handleJobClick}
            chats={chats}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentComponent;