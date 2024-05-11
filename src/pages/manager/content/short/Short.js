import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '~/store/actions';
import TabContent from '../tabPanel/TabContent';

function Short({ setIsLoadingBar, videoPost, myVideo, getMyVideo, access_token, resetVideoPost, message }) {
  const [items, setItems] = React.useState([]);
  const [maxResult, setMaxResult] = React.useState(20);
  const [isDown, setIsDown] = useState(false);

  useEffect(() => {
    if (maxResult || message) {
      getMyVideo(maxResult, access_token);
    }
  }, [maxResult, message]);

  useEffect(() => {
    const shortsVideos = myVideo.filter((video) => {
      return video.snippet?.tags?.includes('shorts');
    });
    setItems(shortsVideos);
  }, [myVideo]);

  useEffect(() => {
    let interval;
    if (videoPost?.data?.snippet?.tags?.includes('shorts')) {
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

  return <TabContent isShortVideo={true} items={items} isDown={isDown} />;
}

const mapStateToProps = (state) => {
  return {
    access_token: state.user.access_token,
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

export default connect(mapStateToProps, mapDispatchToProps)(Short);
