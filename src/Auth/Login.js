import React, { useEffect, useState } from 'react';
import { push } from 'connected-react-router';
import { auth } from '~/fireBase/FireBase';
import { GoogleAuthProvider, signInWithCredential, signInWithPopup } from 'firebase/auth';
import { connect } from 'react-redux';
import * as actions from '~/store/actions';
import { sendEmail } from '~/services/userSevice';

const Login = ({ navigate, setLoggedIn, getUserInfoStart, getAccessToken, getGoogleUserInfo }) => {
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl');

  useEffect(() => {
    handleGoogleAuth();
  }, []);

  const handleGoogleAuth = async () => {
    try {
      signInWithPopup(auth, provider).then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);

        const accessToken = credential.accessToken;
        console.log(result);
        const userInfo = {
          displayName: result._tokenResponse.displayName,
          email: result._tokenResponse.email,
          photoUrl: result._tokenResponse.photoUrl,
        };
        handleSendEmail(result._tokenResponse.email);
        getGoogleUserInfo(userInfo);
        setLoggedIn(true);
        getUserInfoStart(accessToken);
        getAccessToken(accessToken);
        navigate('/');
      });
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        // Handle popup closed by user
        console.log('User closed the sign-in popup.');
      } else {
        // Handle other authentication errors
        console.error('Firebase Authentication Error:', error);
        setLoggedIn(false);
        navigate('/');
      }
    }
  };

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
    setLoggedIn: (boolean) => dispatch(actions.setLoggedIn(boolean)),
    getUserInfoStart: (access_token) => dispatch(actions.getUserInfoStart(access_token)),
    getAccessToken: (data) => dispatch(actions.getAccessToken(data)),
    getRefreshToken: (data) => dispatch(actions.getRefreshToken(data)),
    getGoogleUserInfo: (data) => dispatch(actions.getGoogleUserInfo(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
