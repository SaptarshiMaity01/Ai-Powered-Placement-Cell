import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "../../../components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Building2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../services/AuthContext";

const CompanyJobsChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, token, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchJobData = async () => {
      try {
        setLoading(true);
        console.log("Fetching job data from API...");
        
        const response = await axios.get('/api/jobs', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("API response received:", response.data);

        // Group jobs by company and count them
        const companyCounts = response.data.reduce((acc, job) => {
          if (!job.company) {
            console.warn("Job missing company field:", job._id);
            return acc;
          }
          
          acc[job.company] = (acc[job.company] || 0) + 1;
          return acc;
        }, {});

        console.log("Company counts:", companyCounts);

        // Transform to chart data format and sort by count
        const chartData = Object.entries(companyCounts)
          .map(([company, jobs]) => ({ company, jobs }))
          .sort((a, b) => b.jobs - a.jobs)
          .slice(0, 10); // Limit to top 10 companies

        console.log("Chart data prepared:", chartData);
        setData(chartData);
        setError(null);
      } catch (err) {
        console.error("Error fetching job data:", err);
        setError(err.response?.data?.message || err.message || "Failed to load data");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [isAuthenticated, token]);

  if (!isAuthenticated) {
    return <div className="text-center py-4">Please sign in to view the chart</div>;
  }

  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Job Openings per Company</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div>Loading job data...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Job Openings per Company</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center text-red-500">
            Error loading job data: {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Job Openings per Company</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center text-muted-foreground">
            No job data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Job Openings per Company</CardTitle>
        <Building2 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer
            config={{
              jobs: {
                label: "Job Openings",
                color: "#EC4899"
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                layout="vertical" 
                data={data}
                margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis type="category" dataKey="company" width={100} />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                />
                <Bar 
                  dataKey="jobs" 
                  fill="#EC4899" 
                  radius={[0, 4, 4, 0]} 
                  name="Job Openings"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyJobsChart;