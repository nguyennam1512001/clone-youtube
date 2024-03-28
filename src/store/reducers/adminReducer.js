import actionTypes from '../actions/actionTypes';

const initialState = {
  userInfor: [],
  channelInfor: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        userInfor: action.data,
      };
    case actionTypes.FETCH_USER_FAIL:
      return {
        ...state,
        userInfor: [],
      };
    case actionTypes.FETCH_CHANEL_SUCCESS:
      return {
        ...state,
        channelInfor: action.data,
      };
    case actionTypes.FETCH_CHANNEL_FAIL:
      return {
        ...state,
        channelInfor: [],
      };
    default:
      return state;
  }
};

export default adminReducer;
