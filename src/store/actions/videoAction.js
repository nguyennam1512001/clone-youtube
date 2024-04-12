import actionTypes from './actionTypes';
import { getApi, postApi, deleteApi } from '~/services';
import { googleKey } from '~/utils';
import { subscribeToChannel } from '~/services/videoService';
import refreshGoogleToken from '~/utils/refreshGoogleToken';
import { getAccessToken } from './userActions';

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

export const getRate = (videoId, access_token) => {
  return async (dispatch, getState) => {
    const currentState = getState();
    try {
      let res = await getApi(
        `https://youtube.googleapis.com/youtube/v3/videos/getRating?id=${videoId}`,
        null,
        access_token,
      );
      if (res && res.data) {
        dispatch({ type: actionTypes.GET_RATE, data: res.data });
      } else {
        dispatch({
          type: actionTypes.GET_RATE,
          data: 'Error: Failed to fetch user info',
        });
      }
    } catch (error) {
      // if (error.response.status === 401) {
      //   // Xử lý lỗi "Unauthorized"
      //   const newAccessToken = await refreshGoogleToken(currentState.user.refresh_token);
      //   dispatch(getAccessToken(newAccessToken));
      //   return getRate(videoId, newAccessToken)(dispatch, getState);
      // } else {
      //   console.error('Error making authenticated request:', error);
      // }
      dispatch({
        type: actionTypes.GET_RATE,
        data: error.message,
      });
      console.log(error);
    }
  };
};

export const postRate = (videoId, rating, access_token) => {
  return async (dispatch, getState) => {
    const currentState = getState();
    try {
      let res = await postApi(
        `https://youtube.googleapis.com/youtube/v3/videos/rate?id=${videoId}&rating=${rating}`,
        access_token,
      );
      if (res && res.data) {
        dispatch({ type: actionTypes.POST_RATE, data: res.data });
      } else {
        dispatch({
          type: actionTypes.POST_RATE,
          data: 'Error: Failed to fetch user info',
        });
      }
    } catch (error) {
      // if (error.response.status === 401) {
      //   // Xử lý lỗi "Unauthorized"
      //   const newAccessToken = await refreshGoogleToken(currentState.user.refresh_token, dispatch);
      //   return postRate(videoId, rating, newAccessToken)(dispatch, getState);
      // } else {
      //   console.error('Error making authenticated request:', error);
      // }
      dispatch({
        type: actionTypes.POST_RATE,
        data: error.message,
      });
      console.log(error);
    }
  };
};

export const getSubscriptions = (maxResult, access_token) => {
  return async (dispatch, getState) => {
    const currentState = getState();
    try {
      let res = await postApi(
        `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails%2CsubscriberSnippet&mine=true&maxResults=${maxResult}`,
        access_token,
      );
      if (res && res.data) {
        dispatch({ type: actionTypes.SUBSCRIPTIONS, data: res.data });
      } else {
        dispatch({
          type: actionTypes.SUBSCRIPTIONS,
          data: 'Error: Failed to fetch user info',
        });
      }
    } catch (error) {
      // if (error.response.status === 401) {
      //   // Xử lý lỗi "Unauthorized"
      //   const newAccessToken = await refreshGoogleToken(currentState.user.refresh_token, dispatch);

      //   return getSubscriptions(maxResult, newAccessToken)(dispatch, getState);
      // } else {
      //   console.error('Error making authenticated request:', error);
      // }
      dispatch({
        type: actionTypes.SUBSCRIPTIONS,
        data: error.message,
      });
      console.log(error);
    }
  };
};

export const checkChannelSubscribed = (channelId, access_token) => {
  return async (dispatch, getState) => {
    const currentState = getState();
    try {
      let res = await getApi(
        `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&forChannelId=${channelId}&mine=true`,
        null,
        access_token,
      );
      if (res && res.data) {
        dispatch({ type: actionTypes.IS_CHANNEL_SUBSCRIBED, data: res.data });
      } else {
        dispatch({
          type: actionTypes.IS_CHANNEL_SUBSCRIBED,
          data: null,
        });
      }
    } catch (error) {
      // if (error.response.status === 401) {
      //   // Xử lý lỗi "Unauthorized"
      //   const newAccessToken = await refreshGoogleToken(currentState.user.refresh_token, dispatch);
      //   return checkChannelSubscribed(channelId, newAccessToken)(dispatch, getState);
      // } else {
      //   console.error('Error making authenticated request:', error);
      // }
      dispatch({
        type: actionTypes.IS_CHANNEL_SUBSCRIBED,
        data: null,
      });
      console.log(error);
    }
  };
};

export const subscribeChannel = (channelId, access_token) => {
  return async (dispatch, getState) => {
    const currentState = getState();
    try {
      let res = await subscribeToChannel(channelId, access_token);
      if (res) {
        dispatch({ type: actionTypes.IS_SUBSCRIBED, data: 'Đăng kí kênh thành công' });
      } else {
        dispatch({
          type: actionTypes.IS_SUBSCRIBED,
          data: 'Đăng kí kênh thất bại',
        });
      }
    } catch (error) {
      // if (error.response.status === 401) {
      //   // Xử lý lỗi "Unauthorized"
      //   const newAccessToken = await refreshGoogleToken(currentState.user.refresh_token, dispatch);

      //   return subscribeChannel(channelId, newAccessToken)(dispatch, getState);
      // } else {
      //   console.error('Error making authenticated request:', error);
      // }
      dispatch({
        type: actionTypes.IS_SUBSCRIBED,
        data: 'Đăng kí kênh thất bại',
      });
      console.log(error);
    }
  };
};

export const unSubscribeChannel = (channelId, access_token) => {
  return async (dispatch, getState) => {
    const currentState = getState();
    try {
      let res = await deleteApi(
        `https://youtube.googleapis.com/youtube/v3/subscriptions?id=${channelId}`,
        access_token,
      );
      if (res) {
        dispatch({ type: actionTypes.IS_SUBSCRIBED, data: 'Đã huỷ đăng kí' });
      } else {
        dispatch({
          type: actionTypes.IS_SUBSCRIBED,
          data: 'Huỷ đăng kí thất bại',
        });
      }
    } catch (error) {
      // if (error.response.status === 401) {
      //   // Xử lý lỗi "Unauthorized"
      //   const newAccessToken = await refreshGoogleToken(currentState.user.refresh_token, dispatch);
      //   return unSubscribeChannel(channelId, newAccessToken)(dispatch, getState);
      // } else {
      //   console.error('Error making authenticated request:', error);
      // }
      dispatch({
        type: actionTypes.IS_SUBSCRIBED,
        data: 'Huỷ đăng kí thất bại',
      });
      console.log(error);
    }
  };
};

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
