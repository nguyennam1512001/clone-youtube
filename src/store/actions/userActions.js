import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});

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

export const changeSideBarMini = (isShow) => ({
  type: actionTypes.CHANGE_SIDEBAR_LG,
  isShow,
});

export const changeSideBarModal = (isShow) => ({
  type: actionTypes.CHANGE_SIDEBAR_MODAL,
  isShow,
});

export const hidenSidebarMini = (isShow) => ({
  type: actionTypes.HIDEN_SIBAR_MINI,
  isShow,
});
