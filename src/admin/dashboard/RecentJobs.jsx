import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Briefcase } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../services/AuthContext";
import { formatDistanceToNow } from "date-fns";

const RecentJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { user, token, isAuthenticated } = useAuth();
  const observer = useRef();
  const jobsPerPage = 5;

  // Fetch all jobs initially
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/jobs', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setJobs(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isAuthenticated, token]);

  // Update displayed jobs when page changes
  useEffect(() => {
    if (jobs.length > 0) {
      const newDisplayedJobs = jobs.slice(0, page * jobsPerPage);
      setDisplayedJobs(newDisplayedJobs);
      setHasMore(newDisplayedJobs.length < jobs.length);
    }
  }, [page, jobs]);

  // Infinite scroll observer
  const lastJobElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const formatPostedDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  if (!isAuthenticated) {
    return <div className="text-center py-4">Please sign in to view jobs</div>;
  }

  if (loading && jobs.length === 0) {
    return <div className="text-center py-4">Loading jobs...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">Recent Job Posts</CardTitle>
        <Briefcase className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="overflow-y-auto" style={{ maxHeight: '400px' }}>
        <div className="space-y-4">
          {displayedJobs.map((job, index) => {
            if (index === displayedJobs.length - 1) {
              return (
                <div 
                  ref={lastJobElementRef}
                  key={job._id} 
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-linkedin-light flex items-center justify-center text-linkedin-blue font-medium">
                    {job.company?.charAt(0) || 'J'}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-sm">{job.title}</h3>
                    <p className="text-xs text-muted-foreground">{job.company}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatPostedDate(job.postedDate || job.createdAt)}
                  </div>
                </div>
              );
            }
            return (
              <div key={job._id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linkedin-light flex items-center justify-center text-linkedin-blue font-medium">
                  {job.company?.charAt(0) || 'J'}
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-sm">{job.title}</h3>
                  <p className="text-xs text-muted-foreground">{job.company}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatPostedDate(job.postedDate || job.createdAt)}
                </div>
              </div>
            );
          })}
          {loading && displayedJobs.length > 0 && (
            <div className="text-center py-2">Loading more jobs...</div>
          )}
          {!hasMore && displayedJobs.length > 0 && (
            <div className="text-center py-2 text-sm text-muted-foreground">
              No more jobs to show
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentJobs;