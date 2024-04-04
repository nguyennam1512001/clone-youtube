import actionTypes from './actionTypes';
import { getApi } from '~/services';

export const getUserInfoStart = (access_token) => {
  return async (dispatch, getState) => {
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
          type: actionTypes.FETCH_USER_FAIL,
          data: 'Error: Failed to fetch user info',
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_USER_FAIL,
        data: e.message,
      });
      console.log(e);
    }
  };
};

export const userLoginSuccess = (access_token) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  access_token,
});

export const userLoginFail = () => ({
  type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

export const oauth2Data = (oauth2Data) => ({
  type: actionTypes.OAUTH2_DATA,
  oauth2Data,
});
