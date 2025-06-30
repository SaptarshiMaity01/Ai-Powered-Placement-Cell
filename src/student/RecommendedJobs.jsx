import React, { useRef, useState, useEffect } from "react";
import JobCard from "./JobCard";
import { Button } from "../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import JobDetailModal from "./JobDetailModal";
import { jobService } from "../services/jobsServices";
import { fetchSkills } from "../services/skillService";

const RecommendedJobs = ({ onApply }) => {
  const scrollContainerRef = useRef(null);
  const [jobs, setJobs] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const jobsPerPage = 3;
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [allJobs, setAllJobs] = useState([]);
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollContainerRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
    setCurrentPage(prev => (prev > 0 ? prev - 1 : prev));
  };

  // Debug effect for component mount
  useEffect(() => {
    console.log("RecommendedJobs component mounted");
    return () => {
      console.log("RecommendedJobs component unmounted");
    };
  }, []);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollContainerRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
    setCurrentPage(prev => (prev < totalPages - 1 ? prev + 1 : prev));
  };


  // Fetch user skills and jobs
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching user skills and jobs...");
        
        // Fetch all jobs first
        const jobsData = await jobService.fetchJobs();
        console.log("All jobs fetched:", jobsData);
        setAllJobs(jobsData);
        
        // Inspect job structure to understand where skills/tags are stored
        if (jobsData.length > 0) {
          console.log("Example job structure:", jobsData[0]);
        }

        // Fetch user skills
        const skills = await fetchSkills();
        setUserSkills(skills);
        console.log("User skills fetched:", skills);
        
        // Normalize skills to lowercase for case-insensitive matching
        const normalizedSkills = skills.map(skill => {
          // Extract skill name based on structure
          const skillName = typeof skill === 'string' ? skill : (skill.name || skill.skill || '');
          return skillName.toLowerCase();
        });
        
        console.log("Normalized user skills:", normalizedSkills);

        // Calculate recommended jobs with flexible matching
        const recommendedJobs = getRecommendedJobs(jobsData, normalizedSkills);
        console.log("Recommended jobs:", recommendedJobs);
        
        setJobs(recommendedJobs);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to fetch recommended jobs");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // More flexible job matching algorithm
  const getRecommendedJobs = (allJobs, normalizedUserSkills) => {
    if (!Array.isArray(allJobs) || allJobs.length === 0) {
      console.log("No jobs available");
      return [];
    }
  
    console.log("Finding matches among", allJobs.length, "jobs");
  
    // Check if there are no skills to match against
    if (!normalizedUserSkills || normalizedUserSkills.length === 0) {
      console.log("No user skills available for matching");
      return allJobs.slice(0, 10); // Return first 10 jobs if no skills to match
    }
  
    // Helper function to check if a job has tags that match user skills
    const getJobSkills = (job) => {
      // Check multiple possible locations for skill information
      const possibleTagFields = [
        job.tags,
        job.skills,
        job.requiredSkills,
        job.requirements,
        job.technologies
      ];
      
      // Find the first non-empty array
      for (const field of possibleTagFields) {
        if (Array.isArray(field) && field.length > 0) {
          return field;
        }
      }
      
      // If we found no arrays, try to extract from description or title
      if (job.description && typeof job.description === 'string') {
        const commonTechTerms = ['javascript', 'react', 'node', 'python', 'java', 'html', 'css', 
          'mongodb', 'sql', 'aws', 'docker', 'kubernetes', 'typescript', 'angular', 'vue'];
        
        return commonTechTerms.filter(term => 
          job.description.toLowerCase().includes(term) || 
          job.title.toLowerCase().includes(term)
        );
      }
      
      return [];
    };
  
    // Calculate match score for each job
    const jobsWithScore = allJobs.map(job => {
      const jobSkills = getJobSkills(job);
      
      // Normalize job skills to lowercase for case-insensitive matching
      const normalizedJobSkills = jobSkills.map(skill => 
        typeof skill === 'string' ? skill.toLowerCase() : ''
      );
      
      console.log(`Job ${job._id || job.id}: ${job.title} has skills:`, normalizedJobSkills);
  
      // Count matching skills using flexible matching
      const matchingSkills = [];
      
      normalizedUserSkills.forEach(userSkill => {
        // For each user skill, check if any job skill contains it
        const match = normalizedJobSkills.find(jobSkill => 
          jobSkill.includes(userSkill) || userSkill.includes(jobSkill)
        );
        
        if (match) {
          matchingSkills.push(userSkill);
        }
      });
      
      // Calculate match score based on new rules:
      // - For jobs with multiple skills, require at least 2 matches
      // - For single-skill jobs, one match is enough
      let matchScore = 0;
      const jobSkillCount = normalizedJobSkills.length;
      const matchCount = matchingSkills.length;
      
      if (jobSkillCount > 1) {
        // For multi-skill jobs, require at least 2 matches
        if (matchCount >= 2) {
          matchScore = matchCount / normalizedUserSkills.length;
        }
      } else if (jobSkillCount === 1) {
        // For single-skill jobs, one match is enough
        if (matchCount >= 1) {
          matchScore = matchCount / normalizedUserSkills.length;
        }
      }
      
      console.log(`Job ${job._id || job.id} match score:`, matchScore, 
                  "Matching skills:", matchingSkills);
      
      return {
        ...job,
        matchScore,
        matchingSkills,
        jobSkillCount
      };
    });
  
    // Filter out jobs that don't meet our matching criteria
    const filteredJobs = jobsWithScore.filter(job => 
      (job.jobSkillCount > 1 && job.matchingSkills.length >= 2) ||
      (job.jobSkillCount === 1 && job.matchingSkills.length >= 1)
    );
  
    // Sort by match score and take top results
    const recommendedJobs = filteredJobs
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10);
    
    // If no matches were found, return a few default jobs
    if (recommendedJobs.length === 0) {
      console.log("No matching jobs found, returning random selection");
      return allJobs
        .sort(() => 0.5 - Math.random()) // Simple random shuffle
        .slice(0, 5);
    }
    
    return recommendedJobs;
  };

  const handleJobClick = (jobId) => {
    console.log("Recommended job clicked, ID:", jobId);
    setSelectedJobId(jobId);
  };

  const handleCloseModal = () => {
    console.log("Closing recommended job detail modal");
    setSelectedJobId(null);
  };
  const currentJobs = jobs.slice(
    currentPage * jobsPerPage,
    (currentPage + 1) * jobsPerPage
  );

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return null; // Hide the section on error
  }

  if (jobs.length === 0) {
    console.log("No recommended jobs to display");
    
    // Show all jobs as fallback if we have them
    if (allJobs.length > 0) {
      console.log("Showing random jobs as fallback");
      // Take random 5 jobs as recommendations
      const randomJobs = [...allJobs]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
      
      setJobs(randomJobs);
      return null; // Will re-render with the random jobs
    }
    
    return null; // Hide the section if no jobs
  }

  // Use _id instead of id for MongoDB compatibility
  const selectedJob = jobs.find((job) => job._id === selectedJobId);

  return (
    <div className="my-8 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recommended For You</h2>
        <div className="flex gap-1 items-center">
          <span className="text-sm text-gray-500">
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-8 w-8"
            onClick={scrollLeft}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-8 w-8"
            onClick={scrollRight}
            disabled={currentPage === totalPages - 1 || jobs.length <= jobsPerPage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-auto pb-4 scrollbar-hide snap-x"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {currentJobs.map((job) => (
          <div key={job._id} className="snap-start flex-none" style={{ width: 'calc(33.333% - 1rem)' }}>
            <JobCard
              {...job}
              onClick={handleJobClick}
              onApply={onApply}
            />
          </div>
        ))}
      </div>

      {selectedJobId && selectedJob && (
        <JobDetailModal 
          job={selectedJob}
          isOpen={!!selectedJobId}
          onClose={handleCloseModal}
          onApply={() => {
            console.log("Applying for recommended job ID:", selectedJobId);
            onApply(selectedJobId);
            handleCloseModal();
          }}
        />
      )}
    </div>
  );
};

export default RecommendedJobs;