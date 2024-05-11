import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Tab,
} from '@mui/material';

import * as actions from '~/store/actions';
import Home from './home/Home';
import PlayList from './playList/PlayList';
import { convertViewCount, googleKey, path } from '~/utils';
import { getApi } from '~/services';
import useClickOutside from '~/hooks/useClickOutside';
import { Bell, UnSubscribe } from '~/public/assets/icons';
import Videos from './videos/Videos';

function SubChannel({
  getPlayListPublic,
  isSubscribed,
  checkChannelSubscribed,
  getUserInfoStart,
  access_token,
  unSubscribeChannel,
  subscribeChannel,
  message,
}) {
  const [value, setValue] = useState('1');
  const [channel, setChannel] = useState(null);
  const [isShowSubscribedPopup, setIsShowSubscribedPopup] = useState(false);
  const subcribedBtnRef = useRef(null);
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const channelId = queryParams.get('id');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const fetchChannelData = async () => {
    try {
      const res = await getApi(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}`,
        googleKey.API_KEY,
      );

      if (res.data && res.data.items.length > 0) {
        setChannel(res.data.items[0]); // Đặt giá trị của kênh khi có dữ liệu
      }
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu kênh:', error); // Xử lý lỗi
    }
  };

  useEffect(() => {
    fetchChannelData();
    checkChannelSubscribed(channelId, access_token);
    getPlayListPublic(channelId);
  }, [channelId]);
  useEffect(() => {
    if (access_token) {
      checkChannelSubscribed(channelId, access_token);
      getUserInfoStart(access_token);
    }
  }, [message]);

  const handleSubcriber = async () => {
    let id = channelId;
    if (access_token) {
      await subscribeChannel(id, access_token);
    }
  };
  const handleUnSubscribe = async () => {
    if (access_token) {
      await unSubscribeChannel(isSubscribed.items[0].id, access_token);
    }
    setIsShowSubscribedPopup(false);
  };
  const handleRedirect = (path) => {
    history.push(path);
  };
  useClickOutside(subcribedBtnRef, () => setIsShowSubscribedPopup(false));

  return (
    <Box>
      <Stack direction={'row'} sx={{ pt: 3, pl: 3 }}>
        <Box width={160} height={160} sx={{ overflow: 'hidden', borderRadius: '50%' }} mx={2}>
          <img src={channel && channel?.snippet?.thumbnails.medium.url} alt=""></img>
        </Box>
        <Box>
          <Box sx={{ fontSize: '3.6rem', fontWeight: '600' }}>{channel && channel?.snippet?.title}</Box>
          <Box sx={{ color: 'text.secondary' }} className="text-one-line text-md-4">
            {channel && channel?.snippet?.customUrl}
            <span>
              {channel && channel?.statistics?.subscriberCount > 0
                ? ` ‧ ${convertViewCount(channel?.statistics?.subscriberCount)} người đăng ký`
                : ''}{' '}
            </span>
          </Box>
          <Box mt={2}>
            {isSubscribed && isSubscribed?.pageInfo?.totalResults !== 0 ? (
              <Box ref={subcribedBtnRef} sx={{ position: 'relative' }}>
                <Chip
                  icon={
                    <Box style={{ width: '24px', height: '24px' }}>
                      <Bell />
                    </Box>
                  }
                  label="Đã đăng kí"
                  sx={{
                    color: 'text.primary',
                    height: '36px',
                    fontSize: '14px',
                    padding: '0 4px',
                    cursor: 'pointer',
                    bgcolor: 'bgcolor.secondary',
                  }}
                  className="text-md-5 text-line-one"
                  onClick={() => setIsShowSubscribedPopup(!isShowSubscribedPopup)}
                />
                {isShowSubscribedPopup && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      zIndex: 100,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Paper
                      sx={{
                        maxWidth: '300px',
                        maxHeight: '410px',
                        borderRadius: '12px',
                        overflow: 'auto',
                        bgcolor: 'bgcolor.popup',
                      }}
                    >
                      <List>
                        <ListItem disablePadding onClick={() => handleUnSubscribe(isSubscribed)}>
                          <ListItemButton>
                            <ListItemIcon sx={{ minWidth: '0', mr: 2 }}>
                              <Box sx={{ height: '24px', width: '24px' }}>
                                <UnSubscribe />
                              </Box>
                            </ListItemIcon>
                            <ListItemText
                              sx={{
                                '&.MuiListItemText-root': {
                                  WebkitFontSmoothing: 'antialiased',
                                  whiteSpace: 'nowrap',
                                },
                              }}
                            >
                              <Box
                                sx={(theme) => ({
                                  color: theme.palette.mode === 'light' ? 'text.primary' : '#f1f1f1',
                                })}
                                className="text-md-4 text-line-one"
                              >
                                Huỷ đăng kí
                              </Box>
                            </ListItemText>
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </Paper>
                  </Box>
                )}
              </Box>
            ) : (
              <Box
                sx={(theme) => ({
                  borderRadius: '100px',
                  height: 'fit-content',
                })}
                onClick={handleSubcriber}
              >
                <Chip
                  label="Đăng kí"
                  className="text-md-5 text-line-one"
                  sx={(theme) => ({
                    color: 'text.primary',
                    fontSize: '14px',
                    cursor: 'pointer',
                    height: '36px',
                    padding: '0 4px',
                  })}
                />
              </Box>
            )}
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
            {/* <Tab label="Trang chủ" value="1" /> */}
            <Tab label="Videos" value="1" />
            <Tab label="Danh sách phát" value="2" />
          </TabList>
        </Box>
        {/* <TabPanel value="1">
          <Home />
        </TabPanel> */}
        <TabPanel value="1">
          <Videos channelId={channelId} />
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
    isSubscribed: state.video.isSubscribed,
    message: state.video.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPlayListPublic: (value) => dispatch(actions.getPlayListPublic(value)),
    checkChannelSubscribed: (channelId, token) => dispatch(actions.checkChannelSubscribed(channelId, token)),
    subscribeChannel: (channelId, token) => dispatch(actions.subscribeChannel(channelId, token)),
    unSubscribeChannel: (channelId, token) => dispatch(actions.unSubscribeChannel(channelId, token)),
    getUserInfoStart: (token) => dispatch(actions.getUserInfoStart(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubChannel);
