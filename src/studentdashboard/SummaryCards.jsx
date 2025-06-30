import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Cell
} from "recharts";
import {
  Briefcase,
  Calendar,
  CheckCircle,
  Clock
} from "lucide-react";
import axios from "axios";
import { useAuth } from "../services/AuthContext";
import { toast } from 'sonner';

const SummaryCards = () => {
  console.log("[SummaryCards] Component rendering"); // Debug 1
  
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalApplications: 0,
    interviewsScheduled: 0,
    acceptedOffers: 0,
    statusData: []
  });
  
  const { user, token, isAuthenticated, role } = useAuth();
  
  console.log("[SummaryCards] Auth state:", { // Debug 2
    isAuthenticated,
    role:user.role,
    userId: user?.id,
    hasToken: !!token
  });

  useEffect(() => {
    console.log("[SummaryCards] useEffect triggered", { // Debug 3
      isAuthenticated,
      role:user.role,
      user: user?.id
    });

    if (!isAuthenticated || user?.role !== 'student') {
      console.log("[SummaryCards] Early return - not student or not authenticated"); // Debug 4
      return;
    }

    const fetchStudentApplicationStats = async () => {
      try {
        console.log("[SummaryCards] Starting data fetch"); // Debug 5
        setLoading(true);
        
        const response = await axios.get('/api/applications/student/stats', {
          headers: { 
            Authorization: `Bearer ${token}` 
          }
        });

        console.log("[SummaryCards] API response:", response.data); // Debug 6
        
        const studentData = response.data;
        
        setStats({
          totalApplications: studentData.totalApplications || 0,
          interviewsScheduled: studentData.interviewsScheduled || 0,
          acceptedOffers: studentData.acceptedOffers || 0,
          statusData: [
            { name: "Applied", value: studentData.applied || 0, color: "#0A66C2" },
            { name: "Rejected", value: studentData.rejected || 0, color: "#E91E63" },
            { name: "Interview", value: studentData.interview || 0, color: "#FF9800" },
            { name: "Accepted", value: studentData.accepted || 0, color: "#4CAF50" },
          ]
        });

        console.log("[SummaryCards] State updated with:", { // Debug 7
          total: studentData.totalApplications,
          interviews: studentData.interviewsScheduled,
          accepted: studentData.accepted
        });
        
      } catch (err) {
        console.error("[SummaryCards] Fetch error:", err); // Debug 8
        toast.error('Failed to load your application data');
      } finally {
        console.log("[SummaryCards] Loading complete"); // Debug 9
        setLoading(false);
      }
    };

    fetchStudentApplicationStats();
  }, [isAuthenticated, token, role, user?.id]);

  console.log("[SummaryCards] Current state:", { // Debug 10
    loading,
    stats,
    shouldRender: user.role === 'student'
  });

  if (user.role !== 'student') {
    console.log("[SummaryCards] Not rendering - user role is not student"); // Debug 11
    return null;
  }

  if (loading) {
    console.log("[SummaryCards] Rendering loading state"); // Debug 12
    return <div className="grid grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-xl p-5 shadow-sm h-40 animate-pulse"></div>
      ))}
    </div>;
  }

  console.log("[SummaryCards] Rendering component with data:", stats); // Debug 13

  return (
    <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Applications Card */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-slate-600 text-sm font-medium">Total Applications</h3>
          <div className="bg-blue-100 p-2 rounded-lg">
            <Briefcase className="h-5 w-5 text-linkedin-blue" />
          </div>
        </div>
        <div className="mt-4">
          <span className="text-3xl font-bold">{stats.totalApplications}</span>
        </div>
        <div className="mt-2">
          <span className="text-xs text-slate-500">
            Last updated: Just now
          </span>
        </div>
      </div>

      {/* Interviews Scheduled Card */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-slate-600 text-sm font-medium">Interviews Scheduled</h3>
          <div className="bg-orange-100 p-2 rounded-lg">
            <Calendar className="h-5 w-5 text-orange-500" />
          </div>
        </div>
        <div className="mt-4">
          <span className="text-3xl font-bold">{stats.interviewsScheduled}</span>
        </div>
        <div className="mt-2">
          <span className="text-xs text-slate-500">
            {stats.interviewsScheduled > 0 ? 'Next interview coming soon' : 'No interviews scheduled'}
          </span>
        </div>
      </div>

      {/* Accepted Offers Card */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-slate-600 text-sm font-medium">Accepted Offers</h3>
          <div className="bg-green-100 p-2 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
        </div>
        <div className="mt-4">
          <span className="text-3xl font-bold">{stats.accepted}</span>
        </div>
        <div className="mt-2">
          <span className="text-xs text-slate-500">
            {stats.accepted > 0 ? 'Congratulations!' : 'Congratulations Keep applying!'}
          </span>
        </div>
      </div>

      {/* Status Chart Card */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-slate-600 text-sm font-medium">Application Status</h3>
          <div className="bg-purple-100 p-2 rounded-lg">
            <Clock className="h-5 w-5 text-purple-500" />
          </div>
        </div>
        <div className="h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stats.statusData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={50}
                paddingAngle={2}
                dataKey="value"
              >
                {stats.statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value}`, name]}
                contentStyle={{
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  padding: '8px 12px',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2">
          {stats.statusData.map((status, index) => (
            <div key={index} className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: status.color }}
              />
              <span className="text-xs text-slate-600">{status.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;