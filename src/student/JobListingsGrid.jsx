import React, { useState } from "react";
import JobCard from "./JobCard";
import JobDetailModal from "./JobDetailModal";
import JobApplicationForm from "./JobApplication";

const JobListingsGrid = ({ jobs, onApply }) => {
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applicationJob, setApplicationJob] = useState(null);

  const handleJobClick = (jobId) => {
    setSelectedJobId(jobId);
  };

  const handleCloseModal = () => {
    setSelectedJobId(null);
  };

  const handleApplyClick = (jobId) => {
    const job = jobs.find(job => job._id === jobId);
    setApplicationJob(job);
  };

  const handleCloseApplication = () => {
    setApplicationJob(null);
  };

  const selectedJob = jobs.find((job) => job._id === selectedJobId);

  if (!jobs || jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-muted-foreground">No job listings found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Available Opportunities</h2>
        <div className="text-sm text-muted-foreground">
          Showing {jobs.length} {jobs.length === 1 ? "job" : "jobs"}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard 
            key={job._id} 
            {...job} 
            onClick={() => handleJobClick(job._id)}
            onApply={() => handleApplyClick(job._id)}
          />
        ))}
      </div>

      {selectedJob && (
        <JobDetailModal 
          job={selectedJob}
          isOpen={!!selectedJobId}
          onClose={handleCloseModal}
          onApply={() => {
            handleApplyClick(selectedJob._id);
            handleCloseModal();
          }}
        />
      )}

      {applicationJob && (
        <JobApplicationForm
          isOpen={!!applicationJob}
          onClose={handleCloseApplication}
          jobId={applicationJob._id}
          jobTitle={applicationJob.title}
          companyName={applicationJob.company}
          onSubmit={onApply} // Pass the onApply prop to handle the actual submission
        />
      )}
    </div>
  );
};

export default JobListingsGrid;