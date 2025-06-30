import axios from "axios";

const API_URL = "/api/announcements";

// Helper function to get the auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Create axios instance with auth headers
const createAuthAxios = () => {
  const token = getAuthToken();
  return axios.create({
    headers: {
      "Content-Type": "application/json",
      "Authorization": token ? `Bearer ${token}` : "",
    },
  });
};

// Fetch announcements based on user role (handled by backend)
export const fetchAnnouncements = async () => {
  try {
    const authAxios = createAuthAxios();
    const response = await authAxios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching announcements:", error);
    throw error;
  }
};

// Create new announcement
export const createAnnouncement = async (announcementData) => {
  try {
    const authAxios = createAuthAxios();
    const response = await authAxios.post(API_URL, announcementData);
    return response.data;
  } catch (error) {
    console.error("Error creating announcement:", error);
    throw error;
  }
};

// Update announcement
export const updateAnnouncement = async (id, announcementData) => {
    try {
      const authAxios = createAuthAxios();
      const response = await authAxios.put(`${API_URL}/${id}`, announcementData);
      return response.data;
    } catch (error) {
      // Handle specific error messages better
      const errorMsg = error.response?.data?.message || 
                      error.response?.data?.error || 
                      "Failed to update announcement";
      throw new Error(errorMsg);
    }
  };

// Delete announcement
export const deleteAnnouncement = async (id) => {
  try {
    const authAxios = createAuthAxios();
    console.log("Deleting announcement with ID:", id);
    const response = await authAxios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting announcement:", error);
    throw error;
  }
};