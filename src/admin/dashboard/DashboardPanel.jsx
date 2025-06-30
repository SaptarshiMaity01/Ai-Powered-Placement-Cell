import StatCards from "./StatCards";
import RecentJobs from "./RecentJobs";
import RecentApplications from "./Recentapplications";
import ApplicationsOverTimeChart from "./charts/ApplicationsOverTimeChart";
import ApplicationStatusChart from "./charts/ApplicationStatusChart";
import DepartmentPlacementChart from "./charts/DepartmentPlacementChart";
import CompanyJobsChart from "./charts/CompanyJobsChart";

const DashboardPanel = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <StatCards />

      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <ApplicationsOverTimeChart />
        <ApplicationStatusChart />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <DepartmentPlacementChart />
        <CompanyJobsChart />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <RecentJobs />
        <RecentApplications />
      </div>
    </div>
  );
};

export default DashboardPanel;
