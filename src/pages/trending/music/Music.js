import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { connect } from 'react-redux';

import * as actions from '~/store/actions';
import VideoList from '~/pages/watch/component/VideoList';
function Music({ getTrending, videoTrending }) {
  useEffect(() => {
    getTrending(10);
  }, []);
  return (
    <Box mx={2}>
      <Box>
        <VideoList videoList={videoTrending} />
      </Box>
    </Box>
  );
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTrending: (value) => dispatch(actions.getTrending(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Music);
