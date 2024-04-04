import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

import style from './HeaderEnd.module.scss';
import * as actions from '~/store/actions';
import * as iconSidebars from '~/public/assets/icons/iconSideBars';
import icons, { Google, Bell, CameraMovie, User, Live } from '~/public/assets/icons';
import Button from '~/components/button/Button';
import { Tooltip } from 'react-tooltip';
import SettingPopup from '../SettingPopup';
import Popup from '~/components/popup/Popup';
import Item from '~/components/listItem/Item';
import PopupPopper from '~/components/popup/PopupPopper';

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
import useClickOutside from '~/hooks/useClickOutside';

function HeaderEnd({ isLoggedIn, userInfo }) {
  const history = useHistory();
  const [isShowSettingPopup, setIsShowSettingPopup] = useState(false);
  const [isShowUploadPopup, setIsShowUploadPopup] = useState(false);
  const [open, setOpen] = useState(true);

  const settingIconRef = useRef(null);
  const uploadIconRef = useRef(null);
  const openIcon = useRef(null);

  useClickOutside(settingIconRef, () => setIsShowSettingPopup(false));
  useClickOutside(uploadIconRef, () => setIsShowUploadPopup(false));
  useClickOutside(open, () => setOpen(false));

  const handleLoginClick = (url) => {
    history.push(url);
  };

  const handleClick = (e) => {
    setOpen(!open);
  };

  console.log(isShowUploadPopup);
  return (
    <div className={clsx('flex-center-end', style.end)}>
      {isLoggedIn && (
        <>
          {/* <Box ref={openIcon} sx={{ position: 'relative' }} onClick={(e) => handleClick(e)}>
            <Box>test </Box>
            {open && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                  minWidth: 300,
                }}
              >
                <PopupPopper>
                  <nav aria-label="main mailbox folders">
                    <List>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon sx={{ minWidth: '0', mr: 2 }}>
                            <Box sx={{ height: '24px', width: '24px' }}>
                              <Google />
                            </Box>
                          </ListItemIcon>
                          <ListItemText>
                            <Box className="text-md-4 text-line-one">Tài khoản Google</Box>
                          </ListItemText>
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </nav>
                  <Divider />
                </PopupPopper>
              </Box>
            )}
          </Box> */}

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
              <Popup maxWidth="300px" maxHeight="410px" right="0" className="popup-menu">
                <div className={clsx(style.section)} style={{ padding: '8px 0' }}>
                  <Item leftIcon={<iconSidebars.YourVideo />} text="Tải video lên" setIsShow={setIsShowUploadPopup} />
                  <Item leftIcon={<Live />} text="Phát trực tiếp" setIsShow={setIsShowUploadPopup} />
                </div>
              </Popup>
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
                    userInfo &&
                    userInfo?.items &&
                    userInfo.items.length > 0 &&
                    userInfo.items[0]?.snippet?.thumbnails?.default?.url
                  }
                  alt="avatar"
                />
                {isShowSettingPopup && (
                  <Popup maxWidth="300px" maxHeight="410px" right="100%" className="popup-menu">
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
              <Popup maxWidth="300px" maxHeight="410px" right="0" className="popup-menu">
                <SettingPopup setIsShow={setIsShowSettingPopup} />
              </Popup>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderEnd);
