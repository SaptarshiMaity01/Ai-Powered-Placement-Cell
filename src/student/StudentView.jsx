import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import JobListingsGrid from "../student/JobListingsGrid";
import JobFilters from "../student/JobFilters";
import RecommendedJobs from "../student/RecommendedJobs";
import ApplicationTracker from "../student/ApplicationTracker";
import { jobService } from "../services/jobsServices";
import { toast } from "sonner";

const StudentView = ({
  applications,
  onApplyToJob,
  onViewApplication,
  onJobClick,
  chats,
  onSendMessage,
}) => {
  const [showStudentChat, setShowStudentChat] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFilters, setLastFilters] = useState(null);
  const [applicationsRefreshTrigger, setApplicationsRefreshTrigger] = useState(0);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 12;

  // Calculate paginated jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs = await jobService.fetchJobs();
        console.log("Raw jobs from API:", jobs);
        setAllJobs(jobs);
        setFilteredJobs(normalizeJobs(jobs));
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setError(err.message || "Failed to load jobs");
        setLoading(false);
        toast.error("Failed to load jobs. Please try again later.");
      }
    };

    fetchJobs();
  }, []);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredJobs]);

  // Normalize job data structure
  const normalizeJobs = (jobs) => {
    const normalized = jobs.map(job => {
      let salaryRange = [0, 0];
      if (job.salaryRange && Array.isArray(job.salaryRange)) {
        salaryRange = job.salaryRange;
      } else if (job.salaryMin !== undefined && job.salaryMax !== undefined) {
        salaryRange = [job.salaryMin, job.salaryMax];
      }
      
      const tags = job.tags || job.skills || job.requiredSkills || job.technologies || [];
      
      return {
        _id: job._id || job.id,
        id: job._id || job.id,
        title: job.title || '',
        company: job.company || '',
        location: job.location || '',
        jobType: job.jobType || '',
        salaryRange: salaryRange,
        salary: job.salary || '',
        tags: tags || '',
        description: job.description || '',
        requirements:job.requirements || '',
      };
    });
    
    return normalized;
  };

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const toggleStudentChat = () => {
    setShowStudentChat(!showStudentChat);
  };

  const normalizeDisplaySalary = (value) => {
    return value * 1000;
  };

  const handleFilterChange = (filters) => {
    setLastFilters(filters);
  
    if (!allJobs || allJobs.length === 0) {
      setFilteredJobs([]);
      return;
    }
    
    const result = allJobs.filter(job => {
      let passesFilter = true;
      
      // Search filter
      if (filters.search && filters.search.trim() !== '') {
        const searchLower = filters.search.toLowerCase().trim();
        const matches = (
          (job.title && job.title.toLowerCase().includes(searchLower)) ||
          (job.company && job.company.toLowerCase().includes(searchLower)) ||
          (job.description && job.description.toLowerCase().includes(searchLower)) ||
          (job.location && job.location.toLowerCase().includes(searchLower)) ||
          (job.tags && job.tags.some(tag => tag.toLowerCase().includes(searchLower)))
        );
        
        if (!matches) passesFilter = false;
      }
      
      // Location filter
      if (passesFilter && filters.location && filters.location !== "any") {
        const locationLower = filters.location.toLowerCase().trim();
        const locationMatches = job.location && job.location.toLowerCase().includes(locationLower);
        if (!locationMatches) passesFilter = false;
      }
      
      // Job type filter
      if (passesFilter && filters.jobType && filters.jobType !== "any") {
        const jobTypeLower = filters.jobType.toLowerCase().trim();
        if (job.jobType) {
          const jobTypeMatches = job.jobType.toLowerCase().includes(jobTypeLower) || 
                               jobTypeLower.includes(job.jobType.toLowerCase()) ||
                               (jobTypeLower === "full-time" && 
                                (job.jobType.toLowerCase().includes("full") || 
                                 job.jobType.toLowerCase().includes("fulltime")));
          if (!jobTypeMatches) passesFilter = false;
        } else {
          passesFilter = false;
        }
      }
      
      // Salary range filter
      if (passesFilter && filters.salaryRange && Array.isArray(filters.salaryRange)) {
        const [minFilterDisplay, maxFilterDisplay] = filters.salaryRange;
        if (minFilterDisplay !== 0 || maxFilterDisplay !== 200) {
          const minFilter = normalizeDisplaySalary(minFilterDisplay);
          const maxFilter = normalizeDisplaySalary(maxFilterDisplay);
          
          let [jobMin, jobMax] = [0, 0];
          if (job.salaryRange && Array.isArray(job.salaryRange)) {
            [jobMin, jobMax] = job.salaryRange;
          } else if (job.salary) {
            const match = job.salary.match(/(\d+)/g);
            if (match && match.length > 0) {
              const value = parseInt(match[0]);
              if (job.salary.includes("LPA") || job.salary.includes("lakhs")) {
                jobMin = jobMax = value * 100000;
              } else if (job.salary.includes("K")) {
                jobMin = jobMax = value * 1000;
              } else {
                jobMin = jobMax = value;
              }
            }
          }
          
          if (!(jobMax >= minFilter && jobMin <= maxFilter)) {
            passesFilter = false;
          }
        }
      }
      
      // Tags filter
      if (passesFilter && filters.tags && filters.tags.length > 0) {
        if (!job.tags || job.tags.length === 0) {
          passesFilter = false;
        } else {
          const jobTagsLower = job.tags.map(tag => tag.toLowerCase());
          const matchingTags = filters.tags.filter(filterTag => 
            jobTagsLower.includes(filterTag.toLowerCase())
          );
          if (matchingTags.length === 0) passesFilter = false;
        }
      }
      
      return passesFilter;
    });
    
    setFilteredJobs(result);
  };

  const resetFilters = () => {
    setFilteredJobs(normalizeJobs(allJobs));
  };

  // Handler for when an application is submitted
  const handleApplicationSubmitted = (applicationData) => {
    // Increment the refresh trigger to force the ApplicationTracker to refetch data
    setApplicationsRefreshTrigger(prev => prev + 1);
  };

  // Enhanced version of onApplyToJob that also triggers a refresh
  const handleApplyToJob = (...args) => {
    onApplyToJob(...args, handleApplicationSubmitted);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-destructive mb-2">Error loading jobs</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-[#F3F2F0] text-black">
      <div className="flex justify-between mb-4">
        <div>
          {filteredJobs.length === 0 && lastFilters && (
            <Button onClick={resetFilters} variant="outline">
              No jobs found. Reset filters
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <div className="md:w-1/4 w-1/5">
          <JobFilters onFilterChange={handleFilterChange} />
        </div>

        <div className="w-4/5 space-y-6">
          <RecommendedJobs
            onApply={handleApplyToJob}
            onJobClick={onJobClick}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <JobListingsGrid 
                jobs={currentJobs} 
                onApply={handleApplyToJob} 
              />
              
              {/* Pagination Controls */}
              {filteredJobs.length > jobsPerPage && (
                <div className="flex justify-center mt-8 gap-2">
                  <Button 
                    onClick={prevPage} 
                    disabled={currentPage === 1}
                    variant="outline"
                    className="min-w-[100px]"
                  >
                    Previous
                  </Button>
                  
                  {/* Page numbers - shows up to 5 pages around current */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        className="w-10 h-10 p-0"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  
                  <Button 
                    onClick={nextPage} 
                    disabled={currentPage === totalPages}
                    variant="outline"
                    className="min-w-[100px]"
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
            <div>
              <ApplicationTracker
                applications={applications}
                onViewApplication={onViewApplication}
                refreshTrigger={applicationsRefreshTrigger}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentView;