import actionTypes from '../actions/actionTypes';

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  access_token: null,
  oauth2Data: null,
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
    default:
      return state;
  }
};

export default userReducer;
