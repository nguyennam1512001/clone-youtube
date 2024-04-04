import actionTypes from '../actions/actionTypes';

const initialState = {
  videosInfo: [],
  videosSearch: [],
  videosShort: [],
  isSpinner: false,
  isLoadingBar: false,
  currentPage: null,
  videoWatch: [],
  err: '',
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_VIDEO_SUCCESS:
      return {
        ...state,
        videosInfo: action.videos,
      };
    case actionTypes.GET_VIDEO_FALSE:
      return {
        ...state,
        err: action.err,
      };

    case actionTypes.SEARCH_VIDEO_SUCCESS:
      return {
        ...state,
        videosSearch: action.videos,
      };
    case actionTypes.SEARCH_VIDEO_FALSE:
      return {
        ...state,
        err: action.err,
      };
    case actionTypes.SHORT_VIDEO_SUCCESS:
      return {
        ...state,
        videosShort: action.videos,
      };
    case actionTypes.SHORT_VIDEO_FALSE:
      return {
        ...state,
        videosShort: [],
        err: action.err,
      };
    case actionTypes.WATCH_VIDEO_SUCCESS:
      return {
        ...state,
        videoWatch: action.videos,
      };
    case actionTypes.WATCH_VIDEO_FALSE:
      return {
        ...state,
        videoWatch: [],
        err: action.err,
      };
    // =======
    case actionTypes.IS_SPINNER:
      return {
        ...state,
        isSpinner: action.boolean,
      };
    case actionTypes.IS_LOADING_BAR:
      return {
        ...state,
        isLoadingBar: action.boolean,
      };
    case actionTypes.CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page,
      };
    default:
      return state;
  }
};

export default videoReducer;
