import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { X, PlusCircle } from "lucide-react";
import { fetchSkills, addSkill, deleteSkill } from "../services/skillService";

const SkillTags = ({ onChange = () => {} }) => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  // Load skills from backend on mount
  useEffect(() => {
    const loadSkills = async () => {
      try {
        const backendSkills = await fetchSkills();
        setSkills(backendSkills ?? []);
      } catch (error) {
        console.error("Failed to load skills:", error);
      }
    };
    loadSkills();
  }, []);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      try {
        const updatedSkills = await addSkill(newSkill.trim());
        setSkills(updatedSkills);
        onChange(updatedSkills);
        setNewSkill("");
      } catch (error) {
        console.error("Failed to add skill:", error);
      }
    }
  };

  const handleRemoveSkill = async (skillToRemove) => {
    try {
      const updatedSkills = await deleteSkill(skillToRemove);
      setSkills(updatedSkills);
      onChange(updatedSkills);
    } catch (error) {
      console.error("Failed to remove skill:", error);
    }
  };

  return (
    <div className="profile-card">
      <div className="section-header mb-6">
        <h2>Skills</h2>
      </div>

      <div className="space-y-4">
        {/* Skills List */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div
              key={skill}
              className="bg-linkedin-light text-linkedin-blue px-3 py-1 rounded-full flex items-center gap-2 text-sm"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="hover:bg-blue-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Skill Form */}
        <form onSubmit={handleAddSkill} className="flex items-center gap-2 mt-4">
          <Input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill..."
            className="flex-1"
          />
          <Button
            type="submit"
            className="bg-linkedin-blue hover:bg-blue-700"
            size="sm"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SkillTags;
