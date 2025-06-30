import { useState, useEffect } from "react";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
} from "../../../components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { PieChartIcon } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../../services/AuthContext";

const COLORS = {
  accepted: "#10b981",
  rejected: "#ef4444",
  interviewed: "#f59e0b",
  pending: "#6366f1",
  reviewing: "#3b82f6"
};

const ApplicationStatusChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, token, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchApplicationStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/applications', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Count applications by status
        const statusCounts = response.data.reduce((acc, app) => {
          const status = app.status || 'pending';
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});

        // Transform to chart data format
        const data = Object.entries(statusCounts).map(([status, count]) => ({
          name: status.charAt(0).toUpperCase() + status.slice(1),
          value: count,
          color: COLORS[status] || COLORS.pending
        }));

        setChartData(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching application stats:", err);
        setError(err.response?.data?.message || err.message);
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationStats();
  }, [isAuthenticated, token]);

  const renderLabel = (entry) => entry.name;

  if (!isAuthenticated) {
    return <div className="text-center py-4">Please sign in to view the chart</div>;
  }

  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Application Status Distribution</CardTitle>
          <PieChartIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div>Loading chart data...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Application Status Distribution</CardTitle>
          <PieChartIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center text-red-500">
            Error loading chart data: {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Application Status Distribution</CardTitle>
          <PieChartIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center text-muted-foreground">
            No application data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Application Status Distribution</CardTitle>
        <PieChartIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer
            config={{
              accepted: {
                label: "Accepted",
                color: COLORS.accepted
              },
              rejected: {
                label: "Rejected",
                color: COLORS.rejected
              },
              interviewed: {
                label: "Interviewed",
                color: COLORS.interviewed
              },
              pending: {
                label: "Pending",
                color: COLORS.pending
              },
              reviewing: {
                label: "Reviewing",
                color: COLORS.reviewing
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={renderLabel}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationStatusChart;