// pages/StudentListPage.js
import StudentList from "../../src/admin/user-management/StudentList";

const Student = () => {
  return (
    <div className="min-h-screen bg-[#F3F2F0]">
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-linkedin-blue">Student List</h1>
        <StudentList />
      </div>
    </div>
  );
};

export default Student;
