import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Update with your backend URL

// Set up axios instance with auth token
const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle API errors consistently
const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    const { data, status } = error.response;
    
    if (status === 400 && data.errors) {
      // Validation error with detailed field errors
      return Promise.reject({
        message: data.message || 'Validation failed',
        errors: data.errors,
        status
      });
    }
    
    return Promise.reject({
      message: data.message || 'Request failed',
      status
    });
  } else if (error.request) {
    // The request was made but no response was received
    return Promise.reject({
      message: 'No response from server',
      status: 0
    });
  } else {
    // Something happened in setting up the request
    return Promise.reject({
      message: error.message || 'Request setup failed',
      status: -1
    });
  }
};

export const getEvents = async (start = null, end = null) => {
  try {
    const params = {};
    
    if (start && !isNaN(start.getTime())) {
      params.start = start.toISOString();
    }
    
    if (end && !isNaN(end.getTime())) {
      params.end = end.toISOString();
    }
    
    const response = await api.get('/events', { params });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createEvent = async (event) => {
  try {
    // Ensure required fields are not null
    const eventData = {
      title: event.title || '',
      start: event.start || new Date(),
      end: event.end || new Date(Date.now() + 3600000), // 1 hour later
      color: event.color || '#0a66c2',
      description: event.description || ''
    };
    
    const response = await api.post('/events', eventData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateEvent = async (id, event) => {
  try {
    // Only include fields that are not null/undefined
    const eventData = {};
    
    if (event.title !== undefined) {
      eventData.title = event.title || '';
    }
    if (event.start !== undefined) {
      eventData.start = event.start || new Date();
    }
    if (event.end !== undefined) {
      eventData.end = event.end || new Date(Date.now() + 3600000);
    }
    if (event.color !== undefined) {
      eventData.color = event.color || '#0a66c2';
    }
    if (event.description !== undefined) {
      eventData.description = event.description || '';
    }
    
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};