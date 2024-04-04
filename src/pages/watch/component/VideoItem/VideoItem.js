import React, { useState, useEffect, useRef } from 'react';
import useClickOutside from '~/hooks/useClickOutside';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import clsx from 'clsx';

import { Menu } from '~/public/assets/icons';
import style from './VideoItem.module.scss';
import * as actions from '~/store/actions';
import { convertDuration } from '~/utils';
import Popup from '~/components/popup/Popup';
import MenuPopup from '~/pages/search/component/MenuPopup';
import Details from './component/Details';

function VideoItem({ item, index, idItem, setIdItem }) {
  const [isShowMenuPopup, setIsShowMenuPopup] = useState(false);
  const history = useHistory();
  const btnRef = useRef(null);

  function containsShorts(str) {
    // Kiểm tra xem chuỗi có chứa "#Short" hoặc "#Shorts" không
    return /#Short(s)?\b/i.test(str);
  }

  const handleClickItem = (item) => {
    if (containsShorts(item.snippet.title)) {
      history.push('/shorts?v=' + item.id);
    } else {
      history.push('/watch?v=' + item.id);
    }
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
  useClickOutside(btnRef, handleClickOutside);

  return (
    <div className={clsx('w-100', style.item)} onClick={() => handleClickItem(item)}>
      <div className={clsx('flex-justify-center h-100', style.content)}>
        <div className={clsx('w-100 h-100', style.grid_media)}>
          <div className={clsx(style.thumbnail)}>
            <div className={clsx('cursor-pointer', style.thumbnail_link)}>
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
          <div className={clsx('cursor-pointer w-100', style.details)}>
            <Details item={item} />
            <div className={clsx(style.menu)}>
              <button
                className={clsx(style.button_icon, {
                  [style.show]: isShowMenuPopup && idItem === index,
                })}
                onClick={(e) => {
                  handleClickMenu(e, index);
                }}
                ref={btnRef}
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
