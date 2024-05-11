import actionTypes from '../actions/actionTypes';

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  access_token: null,
  refresh_token: null,
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
    case actionTypes.SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.boolean,
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
        userInfo: null,
        access_token: null,
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
