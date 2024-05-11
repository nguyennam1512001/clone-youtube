import actionTypes from './actionTypes';
import { getApi, postApi, deleteApi } from '~/services';
import { googleKey } from '~/utils';
import { subscribeToChannel } from '~/services/videoService';
import axios from 'axios';

const fetchData = async (url, dispatch, actionType, access_token) => {
  try {
    const res = await getApi(url, googleKey.API_KEY, access_token);
    if (res && res.data && res.data.items.length > 0) {
      const { videoIds, channelIds } = extractIdsFromItems(res.data.items);
      if (videoIds.length > 0 && channelIds.length > 0) {
        const [channelsResponse, videosResponse] = await fetchChannelsAndVideos(videoIds, channelIds, access_token);
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

export const watchVideoStart = (id, access_token) => {
  return async (dispatch, getState) => {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cplayer%2Cstatistics&id=${id}`;
    fetchData(url, dispatch, actionTypes.WATCH_VIDEO_SUCCESS, access_token);
  };
};

export const getVideoRelated = (searchText, maxResult) => {
  return async (dispatch, getState) => {
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResult}&q=${searchText}`;
    fetchData(url, dispatch, actionTypes.VIDEO_RELATED);
  };
};

export const getMyVideo = (maxResult, access_token) => {
  return async (dispatch, getState) => {
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&forMine=true&maxResults=${maxResult}&type=video`;
    fetchData(url, dispatch, actionTypes.GET_MY_VIDEO, access_token);
  };
};

export const getChannelVideos = (channelId, maxResult) => {
  return async (dispatch, getState) => {
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxResult}`;
    fetchData(url, dispatch, actionTypes.GET_CHANNEL_VIDEO);
  };
};
export const resetVideoPost = () => ({ type: actionTypes.GET_VIDEO_FALSE });

export const getRate = (videoId, access_token) => {
  return async (dispatch, getState) => {
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
      dispatch({
        type: actionTypes.POST_RATE,
        data: error.message,
      });
      console.log(error);
    }
  };
};

export const checkChannelSubscribed = (channelId, access_token) => {
  return async (dispatch, getState) => {
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
      dispatch({
        type: actionTypes.IS_SUBSCRIBED,
        data: 'Huỷ đăng kí thất bại',
      });
      console.log(error);
    }
  };
};

export const getCommentThreads = (videoId, pageToken) => {
  return async (dispatch, getState) => {
    try {
      let res = await getApi(
        `https://youtube.googleapis.com/youtube/v3/commentThreads?part=id%2C%20replies%2C%20snippet&pageToken=${pageToken}&videoId=${videoId}`,
        googleKey.API_KEY,
      );
      if (res && res.data) {
        dispatch({ type: actionTypes.GET_COMMENT_THREADS, data: res.data });
      } else {
        dispatch({
          type: actionTypes.GET_COMMENT_THREADS,
          data: null,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_COMMENT_THREADS,
        data: null,
      });
      console.log(error);
    }
  };
};

export const postCommentThreads = (data, access_token) => {
  return async (dispatch, getState) => {
    try {
      let res = await axios.post(
        'https://www.googleapis.com/youtube/v3/commentThreads?part=snippet',
        {
          snippet: {
            channelId: data.channelId,
            videoId: data.videoId,
            topLevelComment: {
              snippet: {
                textOriginal: data.textOriginal,
              },
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (res && res.data) {
        dispatch({ type: actionTypes.POST_COMMENT, data: { message: 'Comment success', data: res.data } });
      } else {
        dispatch({
          type: actionTypes.POST_COMMENT,
          data: 'Lỗi bình luận',
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.POST_COMMENT,
        data: 'Lỗi bình luận',
      });
      console.log(error);
    }
  };
};

export const postComment = (data, access_token) => {
  return async (dispatch, getState) => {
    try {
      let res = await axios.post(
        'https://www.googleapis.com/youtube/v3/comments?part=snippet',
        {
          snippet: {
            parentId: data.parentId,
            textOriginal: data.textOriginal,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (res && res.data) {
        dispatch({ type: actionTypes.POST_COMMENT, data: { message: 'Comment success', dataRep: res.data } });
      } else {
        dispatch({
          type: actionTypes.POST_COMMENT,
          data: 'Lỗi bình luận',
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.POST_COMMENT,
        data: 'Lỗi bình luận',
      });
      console.log(error);
    }
  };
};

export const deleteComment = (id, access_token) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteApi(`https://youtube.googleapis.com/youtube/v3/comments?id=${id}`, access_token);
      if (res) {
        dispatch({ type: actionTypes.DELETE_COMMENT, data: { message: 'Delete success', cmtId: id } });
      } else {
        dispatch({
          type: actionTypes.DELETE_COMMENT,
          data: 'Xoá thất bại',
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.DELETE_COMMENT,
        data: 'Xoá thất bại',
      });
      console.log(error);
    }
  };
};

export const postVideo = (formData) => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.post('http://localhost:8080/api/post-video', formData);
      if (res && res.data) {
        dispatch({
          type: actionTypes.POST_VIDEO,
          data: { message: res.message, video: res.data.data },
        });
      } else {
        dispatch({
          type: actionTypes.POST_VIDEO,
          data: { message: 'Lỗi tải lên', video: [] },
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.POST_VIDEO,
        data: { message: 'Lỗi tải lên', video: [] },
      });
      console.log(error);
    }
  };
};

export const deleteVideo = (id, access_token) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteApi(`https://www.googleapis.com/youtube/v3/videos?id=${id}`, access_token);
      if (res) {
        dispatch({ type: actionTypes.DELETE_VIDEO, message: 'Delete video success' });
      } else {
        dispatch({
          type: actionTypes.DELETE_VIDEO,
          message: 'Xoá video thất bại',
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.DELETE_VIDEO,
        message: 'Xoá video thất bại',
      });
      console.log(error);
    }
  };
};

export const updateVideo = (data, access_token) => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.put(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,status`,
        {
          id: data.videoId,
          snippet: data.snippet,
          status: data.status,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (res) {
        dispatch({ type: actionTypes.UPDATE_VIDEO, message: 'Lưu thành công' });
      } else {
        dispatch({
          type: actionTypes.UPDATE_VIDEO,
          message: 'Lưu thất bại',
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_VIDEO,
        message: ' Lưu thất bại',
      });
      console.log(error);
    }
  };
};
// playList private
export const getPlayListPrivate = (access_token) => {
  return async (dispatch, getState) => {
    try {
      let res = await getApi(
        `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2C%20contentDetails%2C%20status&mine=true`,
        null,
        access_token,
      );
      if (res && res.data) {
        dispatch({ type: actionTypes.GET_PLAYLIST_PRIVATE, data: res.data });
      } else {
        dispatch({
          type: actionTypes.GET_PLAYLIST_PRIVATE,
          // data: null,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_PLAYLIST_PRIVATE,
        // data: null,
      });
      console.log(error);
    }
  };
};
// playList public
export const getPlayListPublic = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getApi(
        `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2C%20contentDetails%2C%20status&channelId=${id}`,
        googleKey.API_KEY,
      );
      if (res && res.data) {
        dispatch({ type: actionTypes.GET_PLAYLIST_PUBLIC, data: res.data });
      } else {
        dispatch({
          type: actionTypes.GET_PLAYLIST_PUBLIC,
          // data: null,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_PLAYLIST_PUBLIC,
        // data: null,
      });
      console.log(error);
    }
  };
};

export const getTrending = (categoryId) => {
  return async (dispatch, getState) => {
    try {
      let res = await getApi(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2C%20status&chart=mostPopular&regionCode=vn${
          categoryId ? '&videoCategoryId=' + categoryId : ''
        }`,
        googleKey.API_KEY,
      );
      if (res && res.data) {
        dispatch({ type: actionTypes.GET_TRENDING, data: res.data });
      } else {
        dispatch({
          type: actionTypes.GET_TRENDING,
          // data: null,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_TRENDING,
        // data: null,
      });
      console.log(error);
    }
  };
};
export const resetMessage = () => ({
  type: actionTypes.RESET_MESSAGE,
});

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

export const setUploadModal = (boolean) => ({
  type: actionTypes.SET_UPLOAD_MODAL,
  boolean,
});

export const setUploadingVideo = (boolean) => ({
  type: actionTypes.SET_UPLOADING_VIDEO,
  boolean,
});

export const setFirstShortVideo = (video) => ({
  type: actionTypes.SET_FIRST_SHORT_VIDEO,
  video,
});

export const setChannelInfo = (data) => ({
  type: actionTypes.SET_CHANNEL_INFO,
  data,
});

// ============ function sevices ============== \\
const extractIdsFromItems = (items) => {
  let videoIds = [];
  let channelIds = [];
  if (items.length > 0) {
    items.forEach((item) => {
      videoIds.push(item.id.videoId || item.id);
      channelIds.push(item.snippet.channelId);
    });
    return { videoIds, channelIds };
  } else {
    return { videoIds, channelIds };
  }
};

const fetchChannelsAndVideos = async (videoIds, channelIds, access_token) => {
  let channelIdStr = channelIds.join(',');
  let videoIdStr = videoIds.join(',');
  const channelsResponse = getApi(
    `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelIdStr}`,
    googleKey.API_KEY,
  );

  const videosResponse = getApi(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2C%20status&id=${videoIdStr}`,
    googleKey.API_KEY,
    access_token,
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
