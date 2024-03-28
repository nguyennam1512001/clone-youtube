import actionTypes from './actionTypes';
import { getUserInfoSevice, getChannelInfoSevice } from '~/services/userSevice';
import { googleKey } from '~/utils';

export const fetchUserStart = (access_token) => {
  return async (dispatch, getState) => {
    try {
      let res = await getUserInfoSevice(access_token);
      if (res && res.data) {
        dispatch(fetchUserSuccess(res.data));
      } else {
        dispatch(fetchUserFail(res.errMessage));
      }
    } catch (e) {
      dispatch(fetchUserFail(e.message));
      console.log(e);
    }
  };
};
export const fetchUserSuccess = (data) => ({
  type: actionTypes.FETCH_USER_SUCCESS,
  data: data,
});
export const fetchUserFail = (errMessage) => ({
  type: actionTypes.FETCH_USER_FAIL,
  data: errMessage,
});

export const getChannelStart = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getChannelInfoSevice(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`,
        googleKey.API_KEY,
      );
      if (res && res.data) {
        dispatch(fetchChannelSuccess(res.data));
      } else {
        dispatch(fetchChannelFail(res.errMessage));
      }
    } catch (e) {
      dispatch(fetchChannelFail(e.message));
      console.log(e);
    }
  };
};
export const fetchChannelSuccess = (data) => ({
  type: actionTypes.FETCH_CHANEL_SUCCESS,
  data: data,
});
export const fetchChannelFail = (errMessage) => ({
  type: actionTypes.FETCH_CHANNEL_FAIL,
  data: errMessage,
});
