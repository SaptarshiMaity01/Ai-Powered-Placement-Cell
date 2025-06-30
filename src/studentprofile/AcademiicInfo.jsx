import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Edit } from "lucide-react";
import { getAcademicInfo, saveAcademicInfo } from '../services/academicInfoService';

export const AcademicInfo = ({
  initialData,
  onSave,
}) => {
  const defaultData = {
    rollNumber: "",
    department: "",
    degree: "",
    cgpa: "",
    tenthMarks: "",
    twelfthMarks: "",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData ?? null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAcademicInfo();
        if (data && Object.keys(data).length > 0) {
          setFormData(data);
        } else {
          setFormData(null); // no data found
        }
      } catch (err) {
        console.error("Failed to load academic info", err);
        setFormData(null);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const saved = await saveAcademicInfo(formData);
      setFormData(saved);
      setIsEditing(false);
      onSave && onSave(saved);
    } catch (err) {
      console.error("Failed to save", err);
    }
  };

  const startEditing = () => {
    if (!formData) {
      setFormData(defaultData); // start with empty form
    }
    setIsEditing(true);
  };

  return (
    <div className="profile-card">
      <div className="section-header">
        <h2>Academic Information</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={isEditing ? () => setIsEditing(false) : startEditing}
          className="text-linkedin-blue"
        >
          <Edit className="h-4 w-4 mr-1" />
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>

      {/* Show message if no data and not editing */}
      {!isEditing && !formData && (
        <div className="text-gray-600 pt-4">
          <p>No academic data found.</p>
          <Button onClick={startEditing} className="mt-2 bg-linkedin-blue text-white">
            Fill Now
          </Button>
        </div>
      )}

      {/* View Mode */}
      {!isEditing && formData && (
        <div className="space-y-2">
          <div className="data-row">
            <span className="data-label">Roll Number</span>
            <span className="data-value">{formData.rollNumber || "-"}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Department</span>
            <span className="data-value">{formData.department || "-"}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Degree</span>
            <span className="data-value">{formData.degree || "-"}</span>
          </div>
          <div className="data-row">
            <span className="data-label">CGPA</span>
            <span className="data-value">{formData.cgpa || "-"}</span>
          </div>
          <div className="data-row">
            <span className="data-label">10th Marks</span>
            <span className="data-value">{formData.tenthMarks || "-"}</span>
          </div>
          <div className="data-row">
            <span className="data-label">12th Marks</span>
            <span className="data-value">{formData.twelfthMarks || "-"}</span>
          </div>
        </div>
      )}

      {/* Edit Mode */}
      {isEditing && formData && (
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["rollNumber", "Roll Number"],
              ["department", "Department"],
              ["degree", "Degree"],
              ["cgpa", "CGPA"],
              ["tenthMarks", "10th Marks"],
              ["twelfthMarks", "12th Marks"],
            ].map(([key, label]) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key}>{label}</Label>
                <Input
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="button"
              onClick={handleSave}
              className="bg-linkedin-blue hover:bg-blue-700"
            >
              Save Information
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AcademicInfo;
