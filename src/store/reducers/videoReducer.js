import actionTypes from '../actions/actionTypes';

const initialState = {
  videosInfo: [],
  videosSearch: [],
  videosShort: [],
  isSpinner: false,
  isLoadingBar: false,
  currentPage: null,
  videoWatch: [],
  videoRelated: [],
  videoChannel: [],
  rate: null,
  subscriptions: [],
  isSubscribed: [],
  message: '',
  commentThreads: [],
  resPostCmt: [],
  resPostCmtRep: [],
  cmtDeleted: [],
  videoPost: [],
  myVideo: [],
  isUploadingVideo: false,
  isUploadModal: false,
  firstShortVideo: null,
  playListPublic: null,
  playListPrivate: null,
  videoTrending: null,
  myChannelInfo: {
    id: '',
    thumbnails: '',
    title: '',
    customUrl: '',
    subscriberCount: '',
  },
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CHANNEL_INFO:
      return {
        ...state,
        myChannelInfo: action.data,
      };
    case actionTypes.GET_VIDEO_SUCCESS:
      return {
        ...state,
        videosInfo: action.videos,
      };
    case actionTypes.GET_VIDEO_FALSE:
      return {
        ...state,
        err: action.err,
        videoPost: [],
      };

    case actionTypes.SEARCH_VIDEO_SUCCESS:
      return {
        ...state,
        videosSearch: action.videos,
      };
    case actionTypes.SHORT_VIDEO_SUCCESS:
      return {
        ...state,
        videosShort: action.videos,
      };
    case actionTypes.SET_FIRST_SHORT_VIDEO:
      return {
        ...state,
        firstShortVideo: action.video,
      };
    case actionTypes.WATCH_VIDEO_SUCCESS:
      return {
        ...state,
        videoWatch: action.videos,
      };
    case actionTypes.VIDEO_RELATED:
      return {
        ...state,
        videoRelated: action.videos,
      };
    case actionTypes.GET_MY_VIDEO:
      return {
        ...state,
        myVideo: action.videos,
      };
    case actionTypes.GET_CHANNEL_VIDEO:
      return {
        ...state,
        videoChannel: action.videos,
      };
    case actionTypes.GET_RATE:
      return {
        ...state,
        rate: action.data,
      };
    case actionTypes.SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.data,
      };
    case actionTypes.IS_CHANNEL_SUBSCRIBED:
      return {
        ...state,
        isSubscribed: action.data,
      };
    case actionTypes.IS_SUBSCRIBED:
      return {
        ...state,
        message: action.data,
      };
    case actionTypes.GET_COMMENT_THREADS:
      return {
        ...state,
        commentThreads: action.data,
        resPostCmt: [],
        resPostCmtRep: [],
        cmtDeleted: [],
      };
    case actionTypes.POST_COMMENT:
      return {
        ...state,
        message: action.data.message,
        resPostCmt: action.data && action.data.data ? [...state.resPostCmt, action.data.data] : state.resPostCmt,
        resPostCmtRep: action.data.dataRep ? [...state.resPostCmtRep, action.data.dataRep] : state.resPostCmtRep,
      };
    case actionTypes.DELETE_COMMENT:
      return {
        ...state,
        message: action.data.message,
        cmtDeleted: action.data.cmtId ? [...state.cmtDeleted, action.data.cmtId] : state.cmtDeleted,
      };
    case actionTypes.POST_VIDEO:
      return {
        ...state,
        message: action.data.message,
        videoPost: action.data.video,
      };
    case actionTypes.DELETE_VIDEO:
      return {
        ...state,
        message: action.message,
      };
    case actionTypes.UPDATE_VIDEO:
      return {
        ...state,
        message: action.message,
      };
    // play list
    case actionTypes.GET_PLAYLIST_PUBLIC:
      return {
        ...state,
        playListPublic: action.data,
      };
    case actionTypes.GET_PLAYLIST_PRIVATE:
      return {
        ...state,
        playListPrivate: action.data,
      };
    // trending
    case actionTypes.GET_TRENDING:
      return {
        ...state,
        videoTrending: action.data,
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
    case actionTypes.RESET_MESSAGE:
      return {
        ...state,
        message: '',
      };
    case actionTypes.SET_UPLOADING_VIDEO:
      return {
        ...state,
        isUploadingVideo: action.boolean,
      };
    case actionTypes.SET_UPLOAD_MODAL:
      return {
        ...state,
        isUploadModal: action.boolean,
      };
    default:
      return state;
  }
};

export default videoReducer;
