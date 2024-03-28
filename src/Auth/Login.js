import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '~/store/actions';
import { googleKey } from '~/utils';

const YOUR_CLIENT_ID = googleKey.CLIENT_ID;
const YOUR_REDIRECT_URI = googleKey.REDIRECT_URI_LOGIN;

function Login({ navigateToHomePage, userLoginSuccess, access_token, fetchUserStart, oauth2Data }) {
  useEffect(() => {
    const fragmentString = window.location.hash.substring(1);
    const params = {};
    const regex = /([^&=]+)=([^&]*)/g;
    let m;

    while ((m = regex.exec(fragmentString))) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    if (Object.keys(params).length > 0) {
      oauth2Data(params);
      userLoginSuccess(params['access_token']);
      if (params['state'] && params['state'] === 'oauth2_signIn') {
        fetchUserStart(params['access_token']);
        navigateToHomePage();
      }
    } else {
      oauth2SignIn();
    }
  }, [access_token, navigateToHomePage, userLoginSuccess]);

  const oauth2SignIn = () => {
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    const params = {
      client_id: YOUR_CLIENT_ID,
      redirect_uri: YOUR_REDIRECT_URI,
      scope: 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube',
      state: 'oauth2_signIn',
      include_granted_scopes: 'true',
      response_type: 'token',
    };

    const queryString = Object.keys(params)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
      .join('&');

    window.location.href = `${oauth2Endpoint}?${queryString}`;
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
    fetchUserStart: (access_token) => dispatch(actions.fetchUserStart(access_token)),
    oauth2Data: (data) => dispatch(actions.oauth2Data(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
