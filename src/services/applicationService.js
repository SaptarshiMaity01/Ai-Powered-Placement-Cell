import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/applications';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Request interceptor for JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export const applicationService = {
  // Get applications for a specific job (for recruiters)
  getApplicationsByJobId: async (jobId) => {
    const response = await api.get(`/recruiter/${jobId}`);
    return response.data;
  },

  getAllApplications: async () => {
    const response = await api.get('/');
    return response.data;
  },

  
  // Update application status
  updateApplicationStatus: async (applicationId, status) => {
    const response = await api.patch(`/${applicationId}/status`, { status });
    return response.data;
  },
  
  // Get application details
  getApplicationById: async (applicationId) => {
    const response = await api.get(`/${applicationId}`);
    return response.data;
  },
  
  // Get all applications for the current user (for students)
  getUserApplications: async () => {
    const response = await api.get('/user');
    return response.data;
  }
  
};