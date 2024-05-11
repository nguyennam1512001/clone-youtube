import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '~/store/actions';

import TabContent from '../tabPanel/TabContent';

function Video({ setIsLoadingBar, videoPost, myVideo, getMyVideo, access_token, resetVideoPost, message }) {
  const [items, setItems] = useState([]);
  const [maxResult, setMaxResult] = useState(20);
  const [isDown, setIsDown] = useState(false);

  useEffect(() => {
    if (maxResult || message) {
      getMyVideo(maxResult, access_token);
    }
  }, [maxResult, message]);

  useEffect(() => {
    if (myVideo.length > 0) {
      let arr = myVideo.filter((video) => {
        return !video.snippet?.tags?.includes('shorts');
      });
      if (arr.length > 0) {
        setItems(arr);
      }
    }
  }, [myVideo]);

  useEffect(() => {
    let interval;
    if (videoPost.data && !videoPost?.data?.snippet?.tags?.includes('shorts')) {
      setIsDown(true);

      setItems([videoPost.data, ...items]);

      interval = setInterval(async () => {
        await getMyVideo(maxResult, access_token);
        resetVideoPost();
        setIsDown(false);
      }, 40000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [videoPost]);

  return <TabContent items={items} isDown={isDown} />;
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    access_token: state.user.access_token,
    videosSearch: state.video.videosSearch,
    isSpinner: state.video.isSpinner,
    videoPost: state.video.videoPost,
    myVideo: state.video.myVideo,
    message: state.video.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchVideoStart: (q, max) => dispatch(actions.searchVideoStart(q, max)),
    setIsSpinner: (value) => dispatch(actions.setIsSpinner(value)),
    setIsLoadingBar: (value) => dispatch(actions.setIsLoadingBar(value)),
    getMyVideo: (max, token) => dispatch(actions.getMyVideo(max, token)),
    resetVideoPost: () => dispatch(actions.resetVideoPost()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Video);
