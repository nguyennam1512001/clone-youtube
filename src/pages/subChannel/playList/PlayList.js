import React, { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import { connect } from 'react-redux';

import * as actions from '~/store/actions';
import PlayListItem from '../videoItem/VideoItem';

function PlayList({ channelId, playListPublic, playListPrivate, getPlayListPrivate, access_token }) {
  useEffect(() => {
    // getPlayListPrivate(access_token);
  }, []);

  return (
    <Box mx={2}>
      <Box className="text-nomal-4" sx={{ color: 'text.secondary' }}>
        Danh sách phát đã tạo
      </Box>
      <Stack direction={'row'} flexWrap="wrap" gap={1}>
        {playListPrivate &&
          playListPrivate.items.length > 0 &&
          playListPrivate.items.map((item, index) => (
            <PlayListItem item={item} isPrivate={true} key={index + 'private'} />
          ))}
      </Stack>
      <Stack direction={'row'} flexWrap="wrap" gap={1}>
        {playListPublic &&
          playListPublic.items.length > 0 &&
          playListPublic.items.map((item, index) => <PlayListItem item={item} key={index} />)}
      </Stack>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    access_token: state.user.access_token,
    playListPublic: state.video.playListPublic,
    playListPrivate: state.video.playListPrivate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPlayListPrivate: (value) => dispatch(actions.getPlayListPrivate(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayList);
