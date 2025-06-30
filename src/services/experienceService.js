import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/experiences";

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchExperiences = async () => {
  const res = await axios.get(BASE_URL, getAuthHeader());
  return res.data;
};

export const addExperience = async (data) => {
  const res = await axios.post(BASE_URL, data, getAuthHeader());
  return res.data;
};

export const updateExperience = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data, getAuthHeader());
  return res.data;
};

export const deleteExperience = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`, getAuthHeader());
};
