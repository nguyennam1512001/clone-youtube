import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from './appReducer';
import userReducer from './userReducer';
import adminReducer from './adminReducer';
import videoReducer from './videoReducer';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
  ...persistCommonConfig,
  key: 'user',
  whitelist: ['isLoggedIn', 'access_token', 'userInfo', 'refresh_token', 'googleUserInfo'],
};

const appPersistConfig = {
  ...persistCommonConfig,
  key: 'app',
  whitelist: ['language'],
  // 'is_sidebar_mini', 'is_sidebar_modal', 'isHidenSibarMini'
};

const adminPersistConfig = {
  ...persistCommonConfig,
  key: 'admin',
  whitelist: [],
};

const videoPersistConfig = {
  ...persistCommonConfig,
  key: 'video',
  whitelist: ['videosInfo', 'videosShort', 'videosSearch', 'videoWatch'],
};
export default (history) =>
  combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersistConfig, appReducer),
    admin: persistReducer(adminPersistConfig, adminReducer),
    video: persistReducer(videoPersistConfig, videoReducer),
  });
