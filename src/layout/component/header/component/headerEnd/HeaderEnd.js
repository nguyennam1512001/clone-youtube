import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

import style from './HeaderEnd.module.scss';
import * as actions from '~/store/actions';
import * as iconSidebars from '~/public/assets/icons/iconSideBars';
import icons, { Bell, CameraMovie, User, Live } from '~/public/assets/icons';
import Button from '~/components/button/Button';
import { Tooltip } from 'react-tooltip';
import SettingPopup from '../SettingPopup';
import Popup from '~/components/popup/Popup';
import Item from '~/components/listItem/Item';

import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, firestore } from '~/fireBase/FireBase';

import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';

import useClickOutside from '~/hooks/useClickOutside';

function HeaderEnd({ isLoggedIn, userInfo, googleUserInfo }) {
  const history = useHistory();
  const [isShowSettingPopup, setIsShowSettingPopup] = useState(false);
  const [isShowUploadPopup, setIsShowUploadPopup] = useState(false);

  const settingIconRef = useRef(null);
  const uploadIconRef = useRef(null);

  useClickOutside(settingIconRef, () => setIsShowSettingPopup(false));
  useClickOutside(uploadIconRef, () => setIsShowUploadPopup(false));

  const handleLoginClick = (url) => {
    history.push(url);
  };

  return (
    <div className={clsx('flex-center-end', style.end)}>
      {isLoggedIn && (
        <>
          <div
            ref={uploadIconRef}
            className={clsx('img-40-round flex-center', style.button, 'cursor-pointer')}
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
              <Box
                sx={{
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Paper
                  sx={{
                    maxWidth: '300px',
                    maxHeight: '410px',
                    borderRadius: '12px',
                    overflow: 'auto',
                  }}
                >
                  <List>
                    <ListItem disablePadding onClick={() => setIsShowUploadPopup(false)}>
                      <ListItemButton>
                        <ListItemIcon sx={{ minWidth: '0', mr: 2 }}>
                          <Box sx={{ height: '24px', width: '24px' }}>
                            <iconSidebars.YourVideo />
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          sx={{
                            '&.MuiListItemText-root': { WebkitFontSmoothing: 'antialiased', whiteSpace: 'nowrap' },
                          }}
                        >
                          <Box className="text-md-4 text-line-one">Tải video lên</Box>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding onClick={() => setIsShowUploadPopup(false)}>
                      <ListItemButton>
                        <ListItemIcon sx={{ minWidth: '0', mr: 2 }}>
                          <Box sx={{ height: '24px', width: '24px' }}>
                            <Live />
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          sx={{
                            '&.MuiListItemText-root': { WebkitFontSmoothing: 'antialiased' },
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <Box className="text-md-4 text-line-one">Phát trực tiếp</Box>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Paper>
              </Box>
            )}
          </div>

          <div className={clsx('img-40-round  flex-center cursor-pointer', style.button)}>
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
          <div
            className={clsx('flex-center cursor-pointer text-center', style.icon)}
            onClick={() => {
              setIsShowSettingPopup(!isShowSettingPopup);
            }}
            ref={settingIconRef}
          >
            {isLoggedIn ? (
              <div className={clsx(style.avatar)}>
                <img
                  className={clsx(style.img_avatar, 'img-36-round')}
                  src={
                    (userInfo &&
                      userInfo?.items &&
                      userInfo.items.length > 0 &&
                      userInfo.items[0]?.snippet?.thumbnails?.default?.url) ||
                    googleUserInfo.photoUrl
                  }
                  alt="avatar"
                />
                {isShowSettingPopup && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      right: '100%',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <SettingPopup setIsShow={setIsShowSettingPopup} />
                  </Box>
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
              <Box
                sx={{
                  position: 'absolute',
                  top: '100%',
                  right: '100%',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <SettingPopup setIsShow={setIsShowSettingPopup} />
              </Box>
            )}
          </div>
        </div>
      </div>
      {!isLoggedIn && (
        <div className={clsx('flex-center-end', style.login)} onClick={() => handleLoginClick('/login')}>
          <Button icon={<User />} text="Đăng Nhập" color="#085ED4" fs="14px" fw="500" />
        </div>
      )}
      <Tooltip arrowColor="transparent" id="header_menu_icon_tooltip" className="normal_tooltip" />
      <Tooltip arrowColor="transparent" id="header_camera_icon_tooltip" className="normal_tooltip" />
      <Tooltip arrowColor="transparent" id="header_bell_icon_tooltip" className="normal_tooltip" />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    googleUserInfo: state.user.googleUserInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderEnd);
