import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Github, Calendar, Award, Link as LinkIcon } from "lucide-react";
import { getProjects } from "../services/projectService";
import { fetchExperiences } from "../services/experienceService";
import { fetchCertifications } from "../services/certificationService";

// PROJECTS SECTION
export const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjects();
        setProjects(data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjects([]);
      }
    };

    fetchData();
  }, []);

  if (!projects?.length) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Github className="h-5 w-5 text-gray-500" />
          Recent Projects
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {projects.slice(0, 2).map((project) => (
            <div key={project?.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-base">{project?.title || "Untitled Project"}</h3>
                {project?.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-linkedin-blue hover:underline flex items-center gap-1"
                  >
                    <Github className="h-3 w-3" /> View Code
                  </a>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {project?.description || "No description provided."}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {Array.isArray(project?.techStack) &&
                  project.techStack.map((tech, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="bg-gray-100 text-gray-700 border-none text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// EXPERIENCE SECTION
export const ExperienceSection = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchExperiences();
        setExperiences(data || []);
      } catch (err) {
        console.error("Error fetching experiences:", err);
        setExperiences([]);
      }
    };

    fetchData();
  }, []);

  if (!experiences?.length) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          Recent Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {experiences.slice(0, 2).map((exp) => (
            <div key={exp?.id} className="p-4">
              <div className="mb-1">
                <h3 className="font-medium text-base">{exp?.role || "Role Unknown"}</h3>
                <div className="text-sm text-gray-700">
                  {exp?.company || "Unknown Company"} · {exp?.duration || "N/A"}
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {exp?.description || "No description provided."}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// CERTIFICATIONS SECTION
export const CertificationsSection = () => {
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCertifications();
        setCertifications(data || []);
      } catch (err) {
        console.error("Error fetching certifications:", err);
        setCertifications([]);
      }
    };

    fetchData();
  }, []);

  if (!certifications?.length) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Award className="h-5 w-5 text-gray-500" />
          Recent Certifications
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {certifications.slice(0, 2).map((cert) => (
            <div key={cert?.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-base">{cert?.title || "Untitled"}</h3>
                  <div className="text-sm text-gray-700">
                    {cert?.issuer || "Unknown Issuer"} · {cert?.date || "N/A"}
                  </div>
                </div>
                {cert?.credentialLink && (
                  <a
                    href={cert.credentialLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-linkedin-blue hover:underline flex items-center gap-1"
                  >
                    <LinkIcon className="h-3 w-3" /> View Certificate
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
