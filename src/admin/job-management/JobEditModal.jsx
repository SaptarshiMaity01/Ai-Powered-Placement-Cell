import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { X } from "lucide-react";

const JobEditModal = ({ job, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...job });
  const [newTag, setNewTag] = useState("");
  const [newRequirement, setNewRequirement] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag]
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };

  const handleAddRequirement = () => {
    if (newRequirement && !formData.requirements.includes(newRequirement)) {
      setFormData({
        ...formData,
        requirements: [...formData.requirements, newRequirement]
      });
      setNewRequirement("");
    }
  };

  const handleRemoveRequirement = (requirement) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter(r => r !== requirement)
    });
  };

  const handleSubmit = () => {
    onSave({
      ...formData,
      postedDate: formData.id.startsWith('j') && formData.id.length > 1 
        ? formData.postedDate 
        : new Date()
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{job.id ? 'Edit Job' : 'Add New Job'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-black">
          <div className="grid gap-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Frontend Developer"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Acme Inc."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="New York, NY"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Job description..."
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label>Requirements</Label>
            <div className="flex gap-2">
              <Input
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                placeholder="Add requirement"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddRequirement}
                className="whitespace-nowrap"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.requirements.map((requirement, index) => (
                <div
                  key={index}
                  className="bg-linkedin-light text-linkedin-blue text-sm px-3 py-1 rounded-full flex items-center gap-1"
                >
                  <span>{requirement}</span>
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleRemoveRequirement(requirement)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddTag}
                className="whitespace-nowrap"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-linkedin-light text-linkedin-blue text-sm px-3 py-1 rounded-full flex items-center gap-1"
                >
                  <span>{tag}</span>
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobEditModal;
