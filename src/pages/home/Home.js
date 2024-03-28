import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tooltip } from 'react-tooltip';

import { Menu, Tick } from '~/assets/icons';
import ChipBar from '~/components/chipbar/ChipBar';
import style from './Home.module.scss';
import * as actions from '~/store/actions';
import { convertDuration, convertViewCount, calculateTimeDifference } from '~/utils';
import EndOfListObserver from '~/components/EndOfListObserver';
import Spinner from '~/components/Spinner';
import { chipArr } from './component/ListChip';

function Home({ is_sidebar_mini, is_sidebar_modal, videosInfo, getVideoStart, setIsLoadingBar }) {
  const [itemPerRow, setItemPerRow] = useState(4);
  const [groups, setGroups] = useState([]);
  const [maxResult, setMaxResult] = useState(20);
  const history = useHistory();
  const [endOfListReached, setEndOfListReached] = useState(false);
  const [isSpinner, setIsSpinner] = useState(false);

  const handleClickThumbnail = (url) => {
    history.push(url);
  };
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

  useEffect(() => {
    let group = [];
    if (videosInfo) {
      for (let i = 0; i < videosInfo.length; i += itemPerRow) {
        group.push(videosInfo.slice(i, i + itemPerRow));
      }
      setGroups(group);
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
      <div className={clsx(style.browse_results_renderer)}>
        <div className={clsx(style.primary)}>
          <div className={clsx(style.grid_renderer)}>
            <div className={clsx(style.header)}>
              <div className={clsx(style.chips_bar)}>
                <div className={clsx(style.chips_wrapper)}>
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
            <div className={clsx(style.contents)}>
              {groups &&
                groups.map((group, index) => {
                  return (
                    <div className={clsx(style.grid_row)} key={index}>
                      <div className={clsx(style.list)}>
                        {group.map((item, index) => {
                          return (
                            <div
                              className={clsx(
                                style.item,
                                { [style.per_row_1]: itemPerRow === 1 },
                                { [style.per_row_2]: itemPerRow === 2 },
                                { [style.per_row_3]: itemPerRow === 3 },
                                { [style.per_row_4]: itemPerRow === 4 },
                              )}
                              key={index + 'item'}
                            >
                              <div className={clsx(style.content)}>
                                <div className={clsx(style.grid_media)}>
                                  <div className={clsx(style.thumbnail)}>
                                    <div className={clsx(style.thumbnail_link)} onClick={() => handleClickThumbnail()}>
                                      <div className={clsx(style.img)}>
                                        <img src={item.snippet.thumbnails.medium.url} alt="anh" />
                                      </div>
                                      <div className={clsx(style.overlays)}>
                                        <div className={clsx(style.overlay_time)}>
                                          <div className={clsx(style.time_status)}>
                                            <span className={clsx(style.text)}>
                                              {convertDuration(item.contentDetails.duration)}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className={clsx(style.details)}>
                                    <div className={clsx(style.avatar_link)}>
                                      <div className={clsx(style.avatar)}>
                                        <img className={clsx(style.avatar_img)} alt="" width="36" src={item.avatar} />
                                      </div>
                                    </div>
                                    <div className={clsx(style.meta)}>
                                      <h3 className={clsx(style.video_name)}>
                                        <a
                                          href={'/watch?v=' + item.id}
                                          className={clsx(style.video_title_link, 'yt-simple-endpoint')}
                                          title={item.snippet.title}
                                        >
                                          <div className={clsx(style.video_title)}>{item.snippet.title}</div>
                                        </a>
                                      </h3>
                                      <div className={clsx(style.meta_block)}>
                                        <div className={clsx(style.metadata)}>
                                          <div className={clsx(style.byline_container)}>
                                            <div className={clsx(style.channel_name)}>
                                              <div
                                                data-tooltip-id="channel_name_tooltip"
                                                data-tooltip-content={item.snippet.channelTitle}
                                                className={clsx(style.text)}
                                              >
                                                <a href="/@nhacremixvn" className={clsx(style.channel_link)}>
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
                                          <div className={clsx(style.metadata_line)}>
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
                                    <div className={clsx(style.menu)}>
                                      <button className={clsx(style.button_icon)}>
                                        <div className={clsx(style.icon_shape)}>
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
    is_sidebar_mini: state.user.is_sidebar_mini,
    is_sidebar_modal: state.user.is_sidebar_modal,
    videosInfo: state.video.videosInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVideoStart: (max) => dispatch(actions.getVideoStart(max)),
    setIsLoadingBar: (value) => dispatch(actions.setIsLoadingBar(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
