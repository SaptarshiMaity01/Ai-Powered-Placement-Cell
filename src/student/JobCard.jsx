import React from "react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Building, MapPin, Clock, Banknote, Eye } from "lucide-react";

function JobCard({
  id,
  title,
  company,
  location,
  jobType,
  salary,
  postedDate,
  tags = [],
  logo,
  
  onApply,
  onClick,
}) {
  const handleApplyClick = (e) => {
    e.stopPropagation();
    onApply(id);
  };

  const handleViewClick = (e) => {
    e.stopPropagation();
    onClick(id);
  };

  return (
    <div className="job-card bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 h-[290px] overflow-hidden">
      <div className="flex flex-col items-start gap-3">
        <div className="h-10 w-10 rounded-md bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
          {logo ? (
            <img src={logo} alt={`${company} logo`} className="w-full h-full object-cover" />
          ) : (
            <Building className="text-gray-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-gray-900 truncate">{title}</h3>
          <p className="text-sm text-gray-600 truncate">{company}</p>

          <div className="flex flex-wrap gap-y-2 mt-2">
            <div className="flex items-center text-sm text-gray-500 mr-3">
              <MapPin className="mr-1 h-3 w-3" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mr-3">
              <Clock className="mr-1 h-3 w-3" />
              <span>{jobType}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Banknote className="mr-1 h-3 w-3" />
              <span>{salary}</span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="font-normal text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-gray-500">Posted {postedDate}</span>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="outline"
                onClick={handleViewClick}
                className="h-7 px-2 text-xs"
              >
                <Eye className="h-3 w-3 mr-1" /> View
              </Button>
              <Button
                size="sm"
                onClick={handleApplyClick}
                className="h-7 px-2 text-xs"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
