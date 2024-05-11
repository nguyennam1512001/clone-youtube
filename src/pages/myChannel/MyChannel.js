import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Chip, Stack, Tab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import * as actions from '~/store/actions';
import Home from './home/Home';
import PlayList from './playList/PlayList';
import { path } from '~/utils';
function MyChannel({ getPlayListPublic, myChannelInfo, getUserInfoStart, access_token }) {
  const [value, setValue] = useState('1');
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const channelId = queryParams.get('id');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getPlayListPublic(myChannelInfo.id);
    getUserInfoStart(access_token);
  }, []);

  const handleRedirect = (path) => {
    history.push(path);
  };

  return (
    <Box>
      <Stack direction={'row'} sx={{ pt: 3, pl: 3 }}>
        <Box width={160} height={160} sx={{ overflow: 'hidden', borderRadius: '50%' }} mx={2}>
          <img src={myChannelInfo.thumbnails} alt=""></img>
        </Box>
        <Box>
          <Box sx={{ fontSize: '3.6rem', fontWeight: '600' }}>{myChannelInfo.title}</Box>
          <Box sx={{ color: 'text.secondary' }} className="text-one-line text-md-4">
            {myChannelInfo.customUrl}
            <span>{myChannelInfo.subscriberCount > 0 ? ` ‧ ${myChannelInfo.subscriberCount} người đăng ký` : ''} </span>
          </Box>
          <Box mt={2}>
            <Chip
              label="Quản lý video"
              sx={{ fontSize: '1.4rem', fontWeight: 500, color: 'text.primary' }}
              onClick={() => handleRedirect(path.UPLOAD)}
            />
          </Box>
        </Box>
      </Stack>
      <TabContext value={value}>
        <Box
          position={'sticky'}
          pl={5}
          sx={{ borderBottom: 1, borderColor: 'divider', top: '0', zIndex: 10, bgcolor: 'bgcolor.default' }}
          pt={2}
        >
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{
              '& .MuiTab-root': {
                fontSize: '1.5rem',
                textTransform: 'unset',
              },
            }}
          >
            <Tab label="Trang chủ" value="1" />
            <Tab label="Danh sách phát" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Home />
        </TabPanel>
        <TabPanel value="2">
          <PlayList />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    access_token: state.user.access_token,
    isLoggedIn: state.user.isLoggedIn,
    myChannelInfo: state.video.myChannelInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPlayListPublic: (value) => dispatch(actions.getPlayListPublic(value)),
    getUserInfoStart: (token) => dispatch(actions.getUserInfoStart(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyChannel);
