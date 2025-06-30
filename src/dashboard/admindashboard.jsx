// pages/DashboardPage.js
import DashboardPanel from "../admin/dashboard/DashboardPanel";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-[#F3F2F0] text-black">
      <div className="container py-8">
       
        <DashboardPanel />
      </div>
    </div>
  );
};

export default DashboardPage;
