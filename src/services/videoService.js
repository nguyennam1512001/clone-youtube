import axios from 'axios';

const getVideos = (url, api_key) => {
  return axios.get(`${url}&key=${api_key}`);
};
const fetchApi = (url, api_key) => {
  return axios.get(`${url}&key=${api_key}`);
};

export { getVideos, fetchApi };
