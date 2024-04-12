import axios from 'axios';

const getApi = (url, api_key, token) => {
  return axios.get(`${url}${api_key ? `&key=${api_key}` : ''}${token ? `&access_token=${token}` : ''}`);
};

const postApi = (url, token) => {
  return axios.post(`${url}&access_token=${token}`);
};

const deleteApi = (url, token) => {
  return axios.delete(`${url}&access_token=${token}`);
};
export { getApi, postApi, deleteApi };
