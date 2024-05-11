import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '~/store/actions';
import * as icons from '~/public/assets/icons';
import { Box, Hidden, Stack } from '@mui/material';
import { convertViewCount } from '~/utils';

function ShortList({ shortVideoStart, videosShort, setFirstShortVideo }) {
  const history = useHistory();

  useEffect(() => {
    shortVideoStart(5);
  }, []);

  const handleRedirect = (item) => {
    setFirstShortVideo(item);
    history.push('/shorts');
  };

  return (
    <Box px={2} mt={2} pb={4} mb={4} sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
      <Stack className="text-lg-6" direction={'row'} alignItems={'center'} sx={{ mb: 3, ml: 2 }}>
        <Box width={24} height={24}>
          <icons.Shorts />
        </Box>
        <span>Shorts</span>
      </Stack>
      <Stack direction={'row'} justifyContent={'space-between'}>
        {videosShort &&
          videosShort.map((item, index) => {
            return (
              <Box key={index} sx={{ width: 218 }} onClick={() => handleRedirect(item)}>
                <Box sx={{ width: 218, height: 385, borderRadius: 2, overflow: 'hidden' }}>
                  <img src={item.snippet.thumbnails.standard.url} alt=""></img>
                </Box>
                <Box mt={1} className="text-two-line text-nomal-5" sx={{ color: 'text.primary', width: '100%' }}>
                  {item.snippet.title}
                </Box>
                <Box className="text-md-4" sx={{ color: 'text.secondary', width: '100%' }}>
                  {convertViewCount(item.statistics.viewCount)} lượt xem
                </Box>
              </Box>
            );
          })}
      </Stack>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    videosInfo: state.video.videosInfo,
    videosShort: state.video.videosShort,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    shortVideoStart: (maxResult) => dispatch(actions.shortVideoStart(maxResult)),
    setFirstShortVideo: (item) => dispatch(actions.setFirstShortVideo(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShortList);
