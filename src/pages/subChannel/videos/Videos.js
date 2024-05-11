import React, { useEffect, useState } from 'react';
import { Box, Stack, Tab } from '@mui/material';
import { connect } from 'react-redux';
import * as actions from '~/store/actions';
import VideoItem from '../videoItem/VideoItem';

function Videos({ channelId, getChannelVideos, videoChannel }) {
  const [maxResult, setMaxResult] = useState(25);
  useEffect(() => {
    // getChannelVideos(channelId, maxResult);
  }, [channelId]);
  console.log(videoChannel);
  return (
    <Box mx={2}>
      <Box className="text-lg-6" sx={{ color: 'text.primay' }}>
        Videos
      </Box>
      <Stack direction={'row'} flexWrap="wrap" gap={2}>
        {videoChannel &&
          videoChannel?.length > 0 &&
          videoChannel?.map((item, index) => <VideoItem item={item} key={index} />)}
      </Stack>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    access_token: state.user.access_token,
    playListPublic: state.video.playListPublic,
    videoChannel: state.video.videoChannel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChannelVideos: (id, maxResult) => dispatch(actions.getChannelVideos(id, maxResult)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Videos);
