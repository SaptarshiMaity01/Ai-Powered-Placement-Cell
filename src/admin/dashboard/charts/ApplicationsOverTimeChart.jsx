import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "../../../components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../services/AuthContext";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Helper function to parse DD/MM/YYYY format
const parseCustomDate = (dateString) => {
  if (!dateString) return null;
  
  // Handle both ISO format and DD/MM/YYYY format
  if (dateString.includes('T')) {
    return new Date(dateString);
  }
  
  const parts = dateString.split('/');
  if (parts.length === 3) {
    // Note: months are 0-based in JavaScript Date
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }
  
  console.warn('Unknown date format:', dateString);
  return null;
};

const ApplicationsOverTimeChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, token, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchApplicationData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/applications', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Group applications by month
        const monthlyCounts = response.data.reduce((acc, app) => {
          if (!app.appliedDate) return acc;
          
          const date = parseCustomDate(app.appliedDate);
          if (!date || isNaN(date.getTime())) {
            console.warn('Invalid date:', app.appliedDate);
            return acc;
          }
          
          const month = date.getMonth(); // 0-11
          const year = date.getFullYear();
          const key = `${year}-${month}`;
          
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {});

        // Get current year
        const currentYear = new Date().getFullYear();

        // Create data for all months of current year
        const chartData = monthNames.map((month, index) => {
          const key = `${currentYear}-${index}`;
          return {
            month,
            applications: monthlyCounts[key] || 0
          };
        });

        console.log('Chart data prepared:', chartData);
        setData(chartData);
        setError(null);
      } catch (err) {
        console.error("Error fetching application data:", err);
        setError(err.response?.data?.message || err.message || "Failed to load data");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [isAuthenticated, token]);

  // ... rest of the component remains the same ...
  // (keep all the rendering logic from previous implementation)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Applications Over Time</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer
            config={{
              applications: {
                label: "Applications",
                color: "#4F46E5"
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                />
                <Line 
                  type="monotone" 
                  dataKey="applications" 
                  stroke="#4F46E5" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationsOverTimeChart;