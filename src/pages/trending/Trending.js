import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Stack, Tab } from '@mui/material';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import * as actions from '~/store/actions';
import New from './new/New';
import Music from './music/Music';
import Game from './Game/Game';
import Movie from './movie/Movie';
function Trending({}) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ height: 'calc(100vh - 56px)', overflow: 'auto' }} className="scroll-bar">
      <Stack direction={'row'} sx={{ pt: 3, pl: 3 }}>
        <Box width={72} height={72} sx={{ overflow: 'hidden', borderRadius: '50%' }} mx={2}>
          <img src="https://www.youtube.com/img/trending/avatar/trending.png" alt=""></img>
        </Box>
        <Box sx={{ fontSize: '3.6rem', fontWeight: '600' }}>Thịnh hành</Box>
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
            <Tab label="Mới nhất" value="1" />
            <Tab label="Âm nhạc" value="2" />
            <Tab label="Trò chơi" value="3" />
            <Tab label="Phim" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <New />
        </TabPanel>
        <TabPanel value="2">
          <Music />
        </TabPanel>
        <TabPanel value="4">
          <Game />
        </TabPanel>
        <TabPanel value="3">
          <Movie />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Trending);
