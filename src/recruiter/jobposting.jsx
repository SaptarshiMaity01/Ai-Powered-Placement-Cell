import React from "react";
import { toast } from "sonner";
import JobPostForm from "../recruiter/JobPostForm"; // adjust path if needed

const RecruiterJobPost = () => {
  return (
    <div className="p-4 bg-slate-100 min-h-screen text-black">
      <JobPostForm 
        onSubmit={(jobData) => {
          toast.success("Job form submitted");
          console.log("Submitted job data:", jobData);
        }}
      />
    </div>
  );
};

export default RecruiterJobPost;
