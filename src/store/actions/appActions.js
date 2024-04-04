import actionTypes from './actionTypes';

export const appStartUpComplete = () => ({
  type: actionTypes.APP_START_UP_COMPLETE,
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
  type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
  contentOfConfirmModal: contentOfConfirmModal,
});

export const changeLanguageApp = (languageInput) => ({
  type: actionTypes.CHANGE_LANGUAGE,
  language: languageInput,
});

export const changeSideBarMini = (isShow) => ({
  type: actionTypes.CHANGE_SIDEBAR_MINI,
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
