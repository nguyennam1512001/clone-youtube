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
  whitelist: ['isLoggedIn', 'access_token', 'oauth2Data', 'is_sidebar_mini'],
};

const appPersistConfig = {
  ...persistCommonConfig,
  key: 'app',
  whitelist: ['language'],
};

const adminPersistConfig = {
  ...persistCommonConfig,
  key: 'admin',
  whitelist: ['userInfor', 'channelInfor'],
};

const videoPersistConfig = {
  ...persistCommonConfig,
  key: 'video',
  whitelist: ['videosInfo', 'videosShort', 'videosSearch'],
};
export default (history) =>
  combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersistConfig, appReducer),
    admin: persistReducer(adminPersistConfig, adminReducer),
    video: persistReducer(videoPersistConfig, videoReducer),
  });
