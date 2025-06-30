import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/jobs';

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

export const jobService = {
  fetchJobs: async () => {
    const response = await api.get('/');
    return response.data;
  },

  createJob: async (jobData) => {
    const response = await api.post('/', jobData);
    return response.data;
  },

  updateJob: async (id, jobData) => {
    const response = await api.put(`/${id}`, jobData);
    return response.data;
  },

  deleteJob: async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
  },

  duplicateJob: async (id) => {
    const response = await api.post(`/${id}/duplicate`);
    return response.data;
  },

  updateJobStatus: async (id, status) => {
    const response = await api.patch(`/${id}/status`, { status });
    return response.data;
  },

  getJobApplicants: async (id) => {
    const response = await api.get(`/${id}/applicants`);
    return response.data;
  }
};