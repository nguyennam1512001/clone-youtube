import actionTypes from '../actions/actionTypes';

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  access_token: null,
  refresh_token: null,
  oauth2Data: null,
  email: null,
  googleUserInfo: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.data,
      };
    case actionTypes.FETCH_USER_FAIL:
      return {
        ...state,
        userInfo: [],
      };
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        access_token: null,
      };
    case actionTypes.GET_ACCESS_TOKEN:
      return {
        ...state,
        access_token: action.accessToken,
      };
    case actionTypes.GET_REFRESH_TOKEN:
      return {
        ...state,
        refresh_token: action.refreshToken,
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
    case actionTypes.GET_GOOGLE_USER_INFO:
      return {
        ...state,
        googleUserInfo: action.data,
      };
    default:
      return state;
  }
};

export default userReducer;
