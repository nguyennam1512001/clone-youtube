import axios from 'axios';
import { googleKey } from '~/utils';

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      refresh_token: refreshToken,
      client_id: googleKey.CLIENT_ID,
      client_secret: googleKey.CLIENT_SECRET,
      grant_type: 'refresh_token',
    });

    const newAccessToken = response.data.access_token;
    const expiresIn = response.data.expires_in;

    // Cập nhật access_token mới trong ứng dụng của bạn
    updateAccessToken(newAccessToken);

    // Đặt lại timer để làm mới access_token trước khi hết hạn
    setTimeout(() => {
      refreshAccessToken(refreshToken);
    }, (expiresIn - 60) * 1000); // Làm mới 1 phút trước khi hết hạn
  } catch (error) {
    console.error('Lỗi khi làm mới access_token:', error);
    // Xử lý lỗi, có thể làm mới Refresh Token hoặc yêu cầu người dùng đăng nhập lại
  }
};

// Gọi hàm làm mới access_token khi component được mount hoặc access_token hết hạn
useEffect(() => {
  if (access_token) {
    const refreshToken = localStorage.getItem('refresh_token');
    refreshAccessToken(refreshToken);
  }
}, [access_token]);
