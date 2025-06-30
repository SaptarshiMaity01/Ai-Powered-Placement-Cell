import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/certifications'; // adjust as needed

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchCertifications = async () => {
  const res = await axios.get(BASE_URL, getAuthHeader());
  return res.data;
};

export const addCertification = async (data) => {
  const res = await axios.post(BASE_URL, data, getAuthHeader());
  return res.data;
};

export const updateCertification = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data, getAuthHeader());
  return res.data;
};

export const deleteCertification = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`, getAuthHeader());
  return res.data;
};
