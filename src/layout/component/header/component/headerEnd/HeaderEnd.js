import React, { useState, useRef, useEffect } from 'react';
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

import {
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';

import useClickOutside from '~/hooks/useClickOutside';
import menuSettingArr from './MenuSettingArr';
import { path } from '~/utils';

function HeaderEnd({ isLoggedIn, myChannelInfo }) {
  const history = useHistory();
  const [isShowSettingPopup, setIsShowSettingPopup] = useState(false);
  const [isShowUploadPopup, setIsShowUploadPopup] = useState(false);

  const settingIconRef = useRef(null);
  const uploadIconRef = useRef(null);

  useClickOutside(settingIconRef, () => setIsShowSettingPopup(false));
  useClickOutside(uploadIconRef, () => setIsShowUploadPopup(false));

  const handleRedirect = (path) => {
    history.push(path);
  };

  return (
    <div className={clsx('flex-center-end', style.end)}>
      {isLoggedIn && (
        <>
          <Box
            sx={{ marginRight: '8px', position: 'relative' }}
            ref={uploadIconRef}
            onClick={() => {
              setIsShowUploadPopup(!isShowUploadPopup);
            }}
          >
            <IconButton
              className={clsx(style.icon_shape)}
              data-tooltip-id="header_camera_icon_tooltip"
              data-tooltip-content="Tạo"
              sx={{ color: 'text.primary' }}
            >
              <CameraMovie />
            </IconButton>
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
                      <ListItemButton onClick={() => handleRedirect(path.UPLOAD)}>
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
          </Box>
          {/* <IconButton
            data-tooltip-id="header_bell_icon_tooltip"
            data-tooltip-content="Thông báo"
            sx={{ marginRight: '8px', color: 'text.primary' }}
          >
            <Badge color="error" badgeContent={10} max={9} sx={{ '>.MuiBadge-badge': { fontSize: '1.2rem' } }}>
              <Bell />
            </Badge>
          </IconButton> */}
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
                <img className={clsx(style.img_avatar, 'img-36-round')} src={myChannelInfo?.thumbnails} alt="avatar" />
                {isShowSettingPopup && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      right: '100%',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <SettingPopup dataList={menuSettingArr} setIsShow={setIsShowSettingPopup} />
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
        <div className={clsx('flex-center-end', style.login)} onClick={() => handleRedirect('/login')}>
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
    myChannelInfo: state.video.myChannelInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderEnd);
