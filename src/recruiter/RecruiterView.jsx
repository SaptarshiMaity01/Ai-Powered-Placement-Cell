import React, { useState } from "react";
import { toast } from "sonner";
import PostedJobsList from "../recruiter/PostedJobsList";
import ApplicantList from "./ApplicantList";
import MiniChat from "../recruiter/MiniChat";
import JobPostForm from "../recruiter/JobPostForm";

const RecruiterView = () => {
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);

  return (
    <div className="space-y-6 bg-[#F3F2F0] text-black p-10">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <PostedJobsList
            onEdit={(id) => toast.info(`Edit job ${id}`)}
            onDelete={(id) => toast.info(`Delete job ${id}`)}
            onViewApplicants={(id) => {
              setSelectedJobId(id);
              toast.info(`View applicants for job ${id}`);
            }}
            onDuplicate={(id) => toast.info(`Duplicate job ${id}`)}
            onToggleStatus={(id, status) =>
              toast.info(`Change job ${id} status to ${status}`)
            }
          />
        </div>

        <div className="space-y-4">
          {selectedApplicantId && (
            <MiniChat
              contactId={selectedApplicantId}
              onSendMessage={(message) =>
                toast.info(`Send message: ${message}`)
              }
            />
          )}

          <JobPostForm
            onSubmit={(jobData) => {
              toast.success("Job form submitted");
              console.log("Submitted job data:", jobData);
            }}
          />

          <ApplicantList/>
        </div>
      </div>
    </div>
  );
};

export default RecruiterView;