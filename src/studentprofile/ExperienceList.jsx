import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { PlusCircle, Edit, Trash2, Briefcase } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";

import {
  fetchExperiences,
  addExperience,
  updateExperience,
  deleteExperience,
} from "../services/experienceService";

const ExperienceList = ({ onChange = () => {} }) => {
  const [experiences, setExperiences] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    duration: "",
    description: "",
  });

  // Fetch from backend
  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const data = await fetchExperiences();
        setExperiences(data || [] );
        
      } catch (error) {
        console.error("Failed to load experiences:", error);
      }
    };
    loadExperiences();
  }, []);

  const handleOpenDialog = (experience) => {
    if (experience) {
      setEditingExperience(experience);
      setFormData({
        role: experience.role,
        company: experience.company,
        duration: experience.duration,
        description: experience.description,
      });
    } else {
      setEditingExperience(null);
      setFormData({
        role: "",
        company: "",
        duration: "",
        description: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingExperience(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.role || !formData.company || !formData.duration) return;

    try {
      let updatedExperiences;

      if (editingExperience) {
        const updated = await updateExperience(editingExperience._id, formData);
        updatedExperiences = experiences.map((exp) =>
          exp._id === updated._id ? updated : exp
        );
      } else {
        const newExp = await addExperience(formData);
        updatedExperiences = [...experiences, newExp];
      }

      setExperiences(updatedExperiences);
      onChange(updatedExperiences);
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to save experience:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExperience(id);
      const updatedExperiences = experiences.filter((exp) => exp._id !== id);
      setExperiences(updatedExperiences);
      onChange(updatedExperiences);
    } catch (error) {
      console.error("Failed to delete experience:", error);
    }
  };

  return (
    <div className="profile-card">
      <div className="section-header">
        <h2>Experience</h2>
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-linkedin-blue hover:bg-blue-700"
          size="sm"
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          Add Experience
        </Button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-6 text-slate-500">
          No experience added yet. Click "Add Experience" to get started.
        </div>
      ) : (
        <div className="space-y-6">
          {experiences.map((experience) => (
            <div
              key={experience._id}
              className="border border-slate-100 rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-lg flex items-center">
                    <Briefcase className="h-4 w-4 mr-2 text-linkedin-blue" />
                    {experience.role}
                  </h3>
                  <p className="text-sm font-medium text-slate-700">
                    {experience.company}
                  </p>
                  <p className="text-xs text-slate-500">{experience.duration}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleOpenDialog(experience)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(experience._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-3">{experience.description}</p>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] text-black">
          <DialogHeader>
            <DialogTitle>
              {editingExperience ? "Edit Experience" : "Add Experience"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role/Position</Label>
              <Input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Enter your role or position"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="May 2023 - Aug 2023"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your responsibilities and achievements"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="bg-linkedin-blue hover:bg-blue-700"
            >
              {editingExperience ? "Update Experience" : "Add Experience"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExperienceList;
