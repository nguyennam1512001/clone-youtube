import axios from 'axios';

const getUserInfoSevice = (access_token) => {
  return axios.get(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true&access_token=${access_token}`,
  );
};

const getChannelInfoSevice = (url, api_key) => {
  return axios.get(`${url}&key=${api_key}`);
};

export { getUserInfoSevice, getChannelInfoSevice };
