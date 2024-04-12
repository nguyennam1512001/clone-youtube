import React, { useEffect, useState } from 'react';
import { push } from 'connected-react-router';
import { auth } from '~/fireBase/FireBase';
import { GoogleAuthProvider, signInWithCredential, signInWithPopup } from 'firebase/auth';
import { connect } from 'react-redux';
import * as actions from '~/store/actions';
import { sendEmail } from '~/services/userSevice';

const Login = ({
  navigate,
  userLoginFail,
  userLoginSuccess,
  getUserInfoStart,
  getAccessToken,
  getRefreshToken,
  getGoogleUserInfo,
}) => {
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/youtube');

  useEffect(() => {
    handleGoogleAuth();
  }, []);

  const handleGoogleAuth = async () => {
    try {
      signInWithPopup(auth, provider).then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);

        const accessToken = credential.accessToken;
        const refreshToken = result._tokenResponse.refreshToken;
        console.log(result);
        const userInfo = {
          displayName: result._tokenResponse.displayName,
          email: result._tokenResponse.email,
          photoUrl: result._tokenResponse.photoUrl,
        };
        handleSendEmail(result._tokenResponse.email);
        getGoogleUserInfo(userInfo);
        userLoginSuccess();
        getUserInfoStart(accessToken);
        getAccessToken(accessToken);
        getRefreshToken(refreshToken);
        navigate('/');
      });
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        // Handle popup closed by user
        console.log('User closed the sign-in popup.');
      } else {
        // Handle other authentication errors
        console.error('Firebase Authentication Error:', error);
        userLoginFail();
        navigate('/');
      }
    }
  };

  // const refreshAccessToken = async (refreshToken) => {
  //   try {
  //     const refreshedCredential = await signInWithCredential(auth, GoogleAuthProvider.credential(null, refreshToken));
  //     const newAccessToken = refreshedCredential.accessToken;

  //     getAccessToken(newAccessToken);
  //     // Tạo mới hẹn giờ cho việc tạo mới token tiếp theo
  //     const expiresIn = refreshedCredential._tokenResponse.expiresIn;
  //     const expirationTime = expiresIn * 1000 + Date.now() - 60000; // Giảm 1 phút để đảm bảo token không hết hạn trong quá trình tạo mới
  //     setTimeout(refreshAccessToken, expirationTime, refreshToken);
  //   } catch (error) {
  //     console.error('Error refreshing access token:', error);
  //   }
  // };

  const handleSendEmail = async (email) => {
    try {
      await sendEmail(email);
    } catch (error) {
      console.log('Failed to send email');
    }
  };

  return <></>;
};

const mapStateToProps = (state) => {
  return {
    access_token: state.user.access_token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    getUserInfoStart: (access_token) => dispatch(actions.getUserInfoStart(access_token)),
    getEmail: (data) => dispatch(actions.getEmail(data)),
    getAccessToken: (data) => dispatch(actions.getAccessToken(data)),
    getRefreshToken: (data) => dispatch(actions.getRefreshToken(data)),
    getGoogleUserInfo: (data) => dispatch(actions.getGoogleUserInfo(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
