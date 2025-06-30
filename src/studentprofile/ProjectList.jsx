import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { PlusCircle, Edit, Github, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectService";

const ProjectList = ({ onChange = () => {} }) => {
  const [projects, setProjects] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: [],
    githubLink: "",
  });
  const [techStackInput, setTechStackInput] = useState("");

  // Fetch projects from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjects();
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]); // fallback to empty list
      }
    };
    fetchData();
  }, []);

  const handleOpenDialog = (project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        techStack: project.techStack || [],
        githubLink: project.githubLink || "",
      });
      setTechStackInput((project.techStack || []).join(", "));
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        description: "",
        techStack: [],
        githubLink: "",
      });
      setTechStackInput("");
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProject(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechStackChange = (e) => {
    const value = e.target.value;
    setTechStackInput(value);
    const techArray = value
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech);
    setFormData((prev) => ({ ...prev, techStack: techArray }));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description || formData.techStack.length === 0) {
      return;
    }

    try {
      let updatedProjects;
      if (editingProject) {
        const updated = await updateProject(editingProject._id, formData);
        updatedProjects = projects.map((p) =>
          p._id === editingProject._id ? updated : p
        );
      } else {
        const newProject = await createProject(formData);
        updatedProjects = [...projects, newProject];
      }
      setProjects(updatedProjects);
      onChange(updatedProjects);
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      const updated = projects.filter((project) => project._id !== id);
      setProjects(updated);
      onChange(updated);
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <div className="profile-card">
      <div className="section-header">
        <h2>Projects</h2>
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-linkedin-blue hover:bg-blue-700"
          size="sm"
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          Add Project
        </Button>
      </div>

      {projects?.length === 0 ? (
        <div className="text-center py-6 text-slate-500">
          No projects found. Click "Add Project" to create one.
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-slate-100 rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-lg">{project.title}</h3>
                <div className="flex space-x-2">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-500 hover:text-slate-700"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  <button
                    onClick={() => handleOpenDialog(project)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {(project.techStack || []).map((tech, index) => (
                  <span
                    key={`${tech}-${index}`}
                    className="bg-slate-100 text-slate-700 px-2 py-1 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] text-black">
          <DialogHeader>
            <DialogTitle>{editingProject ? "Edit Project" : "Add Project"}</DialogTitle>
            <DialogDescription>
              Add details about your project below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter project title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your project"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="techStack">Tech Stack (comma-separated)</Label>
              <Input
                id="techStack"
                name="techStack"
                value={techStackInput}
                onChange={handleTechStackChange}
                placeholder="React, TypeScript, Node.js, etc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubLink">GitHub Link (optional)</Label>
              <Input
                id="githubLink"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                placeholder="https://github.com/username/repo"
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
              {editingProject ? "Update Project" : "Add Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectList;
