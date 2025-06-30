import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { FileText } from "lucide-react";
import { cn } from "../../components/lib/utils";
import axios from "axios";
import { useAuth } from "../../services/AuthContext";
import { formatDistanceToNow } from "date-fns";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800",
  reviewing: "bg-blue-100 text-blue-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  interview: "bg-purple-100 text-purple-800"
};

const RecentApplications = () => {
  const [allApplications, setAllApplications] = useState([]);
  const [displayedApplications, setDisplayedApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5);
  const { user, token, isAuthenticated } = useAuth();
  const containerRef = useRef();
  const itemHeight = 72; // Approximate height of each application item in pixels

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/applications', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Filter out any null or invalid applications
        const validApplications = response.data.filter(app => 
          app && app.id && app.name && app.jobTitle && app.company
        );
        
        setAllApplications(validApplications);
        setError(null);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError(err.response?.data?.message || err.message || "Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [isAuthenticated, token]);

  useEffect(() => {
    setDisplayedApplications(allApplications.slice(0, visibleCount));
  }, [allApplications, visibleCount]);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || loading) return;
    
    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
    const scrollPosition = scrollTop + clientHeight;
    
    // Load more when scrolled within 100px of the bottom
    if (scrollHeight - scrollPosition < 100 && 
        visibleCount < allApplications.length) {
      setVisibleCount(prev => Math.min(prev + 5, allApplications.length));
    }
  }, [visibleCount, allApplications.length, loading]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  

  const getInitials = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  if (!isAuthenticated) {
    return <div className="text-center py-4">Please sign in to view applications</div>;
  }

  if (loading && allApplications.length === 0) {
    return <div className="text-center py-4">Loading applications...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        Error loading applications. Please try again later.
        <div className="text-xs mt-2">{error}</div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">Recent Applications</CardTitle>
        <FileText className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent 
        ref={containerRef}
        className="overflow-y-auto" 
        style={{ 
          maxHeight: '400px',
          minHeight: `${Math.min(5, displayedApplications.length) * itemHeight}px`
        }}
      >
        <div className="space-y-4">
          {displayedApplications.map((application) => (
            <div key={application.id} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linkedin-light flex items-center justify-center text-linkedin-blue font-medium">
                {getInitials(application.name)}
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-sm">{application.name || "Unknown applicant"}</h3>
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    statusStyles[application.status] || statusStyles.pending
                  )}>
                    {(application.status || "pending").charAt(0).toUpperCase() + (application.status || "pending").slice(1)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {application.jobTitle || "Unknown position"} at {application.company || "Unknown company"}
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                {(application.appliedDate)}
              </div>
            </div>
          ))}
          {loading && allApplications.length > 0 && (
            <div className="text-center py-2">Loading more applications...</div>
          )}
          {visibleCount >= allApplications.length && allApplications.length > 0 && (
            <div className="text-center py-2 text-sm text-muted-foreground">
              No more applications to show
            </div>
          )}
          {allApplications.length === 0 && !loading && (
            <div className="text-center py-8 text-muted-foreground">
              No applications found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentApplications;