import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tooltip } from 'react-tooltip';

import { Menu, Tick } from '../../public/assets/icons';
import ChipBar from '~/components/chipbar/ChipBar';
import style from './Home.module.scss';

import * as actions from '~/store/actions';
import { convertDuration, convertViewCount, calculateTimeDifference, path } from '~/utils';
import EndOfListObserver from '~/components/EndOfListObserver';
import Spinner from '~/components/Spinner';
import { chipArr } from './component/ListChip';
import ShortList from './component/ShortList';
import { Box, Skeleton, Stack } from '@mui/material';

function Home({ is_sidebar_mini, is_sidebar_modal, videosInfo, getVideoStart, isLoadingBar }) {
  const [itemPerRow, setItemPerRow] = useState(4);
  const [groups, setGroups] = useState([]);
  const [fakes, setFake] = useState([]);
  const [maxResult, setMaxResult] = useState(20);
  const history = useHistory();
  const [endOfListReached, setEndOfListReached] = useState(false);
  const [isSpinner, setIsSpinner] = useState(false);
  const handleRedirect = (url) => {
    history.push(url);
  };
  useEffect(() => {
    setIsSpinner(true);
    getVideoStart(maxResult).finally(() => {
      setIsSpinner(false);
    });
  }, [maxResult]);

  useEffect(() => {
    let group = [];
    if (videosInfo) {
      for (let i = 0; i < videosInfo.length; i += itemPerRow) {
        group.push(videosInfo.slice(i, i + itemPerRow));
      }
      setGroups(group);
    }
    let groupFake = [];
    let videosFake = [1, 2, 3, 4, 5];
    if (videosFake) {
      for (let i = 0; i < videosFake.length; i += itemPerRow) {
        groupFake.push(videosInfo.slice(i, i + itemPerRow));
      }
      setFake(groupFake);
    }
  }, [itemPerRow, videosInfo]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 588) {
        setItemPerRow(1);
      } else if (window.innerWidth < 874) {
        setItemPerRow(2);
      } else if (window.innerWidth < 1400) {
        setItemPerRow(3);
      } else if (window.innerWidth >= 1400 && is_sidebar_mini) {
        setItemPerRow(4);
      } else {
        setItemPerRow(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [is_sidebar_mini, is_sidebar_modal]);

  const handleEndOfListReached = () => {
    setMaxResult((prevMaxResult) => prevMaxResult + 10);
  };

  return (
    <div className={clsx(style.page_container)}>
      <div className={clsx('w-100', style.browse_results_renderer)}>
        <div className={clsx(style.primary)}>
          <div className={clsx(style.grid_renderer)}>
            <div className={clsx(style.header)}>
              <div className={clsx(style.chips_bar)}>
                <div className={clsx('flex-justify-center', style.chips_wrapper)}>
                  <div
                    className={clsx(
                      style.chips_content,
                      { [style.sibar_mini]: is_sidebar_mini },
                      { [style.sibar_modal]: is_sidebar_modal },
                    )}
                  >
                    <ChipBar chipArr={chipArr} />
                  </div>
                </div>
              </div>
            </div>
            <div className={clsx('w-100', style.contents)}>
              {isLoadingBar &&
                fakes.map((group, index) => {
                  return (
                    <div className={clsx('flex-justify-center w-100', style.grid_row)} key={index}>
                      <div className={clsx('w-100', style.list)}>
                        {group.map((item, index) => (
                          <Box
                            className={clsx(
                              'position-relative',
                              style.item,
                              { [style.per_row_1]: itemPerRow === 1 },
                              { [style.per_row_2]: itemPerRow === 2 },
                              { [style.per_row_3]: itemPerRow === 3 },
                              { [style.per_row_4]: itemPerRow === 4 },
                            )}
                            key={index + 'item'}
                          >
                            <Stack spacing={2} className={clsx('flex-justify-center h-100 ', style.content)}>
                              <Skeleton variant="rounded" height={210} width={'100%'} />
                              <Stack direction={'row'} spacing={1} width={'100%'}>
                                <Skeleton variant="circular" width={40} height={40} />
                                <Stack flex={1} spacing={1}>
                                  <Skeleton variant="rectangular" height={30} width={'100%'} />
                                  <Skeleton variant="rectangular" height={10} width={'100%'} />
                                  <Skeleton variant="rectangular" height={10} width={'100%'} />
                                </Stack>
                              </Stack>
                            </Stack>
                          </Box>
                        ))}
                      </div>
                    </div>
                  );
                })}
              {!isLoadingBar &&
                groups &&
                groups.map((group, index) => {
                  if (index === 2) {
                    return <ShortList key={index + 'shorst'} />;
                  }
                  return (
                    <div className={clsx('flex-justify-center w-100', style.grid_row)} key={index}>
                      <div className={clsx('w-100', style.list)}>
                        {group.map((item, index) => {
                          return (
                            <div
                              className={clsx(
                                'position-relative',
                                style.item,
                                { [style.per_row_1]: itemPerRow === 1 },
                                { [style.per_row_2]: itemPerRow === 2 },
                                { [style.per_row_3]: itemPerRow === 3 },
                                { [style.per_row_4]: itemPerRow === 4 },
                              )}
                              key={index + 'item'}
                            >
                              <div className={clsx('flex-justify-center h-100 ', style.content)}>
                                <div
                                  className={clsx('w-100 h-100 m-0 position-relative', style.grid_media)}
                                  onClick={() => handleRedirect('/watch?v=' + item.id)}
                                >
                                  {/* có thể tách thumbnail thành 1 component  */}
                                  <div className={clsx(style.thumbnail)}>
                                    <div
                                      className={clsx(
                                        'simple-endpoint radius-12 position-relative',
                                        style.thumbnail_link,
                                      )}
                                    >
                                      <div className={clsx(style.img)}>
                                        <img src={item.snippet.thumbnails.medium.url} alt="anh" />
                                      </div>
                                      <div className={clsx(style.overlays)}>
                                        <div
                                          className={clsx(
                                            'd-flex flex-row position-absolute bottom-0 end-0',
                                            style.overlay_time,
                                          )}
                                        >
                                          <div
                                            className={clsx(
                                              'd-inline-flex align-items-center flex-row',
                                              style.time_status,
                                            )}
                                          >
                                            <span className={clsx('overflow-hidden', style.text)}>
                                              {convertDuration(item.contentDetails.duration)}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className={clsx('d-flex flex-row position-relative cursor-pointer', style.details)}
                                  >
                                    <div
                                      className={clsx('simple-endpoint', style.avatar_link)}
                                      onClick={() => handleRedirect(path.CHANNEL + '?id=' + item.snippet.channelId)}
                                    >
                                      <div className={clsx('img-36-round', style.avatar)}>
                                        <img className={clsx(style.avatar_img)} alt="" width="36" src={item.avatar} />
                                      </div>
                                    </div>
                                    <div className={clsx(style.meta)}>
                                      <h3 className={clsx(style.video_name)}>
                                        <a
                                          href="#"
                                          className={clsx('simple-endpoint', style.video_title_link)}
                                          title={item.snippet.title}
                                        >
                                          <div className={clsx('text-two-line text-nomal-5', style.video_title)}>
                                            {item.snippet.title}
                                          </div>
                                        </a>
                                      </h3>
                                      <div className={clsx(style.meta_block)}>
                                        <div className={clsx('d-flex flex-column mw-100', style.metadata)}>
                                          <div className={clsx('text-md-4-secon', style.byline_container)}>
                                            <div
                                              className={clsx(
                                                'text-md-4 flex-align-center flex-row mw-100',
                                                style.channel_name,
                                              )}
                                            >
                                              <div
                                                data-tooltip-id="channel_name_tooltip"
                                                data-tooltip-content={item.snippet.channelTitle}
                                                className={clsx('mw-100', style.text)}
                                              >
                                                <a
                                                  href="#"
                                                  className={clsx(
                                                    'simple-endpoint',
                                                    'text-one-line',
                                                    style.channel_link,
                                                  )}
                                                >
                                                  {item.snippet.channelTitle}
                                                </a>
                                                <Tooltip
                                                  arrowColor="transparent"
                                                  id="channel_name_tooltip"
                                                  className="normal_tooltip"
                                                />
                                              </div>
                                              <div className={clsx(style.channel_icon)}>
                                                <div
                                                  data-tooltip-id="channel_icon_tooltip"
                                                  data-tooltip-content="Đã xác minh"
                                                >
                                                  <div className={clsx(style.icon_shape)}>
                                                    <Tick />
                                                  </div>
                                                  <Tooltip
                                                    arrowColor="transparent"
                                                    id="channel_icon_tooltip"
                                                    className="normal_tooltip"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className={clsx('d-flex text-two-line text-md-4', style.metadata_line)}>
                                            <span className={clsx(style.inline_metadata_item)}>
                                              {convertViewCount(item.statistics.viewCount)} lượt xem&nbsp;
                                            </span>
                                            <span className={clsx(style.inline_metadata_item)}>
                                              • {calculateTimeDifference(item.snippet.publishedAt)}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className={clsx('position-relative', style.menu)}>
                                      <button className={clsx('position-absolute', style.button_icon)}>
                                        <div className={clsx('shape-24', style.icon_shape)}>
                                          <Menu />
                                        </div>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              <EndOfListObserver
                onEndOfListReached={handleEndOfListReached}
                setEndOfListReached={setEndOfListReached}
              />
            </div>
            {isSpinner && endOfListReached && <Spinner />}
          </div>
        </div>
        <div className={clsx(style.secondary)}></div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    is_sidebar_mini: state.app.is_sidebar_mini,
    is_sidebar_modal: state.app.is_sidebar_modal,
    isLoadingBar: state.video.isLoadingBar,
    videosInfo: state.video.videosInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVideoStart: (max) => dispatch(actions.getVideoStart(max)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
