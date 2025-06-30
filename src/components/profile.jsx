import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdDateRange, MdLocationOn, MdSchool } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";

const StudentProfile = () => {
  const [studentData, setStudentData] = useState({
    name: "Iqbaal Ramadhan",
    email: "iqbaale@example.com",
    dob: "28 December 2004",
    institution: "Sekolah Pelita Harapan",
    address: "Jl. Lavender III, Klp. Dua, Tangerang",
    bio: "Hi! Saya Iqbaal biasa dipanggil Ale. Saya sangat menyukai dunia desain dan photography...",
    avatar: "https://i.pravatar.cc/150",
    marks: {
      class11: "85%",
      class12: "88%",
      diploma: "-",
      degree: "B.Tech - 80%"
    },
    resume: null,
    placementStatus: "Seeking Internship"
  });

  const [isEditing, setIsEditing] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMarksChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({
      ...prev,
      marks: {
        ...prev.marks,
        [name]: value,
      },
    }));
  };

  const handleResumeUpload = (e) => {
    setStudentData((prev) => ({
      ...prev,
      resume: e.target.files[0],
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Call API here to save to DB if needed
  };

  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {/* Profile Card */}
      <div className="bg-white p-6 rounded-xl shadow-md col-span-1 xl:col-span-1">
        <div className="flex flex-col items-center">
          <img src={studentData.avatar} alt="avatar" className="w-24 h-24 rounded-full object-cover border-4 border-indigo-200 shadow" />
          {isEditing ? (
            <>
              <input name="name" value={studentData.name} onChange={handleChange} className="text-xl font-semibold text-center mt-2" />
              <input name="email" value={studentData.email} onChange={handleChange} className="text-sm text-gray-500 text-center" />
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mt-2">{studentData.name}</h2>
              <p className="text-sm text-gray-500">{studentData.email}</p>
            </>
          )}
          <div className="text-sm text-gray-600 mt-4 text-center">
            <p className="flex justify-center items-center gap-2"><MdDateRange /> {studentData.dob}</p>
            <p className="flex justify-center items-center gap-2"><MdSchool /> {studentData.institution}</p>
            <p className="flex justify-center items-center gap-2"><MdLocationOn /> {studentData.address}</p>
          </div>
          <div className="mt-4 w-full">
            {isEditing ? (
              <textarea name="bio" value={studentData.bio} onChange={handleChange} className="w-full border p-2 rounded" />
            ) : (
              <p className="text-sm text-gray-700 mt-2 text-left">{studentData.bio}</p>
            )}
          </div>
          <button onClick={() => isEditing ? handleSave() : setIsEditing(true)} className="mt-4 px-4 py-1 bg-blue-600 text-white rounded">
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>

      {/* Academic Info Card */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="font-semibold text-lg mb-4">Academic Information</h3>
        <div className="space-y-2">
          {Object.entries(studentData.marks).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="capitalize">{key.replace("class", "Class ")}</span>
              {isEditing ? (
                <input name={key} value={value} onChange={handleMarksChange} className="border p-1 rounded w-24 text-sm" />
              ) : (
                <span>{value}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Resume Upload */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="font-semibold text-lg mb-4">Upload Resume</h3>
        {studentData.resume ? (
          <p className="text-sm text-gray-700">Uploaded: {studentData.resume.name}</p>
        ) : (
          <p className="text-sm text-gray-500">No resume uploaded yet</p>
        )}
        {isEditing && (
          <label className="block mt-2">
            <input type="file" onChange={handleResumeUpload} className="hidden" />
            <div className="flex items-center gap-2 mt-2 cursor-pointer text-blue-600">
              <FaFileUpload /> <span>Upload File</span>
            </div>
          </label>
        )}
      </div>

      {/* Placement Status */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="font-semibold text-lg mb-4">Placement/Job Status</h3>
        {isEditing ? (
          <input name="placementStatus" value={studentData.placementStatus} onChange={handleChange} className="border p-1 rounded w-full" />
        ) : (
          <p className="text-sm text-gray-700">{studentData.placementStatus}</p>
        )}
      </div>

      {/* Add additional cards here like Courses, Skills, etc. */}
    </div>
  );
};

export default StudentProfile;
