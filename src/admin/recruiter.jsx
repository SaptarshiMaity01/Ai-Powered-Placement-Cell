// pages/RecruiterListPage.js
import RecruiterList from "../admin/user-management/RecruiterList";

const RecruiterListPage = () => {
  return (
    <div className="min-h-screen bg-[#F3F2F0]">
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-linkedin-blue">Recruiter List</h1>
        <RecruiterList />
      </div>
    </div>
  );
};

export default RecruiterListPage;
