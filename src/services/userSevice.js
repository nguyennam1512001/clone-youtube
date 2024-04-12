import axios from '../axios';

export const sendEmail = (email) => {
  return axios.post(`/api/send-email?email=${email}`);
};
