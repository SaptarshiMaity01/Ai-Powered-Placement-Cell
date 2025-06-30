import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/skills';

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const fetchSkills = async () => {
  const res = await axios.get(BASE_URL, getAuthHeader());
  return res.data;
};

export const addSkill = async (skill) => {
  const res = await axios.post(BASE_URL, { skill }, getAuthHeader());
  return res.data;
};

export const deleteSkill = async (skill) => {
  const res = await axios.delete(`${BASE_URL}/${encodeURIComponent(skill)}`, getAuthHeader());
  return res.data;
};
