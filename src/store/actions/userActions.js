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
          type: actionTypes.FETCH_USER_FAIL,
          data: 'Error: Failed to fetch user info',
        });
      }
    } catch (error) {
      // if (error.response.status === 401) {
      //   // Xử lý lỗi "Unauthorized"
      //   const newAccessToken = await refreshGoogleToken(currentState.user.refresh_token);
      //   dispatch(getAccessToken(newAccessToken));
      //   return getUserInfoStart(newAccessToken)(dispatch, getState);
      // } else {
      //   console.error('Error making authenticated request:', error);
      // }
      dispatch({
        type: actionTypes.FETCH_USER_FAIL,
        data: error.message,
      });
      console.log(error);
    }
  };
};

export const getAccessToken = (accessToken) => ({
  type: actionTypes.GET_ACCESS_TOKEN,
  accessToken,
});

export const userLoginSuccess = () => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
});

export const getRefreshToken = (refreshToken) => ({
  type: actionTypes.GET_REFRESH_TOKEN,
  refreshToken,
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

export const getEmail = (data) => ({
  type: actionTypes.GET_EMAIL,
  data,
});

export const getGoogleUserInfo = (data) => ({
  type: actionTypes.GET_GOOGLE_USER_INFO,
  data,
});
