import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import {
  MoreVertical,
  Edit,
  Trash2,
  Users,
  Copy,
  Eye,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { jobService } from "../services/jobsServices";
import { toast } from "sonner";
import { Separator } from "../components/ui/separator";
import { format } from "date-fns";
import JobPostForm from "./JobPostForm";

const PostedJobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [viewMode, setViewMode] = useState(null); // 'details', 'applicants', 'edit', 'create'
  const [applicants, setApplicants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 7;

  // Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobService.fetchJobs();
        setJobs(data);
      } catch (error) {
        toast.error(`Failed to fetch jobs: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Get current jobs for pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handleEdit = (jobId) => {
    const job = jobs.find(j => j._id === jobId);
    setSelectedJob(job);
    setViewMode('edit');
  };

  const handleDelete = async (jobId) => {
    try {
      await jobService.deleteJob(jobId);
      setJobs(jobs.filter(job => job._id !== jobId));
      toast.success("Job deleted successfully");
      // Reset to first page if current page becomes empty
      if (currentJobs.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      toast.error(`Failed to delete job: ${error.message}`);
    }
  };

  const handleDuplicate = async (jobId) => {
    try {
      const duplicatedJob = await jobService.duplicateJob(jobId);
      setJobs([duplicatedJob, ...jobs]);
      toast.success("Job duplicated successfully");
      // Reset to first page to show the duplicated job
      setCurrentPage(1);
    } catch (error) {
      toast.error(`Failed to duplicate job: ${error.message}`);
    }
  };

  const handleToggleStatus = async (jobId, newStatus) => {
    try {
      await jobService.updateJobStatus(jobId, newStatus);
      setJobs(jobs.map(job => 
        job._id === jobId ? { ...job, status: newStatus } : job
      ));
      toast.success(`Job status updated to ${newStatus}`);
    } catch (error) {
      toast.error(`Failed to update job status: ${error.message}`);
    }
  };

  const handleViewJobDetails = (job) => {
    setSelectedJob(job);
    setViewMode('details');
  };

  const handleViewApplicants = async (jobId) => {
    try {
      const data = await jobService.getJobApplicants(jobId);
      const job = jobs.find(j => j._id === jobId);
      setSelectedJob(job);
      setApplicants(data);
      setViewMode('applicants');
    } catch (error) {
      toast.error(`Failed to fetch applicants: ${error.message}`);
    }
  };

  const statusBadgeVariant = (status) => {
    switch (status) {
      case "active": return "success";
      case "paused": return "warning";
      case "closed": return "destructive";
      default: return "secondary";
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading jobs...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Posted Jobs</CardTitle>
          <CardDescription>Manage your job listings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobs.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <p className="mb-4">You haven't posted any jobs yet</p>
                <Button onClick={() => setViewMode('create')}>Post Your First Job</Button>
              </div>
            ) : (
              <>
                {currentJobs.map((job) => (
                  <div
                    key={job._id}
                    className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{job.title}</h3>
                          <Badge variant={statusBadgeVariant(job.status)}>
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="text-sm text-slate-500 mt-1">
                          {job.company} • {job.location} • {job.jobType}
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {job.tags.slice(0, 4).map((tag) => (
                            <Badge key={tag} variant="outline" className="font-normal">
                              {tag}
                            </Badge>
                          ))}
                          {job.tags.length > 4 && (
                            <Badge variant="outline" className="font-normal">
                              +{job.tags.length - 4} more
                            </Badge>
                          )}
                        </div>

                        <div className="mt-4 flex items-center gap-4 text-sm">
                          <div className="flex items-center text-slate-600">
                            <Calendar className="h-4 w-4 mr-1" />
                            Posted {format(new Date(job.createdAt), 'MMM d, yyyy')}
                          </div>

                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-slate-500" />
                            <span className="text-slate-800 font-medium">
                              {job.applicantsCount || 0}
                            </span>
                            <span className="text-slate-600 ml-1">applicants</span>
                            {job.newApplicants > 0 && (
                              <Badge
                                variant="success"
                                className="ml-2 px-1.5 py-0 text-[10px]"
                              >
                                +{job.newApplicants} new
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewJobDetails(job)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(job._id)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            
                            <DropdownMenuItem onClick={() => handleDuplicate(job._id)}>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            {job.status === "active" ? (
                              <DropdownMenuItem onClick={() => handleToggleStatus(job._id, "paused")}>
                                <Calendar className="h-4 w-4 mr-2" />
                                Pause Listing
                              </DropdownMenuItem>
                            ) : job.status === "paused" ? (
                              <DropdownMenuItem onClick={() => handleToggleStatus(job._id, "active")}>
                                <Calendar className="h-4 w-4 mr-2" />
                                Activate Listing
                              </DropdownMenuItem>
                            ) : null}
                            <DropdownMenuItem 
                              onClick={() => handleDelete(job._id)} 
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="mt-4 flex space-x-2">
                    
                      <Button 
                        size="sm" 
                        variant="default" 
                        onClick={() => handleEdit(job._id)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Pagination Controls */}
                {jobs.length > jobsPerPage && (
                  <div className="flex items-center justify-between px-2 pt-4">
                    <div className="text-sm text-muted-foreground">
                      Showing {indexOfFirstJob + 1}-{Math.min(indexOfLastJob, jobs.length)} of {jobs.length} jobs
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronsLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronsRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Rest of your modal components remain the same */}
      {/* Job Details Modal */}
      {viewMode === 'details' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setViewMode(null)}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-semibold">{selectedJob?.title}</h2>
                <div className="w-8"></div> {/* Spacer for alignment */}
              </div>
              
              {selectedJob && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Badge variant={statusBadgeVariant(selectedJob.status)}>
                      {selectedJob.status.charAt(0).toUpperCase() + selectedJob.status.slice(1)}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      Posted on {format(new Date(selectedJob.createdAt), 'MMM d, yyyy')}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Company</h4>
                      <p>{selectedJob.company}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                      <p>{selectedJob.location}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Job Type</h4>
                      <p>{selectedJob.jobType}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Salary</h4>
                      <p>{selectedJob.salary}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Description</h3>
                    <div className="prose prose-sm max-w-none">
                      {selectedJob.description}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Requirements</h3>
                    <div className="prose prose-sm max-w-none">
                      {selectedJob.requirements}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button onClick={() => setViewMode(null)}>Close</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Applicants Modal */}
      {viewMode === 'applicants' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setViewMode(null)}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-semibold">Applicants for {selectedJob?.title}</h2>
                <div className="w-8"></div> {/* Spacer for alignment */}
              </div>
              
              <div className="space-y-4">
                {applicants.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No applicants yet
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-5 gap-4 font-medium border-b pb-2">
                      <div>Name</div>
                      <div>Email</div>
                      <div>Status</div>
                      <div>Applied On</div>
                      <div>Actions</div>
                    </div>
                    {applicants.map((applicant) => (
                      <div key={applicant._id} className="grid grid-cols-5 gap-4 items-center border-b pb-2">
                        <div>{applicant.name}</div>
                        <div>{applicant.email}</div>
                        <div>
                          <Badge variant="outline">
                            {applicant.status || 'Pending'}
                          </Badge>
                        </div>
                        <div>
                          {format(new Date(applicant.appliedAt), 'MMM d, yyyy')}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View CV
                          </Button>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Button onClick={() => setViewMode(null)}>Close</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {viewMode === 'edit' && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <JobPostForm
              initialData={selectedJob}
              mode="edit"
              onSubmitSuccess={() => {
                setViewMode(null);
                jobService.fetchJobs().then(setJobs);
              }}
              onCancel={() => setViewMode(null)}
            />
          </div>
        </div>
      )}

      {/* Create Job Modal */}
      {viewMode === 'create' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <JobPostForm
              mode="create"
              onSubmitSuccess={() => {
                setViewMode(null);
                jobService.fetchJobs().then(setJobs);
              }}
              onCancel={() => setViewMode(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostedJobsList;