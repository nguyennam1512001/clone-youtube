import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { connect } from 'react-redux';
import * as icons from '~/public/assets/icons';
import * as actions from '~/store/actions';
import { useHistory } from 'react-router-dom';

import { calculateTimeDifference, convertDuration, convertViewCount, path } from '~/utils';
function VideoItem({ item, isPrivate }) {
  const history = useHistory();
  const handleRedirect = (path) => {
    history.push(path);
  };
  return (
    <Box py={3} onClick={() => handleRedirect(path.WATCH + '?id=' + item.id)}>
      <Box className="behind"></Box>
      <Box width={250} height={141} sx={{ borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
        <img src={item?.snippet?.thumbnails?.medium?.url} alt=""></img>
        <Box
          position={'absolute'}
          bottom={'16px'}
          right={'8px'}
          px={0.5}
          sx={{ bgcolor: 'rgba(0, 0, 0, 0.6', borderRadius: '4px' }}
        >
          <Box sx={{ color: '#fff', fontSize: '1.2rem', fontWeight: '500' }}>
            {convertDuration(item?.contentDetails?.duration)}
          </Box>
        </Box>
      </Box>
      <Box className="text-two-line text-md-5" sx={{ width: 250, my: 1 }}>
        {item.snippet.title}
      </Box>
      <Box className="flex-align-center" sx={{ fontSize: '1.2rem', fontWeight: 500, color: 'text.secondary' }}>
        <Box>{convertViewCount(item?.statistics?.viewCount)} lượt xem &nbsp;&nbsp;</Box>
        <Box>• {calculateTimeDifference(item?.snippet?.publishedAt)}</Box>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    access_token: state.user.access_token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoItem);
