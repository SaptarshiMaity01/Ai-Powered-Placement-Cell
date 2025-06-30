import React, { useState, useEffect, useCallback } from "react";
import { useToast } from "../components/ui/use-toast";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Calendar, Clock, ExternalLink, X } from "lucide-react";

const ApplicationTracker = ({ refreshTrigger }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/applications/student", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setApplications(response.data);
    } catch (error) {
      toast({
        title: "Error loading applications",
        description:
          error.response?.data?.message || "Failed to fetch applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  useEffect(() => {
    if (refreshTrigger) {
      fetchApplications();
    }
  }, [refreshTrigger, fetchApplications]);

  const handleViewApplication = (applicationId) => {
    const application = applications.find((app) => app.id === applicationId);
    setSelectedApplication(application);
    setIsSidePanelOpen(true);
  };

  const closeSidePanel = () => {
    setIsSidePanelOpen(false);
    setSelectedApplication(null);
  };

  const moveToNextStep = async () => {
    try {
      // Update the application status to the next step
      const currentStatus = selectedApplication.status;
      const statusOrder = [
        "applied",
        "review",
        "interview",
        "accepted",
        "rejected",
      ];
      const currentIndex = statusOrder.indexOf(currentStatus);
      const nextStatus = statusOrder[currentIndex + 1] || currentStatus;

      await axios.patch(
        `/api/applications/${selectedApplication.id}`,
        { status: nextStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Refresh applications
      await fetchApplications();
      // Update the selected application
      setSelectedApplication({
        ...selectedApplication,
        status: nextStatus,
      });

      toast({
        title: "Status updated",
        description: `Application moved to ${nextStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error updating status",
        description: error.response?.data?.message || "Failed to update status",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading applications...</div>;
  }

  return (
    <div className="relative">
      <ApplicationTrackerUI
        applications={applications}
        onViewApplication={handleViewApplication}
      />

      {/* Side Panel Overlay */}
      {isSidePanelOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidePanel}
        ></div>
      )}

      {/* Side Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out rounded-2xl ${
          isSidePanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedApplication && (
          <div className=" p-6 h-full flex flex-col ">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedApplication.jobTitle}
                </h2>
                <p className="text-gray-600">{selectedApplication.company}</p>
              </div>
              <button
                onClick={closeSidePanel}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pt-20">
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">
                  Application Status
                </h3>
                <div className="space-y-6">
                  <StatusStep
                    title="Applied"
                    isActive={selectedApplication.status === "applied"}
                    isCompleted={[
                      "review",
                      "interview",
                      "accepted",
                      "rejected",
                    ].includes(selectedApplication.status)}
                  />
                  <StatusStep
                    title="Under Review"
                    isActive={selectedApplication.status === "review"}
                    isCompleted={["interview", "accepted", "rejected"].includes(
                      selectedApplication.status
                    )}
                  />
                  <StatusStep
                    title="Interview"
                    isActive={selectedApplication.status === "interview"}
                    isCompleted={["accepted", "rejected"].includes(
                      selectedApplication.status
                    )}
                  />
                  <StatusStep
                    title={
                      selectedApplication.status === "accepted"
                        ? "Accepted"
                        : "Rejected"
                    }
                    isActive={false}
                    isCompleted={["accepted", "rejected"].includes(
                      selectedApplication.status
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatusStep = ({ title, date, isActive, isCompleted }) => {
  const isRejected = title === "Rejected";
  const isAccepted = title === "Accepted";

  let icon = "";
  if (isCompleted) {
    icon = isAccepted ? "✓" : isRejected ? "✗" : "✓";
  }

  const getCircleColor = () => {
    if (isCompleted && isAccepted) return "bg-green-500 text-white";
    if (isCompleted && isRejected) return "bg-red-500 text-white";
    if (isCompleted) return "bg-green-500 text-white"; // other completed steps
    if (isActive) return "bg-blue-500 text-white";
    return "bg-gray-200";
  };

  const getLineColor = () => {
    if (isCompleted || isActive) return "bg-green-500";
    return "bg-gray-200";
  };

  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center ${getCircleColor()}`}
        >
          {icon}
        </div>
        <div className={`w-0.5 h-8 ${getLineColor()}`}></div>
      </div>
      <div>
        <h4 className={`font-medium ${isActive ? "text-blue-600" : ""}`}>
          {title}
        </h4>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
    </div>
  );
};
const ApplicationTrackerUI = ({ applications, onViewApplication }) => {
  const statusColorMap = {
    applied: "bg-blue-100 text-blue-800",
    interview: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
    accepted: "bg-green-100 text-green-800",
    review: "bg-purple-100 text-purple-800",
  };

  const statusTextMap = {
    applied: "Applied",
    interview: "Interview",
    rejected: "Rejected",
    accepted: "Accepted",
    review: "Under Review",
  };

  const filterApplicationsByStatus = (status) => {
    if (status === "all") return applications;
    return applications.filter((app) => app.status === status);
  };

  return (
    <Card className="h-full">
      <CardHeader className="px-3 py-3">
        <CardTitle>Application Tracker</CardTitle>
        <CardDescription>Track your job applications</CardDescription>
      </CardHeader>
      <CardContent className="px-3 pt-0">
        <Tabs defaultValue="all">
          <TabsList className="mb-3 w-full">
            <TabsTrigger value="all" className="text-xs">
              All ({applications.length})
            </TabsTrigger>
            <TabsTrigger value="applied" className="text-xs">
              Applied ({filterApplicationsByStatus("applied").length})
            </TabsTrigger>
            <TabsTrigger value="review" className="text-xs">
              Under Review ({filterApplicationsByStatus("review").length})
            </TabsTrigger>
            <TabsTrigger value="interview" className="text-xs">
              Interview ({filterApplicationsByStatus("interview").length})
            </TabsTrigger>
            <TabsTrigger value="accepted" className="text-xs">
              Accepted ({filterApplicationsByStatus("accepted").length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="text-xs">
              Rejected ({filterApplicationsByStatus("rejected").length})
            </TabsTrigger>
          </TabsList>

          {[
            "all",
            "applied",
            "review",
            "interview",
            "accepted",
            "rejected",
          ].map((status) => (
            <TabsContent key={status} value={status}>
              <ApplicationList
                applications={filterApplicationsByStatus(status)}
                statusColorMap={statusColorMap}
                statusTextMap={statusTextMap}
                onViewApplication={onViewApplication}
              />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

const ApplicationList = ({
  applications,
  statusColorMap,
  statusTextMap,
  onViewApplication,
}) => {
  if (applications.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 text-sm">
        No applications found
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
      {applications.map((application) => (
        <div
          key={application.id}
          className="border border-border rounded-md p-3 hover:bg-muted/30 transition-colors"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <div className="flex items-start gap-2">
              <div className="h-8 w-8 rounded bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                {application.logo ? (
                  <img
                    src={application.logo}
                    alt={`${application.company} logo`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-xs font-medium">
                    {application.company.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <h4 className="font-medium text-sm truncate">
                  {application.jobTitle}
                </h4>
                <p className="text-xs text-gray-500 truncate">
                  {application.company}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      statusColorMap[application.status]
                    }`}
                  >
                    {statusTextMap[application.status]}
                  </span>
                </div>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs"
              onClick={() => onViewApplication(application.id)}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              View
            </Button>
          </div>

          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Applied {application.appliedDate}
            </div>

            {application.interviewDate && (
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Interview on {application.interviewDate}
              </div>
            )}
          </div>

          {application.nextStep && (
            <div className="mt-1.5 text-xs text-primary">
              Next step: {application.nextStep}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ApplicationTracker;
