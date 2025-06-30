import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Building2, 
  Tags, 
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { jobService } from "../services/jobsServices";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({
    companies: [],
    types: [],
    tags: [],
    onlyRecommended: false,
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 12;

  useEffect(() => {
    console.log("Component mounted, fetching jobs...");
    const fetchJobs = async () => {
      try {
        console.log("Calling jobService.fetchJobs()");
        const data = await jobService.fetchJobs();
        console.log("Jobs fetched successfully:", data);
        setJobs(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err.message || "Failed to fetch jobs");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Reset to first page when filters or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, appliedFilters]);

  // Debug effect for jobs state
  useEffect(() => {
    if (jobs.length > 0) {
      console.log("Jobs data updated:", jobs);
      console.log("Unique companies:", [...new Set(jobs.map(job => job.company))]);
      console.log("Unique job types:", [...new Set(jobs.map(job => job.type))]);
    }
  }, [jobs]);

  // Debug effect for filters
  useEffect(() => {
    console.log("Filters updated:", appliedFilters);
  }, [appliedFilters]);

  const companies = [...new Set(jobs.map((job) => job.company))];
  const types = [...new Set(jobs.map((job) => job.type))];
  const allTags = [...new Set(jobs.flatMap((job) => job.tags))];

  const handleFilterChange = (filterType, value, isChecked) => {
    console.log(`Filter changed - type: ${filterType}, value: ${value}, checked: ${isChecked}`);
    setAppliedFilters((prev) => {
      if (isChecked) {
        return {
          ...prev,
          [filterType]: [...prev[filterType], value],
        };
      } else {
        return {
          ...prev,
          [filterType]: prev[filterType].filter((item) => item !== value),
        };
      }
    });
  };

  const handleRecommendedFilterChange = (isChecked) => {
    console.log(`Recommended filter changed: ${isChecked}`);
    setAppliedFilters((prev) => ({
      ...prev,
      onlyRecommended: isChecked,
    }));
  };

  const removeFilter = (filterType, value) => {
    console.log(`Removing filter - type: ${filterType}, value: ${value}`);
    setAppliedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].filter((item) => item !== value),
    }));
  };

  const clearAllFilters = () => {
    console.log("Clearing all filters");
    setAppliedFilters({
      companies: [],
      types: [],
      tags: [],
      onlyRecommended: false,
    });
    setSearchTerm("");
  };

  const filteredJobs = jobs.filter((job) => {
    if (
      searchTerm &&
      !job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !job.company.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    if (
      appliedFilters.companies.length > 0 &&
      !appliedFilters.companies.includes(job.company)
    ) {
      return false;
    }

    if (
      appliedFilters.types.length > 0 &&
      !appliedFilters.types.includes(job.type)
    ) {
      return false;
    }

    if (
      appliedFilters.tags.length > 0 &&
      !job.tags.some((tag) => appliedFilters.tags.includes(tag))
    ) {
      return false;
    }

    if (appliedFilters.onlyRecommended && !job.isRecommended) {
      return false;
    }

    return true;
  });

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  if (loading) {
    console.log("Rendering loading state");
    return <div className="text-center py-8">Loading jobs...</div>;
  }

  if (error) {
    console.log("Rendering error state:", error);
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (jobs.length === 0) {
    console.log("Rendering empty state");
    return <div className="text-center py-8">No jobs found</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full bg-white">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search jobs by title or company..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => {
              console.log("Search term changed:", e.target.value);
              setSearchTerm(e.target.value);
            }}
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4 p-2 max-h-screen">
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <Building2 className="h-4 w-4 mr-1" />
                  Company
                </h3>
                <div className="space-y-2">
                  {companies.map((company) => (
                    <div key={company} className="flex items-center space-x-2">
                      <Checkbox
                        id={`company-${company}`}
                        checked={appliedFilters.companies.includes(company)}
                        onCheckedChange={(checked) =>
                          handleFilterChange("companies", company, checked === true)
                        }
                      />
                      <Label htmlFor={`company-${company}`}>{company}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Job Type
                </h3>
                <div className="space-y-2">
                  {types.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={appliedFilters.types.includes(type)}
                        onCheckedChange={(checked) =>
                          handleFilterChange("types", type, checked === true)
                        }
                      />
                      <Label htmlFor={`type-${type}`}>{type}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <Tags className="h-4 w-4 mr-1" />
                  Skills
                </h3>
                <div className="space-y-2">
                  {allTags.map((tag) => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tag-${tag}`}
                        checked={appliedFilters.tags.includes(tag)}
                        onCheckedChange={(checked) =>
                          handleFilterChange("tags", tag, checked === true)
                        }
                      />
                      <Label htmlFor={`tag-${tag}`}>{tag}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="recommended"
                    checked={appliedFilters.onlyRecommended}
                    onCheckedChange={(checked) =>
                      handleRecommendedFilterChange(checked === true)
                    }
                  />
                  <Label htmlFor="recommended">Show only recommended jobs</Label>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {(appliedFilters.companies.length > 0 ||
        appliedFilters.types.length > 0 ||
        appliedFilters.tags.length > 0 ||
        appliedFilters.onlyRecommended) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-slate-500">Applied Filters:</span>
          {appliedFilters.companies.map((company) => (
            <Badge key={`filter-company-${company}`} variant="outline" className="px-2 py-1 flex items-center gap-1">
              {company}
              <button
                onClick={() => removeFilter("companies", company)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {appliedFilters.types.map((type) => (
            <Badge key={`filter-type-${type}`} variant="outline" className="px-2 py-1 flex items-center gap-1">
              {type}
              <button
                onClick={() => removeFilter("types", type)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {appliedFilters.tags.map((tag) => (
            <Badge key={`filter-tag-${tag}`} variant="outline" className="px-2 py-1 flex items-center gap-1">
              {tag}
              <button
                onClick={() => removeFilter("tags", tag)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {appliedFilters.onlyRecommended && (
            <Badge variant="outline" className="px-2 py-1 flex items-center gap-1">
              Recommended
              <button
                onClick={() => handleRecommendedFilterChange(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear all
          </Button>
        </div>
      )}

      <div className="grid grid-cols-3 md:grid-cols-2  gap-4">
        {currentJobs.length === 0 ? (
          <div className="col-span-full text-center py-8">
            No jobs match your search criteria
          </div>
        ) : (
          currentJobs.map((job) => (
            <div key={job.id} className="p-4 border rounded-lg shadow-sm space-y-2 bg-white">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{job.title}</h2>
                {job.isRecommended && (
                  <Badge variant="default" className="text-xs">
                    Recommended
                  </Badge>
                )}
              </div>
              <p className="text-sm text-slate-600">{job.company}</p>
              <div className="flex gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {job.type}
                </div>
                <div className="flex items-center gap-1">
                  <span>💰</span>
                  {job.salary || "Not specified"}
                </div>
              </div>
              <div className="text-xs text-slate-400">{job.postedDate}</div>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {filteredJobs.length > jobsPerPage && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-slate-500">
            Showing {indexOfFirstJob + 1}-{Math.min(indexOfLastJob, filteredJobs.length)} of {filteredJobs.length} jobs
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToFirstPage}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListings;