// src/services/projectService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/projects'; // Change if using a different base

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getProjects = async () => {
  const res = await axios.get(BASE_URL, getAuthHeader());
  return res.data;
};

export const createProject = async (data) => {
  const res = await axios.post(BASE_URL, data, getAuthHeader());
  return res.data;
};

export const updateProject = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data, getAuthHeader());
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`, getAuthHeader());
  return res.data;
};
