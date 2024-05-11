import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '~/store/actions';
import { Box, CircularProgress, Stack, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Video from './videos/Video';
import Short from './short/Short';
import ModalUploadVideo from '../ModalUploadVideo';

function Content({ setIsLoadingBar, isUploading }) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const history = useHistory();

  return (
    <Box sx={{ '>.MuiTabPanel-root': { padding: '16px 0' } }}>
      <ModalUploadVideo />
      <Box sx={{ color: 'text.primary', fontSize: '2.5rem', fontWeight: '500' }} pt={3} pl={4}>
        Nội dung của kênh
      </Box>
      <TabContext value={value}>
        <Box
          position={'sticky'}
          sx={{ borderBottom: 1, borderColor: 'divider', top: '0', zIndex: 10, bgcolor: 'bgcolor.default' }}
          pt={2}
        >
          {isUploading && (
            <Stack direction={'row'} sx={{ position: 'absolute', top: 0, right: 24, zIndex: 100 }}>
              <Box className="text-md-4" pr={1} sx={{ color: 'text.secondary' }}>
                Video is uploading
              </Box>
              <CircularProgress sx={{ width: '24px!important', height: '24px!important' }} />
            </Stack>
          )}
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
            <Tab label="Video" value="1" />
            <Tab label="Video ngắn" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Video />
        </TabPanel>
        <TabPanel value="2">
          <Short />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    videosSearch: state.video.videosSearch,
    isSpinner: state.video.isSpinner,
    isUploading: state.video.isUploadingVideo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchVideoStart: (q, max) => dispatch(actions.searchVideoStart(q, max)),
    setIsSpinner: (value) => dispatch(actions.setIsSpinner(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
