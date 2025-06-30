import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Trash2, Plus, Code, Sparkles } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Switch } from "../components/ui/switch";
import { generateContent } from "../services/aiService";
import { toast } from "sonner";

const ProjectsForm = ({ projects, onChange, apiKey }) => {
  const [editingProject, setEditingProject] = useState({
    id: "",
    name: "",
    description: "",
    url: "",
    startDate: "",
    endDate: "",
    current: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAddProject = () => {
    const newProject = {
      ...editingProject,
      id: editingProject.id || uuidv4(),
    };

    if (isEditing) {
      onChange(
        projects.map((project) =>
          project.id === newProject.id ? newProject : project
        )
      );
    } else {
      onChange([...projects, newProject]);
    }

    setEditingProject({
      id: "",
      name: "",
      description: "",
      url: "",
      startDate: "",
      endDate: "",
      current: false,
    });
    setIsEditing(false);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setIsEditing(true);
  };

  const handleDeleteProject = (id) => {
    onChange(projects.filter((project) => project.id !== id));
  };

  const handleCurrentChange = (checked) => {
    setEditingProject((prev) => ({
      ...prev,
      current: checked,
      endDate: checked ? "" : prev.endDate,
    }));
  };

  const generateProjectDescription = async () => {
    if (!apiKey) {
      toast.error("Please enter your GROQ API key to use AI features");
      return;
    }

    if (!editingProject.name) {
      toast.warning("Please enter a project name first");
      return;
    }

    try {
      setIsGenerating(true);

      const prompt = `Create a compelling project description for my resume with these details:
      - Project name: ${editingProject.name}
      ${editingProject.url ? `- Project URL: ${editingProject.url}` : ""}

      Format your response as 2-3 sentences highlighting the purpose of the project, technologies used, and key achievements or features. Focus on quantifiable results where possible. The description should be professional and concise.`;

      const description = await generateContent(prompt, apiKey);

      setEditingProject((prev) => ({
        ...prev,
        description,
      }));

      toast.success("Project description generated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate description. Please check your API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 text-black">
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-medium mb-4">Add Project</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                placeholder="My Project"
                value={editingProject.name}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="project-url">Project URL (Optional)</Label>
              <Input
                id="project-url"
                placeholder="https://project-url.com"
                value={editingProject.url}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, url: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="project-start-date">Start Date</Label>
              <Input
                id="project-start-date"
                type="month"
                value={editingProject.startDate}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    startDate: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Label htmlFor="project-end-date">End Date</Label>
                <div className="flex items-center space-x-2">
                  <Label
                    htmlFor="current-project"
                    className="text-sm cursor-pointer"
                  >
                    Current
                  </Label>
                  <Switch
                    id="current-project"
                    checked={editingProject.current}
                    onCheckedChange={handleCurrentChange}
                  />
                </div>
              </div>
              <Input
                id="project-end-date"
                type="month"
                value={editingProject.endDate}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    endDate: e.target.value,
                  })
                }
                disabled={editingProject.current}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="project-description">Project Description</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="flex items-center gap-1 text-xs"
                onClick={generateProjectDescription}
                disabled={isGenerating}
              >
                <Sparkles size={14} />
                {isGenerating ? "Generating..." : "Generate with AI"}
              </Button>
            </div>
            <Textarea
              id="project-description"
              placeholder="Describe your project, technologies used, and your accomplishments"
              className="min-h-[120px]"
              value={editingProject.description}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  description: e.target.value,
                })
              }
            />
          </div>

          <Button
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-resume-primary"
            onClick={handleAddProject}
          >
            <Plus size={18} />
            {isEditing ? "Update Project" : "Add Project"}
          </Button>
        </div>
      </div>

      {projects.length > 0 && (
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-4">Saved Projects</h3>
          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-resume-primary">
                      {project.name || "Project Name"}
                    </h4>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditProject(project)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                  <Separator className="my-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    {project.startDate &&
                      `${project.startDate} - ${
                        project.current ? "Present" : project.endDate
                      }`}
                  </p>
                  {project.url && (
                    <p className="text-sm flex items-center gap-1 text-blue-600 mb-2">
                      <Code size={14} />
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.url}
                      </a>
                    </p>
                  )}
                  <p className="text-sm">
                    {project.description || "No description provided"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;
