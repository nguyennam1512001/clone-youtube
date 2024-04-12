import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tooltip } from 'react-tooltip';

import ChipBar from '~/components/chipbar/ChipBar';
import style from './Watch.module.scss';
import * as actions from '~/store/actions';
import EndOfListObserver from '~/components/EndOfListObserver';
import Spinner from '~/components/Spinner';
import Button from '~/components/button/Button';
import VideoList from './component/VideoList';
import { calculateTimeDifference, convertTextToAnchor, convertViewCount } from '~/utils';
import Action from './component/Actions/Action';
import { Chip, Box, Paper, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Bell, UnSubscribe } from '~/public/assets/icons';
import useClickOutside from '~/hooks/useClickOutside';
import Comment from './component/Comments/Comment';

function Watch({
  isLoggedIn,
  videosInfo,
  watchVideoStart,
  videoWatch,
  setIsLoadingBar,
  isSubscribed,
  checkChannelSubscribed,
  access_token,
  unSubscribeChannel,
  message,
  subscribeChannel,
}) {
  const [maxResult, setMaxResult] = useState(20);
  const [expand, setExpand] = useState(false);
  const history = useHistory();
  const [endOfListReached, setEndOfListReached] = useState(false);
  const [isSpinner, setIsSpinner] = useState(false);
  const [isShowSubscribedPopup, setIsShowSubscribedPopup] = useState(false);
  const subcribedBtnRef = useRef(null);
  // const [videoId, setVideoId] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const videoId = queryParams.get('v');
  const chipArr = [
    {
      path: 'Tất cả',
      text: 'Tất cả',
    },
    {
      path: '',
      text: `Của lẩu nhạc remix`,
    },
    {
      path: '',
      text: 'Dành cho bạn',
    },
    {
      path: '',
      text: 'Trực tiếp',
    },
    {
      path: '',
      text: 'Tải lên gần đây',
    },
    {
      path: '',
      text: 'Đã xem',
    },
  ];
  const channelId = videoWatch[0].snippet.channelId;
  useEffect(() => {
    if (videoWatch[0] && access_token) {
      checkChannelSubscribed(channelId, access_token);
    }
  }, [videoWatch, message]);

  useEffect(() => {
    if (videoWatch[0]) {
      const formattedText = convertTextToAnchor(videoWatch[0]?.snippet?.description);
      const container = document.getElementById('description_expander');
      if (container) {
        container.innerHTML = formattedText; // Thêm nội dung mới vào container
      } else {
        console.error('Container element not found.');
      }
    }
  }, [expand, videoWatch]);

  useEffect(() => {
    // setIsSpinner(true);
    // watchVideoStart(videoId)
    //   .then(() => {
    //     setIsSpinner(false);
    //   })
    //   .catch((error) => {
    //     setIsSpinner(false);
    //     console.error('Error loading videos:', error);
    //   });
  }, [videoId]);

  useEffect(() => {
    // setIsSpinner(true);
    // setIsLoadingBar(true);
    // getVideoStart(maxResult)
    //   .then(() => {
    //     setIsSpinner(false);
    //     setIsLoadingBar(false);
    //   })
    //   .catch((error) => {
    //     setIsLoadingBar(false);
    //     setIsSpinner(false);
    //     console.error('Error loading videos:', error);
    //   });
  }, [maxResult]);

  // console.log(videoWatch);
  const handleEndOfListReached = () => {
    setMaxResult((prevMaxResult) => prevMaxResult + 10);
  };
  const handleExpand = () => {
    setExpand(true);
  };
  const handleClose = (e) => {
    setExpand(false);
    e.stopPropagation();
  };
  const handleSubcriber = async () => {
    let id = videoWatch[0]?.snippet.channelId;
    if (access_token) {
      await subscribeChannel(id, access_token);
      // checkChannelSubscribed(channelId, access_token);
    }
  };
  const handleUnSubscribe = async (channel) => {
    let id = channel.items[0].id;
    if (access_token) {
      await unSubscribeChannel(id, access_token);
      // checkChannelSubscribed(channelId, access_token);
    }
    setIsShowSubscribedPopup(false);
  };

  useClickOutside(subcribedBtnRef, () => setIsShowSubscribedPopup(false));
  return (
    <div className={clsx(style.page_container)}>
      <div id="watch-video-play"></div>
      <div className={clsx('w-100', style.browse_results_renderer)}>
        <div className={clsx(style.primary)}>
          <div className={clsx(style.primary_inner)}>
            <div className={clsx('position-relative', style.player)}>
              <div className={clsx('position-absolute top-0 w-100 h-100 radius-12')}>
                {videoWatch && (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/` + videoWatch[0]?.id + '?autoplay=1&mute=1&rel=0'}
                    title={videoWatch[0]?.snippet?.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>
            <div className={clsx(style.below)}>
              <Box mb={3} className={clsx(style.watch_metadata)}>
                <div className={clsx(style.title)}>
                  <h1 className={clsx('text-two-line, text-lg-6', style.formatted_string)}>
                    {videoWatch[0]?.snippet?.title}
                  </h1>
                </div>
                <div className={clsx('d-flex', style.top_row)}>
                  <div className={clsx(style.owner)}>
                    <div className={clsx('flex-align-center', style.byline_container)}>
                      <div className={clsx('simple-endpoint', style.avatar_link)}>
                        <div className={clsx('img-40-round', style.avatar)}>
                          <img className={clsx(style.avatar_img)} alt="channelImg" src={videoWatch[0]?.avatar} />
                        </div>
                      </div>
                      <div className={clsx('flex-justify-center flex-column', style.info)}>
                        <div className={clsx('flex-align-center flex-row text-nomal-6', style.channel_name)}>
                          <div
                            data-tooltip-id="channel_name_tooltip"
                            data-tooltip-content={videoWatch[0]?.snippet?.channelTitle}
                            className={clsx('mw-100', style.text)}
                          >
                            <div className={clsx('text-one-line', style.channel_link)}>
                              {videoWatch[0]?.snippet?.channelTitle}
                            </div>
                            <Tooltip arrowColor="transparent" id="channel_name_tooltip" className="normal_tooltip" />
                          </div>
                        </div>
                        <div className={clsx(style.subscriber_count)}>
                          <span className={clsx('text-one-line, text-sm-4', style.formatted_string)}>
                            {convertViewCount(videoWatch[0]?.subscriberCount)} người đăng ký
                          </span>
                        </div>
                      </div>
                      {isSubscribed && isSubscribed?.pageInfo?.totalResults === 1 ? (
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
                          sx={(theme) => ({ bgcolor: theme.palette.mode === 'light' ? '#0f0f0f' : '#f1f1f1' })}
                          className={clsx(style.subscribe_btn)}
                          onClick={handleSubcriber}
                        >
                          <Chip
                            label="Đăng kí"
                            className="text-md-5 text-line-one"
                            sx={(theme) => ({
                              color: theme.palette.mode === 'light' ? '#fff' : '#0f0f0f',
                              fontSize: '14px',
                              cursor: 'pointer',
                              height: '36px',
                              padding: '0 4px',
                            })}
                          />
                        </Box>
                      )}
                    </div>
                  </div>
                  <div className={clsx('d-flex', style.actions)}>
                    <div className={clsx('flex-align-center', style.actions_inner)}>
                      <Action item={videoWatch[0]} />
                    </div>
                  </div>
                </div>
                <div className={clsx(style.bottom_row)}>
                  <div className={clsx('cursor-pointer', style.description)} onClick={() => handleExpand()}>
                    <div className={clsx(style.description_inner)}>
                      <div className={clsx(style.info_container)}>
                        <div className={clsx('text-one-line text-md-6 d-flex', style.info)}>
                          <span className={clsx(style.formatted_string)}>
                            {convertViewCount(videoWatch[0]?.statistics?.viewCount)} lượt xem &nbsp;&nbsp;
                          </span>
                          <span className={clsx('text-one-line text-md-6 d-flex', style.formatted_string)}>
                            • {calculateTimeDifference(videoWatch[0]?.snippet?.publishedAt)}
                          </span>
                        </div>
                      </div>
                      {expand ? (
                        <div className={clsx(style.description_inline_expander)}>
                          <div style={{ backgroundColor: 'transparent' }} className={clsx(style.snippet_expand)}>
                            <span id="description_expander" className={clsx('text-md-4', style.snippet_text)}></span>
                          </div>
                          <div className={clsx('text-md-5', style.expand)} onClick={(e) => handleClose(e)}>
                            Ẩn bớt
                          </div>
                        </div>
                      ) : (
                        <div className={clsx(style.description_inline_expander)}>
                          <div className={clsx(style.snippet)}>
                            <span className={clsx('d-inline-flex text-md-4', style.snippet_text)}>
                              {videoWatch[0]?.snippet?.description.split('\n\n')[0].split('---')[0]}
                            </span>
                          </div>
                          <div className={clsx('cursor-pointer text-md-5', style.expand)}>...thêm</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Box>
              <Box mr={2} className={clsx(style.comments)}>
                <Comment videoWatch={videoWatch} />
              </Box>
            </div>
          </div>
        </div>
        {/* <div className={clsx('simple-endpoint',style.avatar_link)}>
                                  <div className={clsx('img-40-round',style.avatar)}>
                                    <img className={clsx(style.avatar_img)} alt="" width="36" src={item.avatar} />
                                  </div>
                                </div> */}
        <div className={clsx(style.secondary)}>
          <div className={clsx(style.grid_renderer)}>
            <div className={clsx(style.header)}>
              <div className={clsx(style.chat_container)}>
                <div className={clsx(style.chat)}>
                  <div className={clsx(style.show_hide_button)}>
                    <Button
                      text={'Hiện nội dung phát lại cuộc trò chuyện'}
                      color={'#0f0f0f'}
                      fs={'1.4rem'}
                      fw={'500'}
                      height={'34px'}
                    />
                  </div>
                </div>
              </div>

              <div className={clsx(style.chips_bar)}>
                <div className={clsx(style.chips_wrapper)}>
                  <div className={clsx(style.chips_content)}>
                    <ChipBar chipArr={chipArr} />
                  </div>
                </div>
              </div>
            </div>
            <div className={clsx('w-100', style.contents)}>
              <VideoList videoList={videosInfo} />
              <EndOfListObserver
                onEndOfListReached={handleEndOfListReached}
                setEndOfListReached={setEndOfListReached}
              />
            </div>
            {isSpinner && endOfListReached && <Spinner />}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    access_token: state.user.access_token,
    videosInfo: state.video.videosInfo,
    videoWatch: state.video.videoWatch,
    isSubscribed: state.video.isSubscribed,
    message: state.video.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVideoStart: (max) => dispatch(actions.getVideoStart(max)),
    setIsLoadingBar: (value) => dispatch(actions.setIsLoadingBar(value)),
    watchVideoStart: (value) => dispatch(actions.watchVideoStart(value)),
    checkChannelSubscribed: (channelId, token) => dispatch(actions.checkChannelSubscribed(channelId, token)),
    unSubscribeChannel: (channelId, token) => dispatch(actions.unSubscribeChannel(channelId, token)),
    subscribeChannel: (channelId, token) => dispatch(actions.subscribeChannel(channelId, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Watch);
