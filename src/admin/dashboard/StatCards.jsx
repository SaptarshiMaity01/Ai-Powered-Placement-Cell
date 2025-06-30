import { UsersRound, Briefcase, CheckSquare } from "lucide-react";
import StatCard from "./StatCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../services/AuthContext";

const StatCards = () => {
  const [stats, setStats] = useState({
    students: 0,
    recruiters: 0,
    jobs: 0,
    applications: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, token, isAuthenticated, role } = useAuth();
  console.log("User object:", user);
  console.log("User role:", user?.role);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setStats({
          students: response.data.students || 0,
          recruiters: response.data.recruiters || 0,
          jobs: response.data.jobs || 0,
          applications: response.data.applications || 0
        });
        setError(null);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isAuthenticated, token]);

  if (loading) {
    return (
      <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading stats: {error}</div>;
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Safely check for admin role */}
      {(user.role === 'admin') && (
        <>
          <StatCard
            title="Total Students"
            value={stats.students.toLocaleString()}
            icon={UsersRound}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Recruiters"
            value={stats.recruiters.toLocaleString()}
            icon={UsersRound}
            trend={{ value: 8, isPositive: true }}
          />
        </>
      )}
      
      <StatCard
        title={user.role === 'student' ? "Available Jobs" : "Job Openings"}
        value={stats.jobs.toLocaleString()}
        icon={Briefcase}
        trend={{ value: role === 'student' ? 5 : 14, isPositive: true }}
      />
      
      <StatCard
        title={user.role === 'student' ? "Your Applications" : "Total Applications"}
        value={stats.applications.toLocaleString()}
        icon={CheckSquare}
        trend={{ value: role === 'student' ? 3 : 7, isPositive: role !== 'student' }}
      />
    </div>
  );
};

export default StatCards;