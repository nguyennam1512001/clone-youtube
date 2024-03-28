import actionTypes from '../actions/actionTypes';

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  access_token: null,
  oauth2Data: null,
  is_sidebar_mini: false,
  is_sidebar_modal: true,
  isHidenSibarMini: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        access_token: action.access_token,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        access_token: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        oauth2Data: null,
        access_token: null,
        userInfo: null,
      };
    case actionTypes.OAUTH2_DATA:
      return {
        ...state,
        oauth2Data: action.oauth2Data,
      };
    case actionTypes.CHANGE_SIDEBAR_LG:
      return {
        ...state,
        is_sidebar_mini: action.isShow,
      };
    case actionTypes.CHANGE_SIDEBAR_MODAL:
      return {
        ...state,
        is_sidebar_modal: action.isShow,
      };
    case actionTypes.HIDEN_SIBAR_MINI:
      return {
        ...state,
        isHidenSibarMini: action.isShow,
      };
    default:
      return state;
  }
};

export default userReducer;
