import { useState, useEffect, useRef, useCallback } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Edit, Trash2 } from "lucide-react";
import { toast } from 'sonner'; 
import { format } from "date-fns";
import axios from "axios";
import { useAuth } from "../../services/AuthContext";

const JobList = () => {
  const [allJobs, setAllJobs] = useState([]); // All jobs from API
  const [displayedJobs, setDisplayedJobs] = useState([]); // Jobs currently shown
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const scrollContainerRef = useRef(null);
  const itemsPerPage = 10; // Number of jobs to load each time
  
  const { user, token, isAuthenticated } = useAuth();

  // Fetch all jobs initially
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/jobs', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAllJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isAuthenticated, token]);

  // Filter jobs based on search term
  const filteredJobs = allJobs.filter(job => 
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (job.tags && job.tags.some(tag => 
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  // Load more jobs when page changes
  useEffect(() => {
    if (filteredJobs.length === 0) return;
    
    const startIdx = 0;
    const endIdx = page * itemsPerPage;
    const jobsToShow = filteredJobs.slice(0, endIdx);
    
    setDisplayedJobs(jobsToShow);
    setLoadingMore(false);
  }, [page, filteredJobs]);

  // Infinite scroll handler
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || loading || loadingMore) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 50;
      
      if (isNearBottom && displayedJobs.length < filteredJobs.length) {
        setLoadingMore(true);
        setPage(prev => prev + 1);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [loading, loadingMore, displayedJobs, filteredJobs]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAllJobs(allJobs.filter(job => job._id !== jobId));
      toast.success('Job deleted successfully');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      toast.error('Failed to delete job');
    }
  };

  if (!isAuthenticated) {
    return <div className="text-center py-8">Please sign in to view jobs</div>;
  }

  if (loading) {
    return <div className="text-center py-8">Loading jobs...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Management</CardTitle>
        <div className="flex items-center gap-4">
          <Input 
            placeholder="Search jobs..." 
            value={searchTerm}
            onChange={handleSearch}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div 
          ref={scrollContainerRef}
          className="overflow-y-auto border rounded-lg"
          style={{ minHeight: '600px', maxHeight: '400px' }}
        >
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Posted Date</TableHead>
                <TableHead>Tags</TableHead>
                {(user?.role === 'admin' || user?.role === 'company') && (
                  <TableHead>Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedJobs.length > 0 ? (
                <>
                  {displayedJobs.map((job) => (
                    <TableRow key={job._id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.company}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>{format(new Date(job.postedDate), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {job.tags?.map((tag, index) => (
                            <span 
                              key={index}
                              className="bg-linkedin-light text-linkedin-blue text-xs px-2 py-0.5 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      {(user?.role === 'admin' || (user?.role === 'company' && job.createdBy === user._id)) && (
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDelete(job._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                  {loadingMore && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        Loading more jobs...
                      </TableCell>
                    </TableRow>
                  )}
                  {displayedJobs.length === filteredJobs.length && filteredJobs.length > 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        No more jobs to load
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ) : (
                <TableRow>
                  <TableCell 
                    colSpan={(user?.role === 'admin' || user?.role === 'company') ? 6 : 5} 
                    className="text-center py-8 text-muted-foreground"
                  >
                    No jobs found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobList;