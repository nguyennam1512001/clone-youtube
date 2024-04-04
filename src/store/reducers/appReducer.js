import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
  isOpen: false,
  messageId: '',
  handleFunc: null,
  dataFunc: null,
};

const initialState = {
  started: true,
  language: 'vi',
  systemMenuPath: '/system/user-manage',
  is_sidebar_mini: false,
  is_sidebar_modal: true,
  isHidenSibarMini: true,
  contentOfConfirmModal: {
    ...initContentOfConfirmModal,
  },
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SIDEBAR_MINI:
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
    case actionTypes.APP_START_UP_COMPLETE:
      return {
        ...state,
        started: true,
      };
    case actionTypes.SET_CONTENT_OF_CONFIRM_MODAL:
      return {
        ...state,
        contentOfConfirmModal: {
          ...state.contentOfConfirmModal,
          ...action.contentOfConfirmModal,
        },
      };
    case actionTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };

    default:
      return state;
  }
};

export default appReducer;
