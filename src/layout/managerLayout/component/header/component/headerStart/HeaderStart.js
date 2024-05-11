import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { Box } from '@mui/material';

import style from './HeaderStart.module.scss';
import * as actions from '~/store/actions';
import { MenuBar } from '~/public/assets/icons';
import { path } from '~/utils';

function HeaderStart({ changeSideBarMiniRedux, is_sidebar_mini }) {
  const history = useHistory();

  const handleChangeSideBar = () => {
    changeSideBarMiniRedux(!is_sidebar_mini);
  };

  const handleRedirect = (path) => {
    history.push(path);
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
        <div className={clsx('flex-align-center', style.logo_link)} onClick={() => handleRedirect(path.OVERVIEW)}>
          <div className={clsx('cursor-pointer', style.logo_icon)}>
            <Box sx={{ color: 'text.primary' }}>
              <img height="24" alt="" src="https://www.gstatic.com/youtube/img/creator/yt_studio_logo.svg" />
            </Box>
          </div>
        </div>
        <span className={clsx(style.country_code)}>VN</span>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
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
