import React, { useEffect, useState } from 'react';
import { Box, Stack, Tab } from '@mui/material';
import { connect } from 'react-redux';
import * as actions from '~/store/actions';
import PlayListItem from '../videoItem/VideoItem';
function Home({ playListPublic }) {
  return (
    <Box mx={2}>
      <Box className="text-lg-6" sx={{ color: 'text.primay' }}>
        Danh sách phát đã tạo
      </Box>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
