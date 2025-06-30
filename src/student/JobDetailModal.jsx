import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Building, MapPin, Clock, Banknote, Briefcase, CalendarClock, Users } from "lucide-react";

function JobDetailModal({
  job,
  isOpen,
  onClose,
  onApply,
}) {
  // Ensure tags exist before using them
  const tags = job.tags || [];
  
  // Use actual description and requirements from the job data
  const description = job.description || "No description provided.";
  
  // Convert requirements string to array if it's a string
  const requirements = typeof job.requirements === 'string' 
    ? job.requirements.split('\n').filter(item => item.trim() !== '')
    : Array.isArray(job.requirements)
      ? job.requirements
      : ["No requirements specified."];

  // Static benefits as before
  const benefits = [
    "Competitive salary and benefits package",
    "Flexible work arrangements",
    "Professional development opportunities",
    "Collaborative and inclusive work environment",
    "Modern office with great amenities",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto text-black">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-md bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
              {job.logo ? (
                <img
                  src={job.logo}
                  alt={`${job.company} logo`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <div>
              <DialogTitle className="text-xl">{job.title}</DialogTitle>
              <div className="text-base font-normal mt-1 text-gray-700">
                {job.company}
              </div>
              <div className="flex flex-wrap gap-y-2 mt-3">
                <div className="flex items-center text-sm text-gray-500 mr-4">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mr-4">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{job.jobType}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Banknote className="mr-1 h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-gray-500" />
              Job Description
            </h3>
            <div className="text-gray-700 whitespace-pre-line">{description}</div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-500" />
              Requirements
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {requirements.map((req, index) => (
                <li key={index} className="text-gray-700">
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-gray-500" />
              Benefits
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {benefits.map((benefit, index) => (
                <li key={index} className="text-gray-700">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-600">
              Posted {new Date(job.postedDate).toLocaleDateString()} • Applications are reviewed on a rolling basis
            </p>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onApply(job._id)}>Apply Now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default JobDetailModal;