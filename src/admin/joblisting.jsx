// pages/JobListPage.js
import JobList from "../admin/job-management/JobList";

const JobListPage = () => {
  return (
    <div className="min-h-screen bg-[#F3F2F0]">
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-linkedin-blue">Job List</h1>
        <JobList />
      </div>
    </div>
  );
};

export default JobListPage;
