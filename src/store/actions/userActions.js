import refreshGoogleToken from '~/utils/refreshGoogleToken';
import actionTypes from './actionTypes';
import { getApi } from '~/services';

export const getUserInfoStart = (access_token) => {
  return async (dispatch, getState) => {
    const currentState = getState();
    try {
      let res = await getApi(
        'https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&mine=true',
        null,
        access_token,
      );
      if (res && res.data) {
        dispatch({ type: actionTypes.FETCH_USER_SUCCESS, data: res.data });
      } else {
        dispatch({
          type: actionTypes.FETCH_USER_SUCCESS,
          data: null,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_USER_SUCCESS,
        data: null,
      });
      console.log(error);
    }
  };
};

export const getAccessToken = (accessToken) => ({
  type: actionTypes.GET_ACCESS_TOKEN,
  accessToken,
});

export const setLoggedIn = (boolean) => ({
  type: actionTypes.SET_LOGGED_IN,
  boolean,
});

export const getRefreshToken = (refreshToken) => ({
  type: actionTypes.GET_REFRESH_TOKEN,
  refreshToken,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

export const getGoogleUserInfo = (data) => ({
  type: actionTypes.GET_GOOGLE_USER_INFO,
  data,
});
