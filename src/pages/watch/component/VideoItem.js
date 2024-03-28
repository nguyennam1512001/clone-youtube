import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tooltip } from 'react-tooltip';

import { Menu, Tick } from '~/assets/icons';
import style from './VideoItem.module.scss';
import * as actions from '~/store/actions';
import { convertDuration, convertViewCount, calculateTimeDifference } from '~/utils';
import Popup from '~/components/Popup';
import MenuPopup from '~/pages/search/component/MenuPopup';
import ClickOutside from '~/components/ClickOutside';

function VideoItem({ item, index, idItem, setIdItem }) {
  const history = useHistory();
  const [isShowMenuPopup, setIsShowMenuPopup] = useState(false);

  const handleClickItem = (id) => {
    history.push('/watch?v=' + id);
  };

  function handleClickMenu(e, index) {
    e.stopPropagation();
    document.body.style.overflow = !isShowMenuPopup ? 'hidden' : 'auto';
    setIdItem(index);
    setIsShowMenuPopup(!isShowMenuPopup);
  }

  const handleClickOutside = () => {
    document.body.style.overflow = 'auto';
    setIsShowMenuPopup(false);
  };

  return (
    <div className={clsx(style.item)} onClick={() => handleClickItem(item.id)}>
      <div className={clsx(style.content)}>
        <div className={clsx(style.grid_media)}>
          <div className={clsx(style.thumbnail)}>
            <div className={clsx(style.thumbnail_link)}>
              <div className={clsx(style.img)}>
                <img src={item.snippet.thumbnails.medium.url} alt="anh" />
              </div>
              <div className={clsx(style.overlays)}>
                <div className={clsx(style.overlay_time)}>
                  <div className={clsx(style.time_status)}>
                    <span className={clsx(style.text)}>{convertDuration(item.contentDetails.duration)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={clsx(style.details)}>
            <div className={clsx(style.meta)}>
              <h3 className={clsx(style.video_name)}>
                <div className={clsx(style.video_title_link, 'yt-simple-endpoint')} title={item.snippet.title}>
                  <div className={clsx(style.video_title)}>{item.snippet.title}</div>
                </div>
              </h3>
              <div className={clsx(style.meta_block)}>
                <div className={clsx(style.metadata)}>
                  <div className={clsx(style.byline_container)}>
                    <div className={clsx(style.avatar_link)}>
                      <div className={clsx(style.avatar)}>
                        <img className={clsx(style.avatar_img)} alt="channelImg" src={item.avatar} />
                      </div>
                    </div>
                    <div className={clsx(style.channel_name)}>
                      <div
                        data-tooltip-id="channel_name_tooltip"
                        data-tooltip-content={item.snippet.channelTitle}
                        className={clsx(style.text)}
                      >
                        <div className={clsx(style.channel_link)}>{item.snippet.channelTitle}</div>
                        <Tooltip arrowColor="transparent" id="channel_name_tooltip" className="normal_tooltip" />
                      </div>
                      <div className={clsx(style.channel_icon)}>
                        <div data-tooltip-id="channel_icon_tooltip" data-tooltip-content="Đã xác minh">
                          <div className={clsx(style.icon_shape)}>
                            <Tick />
                          </div>
                          <Tooltip arrowColor="transparent" id="channel_icon_tooltip" className="normal_tooltip" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={clsx(style.metadata_line)}>
                    <span className={clsx(style.inline_metadata_item)}>
                      {convertViewCount(item.statistics.viewCount)} lượt xem &nbsp;&nbsp;
                    </span>
                    <span className={clsx(style.inline_metadata_item)}>
                      • {calculateTimeDifference(item.snippet.publishedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={clsx(style.menu)}>
              <ClickOutside
                isActive={isShowMenuPopup}
                className={`.${style.button_icon}`}
                onClickOutside={handleClickOutside}
              >
                <button
                  className={clsx(style.button_icon, {
                    [style.show]: isShowMenuPopup && idItem === index,
                  })}
                  onClick={(e) => {
                    handleClickMenu(e, index);
                  }}
                >
                  <div className={clsx(style.icon_shape)}>
                    <Menu />
                  </div>
                  {isShowMenuPopup && index === idItem && (
                    <Popup maxWidth="270px" maxHeight="410px" right="0">
                      <MenuPopup setIsShow={setIsShowMenuPopup} />
                    </Popup>
                  )}
                </button>
              </ClickOutside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoadingBar: (value) => dispatch(actions.setIsLoadingBar(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoItem);
