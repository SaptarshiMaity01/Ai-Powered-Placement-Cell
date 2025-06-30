import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { Badge } from "../components/ui/badge";
import { X, Search, MapPin, Briefcase, DollarSign, Tags } from "lucide-react";

const JobFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    jobType: "",
    salaryRange: [0, 200000],
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(true);

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Remote",
  ];

  const popularLocations = [
    "New York, NY",
    "San Francisco, CA",
    "Chicago, IL",
    "Austin, TX",
    "Remote",
    "Anywhere",
  ];

  const popularTags = [
    "React",
    "Node.js",
    "Python",
    "Java",
    "AWS",
    "Machine Learning",
    "UI/UX",
    "DevOps",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSalaryChange = (value) => {
    setFilters((prev) => ({ ...prev, salaryRange: value }));
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !filters.tags.includes(tagInput.trim())) {
      setFilters((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handlePopularTagClick = (tag) => {
    if (!filters.tags.includes(tag)) {
      setFilters((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    }
  };

  const removeTag = (tagToRemove) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
    setShowMobileFilters(false);
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      location: "",
      jobType: "",
      salaryRange: [0, 200000],
      tags: [],
    });
    onFilterChange({
      search: "",
      location: "",
      jobType: "",
      salaryRange: [0, 200000],
      tags: [],
    });
  };
 
  return (
    <div className="space-y-4">
      {/* Mobile filter toggle */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <Search className="h-4 w-4" />
          <span>{showMobileFilters ? "Show Filters" : "Hide Filters"}</span>
        </Button>
      </div>

      {/* Desktop filters */}
      <div
        className={`bg-white p-4 rounded-lg shadow-sm border ${
          showMobileFilters ? "block" : "hidden lg:block"
        }`}
      >
        <h3 className="font-semibold text-lg mb-4">Filter jobs</h3>

        {/* Search */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1  items-center gap-2">
            <Search className="h-4 w-4" />
            Search
          </label>
          <Input
            name="search"
            placeholder="Job title, company, or keywords"
            value={filters.search}
            onChange={handleInputChange}
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1  items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location
          </label>
          <Select
            value={filters.location}
            onValueChange={(value) => handleSelectChange("location", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Anywhere</SelectItem>
              {popularLocations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Job Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1  items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Job Type
          </label>
          <Select
            value={filters.jobType}
            onValueChange={(value) => handleSelectChange("jobType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any type</SelectItem>
              {jobTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Salary Range */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Salary Range
          </label>
          <div className="px-2">
            <Slider
              value={filters.salaryRange}
              onValueChange={handleSalaryChange}
              min={0}
              max={200000}
              step={5000}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>${filters.salaryRange[0].toLocaleString()}</span>
            <span>${filters.salaryRange[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1  items-center gap-2">
            <Tags className="h-4 w-4" />
            Skills & Technologies
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add a skill (e.g. React)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTagAdd()}
            />
            <Button variant="outline" onClick={handleTagAdd}>
              Add
            </Button>
          </div>

          {/* Popular tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {popularTags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => handlePopularTagClick(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Selected tags */}
          {filters.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {filters.tags.map((tag) => (
                <Badge
                  key={tag}
                  className="flex items-center gap-1"
                  onClick={() => removeTag(tag)}
                >
                  {tag}
                  <X className="h-3 w-3" />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button className="flex-1" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={resetFilters}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Active filters display */}
      {(filters.search ||
        filters.location !== "" ||
        filters.jobType !== "" ||
        filters.salaryRange[0] !== 0 ||
        filters.salaryRange[1] !== 200000 ||
        filters.tags.length > 0) && (
        <div className="bg-white p-3 rounded-lg shadow-sm border">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium">Active filters:</span>
            {filters.search && (
              <Badge className="flex items-center gap-1">
                Search: {filters.search}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, search: "" }))
                  }
                />
              </Badge>
            )}
            {filters.location && filters.location !== "any" && (
              <Badge className="flex items-center gap-1">
                Location: {filters.location}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, location: "" }))
                  }
                />
              </Badge>
            )}
            {filters.jobType && filters.jobType !== "any" && (
              <Badge className="flex items-center gap-1">
                Type: {filters.jobType}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, jobType: "" }))
                  }
                />
              </Badge>
            )}
            {(filters.salaryRange[0] !== 0 ||
              filters.salaryRange[1] !== 200000) && (
              <Badge className="flex items-center gap-1">
                Salary: ${filters.salaryRange[0].toLocaleString()} - $
                {filters.salaryRange[1].toLocaleString()}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      salaryRange: [0, 200000],
                    }))
                  }
                />
              </Badge>
            )}
            {filters.tags.map((tag) => (
              <Badge
                key={tag}
                className="flex items-center gap-1"
                onClick={() => removeTag(tag)}
              >
                {tag}
                <X className="h-3 w-3" />
              </Badge>
            ))}
            <Button
              variant="link"
              className="text-primary h-6 p-0 ml-auto"
              onClick={resetFilters}
            >
              Clear all
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFilters;