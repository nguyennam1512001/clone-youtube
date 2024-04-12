import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '~/store/actions';
import { googleKey } from '~/utils';
import axios from 'axios';
import { sendEmail } from '~/services/userSevice';

const YOUR_CLIENT_ID = googleKey.CLIENT_ID;
const YOUR_REDIRECT_URI = googleKey.REDIRECT_URI_LOGIN;
const YOUR_CLIENT_SECRET = googleKey.CLIENT_SECRET;

function Login({
  navigateToHomePage,
  userLoginSuccess,
  access_token,
  getUserInfoStart,
  getEmail,
  getAccessToken,
  getRefreshToken,
}) {
  useEffect(() => {
    handleGoogleLogin();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const authorizationResponse = await axios.get('https://accounts.google.com/o/oauth2/v2/auth', {
        params: {
          scope: 'https://www.googleapis.com/auth/youtube email',
          response_type: 'code',
          state: 'security_token=138r5719ru3e1&url=http://localhost:3000/login',
          client_id: YOUR_CLIENT_ID,
          redirect_uri: YOUR_REDIRECT_URI,
        },
      });
      const authorizationCode = authorizationResponse.data.code;

      const tokenResponse = await axios.post(
        'https://oauth2.googleapis.com/token',
        {
          code: authorizationCode,
          client_id: YOUR_CLIENT_ID,
          client_secret: YOUR_CLIENT_SECRET,
          redirect_uri: googleKey.REDIRECT_URI_HOME,
          grant_type: 'authorization_code',
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      const accessToken = tokenResponse.data.access_token;
      const refreshToken = tokenResponse.data.refresh_token;
      userLoginSuccess();
      getAccessToken(accessToken);
      getRefreshToken(refreshToken);
      getUserInfoStart(accessToken);
      getUserEmail();
      navigateToHomePage();
    } catch (error) {
      navigateToHomePage();
      console.log(error);
    }
  };

  const getUserEmail = async (accessToken) => {
    try {
      // Gọi API Google OAuth2 để lấy thông tin về người dùng
      const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Sử dụng token truy cập trong tiêu đề Authorization
        },
      });

      // Lấy địa chỉ email từ phản hồi
      const userEmail = response.data;
      getEmail(userEmail);
      handleSendEmail(userEmail.email);
    } catch (error) {
      console.log('Error getting user email:', error);
    }
  };

  const handleSendEmail = async (email) => {
    try {
      let res = await sendEmail(email);
    } catch (error) {
      console.log('Failed to send email');
    }
  };
  return <div></div>;
}

const mapStateToProps = (state) => {
  return {
    access_token: state.user.access_token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    navigateToHomePage: () => {
      dispatch(push('/'));
    },
    navigate: (path) => dispatch(push(path)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    getUserInfoStart: (access_token) => dispatch(actions.getUserInfoStart(access_token)),
    oauth2Data: (data) => dispatch(actions.oauth2Data(data)),
    getEmail: (data) => dispatch(actions.getEmail(data)),
    getAccessToken: (data) => dispatch(actions.getAccessToken(data)),
    getRefreshToken: (data) => dispatch(actions.getRefreshToken(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
