import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import style from './HeaderEnd.module.scss';
import * as actions from '~/store/actions';
import icons, { CameraMovie } from '~/public/assets/icons';
import useClickOutside from '~/hooks/useClickOutside';
import menuSettingArr from './MenuSettingArr';
import SettingPopup from '~/layout/component/header/component/SettingPopup';

function HeaderEnd({ isLoggedIn, myChannelInfo, setUploadModal }) {
  const history = useHistory();
  const [isShowSettingPopup, setIsShowSettingPopup] = useState(false);
  const settingIconRef = useRef(null);

  const handleRedirect = (path) => {
    history.push(path);
  };

  useClickOutside(settingIconRef, () => setIsShowSettingPopup(false));
  return (
    <div className={clsx('flex-center-end', style.end)}>
      <Button
        variant="outlined"
        startIcon={<CameraMovie />}
        sx={{ color: 'text.primary', fontSize: '1.4rem' }}
        onClick={() => setUploadModal(true)}
      >
        Tạo
      </Button>
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
                <img className={clsx(style.img_avatar, 'img-36-round')} src={myChannelInfo.thumbnails} alt="avatar" />
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    myChannelInfo: state.video.myChannelInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUploadModal: (boolean) => dispatch(actions.setUploadModal(boolean)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderEnd);
