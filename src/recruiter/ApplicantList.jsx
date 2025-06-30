import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  CheckCircle,
  XCircle,
  Calendar,
  MessageSquare,
  FileText,
  MoreHorizontal,
  ChevronDown,
  Search,
  Eye,
  Download,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useToast } from "../components/ui/use-toast";
import { applicationService } from "../services/applicationService";
import { jobService } from "../services/jobsServices";

const ApplicantList = ({ jobId }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobDetails, setJobDetails] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (jobId) {
          // Fetch applications for a specific job
          const jobData = await jobService.getJobById(jobId);
          setJobDetails(jobData);

          const applicationsData =
            await applicationService.getApplicationsByJobId(jobId);
          setApplications(applicationsData.map(formatApplication));
        } else {
          // Fetch all applications if no jobId is provided
          const allApplications = await applicationService.getAllApplications();
          setApplications(allApplications.map(formatApplication));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error loading data",
          description: error.message || "Failed to fetch data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    // Helper function to format application data consistently
    const formatApplication = (app) => ({
      _id: app.id || app._id,
      name: app.name || "No name provided",
      email: app.email || "No email provided",
      phone: app.phone || "No phone provided",
      status: app.status || "applied",
      appliedDate: app.appliedDate || app.createdAt || new Date(),
      currentCompany: app.currentCompany || "Not specified",
      linkedinProfile: app.linkedinProfile || "Not provided",
      resume: app.resumeUrl || app.resume || null,
      coverLetterFile: app.coverLetterFile || app.coverLetter || null,
      jobTitle: app.jobTitle || app.job?.title || "N/A",
    });

    fetchData();
  }, [jobId, toast]);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const updatedApplication =
        await applicationService.updateApplicationStatus(
          applicationId,
          newStatus
        );

      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );

      toast({
        title: "Status updated",
        description: `Applicant status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Update failed",
        description: error.message || "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handleViewFile = (fileUrl) => {
    if (!fileUrl) {
      toast({
        title: "File not available",
        description: "The requested file is not available",
        variant: "destructive",
      });
      return;
    }
    // Ensure the URL is properly formatted
    const formattedUrl = fileUrl.startsWith("http")
      ? fileUrl
      : `${process.env.REACT_APP_API_BASE_URL || ""}${fileUrl}`;
    window.open(formattedUrl, "_blank");
  };

  const handleScheduleInterview = (applicationId) => {
    handleStatusChange(applicationId, "interview");
    toast({
      title: "Interview scheduled",
      description: "Applicant status changed to interview",
    });
  };

  const handleMessage = (applicationId) => {
    toast({
      title: "Messaging",
      description: "This feature will be implemented soon",
    });
  };

  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statusClassMap = {
    applied: "bg-blue-100 text-blue-800",
    review: "bg-purple-100 text-purple-800",
    interview: "bg-yellow-100 text-yellow-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    withdrawn: "bg-gray-100 text-gray-800",
  };

  const getStatusBadge = (status) => {
    return (
      <Badge className={statusClassMap[status] || "bg-gray-100 text-gray-800"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getInitials = (name, email) => {
    if (name && name !== "No name provided") {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    if (email && email !== "No email provided") {
      return email.substring(0, 2).toUpperCase();
    }
    return "??";
  };

  // const formatDate = (dateString) => {
  //   if (!dateString) return "N/A";

  //   try {
  //     const date = new Date(dateString);
  //     if (isNaN(date.getTime())) return "N/A";

  //     return date.toLocaleDateString("en-US", {
  //       year: "numeric",
  //       month: "short",
  //       day: "numeric",
  //       hour: '2-digit',
  //       minute: '2-digit'
  //     });
  //   } catch (e) {
  //     return "N/A";
  //   }
  // };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-gray-600">Loading applicants...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="border-b pb-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>{jobDetails?.title || "Job Applicants"}</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              {applications.length} total applicants
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search applicants"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 h-9 w-full md:w-[200px]"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  {statusFilter === "all"
                    ? "All Status"
                    : statusFilter.charAt(0).toUpperCase() +
                      statusFilter.slice(1)}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("applied")}>
                  Applied
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("review")}>
                  Under Review
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("interview")}>
                  Interview
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("accepted")}>
                  Accepted
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("rejected")}>
                  Rejected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("withdrawn")}>
                  Withdrawn
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current Company</TableHead>
                <TableHead>LinkedIn</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-gray-500"
                  >
                    <AlertCircle className="h-6 w-6 mx-auto mb-2" />
                    No applicants found
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications.map((application) => (
                  <TableRow key={application._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600 overflow-hidden">
                          {getInitials(application.name, application.email)}
                        </div>
                        <div>
                          <div className="font-medium">{application.name}</div>
                          <div className="text-sm text-gray-500">
                            {application.email}
                          </div>
                          <div className="text-xs text-gray-500">
                            {application.phone}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {application.appliedDate}
                    </TableCell>
                    <TableCell>{getStatusBadge(application.status)}</TableCell>
                    <TableCell className="text-gray-600">
                      {application.currentCompany}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {application.linkedinProfile &&
                      application.linkedinProfile !== "Not provided" ? (
                        <a
                          href={
                            application.linkedinProfile.startsWith("http")
                              ? application.linkedinProfile
                              : `https://${application.linkedinProfile}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Profile
                        </a>
                      ) : (
                        "Not provided"
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewFile(application.resume)}
                          className="h-8 w-8"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleViewFile(application.resume)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Resume
                            </DropdownMenuItem>
                            {application.coverLetterFile && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleViewFile(application.coverLetterFile)
                                }
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                View Cover Letter
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => handleViewFile(application.resume)}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download Resume
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(application._id, "review")
                              }
                            >
                              <Eye className="mr-2 h-4 w-4 text-purple-500" />
                              Mark for Review
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleScheduleInterview(application._id)
                              }
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              Schedule Interview
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(application._id, "accepted")
                              }
                              disabled={application.status === "accepted"}
                            >
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                              Accept Applicant
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(application._id, "rejected")
                              }
                              disabled={application.status === "rejected"}
                              className="text-red-600"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject Applicant
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicantList;
