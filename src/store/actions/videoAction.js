import actionTypes from './actionTypes';

import { fetchApi, getVideos } from '~/services/videoService';
import { googleKey } from '~/utils';

export const getVideoStart = (maxResults) => {
  return async (dispatch, getState) => {
    try {
      let res = await getVideos(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&order=rating`,
        googleKey.API_KEY,
      );
      if (res && res.data && res.data.items) {
        const { videoIds, channelIds } = extractIdsFromItems(res.data.items);
        if (videoIds.length > 0 && channelIds.length > 0) {
          const [channelsResponse, videosResponse] = await fetchChannelsAndVideos(videoIds, channelIds);
          const newVideos = handleResponses(channelsResponse, videosResponse);
          dispatch(getVideoSuccess(newVideos));
        }
      } else {
        dispatch(getVideoFalse(res.data.error.message));
      }
    } catch (e) {
      dispatch(getVideoFalse(e.message));
      console.log(e);
    }
  };
};
export const getVideoSuccess = (videos) => ({
  type: actionTypes.GET_VIDEO_SUCCESS,
  videos,
});
export const getVideoFalse = (err) => ({
  type: actionTypes.GET_VIDEO_FALSE,
  err,
});

export const searchVideoStart = (searchText, maxResult) => {
  return async (dispatch, getState) => {
    try {
      let res = await getVideos(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResult}&q=${searchText}`,
        googleKey.API_KEY,
      );
      if (res && res.data && res.data.items) {
        const { videoIds, channelIds } = extractIdsFromItems(res.data.items);
        if (videoIds.length > 0 && channelIds.length > 0) {
          const [channelsResponse, videosResponse] = await fetchChannelsAndVideos(videoIds, channelIds);
          const newVideos = handleResponses(channelsResponse, videosResponse);
          dispatch(searchVideoSuccess(newVideos));
        }
      } else {
        dispatch(searchVideoFalse(res.data.error.message));
      }
    } catch (e) {
      dispatch(searchVideoFalse(e.message));
      console.log(e);
    }
  };
};
export const searchVideoSuccess = (videos) => ({
  type: actionTypes.SEARCH_VIDEO_SUCCESS,
  videos,
});
export const searchVideoFalse = (err) => ({
  type: actionTypes.SEARCH_VIDEO_FALSE,
  err,
});

export const shortVideoStart = (maxResult) => {
  return async (dispatch, getState) => {
    try {
      let res = await getVideos(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResult}&type=video&videoDuration=short`,
        googleKey.API_KEY,
      );
      if (res && res.data && res.data.items) {
        const { videoIds, channelIds } = extractIdsFromItems(res.data.items);

        if (videoIds.length > 0 && channelIds.length > 0) {
          const [channeslResponse, videosResponse] = await fetchChannelsAndVideos(videoIds, channelIds);
          const newVideos = handleResponses(channeslResponse, videosResponse);
          dispatch(shortVideoSuccess(newVideos));
        }
      } else {
        dispatch(shortVideoFalse(res.data.error.message));
      }
    } catch (e) {
      dispatch(searchVideoFalse(e.message));
      console.log(e);
    }
  };
};
export const shortVideoSuccess = (videos) => ({
  type: actionTypes.SHORT_VIDEO_SUCCESS,
  videos,
});
export const shortVideoFalse = (err) => ({
  type: actionTypes.SHORT_VIDEO_FALSE,
  err,
});

// function
const extractIdsFromItems = (items) => {
  let videoIds = [];
  let channelIds = [];
  items.forEach((item) => {
    videoIds.push(item.id.videoId);
    channelIds.push(item.snippet.channelId);
  });
  return { videoIds, channelIds };
};

const fetchChannelsAndVideos = async (videoIds, channelIds) => {
  let channelIdStr = channelIds.join(',');
  let videoIdStr = videoIds.join(',');
  const channelsResponse = getVideos(
    `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelIdStr}`,
    googleKey.API_KEY,
  );

  const videosResponse = getVideos(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoIdStr}`,
    googleKey.API_KEY,
  );

  return Promise.all([channelsResponse, videosResponse]);
};

const handleResponses = (channelsResponse, videosResponse) => {
  if (videosResponse.data && channelsResponse.data) {
    let videoArr = videosResponse.data.items;
    let channelArr = channelsResponse.data.items;

    const newVideos = videoArr.map((item, index) => {
      const channel = channelArr.find((i) => item.snippet.channelId === i.id);
      if (channel) {
        return {
          ...item,
          avatar: channel.snippet?.thumbnails?.default?.url || null,
          customUrl: channel.snippet?.customUrl || null,
        };
      }
      return item;
    });
    return newVideos;
  }
};

export const setIsSpinner = (boolean) => ({
  type: actionTypes.IS_SPINNER,
  boolean,
});

export const setIsLoadingBar = (boolean) => ({
  type: actionTypes.IS_LOADING_BAR,
  boolean,
});
