import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

import style from './HeaderStart.module.scss';
import * as actions from '~/store/actions';
import icons, { MenuBar } from '~/public/assets/icons';
import LogoSvg from '~/public/assets/logo';
import { Box } from '@mui/material';

function HeaderStart({ changeSideBarMiniRedux, is_sidebar_mini, mode }) {
  const history = useHistory();

  const handleChangeSideBar = () => {
    changeSideBarMiniRedux(!is_sidebar_mini);
  };

  const handleLogoClick = () => {
    history.push('/');
  };

  return (
    <div className={clsx('flex-align-center h-100', style.start)}>
      <Box
        className={clsx(style.btn_icon, 'bg-40-round')}
        onClick={() => {
          handleChangeSideBar();
        }}
      >
        <Box sx={{ color: 'text.primary' }} className={clsx('w-100 h-100 cursor-pointer', style.icon)}>
          <MenuBar />
        </Box>
      </Box>
      <div className={clsx('h-100', style.logo)}>
        <div className={clsx('flex-align-center', style.logo_link)} onClick={handleLogoClick}>
          <div className={clsx('cursor-pointer', style.logo_icon)}>
            <Box sx={{ color: 'text.primary' }}>
              <LogoSvg />
            </Box>
            {/* {mode === 'light' ? <img src={logoSvg} alt="" /> : <img src={logoDark} alt="" />} */}
          </div>
        </div>
        <span className={clsx(style.country_code)}>VN</span>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    mode: state.app.mode,
    isLoggedIn: state.user.isLoggedIn,
    is_sidebar_mini: state.app.is_sidebar_mini,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    changeSideBarMiniRedux: (isShow) => dispatch(actions.changeSideBarMini(isShow)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderStart);
