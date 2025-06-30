import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import html2pdf from 'html2pdf.js';

// Utility to merge Tailwind classes
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format "YYYY-MM" to "Mon YYYY"
export function formatDate(dateString) {
  if (!dateString) return "";

  try {
    const [year, month] = dateString.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch (e) {
    return dateString;
  }
}

// Export a DOM element to PDF
export const exportToPDF = async (elementId, fileName = "resume") => {
  const element = document.getElementById(elementId);
 
  if (!element) return;
  
  const options = {
    margin: 10,
    filename: `${fileName}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff"
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' 
    }
  };
  
  try {
    await html2pdf().from(element).set(options).save();
    return true;
  } catch (error) {
    console.error("PDF export error:", error);
    
    // Fallback to the original implementation if html2pdf fails
    try {
      console.log("Using fallback PDF export method...");
      
      // Create canvas
      const canvas = await html2canvas(element, {
        scale: 1,
        useCORS: true,
        backgroundColor: "#ffffff"
      });
      
      // Create PDF
      const pdf = new jsPDF();
      
      // Convert to image
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      // Add image with safe dimensions
      // Note: This was missing values in your code
      pdf.addImage(imgData, 'JPEG', );
      
      // Save PDF
      pdf.save(`${fileName}.pdf`);
      
      return true;
    } catch (fallbackError) {
      console.error("Fallback PDF export also failed:", fallbackError);
      return false;
    }
  }
};

// Default data structure for resume
export const defaultResumeData = {
  personalInfo: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
    summary: "",
  },
  experiences: [],
  education: [],
  skills: [],
  projects: [],
};
