import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';

import style from './Header.module.scss';
import * as actions from '~/store/actions';
import * as iconSidebars from '~/assets/icons/iconSideBars';
import icons, { Bell, CameraMovie, User, Live } from '~/assets/icons';
import Button from '~/components/Button';
import Search from './component/Search';
import { Tooltip } from 'react-tooltip';
import SettingPopup from './component/SettingPopup';
import HeaderStart from './component/HeaderStart';
import Popup from '~/components/Popup';
import Item from '~/components/Item';
import ClickOutside from '~/components/ClickOutside';

function Header({ isLoggedIn, userInfor, isLoadingBar }) {
  const [isShowSettingPopup, setIsShowSettingPopup] = useState(false);
  const [isShowUploadPopup, setIsShowUploadPopup] = useState(false);
  const history = useHistory();

  const handleLoginClick = (url) => {
    history.push(url);
  };

  return (
    <div className={clsx(style.header)}>
      <div className="progress" style={{ height: '2px' }}>
        <div
          className={`progress-bar ${isLoadingBar ? ' progress-bar-animated bg-danger' : ''}`}
          role="progressbar"
          aria-valuenow={isLoadingBar ? 100 : 0}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${isLoadingBar ? 100 : 0}%` }}
        ></div>
      </div>

      <HeaderStart />
      <div className={clsx(style.center, 'hidden_tablet_l', 'hidden_tablet', 'hidden_mobile')}>
        <Search />
      </div>
      <div className={clsx(style.end)}>
        {isLoggedIn && (
          <>
            <ClickOutside
              isActive={isShowUploadPopup}
              className={`.${style.button_upload}`}
              onClickOutside={() => setIsShowUploadPopup(false)}
            >
              <div
                className={clsx(style.button, style.button_upload, 'cursor-pointer')}
                onClick={() => {
                  setIsShowUploadPopup(!isShowUploadPopup);
                }}
              >
                <div
                  className={clsx(style.icon_shape)}
                  data-tooltip-id="header_camera_icon_tooltip"
                  data-tooltip-content="Tạo"
                >
                  <CameraMovie />
                </div>
                {isShowUploadPopup && (
                  <Popup maxWidth="300px" maxHeight="410px" right="0">
                    <Item leftIcon={<iconSidebars.YourVideo />} text="Tải video lên" setIsShow={setIsShowUploadPopup} />
                    <Item leftIcon={<Live />} text="Phát trực tiếp" setIsShow={setIsShowUploadPopup} />
                  </Popup>
                )}
              </div>
            </ClickOutside>

            <div className={clsx(style.button, 'cursor-pointer')}>
              <div
                className={clsx(style.icon_shape)}
                data-tooltip-id="header_bell_icon_tooltip"
                data-tooltip-content="Thông báo"
              >
                <Bell />
                <span>5</span>
              </div>
            </div>
          </>
        )}
        <div className={clsx(style.setting)}>
          <div className={clsx(style.setting_icon)}>
            <ClickOutside
              isActive={isShowSettingPopup}
              className={`.${style.icon}`}
              onClickOutside={() => setIsShowSettingPopup(false)}
            >
              <div
                className={clsx(style.icon, 'cursor-pointer')}
                onClick={() => {
                  setIsShowSettingPopup(!isShowSettingPopup);
                }}
              >
                {isLoggedIn ? (
                  <div className={clsx(style.avatar)}>
                    <img
                      className={clsx(style.img_avatar)}
                      src={userInfor && userInfor.items[0].snippet.thumbnails.default.url}
                      alt=""
                    />
                    {isShowSettingPopup && (
                      <Popup maxWidth="300px" maxHeight="410px" right="100%">
                        <SettingPopup setIsShow={setIsShowSettingPopup} />
                      </Popup>
                    )}
                  </div>
                ) : (
                  <img
                    className={clsx(style.icon_menu)}
                    src={icons.menu}
                    alt=""
                    data-tooltip-id="header_menu_icon_tooltip"
                    data-tooltip-content="Cài đặt"
                  />
                )}
                {!isLoggedIn && isShowSettingPopup && (
                  <Popup maxWidth="300px" maxHeight="410px" right="0">
                    <SettingPopup setIsShow={setIsShowSettingPopup} />
                  </Popup>
                )}
              </div>
            </ClickOutside>
          </div>
        </div>
        {!isLoggedIn && (
          <div className={clsx(style.login)} onClick={() => handleLoginClick('/login')}>
            <Button icon={<User />} text="Đăng Nhập" color="#085ED4" fs="14px" fw="500" />
          </div>
        )}
        <Tooltip arrowColor="transparent" id="header_menu_icon_tooltip" className="normal_tooltip" />
        <Tooltip arrowColor="transparent" id="header_camera_icon_tooltip" className="normal_tooltip" />
        <Tooltip arrowColor="transparent" id="header_bell_icon_tooltip" className="normal_tooltip" />
      </div>
      {/* <div className={clsx(style.a)}></div> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfor: state.admin.userInfor,
    language: state.app.language,
    oauth2Data: state.user.oauth2Data,
    isLoadingBar: state.video.isLoadingBar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
