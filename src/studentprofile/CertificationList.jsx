import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { PlusCircle, Edit, Trash2, Award, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import {fetchCertifications,deleteCertification, updateCertification, addCertification} from '../services/certificationService'

const CertificationList = ({
  initialCertifications = [
    {
      id: "1",
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "June 2023",
      credentialLink: "https://www.credly.com/badges/example",
    },
    {
      id: "2",
      title: "Machine Learning Specialization",
      issuer: "Coursera",
      date: "March 2023",
      credentialLink: "https://www.coursera.org/account/accomplishments/example",
    },
  ],
  onChange = () => {},
}) => {
  const [certifications, setCertifications] = useState(initialCertifications);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCertification, setEditingCertification] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    date: "",
    credentialLink: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCertifications();
        setCertifications(data || []); // handle null values
      } catch (err) {
        console.error('Failed to fetch certifications:', err);
      }
    };
  
    loadData();
  }, []);
  const handleOpenDialog = (certification) => {
    if (certification) {
      setEditingCertification(certification);
      setFormData({
        title: certification.title,
        issuer: certification.issuer,
        date: certification.date,
        credentialLink: certification.credentialLink || "",
      });
    } else {
      setEditingCertification(null);
      setFormData({
        title: "",
        issuer: "",
        date: "",
        credentialLink: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCertification(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.issuer || !formData.date) {
      return;
    }
  
    try {
      let updated;
      if (editingCertification) {
        const updatedCert = await updateCertification(editingCertification._id, formData);
        updated = certifications.map((cert) =>
          cert._id === updatedCert._id ? updatedCert : cert
        );
      } else {
        const newCert = await addCertification(formData);
        updated = [...certifications, newCert];
      }
  
      setCertifications(updated);
      onChange(updated);
      handleCloseDialog();
    } catch (err) {
      console.error('Save failed:', err);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await deleteCertification(id);
      const updated = certifications.filter((cert) => cert._id !== id);
      setCertifications(updated);
      onChange(updated);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="profile-card text-black">
      <div className="section-header">
        <h2>Certifications & Achievements</h2>
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-linkedin-blue hover:bg-blue-700"
          size="sm"
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          Add Certification
        </Button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-6 text-slate-500">
          No certifications added yet. Click "Add Certification" to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {certifications.map((certification) => (
            <div
              key={certification.id}
              className="border border-slate-100 rounded-lg p-4 hover:shadow-sm transition-shadow flex justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <Award className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-medium">{certification.title}</h3>
                  <p className="text-sm text-slate-700">{certification.issuer}</p>
                  <p className="text-xs text-slate-500">{certification.date}</p>
                  {certification.credentialLink && (
                    <a
                      href={certification.credentialLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-linkedin-blue text-xs flex items-center mt-1 hover:underline"
                    >
                      View Credential <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleOpenDialog(certification)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(certification._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] text-black">
          <DialogHeader>
            <DialogTitle>
              {editingCertification ? "Edit Certification" : "Add Certification"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Certificate Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter certificate title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="issuer">Issuing Organization</Label>
              <Input
                id="issuer"
                name="issuer"
                value={formData.issuer}
                onChange={handleChange}
                placeholder="Enter organization name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Issue Date</Label>
              <Input
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="June 2023"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="credentialLink">Credential Link (optional)</Label>
              <Input
                id="credentialLink"
                name="credentialLink"
                value={formData.credentialLink}
                onChange={handleChange}
                placeholder="https://credential.example.com/verify/..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseDialog}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="bg-linkedin-blue hover:bg-blue-700"
            >
              {editingCertification ? "Update Certification" : "Add Certification"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CertificationList;