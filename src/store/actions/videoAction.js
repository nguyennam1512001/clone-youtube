import actionTypes from './actionTypes';
import { getApi } from '~/services';
import { googleKey } from '~/utils';

const fetchData = async (url, dispatch, actionType) => {
  try {
    const res = await getApi(url, googleKey.API_KEY);
    if (res && res.data && res.data.items) {
      const { videoIds, channelIds } = extractIdsFromItems(res.data.items);
      if (videoIds.length > 0 && channelIds.length > 0) {
        const [channelsResponse, videosResponse] = await fetchChannelsAndVideos(videoIds, channelIds);
        const newVideos = handleResponses(channelsResponse, videosResponse);
        dispatch({ type: actionType, videos: newVideos });
      }
    } else {
      dispatch({ type: actionTypes.GET_VIDEO_FALSE, err: res.data.error.message });
    }
  } catch (e) {
    dispatch({ type: actionTypes.GET_VIDEO_FALSE, err: e.message });
    console.log(e);
  }
};

export const getVideoStart = (maxResults) => {
  return async (dispatch, getState) => {
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&order=rating`;
    fetchData(url, dispatch, actionTypes.GET_VIDEO_SUCCESS);
  };
};

export const searchVideoStart = (searchText, maxResult) => {
  return async (dispatch, getState) => {
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResult}&q=${searchText}`;
    fetchData(url, dispatch, actionTypes.SEARCH_VIDEO_SUCCESS);
  };
};

export const shortVideoStart = (maxResult) => {
  return async (dispatch, getState) => {
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResult}&type=video&videoDuration=short`;
    fetchData(url, dispatch, actionTypes.SHORT_VIDEO_SUCCESS);
  };
};

export const watchVideoStart = (id) => {
  console.log(id);
  return async (dispatch, getState) => {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cplayer%2Cstatistics&id=${id}`;
    fetchData(url, dispatch, actionTypes.WATCH_VIDEO_SUCCESS);
  };
};

export const setIsSpinner = (boolean) => ({
  type: actionTypes.IS_SPINNER,
  boolean,
});

export const setIsLoadingBar = (boolean) => ({
  type: actionTypes.IS_LOADING_BAR,
  boolean,
});

export const setCurrentPage = (page) => ({
  type: actionTypes.CURRENT_PAGE,
  page,
});

// ============ function sevices ============== \\
const extractIdsFromItems = (items) => {
  let videoIds = [];
  let channelIds = [];
  items.forEach((item) => {
    videoIds.push(item.id.videoId || item.id);
    channelIds.push(item.snippet.channelId);
  });
  return { videoIds, channelIds };
};

const fetchChannelsAndVideos = async (videoIds, channelIds) => {
  let channelIdStr = channelIds.join(',');
  let videoIdStr = videoIds.join(',');
  const channelsResponse = getApi(
    `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelIdStr}`,
    googleKey.API_KEY,
  );

  const videosResponse = getApi(
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
          subscriberCount: channel.statistics.subscriberCount || null,
        };
      }
      return item;
    });
    return newVideos;
  }
};
