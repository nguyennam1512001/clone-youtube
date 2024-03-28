import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tooltip } from 'react-tooltip';

import style from './Search.module.scss';
import * as actions from '~/store/actions';
import { Filter, Menu } from '~/assets/icons';
import FilterModal from './component/FilterModal';
import MenuPopup from './component/MenuPopup';
import Popup from '~/components/Popup';
import EndOfListObserver from '~/components/EndOfListObserver';
import { convertDuration, convertViewCount, calculateTimeDifference } from '~/utils';
import Spinner from '~/components/Spinner';

function Search({ videosSearch, searchVideoStart, isSpinner, setIsSpinner, setIsLoadingBar }) {
  const [isShowMenuPopup, setIsShowMenuPopup] = useState(false);
  const [isItem, setItem] = useState(null);
  const [maxResult, setMaxResult] = useState(14);
  const [isShow, setIsShow] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');
  const listRef = useRef(null);
  const [endOfListReached, setEndOfListReached] = useState(false);

  const handleClickThumbnail = (url) => {
    history.push(url);
  };

  useEffect(() => {
    // setIsSpinner(true);
    // setIsLoadingBar(true);
    // searchVideoStart(query, maxResult)
    //   .then(() => {
    //     setIsSpinner(false);
    //     setIsLoadingBar(false);
    //   })
    //   .catch((error) => {
    //     setIsLoadingBar(false);
    //     setIsSpinner(false);
    //     console.error('Error loading videos:', error);
    //   });
  }, [query, maxResult]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (isShowMenuPopup && !event.target.closest(`.${style.menu}`)) {
        setIsShowMenuPopup(false);
      }
    }

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isShowMenuPopup]);

  function handleClickMenu(index) {
    setItem(index);
    setIsShowMenuPopup(!isShowMenuPopup);
  }
  useEffect(() => {
    if (isShowMenuPopup && isItem !== null) {
      listRef.current.children[isItem].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isShowMenuPopup, isItem]);

  const handleEndOfListReached = () => {
    setMaxResult((prevMaxResult) => prevMaxResult + 10);
  };
  return (
    <div className={clsx(style.page_container)}>
      <div className={clsx(style.container)}>
        <div className={clsx(style.header)}>
          <div className={clsx(style.filter_button)}>
            <div
              className={clsx(style.button_shape)}
              onClick={() => {
                setIsShow(!isShow);
              }}
            >
              <div className={clsx(style.button_text)}>Bộ lọc</div>
              <div className={clsx(style.icon_shape)}>
                <Filter />
              </div>
            </div>
            <FilterModal isShow={isShow} setIsShow={setIsShow} />
          </div>
        </div>
        <div className={clsx(style.contents)}>
          <div className={clsx(style.list)} ref={listRef}>
            {videosSearch &&
              videosSearch.map((item, index) => {
                return (
                  <div className={clsx(style.item)} key={index}>
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
                          <div className={clsx(style.meta)}>
                            <div className={clsx(style.video_name)}>
                              <a
                                href={'/watch?v=' + item.id}
                                className={clsx(style.video_title_link, 'yt-simple-endpoint')}
                                title={item.snippet.title}
                              >
                                <div className={clsx(style.video_title)}>{item.snippet.title}</div>
                              </a>
                            </div>
                            <div className={clsx(style.metadata_line)}>
                              <span className={clsx(style.inline_metadata_item)}>
                                {convertViewCount(item.statistics.viewCount)} lượt xem&nbsp;
                              </span>
                              <span className={clsx(style.inline_metadata_item)}>
                                • {calculateTimeDifference(item.snippet.publishedAt)}
                              </span>
                            </div>
                            <div className={clsx(style.meta_block)}>
                              <div className={clsx(style.metadata)}>
                                <div className={clsx(style.byline_container)}>
                                  <div className={clsx(style.avatar_link)}>
                                    <div className={clsx(style.avatar)}>
                                      <img className={clsx(style.avatar_img)} alt="" width="24" src={item.avatar} />
                                    </div>
                                  </div>
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
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className={clsx(style.desc)}>
                              <div className={clsx(style.desx_text, 'ellipsis')}>{item.snippet.description}</div>
                            </div>
                          </div>
                          <div className={clsx(style.menu)}>
                            <button
                              className={clsx(style.button_icon, { [style.show]: isShowMenuPopup && isItem === index })}
                              onClick={() => handleClickMenu(index)}
                            >
                              <div className={clsx(style.icon_shape)}>
                                <Menu />
                              </div>
                            </button>
                            {isShowMenuPopup && index === isItem && (
                              <Popup maxWidth="270px" maxHeight="410px" right="0">
                                <MenuPopup setIsShow={setIsShowMenuPopup} />
                              </Popup>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <EndOfListObserver onEndOfListReached={handleEndOfListReached} setEndOfListReached={setEndOfListReached} />
        </div>
        {isSpinner && endOfListReached && <Spinner />}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    videosSearch: state.video.videosSearch,
    isSpinner: state.video.isSpinner,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchVideoStart: (q, max) => dispatch(actions.searchVideoStart(q, max)),
    setIsSpinner: (value) => dispatch(actions.setIsSpinner(value)),
    setIsLoadingBar: (value) => dispatch(actions.setIsLoadingBar(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
