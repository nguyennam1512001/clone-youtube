import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '~/store/actions';
import { googleKey } from '~/utils';

const YOUR_CLIENT_ID = googleKey.CLIENT_ID;
const YOUR_REDIRECT_URI = googleKey.REDIRECT_URI;

function Login({ access_token }) {
  useEffect(() => {
    const fragmentString = window.location.hash.substring(1);
    const params = {};
    const regex = /([^&=]+)=([^&]*)/g;
    let m;

    while ((m = regex.exec(fragmentString))) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    if (Object.keys(params).length > 0) {
      localStorage.setItem('oauth2-test-params', JSON.stringify(params));
      if (params['state'] && params['state'] === 'try_sample_request') {
        getUserInfo();
      }
    }
  }, []);

  const getUserInfo = () => {
    const params = JSON.parse(localStorage.getItem('oauth2-test-params'));
    if (params && params['access_token']) {
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true&access_token=${params['access_token']}`,
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            oauth2SignIn();
          }
        });
    } else {
      oauth2SignIn();
    }
  };

  const oauth2SignIn = () => {
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    const params = {
      client_id: YOUR_CLIENT_ID,
      redirect_uri: YOUR_REDIRECT_URI,
      scope:
        'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl',
      state: 'try_sample_request',
      include_granted_scopes: 'true',
      response_type: 'token',
    };

    const queryString = Object.keys(params)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
      .join('&');

    window.location.href = `${oauth2Endpoint}?${queryString}`;
  };

  return (
    <div>
      <button onClick={getUserInfo}>Try sample request</button>
    </div>
  );
}

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
  };
};

export default connect(null, mapDispatchToProps)(Login);
