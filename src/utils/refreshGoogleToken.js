import axios from 'axios';
import { googleKey } from './constant';

const refreshGoogleToken = async (refreshToken) => {
  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      refresh_token: refreshToken,
      client_id: googleKey.CLIENT_ID,
      client_secret: googleKey.CLIENT_SECRET,
      grant_type: refreshToken,
    });

    const newAccessToken = response.data.access_token;
    return newAccessToken;
  } catch (error) {
    console.error('Lỗi khi làm mới mã xác thực:', error.response.data.error);
    throw error;
  }
  // try {
  //   const refreshedCredential = await signInWithCredential(auth, GoogleAuthProvider.credential(null, refreshToken));
  //   const newAccessToken = refreshedCredential.accessToken;
  //   // Sử dụng newAccessToken để gọi API của Google, bao gồm cả YouTube API
  //   return newAccessToken;
  // } catch (error) {
  //   console.error('Error refreshing access token:', error);
  //   throw error;
  // }
};

export default refreshGoogleToken;
